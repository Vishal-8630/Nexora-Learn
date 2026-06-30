import { DocContent } from "@/types/docs";

export const azureDataFactory: DocContent = {
  title: "Azure Data Factory (ADF)",
  description:
    "The enterprise standard for migrating millions of rows into Dataverse efficiently.",
  content: `
## When Dataflows Aren't Enough

While Dataflows (Power Query) are great for synchronization, they hit a wall when dealing with massive enterprise migrations. 

If you need to migrate 50 million historical emails, tasks, and notes from a legacy Siebel CRM system into Dataverse over a single weekend, Dataflows will time out. You need a dedicated, heavy-duty Azure compute engine. You need **Azure Data Factory (ADF)**.

---

## What is Azure Data Factory?

ADF is a fully managed, serverless data integration service in Azure. It allows you to build complex ETL (Extract, Transform, Load) pipelines visually. 

Critically, ADF has a native **Dynamics 365 / Dataverse Connector**.

---

## Why ADF is the Enterprise Standard

### 1. Parallel Execution & Batching
ADF does not insert rows one by one. It batches the requests (using the \`ExecuteMultiple\` request under the hood) and, more importantly, it can execute those batches in parallel across multiple compute nodes. 

You can define a **Write Batch Size** (e.g., 100) and a **Degree of Copy Parallelism** (e.g., 10), allowing you to slam 1,000 records into Dataverse per second (provided you don't hit the Service Protection API Limits).

### 2. Service Principal Authentication
ADF natively supports authenticating to Dataverse using an Azure App Registration (Service Principal). This means your massive data migration pipeline doesn't rely on a licensed user's password that might expire mid-migration.

### 3. Handling Lookups (Entity References)
Migrating relational data (e.g., an Opportunity linked to an Account) is complex. ADF natively handles looking up the GUIDs. 
If your source SQL database only has the \`AccountName\`, ADF can map it using an **Alternate Key** on the Dataverse Account table, automatically resolving the GUID during the pipeline run.

---

## Navigating Service Protection API Limits

When you throw massive ADF compute power at Dataverse, you will inevitably hit Microsoft's **Service Protection API Limits**.

Dataverse protects itself from DDoS attacks by throttling requests. If you exceed (for example) 6,000 requests in a 5-minute window per user, Dataverse will reject the requests with a \`429 Too Many Requests\` HTTP error.

**How ADF handles this:**
The native Dataverse connector in ADF automatically respects the \`Retry-After\` header sent by Microsoft. If Dataverse says "Stop sending data for 30 seconds", ADF will pause its pipeline, wait 30 seconds, and then automatically resume the batch. 

> [!CAUTION]
> **Turn off your custom plugins!**
> During a massive ADF migration, you must turn off your custom plugins and workflows. If you migrate 10 million Accounts, and you have a synchronous plugin on Account Create, your migration will take 10x longer and you will instantly hit API throttling limits. If possible, utilize the \`BypassCustomPluginExecution\` parameter (though native support in ADF requires careful configuration).
`,
};
