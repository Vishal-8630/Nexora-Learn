import { DocContent } from "@/types/docs";

export const customConnectors: DocContent = {
  title: "Custom Connectors",
  description:
    "Learn how to wrap external REST APIs into Custom Connectors, enabling low-code makers to interact with proprietary enterprise systems natively.",
  content: `
## Introduction

Power Automate and Power Apps natively ship with over 1,000 standard connectors (e.g., SharePoint, Outlook, Salesforce, Twitter). 

But what if your company has a proprietary, legacy in-house ERP system with a custom REST API? There is no standard connector for "Contoso Internal ERP".

If a citizen developer wants to build a Canvas App that talks to this ERP, they would have to learn how to write complex HTTP requests, handle OAuth headers, and parse JSON responses natively in Power Fx. This completely defeats the purpose of a low-code platform and creates massive security risks.

The architectural solution is to build a **Custom Connector**.

## What is a Custom Connector?

A Custom Connector is essentially a low-code wrapper around an existing REST API. 

It defines the API's endpoints (URLs), the authentication methods required (Tokens), and the strict schema structure of the JSON request/response payloads.

Once a pro-developer creates the Custom Connector and publishes it to the environment, it appears in Power Automate and Power Apps exactly like a standard out-of-the-box connector. Citizen developers can drag and drop actions (e.g., "Create ERP Invoice") into their flows, and the connector handles all the JSON/HTTP complexity behind the scenes.

## Building a Custom Connector

Custom Connectors are created inside Dataverse Solutions, meaning they fully participate in standard ALM deployments.

### The OpenAPI (Swagger) File
The fastest and most robust way to build a Custom Connector is to import an **OpenAPI (Swagger)** \`.json\` or \`.yaml\` file. If your backend ERP developers built their REST API using modern standards (like ASP.NET Core with Swashbuckle), they can hand you a Swagger file. 

You import this file, and Dataverse automatically generates all the Actions, Triggers, and parameters for the Connector in seconds. 

*(If you do not have a Swagger file, you can manually build the connector using the visual UI by pasting sample JSON requests and responses, or importing a Postman Collection).*

## Authentication (Real-World Perspective)

When configuring the Custom Connector, you must define how it authenticates with the external API.

- **No Authentication:** Never use this for enterprise data.
- **Basic Authentication:** Username and Password. (Legacy, avoid if possible).
- **API Key:** A static string passed in the header. (Acceptable, but keys must be rotated).
- **OAuth 2.0:** (The Enterprise Standard). You configure the connector to authenticate against Microsoft Entra ID. This allows the connector to pass the *logged-in user's identity* through to the backend API, enabling strict row-level security on the backend.

## Advanced: Custom Code in Connectors

Sometimes, the external API requires data in a very strange format, or it returns data in a deeply nested array that Power Automate struggles to parse.

Custom Connectors support **C# Code interception**. 
You can write small snippets of C# code (directly in the browser) that intercept the HTTP request *before* it leaves the connector, or intercept the HTTP response *before* it reaches Power Automate. 

This allows pro-developers to transform ugly JSON payloads, flatten arrays, or inject special cryptographic headers on the fly, keeping the experience perfectly clean for the low-code maker.

## Azure API Management (APIM)

> [!TIP]
> **The APIM Shortcut**
> If your organization already uses **Azure API Management (APIM)** to govern all internal APIs, you do not need to build Custom Connectors manually. In the Azure Portal, you can right-click an API inside APIM and select **"Export to Power Platform"**. Azure will automatically generate a Custom Connector and push it directly into your Dataverse environment.

## Things to Remember

- Custom Connectors wrap external **REST APIs** for secure, easy low-code usage.
- They are built using **OpenAPI (Swagger)** definitions.
- They belong inside **Solutions** for proper ALM deployment.
- You can write **C# Code** inside them to transform payloads on the fly.
- They can be automatically exported from **Azure API Management**.

## What's Next

Congratulations! You have completed the Integration phase. You now know how to pull data via REST, OData, and FetchXML, and push data via Webhooks and Custom Connectors. Let's move on to **Advanced Topics**.
  `.trim(),
};
