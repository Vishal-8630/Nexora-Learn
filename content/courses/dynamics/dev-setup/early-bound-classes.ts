import { DocContent } from "@/types/docs";

export const earlyBoundClasses: DocContent = {
  title: "Early Bound Classes (pac modelbuilder)",
  description:
    "Why professionals use strongly-typed C# objects instead of late-bound strings, and how to generate them.",
  content: `
## Late-Bound vs Early-Bound

When writing C# Plugins or Console Applications for Dataverse, you have two choices for interacting with records: **Late-Bound** and **Early-Bound**.

### The Late-Bound Approach (The Beginner Way)
Late-bound relies on hardcoded string values for schema names.

\`\`\`csharp
// Late-Bound Example
Entity account = new Entity("account");
account["name"] = "Contoso Corp";
account["primarycontactid"] = new EntityReference("contact", contactGuid);

_service.Create(account);
\`\`\`

**The Problem:** If someone renames a column from \`name\` to \`companyname\`, your code will still compile perfectly. It will only fail at runtime in Production. You also get no IntelliSense for column names.

### The Early-Bound Approach (The Professional Way)
Early-bound generates strongly-typed C# classes based on your specific Dataverse schema.

\`\`\`csharp
// Early-Bound Example
Account account = new Account();
account.Name = "Contoso Corp";
account.PrimaryContactId = new EntityReference(Contact.EntityLogicalName, contactGuid);

_service.Create(account);
\`\`\`

**The Benefit:** If a column is deleted or renamed, your C# project will immediately throw a **compilation error**. You also get full IntelliSense (\`account.Name\`, \`account.CreditLimit\`, etc.), making development significantly faster.

---

## Generating Early Bound Classes

In the past, developers used a complex command-line tool called \`CrmSvcUtil.exe\`, often wrapped by an XrmToolBox plugin (Early Bound Generator). 

Today, Microsoft has integrated this directly into the Power Platform CLI (\`pac\`).

### Using \`pac modelbuilder\`

**1. Authenticate to your environment:**
\`\`\`bash
pac auth create --url https://your-dev-env.crm.dynamics.com
\`\`\`

**2. Generate the classes:**
Navigate to your C# Plugin project directory in your terminal and run:

\`\`\`bash
pac modelbuilder build --outdirectory ./Models --namespace MyCompany.Plugins.Models --entitynamesfilter "account;contact;new_customtable"
\`\`\`

*   **\`--outdirectory\`**: Where the \`.cs\` files will be saved.
*   **\`--namespace\`**: The C# namespace matching your project.
*   **\`--entitynamesfilter\`**: **CRITICAL!** If you do not provide a filter, it will generate classes for all 500+ system tables, creating a massive 150MB file that will crash Visual Studio. Always specify exactly which tables your plugin touches.

---

## Using the Classes in a Plugin

Once the classes are generated and included in your Visual Studio project, you must tell the \`IOrganizationService\` to cast the raw entities into your strongly-typed classes.

\`\`\`csharp
public void Execute(IServiceProvider serviceProvider)
{
    // Standard setup...
    IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
    IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
    IOrganizationService service = factory.CreateOrganizationService(context.UserId);

    // Grab the Target from the InputParameters (it comes in as a late-bound Entity)
    Entity targetEntity = (Entity)context.InputParameters["Target"];

    // Cast it to your Early-Bound class
    Account targetAccount = targetEntity.ToEntity<Account>();

    // Now you have IntelliSense!
    if (targetAccount.CreditLimit != null && targetAccount.CreditLimit.Value > 10000)
    {
        // Do something
    }
}
\`\`\`

> [!TIP]
> **ALM Best Practice**
> Never modify the generated \`Account.cs\` or \`Contact.cs\` files by hand. The next time you run \`pac modelbuilder\`, your changes will be completely overwritten. If you need to add custom methods to an entity class, use a \`partial class\` in a separate file.
`,
};
