import { DocContent } from "@/types/docs";

export const elasticTables: DocContent = {
  title: "Elastic Tables in Dataverse: Scalable Storage for High-Volume, Unstructured Data",
  description:
    "Explore how Dataverse Elastic Tables leverage Azure Cosmos DB to efficiently store and manage massive volumes of high-velocity, unstructured data, ideal for IoT, telemetry, and logging scenarios.",
  content: `
## Introduction: The Challenge of Scale in Dataverse

Standard Dataverse tables are built on Azure SQL Database. They are inherently relational, highly structured, and enforce a strict, predefined schema. This design is perfect for core business entities like "Account," "Contact," or "Opportunity," where data integrity and complex relationships are paramount.

However, modern applications often generate vast amounts of data that don't fit this traditional relational model. Imagine an Internet of Things (IoT) application ingesting 10,000 temperature sensor readings every minute, or a system collecting millions of user clickstream events daily. Attempting to insert such high-volume, high-velocity, and often unstructured data into a standard Dataverse SQL table would quickly lead to performance bottlenecks, API throttling, and rapidly escalating capacity costs.

To address these challenges, Microsoft introduced **Elastic Tables** in Dataverse.

## What are Elastic Tables?

Elastic Tables are a specialized type of Dataverse table designed for extreme scalability and flexibility. Unlike standard tables, which are backed by Azure SQL Database, Elastic Tables leverage **Azure Cosmos DB** – Microsoft's globally distributed, multi-model NoSQL database service.

This fundamental difference allows Elastic Tables to:
*   **Ingest massive volumes of data:** Handle millions of operations per second.
*   **Process data at incredibly high velocities:** Achieve single-digit millisecond latency at the 99th percentile.
*   **Automatically scale out:** Dynamically adjust throughput and storage to meet demand without manual intervention.
*   **Store unstructured and semi-structured data:** Adapt to evolving data schemas with ease.

### Standard Tables vs. Elastic Tables: A Quick Comparison

| Feature             | Standard Tables (Azure SQL)                               | Elastic Tables (Azure Cosmos DB)                                |
| :------------------ | :-------------------------------------------------------- | :-------------------------------------------------------------- |
| **Backend Database**| Azure SQL Database                                        | Azure Cosmos DB (NoSQL)                                         |
| **Data Structure**  | Relational, strictly structured, predefined schema        | Unstructured/semi-structured (JSON), flexible schema            |
| **Scalability**     | Vertical scaling, limited horizontal scaling              | Horizontal scaling, globally distributed, automatic partitioning|
| **Throughput**      | Optimized for transactional workloads, moderate volume    | Optimized for high-volume, high-velocity ingestion              |
| **Data Integrity**  | Strong ACID transactions, referential integrity           | Eventual consistency, no cross-table ACID transactions          |
| **Querying**        | Complex relational joins (FetchXML), SQL                  | Limited relational joins, optimized for single-item reads/writes|
| **Use Cases**       | Core business data (Accounts, Contacts, Orders)           | IoT telemetry, logging, audit trails, clickstream data          |

## Key Capabilities of Elastic Tables

### 1. Massive Scale and High Velocity

The core strength of Elastic Tables comes from Azure Cosmos DB. Cosmos DB is built for global distribution and automatic horizontal partitioning, meaning your data is automatically spread across multiple physical partitions to handle increasing throughput and storage demands. This architecture ensures:
*   **Guaranteed Performance:** Predictable high performance and low latency, even under heavy load.
*   **Global Distribution:** Easily replicate data across multiple Azure regions for high availability and low-latency access for globally dispersed users.
*   **Automatic Indexing:** Cosmos DB automatically indexes all data, making it immediately queryable.

### 2. Unstructured Data with JSON Columns

In a standard Dataverse table, adding a new field (column) requires a schema modification, which involves navigating the Power Apps maker portal, creating a new column, and publishing customizations. This process is rigid and not suitable for rapidly changing data structures.

Elastic Tables overcome this by supporting a special column type called a **JSON column** (often named \`Properties\` or \`Data\`). This column can store a complete, nested JSON payload.
*   **Schema Flexibility:** Different rows in the same Elastic Table can have completely different JSON structures within this column. This "schema-on-read" approach provides ultimate flexibility for data like telemetry, application logs, or user preferences, where the data structure might evolve frequently.
*   **Simplified Data Ingestion:** You can dump raw JSON data directly into this column without needing to pre-define every single attribute as a separate Dataverse column.

**Example JSON Payload:**
\`\`\`json
{
  "sensorId": "temp-001",
  "timestamp": "2023-10-27T10:30:00Z",
  "temperatureC": 25.5,
  "humidity": 60,
  "location": {
    "latitude": 34.0522,
    "longitude": -118.2437
  },
  "status": "normal",
  "firmwareVersion": "1.2.3"
}
\`\`\`
A subsequent record could omit \`firmwareVersion\` or add a new \`batteryLevel\` field without requiring any schema changes to the Elastic Table itself.

### 3. Automatic Data Retention (Time-to-Live - TTL)

Many high-volume datasets, such as IoT readings or log data, have a limited useful lifespan. Storing this data indefinitely can lead to unnecessary storage costs and complicate compliance.

Elastic Tables support **Time-to-Live (TTL)**, a native Cosmos DB feature. When configuring an Elastic Table, an administrator can set a TTL value (e.g., 90 days). Dataverse will then automatically and silently delete any row older than the specified duration in the background.
*   **Cost Efficiency:** Ensures storage costs remain predictable and don't grow indefinitely.
*   **Reduced Maintenance:** Eliminates the need for manual bulk delete jobs or custom cleanup processes.
*   **Compliance:** Helps enforce data retention policies automatically.

## When to Use Elastic Tables (Decision Making)

Elastic Tables are the ideal choice for scenarios requiring:

*   **High-Volume, High-Velocity Data Ingestion:** When you need to store millions or billions of records per day/hour, such as:
    *   **IoT Telemetry:** Sensor readings, device status updates.
    *   **Application Logs & Audit Trails:** System events, user activity logs.
    *   **Clickstream Data:** Website or application usage analytics.
    *   **Temporary or Staging Data:** Data that needs to be processed and then discarded or archived.
*   **Unstructured or Semi-Structured Data:** When your data schema is flexible, evolving, or doesn't fit a rigid relational model.
*   **Data with a Short Retention Period:** When data naturally expires after a certain time, making TTL highly beneficial.
*   **Eventual Consistency Tolerance:** When immediate, strong transactional consistency across multiple records or tables is not a strict requirement.

## When to Avoid Elastic Tables (Limitations & Decision Making)

While powerful, Elastic Tables are not a replacement for standard Dataverse tables in all scenarios. Avoid them when:

*   **Strict Relational Integrity is Required:**
    *   **No Complex Relational Joins:** You cannot perform complex FetchXML queries with multiple joins across Elastic Tables or between Elastic and Standard tables. Queries are optimized for single-item lookups or simple scans.
    *   **No ACID Transactions Across Tables:** You cannot bundle an Elastic Table insert and a Standard Table update into a single, atomic C# transaction that rolls back if one operation fails. Operations on Elastic Tables are eventually consistent.
    *   **No Relationships to Standard Tables:** Elastic Tables cannot have direct N:1, 1:N, or N:N relationships with standard Dataverse tables.
*   **Core Business Data:** For critical business entities (e.g., Accounts, Contacts, Orders) where strong referential integrity, complex business logic, and traditional Dataverse features (like plugins, workflows, calculated fields) are essential.
*   **Complex Dataverse Business Logic:**
    *   **No Rollup or Calculated Columns:** The Dataverse SQL engine cannot perform these calculations on Cosmos DB data.
    *   **Limited Plugin/Workflow Triggers:** While you can trigger plugins/Power Automate flows on row creation/update/delete of an Elastic Table, you cannot trigger them based on changes *within* the JSON column's properties.
    *   **No Field-Level Security for JSON Properties:** Field-level security applies to defined Dataverse columns, not to individual properties within a JSON column.
*   **Strong Consistency is Paramount:** If your application absolutely requires immediate, strong consistency for all read operations (e.g., financial transactions), the eventual consistency model of Cosmos DB might not be suitable.
*   **Cost Model Considerations:** Elastic Tables consume Request Units (RUs) based on operations. While highly scalable, understanding and managing RU consumption is crucial for cost optimization.

## Best Practices for Elastic Tables

1.  **Design for Scale:** Structure your JSON data to optimize for common query patterns. For example, if you frequently query by \`sensorId\`, ensure it's a top-level property.
2.  **Leverage TTL:** Always configure Time-to-Live for data that has a limited lifespan to manage storage costs and compliance automatically.
3.  **Monitor Request Units (RUs):** Understand how your operations consume RUs. Optimize your data ingestion and querying to minimize RU consumption.
4.  **Combine with Azure Synapse Link:** For advanced analytics, machine learning, and complex reporting on Elastic Table data, use Azure Synapse Link for Dataverse. This allows you to export data to Azure Synapse Analytics without impacting Dataverse performance.
5.  **Consider Data Archiving:** For historical data that needs to be retained beyond the TTL, plan for archiving to cheaper storage (e.g., Azure Data Lake Storage) via Synapse Link or other integration methods.
6.  **Use Dataverse API for Ingestion:** For high-volume ingestion, use the Dataverse Web API or SDK, potentially in batch operations, to efficiently insert data.

## Common Mistakes

*   **Treating them like Standard Tables:** Expecting full relational capabilities, complex joins, or ACID transactions across different table types.
*   **Ignoring TTL:** Leading to uncontrolled storage growth and higher costs.
*   **Over-querying within Dataverse:** Attempting complex analytical queries directly on Elastic Tables within Dataverse, which can be inefficient. Instead, offload analytics to Synapse Link.
*   **Not understanding RU consumption:** Leading to unexpected costs or throttling if throughput limits are hit.
*   **Putting core business data in Elastic Tables:** Sacrificing relational integrity and Dataverse business logic capabilities for data that doesn't require extreme scale.

## Things to Remember

*   **Backend:** Elastic Tables are backed by **Azure Cosmos DB (NoSQL)**, not Azure SQL.
*   **Purpose:** Designed for **high-volume, high-velocity, unstructured** data (IoT, telemetry, logs).
*   **Flexibility:** Support unstructured **JSON columns** for flexible schema.
*   **Cost & Maintenance:** Auto-delete old data using **Time-to-Live (TTL)**.
*   **Limitations:** No complex relational joins, no cross-table ACID transactions, limited Dataverse business logic support.
*   **Analytics:** Best combined with **Azure Synapse Link** for advanced analytics.

## Related Topics

*   [Standard Dataverse Tables](link-to-standard-tables-doc)
*   [Azure Synapse Link for Dataverse](link-to-synapse-link-doc)
*   [Dataverse Web API for Data Operations](link-to-webapi-doc)
*   [Power Automate for Dataverse Integrations](link-to-power-automate-doc)
*   [Understanding Request Units (RUs) in Azure Cosmos DB](link-to-cosmosdb-rus-doc)
  `.trim(),
};