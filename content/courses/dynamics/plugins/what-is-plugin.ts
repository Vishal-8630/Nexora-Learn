import { DocContent } from "@/types/docs";

export const whatIsPlugin: DocContent = {
  title: "What is a Plugin?",
  description:
    "Plugins are custom .NET assemblies that execute in response to Dataverse events, enabling powerful server-side business logic.",
  content: `
## Introduction

So far, we have covered how to automate logic without code (Business Rules, Power Automate) and how to automate logic on the client-side (JavaScript).

But what happens when you need to perform complex validation, massive data processing, or integrate with an external web service *before* a record is even allowed to be saved to the database?

For complex, synchronous, server-side execution, you write a **Plugin**.

## What is it?

A **Plugin** is a custom C# class that implements the \`IPlugin\` interface. It integrates directly into the **Dataverse Event Execution Pipeline**. 

You compile your C# code into a **.NET Assembly (DLL)**, register it in Dataverse, and instruct the system: *"Run this specific C# logic whenever an Account is created or updated."*

Because plugins execute on the server, they enforce business rules at the data level, ensuring data integrity no matter how the data is modified (e.g., via the UI, bulk import, or external API integrations).

## Why do we need Plugins?

1. **Synchronous Validation:** Unlike Power Automate (which is typically asynchronous), plugins can run synchronously. If a plugin throws an error (an \`InvalidPluginExecutionException\`), the database transaction is completely rolled back, and the user receives an immediate error message on their screen.
2. **High Performance:** Plugins execute server-side directly on Dataverse compute nodes. They are incredibly fast for complex calculations or processing large datasets.
3. **Bulletproof Security:** Because they run on the server, plugins cannot be bypassed. If you write client-side JavaScript to prevent creating a Contact without a Phone Number, a user can easily bypass it by creating the Contact via an Excel import or the Web API. A plugin catches *everything*.
4. **Complex Math & Logic:** While Power Automate is great for orchestration, it is difficult to use for complex looping, parsing complex JSON, and mathematical algorithms. C# excels at this.

## When to Use What? (Decision Making)

Choosing the right tool is a critical architect-level skill. 

### Plugin vs Power Automate
- **Use a Plugin** when you need immediate synchronous feedback to the user, transaction rollback on failure, or high-performance data manipulation.
- **Use Power Automate** when the logic can run asynchronously in the background, involves integrating with other Microsoft 365 services (like sending an email or Teams message), or when you want citizen developers to maintain the logic.

### Plugin vs JavaScript (Client API)
- **Use a Plugin** when the logic must enforce data integrity across all entry points (UI, API, imports).
- **Use JavaScript** when you need to improve the user interface experience (e.g., hiding/showing fields dynamically, showing unsaved form alerts, or calling an external API while the user is typing).

## The Basic Architecture

When an action occurs in Dataverse (e.g., a user clicks "Save" or an API request is made), it triggers an **Event** (a Message, such as \`Create\`, \`Update\`, or \`Delete\`).

Here is the high-level flow:

\`\`\`text
User clicks Save / API Request
        │
        ▼
Dataverse Event Triggered (e.g., 'Create')
        │
        ▼
Execution Pipeline
        │
        ▼
Your Custom Plugin (C# Code Executed)
        │
        ▼
Database Transaction (Committed or Rolled Back)
\`\`\`

1. **Event Trigger:** Dataverse intercepts the operation.
2. **Registry Lookup:** It checks if any Plugins are registered for that specific event and entity.
3. **Execution Context:** It passes a package of data (the **Execution Context**) to your C# code. This context contains the data the user is trying to save.
4. **Code Execution:** Your C# code runs (verifying data, modifying it, or creating related records).
5. **Outcome:** If your code succeeds, the transaction proceeds. If it throws an exception, the entire transaction is cancelled.

## Code Example

Here is a minimal, production-oriented example of a Plugin that forces an Account name to uppercase before it is saved. Notice how it implements the \`IPlugin\` interface and its \`Execute\` method.

\`\`\`csharp
using System;
using Microsoft.Xrm.Sdk;

namespace Nexora.Plugins
{
    public class AccountPreOperationPlugin : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            // Obtain the execution context
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            // Ensure the plugin is running for the target entity
            if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity targetEntity)
            {
                if (targetEntity.LogicalName == "account")
                {
                    // Check if the name attribute is present
                    if (targetEntity.Attributes.Contains("name"))
                    {
                        string currentName = targetEntity.GetAttributeValue<string>("name");
                        
                        // Convert name to uppercase
                        targetEntity["name"] = currentName.ToUpper();
                    }
                }
            }
        }
    }
}
\`\`\`

## Synchronous vs Asynchronous Execution

When registering a plugin, you define its execution mode:

### Synchronous Plugins
- **When to use:** Validations before saving, modifying data being saved, or returning immediate errors to the user.
- **Behavior:** The operation blocks until the plugin finishes. The user sees a loading state.
- **Limitation:** Strict **2-minute timeout limit**. If exceeded, Dataverse terminates the plugin and throws an error.

### Asynchronous Plugins
- **When to use:** Heavy processing (e.g., creating multiple related records, calling slow external APIs) where the user shouldn't be forced to wait.
- **Behavior:** The record saves instantly. The plugin execution is queued (System Job) and runs shortly after.
- **Limitation:** You cannot cancel the initial save operation or return a synchronous error message to the UI.

## Sandbox Isolation

When you upload a Plugin to Dataverse, it executes in a **Sandbox**. 

The Sandbox is a heavily restricted, isolated compute environment. It protects Microsoft's shared servers from malicious or inefficient code. Because of the Sandbox, you **cannot**:

- Read or write files to the server's local file system (\`System.IO\`).
- Interact with the Windows Registry or event logs.
- Use IP addresses for network calls (you must use DNS/URLs).
- Open direct SQL database connections (you must use the Dataverse SDK/API).

## Best Practices

- **Evaluate Alternatives First:** Microsoft recommends considering Power Automate or Business Rules before writing a Plugin. Custom code introduces maintenance overhead. Write code only when necessary.
- **Keep it Stateless:** Plugins are pooled and cached. Never store data in global/class-level variables (e.g., \`private string myVariable;\`), as multiple threads might share the same class instance, leading to catastrophic data leaks between different users' requests.
- **Mind the 2-Minute Limit:** Never write a synchronous plugin that relies on a slow external web service. If the API lags, your plugin crashes the Dataverse transaction.

## Common Mistakes

> [!WARNING]
> **Infinite Loops (Depth Exceeded)**
> If you write a plugin that runs when an Account is updated, and inside that plugin, your C# code *updates the Account again*, you will trigger the plugin recursively. Dataverse will eventually detect this (when Depth > 8) and crash the plugin, but it severely degrades system performance before failing. Always check context depth or use specific filtering attributes to prevent this.

> [!WARNING]
> **Missing Null Checks**
> \`Target\` entities in updates only contain the fields that were *changed*, not the entire record. If your plugin assumes a field exists in the \`Target\` during an update, it will throw a NullReferenceException if the user didn't modify that specific field.

## Things to Remember

- Plugins are compiled **C# (.NET assemblies)** implementing \`IPlugin\`.
- They execute **Server-side** within the Dataverse event pipeline.
- They enforce rules unconditionally (cannot be bypassed by APIs or data imports).
- Synchronous plugins have a **2-minute timeout** and can rollback transactions.
- They run in an isolated **Sandbox** with strict security boundaries.
- **Never** use class-level state variables.

## Related Topics

- [Execution Pipeline](/docs/plugins/execution-pipeline) — where exactly the plugin runs in the server transaction
- [Registering Plugins](/docs/plugins/registration) — how to upload the DLL to Dataverse
- [Plugin Context and Tracing](/docs/plugins/context-tracing) — how to read context variables and log debug information

## What's Next

To understand exactly *when* your C# code runs during the save process (and the difference between Pre-Validation, Pre-Operation, and Post-Operation), you must learn about the **Execution Pipeline**.
  `.trim(),
};
