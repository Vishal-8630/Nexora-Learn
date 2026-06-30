import { DocContent } from "@/types/docs";

export const dataflows: DocContent = {
  title: "Dataflows & Power Query",
  description:
    "Using Dataflows to sync external data into Dataverse without writing code or SSIS packages.",
  content: `
## What is a Dataflow?

Historically, if an enterprise wanted to synchronize daily Product catalogs from their on-premises SQL Server ERP into Dynamics 365, they had to write a complex C# Console Application or use a 3rd party ETL tool like SSIS.

Microsoft introduced **Dataflows** to democratize data migration. Dataflows run entirely in the Power Platform cloud. They use **Power Query** (the exact same engine used in Excel and Power BI) to connect to hundreds of data sources, transform the data, and push it directly into Dataverse tables.

---

## The Power Query Experience

If you have ever clicked "Get Data" in Excel or Power BI, you already know how to use Dataflows.

1.  **Connect:** Choose your source (SQL Server, SharePoint List, Oracle, Salesforce, Web API, etc.).
2.  **Transform:** The Power Query editor opens in your browser. You can visually click to:
    *   Remove columns.
    *   Change data types (e.g., String to Integer).
    *   Merge columns (e.g., First Name + Last Name).
    *   Filter out blank rows.
3.  **Map:** Map the final columns from your query directly to the Dataverse schema (e.g., map the ERP \`CustID\` to the Dataverse \`contoso_erp_id\` column).

---

## Alternate Keys (Upserting)

The most powerful feature of Dataflows is its native support for **Alternate Keys**.

When you run a data migration daily, you don't want to create duplicate Accounts. You want to *Update* the Account if it exists, and *Create* it if it doesn't. This is called an **Upsert**.

1. Create an Alternate Key on your Dataverse Account table (e.g., \`Account Number\`).
2. In the Dataflow mapping screen, select the \`Account Number\` key as your matching criteria.
3. The Dataflow engine will automatically handle the massive Upsert logic for you, securely and highly optimized.

---

## Scheduling & Automation

Dataflows are not just one-off migration scripts. They are designed for continuous synchronization.

*   **Scheduled Refresh:** You can tell a Dataflow to run automatically every day at 2:00 AM.
*   **Power Automate Integration:** You can trigger a Dataflow from a Power Automate flow. For example, when an email arrives with a CSV attachment, save the CSV to OneDrive, and trigger the Dataflow to instantly process it into Dataverse.

> [!TIP]
> **Performance Limitations**
> Dataflows are fantastic for thousands of rows (e.g., 50,000 products). However, if you are migrating **20 million rows** of historical financial data, Dataflows will struggle with timeouts and memory limits. For ultra-massive enterprise datasets, you must step up to Azure Data Factory.
`,
};
