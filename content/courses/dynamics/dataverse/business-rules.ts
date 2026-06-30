import { DocContent } from "@/types/docs";

export const businessRules: DocContent = {
  title: "Business Rules in Dataverse",
  description:
    "Business Rules provide a declarative, no-code way to apply form logic and data validation in Dataverse. Learn how to show/hide fields, set values, and enforce mandatory data.",
  content: `
## Introduction

When users interact with a system, the user interface needs to respond to their actions dynamically. If a user selects "Other" from a dropdown, a "Please specify" text box should appear. If a user enters an invalid discount amount, the system should show an error message before they hit save.

Traditionally, this required developers to write JavaScript. In Dataverse, you can handle most of these requirements without writing a single line of code using **Business Rules**.

## What is a Business Rule?

A **Business Rule** is a drag-and-drop logic engine in Dataverse. 

It allows makers to apply logic to data and forms using a simple "IF... THEN..." visual interface. It sits between the user interface and the database, ensuring that data is valid and forms behave dynamically.

## Decision Making: Business Rules vs JavaScript

Before Business Rules existed, every UI manipulation required JavaScript. This created immense technical debt: simple changes (like making a field mandatory) required a developer to write code, deploy a web resource, and test it across different browsers.

**Use a Business Rule when:**
- You need to show/hide fields, make fields mandatory, or show simple error messages.
- The logic only depends on data currently visible on the form.

**Use JavaScript when:**
- You need to query the database (e.g., checking if the parent Account is active).
- You need to make external API calls.
- You need to manipulate the DOM or interact with complex PCF controls.

## What can Business Rules do?

When the "IF" condition is met, a Business Rule can perform the following "THEN" actions:

- **Show or hide columns** on a form.
- **Set a column value** automatically.
- **Clear a column value**.
- **Set a column as Business Required** (mandatory) or Optional.
- **Show an error message** (preventing the record from being saved).
- **Provide a recommendation** (a non-blocking tooltip suggesting a value).

## The Importance of Scope (Real-World Perspective)

The most critical configuration of a Business Rule is its **Scope**. The scope determines *where* the rule executes.

1. **Entity (Table) Scope:** The rule runs deeply on the server. It will fire regardless of how the record is created — whether via the form, a Power Automate flow, Dataverse Web API, or a custom integration. *(Note: Entity scope cannot perform UI actions like Show/Hide, because an API has no UI).*
2. **All Forms:** The rule runs client-side (in the browser). It will apply to every Model-Driven form for that table, but will **not** fire if data is updated via API in the background.
3. **Specific Form:** The rule runs client-side, but only when the user is looking at one specific Model-Driven form.

## Example Scenario

A company has an \\\`Opportunity\\\` table. They have a policy: if an Opportunity has an \\\`Estimated Value\\\` greater than $50,000, the salesperson *must* get a manager's approval, and the \\\`Manager Approval\\\` field becomes mandatory.

**The Business Rule:**
- **IF:** \\\`Estimated Value\\\` is greater than 50,000
- **THEN:** Set \\\`Manager Approval\\\` to Business Required
- **ELSE:** Set \\\`Manager Approval\\\` to Optional

A consultant builds this visually in the designer, saves, and activates it. Now, whenever a user types "60000" into the form, the Manager Approval field instantly gets a red asterisk. No JavaScript required.

## Common Mistakes

> [!WARNING]
> **Forgetting the ELSE condition** 
> A Business Rule only fires when its condition is met. If a rule says "If Type = VIP, make Discount required", and the user changes Type back to "Standard", the field will *remain* required unless you explicitly add an ELSE condition to make it optional again. Business rules do not automatically revert their actions.

> [!CAUTION]
> **Hidden Data Leaks**
> If a Business Rule hides a column, it **does not** delete the data inside it. If you have logic that says "If Status = Rejected, Hide the Approval Date", you should add an action to *Clear* the Approval Date before hiding it, otherwise the hidden data remains in the database and messes up reporting.

## Things to Remember

- Business Rules replace simple **JavaScript** for form logic.
- They use an **IF... THEN... ELSE** visual designer.
- **Scope** determines if they run on the server (Entity) or in the browser (Forms).
- They can only read data present on the current record.

## What's Next

Business Rules ensure users enter data correctly. But how do we ensure the data they enter integrates properly with external systems? Let's review the difference between Tables and **Columns**.
  `.trim(),
};
