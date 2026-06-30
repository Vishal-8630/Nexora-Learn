import { DocContent } from "@/types/docs";

export const overview: DocContent = {
  title: "Power Platform Overview",
  description:
    "An introduction to Microsoft Power Platform — the low-code/no-code suite that serves as the foundation and customization layer for Dynamics 365 CRM applications.",
  content: `
## Introduction

Dynamics 365 CRM applications (Sales, Customer Service, Field Service) are not standalone products built from scratch. They are built on top of a broader, underlying platform called the **Microsoft Power Platform**.

To be a successful Dynamics 365 developer, you must first understand the Power Platform. It is the toolkit you will use to customize Dynamics 365, automate its processes, and build new applications.

## What is it?

**Microsoft Power Platform** is a suite of low-code/no-code development tools designed to let organizations build applications, automate workflows, and analyze data quickly.

It consists of five primary products:

1. **Power Apps** — for building custom applications (web and mobile)
2. **Power Automate** — for automating business processes and integrating systems
3. **Power BI** — for analyzing data and creating interactive dashboards
4. **Power Pages** — for building secure, external-facing websites
5. **Power Virtual Agents** (now Microsoft Copilot Studio) — for building intelligent chatbots

Beneath these products lies the data layer that connects everything: **Microsoft Dataverse**.

## Why do we need it?

Historically, if a business wanted a custom application to manage a unique process, they had two choices:
1. Buy expensive off-the-shelf software and try to bend their business to fit it.
2. Hire developers to write a custom application from scratch, which was slow and expensive to maintain.

The Power Platform provides a third option: **low-code development**.

It provides pre-built components, drag-and-drop designers, and simplified logic (Power Fx) so that custom applications and automations can be built in days or weeks, rather than months or years.

## The Dynamics 365 Connection

This is the most critical concept for Dynamics 365 developers to understand:

**Dynamics 365 CRM applications are just very large, complex Power Apps.**

- When you open Dynamics 365 Sales, you are opening a **Model-Driven Power App**.
- The tables storing your Sales data (Accounts, Leads, Opportunities) live in **Dataverse**.
- When you create a workflow in Dynamics 365, you use **Power Automate**.

Therefore, when you "customize Dynamics 365", you are actually using Power Platform tools to modify the underlying app and database.

## Key Concepts

| Term | Meaning |
|---|---|
| **Low-Code** | Development that minimizes hand-coding by using visual interfaces and pre-built components |
| **Maker** | Microsoft's term for someone who builds solutions on the Power Platform (developer or power user) |
| **Power Fx** | The Excel-like formula language used across the Power Platform |
| **Connector** | A pre-built wrapper around an API that allows Power Platform to talk to external services (e.g., SharePoint, Twitter, Salesforce) |

## Example

A manufacturing company uses Dynamics 365 Sales to manage their sales pipeline, but they also have a custom requirement: they need a mobile app for their factory floor workers to report equipment defects.

Instead of hiring mobile developers to build an iOS/Android app from scratch, they use the Power Platform:

1. They create a "Defect" table in **Dataverse** to store the reports.
2. They use **Power Apps** to build a mobile-friendly Canvas App where workers can snap a photo of the defect and submit it.
3. They use **Power Automate** to trigger an email to the maintenance manager whenever a high-severity defect is logged.
4. Because the data is in Dataverse, the Sales team can see which customers might have delayed orders due to the broken equipment, directly inside their Dynamics 365 Sales app.

Everything is connected, secure, and built rapidly.

## Best Practices

- **Governance first** — Because the Power Platform makes it easy for non-developers to build apps, organizations must set up governance (environments, security policies) early to prevent chaos.
- **Use the right tool** — Don't force a Canvas App when a Model-Driven App is better suited, and don't write a C# plugin if a simple Power Automate flow can do the job.
- **ALM (Application Lifecycle Management)** — Always use Solutions to move Power Platform customizations from Development to Test to Production.

## Common Mistakes

> [!WARNING]
> **Ignoring Licensing** — Power Platform has its own complex licensing model separate from Dynamics 365. Building an app that requires premium connectors without checking if users have the right licenses is a common and expensive mistake.

- **Treating it like traditional code** — Developers coming from C# or Java sometimes try to bypass the low-code tools and write code for everything. Embrace the platform's out-of-the-box capabilities first.

## Things to Remember

- Dynamics 365 CRM apps are built *on* the Power Platform.
- The Power Platform is a low-code/no-code suite (Power Apps, Automate, BI, Pages).
- Dataverse is the shared database beneath it all.
- Customizing Dynamics 365 means using Power Platform tools.

## Related Topics

- [Dynamics Architecture](/docs/introduction/dynamics-architecture) — see where Power Platform fits in the tech stack
- [Power Apps](/docs/power-platform/power-apps) — dive deeper into the app building tools
- [Dataverse Tables](/docs/dataverse/tables) — the foundation of Power Platform data

## What's Next

Now that you understand the overall suite, let's look closer at **Power Apps**, the tool used to build the user interfaces for Dynamics 365 and custom business applications.
  `.trim(),
};
