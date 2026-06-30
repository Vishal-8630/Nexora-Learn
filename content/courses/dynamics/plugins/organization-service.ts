import { DocContent } from "@/types/docs";

export const organizationService: DocContent = {
  title: "IOrganizationService (CRUD)",
  description:
    "IOrganizationService is the primary interface for performing data operations in C# plugins, including Create, Retrieve, Update, and Delete.",
  content: `
## Introduction

The Execution Context tells your plugin *what* the user is trying to do. But if your plugin needs to interact with the database—like creating a related Task, or updating a parent Account—you must use the **IOrganizationService**.

This service is the C# equivalent of the JavaScript \`Xrm.WebApi\`. It provides the methods to perform CRUD operations against Dataverse.

## Instantiating the Service

To get an instance of the Organization Service, you must extract the \`IOrganizationServiceFactory\` from the service provider, and then use it to create the service.

\`\`\`csharp
public void Execute(IServiceProvider serviceProvider)
{
    // 1. Get the Execution Context
    IPluginExecutionContext context = (IPluginExecutionContext)
        serviceProvider.GetService(typeof(IPluginExecutionContext));

    // 2. Get the Service Factory
    IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)
        serviceProvider.GetService(typeof(IOrganizationServiceFactory));

    // 3. Create the Organization Service
    // Passing context.UserId runs the code with the security privileges of the user who triggered it.
    // Passing null runs the code with full SYSTEM (Admin) privileges.
    IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);
}
\`\`\`

## 1. Create a Record

To create a new record, instantiate a new \`Entity\` object, populate its attributes, and call \`service.Create()\`.

\`\`\`csharp
Entity newTask = new Entity("task");
newTask["subject"] = "Welcome Task";
newTask["description"] = "Please call the new customer.";

// Set a Lookup (Lookup to the Account that triggered the plugin)
newTask["regardingobjectid"] = new EntityReference("account", context.PrimaryEntityId);

// Set an Option Set (Choice)
newTask["prioritycode"] = new OptionSetValue(1); // High Priority

// Execute Create. It returns the GUID of the newly created record.
Guid taskId = service.Create(newTask);
\`\`\`

## 2. Retrieve a Record

To fetch a single record when you know the GUID, use \`service.Retrieve()\`. You must specify a \`ColumnSet\` to define which fields to return.

\`\`\`csharp
// Only retrieve the name and revenue to save performance
ColumnSet cols = new ColumnSet("name", "revenue");

Entity account = service.Retrieve("account", accountId, cols);

string name = account.GetAttributeValue<string>("name");
\`\`\`

## 3. Update a Record

To update a record, you instantiate a new \`Entity\` object, set its \`Id\` property to the GUID of the record you want to update, and provide *only* the fields you want to change.

\`\`\`csharp
Entity updateAccount = new Entity("account");
updateAccount.Id = accountId; // The record to update
updateAccount["telephone1"] = "555-0199"; // The field to change

service.Update(updateAccount);
\`\`\`

## 4. Delete a Record

To delete a record, provide the logical name and the GUID.

\`\`\`csharp
service.Delete("account", accountId);
\`\`\`

## 5. RetrieveMultiple (Querying Data)

To search the database for multiple records, you build a \`QueryExpression\` (or use FetchXML) and pass it to \`service.RetrieveMultiple()\`.

\`\`\`csharp
QueryExpression query = new QueryExpression("contact");
query.ColumnSet = new ColumnSet("firstname", "lastname");

// Add a filter: statecode = 0 (Active) AND address1_city = 'Seattle'
query.Criteria.AddCondition("statecode", ConditionOperator.Equal, 0);
query.Criteria.AddCondition("address1_city", ConditionOperator.Equal, "Seattle");

// Execute the query
EntityCollection results = service.RetrieveMultiple(query);

foreach (Entity contact in results.Entities)
{
    string firstName = contact.GetAttributeValue<string>("firstname");
}
\`\`\`

## Late-Bound vs Early-Bound

The examples above use **Late-Bound** syntax. You pass strings (like \`"account"\` or \`"telephone1"\`) to interact with data. If you misspell a string, the compiler will not catch it; the plugin will crash at runtime.

**Early-Bound** syntax uses a tool called the \`CrmSvcUtil\` to generate C# classes for every table in your database. 
Instead of \`Entity newTask = new Entity("task")\`, you write \`Task newTask = new Task()\`. 
Instead of \`newTask["subject"]\`, you write \`newTask.Subject\`. 
This provides strong typing and IntelliSense, but requires maintaining the generated classes as your database schema changes.

## Best Practices

- **Avoid querying in Pre-Operation:** If you are modifying the record that triggered the plugin (in Stage 20 Pre-Operation), do not use \`service.Update()\`. Simply modify the \`Target\` entity in the context, and Dataverse will save it automatically.
- **Use ColumnSets carefully:** Never use \`new ColumnSet(true)\` (which means "Select *"). It queries every single column on the table, drastically degrading performance. Always specify exactly which columns you need.
- **Impersonation:** If a standard user triggers a plugin that needs to update a highly secure table they don't have access to, change \`serviceFactory.CreateOrganizationService(context.UserId)\` to \`serviceFactory.CreateOrganizationService(null)\`. This impersonates the SYSTEM user, granting the plugin full admin rights. Use this securely and sparingly.

## Common Mistakes

> [!WARNING]
> **Infinite Loops via Update** — If your plugin runs on the \`Update\` of an Account, and your code calls \`service.Update(account)\`, Dataverse sees an update operation and fires your plugin again, causing an infinite loop. Always check \`context.Depth\` to break the loop.

## Things to Remember

- Extract the **Service Factory** from the Service Provider.
- Pass **context.UserId** to run as the user, or **null** to run as SYSTEM.
- Use **RetrieveMultiple** with QueryExpression to search.
- Use **Late-Bound** (strings) for simplicity, or **Early-Bound** (classes) for strict typing.

## Related Topics

- [Execution Context](/docs/plugins/execution-context) — where you get the UserId
- [Xrm.WebApi](/docs/javascript/xrm-webapi) — the JavaScript equivalent of the Organization Service

## What's Next

Now that we can write complex code, we need a way to figure out why it crashes when things go wrong. Next, we will cover the **Tracing Service**.
  `.trim(),
};
