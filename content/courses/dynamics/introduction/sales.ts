import { DocContent } from "@/types/docs";

export const sales: DocContent = {
  title: "Dynamics 365 Sales",
  description:
    "Dynamics 365 Sales is Microsoft's premier Customer Relationship Management (CRM) application, providing a centralized architectural flow to track leads, forecast revenue, and guide deals.",
  content: `
## Introduction

In any enterprise, generating revenue is the top priority. The process of finding potential customers, convincing them to buy, and closing the deal is called the sales lifecycle. Managing this process efficiently at a global scale requires a dedicated, structured system. 

In the Microsoft ecosystem, that system is **Dynamics 365 Sales**.

## What is it?

**Dynamics 365 Sales** is Microsoft’s flagship Customer Relationship Management (CRM) application. 

It is a massive Model-Driven App built natively on Microsoft Dataverse. It provides sales professionals with a centralized platform to track potential customers, manage communications (emails/calls), forecast revenue, and guide deals from the first contact all the way to a signed contract.

## Why do we need it? (Architectural Problem)

Without a unified CRM, sales teams usually rely on fragmented systems: spreadsheets on desktops, sticky notes, and scattered emails in Exchange. This creates several major architectural and business problems:

- **Lost Revenue:** Salespeople forget to follow up with leads, causing deals to fall through.
- **Zero Visibility:** Sales managers cannot run reports or predict how much revenue the company will make this quarter because the data is trapped in local Excel files.
- **Knowledge Silos:** If a top salesperson leaves the company, all their relationship history and deal data leave with them.

Dynamics 365 Sales solves this by providing a **Single Source of Truth**. Every email, phone call, meeting, and proposal is stored in Dataverse and tracked against the customer record, ensuring the entire organization has full visibility into the pipeline.

## How does it work?

Because Dynamics 365 Sales is a Model-Driven App, it works by utilizing standard Dataverse tables to represent the strict stages of the sales lifecycle. 

The core flow of the application follows the standard sales funnel:

1. **Lead:** A potential, unverified customer shows interest (e.g., they filled out a website form).
2. **Qualify:** The salesperson contacts the lead to ensure they have the budget and authority to buy. If they do, the salesperson clicks "Qualify".
3. **Opportunity:** Qualifying a Lead automatically triggers a Dataverse transaction that creates an **Account** (the company), a **Contact** (the person), and an **Opportunity** (the active deal). The Opportunity is where the revenue is actively tracked.
4. **Quote:** A formal price proposal is generated from the product catalog and sent to the customer.
5. **Order/Invoice:** The customer agrees to the quote, the deal is Won, and an invoice is generated.

This strict progression is guided visually by a **Business Process Flow (BPF)**, a visual wizard at the top of the screen that enforces the company's specific sales methodology.

## Key Concepts

| Term | Definition |
|---|---|
| **Lead** | A raw, unqualified prospect who might be interested in your product. |
| **Account** | A company or organization you do business with (B2B). |
| **Contact** | An individual person you communicate with. |
| **Opportunity** | A qualified, active deal that has a high probability of closing. This is the core table where revenue is forecasted. |
| **Business Process Flow (BPF)** | The visual ribbon at the top of a record that guides users through required stages (e.g., Qualify -> Develop -> Propose -> Close). |
| **Pipeline** | The total expected revenue of all active Opportunities currently being worked on by the sales team. |

## Best Practices

- **Use the Standard Tables:** As an architect, you must *always* use the out-of-the-box tables (\\\`Lead\\\`, \\\`Opportunity\\\`, \\\`Account\\\`, \\\`Contact\\\`) for the sales process. Do not create custom tables to replace these, as you will permanently break out-of-the-box integrations, dashboards, and AI features like Copilot.
- **Keep it simple:** Do not overwhelm salespeople with 50 mandatory fields on a form. If the system is too hard to use, user adoption will fail, and salespeople will revert to using spreadsheets.
- **Leverage integrations:** Connect Dynamics 365 Sales with Microsoft Outlook and Teams so salespeople can track emails and collaborate without leaving their primary workspace.

## Common Mistakes

> [!WARNING]
> **Skipping the Lead stage** 
> Many organizations try to skip the \\\`Lead\\\` table entirely and instruct salespeople to immediately create \\\`Accounts\\\` and \\\`Contacts\\\` for everyone they meet. This clutters the master Dataverse database with junk data (fake names, dead-end prospects). Use Leads for unverified prospects, and only create Accounts for qualified, legitimate businesses.

## Things to Remember

- Dynamics 365 Sales is a **Model-Driven App** running on **Dataverse**.
- The core architectural flow is **Lead → Opportunity → Quote → Order**.
- **Opportunities** track active deals and revenue forecasts.
- Visual **Business Process Flows** enforce the sales methodology.

## What's Next

Now that we understand how revenue is generated, we will look at how companies support those customers after the sale is complete. The next topic is **Dynamics 365 Customer Service**.
  `.trim(),
};
