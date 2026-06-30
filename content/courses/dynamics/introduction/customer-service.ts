import { DocContent } from "@/types/docs";

export const customerService: DocContent = {
  title: "Dynamics 365 Customer Service",
  description:
    "Dynamics 365 Customer Service empowers organizations to manage support cases, enforce SLAs, and deliver consistent support across multiple channels.",
  content: `
## Introduction

Once a sale is won, the relationship with the customer doesn't end — it begins. Customers will inevitably have questions, encounter bugs, or need assistance with their purchases. 

Managing these high-volume interactions efficiently, without losing track of customer history, is the role of **Dynamics 365 Customer Service**.

## What is it?

**Dynamics 365 Customer Service** is a massive, pre-built Model-Driven App running natively on Microsoft Dataverse. It is designed specifically for customer support teams, call centers, and help desks.

It provides a centralized workspace for agents to track customer issues (Cases), manage their daily workload (Queues), reference documentation (Knowledge Articles), and ensure they are meeting their promised contractual response times (Service Level Agreements).

## Why do we need it? (Architectural Problem)

If support agents use shared email inboxes (like \\\`support@company.com\\\`) to manage customer issues, the data is completely unstructured. Several architectural problems occur:

- **Collision:** Two agents might reply to the same email simultaneously.
- **Data Silos:** An agent doesn't know what products the customer owns, because the purchase history lives in the CRM database, while the conversation lives in Exchange.
- **No Metrics:** Management cannot run SQL queries against an email inbox to measure how long it takes to resolve issues.

Dynamics 365 Customer Service solves this by converting unstructured inbound communications (emails, live chats, phone calls) into structured, transactional **Case** records linked directly to the customer's **Account** in the Dataverse database.

## How does it work?

The core architectural process revolves around **Case Management**.

1. **Ingestion:** A customer sends an email or fills out a form on a Power Pages portal. The system automatically creates a \\\`Case\\\` record.
2. **Routing:** The system evaluates the Case metadata (e.g., "Is this a billing issue or a technical issue?") and uses Automated Routing Rules to push it to the correct **Queue**.
3. **Resolution:** An agent picks the Case from the Queue, communicates with the customer via the timeline, and searches the **Knowledge Base** for answers.
4. **Closure:** The agent resolves the issue, stopping the SLA timer and marking the Case as resolved.

## Key Concepts

| Term | Definition |
|---|---|
| **Case (Incident)** | The primary transactional record representing a single customer issue or request. |
| **Queue** | A holding container for work. Cases wait in a queue until an agent picks them up. |
| **SLA (Service Level Agreement)** | A strict timer enforcing response and resolution metrics (e.g., "First response within 4 hours"). |
| **Entitlement** | A contract defining how much support a customer is legally allowed (e.g., "10 phone calls per month"). |
| **Omnichannel** | An advanced add-on that routes live web chats, SMS, and WhatsApp messages into the same unified agent interface. |

## Example Scenario

An electronics company uses Dynamics 365 Customer Service:

1. A customer buys a TV and creates an account. (This creates a **Contact** in Dataverse).
2. The TV won't turn on. The customer emails \\\`support@electronics.com\\\`.
3. Dynamics 365 intercepts the email and creates a **Case** linked to that Contact.
4. Because the customer bought a premium TV, the **SLA** timer starts, requiring a 1-hour response.
5. The Case drops into the "Hardware Support" **Queue**.
6. An agent grabs the Case, searches the **Knowledge Base** for "TV won't turn on", and emails the troubleshooting steps back to the customer directly from Dynamics 365.

## Best Practices

- **Automate Routing:** Do not rely on humans to manually assign cases. Use Routing Rules to automatically send cases to the right queues based on keywords, customer tier, or product type.
- **Enforce Entitlements:** Many companies fail to configure Entitlements and end up providing unlimited free support to customers who haven't paid for a support contract. Use Entitlements to automatically decrement support hours.

## Things to Remember

- Customer Service is centered around structured **Case** management.
- **Queues** manage the distribution of workload.
- **SLAs** enforce contractual response and resolution times.
- Because it shares Dataverse with Dynamics 365 Sales, agents have full real-time visibility into the customer's purchase history.

## What's Next

Customer Service handles issues remotely from a desk. But what happens when you need to send a human being in a truck to a physical location to fix a broken machine? Next, we explore **Dynamics 365 Field Service**.
  `.trim(),
};
