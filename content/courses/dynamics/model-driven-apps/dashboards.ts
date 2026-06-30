import { DocContent } from "@/types/docs";

export const dashboards: DocContent = {
  title: "Dashboards",
  description:
    "Dashboards aggregate charts, views, and external resources into a single composite UI container, providing users with a high-level operational overview.",
  content: `
## Introduction

When a user logs into a Dynamics 365 enterprise app, they do not want to manually navigate to five different tables to deduce their daily workload. They want to see their upcoming tasks, their active deals, and a chart showing their progress toward their monthly quota—all rendered simultaneously on one screen.

This consolidated composite view is called a **Dashboard**.

## What is it?

A **Dashboard** in a Model-Driven App is a specialized page that acts as a UI container. It allows you to organize multiple metadata components—primarily **Views** (data grids) and **Charts**—into a single, unified layout.

Dashboards are typically configured as the default landing page when a user initially loads the application.

## Types of Dashboards

Similar to Views and Charts, Dashboards adhere to a strict ownership model:

### 1. System Dashboards
Created by Solution Architects and packaged in ALM Solutions. They are globally available to all users in the organization (e.g., a standard "Sales Manager Overview" dashboard).

### 2. Personal Dashboards
Created ad-hoc by end-users. A user can build a custom layout of their favorite views and charts. They are private by default, but can be explicitly shared with specific colleagues or teams.

## Dashboard Components

You can embed several types of components into a dashboard container:
- **List (View):** Embeds a standard Dataverse View (e.g., a list of "My Open Tasks").
- **Chart:** Embeds a Dataverse Chart (e.g., a pie chart of "Cases by Priority").
- **Web Resource:** Embeds custom HTML or JavaScript widgets.
- **IFrame:** Embeds an external website directly into the dashboard panel.

## Standard vs Interactive Dashboards

Dataverse offers two distinct architectural dashboard experiences:

### Standard Dashboards
These are traditional dashboards. They display a static layout of charts and views. If you click on a piece of a chart (like the "High Priority" slice of a pie chart), it will drill down into that specific chart, but it will **not** filter the other lists or charts on the dashboard.

### Interactive Dashboards
Designed for fast-paced environments like high-volume call centers. 
- **Global Event Filtering:** When you click a slice on a chart in an Interactive Dashboard, it instantly fires an event that filters *all other charts and views* on the dashboard to match that selection.
- **Visual Filters:** They prioritize charts as interactive filter buttons, allowing users to rapidly slice massive datasets contextually.

## Power BI Integration

While Dataverse native dashboards are highly useful for live operational tracking, they have strict limitations (they only query Dataverse data, and complex analytical math is impossible).

For deep analytics, Model-Driven Apps fully support **Power BI Integration**. You can embed entire Power BI reports or pin individual Power BI tiles directly onto a Dataverse Personal Dashboard, bringing enterprise-grade analytics right into the CRM UI.

## Best Practices

- **Role-Based Dashboards:** Build specific System Dashboards for specific security roles. A Sales Rep needs a dashboard focused on *their* open leads and tasks. A Sales VP needs a dashboard focused on aggregate revenue across all teams.
- **Action-Oriented Design:** A dashboard shouldn't just be pretty charts. Include Lists (Views) of actionable items, like "Opportunities closing this week" or "Overdue Tasks," so users can double-click and get straight to work.

## Common Mistakes

> [!WARNING]
> **Component Overload** 
> A Dashboard can technically hold up to 6 components (or more with unsupported XML customization). However, loading 6 complex views and charts simultaneously requires 6 heavy parallel SQL database queries. Overloaded dashboards will cause the application to load incredibly slowly on startup, severely impacting user adoption.

## Things to Remember

- Dashboards are UI containers for **Views** and **Charts**.
- **System Dashboards** are global; **Personal Dashboards** are user-specific.
- **Interactive Dashboards** allow global filtering across all components.
- For complex analytics, embed **Power BI** instead of native charts.

## What's Next

We have built our forms, views, charts, and dashboards. But how does a user actually navigate between them in the application? Next, we will cover the **Site Map**.
  `.trim(),
};
