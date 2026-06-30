import { DocContent } from "@/types/docs";

export const backup: DocContent = {
  title: "Dataverse Backup Strategies",
  description:
    "Learn about Microsoft's automated Dataverse backups and how administrators can create manual backups for critical operations. Understand their purpose, limitations, and best practices for robust data protection in the Power Platform.",
  content: `
## Introduction

Dataverse is the foundational database for Microsoft Power Apps, Power Automate, and Dynamics 365 applications. As a Software as a Service (SaaS) platform, Microsoft manages the underlying infrastructure, including the SQL Servers that host your Dataverse environments. This means you do not have direct access to tools like SQL Server Management Studio to perform database operations such as running a \`BACKUP DATABASE\` command.

Instead, all backup and restore operations for Dataverse environments are managed exclusively through the Power Platform Admin Center (PPAC). Understanding these strategies is crucial for maintaining data integrity and ensuring business continuity.

## Automated System Backups

Microsoft automatically performs continuous backups of all Dataverse environments. These automated backups are a core component of Microsoft's service reliability and disaster recovery strategy, providing a baseline for data protection.

*   **Retention Period:**
    *   **28 days** for Production environments that have Dynamics 365 applications installed.
    *   **7 days** for Sandbox environments and Production environments without Dynamics 365 applications.
*   **No Performance Impact:** These backups are handled efficiently at the Azure Storage snapshot layer. This block-level snapshot technology operates in the background, ensuring that backup processes do not degrade the performance of your active Dataverse environment.
*   **No Configuration Required:** Automated backups cannot be disabled or configured by administrators. They are an inherent part of the Dataverse service.

While these automated backups are vital for Microsoft's internal recovery processes, they are generally not intended for specific, user-initiated operational recovery scenarios. For those situations, manual backups become essential.

## Manual Backups

Automated system backups are excellent for general disaster recovery, but administrators often need to capture a specific, known point-in-time snapshot of an environment. This is particularly important before making significant changes.

**Real-world Scenario:**
Imagine your team is about to deploy a major Managed Solution to a Production environment, or you're performing a large-scale data migration. If the deployment or migration introduces unforeseen data corruption or system instability, relying solely on automated backups might mean sifting through many snapshots to find the exact moment *before* the change. This can be time-consuming and risky.

**Solution:**
Before any critical operation, an administrator should log into the Power Platform Admin Center (PPAC) and create a **Manual Backup**. This provides a clear, named recovery point.

**Steps to Create a Manual Backup:**
1.  Navigate to the Power Platform Admin Center (admin.powerplatform.microsoft.com).
2.  In the left navigation pane, select **Environments**.
3.  Select the specific environment you wish to back up.
4.  In the environment details pane, click **Backups** from the top menu.
5.  Click **Create Manual Backup**.
6.  Provide a descriptive name for the backup (e.g., "Pre-Release 1.4 Deployment," "Before Major Data Import," "Pre-Upgrade Snapshot").

**Retention Period:** Manual backups adhere to the same retention policies as automated backups: up to 28 days for Production environments with Dynamics 365 apps, and 7 days for other environment types.

## Backup Limitations

Architects and developers must be aware of several critical limitations when planning their Dataverse data management and disaster recovery strategies:

1.  **No Direct Download:** You cannot download a physical \`.bak\` file or any other database backup file to your local computer. Dataverse backups remain encrypted within Microsoft's Azure tenant.
    *   **Implication:** This prevents scenarios like restoring a production backup to a local development environment or using external tools for data analysis directly on the backup file. For data export needs, consider alternatives like Azure Synapse Link for Dataverse or the Data Export Service.
2.  **Audit Logs Are Excluded:** Dataverse backups **do not include audit logs**. If you restore an environment from a backup, all historical audit data (records of who changed what, when, and where) from the point of the backup to the present will be permanently lost.
    *   **Implication:** This is a significant consideration for compliance, security, and troubleshooting. If audit data is critical for your organization, you must implement a separate strategy for archiving or exporting audit logs regularly.
    *   **What *is* included?** Backups include all data, metadata (customizations, schema), security roles, and environment settings.
3.  **No Cross-Region Restore:** You cannot restore a backup of an environment into an environment hosted in a different Azure region. For example, a backup from an environment in the "United States" region cannot be restored to an environment in the "Europe" region.
    *   **Implication:** This is crucial for organizations with multi-geo deployments or specific disaster recovery requirements that involve cross-regional failover. Your disaster recovery plan must account for regional boundaries.
4.  **Environment-Level Restore Only:** Dataverse backups are full environment backups. You cannot restore individual records, tables, or specific customizations. A restore operation replaces the entire target environment with the data from the selected backup.
    *   **Implication:** If you only need to recover a few deleted records, restoring an entire environment is often overkill and can lead to data loss for changes made after the backup point. Consider alternative strategies for granular data recovery, such as custom data export/import tools or third-party solutions.

## Best Practices

Experienced Dynamics 365 and Power Platform developers follow these best practices to ensure robust data protection:

*   **Always Take a Manual Backup Before Major Changes:** This is the golden rule. Before deploying significant solutions, running bulk data imports/updates, or making critical configuration changes, create a manual backup.
*   **Use Descriptive Backup Names:** Clearly label your manual backups with details like the date, purpose, and solution version (e.g., "2023-10-27_Pre_Solution_v1.5_Deployment"). This makes it easy to identify the correct recovery point if needed.
*   **Regularly Test Restore Processes (in Sandbox):** Don't wait for a disaster to discover issues with your restore process. Periodically restore a production backup to a sandbox environment to verify the integrity of the backup and familiarize your team with the procedure.
*   **Understand Audit Log Implications:** If audit logs are critical for compliance or business processes, implement a separate strategy to export them regularly (e.g., using Azure Synapse Link for Dataverse or custom integrations) to an external storage solution.
*   **Complement with Data Export Strategies:** For scenarios requiring granular data recovery, offline analysis, or long-term archiving, consider using Azure Synapse Link for Dataverse or custom data export solutions to extract specific data outside of the Dataverse backup system.
*   **Document Your Recovery Plan:** Have a clear, documented plan for what to do in case of data loss or environment corruption, including who is responsible, the steps to take, and communication protocols.

## Common Mistakes

Beginners and even intermediate developers often make these mistakes regarding Dataverse backups:

*   **Forgetting Manual Backups:** The most common mistake is not taking a manual backup before a critical deployment or data operation, leading to difficult recovery scenarios if something goes wrong.
*   **Misunderstanding Audit Log Exclusion:** Assuming audit logs are part of the backup, only to discover their absence during a critical compliance or troubleshooting event after a restore.
*   **Assuming Granular Recovery:** Believing that backups can be used to restore individual records or specific components, leading to frustration when realizing only full environment restores are possible.
*   **Not Testing Restore Procedures:** Never having performed a test restore, which can lead to panic and errors when a real disaster strikes.
*   **Relying Solely on Automated Backups for Operational Recovery:** While automated backups are great for Microsoft's disaster recovery, they might not align with your specific RTO/RPO (Recovery Time Objective/Recovery Point Objective) for operational incidents.

## Things to Remember

*   **Automated Backups:** Continuous, managed by Microsoft, retained for 28 days (Production with D365) or 7 days (Sandbox/Production without D365). Primarily for Microsoft's service recovery.
*   **Manual Backups:** User-initiated, critical for specific point-in-time recovery before major changes, retained for 28/7 days.
*   **Key Limitations:** Cannot download backup files, audit logs are NOT included, no cross-region restore, and only full environment restores are supported.
*   **Best Practice:** Always create a descriptive manual backup before any significant deployment or data operation.

## Related Topics

*   [Dataverse Environment Restore Process](/docs/dataverse-environment-restore-process)
*   [Dataverse Auditing](/docs/dataverse-auditing)
*   [Azure Synapse Link for Dataverse](/docs/azure-synapse-link-for-dataverse)
*   [Power Platform Admin Center Overview](/docs/power-platform-admin-center-overview)
  `.trim(),
};