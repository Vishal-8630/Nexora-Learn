import { DocContent } from "@/types/docs";

export const storage: DocContent = {
  title: "Azure Storage",
  description:
    "Discover how to offload heavy file storage and unstructured data from the expensive Dataverse relational database into cost-effective Azure Blob Storage.",
  content: `
## Introduction

Dataverse is a highly sophisticated, relational database with a complex security and metadata layer. Because of this, Dataverse storage is **expensive**.

If a company uses Dynamics 365 for Customer Service, and customers upload millions of massive PDF manuals and high-resolution images to their Cases, the Dataverse File/Log storage capacity will be exhausted rapidly. Buying more Dataverse capacity costs thousands of dollars per month.

To solve this, architects integrate Dataverse with **Azure Storage**.

## Azure Blob Storage

Azure Blob (Binary Large Object) Storage is designed to store massive amounts of unstructured data. It is exponentially cheaper than Dataverse storage.

### The Integration Pattern

If you are building a custom portal where users upload heavy files, do not push those files through Dataverse Web APIs.

1. A customer uploads a 50MB PDF to a custom web portal.
2. The portal requests a temporary **SAS Token** (Shared Access Signature) from an Azure Function.
3. The portal uploads the 50MB PDF *directly* to a container in Azure Blob Storage using the SAS token. (This bypasses Dataverse completely, saving API limits).
4. The Azure Function writes a small text string (the file URL, e.g., \\\`https://contosostorage.blob.core.windows.net/cases/manual.pdf\\\`) into a standard text column in Dataverse.
5. When an internal user opens the Case in Dynamics 365, a custom PCF (Power Apps Component Framework) control reads the URL and renders the PDF directly from Azure, making it look as though the file is natively stored in CRM.

## Dataverse Native File Columns vs Azure Blob

Dataverse *does* have a native "File" column type. Microsoft actually stores this native File column data in Azure Blob Storage behind the scenes, offering you a blended storage rate.

**Decision Making:**
- **Use Dataverse Native File Columns:** For standard CRM attachments (like a signature image or a 2MB Word document). It handles security natively.
- **Use Custom Azure Blob Storage:** When you are building a massive document management system, video streaming service, or ingesting terabytes of telemetry data that should not consume standard Dataverse capacity limits.

## Azure Synapse Link (Data Lake)

Aside from file attachments, Azure Storage is also used for analytical data.

Running heavy Power BI reports against the live Dataverse database degrades performance for actual users typing in the UI, and hits strict API throttling limits.

Using **Azure Synapse Link for Dataverse**, you can establish a continuous pipeline that streams all rows from your Dataverse tables into **Azure Data Lake Storage Gen2** (which is built on top of Blob Storage). 
Your BI team then points their reporting tools at the cheap Data Lake, completely removing the reporting burden from the transactional Dataverse database.

## Things to Remember

- Dataverse storage is **expensive**; Azure Blob storage is **cheap**.
- Move massive **file attachments** (PDFs, images) to Blob Storage via direct SAS token uploads.
- Leave a **URL pointer** in Dataverse to retrieve the file via PCF controls.
- Stream relational data to **Azure Data Lake** for heavy Power BI reporting.

## What's Next

With Azure Integration fully covered, the final step in a developer's journey is deploying the application to production securely. This brings us back to **Application Lifecycle Management (ALM)**.
  `.trim(),
};
