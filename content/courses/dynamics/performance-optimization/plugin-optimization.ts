import { DocContent } from "@/types/docs";

export const pluginOptimization: DocContent = {
  title: "Plugin Optimization",
  description:
    "Learn the architectural rules for writing highly efficient C# Plugins, preventing catastrophic infinite loops, and optimizing the IOrganizationService data payload.",
  content: `
## Introduction

C# Plugins execute directly inside the highly constrained Dataverse transaction pipeline. If a synchronous plugin takes 5 seconds to execute, the user's browser is forcibly locked for 5 seconds. If a plugin is poorly architected, it will crash the entire SQL save operation and roll back the user's data.

Optimizing plugins is the most critical architectural skill for a Dynamics 365 developer.

## 1. Avoid Updating Unmodified Columns (The Audit Penalty)

When you update a record using the \\\`IOrganizationService\\\`, you instantiate an \\\`Entity\\\` object payload. 
A massive architectural failure is pulling a record from the database, modifying a single field, and transmitting the *entire* record payload back to SQL.

**Bad Practice (Massive SQL Overhead):**
\`\`\`csharp
Entity retrievedAccount = service.Retrieve("account", accountId, new ColumnSet(true));
retrievedAccount["revenue"] = new Money(5000);
service.Update(retrievedAccount); // Transmits ALL 200 columns back to SQL
\`\`\`
This explicitly forces SQL to execute an UPDATE statement on every single column, firing off Auditing logs for fields that did not actually change, and catastrophically triggering other plugins that are registered to listen for updates on those unmodified fields.

**Architectural Best Practice (Targeted Update):**
\`\`\`csharp
Entity updateAccount = new Entity("account");
updateAccount.Id = accountId;
updateAccount["revenue"] = new Money(5000); // Only transmit the mutated payload
service.Update(updateAccount);
\`\`\`

## 2. Preventing Infinite Loops (Execution Depth)

If you have a Plugin registered on the \\\`Update\\\` event of an Account, and inside that plugin's C# logic you explicitly call \\\`service.Update(account)\\\`, you will trigger your own plugin again. This creates a recursive infinite loop.

Dataverse detects infinite loops by tracking the **Depth** property in the Execution Context pipeline. If the Depth integer strictly exceeds **8**, Dataverse violently kills the transaction and rolls back SQL.

**The Solution:**
Always evaluate the execution depth at the top of your plugin architecture.
\`\`\`csharp
if (context.Depth > 1) 
{
    // Terminate execution if we have recursed
    return;
}
\`\`\`

## 3. Ban ColumnSet(true)

When retrieving a record, never utilize \\\`new ColumnSet(true)\\\` unless functionally required by the integration. This translates directly to a \\\`SELECT * FROM table\\\` query in SQL, pulling massive amounts of JSON data over the network and into server memory that your C# logic doesn't actually evaluate.

Always explicitly declare the exact schema columns you require.
\`\`\`csharp
// GOOD
Entity account = service.Retrieve("account", id, new ColumnSet("name", "revenue"));
\`\`\`

## 4. Offload Heavy Analytics

Plugins execute within a restricted Sandbox that is aggressively limited by CPU, Memory, and the strict 2-minute execution timeout.
If you need to iterate over 10,000 Opportunity records to calculate a complex algorithmic forecast, **do not execute this within a Plugin**. 

You must offload this compute to an **Azure Function**, a native **Rollup Column**, or an **Azure Logic App**. Plugins are strictly reserved for lightweight, transactional data validation and immediate manipulation.

## 5. Caching Immutable Data

If your plugin logic needs to reference static structural data (e.g., retrieving the GUID of the global "System Administrator" team from the database), do not execute a SQL query every single time the plugin fires.

Dataverse Sandbox workers cache plugin class instances in memory. You can store immutable data in static variables within the Plugin class. 

> [!WARNING]
> **Thread Safety**
> Plugins run in a highly multi-threaded IIS environment. While you can cache static GUIDs, **never** store stateful transaction data (like the current user's ID or the target entity) in static variables, as parallel executions will instantly corrupt the data.

## Things to Remember

- Never execute **\\\`new ColumnSet(true)\\\`**; strictly specify the exact columns.
- Only transmit the **exact fields** that mutated to prevent catastrophic SQL write overhead.
- Prevent infinite loops by rigorously evaluating **\\\`context.Depth\\\`**.
- Offload heavy computational logic out of the Sandbox and into **Azure Functions**.

## What's Next

Now that the C# execution logic is optimized, we must ensure the REST API queries originating from external systems are equally performant. Next, we cover **Query Optimization**.
  `.trim(),
};
