import { DocContent } from "@/types/docs";

export const logicApps: DocContent = {
  title: "Azure Logic Apps",
  description:
    "Discover when to graduate from Power Automate to Azure Logic Apps for complex, enterprise-grade IT integrations and B2B messaging.",
  content: `
## Introduction

You already know about Power Automate Cloud Flows. They allow citizen developers to drag and drop actions to build automated workflows.

Underneath the hood, Power Automate is actually running on the **Azure Logic Apps** engine. 
Logic Apps are the "Pro-Developer / Enterprise IT" version of Power Automate. They use the exact same visual designer and the same ecosystem of connectors, but they live in the Azure Portal rather than the Power Platform Maker Portal.

## Decision Making: Power Automate vs Logic Apps

If they use the exact same engine, when should a Solution Architect choose Logic Apps over Power Automate?

### 1. Ownership and Licensing
- **Power Automate** is often tied to a specific user's license (e.g., John Doe's premium license) and is built in the context of a Dataverse environment.
- **Logic Apps** are owned by an Azure Subscription. You pay for them purely on a consumption basis (per execution) or a dedicated pricing tier. They belong to the IT department, eliminating the risk of a flow breaking when an employee leaves the company.

### 2. Source Control (ALM)
- **Power Automate** flows are packaged inside Dataverse Solutions as complex JSON metadata. Merging them in Git is nearly impossible.
- **Logic Apps** can be written entirely in JSON (ARM Templates or Bicep) and deployed via standard Azure DevOps pipelines. This allows traditional software engineering teams to manage the integrations using the exact same CI/CD pipelines they use for their C# microservices.

### 3. Advanced B2B Integrations (EDI)
If your company integrates with massive retail partners (like Walmart or Amazon), they will require you to communicate using decades-old Electronic Data Interchange (EDI) standards, such as X12 or AS2.
- **Power Automate** cannot natively parse X12 documents.
- **Logic Apps** have a dedicated "Integration Account" feature that natively decodes, validates, and routes complex B2B EDI messages.

### 4. Monitoring and Alerting
- **Power Automate** has basic run history, but tracking failures across 1,000 different flows is difficult and requires third-party CoE (Center of Excellence) tooling.
- **Logic Apps** integrate natively with **Azure Monitor and Log Analytics**. An IT team can set up a dashboard that triggers a PagerDuty alert the second any Logic App in the entire enterprise fails.

## When to use Which?

**Use Power Automate When:**
- The workflow is built by a business user (Citizen Developer).
- The workflow requires human interaction (e.g., An Approval process sent to a manager's Teams chat).
- The workflow is tightly coupled to a specific Model-Driven App or Canvas App.

**Use Logic Apps When:**
- The workflow is a massive background data sync (e.g., moving 50,000 records a night).
- The integration requires parsing B2B EDI files.
- The IT department requires strict Azure Log Analytics monitoring.
- The deployment is managed purely via Azure Resource Manager (ARM).

## Common Mistakes

> [!WARNING]
> **Infinite Loops**
> Just like plugins, it is very easy to create an infinite loop if a Logic App updates a Dataverse record, which in turn triggers the same Logic App. Always configure **Trigger Conditions** in the Logic App settings so it only fires when specific fields change, rather than firing on every single update.

## Things to Remember

- Power Automate is built on the **Logic Apps engine**.
- Logic Apps live in the **Azure Portal** and are billed to an Azure Subscription.
- Logic Apps support advanced **B2B/EDI** messaging.
- They provide superior **Monitoring (Log Analytics)** and **Source Control (ARM)** for enterprise IT teams.

## What's Next

We have explored both Azure Functions and Logic Apps. To connect these compute engines safely to Dynamics 365 without losing data, we rely on **Azure Service Bus**.
  `.trim(),
};
