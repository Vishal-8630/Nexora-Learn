import { DocContent } from "@/types/docs";

export const consoleApps: DocContent = {
  title: "Console Apps & Bulk Operations",
  description:
    "Building rapid C# console applications for testing APIs and manipulating mass data.",
  content: `
## Why Build Console Apps?

In standard web development, if you want to test an API, you use Postman. While you *can* use Postman with Dynamics 365, the OAuth 2.0 handshake and complex OData syntax make it tedious for rapid experimentation.

Professional Dynamics developers use **C# Console Applications** as their primary testing ground. 
*   Need to figure out how to update an Opportunity Line Item? Write 10 lines of C# in a console app.
*   Need to delete 50,000 corrupt records that a user accidentally imported? Write a console app.

---

## Connecting a Console App to Dataverse

The easiest way to connect to Dataverse from a Console App is using the \`DataverseServiceClient\` from the \`Microsoft.PowerPlatform.Dataverse.Client\` NuGet package.

### 1. Install the NuGet Package
\`\`\`bash
dotnet add package Microsoft.PowerPlatform.Dataverse.Client
\`\`\`

### 2. The Connection String
The client uses standard connection strings. The \`LoginPrompt=Auto\` parameter is magic—it will pop up the standard Microsoft 365 login window, completely handling MFA and 2FA authentication for you.

\`\`\`csharp
using Microsoft.PowerPlatform.Dataverse.Client;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

string connectionString = "AuthType=OAuth;Url=https://contoso.crm.dynamics.com;LoginPrompt=Auto;";

using (ServiceClient serviceClient = new ServiceClient(connectionString))
{
    if (serviceClient.IsReady)
    {
        Console.WriteLine("Connected to Dataverse!");
        
        // You now have an IOrganizationService!
        IOrganizationService service = serviceClient;
        
        // Create an account
        Entity account = new Entity("account");
        account["name"] = "Console Test";
        Guid newId = service.Create(account);
        
        Console.WriteLine($"Created Account: {newId}");
    }
    else
    {
        Console.WriteLine("Connection Failed: " + serviceClient.LastError);
    }
}
\`\`\`

---

## Bypassing Custom Plugins (Bulk Operations)

If you write a console app to import 50,000 historical records, you usually **do not** want your custom plugins to run. For example, if you have a plugin that sends a welcome email when a Contact is created, importing 50,000 historical contacts would send 50,000 spam emails.

You can tell Dataverse to bypass custom business logic for your specific API calls.

> [!CAUTION]
> **Privilege Required**
> The user running the console app must have the \`prvBypassCustomPlugins\` security privilege (usually granted to System Administrators).

### How to Bypass Plugins

Instead of calling \`service.Create()\`, you must construct an \`OrganizationRequest\` and add a specific magic parameter to it.

\`\`\`csharp
Entity contact = new Entity("contact");
contact["firstname"] = "Historical";
contact["lastname"] = "Import";

CreateRequest createRequest = new CreateRequest
{
    Target = contact
};

// The Magic Parameter: Tell Dataverse to ignore all custom plugins and workflows
createRequest.Parameters.Add("BypassCustomPluginExecution", true);

// Execute the request
CreateResponse response = (CreateResponse)service.Execute(createRequest);
Guid newContactId = response.id;
\`\`\`

This is an essential technique for data migration and large-scale architectural refactoring.
`,
};
