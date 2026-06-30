import { DocContent } from "@/types/docs";

export const solutions: DocContent = {
  title: "Solutions (The Container)",
  description:
    "Learn the foundational concept of Dataverse Solutions, how they act as transport containers for customizations, and the difference between Default and Custom solutions.",
  content: `
## Introduction

A **Solution** is the fundamental building block of Application Lifecycle Management (ALM) in Microsoft Power Platform and Dynamics 365.

Every time you create a new Table, build a Power Automate Flow, write a C# Plugin, or customize a Model-Driven Form, that component is saved in the Dataverse database. However, if those components are scattered randomly across the database, it is impossible to package them up and move them to a different environment.

A Solution is a logical container. You put your components into a Solution so they can be transported as a single, cohesive unit.

## The Default Solution

When you first open the Power Apps Maker Portal and look at the "Tables" or "Flows" tab without explicitly opening a Solution, you are working in the **Default Solution**.

> [!WARNING]
> **Never build enterprise applications in the Default Solution.**
> The Default Solution contains *every single component* in your entire environment. If you build your custom HR app here, it will be permanently tangled with Microsoft's internal tables and other department's apps. You will never be able to export it cleanly to Production.

## Custom Solutions

To build properly, you must always create a **Custom Solution**.

1. Navigate to **Solutions** in the Maker Portal.
2. Click **New solution**.
3. Provide a Display Name (e.g., "Contoso HR App").
4. Select a **Publisher** (We covered Publishers in the previous section).
5. Click **Create**.

Now, instead of navigating to the global "Tables" tab, you click on your "Contoso HR App" solution and create your tables *inside* it.

## Adding Existing Components

Solutions do not just contain *new* things you build. They can also contain references to *existing* things you modified.

If your HR App needs to track employees, you might decide to use the standard, out-of-the-box \\\`Contact\\\` table. 

1. Inside your custom solution, click **Add existing -> Table**.
2. Select the \\\`Contact\\\` table.
3. **Crucial Choice:** You will be asked whether you want to include "All components" or "Select components".
   
> [!IMPORTANT]
> **Never select "All components" for a standard table.** This pulls in hundreds of Microsoft forms, views, and fields that have nothing to do with your HR app, bloating your solution and causing deployment conflicts later. **Always select specific components.** Only pull in the specific Form you intend to customize for the HR team.

## Solution Dependencies

When you place components in a solution, Dataverse strictly tracks **Dependencies**.

Imagine you create a custom table called \\\`Job Application\\\`, and it has a Lookup column pointing to the \\\`Contact\\\` table.
- The \\\`Job Application\\\` table is now **dependent** on the \\\`Contact\\\` table.
- If you try to export the "Contoso HR App" solution, but you forgot to add the \\\`Contact\\\` table to the solution, the export process will flash a "Missing Dependencies" warning.
- If you ignore the warning and try to import the solution into a fresh Production environment, the import will fail completely because the Production environment doesn't have the \\\`Contact\\\` table modifications required to support your \\\`Job Application\\\` lookup.

Dataverse enforces dependencies mathematically to ensure that a Solution contains absolutely everything it needs to run successfully in the target environment.

## Solution Segmentation (Enterprise Architecture)

Do not build monolithic solutions. If Contoso has a Sales team and an HR team, do not build a single "Contoso Master" solution.

Break your architecture into smaller, logical containers:
- **Contoso Core Data:** Contains tables shared by everyone (Accounts, Contacts, Employees).
- **Contoso Sales:** Contains Opportunity tables and Sales Flows (Dependent on Core).
- **Contoso HR:** Contains Leave Request tables and HR Flows (Dependent on Core).

This allows the Sales team to deploy an update to Production on Tuesday without accidentally pushing half-finished HR features that a different developer was working on.

## Things to Remember

- A Solution is a **transport container** for customizations.
- Never build in the **Default Solution**.
- When adding existing tables, **only include the specific sub-components** you need.
- Dataverse strictly enforces **Dependencies** during import and export.
- **Segment** your solutions by business function.

## What's Next

When working in a Development environment, a solution is fluid and editable. This state is known as an **Unmanaged Solution**.
  `.trim(),
};
