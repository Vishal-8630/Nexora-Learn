import { DocContent } from "@/types/docs";

export const tracing: DocContent = {
  title: "Tracing & Exceptions",
  description:
    "Learn how to use the ITracingService to debug your plugins in the cloud, and how to throw InvalidPluginExecutionExceptions to gracefully block user actions.",
  content: `
## Introduction

Because Plugins execute server-side in an isolated cloud Sandbox, you cannot simply attach a Visual Studio debugger to the production server and step through your code line by line.

If your plugin calculates a complex discount and saves $0 instead of $500, how do you find out where the math went wrong?

You must log diagnostic messages using the **ITracingService**.

## The Tracing Service

The \`ITracingService\` provides a way to write text logs during plugin execution. If the plugin crashes, or if an administrator reviews the logs later, these trace messages reveal exactly what the code was doing at any given millisecond.

### Extracting the Service

Just like the Execution Context, you extract the Tracing Service from the \`IServiceProvider\`.

\`\`\`csharp
public void Execute(IServiceProvider serviceProvider)
{
    // Extract the Tracing Service
    ITracingService tracingService = (ITracingService)
        serviceProvider.GetService(typeof(ITracingService));

    // Write a message
    tracingService.Trace("Plugin execution started.");
}
\`\`\`

### Writing Trace Messages

You should write trace messages at critical junctures in your code: when entering loops, before making API calls, and when inspecting variables.

\`\`\`csharp
tracingService.Trace("Extracting Target from context...");
Entity target = (Entity)context.InputParameters["Target"];

tracingService.Trace($"Target extracted. Account Name: {target.GetAttributeValue<string>("name")}");

tracingService.Trace("Beginning discount calculation algorithm.");
// ... math logic ...
tracingService.Trace($"Algorithm complete. Final discount: {discountAmount}");
\`\`\`

## Viewing Trace Logs

Trace messages are stored in the **Plugin Trace Log** table in Dataverse. 

By default, to save database storage, Dataverse does not save trace logs if the plugin executes successfully. It only saves them if the plugin throws an exception. 

Administrators can change this in System Settings:
- **Off:** Never save trace logs.
- **Exceptions Only:** (Recommended for Production). Only save the log if the plugin crashes.
- **All:** (Recommended for Dev/Test). Save every trace log for every plugin execution. *(Warning: This will rapidly consume database storage).*

## Throwing Exceptions

If your plugin determines that a user's action violates a business rule (e.g., they tried to create an Opportunity with a negative value), the plugin must stop the transaction and tell the user why.

You do this by throwing an **InvalidPluginExecutionException**.

\`\`\`csharp
if (estimatedValue < 0)
{
    tracingService.Trace("Validation failed: Estimated Value is less than zero.");
    
    // Throwing this exception rolls back the database transaction
    // and displays the string message in a popup to the end-user.
    throw new InvalidPluginExecutionException("You cannot create an Opportunity with a negative value. Please correct the amount and try again.");
}
\`\`\`

### Why use InvalidPluginExecutionException?

If your C# code throws a standard \`NullReferenceException\` or a generic \`Exception\`, Dataverse will still roll back the transaction. However, the user will see a terrifying, generic "ISV Code Aborted" system error that provides no actionable feedback.

\`InvalidPluginExecutionException\` is specifically designed to bubble a clean, human-readable message up to the UI.

## Handling Generic Errors

You should wrap your entire plugin logic in a \`try/catch\` block to catch unexpected C# errors, trace them, and re-throw them cleanly.

\`\`\`csharp
try
{
    // Main plugin logic here
    tracingService.Trace("Executing main logic.");
}
catch (FaultException<OrganizationServiceFault> ex)
{
    // Catches errors thrown specifically by the IOrganizationService
    tracingService.Trace($"Dataverse API Error: {ex.Message}");
    throw new InvalidPluginExecutionException("A system error occurred while updating related records. Please contact IT.");
}
catch (Exception ex)
{
    // Catches generic C# errors (like NullReference)
    tracingService.Trace($"Unexpected Error: {ex.ToString()}");
    throw new InvalidPluginExecutionException("An unexpected error occurred. Please contact IT.");
}
\`\`\`

## Best Practices

- **Trace everything in development:** A well-written plugin might have more lines of \`tracingService.Trace\` than actual business logic. It pays off immediately when debugging.
- **Format strings carefully:** If you write \`tracingService.Trace("Value: " + target["name"])\` and the "name" field is missing from the target, your *trace statement itself* will throw a Null Reference Exception and crash the plugin. Always use safe extraction methods (e.g., \`GetAttributeValue<string>()\`).
- **Clean user messages:** Never put stack traces or technical jargon in an \`InvalidPluginExecutionException\`. End-users do not know what "NullReference" means. Tell them exactly what to fix.

## Common Mistakes

> [!WARNING]
> **Leaving Plugin Trace Logs set to "All" in Production** — If you leave global trace logging set to "All" in a busy production environment, millions of trace log records will be created daily. Within a month, you will exceed your Dataverse cloud storage limits, resulting in massive overage bills from Microsoft.

## Things to Remember

- Extract the **ITracingService** from the Service Provider.
- Logs are stored in the **Plugin Trace Log** table.
- Throw **InvalidPluginExecutionException** to block saves and show UI errors.
- Always use **try/catch** blocks to handle unexpected crashes.

## What's Next

We have now written a complete, robust, traceable plugin. The final step is getting this C# code out of Visual Studio and into the Microsoft cloud. Next, we cover **Registration**.
  `.trim(),
};
