import { DocContent } from "@/types/docs";

export const marketing: DocContent = {
  title: "Dynamics 365 Marketing",
  description:
    "Dynamics 365 Marketing (Customer Insights - Journeys) helps organizations orchestrate personalized customer journeys, automate campaigns, and generate qualified leads.",
  content: `
## Introduction

Before a sales team can close a deal, they need someone to sell to. Finding prospects, nurturing their interest, and determining exactly when they are ready to buy is the function of the marketing department.

In the Dynamics 365 ecosystem, this is handled by **Dynamics 365 Marketing** (recently rebranded by Microsoft as **Dynamics 365 Customer Insights - Journeys**).

## What is it?

**Dynamics 365 Marketing** is a complex marketing orchestration application built natively on Dataverse. 

It provides tools to design graphical email campaigns, build landing pages, manage in-person and digital events, and orchestrate automated "Customer Journeys" based on how prospects interact with your brand.

## Why do we need it? (Architectural Problem)

Historically, enterprises used a separate marketing tool (like Marketo or Mailchimp) and a separate CRM (like Salesforce).

This separation caused massive architectural friction:
- **Data Sync Failures:** Syncing millions of contacts between the marketing database and the CRM database nightly is complex and prone to breaking.
- **Blind Spots:** Sales would close deals, but Marketing couldn't run reports to see which email campaign actually generated that revenue.

By building Dynamics 365 Marketing natively on Dataverse, the Marketing team and the Sales team share the exact same SQL database. When a prospect clicks a link in a marketing email, the salesperson sees that activity instantly on the contact's timeline, with zero integration required.

## Outbound vs Real-Time Marketing

Dynamics 365 Marketing has two distinct engines:

1. **Outbound Marketing (Legacy):** Relies on massive, batch-processed "Segments" (e.g., "Find all 50,000 Contacts in New York"). It processes on a schedule.
2. **Real-Time Journeys (Modern):** Relies on an **Event-Driven Architecture**. Instead of querying a segment, a journey is triggered the millisecond a specific event happens (e.g., "Customer logs into the Wi-Fi portal" or "Customer Abandons Cart"). Microsoft is heavily pushing all new development to the Real-Time engine.

## How does it work?

The core engine is the **Customer Journey**. 
Instead of just "blasting an email to everyone," marketers design a visual flowchart of how a customer interacts with the brand over time.

1. **Trigger:** A customer joins the loyalty program (Event Trigger).
2. **Journey Steps:** 
   - Send "Welcome Email".
   - Wait 3 days.
   - *Condition:* Did they click the "Download App" link?
     - If Yes: Send an SMS with a 10% discount code.
     - If No: Send Email 2 with a different subject line.
3. **Lead Scoring:** As prospects interact (opening emails, attending webinars), the system automatically assigns them points. When they reach a certain score (e.g., 100), they are deemed "Sales Ready". The system automatically generates a Lead record and routes it to the Sales team.

## Key Concepts

| Term | Definition |
|---|---|
| **Segment** | A dynamic list of contacts filtered by specific database criteria. |
| **Customer Journey** | A visual automation flow that defines what marketing actions happen and when. |
| **Lead Scoring Model** | A system that assigns points to a lead based on engagement, bridging the gap between Marketing and Sales. |
| **Event Management** | A built-in module for tracking webinars, speakers, sessions, and physical venues. |

## Best Practices

- **Align with Sales:** Marketing and Sales must agree on the mathematical definition of a "Qualified Lead" in the Lead Scoring Model. If marketing sends low-quality leads to sales, sales will simply ignore the CRM.
- **Use Real-Time Journeys:** Build all new campaigns using the event-driven Real-Time engine. Microsoft is deprecating the older Outbound engine.
- **Manage Consent:** Use the platform's built-in consent management tools to ensure strict compliance with GDPR/CCPA.

## Common Mistakes

> [!WARNING]
> **Treating it like a basic email blaster** 
> Dynamics 365 Marketing is an expensive, powerful enterprise orchestration engine. If a company only wants to send a static monthly newsletter to 500 people, a cheaper tool like Mailchimp is a far better architectural fit. Use Dynamics when you need deep CRM Dataverse integration and complex behavioral journeys.

## Things to Remember

- It was recently rebranded to **Customer Insights - Journeys**.
- It shares Dataverse with Dynamics 365 Sales, eliminating integration silos.
- The modern engine is **Event-Driven (Real-Time)**.
- **Lead Scoring** determines when a prospect is ready to be handed to Sales.

## What's Next

We have now covered the major first-party CRM applications (Sales, Customer Service, Field Service, Marketing). Next, we must understand the underlying UI framework that powers all of them: **Model-Driven Apps**.
  `.trim(),
};
