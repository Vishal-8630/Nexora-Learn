import { DocContent } from "@/types/docs";

export const canvasApps: DocContent = {
  title: "Canvas Apps",
  description:
    "Canvas apps are UI-first custom applications built with a drag-and-drop designer. They offer pixel-perfect control and can connect to hundreds of different data sources.",
  content: `
## Introduction

Model-Driven Apps are fantastic for complex, data-heavy, back-office CRM management, but they are architecturally rigid. 

What if you need a specialized mobile app for factory workers with massive buttons? What if you want an app that looks exactly like your corporate brand guidelines? What if the data doesn't even live in Dataverse, but in a legacy SQL database?

For scenarios requiring total UI control and diverse data connectivity, you use **Canvas Apps**.

## What is it?

A **Canvas App** is a type of Power App where you start with a blank canvas (like a blank PowerPoint slide) and build the user interface from scratch using a drag-and-drop visual editor.

You add controls (buttons, text inputs, galleries, cameras) and write Excel-like formulas (called **Power Fx**) to define exactly what those controls do when interacted with.

## Why do we need it? (Decision Making)

Canvas apps solve two major problems in enterprise software:

### 1. The UI Constraint
Standard business software is often clunky. Canvas apps allow makers to design task-specific, highly intuitive interfaces tailored to the exact workflow of the user, requiring zero training. (e.g., A simple app with just a Camera button and a Submit button).

### 2. The Data Silo Constraint
While Model-Driven Apps require all data to live strictly in Dataverse, Canvas Apps can connect to over 1,000 different external systems via **Connectors** (e.g., SharePoint, SQL Server, Salesforce, SAP, Excel).

## How does it work?

Building a Canvas App is a completely different experience than building a Model-Driven App.

1. **Design the UI:** You open Power Apps Studio in your browser. You drag a "Button" and a "Gallery" (a list component) onto the screen. You change their colors, fonts, and borders.
2. **Connect Data:** You add a Data Connection (e.g., a SharePoint List or a Dataverse table).
3. **Write Logic:** You select the Button and write a **Power Fx** formula in the \\\`OnSelect\\\` property. 
   - Example: \\\`Patch(Assets, Defaults(Assets), {Name: TextInput1.Text, Status: "Active"})\\\`
4. **Publish:** You publish the app. Users can access it via a web browser, embed it in Microsoft Teams, or open it on their phones using the native Power Apps mobile player.

## Advanced: Delegation

> [!WARNING]
> **The Delegation Trap**
> Canvas Apps struggle with massive datasets. If you write a complex Power Fx filter on a SQL table with 5 million rows, the app might try to download all 5 million rows to the user's mobile phone before filtering them, crashing the device. 
> You must ensure your queries are **Delegable** — meaning the mathematical filtering operation is passed down to the SQL Server or Dataverse to process, and only the 50 matching results are returned to the phone.

## Example Scenario

A retail store wants to track employee uniform requests. Their HR data lives in an on-premises SQL server, but their communication happens in Microsoft Teams.

1. A maker opens Power Apps and creates a new **Canvas App** targeting a Mobile Phone layout.
2. They add a connection to the SQL Server.
3. They design a simple, beautiful screen with their corporate logo, a dropdown to select a shirt size, and a big "Submit Request" button.
4. On the button's \\\`OnSelect\\\` property, they write a Power Fx formula that saves the record to SQL, and then uses the Office 365 connector to send an email to the HR manager.
5. They publish the app and pin it inside the store's Microsoft Teams channel. 

The employees get a simple app; the company avoids buying expensive HR software.

## Best Practices

- **Use Custom Pages for Dynamics 365:** If you are a Dynamics 365 developer and need Canvas functionality, use **Custom Pages**. This allows you to build a Canvas screen and embed it directly inside your standard Dynamics 365 Model-Driven App.
- **Componentize:** Don't rebuild standard headers and menus on every screen. Build reusable Canvas Components to maintain consistency and reduce app size.

## Common Mistakes

> [!CAUTION]
> **Recreating a Model-Driven App in Canvas** 
> A very common architectural mistake is trying to build a complex, highly relational CRM system with hundreds of tables using a Canvas App. It will be incredibly slow and a nightmare to maintain. Use Model-Driven apps for complex relational data, and Canvas Apps for simple, task-based UI.

## Things to Remember

- Canvas Apps are **UI-first**.
- You design them by dragging and dropping controls.
- You write logic using **Power Fx**.
- They can connect to almost any data source.
- They are best for **task-oriented, mobile, or highly branded scenarios**.

## What's Next

We've covered the UI-first approach. Let's look at the data-first approach that powers Dynamics 365 CRM: **Model-Driven Apps**.
  `.trim(),
};
