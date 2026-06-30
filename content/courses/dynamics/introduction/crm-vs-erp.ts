import { DocContent } from "@/types/docs";

export const crmVsErp: DocContent = {
  title: "CRM vs ERP",
  description:
    "Dynamics 365 covers two distinct families of business software: CRM and ERP. Understanding the architectural difference helps you identify your boundaries as a developer.",
  content: `
## Introduction

When you join a Dynamics 365 enterprise project, one of the first questions you must answer is: *Is this a CRM project or an ERP project?* 

The answer completely dictates which applications are deployed, what underlying database you use, and which technical programming languages are required.

## What is CRM? (Customer Relationship Management)

CRM software focuses exclusively on the **front-office**. It handles everything that involves interacting with customers, generating revenue, and delivering service.

**CRM manages:**
- Leads, prospects, and sales pipelines
- Customer accounts and contacts
- Support cases and SLAs
- Marketing campaigns

**Dynamics 365 CRM applications:**
| Application | Purpose |
|---|---|
| **Dynamics 365 Sales** | Lead and opportunity management |
| **Dynamics 365 Customer Service** | Support cases, queues, knowledge base |
| **Dynamics 365 Field Service** | Technician scheduling, work orders |

## What is ERP? (Enterprise Resource Planning)

ERP software focuses exclusively on the **back-office**. It keeps the company running through financial management, inventory, procurement, and manufacturing.

**ERP manages:**
- General ledger, accounts payable/receivable
- Inventory and warehouse operations
- Purchase orders and vendor management
- Manufacturing and production planning

**Dynamics 365 ERP applications:**
| Application | Purpose |
|---|---|
| **Dynamics 365 Finance** | Financial accounting and reporting |
| **Dynamics 365 Supply Chain** | Inventory, warehousing, procurement |
| **Dynamics 365 Business Central** | All-in-one ERP for SMBs |

## The Architectural Divide

> [!CAUTION]
> **CRM and ERP run on entirely different technical platforms.**

This is the most critical concept for a new Dynamics developer to grasp. They share the "Dynamics 365" brand name, but they share almost nothing else technically.

| Aspect | CRM | ERP (Finance & Operations) |
|---|---|---|
| **Underlying Database** | Microsoft Dataverse | F&O SQL Database |
| **UI Framework** | Model-Driven Apps | F&O Client |
| **Backend Language** | C# (Plugins) | X++ |
| **Frontend Language** | JavaScript / TypeScript | X++ |
| **Deployment Model** | Solutions (ZIP files) | Deployable Packages |

## How does it work together?

CRM and ERP are not competing systems — they are designed to work together in an integrated enterprise, passing data back and forth.

\`\`\`text
Customer interaction (CRM)
  │
  ├── Lead → Opportunity → Order   [Dynamics 365 Sales]
  │                 │
  │         (Data Integration Sync)
  │                 │
  └── Invoice → Payment tracking   [Dynamics 365 Finance]
                        │
               Inventory reduced   [Dynamics 365 Supply Chain]
\`\`\`

A full Dynamics 365 enterprise deployment uses both CRM and ERP applications together, with data flowing between them through tools like **Dual-Write** or **Azure Synapse Link**.

## Your Role as a Developer

A developer on a Dynamics project will typically specialize in either the CRM side (C# / Dataverse) or the ERP side (X++). It is extremely rare to find a developer who codes deeply in both.

**This curriculum focuses entirely on CRM and Dataverse development.**

## Things to Remember

- **CRM** = front-office (Sales, Customer Service).
- **ERP** = back-office (Finance, Supply Chain).
- CRM applications run on **Dataverse**.
- ERP applications (F&O) run on a **separate X++ technical platform**.
- The skills, tools, and certifications for CRM and ERP development are totally distinct.

## What's Next

Now that you understand the two families of applications, let's explore how the CRM side is actually built: the **Dynamics Architecture**.
  `.trim(),
};
