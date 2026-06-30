import { DocContent } from "@/types/docs";

export const businessCentral: DocContent = {
  title: "Business Central Overview",
  description:
    "Dynamics 365 Business Central is Microsoft's all-in-one ERP business management solution designed for small to medium-sized businesses (SMBs).",
  content: `
## Introduction

Throughout this curriculum, we focus heavily on the CRM and Power Platform side of Dynamics 365 (Sales, Customer Service, Dataverse). 

However, as a Dynamics Solution Architect, you will frequently encounter clients asking about finance, inventory, and accounting integrations. For small to mid-sized businesses (SMBs), Microsoft's answer to this is **Dynamics 365 Business Central**.

## What is it?

**Dynamics 365 Business Central** (often abbreviated as BC) is a comprehensive Enterprise Resource Planning (ERP) application. 

It is designed to manage an organization's entire backend operations, including:
- Financial management and accounting (General Ledger, Payables, Receivables)
- Supply chain management (Inventory, Purchasing, Warehousing)
- Manufacturing and assembly
- Project management

It is the cloud evolution of Microsoft's highly successful legacy on-premises ERP, **Dynamics NAV** (Navision).

## Why do we need it?

Small businesses usually start their accounting on basic software like QuickBooks. As they grow, their operations become more complex: they open multiple warehouses, start manufacturing their own goods, or operate in multiple currencies. 

Basic accounting software cannot handle this complexity. Conversely, enterprise ERP systems (like Dynamics 365 Finance & Operations or SAP) are too expensive and complex to implement for a 50-person company.

Business Central sits in the sweet spot. It provides enterprise-grade ERP capabilities tailored and priced for the SMB market.

## Architectural Reality (The Boundary)

> [!CAUTION]
> **Business Central DOES NOT run on Dataverse.**

This is the most critical architectural concept for a Dynamics CRM developer to understand. 

Business Central is built on a completely separate technical stack. 
- The backend language is **AL** (Application Language), not C#.
- The development environment is Visual Studio Code.
- It has its own proprietary database structure, its own security model, and its own API layer.

Because it does not sit natively on Dataverse, it does not magically share data with Dynamics 365 Sales or Customer Service. If a company uses both D365 Sales (CRM) and Business Central (ERP), you must explicitly configure an integration to sync data (like Accounts and Products) between the two systems.

## Example Scenario

A mid-sized furniture distributor uses Business Central.

1. They purchase 500 chairs from a manufacturer. The Purchase Order is logged in Business Central.
2. The chairs arrive at the warehouse. A worker uses a barcode scanner linked to Business Central to receive the inventory. The system updates the inventory count to 500.
3. A customer buys 10 chairs. An invoice is generated in Business Central.
4. The system automatically reduces inventory to 490 and posts the revenue to the General Ledger for the accounting team.

## Best Practices

- **Avoid heavy CRM customization in BC:** Business Central has basic CRM features (tracking contacts and opportunities). However, it is fundamentally an accounting system. If a client has complex sales processes, recommend integrating Business Central with Dynamics 365 Sales rather than trying to build a massive CRM inside the ERP.
- **Use standard integrations:** Microsoft provides out-of-the-box integration mappings between Dynamics 365 Sales and Business Central. Always use these standard data syncs (or Dataverse Virtual Tables) before attempting to write custom API integration code.

## Things to Remember

- Business Central is an **ERP** for **SMBs**.
- It handles finance, supply chain, and manufacturing.
- It **does not** run on Dataverse.
- It is customized using **AL**, not C# plugins or Power Platform tools.
- It is the cloud successor to Dynamics NAV.

## What's Next

Now that we understand the SMB ERP offering, let's look at the broader architectural divide across the entire Microsoft ecosystem: **CRM vs ERP**.
  `.trim(),
};
