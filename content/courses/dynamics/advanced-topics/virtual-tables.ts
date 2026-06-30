import { DocContent } from "@/types/docs";

export const virtualTables: DocContent = {
  title: "Virtual Tables in Dataverse",
  description:
    "Learn how to seamlessly integrate and display external data within Dataverse in real-time, without data duplication, storage consumption, or complex synchronization processes.",
  content: `
## Introduction

Enterprises often need to display data residing in external systems (like an ERP, legacy SQL database, or another SaaS application) directly within Dynamics 365 applications. Historically, integrating large datasets, such as 50 million "Invoice" records from an external SQL Server, into Dataverse for sales teams to view presented significant challenges:

**The Traditional Integration Problem:**
1.  **Data Duplication & Cost:** Copying all records into Dataverse consumes valuable database capacity, incurring additional costs for data that already exists elsewhere.
2.  **Data Staleness:** Nightly or scheduled synchronization jobs mean the data in Dataverse is often out of date, leading to decisions based on stale information.
3.  **Integration Complexity & Failures:** Building and maintaining robust sync jobs is complex, prone to failures, and requires significant development and operational overhead.

The modern, efficient solution to this problem is the **Virtual Table**.

## What is a Virtual Table?

A Virtual Table is a custom table in Dataverse that appears and behaves like a standard Dataverse table, complete with columns, forms, views, and dashboards. However, unlike standard tables, a Virtual Table has **no physical storage** in the Dataverse SQL database. Instead, it acts as a real-time window into an external data source.

## How Virtual Tables Work

When a user interacts with a Virtual Table (e.g., opens a view, searches for records, or navigates to a form), Dataverse does not query its own database. Instead, it intercepts the request, translates it into a query for the external system, and fetches the data on demand.

Here's a simplified flow:

\`\`\`
User Action in Dynamics 365 UI (e.g., View Invoices)
       ↓
Dataverse (Virtual Table)
       ↓  (Translates Dataverse OData/FetchXML query)
Data Provider (OData v4, Virtual Connector, or Custom C#)
       ↓  (Executes query against external system)
External System (e.g., SAP, SQL Server, custom API)
       ↓  (Returns data)
Data Provider
       ↓  (Maps external data to Dataverse EntityCollection)
Dataverse
       ↓  (Projects data onto the screen)
User Sees Real-time External Data
\`\`\`

To the end user, this process is seamless and transparent; the Virtual Table looks and acts exactly like a native Dataverse table.

## Data Providers: Connecting to External Systems

To enable a Virtual Table to communicate with an external system, a "Data Provider" is required. The Data Provider is responsible for translating Dataverse queries (OData/FetchXML) into the external system's native language and mapping the results back to Dataverse.

Dataverse offers several options for Data Providers:

1.  **OData v4 Data Provider (Out-of-the-Box):**
    *   **Use Case:** Ideal when your external system (e.g., SAP, SharePoint, another Dataverse instance, or any custom service) exposes a standard OData v4 API endpoint.
    *   **Configuration:** No code is required. You configure the virtual table by pointing it to the OData v4 endpoint and mapping the external entity's properties to Dataverse columns.
    *   **Benefit:** Quickest and easiest setup for compatible systems.

2.  **Virtual Connectors (Power Platform Connectors):**
    *   **Use Case:** Leverage existing Power Platform connectors to integrate with a wide range of services, including SQL Server, SharePoint, Salesforce, and hundreds of others.
    *   **Configuration:** Utilizes Power Automate flows and custom connectors to define how Dataverse interacts with the external data source. This is a low-code/no-code approach.
    *   **Benefit:** Extends virtual table capabilities to many popular services without writing custom code, making it accessible to citizen developers.

3.  **Custom Data Providers (C# Plugin):**
    *   **Use Case:** When the external API is proprietary, uses a non-OData standard (e.g., SOAP, REST with custom authentication), or requires complex business logic during data retrieval.
    *   **Configuration:** A developer writes a C# plugin that implements specific Dataverse messages, primarily \`Retrieve\` (for single record) and \`RetrieveMultiple\` (for multiple records).
        *   The plugin intercepts these messages, makes custom HTTP calls to the external system, processes the response (e.g., JSON parsing), maps the external data to a Dataverse \`Entity\` or \`EntityCollection\`, and returns it.
    *   **Benefit:** Provides maximum flexibility and control over the integration logic.
    *   **Consideration:** Requires professional development skills and introduces more complexity in terms of development, testing, and maintenance.

## When to Use Virtual Tables

Virtual Tables are an excellent choice for specific integration scenarios:

*   **Real-time Data Viewing:** When users need to see the most current external data without delay.
*   **Avoiding Data Duplication:** When the source of truth must remain in the external system, and you want to avoid storing redundant data in Dataverse.
*   **Conserving Dataverse Storage:** For very large datasets that would consume significant Dataverse database capacity if copied.
*   **Read-Only or Primarily Read Scenarios:** When the primary requirement is to display external data, with minimal or no write-back operations from Dataverse.
*   **External Data Ownership:** When the external system is the authoritative source, and Dataverse should only present a view of that data.
*   **Simplified Integration:** For systems with OData v4 endpoints or existing Power Platform connectors, virtual tables offer a low-code integration path.

## When to Avoid Virtual Tables

While powerful, Virtual Tables are not a universal solution. Consider alternatives if:

*   **Full Dataverse Security is Required:** If you need to apply Dataverse's granular security model (Business Units, Team Ownership, Field Security Profiles) to the external data.
*   **Frequent Write Operations:** If users need to frequently create, update, or delete external records directly from Dataverse. While custom providers *can* implement write operations, it adds significant complexity and is not the primary design intent.
*   **Complex Dataverse Business Logic:** If you need to apply Dataverse workflows, calculated columns, rollup fields, or other advanced Dataverse features directly on the external data.
*   **Unreliable or Slow External System:** The performance and availability of the Virtual Table are entirely dependent on the external system. A slow external API will result in a slow user experience in Dynamics 365.
*   **Offline Access:** Virtual Table data is not available offline as it's fetched on demand.
*   **Auditing Requirements:** If you need Dataverse's built-in auditing capabilities to track changes to the external data.

## Limitations

Understanding these limitations is crucial for successful implementation:

1.  **No Native Dataverse Security:** Dataverse security roles, business units, and field-level security do not apply to virtual table records. Security must be managed and enforced by the external system. If a user has read access to the Virtual Table, they can typically see *all* records returned by the external API (unless the external API itself filters based on the calling user's context, which requires custom implementation).
2.  **Limited Write Operations:** By default, Virtual Tables are read-only. While custom data providers can implement \`Create\`, \`Update\`, and \`Delete\` messages, this significantly increases complexity and development effort.
3.  **No Rollup or Calculated Columns:** Standard Dataverse rollup and calculated fields cannot be used directly on virtual table columns because the data is not physically stored in Dataverse.
4.  **No Auditing:** Dataverse cannot audit changes to virtual table fields as the data resides externally.
5.  **Performance Dependency:** The responsiveness of the Dynamics 365 UI when interacting with a Virtual Table is directly tied to the performance and latency of the external system and its API.
6.  **No Offline Capability:** Virtual Table data is always fetched in real-time and is not cached for offline use.
7.  **Limited Advanced Dataverse Features:** Features like change tracking, duplicate detection, and some types of advanced find queries may not function as expected or be fully supported.

## Best Practices

To ensure a robust and performant Virtual Table implementation:

*   **Optimize External API Performance:** This is paramount. Ensure the external API is highly performant, especially for \`RetrieveMultiple\` operations (views, searches). Implement efficient querying, indexing, and pagination on the external system side.
*   **Implement External System Security:** Since Dataverse security doesn't apply, ensure the external API enforces appropriate authorization and authentication for data access. Consider passing user context from Dataverse to the external system for granular security.
*   **Choose the Right Data Provider:**
    *   Prioritize **OData v4 Provider** for OData-compliant systems.
    *   Use **Virtual Connectors** for systems with existing Power Platform connectors.
    *   Reserve **Custom Data Providers** for complex scenarios where other options are not feasible, understanding the increased development and maintenance overhead.
*   **Handle Errors Gracefully:** For custom data providers, implement robust error handling and logging to manage external API failures or unexpected responses.
*   **Design for Read-Only:** If write operations are critical, carefully evaluate if a Virtual Table with custom write logic is the best approach, or if traditional integration patterns (e.g., Power Automate flows for data synchronization) might be more suitable.
*   **Consider Data Volume and Paging:** For large datasets, ensure the external API supports efficient server-side paging to avoid transferring excessive data in a single request.
*   **Test Thoroughly:** Test performance, security, and data accuracy under various load conditions and user scenarios.

## Common Mistakes

Developers new to Virtual Tables often make these mistakes:

*   **Assuming Dataverse Security Applies:** Expecting that configuring Dataverse security roles will restrict access to virtual table records. Remember, security is external.
*   **Ignoring External System Performance:** Not optimizing the external API, leading to slow UI response times and frustrated users.
*   **Attempting Complex Write Operations:** Trying to implement full CRUD (Create, Read, Update, Delete) functionality for virtual tables without understanding the significant custom development required and its inherent limitations.
*   **Not Handling External API Errors:** Failing to build resilience into custom data providers, causing cryptic errors for end-users when the external system is unavailable or returns invalid data.
*   **Using for Data that Should be in Dataverse:** Choosing virtual tables for data that truly belongs in Dataverse and requires its full feature set (security, auditing, workflows).

## Things to Remember

*   Virtual Tables display external data in real-time **without copying it** into Dataverse.
*   They consume **zero Dataverse Database Capacity** for the external data.
*   They rely on **Data Providers** (OData v4, Virtual Connectors, or Custom C#) to fetch and map data.
*   **Security, auditing, and advanced Dataverse features** (like rollup/calculated columns) are primarily managed by the external system or are not supported.
*   Performance is **entirely dependent** on the external system's API.
*   Primarily designed for **read-only** scenarios.

## Related Topics

*   **Elastic Tables:** Learn about storing massive volumes of semi-structured data directly within Dataverse, offering high scalability and performance for specific use cases.
*   **Dataverse Security Model:** Understand how security roles, business units, and field security profiles control access to native Dataverse data.
*   **Power Automate Virtual Connectors:** Explore how to create virtual tables using Power Platform connectors for low-code integration.
*   **Dataverse Plugins:** Dive deeper into custom server-side logic development for Dataverse, including how to build custom data providers.
*   **Dataverse Integration Strategies:** Compare various approaches for integrating external systems with Dataverse, including traditional data synchronization.
  `.trim(),
};