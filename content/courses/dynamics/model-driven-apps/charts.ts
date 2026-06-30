import { DocContent } from "@/types/docs";

export const charts: DocContent = {
  title: "Charts",
  description:
    "Charts provide native, real-time visual abstractions of Dataverse data. Learn how to construct system charts, utilize drill-downs, and embed them within UI containers.",
  content: `
## Introduction

While Views are excellent for interacting with individual records, human users process aggregated data much faster visually. Seeing that you have 50 open cases is useful; seeing a massive red bar chart showing that 45 of them are "High Priority" immediately dictates operational action.

In Model-Driven Apps, you visualize data natively using **Charts**.

## What is it?

A **Chart** is a native visualization component rendered directly by the Dataverse platform. 

Unlike Power BI, which requires external licenses, scheduled data refreshes, and complex dimensional data modeling, native Dataverse charts are rendered instantly over standard Views. They query the exact same live transactional data the user has access to, respecting the Dataverse security model in real-time.

## Types of Charts

Just like Views and Dashboards, Charts adhere to a strict ownership model:

1. **System Charts:** Created by Solution Architects, packaged in ALM Solutions, and globally visible to all users.
2. **Personal Charts:** Created ad-hoc by end-users for their own reporting needs. They can optionally be shared with specific teams.

## Chart Types and Components

The native chart designer supports standard business visualizations:
- Bar Charts (Horizontal and Vertical)
- Pie / Donut Charts
- Line / Area Charts
- Funnel Charts (Heavily used in Sales to visualize the pipeline volume)

To build a chart, you configure two axes:
- **Legend Entries (Y-Axis):** What you are mathematically measuring (e.g., \\\`Count of Cases\\\`, or \\\`Sum of Estimated Revenue\\\`).
- **Horizontal Category (X-Axis):** How you are grouping the data dimensions (e.g., group by \\\`Created On (Month)\\\`, or group by \\\`Owner\\\`).

## The "Drill Down" Feature (Architectural Advantage)

The most powerful interactive feature of native Dataverse charts is the **Drill Down**.

When a user is looking at a View (e.g., "All Active Cases") and opens the Chart Pane, they might see a Pie Chart showing cases grouped by Priority.
- If the user clicks the "High Priority" slice of the pie, the View on the left instantly filters to only show those specific high-priority cases.
- Furthermore, a popup appears allowing the user to "Drill down by" a secondary field. The user can select "Owner". The pie chart will re-render, breaking down *only* the high-priority cases by the agent who owns them.

This allows users to perform rapid, ad-hoc data analysis directly within the transactional UI.

## FetchXML and XML Editing

The visual Chart Designer in the browser is intuitive but architecturally limited. It cannot perform complex mathematical comparisons or apply advanced conditional coloring.

Under the hood, every chart is defined by two XML structures:
1. **DataDescription (FetchXML):** Defines the query and aggregations.
2. **PresentationDescription (ChartXML):** Defines the colors, fonts, and layout engine parameters.

Advanced developers can export a System Chart, open the XML in an IDE to apply advanced formatting (like rendering bars red if they are negative, or injecting custom Hex color arrays), and re-import it into the solution.

## Best Practices

- **Use Native Charts for Operational Data:** For "right now" transactional data (e.g., "How many calls do I need to make today?"), native charts are faster, more reliable, and cheaper than Power BI. 
- **Set Default Charts:** When configuring a View for a model-driven app, explicitly specify which chart should open by default when the user clicks "Show Chart".

## Common Mistakes

> [!CAUTION]
> **Expecting Enterprise BI Capabilities** 
> Native charts are architecturally basic. They cannot easily join data from 5 different disjointed tables, perform complex DAX time-intelligence calculations, or connect to external SQL databases. If the requirement involves deep analytics, stop trying to hack the ChartXML. You must use **Power BI**.

## Things to Remember

- Charts visualize live data directly from **Views**.
- They strictly respect the **Security Model** natively.
- **Drill-down** allows users to filter views by interacting with chart elements.
- Advanced formatting requires exporting and editing the raw **XML**.

## What's Next

We have built our forms, views, and charts. Next, we will cover how to aggregate these components into a single pane of glass using **Dashboards**.
  `.trim(),
};
