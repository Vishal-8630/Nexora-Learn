import { DocContent } from "@/types/docs";

export const monitoring: DocContent = {
  title: "Monitoring & Diagnostics for Power Platform Dataverse",
  description:
    "Learn how to monitor Power Platform Dataverse environments using PPAC Analytics dashboards and Azure Application Insights. Understand API throttling, plugin performance, and set up proactive alerts for system health and operational excellence.",
  content: `
## Introduction

"The system is slow."
This is the most common and unhelpful complaint an administrator receives. Without proper monitoring, you have no idea if the database is overloaded, if a specific C# plugin is failing, or if the user just has a bad home Wi-Fi connection.

**Monitoring and diagnostics** are crucial for maintaining the health, performance, and reliability of your Power Platform Dataverse environments. They provide the visibility needed to proactively identify issues, troubleshoot problems, and ensure your applications meet user expectations and service level agreements (SLAs).

The **Power Platform Admin Center (PPAC)** provides built-in Analytics dashboards, offering a high-level overview. For deeper, code-level insights and real-time alerting, you integrate with **Azure Application Insights**.

## PPAC Analytics Dashboards: Your First Line of Defense

In the left navigation of the PPAC, under **Analytics -> Dataverse**, administrators have access to rich Power BI dashboards that monitor the tenant. These dashboards are your initial go-to for understanding overall environment health and identifying trends.

### 1. Active Users & Adoption
This dashboard tracks how many users log in daily, what browsers they use, and which custom apps they are interacting with the most.
*   **Real-world Use:** Critical for measuring the Return on Investment (ROI) of a new Dynamics 365 or Power Apps deployment, identifying underutilized applications, and understanding user engagement patterns.

### 2. API Statistics
This dashboard monitors every single **Dataverse Web API** call made against the environment. It's vital for understanding system load and identifying potential **API throttling** issues. Dataverse environments have API request limits to ensure fair usage and maintain service stability. Exceeding these limits can lead to performance degradation or errors.

*   **Top API Users:** Identifies which users, applications, or integration accounts are making the most API calls.
    *   **Real-world Use:** If an external integration script, a Power Automate flow, or a custom application is looping out of control and making excessive requests, you will see it here. This helps pinpoint the source of high API consumption and potential throttling.
*   **API Pass/Fail Rate:** Shows the success and failure rates of API calls.
    *   **Real-world Use:** If a C# plugin is throwing a \`NullReferenceException\` every time a user saves a Case record, or if an integration is sending malformed data, you will see a massive spike in API Failures, indicating a systemic issue.

### 3. Plugin Dashboards
This is the most critical dashboard for developers and administrators concerned with server-side business logic performance. It tracks the exact Execution Time of every registered C# plugin.

*   **Real-world Use:** If the "Calculate Quote" plugin usually takes 100ms, but suddenly spikes to 9,000ms after a weekend deployment, the administrator can instantly flag the developer team to investigate the recent code changes. This helps in quickly identifying performance regressions introduced by new code.

## Azure Application Insights: Deep Telemetry and Proactive Alerting

While the PPAC Analytics are excellent for high-level overviews and trend analysis, they don't provide the deep, code-level stack traces or real-time alerting capabilities required for enterprise-grade troubleshooting and proactive monitoring.

For true enterprise telemetry, you can link your Dataverse environment directly to **Azure Application Insights**. Application Insights is an extensible Application Performance Management (APM) service that monitors live applications.

Once linked, Dataverse will continuously stream detailed telemetry data to Azure. This data includes:
*   **Requests:** Information about incoming HTTP requests to your application.
*   **Dependencies:** Calls made from your application to other services (e.g., Dataverse Web API calls made by plugins).
*   **Exceptions:** Unhandled exceptions and errors occurring in your code (e.g., plugin failures).
*   **Performance Counters:** System performance metrics.
*   **Custom Events & Metrics:** Data you explicitly log from your custom code (e.g., specific business process steps, custom timers).

### How Dataverse Telemetry Flows to Application Insights

\`\`\`
+-------------------+       +---------------------+       +-------------------------+
| Dataverse         |       | Azure Event Hubs    |       | Azure Application       |
| Environment       | ----> | (Internal to Azure) | ----> | Insights Workspace      |
| (Plugins, Web API)|       |                     |       | (Logs, Metrics, Alerts) |
+-------------------+       +---------------------+       +-------------------------+
\`\`\`

### Key Capabilities with Application Insights:

*   **Advanced Querying with KQL:** You can write complex **KQL (Kusto Query Language)** queries to filter, aggregate, and analyze your telemetry data.
    *   **Example KQL Query (Find failed plugin executions):**
        \`\`\`kusto
        exceptions
        | where customDimensions.Category == "Plugin"
        | where customDimensions.OperationName contains "Execute"
        | project timestamp, customDimensions.PluginName, customDimensions.Message, customDimensions.StackTrace
        | order by timestamp desc
        \`\`\`
    *   **Real-world Use:** Pinpoint the exact line of code where a plugin failed, identify specific error messages, or find all slow API calls for a particular user.
*   **End-to-End Transaction Tracing:** Trace a slow page load from the user's browser (if integrated with client-side monitoring), through the network, down to the exact Dataverse Web API calls and C# plugin executions, and back. This helps visualize the entire request flow and identify bottlenecks across different components.
*   **Azure Monitor Alerts:** Set up proactive alerts based on your telemetry data.
    *   **Real-world Use:** "If the API failure rate exceeds 5% in 5 minutes, send a text message to the IT On-Call engineer." or "If a specific plugin's average execution time exceeds 5 seconds for more than 10 minutes, create a critical incident."
*   **Dashboards and Workbooks:** Create custom dashboards and interactive workbooks to visualize key metrics and share insights with your team.

### Design Considerations for Application Insights

*   **Cost:** Application Insights incurs costs based on data ingestion volume and retention. Plan your logging strategy carefully to balance detail with cost efficiency.
*   **Data Retention:** Configure appropriate data retention policies based on your compliance and troubleshooting needs.
*   **Security:** Control access to your Application Insights workspace using Azure Role-Based Access Control (RBAC) to ensure only authorized personnel can view sensitive telemetry.

## Best Practices for Monitoring & Diagnostics

1.  **Proactive Monitoring:** Don't wait for users to report issues. Set up alerts for critical metrics (e.g., high API failure rates, slow plugin execution, throttling events) to be notified before users are impacted.
2.  **Define Key Performance Indicators (KPIs):** Identify what "healthy" looks like for your environment. Monitor user adoption, critical business process execution times, and API success rates.
3.  **Leverage Custom Telemetry:** For complex business logic in C# plugins or custom integrations, log specific business events, critical variable values, and custom timers to Application Insights. This provides deeper context for troubleshooting.
4.  **Regular Review of Dashboards:** Periodically review PPAC Analytics and custom Application Insights dashboards to identify trends, potential bottlenecks, and areas for optimization.
5.  **Capacity Planning:** Use API statistics and performance trends to anticipate future resource needs and plan for scalability, especially before major deployments or peak usage periods.
6.  **Understand Throttling Limits:** Be aware of Dataverse API request limits and design your integrations and custom code to handle throttling gracefully (e.g., using retry logic with exponential backoff).

## Common Mistakes

1.  **Ignoring Throttling:** Not monitoring API usage can lead to unexpected performance degradation or service unavailability when limits are hit.
2.  **Only Reactive Monitoring:** Waiting for users to complain before investigating issues. Proactive alerts are essential.
3.  **Over-logging:** Sending excessive custom telemetry to Application Insights without a clear purpose can increase costs and make it harder to find relevant information.
4.  **Not Differentiating Tools:** Trying to perform deep code debugging using only PPAC Analytics, or using Application Insights for simple user adoption metrics that PPAC already provides.
5.  **Inadequate KQL Skills:** Not investing time to learn KQL limits your ability to extract valuable insights from Application Insights data.
6.  **Lack of Alert Configuration:** Having Application Insights but not setting up meaningful alerts means you're still reacting to problems, not preventing them.

## Things to Remember

*   **PPAC Dataverse Analytics** provides high-level insights into API usage, user adoption, and plugin execution times. It's your first stop for overall health checks.
*   **API Statistics** in PPAC is crucial for identifying high API consumers and potential **throttling** issues.
*   **Azure Application Insights** offers deep, code-level telemetry, advanced KQL querying, end-to-end tracing, and proactive **Azure Monitor Alerts** for enterprise-grade monitoring.
*   Consider the **cost implications** and **data retention** when configuring Application Insights.
*   **Proactive monitoring** and **custom telemetry** are key best practices for robust Power Platform solutions.

## What's Next

Monitoring tells you *how* the system is performing. But when it comes to compliance, security, and accountability, you need to know *who* changed the data and *what* they changed. Next, we cover **Audit Logs**.

## Related Topics

*   [Power Platform Admin Center Overview](/docs/power-platform-admin-center)
*   [Dataverse Web API](/docs/dataverse-web-api)
*   [C# Plugins in Dataverse](/docs/csharp-plugins)
*   [Power Automate Best Practices](/docs/power-automate-best-practices)
*   [Azure Monitor Documentation](https://learn.microsoft.com/azure/azure-monitor/)
  `.trim(),
};