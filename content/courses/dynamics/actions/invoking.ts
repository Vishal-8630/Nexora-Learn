import { DocContent } from "@/types/docs";

export const usingActions: DocContent = {
  title: "Invoke Classic Actions in Dataverse",
  description:
    "Learn how to execute Classic Actions from client-side JavaScript (Xrm.WebApi), server-side C# Plugins (OrganizationRequest), and Power Automate. Understand their purpose, when to use them, and how they fit into the Dataverse execution pipeline.",
  content: `
## Introduction: What are Classic Actions?

Classic Actions in Dataverse provide a low-code way to define and execute custom business operations. They allow you to encapsulate business logic, often built using the workflow designer, and expose it as a reusable API. When you create a Classic Action, Dataverse automatically generates a custom message in its execution pipeline. This means invoking a Classic Action is fundamentally the same as invoking any other standard or custom Dataverse message.

The term "Classic" refers to their origin in the legacy workflow engine, distinguishing them from newer, code-first approaches like Custom APIs. They are particularly useful for scenarios where you need to perform a specific set of steps, potentially involving record creation, updates, or other operations, without writing complex C# plugins.

You must construct a request object containing the exact Input Parameters defined in the Action designer, execute it, and then read the Output Parameters from the response.

## When to Use Classic Actions

Classic Actions are a powerful tool in your Dataverse development toolkit. Consider using them in the following scenarios:

*   **Encapsulating Reusable Business Logic:** When you have a specific business process that needs to be executed from multiple places (e.g., different forms, other plugins, Power Automate flows), an Action provides a single, consistent entry point.
*   **Exposing Operations to Low-Code Tools:** Actions are easily discoverable and invokable from Power Automate, Power Apps (Canvas and Model-driven), and other low-code platforms, making them ideal for citizen developers.
*   **Simple Synchronous Operations:** For operations that are relatively straightforward, don't require complex C# coding, and need to execute synchronously (e.g., calculating a value, updating related records based on specific criteria).
*   **Bridging Client-side and Server-side Logic:** Actions provide a clean way for client-side JavaScript to trigger server-side logic without directly interacting with complex plugin code.

## When to Avoid Classic Actions & Alternatives

While useful, Classic Actions have limitations. Understanding these helps you choose the right technology:

*   **Performance-Critical Operations:** Classic Actions execute synchronously and rely on the workflow engine, which can be slower than code-first Custom APIs or C# plugins. For high-performance or high-volume operations, prefer Custom APIs.
*   **Complex Logic or Integrations:** If your logic involves intricate C# code, external API calls, or advanced error handling, a C# Plugin or Custom API offers greater flexibility and debugging capabilities.
*   **Asynchronous Operations:** Classic Actions are synchronous. For long-running processes or operations that don't need immediate feedback, Power Automate flows or asynchronous C# plugins are better choices.
*   **Event-Driven Logic:** If you need to react to specific Dataverse events (e.g., \`OnCreate\`, \`OnUpdate\` of a record), C# Plugins are the primary mechanism. Actions are invoked explicitly, not triggered by events.

**Alternatives:**

*   **Custom APIs:** The modern, code-first successor to Classic Actions for creating custom messages. They offer better performance, direct C# implementation, and more control.
*   **C# Plugins:** For event-driven logic, complex server-side operations, and integrations.
*   **JavaScript (Client-side):** For UI-specific logic that doesn't require server-side data manipulation or complex business rules.
*   **Power Automate Flows:** For asynchronous processes, multi-system integrations, and complex approval workflows.

## Understanding the Invocation Flow

Regardless of the calling method, the process of invoking a Classic Action follows a consistent path within Dataverse:

\`\`\`
Caller (JS / C# Plugin / Power Automate)
       |
       V
Dataverse Web API / Organization Service (Request)
       |
       V
Dataverse Execution Pipeline (Pre-operation, Main Operation)
       |
       V
Classic Action Logic (Workflow Engine executes defined steps)
       |
       V
Dataverse Execution Pipeline (Post-operation, Response)
       |
       V
Dataverse Web API / Organization Service (Response)
       |
       V
Caller (Receives Output Parameters / Error)
\`\`\`

## 1. Invoking from JavaScript (Client-side)

You execute Actions from client-side JavaScript using the asynchronous \`Xrm.WebApi.online.execute\` method. This method sends an HTTP request to the Dataverse Web API.

### Example: Unbound (Global) Action

If you created an Action called \`new_CalculateTax\` with "None (global)" as the entity, you do not pass a target record.

\`\`\`javascript
// Define the request object
var request = {
    // Input Parameters defined in the Action Designer
    BaseAmount: 500.00,
    TaxCode: "NY",

    getMetadata: function () {
        return {
            boundParameter: null, // Indicates an unbound (global) action
            parameterTypes: {
                "BaseAmount": { typeName: "Edm.Decimal", structuralProperty: 1 },
                "TaxCode": { typeName: "Edm.String", structuralProperty: 1 }
            },
            operationType: 0, // 0 = Action, 1 = Function
            operationName: "new_CalculateTax" // The Unique Name (logical name) of your Action
        };
    }
};

// Execute the request using Xrm.WebApi
Xrm.WebApi.online.execute(request).then(
    function success(result) {
        if (result.ok) {
            result.json().then(function (response) {
                // Output Parameter defined in the Action Designer
                var totalTax = response.CalculatedTax; 
                console.log("Calculated Tax is: " + totalTax);
                // Further client-side logic based on the result
            });
        }
    },
    function (error) {
        console.error("Action 'new_CalculateTax' failed: " + error.message);
        // Handle error, e.g., display a notification to the user
    }
);
\`\`\`

### Example: Bound Action

If your Action, for example \`new_UpdateAccountStatus\`, is bound to the \`account\` table, you must specify the target record.

\`\`\`javascript
var accountId = Xrm.Page.data.entity.getId().replace(/{|}/g, ""); // Get current record ID

var request = {
    // Input Parameters defined in the Action Designer
    NewStatus: "Active", // Example input parameter

    getMetadata: function () {
        return {
            boundParameter: "entity", // Indicates a bound action
            parameterTypes: {
                "entity": { typeName: "mscrm.account", structuralProperty: 5 }, // Target entity type
                "NewStatus": { typeName: "Edm.String", structuralProperty: 1 }
            },
            operationType: 0, // 0 = Action
            operationName: "new_UpdateAccountStatus" // The Unique Name of your Action
        };
    }
};

// The target record is passed as the second argument for bound actions
Xrm.WebApi.online.execute("accounts", accountId, request).then(
    function success(result) {
        if (result.ok) {
            console.log("Account status updated successfully.");
            // Refresh the form or perform other client-side updates
            Xrm.Page.data.refresh(true);
        }
    },
    function (error) {
        console.error("Action 'new_UpdateAccountStatus' failed: " + error.message);
    }
);
\`\`\`

## 2. Invoking from a Plugin (C# Server-side)

You can call an Action from within another C# Plugin using the \`OrganizationRequest\` object. This is common when you want to reuse Action logic from a plugin or orchestrate multiple operations.

### Key Plugin Concepts for Beginners:
*   \`IPluginExecutionContext\`: Provides information about the current operation, such as the user, entity, and stage.
*   \`IOrganizationServiceFactory\`: Used to create \`IOrganizationService\` instances.
*   \`IOrganizationService\`: The primary interface for interacting with Dataverse data and metadata, including executing messages.

### Example: Unbound Action

\`\`\`csharp
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.ServiceModel; // Required for FaultException

public class InvokeTaxActionPlugin : IPlugin
{
    public void Execute(IServiceProvider serviceProvider)
    {
        // Obtain the tracing service for debugging
        ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

        // Obtain the execution context from the service provider
        IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

        // Obtain the Organization Service factory
        IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));

        // Use the factory to generate the Organization Service.
        // CreateOrganizationService(context.UserId) impersonates the calling user.
        IOrganizationService service = factory.CreateOrganizationService(context.UserId);

        try
        {
            // 1. Create the Request using the Action's logical name (Unique Name)
            OrganizationRequest request = new OrganizationRequest("new_CalculateTax");

            // 2. Add Input Parameters as defined in the Action Designer
            request.Parameters["BaseAmount"] = 500.00m; // 'm' suffix for decimal literal
            request.Parameters["TaxCode"] = "NY";

            // 3. Execute the Request
            tracingService.Trace("Executing Action: new_CalculateTax");
            OrganizationResponse response = service.Execute(request);
            tracingService.Trace("Action executed successfully.");

            // 4. Read Output Parameters
            if (response.Results.Contains("CalculatedTax"))
            {
                decimal calculatedTax = (decimal)response.Results["CalculatedTax"];
                tracingService.Trace($"Calculated Tax: {calculatedTax}");
                // Further server-side logic using the calculated tax
            }
            else
            {
                tracingService.Trace("Output parameter 'CalculatedTax' not found.");
            }
        }
        catch (FaultException<OrganizationServiceFault> ex)
        {
            tracingService.Trace($"Error invoking Action: {ex.Message}");
            throw new InvalidPluginExecutionException("An error occurred while invoking the tax calculation action.", ex);
        }
        catch (Exception ex)
        {
            tracingService.Trace($"Unexpected error: {ex.Message}");
            throw new InvalidPluginExecutionException("An unexpected error occurred.", ex);
        }
    }
}
\`\`\`

### Example: Bound Action

For a bound action, you pass the target record as an \`EntityReference\` in the \`Target\` parameter.

\`\`\`csharp
// ... (initialization of tracingService, context, factory, service as above)

try
{
    // Assume context.InputParameters contains an EntityReference for the target record
    // For example, if this plugin runs on an Account update
    EntityReference targetEntityRef = null;
    if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is EntityReference)
    {
        targetEntityRef = (EntityReference)context.InputParameters["Target"];
    }
    else
    {
        throw new InvalidPluginExecutionException("Target entity reference not found in context.");
    }

    // 1. Create the Request for the bound Action
    OrganizationRequest request = new OrganizationRequest("new_UpdateAccountStatus");

    // 2. Add the Target parameter for bound actions
    request["Target"] = targetEntityRef; // The logical name of the target parameter is always "Target"

    // 3. Add other Input Parameters
    request.Parameters["NewStatus"] = "Active";

    // 4. Execute the Request
    tracingService.Trace($"Executing bound Action: new_UpdateAccountStatus for Account ID: {targetEntityRef.Id}");
    OrganizationResponse response = service.Execute(request);
    tracingService.Trace("Bound Action executed successfully.");

    // 5. Read Output Parameters (if any)
    // For example, if the action returned a confirmation message
    if (response.Results.Contains("ConfirmationMessage"))
    {
        string confirmation = (string)response.Results["ConfirmationMessage"];
        tracingService.Trace($"Action Confirmation: {confirmation}");
    }
}
catch (FaultException<OrganizationServiceFault> ex)
{
    tracingService.Trace($"Error invoking bound Action: {ex.Message}");
    throw new InvalidPluginExecutionException("An error occurred while invoking the account status update action.", ex);
}
// ... (other catch blocks)
\`\`\`

## 3. Invoking from Power Automate

Power Automate provides the most user-friendly way to invoke Classic Actions, abstracting away the complexities of constructing requests.

Using the **Microsoft Dataverse connector**, you can easily select and execute your Actions:

*   **Perform a bound action:** For Actions tied to a specific table (e.g., \`account\`, \`contact\`). You'll be prompted to select the record ID.
*   **Perform an unbound action:** For Global Actions not tied to any specific table.

Power Automate automatically inspects the Action's metadata (its unique name, input, and output parameters) and generates a dynamic UI form. This form allows you to visually map values from previous steps in your flow to the Action's input parameters, and then easily access its output parameters in subsequent flow steps. This significantly reduces the development effort and potential for errors.

## Design Considerations

When designing and implementing Classic Actions, keep the following in mind:

*   **Bound vs. Unbound:**
    *   **Unbound (Global) Actions:** Best for operations that don't directly relate to a single record, or that operate across multiple records (e.g., \`CalculateOverallSalesTax\`).
    *   **Bound Actions:** Ideal for operations that are specific to a single record (e.g., \`ApproveOrder\` for an \`Order\` record). They provide context and can simplify security.
*   **Synchronous Execution:** Actions are synchronous. Be mindful of their execution time, especially when called from client-side JavaScript, as long-running actions can lead to UI freezes or timeouts.
*   **Error Handling:** Implement robust error handling within your Action's logic and in the calling code. Provide meaningful error messages to aid debugging and user experience.
*   **Security:** Users must have the necessary privileges to execute the Action. For bound actions, they also need privileges on the target record.
*   **Input/Output Parameter Design:** Use clear, descriptive names for parameters. Choose appropriate data types to ensure data integrity and ease of use. Avoid overly complex parameter structures.

## Best Practices

*   **Clear Naming Conventions:** Use a consistent naming convention for your Actions (e.g., \`new_Prefix_ActionName\`) and their parameters. This improves discoverability and maintainability.
*   **Input Validation:** Validate input parameters within the Action's logic to prevent unexpected behavior and ensure data quality.
*   **Single Responsibility Principle:** Design Actions to perform a single, well-defined task. Avoid creating "god actions" that try to do too much.
*   **Minimize Complexity:** If an Action's logic becomes too complex, consider refactoring it into a C# Plugin or Custom API for better performance, debugging, and maintainability.
*   **Tracing and Logging:** Utilize \`ITracingService\` in C# plugins or \`console.log\` in JavaScript to trace execution flow and debug issues.

## Common Mistakes

*   **Incorrect Unique Name:** Using the Action's display name instead of its unique (logical) name in code. Always use the unique name.
*   **Mismatched Parameter Types/Names:** Providing input parameters with incorrect data types or names that don't exactly match those defined in the Action designer. This will cause runtime errors.
*   **Forgetting \`boundParameter\` or \`Target\`:** Forgetting to specify \`boundParameter: "entity"\` in JavaScript or the \`Target\` parameter in C# when invoking a bound action.
*   **Ignoring Synchronous Performance:** Calling a long-running Action from client-side JavaScript, leading to a poor user experience or browser timeouts.
*   **Security Permission Issues:** The calling user lacking the necessary privileges to execute the Action or access the target record.
*   **Over-reliance on Actions for Complex Logic:** Pushing too much complex business logic into Actions when a C# Plugin or Custom API would be more appropriate for performance, debugging, and maintainability.

## Migrating to Custom APIs

One of the significant advantages of Classic Actions is their consistent invocation mechanism. If you have existing JavaScript or C# code that calls a Classic Action (e.g., \`new_CalculateTax\`), and your architect decides to rebuild that Action as a faster, code-first Custom API, you often don't have to change your calling code!

As long as the new Custom API uses the exact same Unique Name (\`new_CalculateTax\`) and the exact same Input/Output parameters, the existing JavaScript or C# will continue to work perfectly. The frontend \`Xrm.WebApi\` call or the server-side \`OrganizationRequest\` does not know or care if the backend logic is handled by a Classic Workflow Action or a modern Custom API Plugin. This provides a smooth migration path and protects your existing investments in calling code.

## Things to Remember

*   **Low-Code Custom Operations:** Classic Actions are a low-code way to define reusable business logic.
*   **Standard Dataverse Messages:** They generate standard messages, making their invocation consistent with other Dataverse operations.
*   **Client-side Invocation:** Use \`Xrm.WebApi.online.execute\` in JavaScript.
*   **Server-side Invocation:** Use \`OrganizationRequest\` in C# Plugins.
*   **Power Automate Integration:** Offers native, visual actions for easy invocation.
*   **Synchronous Execution:** Actions run synchronously, impacting performance and UI responsiveness.
*   **Migration Path:** Easily migratable to Custom APIs without changing calling code if the interface remains consistent.
*   **Decision Factor:** Balance ease of development with performance and complexity needs.

## Related Topics

*   [Custom APIs in Dataverse](link-to-custom-apis-doc)
*   [Dataverse Plugins (C#)](link-to-plugins-doc)
*   [Xrm.WebApi Client API Reference](link-to-xrm-webapi-doc)
*   [Power Automate Dataverse Connector](link-to-power-automate-dataverse-doc)
*   [Dataverse Messages and the Execution Pipeline](link-to-execution-pipeline-doc)
*   [Creating Classic Actions](link-to-creating-actions-doc)
  `.trim(),
};