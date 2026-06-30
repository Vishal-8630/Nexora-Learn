import { DocContent } from "@/types/docs";

export const almOverview: DocContent = {
  title: "Application Lifecycle Management (ALM)",
  description:
    "Application Lifecycle Management (ALM) encompasses governance, development, and deployment. Learn how to move Dataverse Solutions safely from Development to Production.",
  content: `
## Introduction

If you build a custom Model-Driven App or Power Automate Flow directly in the Production environment and make a mistake, business grinds to a halt. Real users lose data, and the system breaks.

Professional software engineering teams use **Application Lifecycle Management (ALM)**. They build features in an isolated Development environment, test them in a UAT (User Acceptance Testing) environment, and deploy them to Production using automated pipelines.

In Dynamics 365 and the Power Platform, the core vehicle for ALM is the **Solution**.

## Understanding Solutions

A **Solution** is a logical container. Whenever you create a new Table, write a C# Plugin, build a Power Automate flow, or customize a Form, you must do it *inside* a Solution.

When you are ready to deploy your new feature, you export the Solution from Dev, and import it into Prod.

### The Default Solution
If you do not create a custom solution, your customizations are added to the "Default Solution". 

> [!WARNING]
> **Never build in the Default Solution.** 
> It contains every component in the environment. It is impossible to export your specific customizations to another environment if they are tangled in the Default Solution.

## Unmanaged vs Managed Solutions (The Core Concept)

This is the most critical concept in Dynamics 365 ALM.

### Unmanaged Solutions (The Development State)
- Used *only* in Development environments.
- They are an **open box**. You can freely add, remove, and edit components inside them.
- Deleting an unmanaged solution from an environment only deletes the "container", it does *not* delete the tables or data within it.

### Managed Solutions (The Production State)
- Used in Test, UAT, and Production environments.
- They are a **sealed, locked box**. When you import a Managed Solution into Production, users and admins cannot accidentally edit or delete the components inside it.
- **Crucial:** If you delete a Managed Solution from an environment, Dataverse will permanently delete all tables, columns, and data associated with that solution. This is how you cleanly uninstall an application.

> [!CAUTION]
> **The Golden Rule of ALM:** Never, ever import an Unmanaged Solution into a Production environment. It permanently ruins the environment's upgrade path.

## Environment Strategy

A standard enterprise environment strategy requires a minimum of three Dataverse environments:
1. **DEV (Development):** Where makers and developers build Unmanaged solutions.
2. **UAT/QA (Testing):** Where solutions are imported as Managed. QA teams test the app with realistic data.
3. **PROD (Production):** Where real users work. Solutions are imported as Managed.

## Publisher and Prefix

Every solution must have a **Publisher** (representing your company or team).
The Publisher defines a **Prefix** (e.g., \\\`con_\\\` for Contoso). 

When you create a new table in the solution, Dataverse automatically prepends the prefix to the schema name (e.g., \\\`con_account\\\`). This prevents naming collisions. If you install an AppSource app that also has an \\\`account\\\` table, their prefix (e.g., \\\`msft_account\\\`) ensures the database doesn't crash.

## Source Control (Git)

Historically, Dynamics 365 solutions lived only in the Dataverse database. Today, professional teams treat Dataverse solutions like standard software code.

Using the **Power Platform CLI (\\\`pac solution unpack\\\`)**, you can extract a \\\`.zip\\\` solution file into raw XML and JSON text files. You commit these text files into a Git repository (like GitHub or Azure Repos). 

**Benefits:**
- **Version Control:** You can see exactly who changed a specific column's length on a specific date.
- **Disaster Recovery:** If the Dev environment is accidentally deleted, you can reconstruct the entire application from the Git repository.

## Automated Pipelines (CI/CD)

Manually exporting and importing solutions is prone to human error. Teams use **Azure DevOps** or **GitHub Actions** to automate deployments.

**A standard CI/CD Pipeline flow:**
\\\`\\\`\\\`text
1. Developer commits code to Git branch.
2. Pull Request is approved.
3. Pipeline runs Power Apps Solution Checker (Security scan).
4. Pipeline packs raw XML into a Managed .zip file.
5. Pipeline imports .zip into UAT environment.
\\\`\\\`\\\`

## When to Use What? (Decision Making)

- **Power Platform Pipelines:** Use Microsoft's native, in-product pipelines if your team lacks Azure DevOps experience or wants a simple, visual click-to-deploy process without Git source control.
- **Azure DevOps / GitHub Actions:** Use this for Enterprise ALM. It provides true source control, Pull Request approvals, and automated security scanning.

## Things to Remember

- ALM prevents you from **breaking Production**.
- Build in **DEV (Unmanaged)**, deploy to **PROD (Managed)**.
- Never deploy without a **Publisher Prefix** to prevent database collisions.
- Store your unpacked solutions in **Source Control (Git)** for disaster recovery.
- Automate deployments using **Azure DevOps** or native **Pipelines**.
  `.trim(),
};
