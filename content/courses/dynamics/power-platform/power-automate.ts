import { DocContent } from "@/types/docs";

export const powerAutomate: DocContent = {
  title: "Power Automate",
  description:
    "Power Automate is the workflow engine for the Power Platform. It allows you to automate repetitive business processes and integrate Dynamics 365 with external services.",
  content: `
## Introduction

Modern business processes rarely happen in a single system. A deal closing in Dynamics 365 might require sending an email through Exchange, posting a message in Microsoft Teams, generating a PDF, and saving it to SharePoint.

To handle these multi-system processes, the Power Platform provides **Power Automate** (formerly known as Microsoft Flow).

## What is it?

**Power Automate** is a cloud-based service that allows makers and developers to create automated workflows between their favorite apps and services to synchronize files, get notifications, collect data, and more.

It uses a visual, drag-and-drop designer. Workflows in Power Automate are simply called **Flows**.

## Why do we need it?

In the past, integrating systems required custom code. A developer had to write an Azure Function or a C# plugin, handle authentication, parse APIs, and manage error handling just to send a notification when a record changed in Dynamics 365.

Power Automate replaces this custom code with **Connectors**.

Connectors are pre-built API wrappers. Power Automate provides over 1,000 out-of-the-box connectors (Office 365, SharePoint, Salesforce, Twitter, Jira, SQL Server). This means you can build complex integrations visually in minutes, without writing any integration code.

## How does it work?

Every Flow consists of two main parts:

1. **Trigger** — the event that starts the flow.
2. **Actions** — the steps the flow performs after it starts.

### Types of Triggers

- **Automated (Event-driven)**: Starts automatically when a specific event happens (e.g., "When a row is added to a Dataverse table", "When an email arrives").
- **Instant (Manual)**: Starts when a user clicks a button (e.g., a button inside a Power App, or a command bar button in Dynamics 365).
- **Scheduled**: Starts at a specific time (e.g., "Run every morning at 8:00 AM").

### Control Logic

Between actions, you can add logic using Power Automate's control structures:
- **Conditions** (If/Else)
- **Apply to each** (Loops)
- **Do until**
- **Switch** statements

## Power Automate and Dynamics 365

For Dynamics 365 developers, Power Automate is the primary tool for asynchronous business logic.

When working with Dynamics 365, you will almost always use the **Microsoft Dataverse connector**.

Common Dynamics 365 use cases:
- Sending a customized email via Outlook when an Opportunity is marked as "Won".
- Running a scheduled overnight job to update the status of expired Quotes.
- Triggering an approval process in Microsoft Teams when a high-value Lead is created.
- Pulling data from a legacy SQL database into Dataverse tables on a schedule.

## Example

An organization wants an approval process for discounts on sales quotes in Dynamics 365.

Instead of writing a custom C# plugin, a developer creates a Flow:

1. **Trigger:** When a \`Quote\` row is updated in Dataverse, and the \`Discount %\` column is greater than 20%.
2. **Action 1:** Get the manager of the user who created the quote (using the Office 365 Users connector).
3. **Action 2:** Start an Approval process. This automatically sends an interactive message to the manager in Microsoft Teams.
4. **Condition:** If the manager clicks "Approve":
   - **Action 3a:** Update the Quote status in Dataverse to "Approved".
5. **Condition:** If the manager clicks "Reject":
   - **Action 3b:** Update the Quote status to "Rejected" and send an email to the salesperson.

This entire process requires zero code.

## Best Practices

- **Use service accounts** — For automated production flows, the connections (e.g., the Dataverse connection) should run under a dedicated service account, not a specific user's personal account. If the user leaves the company, the flow will break.
- **Error handling** — Use the "Configure run after" setting on actions to catch failures. For critical flows, add steps to email an administrator if an action fails.
- **Keep it simple** — Power Automate is great for orchestration, but terrible for heavy data processing. Do not loop through 10,000 records in a flow; use a plugin, Azure Function, or Dataflow instead.

## Common Mistakes

> [!WARNING]
> **Infinite Loops** — A common mistake is creating a flow that triggers when a record is updated, and then the flow itself updates that same record, causing the flow to trigger again endlessly. Always use "Trigger Conditions" or select specific columns to prevent this.

## Things to Remember

- Power Automate is the workflow and integration engine for the Power Platform.
- It uses Triggers to start and Actions to execute steps.
- It connects to external systems using pre-built Connectors.
- For Dynamics 365, use the Microsoft Dataverse connector.
- It replaces many traditional asynchronous C# plugins and custom integration services.

## Related Topics

- [Power Platform Overview](/docs/power-platform/overview) — how Automate fits into the suite
- [What is a Plugin](/docs/plugins/what-is-plugin) — compare Power Automate against C# plugins for business logic
- [Azure Integration](/docs/azure-integration/overview) — when to step up from Power Automate to Azure Logic Apps

## What's Next

We have covered internal apps (Power Apps) and internal automation (Power Automate). Next, we will look at how to securely expose Dynamics 365 data to external customers and partners using **Power Pages**.
  `.trim(),
};
