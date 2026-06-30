import { DocContent } from "@/types/docs";

export const executionPipeline: DocContent = {
  title: "The Execution Pipeline",
  description:
    "Understand the Dataverse event execution pipeline. Learn the differences between the Pre-Validation, Pre-Operation, and Post-Operation stages.",
  content: `
## Introduction

When a user creates an Account in Dataverse, the record is not instantly dropped into the SQL database. 

Instead, the request travels through a structured sequence of events called the **Event Execution Pipeline**. As a developer, you can choose exactly which stage of this pipeline your Plugin should execute in.

## The Pipeline Stages

The pipeline consists of four distinct stages. When you register a Plugin, you must select which stage it binds to.

### Stage 10: Pre-Validation
This stage occurs *before* Dataverse performs basic security and validation checks.
- **Database Transaction:** Outside the transaction.
- **Use Case:** You use Pre-Validation when you want to validate data and potentially throw an error *before* the system wastes time checking if the user has the correct security roles. It is also used if your plugin needs to run with the privileges of the calling user, but the user doesn't actually have Create privileges for the record (e.g., a self-service portal scenario).

### Stage 20: Pre-Operation
This stage occurs *after* basic validation, but *before* the data is saved to the SQL database.
- **Database Transaction:** Inside the transaction.
- **Use Case:** **Modifying Data.** If a user creates an Account and inputs a phone number, you use a Pre-Operation plugin to strip out the dashes and format it. Because the record hasn't been saved yet, any changes you make to the data package in memory will automatically be saved to the database without requiring a second update call.

### Stage 30: Main Operation (Internal)
This is where Dataverse actually executes the SQL \`INSERT\`, \`UPDATE\`, or \`DELETE\` command. 
- **Use Case:** You **cannot** register custom plugins in Stage 30. This is reserved entirely for Microsoft's internal platform code.

### Stage 40: Post-Operation
This stage occurs *after* the data has been successfully saved to the SQL database, but *before* the success message is returned to the user.
- **Database Transaction:** Inside the transaction.
- **Use Case:** **Creating Related Records.** If you want to automatically create a "Welcome Task" when a new Account is created, you must use Post-Operation. Why? Because in Pre-Operation, the Account doesn't have a GUID yet (it hasn't been saved). In Post-Operation, the Account exists, so you can successfully link the new Task to it.

## The Database Transaction

Understanding the database transaction is critical for enterprise data integrity.

Stages 20 (Pre-Operation), 30 (Main Operation), and 40 (Post-Operation) all execute within a single **SQL Database Transaction**.

If your Post-Operation plugin attempts to create a related Task, and that creation fails (perhaps due to a missing mandatory field), your plugin will throw an exception. Because it is inside the transaction, **Dataverse will roll back the entire transaction**. The Account that was saved in Stage 30 will be deleted from the database, and the user will see an error.

*This guarantees that you never end up with orphaned data (an Account without its required Welcome Task).*

## Synchronous vs Asynchronous

- **Stages 10, 20, and 40** can execute **Synchronously** (blocking the user).
- **Only Stage 40 (Post-Operation)** can execute **Asynchronously** (in the background). You cannot have an asynchronous Pre-Operation plugin, because the system cannot wait in the background before saving the data.

## Best Practices

- **Use Pre-Operation for data modification:** If you want to change the value of a field on the record being saved, always use Pre-Operation (Stage 20). If you try to do this in Post-Operation (Stage 40), the record has already been saved, meaning you will have to execute a *second* \`Update\` command, which takes twice as long and triggers a second execution pipeline.
- **Keep Pre-Validation fast:** Only use Stage 10 for rapid, initial sanity checks. Do not put heavy processing here.

## Common Mistakes

> [!WARNING]
> **Querying the record in Pre-Operation** — If you write a Pre-Operation (Stage 20) plugin that runs on the \`Create\` of an Account, and your code attempts to query the database to read that Account... it will fail. The Account does not exist in the database until Stage 30. If you need to read the data the user just submitted, read the **Target** from the Execution Context, do not query the database.

## Things to Remember

- **Stage 10 (Pre-Validation):** Fast checks, outside the transaction.
- **Stage 20 (Pre-Operation):** Modify the data before it saves.
- **Stage 30 (Main Operation):** Microsoft only (SQL Execution).
- **Stage 40 (Post-Operation):** Create related records using the newly generated GUID.

## Related Topics

- [Execution Context](/docs/plugins/execution-context) — the data package passed through these stages
- [Images](/docs/plugins/images) — how to view the data before and after the Main Operation

## What's Next

Now that we understand the pipeline, we need to know what triggers it. Next, we will cover the events that start the pipeline: **Messages**.
  `.trim(),
};
