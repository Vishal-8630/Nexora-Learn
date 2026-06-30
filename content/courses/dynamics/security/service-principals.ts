import { DocContent } from "@/types/docs";

export const servicePrincipals: DocContent = {
  title: "Service Principals (Client Secrets)",
  description:
    "Learn how Server-to-Server (S2S) applications authenticate securely using Service Principals, Client Secrets, and Certificates.",
  content: `
## Introduction

In the previous topic, we created an App Registration in Microsoft Entra ID. This provided us with a Client ID, which acts as the "username" for our custom application.

But a username is useless without a password. Because this is a Server-to-Server (S2S) integration, there is no human user. The application must authenticate as a **Service Principal**.

## What is a Service Principal?

Think of a Service Principal as a "Robot User Account" that lives inside Entra ID. 

When you create an App Registration, Entra ID automatically creates a corresponding Service Principal in your tenant. This Service Principal represents the application's physical identity within your specific organization.

To allow your script to log in as this Service Principal, you must provide it with a credential. There are two types of credentials you can use:

## 1. Client Secrets (The Easy Way)

A Client Secret is essentially a randomly generated string of characters that acts as a password for your application.

### Creating a Client Secret
1. Open your App Registration in the Azure Portal.
2. Navigate to **Certificates & secrets**.
3. Click **New client secret**.
4. Provide a description (e.g., "Secret for Node JS backend") and an expiration date (e.g., 12 months).

> [!WARNING]
> Entra ID will only display the Client Secret value **once** immediately after creation. If you navigate away from the page, the value is hidden forever. You must copy it and store it securely (e.g., in Azure Key Vault).

Your script will now use three pieces of information to authenticate:
- **Tenant ID**
- **Client ID**
- **Client Secret**

## 2. Certificates (The Secure Way)

While Client Secrets are common, they are fundamentally just passwords. If a developer accidentally hardcodes a Client Secret into a GitHub repository, anyone in the world can find it and authenticate as your application.

For highly sensitive enterprise integrations, Microsoft recommends using **Certificates (X.509)** instead of Client Secrets.

### How Certificates Work
1. You generate a public/private key pair (certificate) on your secure server.
2. You upload the **Public Key** (\`.cer\` file) to your App Registration in the Azure Portal.
3. Your custom script holds the **Private Key** (\`.pfx\` file).
4. When the script authenticates, it uses the Private Key to cryptographically sign its request. 

Because the Private Key never leaves your server and is never transmitted over the network, it is impossible for a hacker to intercept it or steal it from source code.

## Lifecycle Management

Service Principal credentials **expire**. 

If you create a Client Secret that expires in 12 months, your integration will work perfectly for exactly 365 days, and on day 366, your script will crash with a \`401 Unauthorized\` error.

Managing the lifecycle of Client Secrets and Certificates is a major operational challenge for enterprise IT teams. You must implement calendar reminders or automated Azure alerts to rotate these credentials before they expire.

## Things to Remember

- A **Service Principal** is the identity of your application in Entra ID.
- **Client Secrets** act as passwords (easy, but risky if leaked).
- **Certificates** act as cryptographic keys (highly secure, enterprise standard).
- Credentials **expire** and must be rotated.

## What's Next

At this point, Entra ID knows who your application is. But Dataverse still doesn't! Next, we must map this Entra ID Service Principal to a Dataverse security profile using **Application Users**.
  `.trim(),
};
