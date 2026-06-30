import { DocContent } from "@/types/docs";

export const azureIntegrationOverview: DocContent = {
  title: "Azure Integration",
  description:
    "Learn how to integrate Dynamics 365 with the broader Azure ecosystem—including Service Bus, Azure Functions, and API Management—to build scalable enterprise architectures.",
  content: `
## Introduction

Dynamics 365 does not exist in a vacuum. In a large enterprise, it must communicate with ERPs, HR systems, legacy on-premise databases, and external partner networks.

While you can use Plugins or Power Automate for basic integrations, massive scale requires enterprise middleware. Because Dynamics 365 is built natively on Microsoft Azure, it integrates seamlessly with the entire **Azure Ecosystem**.

## The Challenge of Point-to-Point

If you write a C# Plugin in Dynamics 365 that makes a direct HTTP REST call to an SAP server, you create a brittle **Point-to-Point** integration.
- What if the SAP server is down for maintenance? The plugin fails, and the user cannot save their record in Dynamics.
- What if someone bulk imports 100,000 accounts? Dynamics sends 100,000 requests in a minute, crashing the SAP server.

To solve this, architects use the **Publisher/Subscriber (Pub/Sub)** model via Azure.

## 1. Azure Service Bus Integration

Dataverse has native, out-of-the-box integration with Azure Service Bus.

Instead of calling the external system directly, you use the Plugin Registration Tool to register a **Service Endpoint**. 
When a record is created in Dataverse, the platform natively pushes the Execution Context (a JSON payload of the event data) into an Azure Service Bus Queue or Topic.

**Decision Making (Why use it):**
- **Decoupling:** Dynamics doesn't care if SAP is offline. It drops the message in the queue and instantly returns control to the user.
- **Throttling:** SAP can pull messages from the queue at its own safe pace.
- **Reliability:** If SAP fails to process a message, the message remains in the queue and can be retried automatically.

## 2. Azure Functions

Azure Functions provide serverless compute. You write small blocks of C# or Node.js code that execute on-demand in the Azure cloud.

Azure Functions are the perfect "Subscriber" to a Service Bus. 

\`\`\`text
Dynamics 365 
    │ (Pushes Event Context)
    ▼
Azure Service Bus (Queue)
    │ (Triggers)
    ▼
Azure Function (C# Logic to format XML)
    │ (Sends HTTP POST)
    ▼
SAP ERP System
\`\`\`

**Decision Making (Plugins vs Azure Functions):**
Because Azure Functions do not have a strict 2-minute timeout limit, they don't consume Dataverse API quotas, they can reference any external NuGet package (unlike the Dataverse Sandbox), and they scale infinitely based on load. Use Functions for heavy integration translation.

## 3. Azure Logic Apps

Logic Apps are the enterprise, pro-developer version of Power Automate. Under the hood, Power Automate actually uses the Logic Apps engine.

**Decision Making (When to use Logic Apps instead of Power Automate):**
- When the integration is owned by Enterprise IT, not a citizen developer.
- When you need to store the workflow code in a Git repository (Source Control) using ARM templates or Bicep.
- When you require advanced enterprise connectors (like B2B AS2/EDI messaging).
- When you need to monitor execution failures using Azure Monitor and Log Analytics.

## 4. Azure API Management (APIM)

If your enterprise has 20 different internal APIs, you do not want Dynamics 365 connecting to 20 different URLs with 20 different authentication methods.

Azure API Management sits in front of your internal APIs. 
You expose your internal systems through APIM. Dynamics 365 talks to APIM using a single secure connection, and APIM routes the request to the correct internal server.

## 5. Azure Synapse Link for Dataverse

Historically, if a company wanted to run heavy analytical reporting or machine learning against CRM data, they had to write complex ETL (Extract, Transform, Load) scripts to pull data out of Dynamics 365 every night.

**Azure Synapse Link** completely replaces this. With a few clicks in the admin center, Dataverse continuously streams all data changes into an Azure Data Lake in real-time (in Delta Lake format). 

Data scientists and BI teams can then use Azure Synapse Analytics or Databricks to run massive AI models or Power BI dashboards directly against the Data Lake, completely removing the reporting load from the transactional CRM database.

## Best Practices

- **Never block the user for integration:** Always prefer asynchronous patterns (Service Bus) for external integrations. Synchronous integrations should only be used if the external system must validate the data before the CRM save is legally allowed to proceed.
- **Manage Secrets Securely:** Never store external API keys in Dynamics plugins or flows. Store them in **Azure Key Vault**, and allow your Azure Functions or Logic Apps to fetch them securely at runtime.

## Common Mistakes

> [!WARNING]
> **Reinventing the wheel with Webhooks**
> Dataverse supports standard HTTP Webhooks to push data to external services. However, if the external service is down, Dataverse only retries a Webhook a few times before abandoning it entirely (resulting in data loss). If you need guaranteed delivery, always use the native Azure Service Bus integration instead of standard Webhooks.

## Things to Remember

- Use **Azure Service Bus** to decouple systems and guarantee delivery.
- Use **Azure Functions** for heavy, custom integration logic that exceeds plugin limits.
- Use **Logic Apps** for enterprise IT automation and source control.
- Use **Synapse Link** to stream data to Azure Data Lake for heavy reporting.

## What's Next

Now that we understand the big picture of Azure Integration, let's drill down into the specifics of serverless compute with **Azure Functions**.
  `.trim(),
};
