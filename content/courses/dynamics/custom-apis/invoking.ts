import { DocContent } from "@/types/docs";

export const invokingCustomApis: DocContent = {
  title: "Invoke Custom APIs",
  description:
    "Learn how to execute your Custom APIs from JavaScript (Client-side) and from other C# Plugins (Server-side).",
  content: `
## Introduction

Once you have defined a Custom API (e.g., \\\`con_VerifyCredit\\\`) and its Input/Output parameters, you need to trigger it. 

Because a Custom API is just a standard Dataverse Web API endpoint, it can be invoked from anywhere: Power Automate, Postman, a third-party website, or native Dynamics 365 components like JavaScript and Plugins.

## 1. Invoking from JavaScript (Client-Side)

When a user clicks a button on the Command Bar, you often want to execute a complex server-side process. You can do this by using \\\`Xrm.WebApi.online.execute\\\` to call your Custom API.

### Executing a Global Custom API
A Global API is not tied to a specific record.

\`\`\`javascript
var request = {
    // 1. Pass the Input Parameters required by the API
    Amount: 1500.00,
    OverrideLimit: false,

    // 2. Define the OData metadata of the API
    getMetadata: function () {
        return {
            boundParameter: null,
            parameterTypes: {
                "Amount": { typeName: "Edm.Decimal", structuralProperty: 1 },
                "OverrideLimit": { typeName: "Edm.Boolean", structuralProperty: 1 }
            },
            operationType: 0, // 0 = Action (POST), 1 = Function (GET)
            operationName: "con_VerifyCredit"
        };
    }
};

// 3. Execute the API Asynchronously
Xrm.WebApi.online.execute(request).then(
    function success(result) {
        if (result.ok) {
            // Read the Output Parameters
            result.json().then(function (response) {
                var isApproved = response.IsApproved;
                var code = response.ApprovalCode;
                console.log("Approved: " + isApproved + " Code: " + code);
            });
        }
    },
    function (error) {
        // Handle failure gracefully
        Xrm.Navigation.openAlertDialog({ text: "API Failed: " + error.message });
    }
);
\`\`\`

### Executing an Entity-Bound Custom API
If your API is bound to the Account table, you must provide the \\\`entity\\\` parameter (the GUID of the specific Account) in the request object.

\`\`\`javascript
var request = {
    // The specific record this API is running against
    entity: { 
        entityType: "account", 
        id: "5531d753-95af-42e5-9c17-1f22b7a957b9" 
    },
    Amount: 1500.00,

    getMetadata: function () {
        return {
            boundParameter: "entity", // Indicates it is bound to a record
            parameterTypes: {
                "entity": { typeName: "mscrm.account", structuralProperty: 5 },
                "Amount": { typeName: "Edm.Decimal", structuralProperty: 1 }
            },
            operationType: 0,
            operationName: "con_VerifyAccountCredit"
        };
    }
};
\`\`\`

## 2. Invoking from a Plugin (Server-Side)

Sometimes, you need to execute a Custom API from *within* another C# Plugin. 

To do this, you create an \\\`OrganizationRequest\\\` and pass the Input Parameters. You execute it using the \\\`IOrganizationService\\\`, and it returns an \\\`OrganizationResponse\\\` containing your Output Parameters.

\`\`\`csharp
public void Execute(IServiceProvider serviceProvider)
{
    IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
    IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
    IOrganizationService service = factory.CreateOrganizationService(context.UserId);

    // 1. Create the Request for your Custom API Message
    OrganizationRequest request = new OrganizationRequest("con_VerifyCredit");

    // 2. Add Input Parameters
    request.Parameters["Amount"] = 1500.00m;
    request.Parameters["OverrideLimit"] = false;

    // 3. Execute the Request synchronously
    try 
    {
        OrganizationResponse response = service.Execute(request);

        // 4. Read Output Parameters
        bool isApproved = (bool)response.Results["IsApproved"];
        string code = (string)response.Results["ApprovalCode"];
        
        // Use the output in your downstream logic...
    }
    catch (FaultException<OrganizationServiceFault> ex)
    {
        // Handle API failure properly
        throw new InvalidPluginExecutionException("Credit verification failed: " + ex.Message);
    }
}
\`\`\`

## Best Practices (Real-World Perspective)

- **Use Bound Parameters for record-specific logic:** If your API strictly updates an Account, always bind it to the Account entity. This allows the platform to automatically pass the GUID as the \\\`target\\\`, making your JavaScript and Plugin execution much cleaner.
- **Async Execution in JS:** \\\`Xrm.WebApi.online.execute\\\` is completely asynchronous. Always use \\\`Xrm.Utility.showProgressIndicator("Verifying credit...")\\\` before calling the API, and use \\\`closeProgressIndicator()\\\` in the \\\`.then()\\\` or \\\`.catch()\\\` blocks so the user doesn't click the button twice and spawn duplicate transactions.

## Common Mistakes

> [!WARNING]
> **Incorrect parameterTypes in JavaScript** 
> When building the \\\`getMetadata\\\` object in JavaScript, the \\\`typeName\\\` must match the exact OData type (e.g., \\\`Edm.String\\\`, \\\`Edm.Int32\\\`, \\\`Edm.Guid\\\`). If you pass \\\`Edm.Integer\\\` instead of \\\`Edm.Int32\\\`, the API call will fail instantly with a cryptic syntax error. Triple-check your OData types.

## Things to Remember

- Custom APIs are invoked via **Xrm.WebApi.online.execute** in JavaScript.
- Custom APIs are invoked via **service.Execute(OrganizationRequest)** in C#.
- You must carefully define **Input and Output Parameters** when executing.
- **Global APIs** do not require an entity context; **Bound APIs** do.

## What's Next

We have covered code execution extensively. Next, we will pivot to the foundation of Dataverse itself: The Database, tables, and columns. Let's explore the **Dataverse** section.
  `.trim(),
};
