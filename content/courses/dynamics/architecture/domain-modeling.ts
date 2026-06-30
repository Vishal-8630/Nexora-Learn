import { DocContent } from "@/types/docs";

export const domainModeling: DocContent = {
  title: "Domain Modeling",
  description:
    "Learn how to architect robust, scalable Dataverse databases using the Common Data Model (CDM) and normalization strategies.",
  content: `
## Introduction

Every Dynamics 365 implementation is, at its core, a massive SQL database. If you build the user interface and write the C# code before solidifying the database schema, your project will inevitably fail.

**Domain Modeling** is the architectural practice of identifying the physical entities (Tables), their attributes (Columns), and their relationships (1:N, N:N) to map to a real-world business process.

## The Common Data Model (CDM)

The most important rule in Dataverse Domain Modeling is: **Do not reinvent the wheel.**

Microsoft provides the **Common Data Model (CDM)** out-of-the-box. This is a standardized, open-source schema that includes hundreds of predefined tables (Account, Contact, Lead, Opportunity, Case).

If the business requirement is to "Track companies we do business with", do not create a custom table called \\\`contoso_Company\\\`. Use the out-of-the-box \\\`Account\\\` table. 

**Why?** Using the CDM ensures that Microsoft's 1st-party AI tools (like Sales Copilot), Dynamics 365 applications, and third-party AppSource extensions will seamlessly integrate with your database out of the box.

## Normalization vs Denormalization

Dataverse is a relational database. Standard database normalization rules (3rd Normal Form) generally apply.

### Normalization (The Default)
If an "Order" has multiple "Products", you must create an \\\`Order\\\` table and an \\\`Order Line\\\` table with a 1:N relationship. 

> [!CAUTION]
> **Anti-Pattern:** Do not create 10 columns on the Order table (\\\`Product1\\\`, \\\`Product2\\\`, \\\`Product3\\\`). This destroys reporting capabilities and limits the system to exactly 10 products.

### Denormalization (The Exception)
While Dataverse is relational, FetchXML and OData queries have limits on how many joins they can execute efficiently. 

If you have a complex dashboard that requires joining 15 tables together, the SQL execution plan will be extremely slow. 
In highly specific performance scenarios, a Senior Architect may choose to **denormalize** data (e.g., using a background C# plugin to copy the "Parent Account Region" down onto every child "Contact" record) to eliminate the need for an Outer Join in the reporting query. Only do this if reporting performance is suffering.

## Polymorphic Lookups (Customer)

Dataverse supports a special type of relationship called a Polymorphic Lookup, specifically the **Customer** data type.

A standard Lookup column can only point to *one* table. (e.g., A Lookup to the Account table).
A Customer column can point to *either* the Account table OR the Contact table.

**Decision Making:** If you are building a B2C (Business to Consumer) application where a "Ticket" can belong to a massive Corporation (Account) or an individual person (Contact), always use the polymorphic Customer data type rather than creating two separate lookups.

## Alternate Keys

By default, every row in Dataverse is uniquely identified by a massive GUID (e.g., \\\`b2a19cdd-88df-e311-b8e5-6c3be5a8b200\\\`).

External ERP systems (like SAP or Oracle) do not speak GUID. They use sequential integers (e.g., Invoice Number \\\`INV-10045\\\`).

To integrate efficiently, the architect must define **Alternate Keys** on Dataverse tables. 

When you mark the \\\`InvoiceNumber\\\` column as an Alternate Key, Dataverse provisions a unique SQL Index on that column. This prevents duplicates and allows the external ERP to upsert (Update or Insert) records using their own native ID, rather than forcing the external system to query and cache the Dataverse GUID first.

## Best Practices

- **Draw it out:** Always use a tool like Visio or draw.io to diagram the Entity Relationship Diagram (ERD) before creating tables in Dataverse.
- **Limit N:N Relationships:** Many-to-Many relationships are native, but they hide the intersection table. If you ever need to track data on the relationship itself (e.g., the *Date* a Contact attended an Event), you must create a manual intersection table (1:N and N:1) instead of using the native N:N.

## Things to Remember

- Always use the **Common Data Model (CDM)** tables before building custom ones.
- **Normalize** data to 3NF, but carefully **denormalize** for dashboard performance if necessary.
- Use the **Customer (Polymorphic)** lookup for B2B/B2C flexibility.
- Define **Alternate Keys** for external system integrations to avoid GUID management.

## What's Next

Once the tables are mapped out on a whiteboard, they must be created in the system. To prevent chaos, architects must enforce strict **Naming Conventions**.
  `.trim(),
};
