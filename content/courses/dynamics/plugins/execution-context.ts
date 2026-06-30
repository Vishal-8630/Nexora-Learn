import { DocContent } from "@/types/docs";

export const executionContext: DocContent = {
  title: "Execution Context & Shared Variables",
  description:
    "The IPluginExecutionContext provides contextual information about the event that triggered the plugin, including the Target, Images, and Shared Variables.",
  content: `
## Introduction

When Dataverse triggers your plugin, it needs a way to hand your C# code all the information about *why* it was triggered. What record was created? Who clicked the save button? What time did it happen?

All of this information is bundled into an object called the **Execution Context**.

## The IPluginExecutionContext

Every plugin must implement the \`IPlugin\` interface, which requires a single method: \`Execute(IServiceProvider serviceProvider)\`.

The very first thing you do in the \`Execute\` method is extract the context from the \`serviceProvider\`.

\`\`\`csharp
public void Execute(IServiceProvider serviceProvider)
{
    // Extract the Execution Context
    IPluginExecutionContext context = (IPluginExecutionContext)
        serviceProvider.GetService(typeof(IPluginExecutionContext));
}
\`\`\`

## Key Properties of the Context

Once you have the \`context\` object, you can access dozens of properties describing the event:

- **\`context.MessageName\`**: The event that triggered the plugin (e.g., "Create", "Update", "Delete").
- **\`context.PrimaryEntityName\`**: The logical name of the table (e.g., "account").
- **\`context.PrimaryEntityId\`**: The GUID of the record being acted upon.
- **\`context.UserId\`**: The GUID of the user who triggered the event.
- **\`context.InitiatingUserId\`**: The GUID of the original user (useful if a system service impersonated someone else during the transaction).
- **\`context.Stage\`**: The pipeline stage (10 = Pre-validation, 20 = Pre-operation, 40 = Post-operation).
- **\`context.Depth\`**: How many plugins have triggered each other in a chain. If a plugin updates a record, which triggers another plugin, the Depth increases. If Depth reaches 8, Dataverse kills the transaction to prevent an infinite loop.

## InputParameters (The Target)

The most frequently used property of the context is the \`InputParameters\` collection. This contains the data the user submitted.

For "Create" and "Update" messages, the \`Target\` is stored here as an \`Entity\` object.

\`\`\`csharp
// 1. Check if the Target exists and is an Entity
if (context.InputParameters.Contains("Target") &&
    context.InputParameters["Target"] is Entity)
{
    // 2. Extract the Target
    Entity target = (Entity)context.InputParameters["Target"];

    // 3. Read data from the Target
    if (target.Contains("name"))
    {
        string accountName = target.GetAttributeValue<string>("name");
    }
}
\`\`\`

## Shared Variables

Plugins often need to pass information down the pipeline. 

For example, you have a Pre-Operation (Stage 20) plugin that performs a complex, 5-second calculation. You also have a Post-Operation (Stage 40) plugin that needs the result of that calculation to send an email. You do not want to recalculate it in Stage 40.

You can pass data between plugins in the same transaction using **Shared Variables**.

\`\`\`csharp
// --- Inside the Pre-Operation Plugin ---
context.SharedVariables.Add("CalculatedScore", 95);


// --- Inside the Post-Operation Plugin ---
if (context.SharedVariables.Contains("CalculatedScore"))
{
    int score = (int)context.SharedVariables["CalculatedScore"];
    // Use the score...
}
\`\`\`
*Note: Shared Variables are only available to plugins executing within the exact same database transaction pipeline.*

## The Parent Context

If an Account update plugin triggers a Workflow, which in turn triggers a Contact update plugin, the Contact plugin can see the history of what caused it to run by inspecting the **Parent Context**.

\`\`\`csharp
if (context.ParentContext != null)
{
    string parentMessage = context.ParentContext.MessageName;
    // Useful for debugging infinite loops or complex automation chains
}
\`\`\`

## Best Practices

- **Validate the Context:** Always verify the Context before writing logic. Check that the \`MessageName\` and \`PrimaryEntityName\` match what your code expects. If an administrator accidentally registers your Account plugin on the Contact table, checking the entity name will prevent the plugin from crashing the system.
  \`\`\`csharp
  if (context.MessageName != "Create" || context.PrimaryEntityName != "account") {
      return; 
  }
  \`\`\`
- **Beware of Depth:** Always check \`context.Depth\`. If you intend for a plugin to update itself, wrap the logic in \`if (context.Depth > 1) return;\` to prevent infinite loops instantly.

## Common Mistakes

> [!WARNING]
> **Assuming the Target contains everything** — As discussed in the Messages section, the \`Target\` inside \`InputParameters\` for an **Update** message only contains fields the user changed. Assuming it contains the full record will result in a Null Reference Exception.

## Things to Remember

- The Context provides the **Who, What, Where, and When** of the event.
- Extract the **Target** from \`InputParameters\`.
- Check **Depth** to prevent infinite loops.
- Use **Shared Variables** to pass data between pipeline stages.

## Related Topics

- [Execution Pipeline](/docs/plugins/execution-pipeline) — the stages where Depth and Shared Variables apply
- [Organization Service](/docs/plugins/organization-service) — the service you use once you have extracted the context

## What's Next

Now that we have extracted the context and know what the user is trying to do, how do we write data back to the database? Next, we cover the **Organization Service**.
  `.trim(),
};
