import { DocContent } from "@/types/docs";

export const integrationOverview: DocContent = {
  title: "Integration & Querying Overview",
  description:
    "An introduction to how Dataverse communicates with the outside world, from legacy SOAP endpoints to modern REST APIs and query languages.",
  content: `
## Introduction

An enterprise CRM system is useless if its data is trapped in a silo. Dynamics 365 and Dataverse provide a rich suite of APIs, Query Languages, and Integration endpoints to ensure data flows seamlessly across the enterprise ecosystem.

In the Azure phase, we covered Azure Service Bus and Event Grid, which focus on heavy, asynchronous enterprise middleware. 

In this phase, we look closer at the direct data layer. How do you construct the exact query to pull 10,000 accounts? How do you push a lightweight JSON payload from Dataverse to a 3rd-party webhook? How do you expose a proprietary external API to a low-code citizen developer?

## Architectural Perspective: Data In vs Data Out

Integrations generally fall into two categories, and you must select the right tool for the direction of data flow:

### 1. Data In (Inbound to Dataverse)
External systems (like a Node.js web app, a mobile app, or an on-premise ERP) need to read or write data inside Dataverse.
- **REST APIs (Web API):** The modern, universal standard for querying and writing data from external systems.
- **OData:** The underlying protocol that powers the REST API's filtering, shaping, and pagination.
- **FetchXML:** Microsoft's proprietary XML query language used for complex SQL-like joins and server-side aggregations.
- **SOAP (Organization Service):** The legacy, XML-based standard still heavily used for *internal* C# plugins.

### 2. Data Out (Outbound from Dataverse)
Dataverse needs to notify an external system that something happened, or Dataverse needs to fetch data from an external system.
- **Webhooks:** A lightweight mechanism for Dataverse to HTTP POST a JSON payload directly to an external URL when a record changes.
- **Custom Connectors:** Wrapping an external REST API so that internal low-code tools (Power Automate and Power Apps) can talk to it natively.

## The Evolution of the API (Real-World Context)

Understanding the history of the Dataverse API is critical for solution architects, because you will frequently encounter legacy code that you must maintain or modernize.

1. **Pre-2016 (SOAP/WCF):** The only way to talk to Dynamics CRM was using the SOAP-based Organization Service (\\\`Organization.svc\\\`). It required complex XML envelopes and was exceptionally difficult to use from modern web frameworks like React, Node.js, or Angular.
2. **2016 - Present (REST/OData v4):** Microsoft introduced the **Web API** (\\\`api/data/v9.2\\\`). It uses standard HTTP verbs (GET, POST, PATCH, DELETE) and standard JSON payloads, making it universally accessible from any modern programming language via simple HTTPS requests.

> [!NOTE]
> While the REST Web API is the architectural standard for external integrations, the older SOAP Organization Service remains the absolute standard when writing internal C# Plugins executing inside the Dataverse Sandbox.

## Things to Remember

- **Inbound Integrations** use the Web API, OData, and FetchXML.
- **Outbound Integrations** use Webhooks and Custom Connectors.
- **REST/JSON** is the modern standard for external applications.
- **SOAP/XML** is still heavily used for internal C# plugins.

## What's Next

Let's dive into the modern standard for extracting and inserting data into Dataverse: the **REST API (Web API)**.
  `.trim(),
};
