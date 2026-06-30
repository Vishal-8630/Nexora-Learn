import { DocContent } from "@/types/docs";

export const performanceOptimizationOverview: DocContent = {
  title: "Performance Optimization Overview",
  description:
    "An introduction to enterprise performance tuning in Dynamics 365, focusing on database bottlenecks, API throttling, and code execution efficiency.",
  content: `
## Introduction

Dataverse is a highly scalable, multi-tenant cloud database. Microsoft manages the underlying hardware, memory allocation, and CPU scaling in the background automatically. 

Because of this abstraction, many developers falsely assume they do not need to worry about performance optimization. This is a highly dangerous architectural misconception. If you write a poorly optimized C# plugin or a catastrophic FetchXML query, Dataverse will not magically resolve it—it will throttle your API requests or forcefully terminate your SQL transactions to protect the stability of the rest of the tenants on the shared server.

Performance optimization in Dynamics 365 requires a deep understanding of exactly how your custom code and queries interact with the underlying Azure SQL database pipeline.

## The Three Pillars of Performance

When a user clicks "Save" on a record and subsequently submits an IT ticket complaining that *"CRM is slow"*, the architectural bottleneck almost universally falls into one of three categories:

### 1. Code Execution (The Application Layer)
The user clicks Save, and Dataverse fires off 3 Synchronous Plugins and a real-time Workflow. If one of those plugins makes an external synchronous HTTP call that takes 5 seconds, the user's browser is completely frozen for 5 seconds.
- *Architectural Solution:* **Plugin Optimization** and **Asynchronous Processing**.

### 2. Data Retrieval (The Query Layer)
A user opens a dashboard loaded with charts. One chart executes a FetchXML query that requests all columns from 5 different tables using massive Outer Joins, forcing the SQL engine to execute a full table scan across millions of rows.
- *Architectural Solution:* **FetchXML Optimization**, **Indexing**, and **Query Optimization**.

### 3. Data Bulk Operations (The API Layer)
An external ERP system needs to insert 10,000 invoices into Dynamics 365 every night. It sends 10,000 individual, concurrent HTTP POST requests. The Dataverse Web API becomes overwhelmed by the concurrency and aggressively issues HTTP 429 (Too Many Requests) throttling errors.
- *Architectural Solution:* **Batch Operations** and **Concurrency Management**.

## The Execution Timeout (The 2-Minute Rule)

The absolute golden rule of Dataverse performance architecture is the **2-Minute Timeout**.

> [!CAUTION]
> **The Sandbox Worker Termination**
> If any synchronous transaction (a C# Plugin or a Real-Time Workflow) takes longer than exactly 2 minutes to execute, the Dataverse Sandbox worker process terminates it immediately and violently. A generic error is thrown to the user, and the entire SQL database transaction is rolled back.

If your code is hitting this threshold, you must either heavily optimize the C# code, index the underlying SQL queries it executes, or move the logic entirely out of the synchronous pipeline.

## Things to Remember

- Microsoft scales the hardware, but **you must scale the architecture**.
- Bad performance usually stems from **synchronous plugins**, **un-indexed queries**, or **chatty API calls**.
- All synchronous operations are strictly bound by the mandatory **2-Minute Timeout limit**.

## What's Next

We will begin with the most common cause of slow CRM environments and locked user interfaces: synchronous code execution. Next, we will cover **Asynchronous Processing**.
  `.trim(),
};
