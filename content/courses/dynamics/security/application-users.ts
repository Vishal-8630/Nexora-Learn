import { DocContent } from "@/types/docs";

export const applicationUsers: DocContent = {
  title: "Application Users",
  description:
    "Learn how to map Entra ID Service Principals to Dataverse Application Users to assign Security Roles and control database access.",
  content: `
## Introduction

Currently, we have an App Registration in Azure, and our script can successfully acquire a token from Entra ID using a Client Secret. 

However, if that script tries to query Dataverse (e.g., \`GET /api/data/v9.2/accounts\`), Dataverse will return a \`403 Forbidden\` error. 

Why? Because Dataverse has no idea what Security Roles this script is supposed to have. Entra ID handles *Authentication* (Identity), but Dataverse handles *Authorization* (Permissions).

To fix this, we must create an **Application User** in Dataverse.

## What is an Application User?

An Application User is a special type of \`SystemUser\` record in Dataverse. 
- It does **not** consume a paid Dynamics 365 license.
- It cannot log into the UI (the web browser).
- It is designed exclusively for Server-to-Server (S2S) API integrations.

## Creating an Application User

You create Application Users using the Power Platform Admin Center (PPAC), not the standard Dynamics 365 UI.

1. Navigate to the **Power Platform Admin Center** (admin.powerplatform.microsoft.com).
2. Select your Environment and go to **Settings -> Users + permissions -> Application users**.
3. Click **New app user**.
4. Click **Add an app** and search for the App Registration you created in Entra ID. (Dataverse uses the Client ID to link the records).
5. Select a **Business Unit**.
6. **Assign Security Roles.**

## Assigning Security Roles

This is the most critical step. Just like a human user, an Application User must be assigned a Security Role to perform any actions in Dataverse.

### Principle of Least Privilege
Do **not** assign the "System Administrator" role to your Application User unless absolutely necessary.

If your script's only job is to create new Leads, you should create a custom Security Role (e.g., "Integration - Lead Creator") that only has "Create" privileges on the Lead table, and assign *that* role to the Application User. 

If your Client Secret is ever compromised by a hacker, they will only be able to create Leads, rather than deleting your entire Account database.

## The Full S2S Flow

Now that the Application User exists, the full Server-to-Server architecture is complete:

1. Your Python script talks to **Entra ID**. It presents its Client ID and Client Secret.
2. Entra ID validates the secret and gives the script an **Access Token**.
3. The Python script sends an HTTP request to **Dataverse**, passing the Access Token in the header.
4. Dataverse inspects the token, reads the Client ID, and says: *"Ah, I know this Client ID! It is linked to the 'Nightly Sync' Application User in my database."*
5. Dataverse checks the Application User's **Security Roles**.
6. Dataverse confirms the user has Read privileges and executes the query.

## Bypassing Plugins

Because S2S scripts often perform massive data migrations (e.g., inserting 100,000 records), you may not want standard synchronous C# Plugins or Power Automate flows to trigger on every single record, as it will destroy performance.

Developers often configure their scripts to pass the \`BypassCustomPluginExecution\` header. 

> [!WARNING]
> To use the Bypass Plugin header, the Application User must be assigned the **prvBypassCustomPlugins** privilege, which is typically only found in the System Administrator role. Use this capability with extreme caution.

## Things to Remember

- **Application Users** link Entra ID Service Principals to Dataverse.
- They do **not consume a license**.
- They must be assigned **Security Roles**.
- Always follow the **Principle of Least Privilege**.

## What's Next

We've talked abstractly about the script acquiring an "Access Token." In the next sections, we will look at the exact **OAuth Token Flow** and how to write the code to retrieve it.
  `.trim(),
};
