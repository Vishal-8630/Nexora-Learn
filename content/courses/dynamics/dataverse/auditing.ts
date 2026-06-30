import { DocContent } from "@/types/docs";

export const auditing: DocContent = {
  title: "Auditing in Dataverse",
  description:
    "Auditing allows organizations to track changes made to data over time, answering the critical questions of who changed what, when they changed it, and what the old value was.",
  content: `
## Introduction

In enterprise software, data is constantly changing. A customer's phone number gets updated, an opportunity's estimated value drops by $10,000, or a highly sensitive support case is reassigned.

When something goes wrong—or when compliance officers come knocking—the business needs to know exactly what happened. **Dataverse Auditing** provides a historical log of all data changes.

## What is it?

**Auditing** is an out-of-the-box feature in Microsoft Dataverse that tracks Create, Update, Delete, and User Access events on records.

When auditing is enabled, an authorized user can open a record (like an Account), click on the "Audit History" tab, and see a chronological list of every change ever made to that record.

## Why do we need it? (Real-World Use Cases)

1. **Compliance & Legal:** Heavily regulated industries (finance, healthcare, government) are legally required to prove who accessed or modified sensitive data.
2. **Troubleshooting:** When a sales manager complains, *"My 50 Opportunities disappeared,"* an administrator can use the audit log to determine that a rogue Power Automate flow deleted them at 2:00 AM.
3. **Data Recovery:** If a user accidentally overwrites a complex proposal document, you can look at the audit log to find the old value and restore it manually.

## How does it work?

Auditing in Dataverse operates on three hierarchical levels. For a specific column to be audited, auditing must be explicitly enabled at **all three levels**.

### 1. Global Level (Environment)
Auditing must first be turned on for the entire Dataverse environment in the Power Platform Admin Center. You can also configure specific global settings, such as logging user sign-ins.

### 2. Table Level
Once global auditing is on, you must enable it on a per-table basis. 
- *Decision:* You might turn it on for the \\\`Account\\\` table, but leave it off for a temporary \\\`Integration Log\\\` table to save storage space.

### 3. Column Level
By default, when you enable auditing on a table, all columns are audited. However, you can (and should) disable auditing on specific high-frequency columns.
- *Decision:* You probably want to audit changes to an employee's \\\`Salary\\\` column. You probably do **not** want to audit changes to a \\\`Last GPS Location\\\` column if it updates via API every 5 minutes, as this will destroy your storage capacity.

## Where is Audit Data Stored? (Architecture)

Audit logs are **not** stored in the standard Dataverse relational database. 

Because audit logs grow massively over time, Microsoft stores them in a specialized **Log Storage** capacity (backed by Cosmos DB) to keep relational database performance high. Log storage is exponentially cheaper than standard database storage, but it still has limits.

> [!TIP]
> **Automate Retention**
> Administrators can and should set retention policies (e.g., "Delete audit logs older than 2 years") to manage Log Storage costs automatically.

## User Access Auditing (Read Auditing)

Standard auditing tracks *modifications* (Updates and Deletes). 

**Read Auditing** is an advanced compliance feature that tracks when a user simply *looks* at a record. This is crucial for HIPAA compliance (e.g., "Who looked at John Doe's medical file today?"). 

**Warning:** Because this generates an immense amount of data (logging a row every time someone opens a form or views a grid), it must be used sparingly and only on highly sensitive tables.

## Common Mistakes

> [!WARNING]
> **Trying to query audit data in standard views** 
> Audit logs are not standard Dataverse tables. You cannot easily create a Model-Driven View, a Power Automate list rows step, or a Power BI chart directly against the native Audit log using standard tools. If you need complex reporting on changes, you must extract the audit data to **Azure Data Lake** or Synapse first using Synapse Link.

## Things to Remember

- Auditing tracks **Who**, **What**, and **When**.
- It requires configuration at three levels: **Global**, **Table**, and **Column**.
- It consumes specialized **Log Storage**, which should be managed with Retention Policies.
- **Read Auditing** tracks when users view data, but generates massive amounts of logs.

## What's Next

Now that we know how to track what users are doing, we need to define what they are actually *allowed* to do. Next, we will cover the most important architectural concept in Dataverse: the **Security Model**.
  `.trim(),
};
