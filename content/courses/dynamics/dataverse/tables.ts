import { DocContent } from "@/types/docs";

export const tables: DocContent = {
  title: "Tables in Dataverse",
  description:
    "Tables are the foundational data structures in Dataverse. Learn about standard vs custom tables, ownership models, and specialized table types like Activity and Virtual tables.",
  content: `
## Introduction

Data in Microsoft Dataverse is structured much like a traditional relational database (like SQL Server), but heavily abstracted to be user-friendly. The most fundamental building block of this structure is the **Table**. 

If you are building an application to track properties, students, or fleet vehicles, you will create a Table to hold that data.

*Note: In older versions of Dynamics CRM, Tables were referred to as **Entities**.*

## What is it?

A **Table** is a logical container for data. It represents a specific business concept (e.g., an \\\`Account\\\`, a \\\`Contact\\\`, or a \\\`Support Case\\\`).

A table contains **Columns** (the properties of the record) and **Rows** (the actual data records). For example, the \\\`Account\\\` table has columns like \\\`Account Name\\\` and \\\`Main Phone\\\`, and a row in that table might contain the data "Contoso Corp" and "555-0199".

## Types of Tables

When working in Dataverse, you will encounter two primary categories of tables:

### 1. Standard Tables (Common Data Model)
These are tables that come out-of-the-box with Dataverse (e.g., \\\`Account\\\`, \\\`Contact\\\`, \\\`User\\\`, \\\`Team\\\`). These form the **Common Data Model (CDM)**. 
- You can customize them (add new columns, forms, views), but you cannot delete them.
- **Best Practice:** Always use a standard table if it fits your business requirement. Do not create a custom "Client" table if the standard \\\`Account\\\` table works. You lose out on native Microsoft AI features and integrations if you reinvent the wheel.

### 2. Custom Tables
These are tables you create from scratch to handle highly unique business requirements (e.g., \\\`Property\\\`, \\\`Vehicle\\\`, \\\`Event\\\`).

## Decision Making: Ownership Models

When you create a custom table, you must define its **Ownership**. This is a critical architectural decision because it determines how security is applied to the records in that table. 

> [!CAUTION]
> **This decision is permanent.** Once a table is created, you cannot change its ownership type.

1. **User or Team Owned:** Every row in the table belongs to a specific User or Team. 
   - *When to use:* If an \\\`Opportunity\\\` is owned by the salesperson working on the deal, and you need to use security roles to restrict other sales reps from seeing it. Always default to this type unless you have a strict reason not to.
2. **Organization Owned:** The records belong to the entire organization. There is no concept of a specific owner, meaning the "Assign" privilege does not exist.
   - *When to use:* For reference data, like a \\\`Country\\\` or \\\`Currency\\\` table. Everyone in the organization either has access to all countries or none.

## The Primary Column

Every custom table you create must have a **Primary Column**. 

This is always a single line of text. It is the human-readable identifier for the record (e.g., the "Name" of the Account, or the "VIN Number" of the Vehicle). When this record is referenced by another table (in a lookup), this is the text that appears as the hyperlink on the screen.

## Specialized Table Types

Beyond standard data storage, Dataverse offers specialized table types for advanced scenarios:

### Activity Tables
An Activity table represents an action that takes place at a specific point in time (e.g., a Phone Call, an Email, an Appointment, or a Task). 
When you create a custom table, you can designate it as an Activity table. It will automatically inherit standard activity columns (like \\\`Subject\\\`, \\\`Start Time\\\`, \\\`End Time\\\`) and will natively appear in the unified "Timeline" control on standard forms.

### Virtual Tables
A Virtual table looks and acts like a normal Dataverse table in a Model-Driven app, but **the data does not physically live in Dataverse**. 
Instead, Dataverse connects live to an external database (like Azure SQL or an external REST API) when a user opens the grid. This is used when you need to view millions of rows of legacy ERP data in your CRM without duplicating the data and paying for expensive Dataverse storage.

### Elastic Tables
A newer feature designed for high-volume, massive-scale telemetry data (tens of millions of rows). They are backed by Azure Cosmos DB rather than Azure SQL. They support unstructured JSON data and offer exponentially faster read/write speeds, but they lack some of the advanced relational integrity features of standard tables.

## Best Practices

- **Get ownership right:** If there is *any* chance you will ever need to restrict access to rows based on who created or manages them, choose **User or Team Owned**.
- **Use standard tables first:** Before creating a custom \\\`Employee\\\` table, check if the standard \\\`User\\\` or \\\`Contact\\\` tables can be adapted.

## Common Mistakes

> [!WARNING]
> **Ignoring the Primary Column** 
> Leaving the default primary column name as simply "Name" when creating a custom table like \\\`Vehicle\\\` can cause immense confusion for users and developers. Rename the primary column to something meaningful, like \\\`Vehicle Name\\\` or \\\`VIN Number\\\`, immediately during table creation.

## Things to Remember

- Tables were formerly called **Entities**.
- The **Common Data Model** provides out-of-the-box Standard tables.
- **Ownership (User vs Organization)** dictates how row-level security works and cannot be changed after creation.
- **Virtual Tables** display external data without storing it in Dataverse.

## What's Next

Now that we understand how to create containers for our data (Tables), we need to define the specific pieces of data we want to track inside them. Next, we cover **Columns**.
  `.trim(),
};
