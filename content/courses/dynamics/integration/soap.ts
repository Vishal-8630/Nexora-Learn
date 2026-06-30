import { DocContent } from "@/types/docs";

export const soap: DocContent = {
  title: "SOAP & Organization Service",
  description:
    "Understand the legacy SOAP endpoint, its role in modern C# Plugin development, and how to use the IOrganizationService interface.",
  content: `
## Introduction

Before Microsoft introduced the RESTful Web API in 2016, the only way to communicate with Dynamics CRM was through the **Organization Service** (a WCF/SOAP endpoint).

Today, Microsoft strongly dictates that architects should use the REST Web API for all *external* integrations (Python, Node.js, external C# apps). 

However, the Organization Service is **not dead**. In fact, it remains the absolute, mandatory standard when writing custom C# Plugins that execute *internally* inside the Dataverse sandbox.

## The IOrganizationService Interface

When you write a Dataverse Plugin, you do not instantiate an \`HttpClient\` to make REST calls back to Dataverse. That would consume massive network overhead and quickly hit the 2-minute plugin timeout limit.

Instead, the Dataverse execution pipeline natively injects an object that implements the \`IOrganizationService\` interface into your plugin. This interface allows your C# code to perform CRUD operations directly against the SQL database using highly optimized, strongly-typed classes.

## The Core Methods

The \`IOrganizationService\` provides standard CRUD methods, mirroring the REST API but in C#:

### 1. Create
\`\`\`csharp
Entity newAccount = new Entity("account");
newAccount["name"] = "Sample Account";
newAccount["revenue"] = new Money(5000000);

// Execute the Create
Guid accountId = service.Create(newAccount);
\`\`\`

### 2. Retrieve (Read)
When retrieving a record, you must explicitly specify which columns you want using a \`ColumnSet\`.

\`\`\`csharp
ColumnSet columns = new ColumnSet("name", "revenue");
Entity retrievedAccount = service.Retrieve("account", accountId, columns);

string accountName = retrievedAccount.GetAttributeValue<string>("name");
\`\`\`

### 3. Update
Just like a REST \`PATCH\`, when you update a record via the Organization Service, you only instantiate an Entity with the GUID and the specific fields you want to change.

\`\`\`csharp
Entity updateAccount = new Entity("account");
updateAccount.Id = accountId; // The Primary Key
updateAccount["revenue"] = new Money(6000000);

service.Update(updateAccount);
\`\`\`

### 4. Delete
\`\`\`csharp
service.Delete("account", accountId);
\`\`\`

## Handling Lookups (EntityReference)

In the REST API, we used the \`@odata.bind\` syntax to set lookups. 
In the Organization Service, we use the \`EntityReference\` object.

\`\`\`csharp
Entity newAccount = new Entity("account");
newAccount["name"] = "Sample Account";

// Set the Primary Contact lookup
Guid contactId = new Guid("11111111-1111-1111-1111-111111111111");
newAccount["primarycontactid"] = new EntityReference("contact", contactId);

service.Create(newAccount);
\`\`\`

## Decision Making: Early Bound vs Late Bound

The examples above use **Late Bound** programming. You are passing raw strings like \`"account"\` and \`"primarycontactid"\`. 

**The Risk of Late Bound:** If you misspell \`"primarycontactid"\` as \`"primarycontact"\`, the C# compiler won't notice. The code will compile perfectly, but the plugin will crash violently at runtime when a user tries to save a record.

### Early Bound Classes (The Enterprise Standard)
Enterprise teams use a tool called \`pac modelbuilder\` (formerly \`CrmSvcUtil.exe\`) to connect to Dataverse and automatically generate C# classes for every table in the database.

Using these **Early Bound** classes, the code becomes strongly typed:

\`\`\`csharp
Account newAccount = new Account();
newAccount.Name = "Sample Account";
newAccount.PrimaryContactId = new EntityReference(Contact.EntityLogicalName, contactId);

service.Create(newAccount);
\`\`\`
If you misspell \`newAccount.Name\`, the C# compiler throws an error instantly. 

**Recommendation:** Always use Early Bound classes for large enterprise projects to catch schema errors during the Azure DevOps Build Pipeline, rather than in Production at runtime.

## Things to Remember

- The **Organization Service** is the older SOAP endpoint.
- Do not use it for external integrations; use it exclusively for **internal C# Plugins**.
- It relies on the **\`IOrganizationService\`** interface.
- Use **\`EntityReference\`** to set Lookup columns.
- Use **Early Bound** classes for compile-time safety on enterprise projects.

## What's Next

We have covered how external systems push data *into* Dataverse (REST) and how internal plugins manipulate data (SOAP). But how does Dataverse push data *out* to a simple external URL? We use **Webhooks**.
  `.trim(),
};
