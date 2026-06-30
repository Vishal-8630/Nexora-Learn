import { DocContent } from "@/types/docs";

export const ribbonCommandBarOverview: DocContent = {
  title: "Ribbon & Command Bar (Overview)",
  description:
    "An overview of the Dynamics 365 Command Bar and Ribbon, the primary navigation and action surface for model-driven apps.",
  content: `
## Introduction

The **Command Bar** (historically known as the **Ribbon**) is the horizontal bar of buttons that appears at the top of forms, views, and dashboards in Dynamics 365 and Model-Driven Power Apps.

It is the primary way users interact with the system—whether they are clicking "Save", "Assign", "Qualify Lead", or triggering a custom action you built.

## Why Customize the Command Bar?

By default, Microsoft provides dozens of buttons on every table. As a developer, you will customize the Command Bar to:
1. **Hide out-of-the-box buttons:** (e.g., Hide the "Delete" button so users can only deactivate records).
2. **Add custom buttons:** (e.g., Add a "Run Credit Check" button).
3. **Execute business logic:** (e.g., When a button is clicked, open a custom dialog, call an external API, or run a Power Automate flow).
4. **Conditional visibility:** (e.g., Only show the "Approve" button if the current user is a Manager and the record is in the "Pending" state).

## The Three Command Bar Locations

When customizing, you must explicitly choose *where* your button will appear:

1. **Main Form:** Appears at the top of a specific record (e.g., when viewing John Doe's Contact form).
2. **Main Grid (Home Grid):** Appears at the top of a list view of records (e.g., when looking at the "Active Contacts" list).
3. **Subgrid:** Appears at the top of a small grid embedded inside a form (e.g., looking at the list of Contacts embedded inside an Account form).

## Classic vs Modern Customization

Historically, the Ribbon was an incredibly complex XML structure that required third-party tools to edit. Microsoft is currently in the middle of a massive architectural transition.

### The Classic Approach (Ribbon XML & JavaScript)
- Developers use a community tool called **Ribbon Workbench** to visually edit the underlying **Ribbon XML**.
- The logic executed by the buttons is written in **JavaScript (Web Resources)**.
- *Status:* Still fully supported and necessary for complex enterprise scenarios.

### The Modern Approach (Command Designer & Power Fx)
- Developers use the native **Modern Command Designer** built directly into the Power Apps maker portal.
- The logic executed by the buttons is written using **Power Fx** (the Excel-like low-code language used in Canvas Apps).
- *Status:* The future of the platform. It is much easier to use, but currently lacks some of the hyper-advanced features of the classic XML approach.

## Best Practices

- **Start Modern:** Always attempt to build your custom buttons using the Modern Command Designer and Power Fx first.
- **Fallback to Classic:** If the Modern Designer cannot meet your requirements (e.g., you need to dynamically inject a custom HTML flyout menu into a button), fall back to the Ribbon Workbench and JavaScript.
- **Keep it clean:** Do not leave 50 default buttons on a form if your users only ever click 3 of them. Use Display Rules to hide clutter and improve the user experience.

## What's Next

In this section, we will cover both the Classic and Modern approaches, starting with the foundation of the classic architecture: **Ribbon XML**.
  `.trim(),
};
