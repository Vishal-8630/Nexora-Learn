import { DocContent } from "@/types/docs";

export const dataverse: DocContent = {
  title: "Dataverse",
  description:
    "Microsoft Dataverse is the secure, scalable cloud database that stores all data for Dynamics 365 CRM applications and the Power Platform.",
  content: `
## Introduction

Data is the foundation of any business application. In the Microsoft ecosystem, that foundation is **Microsoft Dataverse**.

If you are developing for Dynamics 365 (Sales, Customer Service, Field Service), every record you create, every field you update, and every plugin you write interacts directly with Dataverse.

## What is it?

**Microsoft Dataverse** is a managed, cloud-based data platform. It is much more than just a database.

While it uses Azure SQL under the hood to store relational data, it abstracts away the database management. You do not write SQL queries to create tables, and you do not manage database indexes or server performance.

Instead, Dataverse provides a comprehensive API and management layer that handles:
- **Data storage** (relational, file, and log data)
- **Security** (role-based, row-level, and column-level access control)
- **Logic** (business rules, workflows, plugin execution)
- **Integration** (RESTful Web API, event publishing)

## Why do we need it?

Before Dataverse, companies would spin up a SQL Server database for every new custom application they built. This led to fragmented data, complex integration projects just to get two apps to talk to each other, and duplicate security models to manage.

Dataverse solves this by providing a single, secure, scalable repository for all business data. Because Dynamics 365 and custom Power Apps all point to the same Dataverse instance (Environment), data is instantly shared. An Account created in Dynamics 365 Sales is immediately visible to a custom Canvas app used by the delivery team.

## How does it work?

Dataverse organizes data into **Tables** (formerly known as Entities).

- A **Table** represents a concept (e.g., Account, Contact, Invoice).
- A table contains **Columns** (formerly known as Attributes or Fields) that store specific pieces of data (e.g., First Name, Email, Revenue).
- Tables are connected via **Relationships** (e.g., One Account has Many Contacts).

### The Common Data Model (CDM)

When you provision a new Dataverse environment, it doesn't come empty. It includes a standard set of tables out-of-the-box (like Account, Contact, User, Team). This standard schema is called the **Common Data Model**.

Because every Dynamics 365 system uses this same underlying model, third-party developers can build apps and integrations that they know will work across any customer's environment.

## Advanced Capabilities

Dataverse is not just for storing text and numbers. It automatically handles:

1. **File and Image storage** — storing large attachments in Azure Blob Storage automatically to save costs, while keeping them linked to records.
2. **Auditing** — tracking exactly who changed what piece of data, and when.
3. **Search** — Dataverse Search provides fast, relevance-based search across multiple tables simultaneously.
4. **Offline data** — allowing mobile Model-driven and Canvas apps to download data, work offline, and sync changes back when reconnected.

## Example

A hospital uses Dynamics 365 Customer Service to manage patient inquiries, but they also need a custom portal for patients to book appointments.

1. The patient records live in the standard \`Contact\` table in **Dataverse**.
2. A developer creates a custom \`Appointment\` table in Dataverse, with a relationship to the \`Contact\` table.
3. The Dynamics 365 Customer Service agents can see the Appointments directly in their Model-Driven App.
4. The patient portal (built with Power Pages) securely reads and writes to that exact same \`Appointment\` table in Dataverse via the Web API.

There is no data synchronization or middleware required, because both applications sit on top of the same Dataverse environment.

## Best Practices

- **Reuse standard tables** — Always use the out-of-the-box tables (like Account and Contact) if they fit your needs. Do not create a custom "Client" table if the standard "Account" table works.
- **Use the Web API** — When interacting with Dataverse from external systems (like a Node.js backend or a React frontend), always use the standard Dataverse Web API.
- **Understand security early** — Dataverse has a robust security model (Business Units, Security Roles). Design your data structure with security in mind from day one.

## Common Mistakes

> [!WARNING]
> **Treating Dataverse like SQL Server** — Developers with SQL backgrounds often try to perform complex relational joins or bulk operations that Dataverse isn't optimized for. Dataverse is an API-first platform; you must interact with it through its provided SDKs and Web API, not direct SQL queries (though read-only SQL querying is supported via TDS).

## Things to Remember

- Dataverse is the database beneath Dynamics 365 CRM applications and the Power Platform.
- It provides data storage, security, logic, and integration out-of-the-box.
- It uses standard Tables, Columns, and Relationships (the Common Data Model).
- You interact with it via the Web API, SDKs, or low-code tools — never direct SQL writes.

## Related Topics

- [Power Platform Overview](/docs/power-platform/overview) — how Dataverse fits into the suite
- [Dataverse Tables](/docs/dataverse/tables) — detailed look at creating and configuring tables
- [Dataverse Columns](/docs/dataverse/columns) — the different types of data you can store
- [Dataverse Security](/docs/dataverse/security) — how access control works

## What's Next

Now that we understand the UI (Power Apps) and the database (Dataverse), we will look at how to automate business processes and connect to external systems using **Power Automate**.
  `.trim(),
};
