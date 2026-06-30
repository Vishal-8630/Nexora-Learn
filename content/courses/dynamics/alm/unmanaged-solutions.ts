import { DocContent } from "@/types/docs";

export const unmanagedSolutions: DocContent = {
  title: "Unmanaged Solutions (Development)",
  description:
    "Learn the characteristics of Unmanaged Solutions, why they are used exclusively in Development environments, and the risks of deploying them to Production.",
  content: `
## Introduction

When you click "New Solution" in the Power Apps Maker Portal, you are creating an **Unmanaged Solution**.

An Unmanaged Solution is the raw, editable, open state of your application. It is the only state in which makers and developers can actively build and customize components.

## Characteristics of Unmanaged Solutions

1. **Fully Editable:** You can freely add new tables, delete columns, rewrite JavaScript, and modify Power Automate flows.
2. **Open Container:** The solution acts simply as a logical grouping of pointers. The actual metadata belongs to the environment's Default Solution.
3. **No Safety Nets:** Because it is just a grouping of pointers, deleting an Unmanaged Solution does **not** delete the data or tables inside it. It merely deletes the "folder," leaving all the tables scattered in the Default Solution.

## The Role in the ALM Lifecycle

Unmanaged Solutions have one purpose: **Development**.

Your Development (DEV) environment is the only place an Unmanaged Solution should exist. This is your sandbox. If a developer creates a test table called "Temporary Upload Data", decides they don't need it, and deletes it, that's fine—it's just a Dev environment.

When a feature is finished, you do not move the Unmanaged Solution to QA or Production. You export it as Managed.

## Exporting an Unmanaged Solution

While you should never import Unmanaged into Prod, you *can* export an Unmanaged Solution as a \\\`.zip\\\` file.

**Why would you export an Unmanaged Solution?**
1. **Source Control:** You extract the \\\`.zip\\\` into raw XML/JSON files using the Power Platform CLI (\\\`pac solution unpack\\\`) and commit those files to a Git repository for version control.
2. **Developer Handoff:** Moving the code to a different developer's personal sandbox environment so they can continue working on it.

## The Active Customization Layer (Why Unmanaged is Dangerous)

To understand why Unmanaged Solutions are dangerous outside of Dev, you must understand the **Dataverse Solution Layering Architecture**.

Dataverse applies customizations like layers of paint.
- The base layer is the standard Microsoft system (System Solution).
- Managed Solutions are painted on top of that.
- **Unmanaged Customizations (The Active Layer) are painted on top of everything.**

The Unmanaged Active Layer always wins. 

### The Disaster Scenario

Imagine you ignore enterprise best practices and import your "Contoso HR App" into Production as an **Unmanaged Solution**.

1. The HR App has a form with 5 fields.
2. An admin in Production decides they want to hide one field. Because the solution is Unmanaged, the system allows them to open the form in Production and hide it. This creates an **Active Customization**.
3. A month later, the Dev team completely redesigns the HR form, adding 10 new fields. They export the new Unmanaged Solution from Dev and import it into Prod.
4. **The Deployment Fails (Silently).** 
   - Dataverse looks at the new form coming in from Dev.
   - It sees the manual Active Customization the admin made directly in Prod.
   - Because Active Customizations sit on top, Dataverse assumes the admin's manual Prod changes are more important than the Dev deployment, and it refuses to overwrite the form.
5. The users complain that they don't see the new 10 fields. The Dev team has no idea why, because the import succeeded without errors.

> [!CAUTION]
> **Never import Unmanaged Solutions into Production.** It permanently taints the environment with unmanaged Active Customizations, making future automated deployments impossible to predict or overwrite.

## When to Use What? (Decision Making)

- **Unmanaged:** Only in Development. Use it as your editable workspace.
- **Managed:** Everywhere else (UAT, QA, PROD). Use it to lock down code and ensure clean upgrades.

## Things to Remember

- Unmanaged Solutions are **open, editable, and unrestricted**.
- They belong **exclusively in Development environments**.
- Deleting them does **not** delete the underlying tables or data.
- Exporting them is primarily for **Source Control (Git)**.
- Unmanaged changes sit at the very top of the **Solution Layering** stack and win all conflicts.

## What's Next

If Unmanaged Solutions belong in Dev, what do we deploy to Production? Next, we cover the sealed, immutable state of the application: **Managed Solutions**.
  `.trim(),
};
