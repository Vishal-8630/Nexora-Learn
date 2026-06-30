import { DocContent } from "@/types/docs";

export const asynchronousProcessing: DocContent = {
  title: "Asynchronous Processing",
  description:
    "Discover how to protect the user experience and avoid Sandbox timeouts by offloading heavy computational logic to background queues and Azure infrastructure.",
  content: `
## Introduction

The primary goal of a Dynamics 365 Solution Architect is to relentlessly protect the **User Experience**. 

When a salesperson clicks "Save" on an Opportunity, they expect the browser to refresh and release the UI lock in less than 1 second. If you attach a massive Synchronous Plugin to the Save event that recalculates 50 related records, the user will be staring at a "Processing..." spinner for 15 seconds.

If that calculation takes more than 2 minutes, the Dataverse Sandbox will aggressively kill the transaction, the data will roll back, and the salesperson will lose all their data entry.

The architectural solution to this problem is **Asynchronous Processing**.

## Asynchronous Plugins

Instead of executing C# code immediately when the user initiates a transaction, you can register a Plugin to run in the **Background (Asynchronous)** pipeline.

When the user clicks Save, Dataverse writes the Opportunity payload to the SQL database and instantly returns control to the user's browser. Simultaneously, Dataverse drops an execution message into an internal Azure background queue (the Async Service). 

A few seconds (or minutes) later, a background server picks up the queued message and executes your C# plugin code. Because the user's browser session is no longer actively waiting for the HTTP response, they experience zero UI lag.

### The Trade-off
Asynchronous plugins do not guarantee immediate, real-time execution. If it is month-end and the shared servers are heavily loaded, your Async plugin might not dequeue and execute for 5 to 10 minutes. 
**Rule of Thumb:** If the user *must* see the result immediately on the screen to continue their work, use Synchronous. If the calculation is for backend reporting, rollup data, or external integration, always mandate Asynchronous.

## Power Automate (Cloud Flows)

By default, when you architect a Power Automate flow triggered by Dataverse (e.g., "When a row is added, modified or deleted"), it executes **Asynchronously**.

This is why architects mandate Power Automate over legacy Synchronous Real-Time Workflows. Power Automate offloads the heavy compute burden to the independent Azure Logic Apps engine, completely removing the workload from your Dataverse SQL environment and Sandbox workers.

## Azure Integration (The Ultimate Offload)

While Asynchronous Plugins protect the user's browser session, they are still fundamentally limited by the Dataverse Sandbox architecture (the 2-minute timeout still applies to Async plugins!).

If you have a complex calculation or integration that requires 5 minutes to execute, you cannot use a Dataverse Plugin. You must offload to Azure.

As discussed in Phase 17 (Architecture), the ultimate asynchronous pattern is:
1. Dataverse natively drops an event payload into an **Azure Service Bus** queue. (Instant execution).
2. The user goes back to work immediately.
3. An **Azure Function** (which can be configured for a 10-minute or infinite timeout) pulls the message from the Service Bus.
4. The Azure Function executes the massive 5-minute calculation using dedicated compute.
5. The Azure Function updates the Dataverse record securely via the REST Web API.

## Handling Deadlocks (Architectural Risk)

> [!CAUTION]
> **SQL Deadlocks in High-Volume Async Processing**
> When you move processing to the background, you heavily increase the risk of SQL Deadlocks.
> Imagine 5 users update 5 different Contacts on the exact same Account simultaneously. This triggers 5 Asynchronous Plugins. Because the Async Service is highly multi-threaded, it spins up 5 parallel threads to process the plugins concurrently. If all 5 plugins attempt to update the parent Account record at the exact same millisecond, the SQL Server will detect a deadlock and kill one or more of the transactions.

You must design your background logic to be strictly **Idempotent** (safe to retry multiple times without corrupting data) and gracefully handle SQL locking errors through robust retry logic.

## Things to Remember

- Protect the user experience by moving heavy computational logic to the **Background**.
- **Async Plugins** utilize an internal queue but are still strictly bound by the 2-minute limit.
- **Azure Service Bus + Azure Functions** is the enterprise standard for bypassing all Dataverse throttling limits.
- Background multi-threading introduces the severe risk of **SQL Deadlocks**.

## What's Next

Now that we know how to move code to the background, we must ensure the C# code itself is running as fast as possible. Next, we cover **Plugin Optimization**.
  `.trim(),
};
