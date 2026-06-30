import { DocContent } from "@/types/docs";

export const azureEntraId: DocContent = {
  title: "Microsoft Entra ID",
  description:
    "Learn the role of Microsoft Entra ID (formerly Azure Active Directory) as the central identity provider for Dynamics 365 and Dataverse.",
  content: `
## Introduction

**Microsoft Entra ID** (which was known as Azure Active Directory or Azure AD until 2023) is Microsoft's cloud-based identity and access management service. 

It is the absolute backbone of Dynamics 365. You cannot have a Dataverse environment without an underlying Entra ID tenant. Every user who logs into Dynamics 365 must have an identity in Entra ID.

## The Tenant Architecture

When a company signs up for Microsoft 365 (e.g., Contoso Corporation), a single **Entra ID Tenant** is created (\`contoso.onmicrosoft.com\`).

Inside this tenant, the IT department manages:
- **Users:** John, Jane, and the CEO.
- **Groups:** "Sales Team", "IT Admins".
- **Enterprise Applications:** 3rd party apps that are allowed to access company data.

Your Dataverse environments (Dev, QA, Prod) exist *underneath* this tenant. When John tries to log into Dataverse, Dataverse asks the Entra ID tenant, "Does John exist, is his password correct, and did he pass Multi-Factor Authentication?"

## App Registrations

If you are building a custom C# application, a Python script, or a Node.js backend that needs to query the Dataverse Web API, you must introduce your application to Entra ID. 

You do this by creating an **App Registration** in the Azure Portal.

### The Process:
1. Navigate to the **Azure Portal** (portal.azure.com).
2. Open **Microsoft Entra ID**.
3. Click **App Registrations -> New Registration**.
4. Give your app a name (e.g., "Nightly Sync Script").
5. Choose the supported account types (Usually "Accounts in this organizational directory only").

### The Output:
When you create an App Registration, Entra ID generates two critical pieces of information:
- **Application (client) ID:** A GUID that uniquely identifies your custom application.
- **Directory (tenant) ID:** A GUID that uniquely identifies the Contoso organization.

Your custom script will need both of these GUIDs to authenticate.

## API Permissions

Just because you registered an app doesn't mean it can access Dataverse. You must explicitly grant it permission.

1. Open your App Registration in the Azure Portal.
2. Navigate to **API Permissions**.
3. Click **Add a permission**.
4. Select **Dynamics CRM**.
5. Select the **user_impersonation** permission.

This permission tells Entra ID: *"This custom application is allowed to talk to the Dynamics CRM API."*

### Admin Consent
By default, if an app requests permission to access CRM data, Entra ID will prompt the user with a popup: *"Nightly Sync Script wants to access your Dynamics data. Do you accept?"*

For background scripts (Server-to-Server), there is no human to click "Accept." Therefore, a Global Administrator must click the **Grant admin consent for Contoso** button in the Azure Portal. This pre-approves the app for the entire organization.

## Things to Remember

- **Microsoft Entra ID** is the bouncer for Dataverse.
- Every external script or app must have an **App Registration**.
- App Registrations provide a **Client ID** and **Tenant ID**.
- The app must be granted the **Dynamics CRM API Permission** and receive **Admin Consent**.

## What's Next

Now that your app is registered, how does it actually prove its identity to Entra ID without a human typing in a password? Next, we cover **Service Principals**.
  `.trim(),
};
