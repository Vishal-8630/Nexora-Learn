import { DocContent } from "@/types/docs";

export const restore: DocContent = {
  title: "Dataverse Environment Restore Operations",
  description:
    "Understand the critical rules, capacity requirements, and data loss implications when restoring a Dataverse environment from a backup. Learn when and how to use this powerful disaster recovery tool.",
  content: `
## Introduction

Restoring a Dataverse environment is a highly destructive action that should be used with extreme caution. It completely wipes out the current database of the target environment and replaces it entirely with data from a selected backup. This process is irreversible for the data that existed in the target environment prior to the restore.

Administrators initiate restore operations from the Power Platform Admin Center (PPAC). Understanding the strict rules and implications is crucial to prevent accidental, catastrophic data loss and ensure successful recovery.

## What is a Dataverse Environment Backup?

Microsoft Dataverse automatically performs daily backups of all environments. These backups are stored securely in Azure and are retained for a specific period:
*   **7 days** for environments without Dynamics 365 apps.
*   **28 days** for environments that include Dynamics 365 apps (e.g., Sales, Customer Service).

These automatic backups are the source material for any restore operation. You cannot manually trigger a backup, but you can restore from any available point within the retention window.

## When to Use a Restore Operation

Restore operations are powerful tools for specific scenarios, primarily focused on disaster recovery and environment management:

*   **Data Corruption:** When an environment's data becomes corrupted due to accidental bulk deletions, incorrect data imports, or malicious activity.
*   **Accidental Deletion:** To recover from the accidental deletion of critical records or configurations that cannot be easily undone.
*   **System Malfunction:** If an environment becomes unstable or unusable due to a recent change or update, and reverting to a previous state is the only viable solution.
*   **Debugging Production Issues:** To create a replica of a production environment in a sandbox for developers to safely investigate and debug issues using real-world data without impacting live users.
*   **UAT/Staging Environment Refresh:** To refresh a User Acceptance Testing (UAT) or staging environment with the latest production data for testing new features or solutions.

## When to AVOID a Restore Operation

While powerful, a restore operation is a blunt instrument and should be avoided for minor issues due to its significant data loss implications:

*   **Minor Data Corrections:** For correcting a few incorrect records, use standard Dataverse update operations, Power Automate flows, or data import/export tools.
*   **Individual Record Recovery:** If only a few records were accidentally deleted, consider using Dataverse auditing features (if enabled) to identify and re-create them, or use a targeted data export/import.
*   **Solution Deployment Rollback:** If a solution deployment caused issues, consider importing an earlier version of the solution or applying a patch, rather than a full environment restore.
*   **Regular Data Migration:** Restores are not a substitute for robust data migration strategies.

## Types of Restore Operations

Dataverse offers two primary methods for restoring an environment, each with distinct rules and use cases:

### 1. Point-in-Time Restore (to the Same Environment)

*   **Purpose:** Reverts an existing environment (Production, Sandbox, or Developer) to an earlier state within its backup retention period. This is the most common form of disaster recovery for an environment that has become corrupted or experienced significant data loss.
*   **Target:** The *same* environment that the backup originated from. The environment's URL and properties remain unchanged.
*   **Process:**
    1.  Navigate to the Power Platform Admin Center.
    2.  Select the environment you wish to restore.
    3.  Choose "Restore" and then "Point-in-time restore."
    4.  Select the desired date and time for the restore point.
*   **Key Rules:**
    *   Can be performed on **Production, Sandbox, or Developer** environments.
    *   The environment's type **does not** need to be changed.
    *   Restores the environment to a specific point within its backup retention window (7 or 28 days).

### 2. Standard Restore (to a Different Environment)

*   **Purpose:** Creates a new environment or overwrites an existing *non-production* environment with a backup from another environment. This is useful for debugging production issues in a safe sandbox, or for creating a UAT environment with recent production data.
*   **Target:** A *different* existing environment, which **must** be of type **Sandbox** or **Developer**. You cannot restore a backup from one environment directly into an existing *Production* environment.
*   **Process:**
    1.  Navigate to the Power Platform Admin Center.
    2.  Select the source environment whose backup you want to use.
    3.  Choose "Restore" and then "Restore to a new environment" or "Restore to an existing environment."
    4.  If restoring to an existing environment, select a target Sandbox or Developer environment.
*   **Key Rules:**
    *   The target environment **must** be a **Sandbox** or **Developer** environment.
    *   The target environment must be in the exact same geographic region as the backup.
    *   The target environment must be on the exact same or newer release version of Dynamics 365 as the backup.

#### Text Diagram: Restore Scenarios

\`\`\`
Scenario 1: Point-in-Time Restore (Disaster Recovery for an Environment)

[Production Env A] -- (Corrupted Data) --> [Production Env A]
       ^                                         |
       |                                         v
       ------------------------------------------------
       Restore to Point-in-Time (e.g., 2 hours ago)


Scenario 2: Standard Restore (Debugging/Testing with Production Data)

[Production Env A] -- (Backup) --> [Backup of Production Env A]
                                          |
                                          v
                                 [Sandbox Env B] -- (Overwritten with Production Data)
\`\`\`

## Target Environment Requirements & Considerations

Regardless of the restore type, the target environment and your tenant must meet specific criteria:

1.  **Capacity:** The total size of the backup being restored must fit within your tenant's available Dataverse database capacity. Additionally, a minimum of **1 GB of *free* database capacity** is typically required as a buffer, even when overwriting an existing environment. This ensures the restore process has sufficient resources.
2.  **Region:** The target environment must be in the exact same geographic region (e.g., 'North America', 'Europe') as the backup. Cross-region restores are not supported.
3.  **Versions:** The target environment must be on the exact same or a newer release version of Dynamics 365 as the backup. Restoring an older backup to a newer environment is generally supported, but restoring a newer backup to an older environment is not.

## What is Lost During a Restore?

Administrators must clearly communicate the irreversible data loss implications to business stakeholders before initiating a restore:

1.  **The Delta Data:** Any data created, updated, or deleted by users, integrations, or automated processes *after* the selected backup point will be permanently lost. This is your **Recovery Point Objective (RPO)** – the maximum acceptable amount of data loss measured in time. For example, if you restore to an 8:00 AM backup, and it's currently 10:00 AM, two hours of changes are vaporized.
2.  **Audit Logs:** All audit logs generated *after* the selected backup point are wiped out during a restore. This can impact compliance and historical tracking.
3.  **Power Automate Flows:** Because flows often interact with external systems (like sending emails via Office 365 or updating external databases), Microsoft automatically turns **OFF** all Power Automate flows in the restored environment to prevent unintended actions. The administrator must manually review and re-enable them.
4.  **Customizations and Solutions:** Any solutions or customizations deployed *after* the selected backup point will be lost. This includes new entities, fields, forms, views, and business rules.
5.  **External System Integrations:** Data pushed from external systems into Dataverse *after* the backup point will be lost. Similarly, any data pushed *from* Dataverse to external systems *after* the backup point might be out of sync after the restore.

## Best Practices for Restore Operations

Experienced Dynamics developers and administrators follow these best practices:

*   **Communicate Clearly:** Always inform stakeholders about the exact restore point and the expected data loss. Get explicit approval before proceeding.
*   **Document RPO/RTO:** Understand and document your organization's Recovery Point Objective (RPO - acceptable data loss) and Recovery Time Objective (RTO - acceptable downtime) for critical environments.
*   **Test Regularly:** Periodically perform test restores of a production backup into a sandbox environment. This validates the process, confirms backup integrity, and familiarizes the team with the steps.
*   **Review Power Automate Flows:** After a restore, meticulously review all Power Automate flows. Re-enable them only after confirming they will not cause unintended side effects with the restored data.
*   **Consider Alternatives:** Before resorting to a full environment restore, explore less destructive options like targeted data imports, auditing, or solution rollbacks for specific issues.
*   **Security and Permissions:** Ensure that only authorized personnel with the necessary security roles (e.g., Power Platform Service Admin, Dynamics 365 Admin) have permissions to perform restore operations.
*   **Pre-Restore Data Export:** For highly critical data, consider performing a targeted data export (e.g., using Data Export Service or Azure Synapse Link) immediately before a restore, if possible, to minimize potential data loss.

## Common Mistakes

Beginners and even intermediate developers often make these mistakes:

*   **Underestimating Data Loss:** Not fully grasping the extent of data loss (delta data, audit logs, recent customizations) and failing to communicate it effectively.
*   **Forgetting About Power Automate Flows:** Neglecting to review and re-enable flows, leading to missed automations or, worse, unintended actions if flows are re-enabled without proper validation.
*   **Insufficient Capacity:** Attempting a restore without checking the tenant's available database capacity, leading to failed operations.
*   **Incorrect Target Environment Type:** Trying to restore a backup into a Production environment when a Standard Restore requires a Sandbox or Developer target.
*   **Ignoring Region/Version Mismatch:** Attempting to restore across different geographical regions or incompatible Dataverse versions.
*   **Not Testing the Process:** Assuming a restore will work perfectly without ever having practiced it, leading to panic and delays during an actual incident.

## Things to Remember

*   **Destructive Action:** A restore completely overwrites the target environment's database.
*   **Two Types:** Point-in-Time (same environment) and Standard (to Sandbox/Developer).
*   **Data Loss:** Delta data, audit logs, and recent customizations are permanently lost.
*   **Flows Off:** All Power Automate flows are automatically turned off post-restore.
*   **Capacity:** Requires sufficient tenant database capacity + 1GB buffer.
*   **Region/Version Match:** Target environment must match the backup's region and be on the same or newer version.
*   **Production Target:** You cannot restore a backup from *another* environment directly into an existing Production environment (Standard Restore). Point-in-Time restores *can* be done on Production.
*   **Irreversible:** Once initiated, the restore cannot be undone.

## Related Topics

*   **Power Platform Admin Center Overview:** Learn more about managing environments and other administrative tasks.
*   **Dataverse Environment Management:** Understand different environment types and their purposes.
*   **Dataverse Auditing:** Explore how to track changes to data and user access for compliance and recovery.
*   **Data Export and Import:** Discover alternative methods for moving and managing data within Dataverse.
*   **Power Automate Flow Management:** Learn how to manage and troubleshoot flows, especially after environment changes.
*   **Azure Synapse Link for Dataverse:** Understand how to export Dataverse data to Azure Synapse Analytics for advanced analytics and long-term data retention.
  `.trim(),
};