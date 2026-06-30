import { DocContent } from "@/types/docs";

export const bulkDeletion: DocContent = {
  title: "Bulk Deletion Jobs",
  description:
    "Safely purging millions of obsolete records to save Database Capacity costs.",
  content: `
## The Cost of Data in Dataverse

Unlike a traditional SQL Server where a gigabyte of storage costs pennies, Dataverse Database Capacity is extremely expensive. 

If your environment runs out of Database Capacity, Microsoft will eventually lock you from copying environments, restoring backups, or creating new tables.

A massive culprit for capacity consumption is historical data:
*   Resolved System Jobs (Workflows) from 3 years ago.
*   Audit History logs for non-critical tables.
*   Millions of obsolete emails or tracking records.

To clean this up, you must use **Bulk Deletion Jobs**.

---

## Creating a Bulk Deletion Job

A Bulk Deletion Job is an asynchronous background process that runs on the Dataverse server. You define a FetchXML query, and Dataverse quietly deletes the records that match it.

1. Go to **Advanced Settings > Data Management > Bulk Record Deletion**.
2. Click **New**.
3. Use the Advanced Find builder to define your query (e.g., \`Look for: System Jobs\`, \`Status Reason Equals Succeeded\`, \`Completed On is older than X Months\`).
4. **Schedule it:** You can configure the job to run every 30 days automatically.

---

## Crucial Considerations

> [!CAUTION]
> **Cascading Deletes**
> If you delete an Account, Dataverse might automatically delete all associated Contacts, Opportunities, and Activities if the 1:N relationship behavior is set to "Cascade All". Before you run a massive bulk deletion, you must inspect the Relationship Behaviors to ensure you don't accidentally wipe out child data you intended to keep.

### 1. Plugins will fire!
By default, if you use a Bulk Deletion job to delete 50,000 Contacts, and you have a synchronous C# Plugin registered on \`Contact Delete\`, that plugin will fire 50,000 times. This will drastically slow down the deletion process and potentially impact system performance.
*If possible, temporarily disable unnecessary plugins before a massive one-off purge.*

### 2. Hard Deletes vs Soft Deletes
Dataverse Bulk Deletion performs a **Hard Delete**. Once the record is gone from SQL, it is gone forever. If you need to retain the data for legal compliance, you must archive it (e.g., using Azure Synapse Link to export to a Data Lake) *before* you run the Bulk Deletion job.

### 3. The 10,000 Record Chunking
Behind the scenes, Dataverse doesn't issue a single \`DELETE FROM table WHERE...\` SQL command. It retrieves the records in chunks and calls the \`Delete\` API on each one individually to ensure security roles and plugins are respected. This is why deleting 2 million records can take an entire weekend. Plan your maintenance windows accordingly.
`,
};
