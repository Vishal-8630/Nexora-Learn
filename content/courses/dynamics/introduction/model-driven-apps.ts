import { DocContent } from "@/types/docs";

export const modelDrivenApps: DocContent = {
  title: "Model-Driven Apps",
  description:
    "Model-driven apps are data-first applications built on Microsoft Dataverse. Their UI is automatically generated based on the underlying data model, providing strict structural consistency.",
  content: `
## Introduction

If you have ever used Dynamics 365 Sales, Customer Service, or Field Service, you have used a **Model-Driven App**.

In the Microsoft enterprise ecosystem, you do not build complex CRM interfaces from scratch using raw HTML, CSS, and React. Instead, you define your data model in Dataverse, and the platform's rendering engine generates the interface for you automatically. 

## What is it?

A **Model-Driven App** is a highly structured UI framework. The layout and user interface are rigidly determined by the metadata components you assemble (Dataverse Tables, Forms, Views, and Dashboards).

Unlike Canvas Apps (where you drag and drop individual buttons onto a blank screen pixel-by-pixel), Model-Driven apps are "data-first". You design the data structure, and the platform renders a highly responsive, accessible, and standardized web application.

## Why do we need it? (Architectural Problem)

Building enterprise data-management software from scratch is exceptionally difficult. A system like a CRM requires complex left-hand navigation, data grids that can filter and sort millions of records, forms with hundreds of fields, responsive design for mobile devices, and strict WCAG accessibility compliance.

If developers had to build and maintain all of that from scratch for every project, development cycles would take years.

Model-Driven Apps solve this by providing a standardized, opinionated framework. Because the UI is generated automatically, solution architects and developers can focus entirely on the backend business logic (Plugins) and the Data Model, rather than writing CSS to align a button.

## How does it work?

To build a Model-Driven App, you do not write frontend code. Instead, you act as an architect assembling metadata components.

1. **Data Model (Dataverse):** You create your Tables (e.g., \\\`Student\\\`, \\\`Course\\\`) and relationships in Dataverse.
2. **Forms & Views:** You configure how that data should be displayed. You use a drag-and-drop designer to create a **Form** (how a single record looks) and a **View** (a tabular data grid).
3. **App Designer:** You open the App Designer and create a **Sitemap** (the left-hand navigation menu), linking your tables into the navigation.
4. **Publish:** The Power Platform reads your metadata and dynamically renders the navigation, grids, and forms into a working web application.

## Key Concepts

| Component | Meaning |
|---|---|
| **Sitemap** | The navigation menu on the left side of the app. It organizes the app into Areas, Groups, and Subareas. |
| **Form** | The UI used to view, create, or edit a single record. |
| **View** | A tabular SQL-backed data grid that displays a list of records. |
| **Command Bar (Ribbon)** | The ribbon of buttons at the top of forms and views (e.g., Save, Delete, Assign). |
| **Business Process Flow (BPF)** | A visual progress bar at the top of a form that guides a user through a strict, multi-step business process (e.g., Lead to Opportunity). |

## Best Practices

- **Security-Driven Design:** The UI strictly respects Dataverse security roles. If a user does not have read access to a table, it will completely disappear from the app's navigation and forms. Rely on the Dataverse security model, not UI hacks, to hide data.
- **Use Business Rules:** Use declarative Business Rules to show/hide fields on a form, rather than writing JavaScript, to ensure easier long-term maintenance.
- **Keep it simple:** The platform generates the UI, so do not fight the framework. 

## Common Mistakes

> [!CAUTION]
> **Trying to make it pixel-perfect** 
> Model-Driven Apps have a strict, opinionated design system. You cannot easily change the background color of a specific field, or move a button exactly 5 pixels to the left. Attempting unsupported DOM manipulation via JavaScript to hack the CSS will cause the app to crash during the next Microsoft cloud update. If a client demands a highly custom, pixel-perfect UI, you must use a **Canvas App** or a **Custom Page**.

## Things to Remember

- Model-Driven Apps are **Data-first**.
- Dynamics 365 Sales, Customer Service, and Field Service are all just massive Model-Driven Apps built by Microsoft.
- The UI is rendered from Dataverse metadata (Forms, Views, Dashboards).
- They are excellent for complex relational data management but poor for highly custom graphic design.

## What's Next

We now know that Model-Driven Apps are structured and data-first. But what if we *do* need a pixel-perfect, highly customized user interface? Next, we will cover the UI-first alternative: **Canvas Apps**.
  `.trim(),
};
