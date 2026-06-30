import { DocContent } from "@/types/docs";

export const reportingOverview: DocContent = {
  title: "Reporting Overview",
  description:
    "An introduction to the reporting landscape in Dynamics 365, contrasting native paginated reports, document generation, and enterprise analytics.",
  content: `
## Introduction

Data entry is only half the battle. A CRM system's true value lies in its ability to output data in a way that drives business decisions.

Dynamics 365 and the Power Platform provide a vast array of reporting and document generation capabilities, ranging from simple Excel exports to massive, enterprise-wide Power BI dashboards.

Choosing the right reporting tool depends entirely on the user's requirement.

## The Reporting Hierarchy

When an end-user asks for a "Report," architects must drill down to understand exactly what they need. There are three distinct categories of reporting in Dynamics 365:

### 1. Document Generation (The "Mail Merge")
The user needs to generate a highly formatted, static document for a specific record, usually to send to a customer.
- *Example:* Generating a PDF Invoice, a Sales Quote, or a Welcome Letter for a new Account.
- *Tools Used:* **Word Templates**, **Excel Templates**.

### 2. Paginated Operational Reports (The "Printout")
The user needs a pixel-perfect, printable report that spans multiple pages, often containing complex tabular data, groupings, and headers/footers.
- *Example:* A 50-page printout of all open Support Tickets grouped by Priority, intended to be handed out in a physical meeting.
- *Tools Used:* **SQL Server Reporting Services (SSRS)**, **Power BI Paginated Reports**.
- *Data Source:* These reports rely heavily on **FetchXML** queries because direct SQL access is restricted in the cloud.

### 3. Analytical Dashboards (The "Big Picture")
The user (usually a manager or executive) needs interactive visualizations, drill-downs, and trend analysis across millions of rows of data.
- *Example:* A global map showing real-time sales revenue, where clicking on "Europe" dynamically filters the rest of the charts on the screen.
- *Tools Used:* **Power BI**.
- *Data Source:* Power BI connects directly to Dataverse via the TDS (Tabular Data Stream) endpoint or queries a replicated Azure Data Lake (via Synapse Link).

## The Deprecation of On-Premise SQL

If you are migrating a legacy on-premise Dynamics CRM system to the cloud, you will face a major hurdle in the Reporting phase.

In the on-premise days, developers could open SQL Server Management Studio, write complex \`SELECT\` queries against the \`FilteredAccount\` SQL view, and bind those SQL queries directly to their SSRS reports.

**In the cloud, you do not have access to the underlying SQL Server.** You cannot write SQL queries for standard SSRS reports. You must translate your legacy SQL queries into **FetchXML**.

## Things to Remember

- Clarify the requirement: Is it a **Document**, a **Printout**, or a **Dashboard**?
- Use **Word/Excel Templates** for single-record document generation.
- Use **SSRS** for pixel-perfect, multi-page operational reports.
- Use **Power BI** for interactive, enterprise analytics.
- Legacy **SQL-based SSRS reports** must be rewritten in FetchXML for the cloud.

## What's Next

Since FetchXML is the foundation of cloud-based paginated reporting, let's explore how it specifically integrates with the SSRS reporting engine.
  `.trim(),
};
