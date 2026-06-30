import { DocContent } from "@/types/docs";

export const powerAutomateOverview: DocContent = {
  title: "Power Automate (Overview)",
  description:
    "Explore advanced Power Automate concepts in Dynamics 365, serving as an enterprise orchestration engine to replace legacy asynchronous workflows.",
  content: `
## Introduction

In Phase 2, we introduced Power Automate as the workflow engine of the Power Platform. 

As a Dynamics 365 developer, you will move beyond simple "send an email when a record is created" flows. You will use Power Automate as an enterprise orchestration engine to replace legacy asynchronous workflow processes and integrate Dataverse with external APIs.

## The Dataverse Connector

When building Cloud Flows for Dynamics 365, always use the **Microsoft Dataverse connector**, not the legacy "Dynamics 365" connector.

The Dataverse connector provides advanced capabilities:
- **Trigger Filtering:** Just like Plugin registration, you can specify exactly which columns must change to trigger the flow. If you don't do this, the flow fires on every update, causing massive API throttling.
- **Run As:** You can define if the flow runs as the user who triggered it, or as the Process Owner (Admin).
- **Relate/Unrelate Rows:** You can explicitly associate or disassociate N:N relationships without writing code.

## Bound and Unbound Actions

In Dataverse, you can define **Custom APIs** and **Actions**. Power Automate can trigger these directly.

- **Bound Actions:** These are actions tied to a specific table. 
  - *Example:* You have a C# plugin bound to a custom \`QualifyLead\` action on the Lead table. Power Automate can call "Perform a Bound Action", pass the Lead GUID, and trigger your C# code.
- **Unbound Actions:** These are global actions not tied to a specific record. 
  - *Example:* Triggering a global \`RecalculateTaxes\` script that processes the entire database.

## Calling External APIs (HTTP)

While C# Plugins can make HTTP calls, they are limited by a strict 2-minute timeout and sandbox restrictions. 

If you need to integrate with a slow external ERP system (which might take 5 minutes to process an order), you should **never** use a Plugin. Instead:
1. Trigger a Power Automate flow when the Order is approved.
2. Use the premium **HTTP** action to send a REST payload to the ERP.
3. Power Automate can wait patiently for the response (even waiting for days using Webhooks) without blocking Dataverse.

## Error Handling (Try/Catch)

Enterprise flows must have error handling. If an HTTP call fails, the flow shouldn't just crash silently.

You can simulate a \`Try/Catch\` block in Power Automate by using **Scopes**. You configure the "Catch" scope to only run if the "Try" scope has failed or timed out.

## Child Flows

If you have a complex block of logic that needs to run in 5 different flows, do not copy and paste the actions.
Create a **Child Flow** (a flow triggered manually). Have your 5 parent flows use the "Run a Child Flow" action to create reusable, modular code blocks.

## Best Practices

- **Use Environment Variables:** Never hardcode external API URLs or SharePoint site addresses in a flow. Store them in Dataverse Environment Variables so they dynamically change when you migrate the flow from Dev to Prod.
- **Limit Concurrency:** If a flow triggers on "Account Updated" and updates a related system, and someone bulk-imports 100,000 accounts, 100,000 flow instances will queue up, severely throttling your environment. Use concurrency controls to limit how many flows run simultaneously.
- **Use Service Principals:** Do not build critical production flows using your personal user account. Use an Application User (Service Principal) for production connections.

## Things to Remember

- Use the **Dataverse Connector**.
- Use **Filter Attributes** on triggers to save API calls.
- Use the **HTTP** action for slow external integrations instead of C# Plugins.

## What's Next

In this section, we will dive deep into every aspect of Power Automate for enterprise development, starting with the different types of flows.
  `.trim(),
};
