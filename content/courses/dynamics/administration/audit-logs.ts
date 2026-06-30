import { DocContent } from "@/types/docs";

export const auditLogs: DocContent = {
  title: "Audit Logs",
  description:
    "Learn how to configure, manage, and extract Dataverse Audit Logs to meet enterprise compliance and security requirements.",
  content: `
## Introduction

"Who changed the Credit Limit on this account from $5,000 to $50,000 yesterday?"
"When did a user last access sensitive customer data?"
"Was a critical security role assigned to an unauthorized user?"

If auditing is not enabled, answering these crucial questions is impossible. **Dataverse** (the underlying database for Dynamics 365 and Power Apps) includes a native, highly granular Auditing engine. This engine automatically tracks user activity and data modifications across your database, providing an immutable record essential for security, compliance, and troubleshooting.

## Why Use Dataverse Auditing?

Dataverse auditing is a fundamental capability for any enterprise application. It addresses several critical needs:

*   **Accountability:** Provides a clear trail of who did what, when, and from where.
*   **Compliance:** Helps meet regulatory requirements such as GDPR, HIPAA, SOX, and other industry-specific standards that mandate data change tracking.
*   **Security:** Detects suspicious activity, unauthorized data modifications, or changes to security configurations.
*   **Troubleshooting:** Assists developers and administrators in diagnosing data integrity issues or understanding unexpected system behavior.
*   **Data Governance:** Ensures that data changes adhere to organizational policies.

## Configuring Auditing

Auditing is not turned on for everything by default. This is because it consumes significant **Dataverse Log Storage Capacity** and can have a minor impact on performance if overused. An administrator must configure auditing at three distinct, hierarchical levels:

\`\`\`
Global (Environment)
    |
    +--- Table (e.g., Account)
            |
            +--- Column (e.g., Credit Limit)
\`\`\`

### 1. Global Level (Environment)
This is the master switch for auditing within a Power Platform environment.
In the **Power Platform admin center** (PPAC), the administrator must navigate to **Environment Settings** and turn on **"Start Auditing"**. If this global switch is off, no auditing occurs anywhere in that environment, regardless of other settings.

### 2. Table Level (formerly Entity)
Even if global auditing is on, you must explicitly enable it for the specific tables you care about. A **table** (formerly known as an *entity*) represents a set of records, like "Accounts" or "Contacts."
In the Dataverse Solution explorer, open the desired table (e.g., the \`Account\` table) and check the **"Enable Auditing"** box in its properties.

### 3. Column Level (formerly Attribute)
By default, if a table is audited, all its columns are audited. A **column** (formerly known as an *attribute*) represents a field within a table, like "Credit Limit" or "Last Name."
However, if you have a column that changes very frequently (e.g., a "Last Calculated Time" column updated 50 times a day by a background process or plugin), it will generate massive amounts of useless audit logs, consuming storage and potentially impacting performance.
For such columns, you must go into that specific column's properties and explicitly disable auditing for it.

## What is Audited?

When fully enabled, Dataverse tracks a comprehensive range of activities:

*   **Data Changes (CRUD):** Records **C**reate, **U**pdate, and **D**elete operations on records. For updates, it captures both the Old Value and the New Value of the changed columns.
*   **User Access:** Records when a user logs in to the Dataverse environment. Note that this tracks login events, not every individual record view or read operation.
*   **Security Role Changes:** Records if an administrator assigns or removes a security role for a user or team. This is critical for maintaining access control integrity.
*   **Sharing Operations:** Records if a user manually shares a record with another user or team, including the type of access granted.
*   **Audit Log Access:** Records when a user views the audit history for a record or accesses audit logs via the SDK.
*   **Data Export:** Records when data is exported to Excel.

## Viewing and Extracting Logs

### In the User Interface (UI)
Users with the appropriate security role (e.g., System Administrator or a custom role with audit log privileges) can easily view audit history:
1.  Open a specific record (e.g., an Account record).
2.  Navigate to the **"Related"** tab.
3.  Select **"Audit History"**.
This provides a clean, chronological timeline of every field change, who made it, when, and the old/new values.

### In Microsoft Purview (Microsoft 365 Compliance Portal)
For enterprise compliance officers and security teams who may not directly use Dynamics 365, all Dataverse audit logs are automatically forwarded to the **Microsoft Purview compliance portal**.
This integration is a powerful feature for several reasons:
*   **Centralized Auditing:** Allows security officers to search and analyze user behavior across various Microsoft 365 services (Outlook, SharePoint, Teams, Dynamics 365, etc.) from a single portal.
*   **Long-term Retention:** Purview offers advanced retention policies, allowing organizations to store audit logs for extended periods, far beyond the default Dataverse retention, to meet stringent compliance requirements.
*   **Advanced Analytics:** Purview provides tools for eDiscovery, forensic investigations, and identifying patterns of suspicious activity across the entire Microsoft ecosystem.

### Log Deletion and Storage Management
Audit logs are stored in chronological "Partitions" (often grouped by financial quarter or month). These partitions consume your Dataverse Log Storage Capacity.
When you approach or exceed your allocated Log Capacity, an administrator can use the Power Platform admin center to physically delete the oldest partition (e.g., deleting all logs from Q1 2021).
**Important:** You cannot delete individual log rows. Deletion is always at the partition level, meaning you must delete the entire partition, losing all logs within that period. This highlights the importance of monitoring capacity and leveraging Microsoft Purview for long-term archival.

## Real-world Scenarios and Design Considerations

*   **Compliance Requirements:** For industries with strict regulations (e.g., healthcare, finance), auditing is non-negotiable. Design your auditing strategy to cover all sensitive data and critical processes.
*   **Performance vs. Granularity:** While granular auditing is powerful, over-auditing can lead to increased storage costs and a slight performance overhead. Carefully select which tables and columns truly require auditing.
*   **Data Integrity Troubleshooting:** If data mysteriously changes, audit logs are your first stop. They can quickly pinpoint the user, time, and specific change, saving significant debugging time.
*   **Security Incident Response:** In case of a security breach or unauthorized access, audit logs provide crucial forensic evidence to understand the scope and impact of the incident.
*   **Scalability:** As your organization grows and data volume increases, so will your audit log volume. Plan for this by regularly monitoring log capacity and utilizing Microsoft Purview for scalable, long-term storage.

## Best Practices

*   **Audit Only What's Necessary:** Enable auditing only for tables and columns that contain sensitive data, are critical for compliance, or are frequently subject to review. Disable auditing for high-frequency, non-critical system columns.
*   **Monitor Log Capacity:** Regularly check your Dataverse Log Storage Capacity in the Power Platform admin center. Implement a strategy for managing old logs, either by deleting partitions or leveraging Purview for archival.
*   **Leverage Microsoft Purview:** For long-term retention, cross-service auditing, and advanced compliance features, integrate and utilize the Microsoft Purview compliance portal.
*   **Secure Access to Audit Logs:** Restrict who can view and delete audit logs through appropriate security roles. Audit logs themselves are sensitive data.
*   **Document Your Strategy:** Clearly document which tables and columns are audited, why, and your log retention policies.
*   **Understand Performance Impact:** While generally minimal, excessive auditing on very high-volume tables can introduce a slight performance overhead. Test and monitor.

## Common Mistakes

*   **Forgetting a Level:** A common mistake is enabling auditing at the global level but forgetting to enable it for specific tables, or vice-versa. Remember all three levels (Global, Table, Column) must be correctly configured.
*   **Over-Auditing:** Auditing every single column on every table can quickly consume storage, incur costs, and make it harder to find relevant information.
*   **Under-Auditing:** Failing to audit critical tables or columns, leading to gaps in accountability or compliance.
*   **Ignoring Log Capacity:** Not monitoring log storage can lead to older, potentially critical, audit logs being automatically deleted when capacity is reached.
*   **Confusing Native Auditing with Custom Logging:** While you can build custom logging solutions using plugins or Power Automate, Dataverse's native auditing provides a tamper-proof, system-level record that custom solutions often cannot replicate for historical data changes. Native auditing is the primary source for historical data changes.
*   **Expecting Too Much from User Access Auditing:** The "User Access" log tracks logins, not every single record a user views or reads. For detailed read tracking, custom solutions are typically required.

## Things to Remember

*   Auditing must be enabled at the **Global (Environment)**, **Table**, and **Column** levels.
*   Auditing consumes **Dataverse Log Storage Capacity** and should be disabled for high-frequency, non-critical system columns.
*   Audit logs are natively forwarded to **Microsoft Purview** for enterprise compliance, long-term retention, and cross-service auditing.
*   You free up capacity by deleting old **Audit Partitions**; individual log rows cannot be deleted.
*   It's crucial for **compliance, security, and troubleshooting**.

## Related Topics

*   [Dataverse Storage Management](link-to-dataverse-storage-page)
*   [Security Roles in Dataverse](link-to-security-roles-page)
*   [Power Platform Admin Center Overview](link-to-ppac-overview-page)
*   [Microsoft Purview Compliance Portal](link-to-purview-page)
*   [Dataverse Performance Best Practices](link-to-performance-page)
  `.trim(),
};