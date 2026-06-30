import { DocContent } from "@/types/docs";

export const bulkDataImportExport: DocContent = {
  title: "Bulk Data Import/Export",
  description:
    "Design high-throughput data migration strategies using Azure Data Factory, SSIS, and the Dataverse ExecuteMultiple API.",
  content: `
## The Business Requirement

"We are migrating off our legacy Salesforce system. We need to import 5 million Accounts, 15 million Contacts, and 50 million Activities into Dataverse over a single weekend before go-live on Monday."

## The Naive Approach

A beginner extracts the 5 million Accounts into an Excel file, opens the Dynamics 365 browser interface, and uses the native "Import Data" wizard.
- **Why it fails:** The native Import wizard is designed for sales reps importing 500 rows. Attempting to import 5 million rows via the browser will timeout, crash, or take 3 weeks to complete. 

## The Enterprise Architecture

For massive data migrations, architects use enterprise ETL (Extract, Transform, Load) tools and heavily parallelized API patterns.

### 1. The Tooling (ADF or SSIS)
The architect provisions **Azure Data Factory (ADF)** (or SQL Server Integration Services with KingswaySoft).
These tools are specifically designed to read massive CSV/SQL sources, apply complex transformations, and push data into the Dataverse API at extreme speeds.

### 2. The API (ExecuteMultipleRequest)
If you send 5 million individual \`CreateRequest\` API calls to Dataverse over the network, the network latency alone will ruin the migration.
The ETL tool must use the \`ExecuteMultipleRequest\` API. This allows the tool to bundle 1,000 \`CreateRequests\` into a single massive HTTP packet. Dataverse receives the packet, executes all 1,000 creations locally on the server, and returns a single response, massively reducing network overhead.

### 3. Bypassing Custom Logic (Crucial Step)
If you have a C# Plugin registered on the \`Create\` of an Account that reaches out to an external API to verify the address, that plugin will fire 5 million times during the migration. It will completely throttle the Dataverse API, and you will hit your Service Protection Limits instantly.

**The Solution:** The architect must selectively disable custom logic during the migration.
In modern Dataverse, the ETL tool can pass a special header in the API call: \`BypassCustomPluginExecution = true\`. 
Dataverse will insert the 5 million rows straight into the SQL database without triggering a single custom C# plugin or Power Automate flow, allowing the migration to finish in hours instead of weeks.

## Things to Remember

- Never use the native Dataverse **Import Data** wizard for enterprise migrations (>100k rows).
- Use **Azure Data Factory** or **SSIS (KingswaySoft)**.
- Bundle API calls using the **ExecuteMultipleRequest**.
- Protect your API limits by using **BypassCustomPluginExecution** to skip plugins and flows during the bulk load.
  `.trim(),
};
