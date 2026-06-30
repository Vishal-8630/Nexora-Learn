import { DocContent } from "@/types/docs";

export const authentication: DocContent = {
  title: "Authentication (Identity Providers)",
  description:
    "Learn how Power Pages authenticates external users, manages Contact records, and integrates with Azure AD B2C and OAuth providers.",
  content: `
## Introduction

By default, any page you create on a Power Pages site is accessible to the anonymous public. 

However, if you want users to view their own Orders, submit a Support Case, or update their Profile, they must log in. Power Pages provides a robust authentication architecture that offloads the heavy lifting of security and password management to external Identity Providers.

## The "Contact" Record Architecture

This is the most critical concept to understand in Power Pages: **Every authenticated user on a Power Pages site is represented by a single record in the Dataverse \`Contact\` table.**

Power Pages does not use the \`SystemUser\` table (which is reserved exclusively for internal, licensed Dynamics 365 employees).

When a user registers on your external portal, Dataverse creates a Contact record. When that user logs in, the portal context is permanently bound to that Contact's GUID. 

## Local Authentication (Deprecated)

Historically, Power Pages allowed "Local Authentication." The user would create a username and password, and Dataverse would store a hashed version of that password directly on the Contact record.

> [!WARNING]  
> **Local Authentication is deprecated.** Microsoft strongly advises against using it for new portals due to the massive security liabilities of storing passwords in Dataverse. You must use an external Identity Provider.

## External Identity Providers

Power Pages supports standard modern authentication protocols: **OAuth2**, **OpenID Connect**, and **SAML 2.0**.

You can configure the portal to allow users to log in using:
- Microsoft Account
- LinkedIn
- Google
- Facebook
- Twitter
- Any enterprise SAML provider (e.g., Okta, Ping Identity).

### How External Auth Works
1. The user clicks "Log in with Google" on your portal.
2. The portal redirects them to Google.
3. The user authenticates on Google's servers.
4. Google redirects them back to the portal with an authentication token containing their email address.
5. The portal searches Dataverse for a Contact record with a matching email.
6. If found, it logs them in. If not found, it automatically creates a new Contact record and logs them in.

## Azure AD B2C (The Industry Standard)

If you are building an enterprise portal, the gold standard for authentication is **Azure Active Directory B2C (Azure AD B2C)**.

Azure AD B2C is a separate Azure service designed specifically for customer identity management.

**Why use Azure AD B2C?**
1. **Custom Branding:** You can completely customize the login page UI (which is hosted by Azure, not Power Pages).
2. **Security:** Azure AD B2C handles MFA (Multi-Factor Authentication), password resets, and brute-force protection, keeping all that complexity out of your Dataverse environment.
3. **Single Sign-On (SSO):** If your company has a Power Pages site and a custom iOS mobile app, both can use the same Azure AD B2C directory, allowing customers to use one set of credentials for everything.

When you configure Azure AD B2C as an OpenID Connect provider in Power Pages, you can disable all other login options, creating a seamless, secure, enterprise-grade login experience.

## Invitation Codes

What if you don't want just *anyone* on the internet to register? What if you only want to allow existing, known customers to log in?

Power Pages supports **Invitations**.
1. An internal Dynamics 365 user creates a Contact record for a customer.
2. The internal user clicks the "Create Invitation" button on the Ribbon.
3. Dataverse generates a unique, single-use Invitation Code and emails it to the customer.
4. The customer visits the portal, enters the code, and is prompted to create a password (via Azure AD B2C).
5. The portal **binds** their new Azure AD B2C identity to the *existing* Contact record, rather than creating a duplicate.

## Things to Remember

- Authenticated portal users are always **Contact** records.
- **Local Authentication** (passwords stored in Dataverse) is deprecated.
- Use **Azure AD B2C** for enterprise customer identity management.
- Use **Invitations** to bind external identities to pre-existing CRM Contacts.

## What's Next

Once a user is logged in, you must ensure they can only see *their* data, not data belonging to other customers. Next, we cover the cornerstone of portal security: **Table Permissions**.
  `.trim(),
};
