import { DocContent } from "@/types/docs";

export const eventGrid: DocContent = {
  title: "Azure Event Grid",
  description:
    "Understand how Event Grid enables massive-scale, lightweight event routing for reactive architectures in Dynamics 365.",
  content: `
## Introduction

While Azure Service Bus is designed for high-value, enterprise messaging (like Financial Invoices that require guaranteed ordering and deep transaction control), **Azure Event Grid** is designed for high-volume, lightweight event broadcasting.

Event Grid answers the question: *"Did something happen?"*

## Decision Making: Event Grid vs Service Bus

Understanding the difference is critical for Azure architects:

- **Service Bus (Message Broker):** Transmits *Messages*. A message contains the raw data (e.g., The entire 5MB JSON payload of a new Account record). The receiver explicitly pulls the message when it has available capacity. Use this when you cannot afford to lose a single transaction.
- **Event Grid (Event Router):** Transmits *Events*. An event is a tiny, lightweight notification that simply says, "Account 123 was updated." It does not contain the massive 5MB payload. The receiver is actively pushed the notification, and if it cares, it makes an API call back to Dynamics to fetch the actual data. Use this for reactive, UI-driven updates or massive broadcasting.

## Reactive Architecture

Event Grid pushes events to subscribers in near real-time. It can handle millions of events per second at a very low cost.

You can configure Dataverse to publish events natively to Azure Event Grid using the Plugin Registration Tool (Service Endpoints).

\`\`\`text
Dataverse (Account Updated)
        │
Event Grid Topic
     ┌──┴──┐
     ▼     ▼
  Azure   Logic
Function   App
\`\`\`

## The Filtering Power

The true power of Event Grid lies in its **Filtering Engine**.

Imagine Dataverse broadcasts an event every time *any* record is created in the entire database. That is millions of events per day.
You have a specific Azure Function that only cares when a "High Priority Support Ticket" is created for the "Contoso" account.

If you route everything to a Service Bus, your Azure Function wakes up millions of times, reads the JSON, realizes it's the wrong record, and discards it. This wastes massive amounts of Azure compute budget.

Instead, you configure an **Event Grid Filter**. 
Event Grid will intercept the firehose of events, apply the filter at the Azure infrastructure layer, and only trigger your Azure Function for the exact 5 events that match the criteria. The routing costs pennies compared to compute costs.

## Real-world Perspective: Webhook Validation

> [!WARNING]
> If you configure Event Grid to trigger an external HTTP Webhook (like a 3rd party API), Event Grid requires a validation handshake. 
> Before Event Grid starts sending traffic to the URL, it sends a validation code. The external API must echo that code back. If the 3rd party system does not support this specific Azure handshake, you cannot use Event Grid directly; you must use an Azure Function as a middleman.

## Things to Remember

- Event Grid routes lightweight **Events**, not heavy Messages.
- It enables **Reactive**, push-based architectures.
- It can handle **millions of events per second**.
- **Filters** allow you to trigger specific functions based on precise event criteria, saving compute costs.

## What's Next

Now that we can route events and execute code, where do we securely store the API keys required to talk to external systems? We use **Azure Key Vault**.
  `.trim(),
};
