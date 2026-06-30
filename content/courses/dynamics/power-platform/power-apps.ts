import { DocContent } from "@/types/docs";

export const powerApps: DocContent = {
  title: "Power Apps",
  description:
    "Power Apps is the development environment for building custom business applications and the interface technology that powers Dynamics 365.",
  content: `
## Introduction

When users interact with Dynamics 365, they are looking at a screen. That screen, the navigation, the forms, and the views are all built using **Power Apps**. 

Power Apps is the UI (User Interface) layer of the Power Platform. It allows developers and makers to build professional-grade applications rapidly without writing traditional HTML, CSS, or JavaScript.

## What is it?

**Power Apps** is a suite of apps, services, connectors, and a data platform that provides a rapid application development environment to build custom apps for your business needs.

There are two primary types of Power Apps you need to understand:

1. **Model-Driven Apps**
2. **Canvas Apps**

## Model-Driven Apps

Model-driven apps are data-first. You don't drag and drop a button or a text box onto a screen. Instead, you define the data structure (Tables and Columns in Dataverse), and the app's user interface is **automatically generated** for you.

Because the UI is generated, model-driven apps all look very similar. They have a standard layout (navigation on the left, commands on top, data in the middle) that is highly responsive and accessible.

**Crucial point:** Dynamics 365 Sales, Customer Service, and Field Service are all just very large, pre-built Model-Driven Apps.

**When to use:**
- Managing complex business processes and relational data
- When you need an app quickly and don't care about a highly customized, pixel-perfect design
- Any time you are customizing standard Dynamics 365 functionality

## Canvas Apps

Canvas apps are UI-first. You start with a blank canvas (like a PowerPoint slide) and drag and drop elements onto it — text boxes, images, galleries, buttons. You write Excel-like formulas (Power Fx) to define what happens when a button is clicked.

Canvas apps can connect to hundreds of different data sources (SharePoint, SQL, Salesforce, Excel), not just Dataverse.

**When to use:**
- When you need a highly customized, pixel-perfect user interface
- When building a task-based app for mobile workers (e.g., an app to scan barcodes in a warehouse)
- When you need to combine data from multiple different systems on a single screen

## Why do we need it?

Building enterprise-grade applications traditionally requires a team of frontend developers, backend developers, database administrators, and UI/UX designers. It takes months.

Power Apps democratizes this process. It handles the heavy lifting of security, responsiveness, accessibility, and database connectivity, allowing you to focus on the business logic.

## How does it work?

Power Apps relies heavily on its integration with **Dataverse** and **Connectors**.

- For **Model-Driven Apps**, you use the App Designer in the Power Apps maker portal (make.powerapps.com). You select which Dataverse tables, dashboards, and business process flows should be included in the app. The platform handles the rendering.
- For **Canvas Apps**, you use the Canvas Studio (a drag-and-drop editor in the browser). You design the screen, add data connections via Connectors, and write Power Fx formulas for logic.

## Example

A retail company uses Dynamics 365.

1. The back-office team needs to manage complex product catalogs, vendor relationships, and bulk orders. You build them a **Model-Driven App** (or customize an existing Dynamics 365 app) because it handles complex relational data perfectly.
2. The store managers need a simple app on their iPads to perform a quick morning checklist of store cleanliness. You build them a **Canvas App** because it needs a custom, touch-friendly UI and only performs a few simple tasks.

## Custom Pages (Convergence)

Historically, you had to choose between Model-Driven or Canvas. Today, Microsoft is bringing them together. 

You can now build a **Custom Page** (which is built using the Canvas App drag-and-drop designer) and embed it directly inside a Model-Driven App. This gives you the best of both worlds: the structured data management of a model-driven app, with the ability to inject a highly custom, pixel-perfect screen where needed.

## Things to Remember

- **Model-Driven Apps** = Data-first, UI is generated, standard layout. Dynamics 365 CRM apps are model-driven apps.
- **Canvas Apps** = UI-first, drag-and-drop, pixel-perfect control, can connect to any data source.
- **Custom Pages** = Canvas technology embedded inside a Model-Driven App.
- Power Apps is accessed and built through the Power Apps maker portal (\`make.powerapps.com\`).

## Related Topics

- [Power Platform Overview](/docs/power-platform/overview) — context on where Power Apps fits
- [Dataverse Tables](/docs/dataverse/tables) — the foundation for Model-Driven Apps
- [Dataverse Forms](/docs/dataverse/forms) — the UI components that make up a Model-Driven App

## What's Next

Now that you know the tools used to build the interface, you must understand the data platform that powers those interfaces. Next, we will cover **Dataverse**, the secure cloud database at the heart of Dynamics 365.
  `.trim(),
};
