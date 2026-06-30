import { DocContent } from "@/types/docs";

export const powerBi: DocContent = {
  title: "Power BI",
  description:
    "Power BI is the business analytics service of the Power Platform. It delivers insights to enable fast, informed decisions by connecting to and visualizing Dynamics 365 data.",
  content: `
## Introduction

Dynamics 365 generates massive amounts of data — sales pipelines, customer service metrics, inventory levels.

While Dynamics 365 has built-in charts and dashboards, they are often too simplistic for complex business reporting. When an executive needs to slice, dice, and drill down into millions of rows of data across multiple different systems, the tool they use is **Power BI**.

## What is it?

**Power BI** is a collection of software services, apps, and connectors that work together to turn unrelated sources of data into coherent, visually immersive, and interactive insights.

It allows you to connect to data, transform it, create visual reports (charts, maps, matrices), and share them with others in your organization.

## Why do we need it?

Out-of-the-box Dynamics 365 dashboards are limited:
- They can only report on data that lives inside Dataverse.
- They struggle with very large datasets or complex aggregations.
- The visualizations are basic (simple bars, pies, and funnels).

Power BI solves these problems. It can connect to Dynamics 365 (Dataverse) and an external SQL database at the same time, merge the data together, perform complex DAX calculations, and render it in highly interactive, custom visualizations.

## How does it work?

A typical Power BI workflow consists of three main components:

1. **Power BI Desktop** — a free Windows application where developers and analysts connect to data, build the data model, and design the reports.
2. **Power BI Service** — a cloud-based SaaS platform (app.powerbi.com) where published reports are hosted and shared with end-users.
3. **Power BI Mobile** — apps for iOS and Android to consume reports on the go.

### The Developer Workflow

1. **Get Data:** In Power BI Desktop, you connect to **Microsoft Dataverse** using the built-in connector.
2. **Transform:** You use **Power Query** to clean the data (e.g., removing unnecessary columns, parsing JSON, formatting dates).
3. **Model:** You define relationships between tables (e.g., linking the Account table to the Invoice table) and write **DAX** (Data Analysis Expressions) to create calculated columns and measures (e.g., calculating Year-Over-Year growth).
4. **Visualize:** You drag and drop charts onto the canvas.
5. **Publish:** You publish the report to the Power BI Service, where users can view it.

## Integration with Dynamics 365

Power BI does not just live in a separate window. It integrates deeply with Dynamics 365 Model-Driven apps:

- **Embed Dashboards:** You can take a dashboard built in Power BI and embed it directly onto a user's homepage in Dynamics 365.
- **Embed on Forms:** You can embed a Power BI tile directly onto a specific record's form (e.g., showing a customer's lifetime purchasing trends directly on their Account record).
- **Contextual Filtering:** When a Power BI report is embedded on a form, it can automatically filter itself to only show data relevant to the record currently on the screen.

## Example

A retail company uses Dynamics 365 Sales, but their inventory is tracked in a legacy on-premises Oracle database.

The Sales VP wants a dashboard showing exactly which salespeople are selling products that are currently out of stock.

1. A developer opens **Power BI Desktop**.
2. They connect to **Dataverse** to pull the Salesperson and Opportunity data.
3. They connect to the on-premises **Oracle database** to pull the Inventory data.
4. They create a relationship between the two datasets based on the Product ID.
5. They build a visualization showing opportunities at risk due to stockouts.
6. They publish the report to the Power BI Service, and then embed that exact report onto the Sales VP's Dynamics 365 dashboard.

## Best Practices

- **Use DirectQuery carefully** — Power BI can either import data on a schedule or query Dataverse live (DirectQuery). DirectQuery ensures data is always up-to-date, but it can be slow and put a heavy load on Dataverse. Use Import mode unless live data is an absolute business requirement.
- **Build a star schema** — Power BI performs best when data is modeled into a Star Schema (Fact tables and Dimension tables). Do not just dump raw Dataverse tables into Power BI.
- **Leverage TDS endpoint** — For complex reporting, you can connect Power BI to Dataverse using the Tabular Data Stream (TDS) endpoint, which allows you to query Dataverse using SQL syntax.

## Things to Remember

- Power BI is the enterprise analytics and visualization tool for the Power Platform.
- It connects to Dataverse natively, but can also combine data from hundreds of other sources.
- Reports are built in Power BI Desktop and published to the Power BI Service.
- Power BI dashboards and reports can be embedded seamlessly back into Dynamics 365.
- It uses Power Query for data transformation and DAX for calculations.

## Related Topics

- [Power Platform Overview](/docs/power-platform/overview) — the full suite
- [Dataverse](/docs/power-platform/dataverse) — the primary data source for Dynamics 365 reporting
- [Dynamics Architecture](/docs/introduction/dynamics-architecture) — where reporting fits in the stack

## What's Next

This concludes the Power Platform overview section. You now understand the underlying tools that power Dynamics 365. Next, we will dive deep into **Dataverse**, the data layer, starting with its core building block: **Tables**.
  `.trim(),
};
