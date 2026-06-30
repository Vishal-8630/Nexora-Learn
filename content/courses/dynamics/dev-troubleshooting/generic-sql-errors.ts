import { DocContent } from "@/types/docs";

export const genericSqlErrors: DocContent = {
  title: "Investigating Generic SQL Errors",
  description:
    "How to handle sandbox timeouts, SQL deadlocks, and the most unhelpful error message in Dataverse.",
  content: `
## The "Generic SQL Error"

The most frustrating error a developer can receive in Dataverse is:
> \`Generic SQL error.\`

Unlike a \`NullReferenceException\` or a \`Principal user is missing privilege\` error, a Generic SQL Error gives you absolutely zero context about what went wrong.

---

## What Causes It?

Because Dataverse abstracts the underlying Azure SQL database, Microsoft intentionally hides raw SQL exceptions (like constraint violations or timeouts) from the end-user for security reasons.

If you see this error, it almost always means one of three things:

### 1. The Sandbox 2-Minute Timeout
Dataverse plugins execute inside a secure Sandbox. If your plugin code takes longer than **2 minutes** (120 seconds) to finish executing, the Sandbox worker process violently terminates the thread and rolls back the SQL transaction, throwing a Generic SQL Error.
*   **Fix:** Never write long-running loops or massive data imports inside a synchronous plugin. Use asynchronous workflows, Azure Functions, or Power Automate for heavy lifting.

### 2. SQL Deadlocks
If User A triggers a plugin that locks the \`Account\` table to update it, and User B triggers a plugin that locks the \`Contact\` table, and then User A tries to lock \`Contact\` while User B tries to lock \`Account\`... SQL Server detects a deadlock and kills one of the transactions, throwing a Generic SQL Error.
*   **Fix:** Ensure your plugins update related records in a consistent, predictable order. Reduce the amount of time you hold locks by pushing heavy processing to \`Post-Operation Asynchronous\` plugins.

### 3. String Truncation (Too Large for Column)
If you try to insert a 200-character string into a Dataverse Single Line of Text column that is configured to have a Maximum Length of 100 characters, the underlying SQL \`INSERT\` statement will fail.
*   **Fix:** Always validate string lengths in your C# code before calling \`service.Update()\`, or increase the Max Length of the column in the Dataverse UI.

---

## How to Find the True Cause

Because the error message is useless, you must rely on telemetry to find the root cause.

1.  **Check Plugin Trace Logs:** Go to Advanced Find and look at the Plugin Trace Logs for the exact minute the error occurred. Look at your \`tracer.Trace()\` outputs to see exactly which line of C# code ran right before the crash.
2.  **Application Insights:** If your environment is connected to Azure Application Insights, you can query the \`dependencies\` and \`exceptions\` tables. App Insights often logs the *actual* underlying SQL constraint violation that Dataverse hid from the UI.
`,
};
