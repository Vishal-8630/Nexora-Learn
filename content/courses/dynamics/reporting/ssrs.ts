import { DocContent } from "@/types/docs";

export const ssrs: DocContent = {
  title: "SSRS (SQL Server Reporting Services)",
  description:
    "Explore how to design, deploy, and manage pixel-perfect, paginated SSRS reports within the Dynamics 365 ecosystem.",
  content: `
## Introduction

**SQL Server Reporting Services (SSRS)** has been the enterprise standard for paginated reporting for over two decades. 

Despite the rise of Power BI, SSRS remains deeply embedded in Dynamics 365. Whenever you need a highly structured, printable document (like an Invoice with repeating rows spanning across 5 pages, with a subtotal at the bottom of every page), SSRS is the tool for the job.

## The Architecture of a Report

An SSRS report is physically saved as an **.RDL (Report Definition Language)** file. This is essentially a massive XML file that defines the Data Sources, Datasets, Parameters, and visual layout (tables, charts, text boxes).

Because Dataverse is cloud-based, you cannot deploy these .RDL files to a local SQL Server. You must upload them directly into the Dynamics 365 environment, where they are executed by the Dataverse reporting engine.

## Building an SSRS Report

To build a FetchXML-based SSRS report, you cannot use the Dynamics 365 web UI. You need a Windows desktop application.

### The Tooling
Developers use either:
1. **Microsoft Report Builder:** A lightweight, standalone tool.
2. **Visual Studio (with the Reporting Services extension):** The standard for pro-developers, as it integrates with Source Control (Git).

*Crucially, you must install the **Microsoft Dynamics 365 Report Authoring Extension**. This extension installs the custom "Dynamics 365 Fetch" data connector into your local Visual Studio/Report Builder. Without it, you cannot connect to Dataverse.*

### The Process
1. Create a new Report (.rdl).
2. Create a Data Source using the "Microsoft Dynamics 365 Fetch" provider.
3. Paste your FetchXML query into the Dataset.
4. Drag a "Table" or "Matrix" onto the design surface.
5. Drag your fields (Name, Revenue) from the Dataset into the table columns.
6. Add groupings, headers, footers, and complex expressions (using Visual Basic).

## Deploying to Dynamics 365

Once the .RDL file is designed and tested locally, it must be uploaded to the cloud.

1. In the Dynamics 365 web browser, navigate to the **Reports** table.
2. Click **New**.
3. Set the "Report Type" to **Existing File** and upload the .RDL.
4. **Related Record Types:** Check the tables where this report should appear (e.g., check "Account"). Now, when a user is on an Account view, they can click the "Run Report" button in the ribbon, and your report will appear in the dropdown.
5. **Display In:** Choose where the report should be visible (e.g., Forms for related record types, Lists).

## ALM and Reports

Reports are solution-aware components. 

When you upload an .RDL file in your Development environment, make sure you are inside your Unmanaged Solution. 
The .RDL file is serialized and stored in the Dataverse database. When you export the Managed Solution and deploy it to Production, the report travels with it seamlessly. 

Because the report's Data Source is intelligent, it automatically re-points itself to the Production environment's URL upon import. You do not need to manually change connection strings during deployment.

## Power BI Paginated Reports

While native SSRS in Dynamics 365 is still fully supported, Microsoft is slowly pushing enterprises toward **Power BI Paginated Reports**. 
This is essentially the exact same technology (it also uses .RDL files and Report Builder), but the reports are hosted in the Power BI Service rather than directly inside Dynamics 365. 

For now, native Dataverse SSRS is cheaper (no Power BI Premium capacity required) and more deeply integrated into the native Dynamics UI.

## Things to Remember

- SSRS creates pixel-perfect, printable **Paginated Reports (.RDL)**.
- You must use **Visual Studio** or **Report Builder** with the **Report Authoring Extension**.
- You upload the .RDL file into Dataverse via the **Reports** table.
- Reports are **Solution-aware** and deploy seamlessly across environments.

## What's Next

SSRS is great for static, printed lists. But if your executives want to interact with data, slice it by region, and drill down into trends, we need the flagship analytics engine: **Power BI**.
  `.trim(),
};
