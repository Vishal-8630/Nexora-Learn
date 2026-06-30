import { DocContent } from "@/types/docs";

export const webhooks: DocContent = {
  title: "Webhooks",
  description:
    "Learn how to use Webhooks to send lightweight JSON payloads from Dataverse to external REST APIs whenever records are created, updated, or deleted.",
  content: `
## Introduction

A **Webhook** is an industry-standard HTTP pattern. It allows one system to send a real-time, event-driven HTTP POST request to another system exactly when an event occurs.

In the Azure Integration phase, we discussed Azure Service Bus and Event Grid. Those are heavy, robust, enterprise-grade Azure infrastructure services. But what if you just need to send a simple JSON payload to a 3rd-party SaaS app (like a Slack channel or a custom Node.js microservice) without engineering an entire Azure Service Bus architecture?

Dataverse supports native, point-to-point **Webhooks**.

## Decision Making: Webhooks vs Service Bus

When choosing how to push data out of Dataverse based on an event (like an Account being created), architects must choose between a Webhook and a Service Bus.

- **Use Webhooks for:** Non-critical notifications, rapid prototyping, and communicating with systems that you do not own (like a 3rd party SaaS API).
- **Use Service Bus for:** Enterprise-critical data (like pushing an Invoice to an ERP). Service Bus provides guaranteed delivery, queuing, and dead-lettering. Webhooks do not.

## Registering a Webhook

You do not write C# code to create a Webhook in Dataverse. You configure it using the **Plugin Registration Tool (PRT)**.

1. Open the PRT and connect to your environment.
2. Click **Register -> Register New Webhook**.
3. Provide the **Endpoint URL** (e.g., \\\`https://api.contoso.com/webhook/crm\\\`).
4. Select the Authentication type (HttpHeader, WebhookKey, or HttpQueryString).
5. Register the Webhook.

## Triggering the Webhook

Registering the Webhook just tells Dataverse the URL exists. You must now tell Dataverse *when* to invoke it.

Just like a C# Plugin, you register a **Step** against the Webhook in the PRT.
- **Message:** Create
- **Primary Entity:** Account
- **Execution Mode:** Asynchronous (Highly Recommended)

When a user creates an Account in Dynamics 365, Dataverse serializes the entire backend execution context (the same context passed to Plugins) into a massive JSON object and sends an HTTP POST request to your URL.

## The Webhook Payload Complexity

The JSON payload sent by Dataverse is enormous, containing metadata about the transaction, the user, and the data. The core data you actually care about is buried deep inside the \\\`InputParameters\\\` array.

\`\`\`json
{
  "BusinessUnitId": "11111111-1111-1111-1111-111111111111",
  "MessageName": "Create",
  "PrimaryEntityName": "account",
  "PrimaryEntityId": "44444444-4444-4444-4444-444444444444",
  "InputParameters": [
    {
      "key": "Target",
      "value": {
        "Attributes": [
          {
            "key": "name",
            "value": "Sample Account"
          }
        ]
      }
    }
  ]
}
\`\`\`
*Architectural Note: Your external receiving server must be programmed to parse this complex, nested Dataverse-specific JSON array structure to extract simple values like the "Sample Account" string.*

## Synchronous vs Asynchronous Execution

You can register a Webhook Step to run Synchronously or Asynchronously.

### Synchronous Webhooks (Blocking)
If you register the Webhook to run Synchronously (e.g., Pre-Operation stage), Dataverse will send the HTTP POST and *wait* for your external server to respond.
If your external server returns an HTTP \\\`400 Bad Request\\\` or takes longer than 2 minutes to respond, Dataverse will abort the transaction, roll back the database, and display an error to the user in Dynamics 365. 
*(Use this only if the external system MUST validate the data before saving).*

### Asynchronous Webhooks (Fire and Forget)
If you register the Webhook Asynchronously, Dataverse drops the HTTP POST job into a background queue and instantly returns control to the user.

> [!CAUTION]
> **No Guaranteed Delivery**
> If your external server is offline and returns a \\\`503 Service Unavailable\\\`, Dataverse will retry the asynchronous Webhook a few times with exponential backoff. However, if it continues to fail, Dataverse will permanently abandon the job and **the payload will be lost forever**. This is why Service Bus is preferred for critical enterprise transactions.

## Things to Remember

- Webhooks send the **RemoteExecutionContext as JSON** via HTTP POST directly to an endpoint.
- Register them using the **Plugin Registration Tool**.
- Synchronous Webhooks can **block or cancel** a Dataverse transaction if the external API fails.
- Asynchronous Webhooks **do not guarantee delivery**. Use Service Bus for critical data.

## What's Next

We have covered the modern REST and HTTP integration patterns. However, you must also understand the legacy integration protocol that powers all internal C# plugin logic: **SOAP and the Organization Service**.
  `.trim(),
};
