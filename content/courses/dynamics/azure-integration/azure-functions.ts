import { DocContent } from "@/types/docs";

export const azureFunctions: DocContent = {
  title: "Azure Functions",
  description:
    "Learn how to use serverless Azure Functions to bypass Dataverse plugin limits, execute heavy computational logic, and integrate securely with external systems.",
  content: `
## Introduction

Dataverse has a strict **2-minute execution timeout** for all custom plugins (C# code executing synchronously or asynchronously). If your code takes longer than 2 minutes, Dataverse kills the process and rolls back the transaction. 

Furthermore, plugins run in a highly restricted "Sandbox" environment. They cannot use external DLLs (without configuring Dependent Assemblies), and they cannot access the local file system.

When you hit these limits, the solution is **Azure Functions**.

## What is an Azure Function?

Azure Functions provide **Serverless Compute**. You write a small block of code (C#, Node.js, Python), deploy it to Azure, and Azure provides a URL or trigger mechanism. Whenever that trigger fires, the code runs.

You only pay for the exact milliseconds the code executes. You do not have to manage, patch, or provision a Windows or Linux server.

## Decision Making: Plugin vs Azure Function

**Use a Dataverse Plugin when:**
- The logic is extremely fast (under 2 seconds).
- You need the logic to be synchronous (preventing the user from saving the record if validation fails).
- You need the entire operation to execute in a single SQL transaction (auto-rollback on failure).

**Use an Azure Function when:**
- The logic involves heavy file processing (e.g., generating massive PDFs or parsing 100MB CSV files).
- You need to connect to an archaic, legacy external system that takes 30 seconds to respond.
- You need to use external libraries that are incompatible with the Dataverse Sandbox.

## How to Trigger a Function from Dataverse

There are two primary patterns for invoking an Azure Function from Dynamics 365:

### 1. The Webhook Pattern (Synchronous / Direct)
You can use the Plugin Registration Tool to register a **Webhook**. 
When a record is created in Dataverse, Dataverse makes an HTTP POST request to your Azure Function URL, passing the JSON Execution Context.

> [!CAUTION]
> **Blocking the UI**
> If you make the Webhook synchronous, and the Azure Function takes 5 seconds to run, the user's browser is frozen for 5 seconds waiting to save. Always prefer asynchronous execution unless the business strictly requires real-time validation.

### 2. The Service Bus Pattern (Asynchronous / Decoupled)
Instead of calling the Function directly, Dataverse drops the event into an Azure Service Bus Queue. The Azure Function is configured with a "Service Bus Trigger", meaning Azure automatically wakes up the Function and hands it the message whenever the queue receives data.

\`\`\`text
User Clicks "Generate Contract"
        │
Dataverse writes message to Azure Service Bus
        │ (Returns control to User instantly)
        ▼
Azure Service Bus triggers Azure Function
        │
Azure Function generates 50-page PDF
        │
Azure Function calls Dataverse API to attach PDF
\`\`\`

## Authenticating back to Dataverse

Usually, the Azure Function receives an ID from Dataverse, does some heavy calculation, and needs to push the result *back* into Dataverse.

To do this, the Azure Function must authenticate using a **Service Principal (Client Credentials Flow)**. 
You provide the Azure Function with a Client ID and Client Secret, it acquires a token from Microsoft Entra ID, and updates the Dataverse record using the Web API or Organization Service.

## Real-world Perspective: Cold Starts

Because Azure Functions (on the Consumption plan) are serverless, Azure spins down the server if it hasn't been used recently. When a new request comes in, Azure takes 1-3 seconds to boot up the server. This is called a **Cold Start**. 
If you are building an integration that requires absolute sub-second, real-time responses, you must upgrade the Azure Function to a **Premium Plan** to keep instances "warm."

## Things to Remember

- Use Azure Functions to escape the **Dataverse Sandbox limits** (2-minute timeout, heavy processing).
- They provide **Serverless Compute** and infinite scale.
- Trigger them synchronously via **Webhooks** or asynchronously via **Service Bus**.
- They authenticate back to Dataverse using **Service Principals (S2S)**.

## What's Next

We mentioned the Service Bus pattern for asynchronous decoupling. Next, we will differentiate that from lightweight event routing using **Azure Event Grid**.
  `.trim(),
};
