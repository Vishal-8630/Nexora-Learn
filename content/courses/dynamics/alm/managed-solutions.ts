import { DocContent } from "@/types/docs";

export const managedSolutions: DocContent = {
  title: "Managed Solutions (Production)",
  description:
    "Learn why Managed Solutions are the cornerstone of enterprise ALM, how they lock down environments, and how they handle component deletion via upgrades.",
  content: `
## Introduction

When a feature is finished in Development, you export the Unmanaged Solution. During the export process, Dataverse gives you a critical architectural choice: Export as Unmanaged, or Export as **Managed**.

A **Managed Solution** is a compiled, sealed, and locked version of your application. It is the final artifact that MUST be deployed to all downstream environments (QA, UAT, and Production).

## Characteristics of Managed Solutions

1. **Immutable (Locked):** When you import a Managed Solution into Production, the components inside it cannot be directly edited by standard users. If an admin tries to modify a Managed Power Automate flow or edit a Managed Table, the Maker Portal will block them and display a padlock icon.
2. **Layered:** Managed Solutions stack cleanly on top of one another, forming predictable behavior.
3. **Clean Uninstallation:** Because a Managed Solution owns its metadata, if you delete a Managed Solution from an environment, Dataverse permanently deletes all tables, columns, and data associated with it.

## Why Use Managed Solutions in Production?

### 1. Preventing "Shadow IT"
If you use Managed Solutions, it is impossible for a rogue administrator or "citizen developer" to randomly delete columns or modify JavaScript directly in Production. All changes *must* go through the proper Development pipeline, ensuring auditable Source Control.

### 2. Upgrades and Patching
When you deploy version \`1.0.0\` of your Managed Solution to Production, it installs cleanly.
When you finish new features in Dev and deploy version \`1.1.0\`, Dataverse performs an **Upgrade**. It intelligently merges the new components and applies updates without overwriting existing data.

### 3. Deleting Columns (The Upgrade Process)
This is the most powerful feature of Managed Solutions. 

Imagine you create a custom column called "Fax Number" in Dev, and deploy it to Prod. A year later, you realize nobody uses Fax anymore.
- In Dev (Unmanaged), you simply click "Delete" on the column. It vanishes from the Dev UI.
- When you deploy the new version of the Managed Solution to Prod as an **Upgrade**, Dataverse notices the column is missing from the incoming package. 
- Dataverse automatically drops the "Fax Number" column from the Production SQL database, securely deleting the schema and its data. 
- *This clean removal is impossible to do with Unmanaged deployments.*

## Solution Layering (The Stack)

Dataverse evaluates the UI based on a strict layering system, rendering from bottom to top.

\`\`\`text
Active Customizations (Top Layer - Wins all conflicts)
       ▲
Managed Solution B (Your custom App v1.1)
       ▲
Managed Solution A (AppSource ISV package)
       ▲
System Layer (Microsoft Dataverse Base)
\`\`\`

If Solution A renames the Account table to "Companies", but Solution B renames it to "Clients", Dataverse looks at the highest Managed layer. Solution B was installed last (higher in the stack), so the table will be called "Clients".

## When to Use What? (Decision Making)

### Managed vs Unmanaged
- **Use Unmanaged Solutions** ONLY in your Development environment. This is your "source code" workspace where everything is editable.
- **Use Managed Solutions** in every other environment (TEST, UAT, PROD). Once code leaves Dev, it must be locked. 

## Managed Properties

While Managed Solutions lock down components by default, as a developer in the Dev environment, you have the power to define exactly *how* locked down a component should be before you export it.

These are called **Managed Properties**.

For example, you create a custom \`Leave Request\` table in Dev. Before exporting, you can open its Managed Properties and set "Can be customized" to \`True\`. 
When you deploy this as a Managed Solution to Production, the table structure itself (the columns) is locked, but local Prod admins are allowed to change the Display Name of the table or add their own custom Views.

**Enterprise Recommendation:** If you are an ISV building an app to sell on AppSource, you open Managed Properties to let customers tweak the app. If you are an internal Enterprise IT team, the rule is usually: **Lock everything (Set all to False).**

## Common Mistakes

> [!CAUTION]
> **Active Customizations in Prod**
> If a System Administrator edits a Managed Form directly in Production, Dataverse creates an "Active Customization" (Unmanaged) layer at the very top of the stack.
> Because the Active Layer wins all conflicts, if your dev team later deploys a new Managed update to that Form, the users will not see the update! The manual Prod edit will permanently override your pipeline deployments until the Active Layer is manually removed.

## Best Practices

- **Never import Unmanaged to Prod:** This cannot be stressed enough. It ruins the environment and makes upgrades impossible.
- **Solution Segmentation:** Do not put your entire CRM into one massive Solution. Break it down logically (e.g., \`Core_Data\`, \`Sales_App\`, \`Service_App\`) to make Managed deployments faster and less risky.
- **Always Increment Versions:** Ensure you increment the Solution version number before export so Dataverse recognizes it as an Upgrade rather than a reinstall.

## Things to Remember

- Managed Solutions are **sealed, compiled artifacts**.
- They belong in **QA, UAT, and Production**.
- They prevent users from making **untested changes directly in Prod**.
- Deleting a Managed Solution **permanently deletes its data**.
- Deploying a new version triggers an **Upgrade**, cleanly removing deprecated columns.

## What's Next

When you create a solution (Managed or Unmanaged), you must assign it an owner. In Dataverse, this owner is called a **Publisher**.
  `.trim(),
};
