import { DocContent } from "@/types/docs";

export const powerBi: DocContent = {
  title: "Power BI Integration",
  description:
    "Learn the strategies for connecting Power BI to Dataverse, understanding DirectQuery vs Import mode, and embedding dashboards back into Dynamics 365.",
  content: `
## Introduction

**Power BI** is Microsoft's flagship business intelligence and analytics platform. When executives need to see real-time Sales pipelines, global heatmaps, and complex cross-table analytics, they use Power BI.

Connecting Power BI to Dataverse is native and seamless, but as a Dataverse architect, you must choose the correct connection architecture to prevent crushing your database performance.

## Connecting Power BI to Dataverse

When you open Power BI Desktop, you click "Get Data" and select "Dataverse". You enter your environment URL, and you are presented with two distinct connection modes:

### 1. Import Mode
In Import mode, Power BI runs a massive query against Dataverse and downloads all the data into its own highly compressed, in-memory engine (VertiPaq).
- **Pros:** Incredibly fast performance when users slice and dice data on the dashboard. It allows for complex DAX transformations.
- **Cons:** The data is static. You must schedule a "Refresh" (e.g., 4 times a day). If a user creates an Account in Dynamics at 10:00 AM, it won't appear on the dashboard until the 12:00 PM refresh.
- **Best For:** 90% of enterprise reporting.

### 2. DirectQuery Mode
In DirectQuery mode, Power BI does *not* download the data. Every time a user clicks a slicer on the dashboard, Power BI translates that click into a SQL query, fires it at the live Dataverse database (via the TDS endpoint), waits for the database to calculate the answer, and renders the chart.
- **Pros:** Real-time data. The dashboard is never out of date.
- **Cons:** Slow. The user has to wait for Dataverse to process the query. Furthermore, if 500 executives open the dashboard at the same time, Power BI fires 500 massive analytical queries at the live CRM database, which degrades performance for the sales team trying to enter data.
- **Best For:** Operational dashboards where 5-minute latency is legally unacceptable.

## Azure Synapse Link (The Enterprise Solution)

If your database is massive (e.g., 50 million rows), Import mode will fail (it takes too long to download), and DirectQuery will crash your CRM performance.

The enterprise architecture is **Azure Synapse Link for Dataverse**. 
1. Dataverse constantly streams all data changes into a cheap **Azure Data Lake** in the background.
2. Power BI connects to the Data Lake (via Synapse Serverless SQL).
3. The heavy analytics queries hit the Data Lake, leaving the transactional Dataverse database perfectly untouched and fast.

## Embedding Power BI in Dynamics 365

Once the Power BI dashboard is built and published to the Power BI Service, you want your users to actually see it without leaving Dynamics 365.

### 1. System Dashboards
An Administrator can create a System Dashboard in Dataverse and add a "Power BI Tile". This dashboard can be packaged in a Solution and deployed to all users across the company. *(Note: Users still need a Power BI Pro license to view the data).*

### 2. Form Embedding (Contextual)
You can embed a Power BI report directly on a specific record's form (e.g., The Account form). 
Using a bit of JSON configuration in the Form editor, you can pass the current Account's GUID from Dataverse into Power BI as a filter parameter. 
When the user opens the "Microsoft" account, the embedded Power BI report automatically filters to show only Microsoft's global sales data.

## Security Considerations

> [!WARNING]
> Power BI does **not** inherently respect Dataverse row-level security (Security Roles) when using Import mode. If you import all Accounts into Power BI, and share the dashboard with a junior salesperson, they will see every Account in the company, even if Dataverse normally blocks them. 
> You must manually recreate your security model in Power BI using **Row-Level Security (RLS)** DAX rules.

## Things to Remember

- Use **Import Mode** for speed; use **DirectQuery** for real-time data.
- For massive datasets, use **Azure Synapse Link (Data Lake)**.
- Power BI dashboards can be **embedded** directly into Dataverse System Dashboards or Forms.
- You must manually configure **Row-Level Security (RLS)** in Power BI to prevent data leakage.

## What's Next

Power BI handles complex analytics, and SSRS handles heavy paginated printouts. But what if a user just wants to export a nice-looking list of their personal Accounts to manipulate? We use **Excel Templates**.
  `.trim(),
};
