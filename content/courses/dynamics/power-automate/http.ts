import { DocContent } from "@/types/docs";

export const http: DocContent = {
  title: "HTTP & Webhooks",
  description:
    "Learn how to use the premium HTTP action in Power Automate to integrate Dataverse with any external REST API, and how to receive data via Webhooks.",
  content: `
## Introduction

Power Automate has over 1,000 pre-built connectors (e.g., SharePoint, Salesforce, Twitter). But what if your company uses a proprietary, internal ERP system, or a niche third-party service that doesn't have a Microsoft connector?

As long as that system has a REST API, you can integrate it with Dataverse using the premium **HTTP** connector.

## The HTTP Action (Outbound)

If you want Dataverse to send data *to* an external system (e.g., an Account is created, so you want to push that Account to the ERP), you use the HTTP action.

### Configuration
- **Method:** Choose the HTTP verb (GET, POST, PUT, PATCH, DELETE).
- **URI:** The endpoint URL of the external API.
- **Headers:** Define your content type (e.g., \`Content-Type: application/json\`).
- **Body:** The actual JSON payload. You can mix raw JSON with Dynamic Content from previous Dataverse steps.
  \`\`\`json
  {
      "customerName": "@{triggerOutputs()?['body/name']}",
      "accountNumber": "@{triggerOutputs()?['body/accountnumber']}"
  }
  \`\`\`
- **Authentication:** Power Automate natively supports Basic Auth, Client Certificates, Active Directory OAuth, and Raw API Keys. Do not put passwords in plain text in the headers; use the Authentication section.

### Handling the Response
When the HTTP action fires, it waits for the external API to reply. You can then use the **Parse JSON** action to interpret the response. 
- You provide a sample JSON payload of what the ERP returns, and Power Automate automatically generates Dynamic Content tokens for every variable in that response (e.g., the new ERP ID), allowing you to easily write that ID back into Dataverse.

## The HTTP Trigger (Inbound / Webhook)

What if you want the external system to push data *into* Dataverse? (e.g., When an invoice is paid in Stripe, update the Opportunity in CRM).

You use the **"When a HTTP request is received"** trigger.

1. When you save the flow for the first time, Power Automate generates a highly secure, unique, public URL.
2. You provide a sample JSON schema of what Stripe will be sending.
3. You give this URL to Stripe (or your external system) and configure it as a Webhook destination.
4. When Stripe sends a POST request to this URL, the flow instantly triggers, parses the JSON payload into Dynamic Content, and allows you to use a Dataverse connector to update the CRM record.

## Security Considerations

Because the HTTP trigger generates a public URL, anyone on the internet who has that URL can trigger your flow. 

**Securing Inbound Webhooks:**
- **Trigger Conditions:** Add a condition that checks a specific header (e.g., \`x-api-key\`) against a secret value stored in Azure Key Vault. If the header doesn't match, the flow fails immediately.
- **OAuth Providers:** For enterprise scenarios, you can configure the HTTP trigger to require Azure AD authentication, ensuring only authenticated service principals can call the endpoint.

## Why HTTP in Flow instead of C# Plugins?

As discussed in the Architecture best practices:
1. **Timeouts:** A C# Plugin crashes if an HTTP call takes longer than 2 minutes. The Power Automate HTTP action can comfortably wait much longer, and can handle complex retry policies (e.g., if the ERP is offline, retry 4 times over the next 2 hours).
2. **Maintenance:** Updating a JSON payload in Power Automate takes 10 seconds. Updating a JSON string in C# requires recompiling and deploying a DLL.
3. **Throttling:** Power Automate handles API throttling limits gracefully, whereas synchronous plugins will simply crash the user's browser session.

## Things to Remember

- The **HTTP Action** sends data *out* to any REST API.
- The **HTTP Trigger** receives data *in* via a secure webhook URL.
- Use **Parse JSON** to turn raw API responses into usable variables.
- Always implement security layers on inbound webhooks.

## What's Next

When building raw JSON payloads for the HTTP action, you often need to format dates or calculate numbers dynamically. Next, we will cover the language that powers this logic: **Expressions**.
  `.trim(),
};
