import { DocContent } from "@/types/docs";

export const views: DocContent = {
  title: "Views",
  description:
    "Views are database query abstractions used to display tabular lists of records in a Model-Driven App. Learn how to architect Public Views, Quick Find Views, and Editable Grids.",
  content: `
## Introduction

When a user logs into a Model-Driven App, they rarely want to retrieve the entire database table at once. They want to see targeted datasets: "My Open Opportunities," "Active Accounts in New York," or "High Priority Support Cases."

These targeted lists of records are rendered using **Views**.

## What is it?

A **View** is a saved database query (stored as FetchXML under the hood) that defines exactly how a list of records should be retrieved and displayed. 

It defines three distinct architectural components:
1. **Columns:** The specific Dataverse schema columns to retrieve from SQL (the \\\`SELECT\\\` statement).
2. **Filter Criteria:** The logic dictating which records are returned (the \\\`WHERE\\\` clause).
3. **Sort Order:** How the records are ordered (the \\\`ORDER BY\\\` clause).

When you click on a table in the left-hand navigation (Site Map), the App rendering engine loads the default View for that table.

## Types of Views

There are two primary categories of views, determined by their ownership and security scope:

### 1. System / Public Views
These are created by Solution Architects and Developers. 
- They are packaged in ALM Solutions and deployed to production.
- Every user in the organization can see them (e.g., "Active Accounts", "All Contacts").

### 2. Personal Views
These are created ad-hoc by end-users.
- If a sales rep frequently queries for "My Accounts in Manufacturing with Revenue > $1M," they can save that query as a Personal View.
- By default, only the user who created it can execute it. However, they can manually **Share** the view with specific colleagues, respecting standard Dataverse security boundaries.

## Special System Views

Beyond standard public views, Dataverse has specific operational view types:

- **Quick Find View:** This view powers the search bar at the top of a grid. It dictates exactly which columns are indexed for searching (e.g., searching by Name and Email) and which columns are returned in the result set.
- **Lookup View:** When a user clicks a lookup field on a form (e.g., selecting a Parent Account), a mini-grid dialog opens. The layout of that dialog is strictly controlled by the Lookup View.
- **Advanced Find View:** Defines the default column schema shown when a user builds a complex ad-hoc query using the Advanced Find tool.

## Configuring a View

Using the modern View Designer, an architect can:
- Add columns from the primary table into the grid.
- Add columns from **Related Tables** (e.g., showing the \\\`Parent Account Name\\\` inside a view of \\\`Contacts\\\`).
- Apply complex filter logic using nested AND/OR groupings.
- Configure primary and secondary sorting parameters.

## Editable Grids

By default, views are read-only. A user must double-click a row to load the Form, execute a change, save, and return to the view.

To accelerate high-volume data entry, you can enable the **Editable Grid Control** on a view. This replaces the standard read-only grid with an Excel-like React interface, allowing users to execute data mutations directly inside the cells, committing changes back to Dataverse asynchronously without ever opening the record.

## Best Practices

- **Optimize Quick Find Indexing:** By default, Quick Find only searches the primary "Name" column. You must explicitly add other critical identifying columns (like Email or Account Number) to the "Find by" columns in the Quick Find view, otherwise users will assume the search engine is broken.
- **Encourage Personal Views:** Train power users to build and save their own Personal Views. This prevents the IT backlog from being flooded with requests to build 50 slightly different public views.

## Common Mistakes

> [!CAUTION]
> **Excessive SQL JOINs** 
> While you can easily pull in columns from related parent tables into a single view, doing this excessively forces the underlying Azure SQL database to execute massive JOIN operations. A view with 25 columns spanning 5 different related tables will take a catastrophic amount of time to load. Stick to 5–8 critical identifying columns on the primary table whenever possible.

## Things to Remember

- **Public Views** are global; **Personal Views** are user-specific.
- Views define **Columns**, **Filters**, and **Sorting**.
- The **Quick Find View** powers the search bar functionality.
- **Editable Grids** allow inline transactional editing.

## What's Next

This concludes the core configuration of Model-Driven Apps. We have built the database and the UI without writing code. But enterprise requirements inevitably exceed out-of-the-box configuration. Next, we enter the pro-code developer space, starting with the **Power Apps Component Framework (PCF)**.
  `.trim(),
};
