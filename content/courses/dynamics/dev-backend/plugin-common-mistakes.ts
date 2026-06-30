import { DocContent } from "@/types/docs";

export const pluginCommonMistakes: DocContent = {
  title: "Common Plugin Disasters (And How to Avoid Them)",
  description:
    "Infinite loops, memory leaks, and performance-killing patterns that junior developers constantly write.",
  content: `
## 1. The Infinite Loop (The \`Depth\` Check)

The most famous mistake in Dynamics 365 development is the infinite loop.

Imagine an \`Update\` plugin on the Account table that checks the Credit Limit. Inside the code, it updates the Account's Status. Calling \`service.Update(account)\` inside an Account Update plugin triggers the plugin *again*, which triggers the update *again*, looping infinitely until the Dataverse sandbox forcefully terminates it with a massive exception.

**The Fix:**
Always check the \`context.Depth\`.

\`\`\`csharp
if (context.Depth > 1) 
{
    return; // Exit if this plugin was triggered by another plugin
}
\`\`\`

---

## 2. The Performance Killer: \`ColumnSet(true)\`

When retrieving a record via C#, you must provide a \`ColumnSet\`. Junior developers often use \`new ColumnSet(true)\` because it's easy—it returns every single column on the table.

**The Fix:**
Never use \`ColumnSet(true)\`. If the Account table has 300 columns and you only need the \`Name\` and \`CreditLimit\`, you are forcing SQL Server to do massive amounts of unnecessary IO, destroying performance.

\`\`\`csharp
// BAD
Entity account = service.Retrieve("account", id, new ColumnSet(true));

// GOOD
Entity account = service.Retrieve("account", id, new ColumnSet("name", "creditlimit"));
\`\`\`

---

## 3. Updating the Unmodified (Ghost Updates)

When a plugin executes on \`Update\`, the \`Target\` entity inside \`context.InputParameters\` contains *only the fields that changed on the UI*.

If a developer pulls a record from the database, modifies one field, and passes that massive object back to \`service.Update()\`, they accidentally overwrite every single field on the record.

**The Disaster:**
This triggers dozens of other plugins listening for updates on those other fields, generates massive useless Audit History logs, and causes SQL deadlocks.

**The Fix:**
Always instantiate a brand new Entity object containing *only* the ID and the specific fields you want to update.

\`\`\`csharp
// BAD
Entity fullAccount = service.Retrieve("account", id, new ColumnSet("name", "statuscode"));
fullAccount["statuscode"] = new OptionSetValue(1);
service.Update(fullAccount); // Updates Name AND Statuscode, triggering auditing for both.

// GOOD
Entity updateAccount = new Entity("account", id);
updateAccount["statuscode"] = new OptionSetValue(1);
service.Update(updateAccount); // Clean, isolated update.
\`\`\`

---

## 4. Class-Level Variables (Memory Leaks)

A plugin class is instantiated by Dataverse and **cached in memory**. Multiple user requests will execute against the exact same class instance simultaneously on different threads.

> [!CAUTION]
> **Thread Safety**
> Never declare class-level variables (e.g., \`private IOrganizationService _service;\`) in a plugin. Because the class is shared, User A's thread will overwrite the variable for User B's thread, causing cross-contamination of data and terrifying security breaches. Always declare variables inside the \`Execute()\` method.
`,
};
