import { DocContent } from "@/types/docs";

export const whatIsDynamics365: DocContent = {
  title: "What is Dynamics 365?",
  description:
    "Microsoft Dynamics 365 is a suite of cloud-based business applications that helps organizations manage sales, customer service, finance, operations, and more — all in one connected platform.",
  content: `
## Introduction

A common misconception is that Microsoft Dynamics 365 is a single piece of software. It is not. 

Dynamics 365 is a massive suite of cloud-based business applications, each designed for a specific area of a business. They all share the same underlying data platform, which means information flows freely between them without complex, fragile manual integrations.

## What is it?

**Microsoft Dynamics 365** is split into two primary categories of applications:

### 1. Customer Engagement (CRM)
These applications focus on front-office interactions with customers. They are built on **Microsoft Dataverse**.
- **Dynamics 365 Sales** — manages leads, opportunities, and sales pipelines.
- **Dynamics 365 Customer Service** — handles support cases, queues, and SLAs.
- **Dynamics 365 Field Service** — schedules technicians and manages work orders on the road.
- **Dynamics 365 Marketing** — runs campaigns, customer journeys, and tracks engagement.

### 2. Finance and Operations (ERP)
These applications focus on back-office logistics and accounting. They are built on a different underlying architecture (formerly Dynamics AX).
- **Dynamics 365 Finance** — manages accounting, budgets, and financial reporting.
- **Dynamics 365 Supply Chain Management** — handles inventory, warehouses, and procurement.

## Why do we need it?

Before unified platforms like Dynamics 365, enterprises ran separate "siloed" software for every department.

This caused severe architectural problems:
- **Data Duplication:** A customer's address exists in the Sales system and the Billing system. If it changes in one, the other is out of sync.
- **Blind Spots:** Customer Service agents couldn't see that a customer was in the middle of negotiating a million-dollar deal with Sales, leading to poor customer interactions.
- **Reporting Nightmares:** Generating a company-wide report required exporting data from 5 different databases into Excel and manually merging it.
- **Maintenance Debt:** Each system had its own unique maintenance costs, server requirements, and upgrade cycles.

Dynamics 365 solves this by putting all front-office data into one connected platform (Dataverse), hosted securely in the Microsoft Azure cloud.

## Where is it used?

Dynamics 365 is used by organizations of all sizes — from growing mid-sized businesses to global enterprises across retail, financial services, manufacturing, healthcare, and the public sector.

## How does it work? (Architecture)

Dynamics 365 is a true SaaS (Software as a Service). It is hosted entirely in **Microsoft Azure**. Users access it through a web browser — nothing is installed locally.

The platform is structured in distinct architectural layers:

\`\`\`text
┌──────────────────────────────────────────┐
│           User Interface                 │
│    Model-Driven Apps, Canvas Apps        │
├──────────────────────────────────────────┤
│           Business Logic                 │
│   Plugins, Flows, Business Rules, JS     │
├──────────────────────────────────────────┤
│           Data (Dataverse)               │
│   Tables, Columns, Relationships, API    │
├──────────────────────────────────────────┤
│           Infrastructure (Azure)         │
│   Compute, Storage, Identity, CDN        │
└──────────────────────────────────────────┘
\`\`\`

Each layer has a specific responsibility. As a developer, you work primarily in the **business logic** and **data** layers.

## Example Scenario

A software company runs Dynamics 365 across their customer lifecycle:

1. A prospect fills out a form on the website. Dynamics 365 **Marketing** captures it and automatically creates a Lead record in Dataverse.
2. A salesperson uses Dynamics 365 **Sales** to convert the Lead to an **Opportunity** and tracks the deal value.
3. The deal closes. The system triggers an integration to Dynamics 365 **Finance** to generate an invoice.
4. The customer raises a technical issue. Dynamics 365 **Customer Service** creates a Case and assigns it to a support agent, who can instantly see the entire sales history.
5. Management opens a **Power BI** dashboard and sees a live view of the sales pipeline, open cases, and revenue — all querying the exact same Dataverse database in real-time.

No duplicated data. No manual data transfer between systems.

## Things to Remember

- Dynamics 365 is a **suite of applications**, not a single product.
- All CRM applications share **Dataverse** as the single source of truth for data.
- It runs entirely in the cloud — no local installation required.
- You can extend it heavily with **Power Platform** tools and traditional development (JavaScript, C#).

## What's Next

Now that we know what Dynamics 365 is, let's explore the fundamental difference between its two main application suites: **CRM vs ERP**.
  `.trim(),
};
