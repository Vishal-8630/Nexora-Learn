import { DocContent } from "@/types/docs";

export const publishers: DocContent = {
  title: "Publishers & Prefixes",
  description:
    "Learn the role of a Publisher in Dataverse ALM, how they prevent naming collisions in the SQL database, and why you must never use the default publisher.",
  content: `
## Introduction

When you create a new Solution in Dataverse, you must assign it to a **Publisher**. 

A Publisher represents the entity that created the solution. If you buy an app from the AppSource store, the publisher might be "Adobe" or "DocuSign". If you are building an app internally for your own company, the publisher should be your company name (e.g., "Contoso").

## The Publisher Prefix

The most important configuration on a Publisher record is the **Prefix**.

The prefix is a short string of characters (2 to 8 letters) that Dataverse automatically prepends to the schema name of every custom component you create inside that solution.

- If the Publisher Prefix is \\\`con\\\`, and you create a table called "Job Application", the actual SQL database table name becomes \\\`con_jobapplication\\\`.
- If you create a custom column on the standard Account table called "Risk Score", the schema name becomes \\\`con_riskscore\\\`.

## Preventing Naming Collisions

Why does Dataverse force this prefixing architecture? **To prevent the database from exploding during upgrades.**

Imagine you build a custom "Event Management" app. You create a table called \\\`Event\\\`. You deploy this to Production.
Six months later, your company buys a massive Marketing software package from an ISV (Independent Software Vendor) and installs it in Production. The ISV app also contains a table called \\\`Event\\\`.

If prefixes did not exist, the SQL database would crash due to a schema collision (two tables cannot have the exact same name). 
Because of prefixes, your table is named \\\`con_event\\\` and the ISV's table is named \\\`isv_event\\\`. Both tables exist peacefully in the same database.

## The Default Publisher (CRMD)

When you spin up a new Dataverse environment, Microsoft provides a default publisher (CDS Default Publisher) with a random prefix, usually \\\`cr\\\` followed by three random characters (e.g., \\\`cr82f\\\`).

> [!WARNING]
> **Never use the default publisher for enterprise apps.**
> If your tables are named \\\`cr82f_jobapplication\\\`, it looks incredibly unprofessional. More importantly, if you move to a new environment, that environment will have a *different* random default prefix (e.g., \\\`cr99a\\\`), making your ALM strategy chaotic and unreadable.

## Creating a Corporate Publisher (Best Practice)

Before a developer writes a single line of code or creates a single table in a new environment, the System Administrator must establish the corporate standard.

1. Go to the Maker Portal -> **Solutions** -> **Publishers** tab.
2. Click **New Publisher**.
3. Name: \\\`Contoso IT\\\`
4. Prefix: \\\`con\\\`
5. Option Value Prefix: \\\`10000\\\` (Used to prevent collisions in global Choice/OptionSet integer values).

From that day forward, every single custom solution created in that environment must be assigned the \\\`Contoso IT\\\` publisher.

## What Problem Does This Solve?
Publishers solve the problem of **Ownership and Namespacing**. By looking at the schema prefix of any column or table, a senior developer immediately knows who built it (Internal IT, Microsoft, or a 3rd Party Vendor).

## Things to Remember

- A **Publisher** owns the Solution.
- The **Prefix** prevents schema naming collisions in the database.
- Never use the **Default Publisher (\\\`crxxx_\\\`)**.
- Establish a **corporate Publisher and Prefix** before beginning development.

## What's Next

ALM is about moving apps from Dev to Prod. But what if your app connects to an external API, and the URL is different in Dev than it is in Prod? We solve this using **Environment Variables**.
  `.trim(),
};
