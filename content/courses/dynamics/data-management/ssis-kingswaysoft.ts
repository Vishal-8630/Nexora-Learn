import { DocContent } from "@/types/docs";

export const ssisKingswaysoft: DocContent = {
  title: "SSIS & KingswaySoft",
  description:
    "Understanding the legacy but extremely powerful ecosystem of SSIS for CRM migrations.",
  content: `
## The Legacy King of Migration

Before Azure Data Factory and Dataflows existed, if an enterprise needed to migrate data into Dynamics CRM, there was only one acceptable answer: **SQL Server Integration Services (SSIS)**.

Because SSIS out of the box does not understand the complex Dynamics 365 Web API, 3rd party vendors built specialized connectors. The undisputed leader in this space is **KingswaySoft**.

Even today, for complex on-premises to cloud migrations, SSIS with KingswaySoft remains a highly relevant and powerful tool.

---

## Why KingswaySoft?

KingswaySoft provides the **SSIS Integration Toolkit for Microsoft Dynamics 365**. It adds visual components to Visual Studio for reading and writing to Dataverse.

### 1. Advanced Upsert Handling
While Dataflows can do basic Upserts based on Alternate Keys, KingswaySoft provides incredibly granular control. You can manually specify exactly which fields constitute a match, handle fuzzy matching, and define exact fallback behaviors if a match fails.

### 2. Text Lookup
Imagine importing a Contact with a \`State\` field containing "California". Dataverse expects a GUID to the State lookup table. 
KingswaySoft has a built-in feature called **Text Lookup**. You feed it the string "California", tell it to look at the \`new_state\` table, and it will automatically resolve the GUID on the fly during the SSIS data flow.

### 3. The "Ignore Unchanged" Feature
When running a nightly sync of 1 million rows, perhaps only 500 rows actually changed today in the source system. 
KingswaySoft can intelligently compare the incoming source data with the existing Dataverse data. If the fields are identical, it simply skips the update. This prevents triggering massive amounts of unnecessary Audit History logs and custom plugins in Dataverse.

---

## The Migration to the Cloud

The primary downside of SSIS is that it requires a server (a Windows Server running SQL Server Integration Services). In the modern cloud era, enterprises do not want to manage VMs.

### Azure-SSIS Integration Runtime (IR)
To bridge this gap, Microsoft allows you to run your legacy SSIS \`.dtsx\` packages directly in the Azure cloud via **Azure Data Factory**. 

By spinning up an Azure-SSIS IR, you can take the exact KingswaySoft packages you built 5 years ago for Dynamics CRM 2016, and run them completely serverless in the cloud against Dynamics 365.

> [!TIP]
> **When to choose SSIS over ADF?**
> If you are starting a brand new project today, default to Azure Data Factory or Dataflows. However, if your data transformation logic requires complex, multi-stage, row-by-row manipulation that is difficult to express in ADF, SSIS with C# Script Components remains unmatched in flexibility.
`,
};
