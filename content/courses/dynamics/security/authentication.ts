import { DocContent } from "@/types/docs";

export const securityAuthentication: DocContent = {
  title: "Authentication Mechanisms",
  description:
    "Explore the historical evolution of Dataverse authentication, why WS-Trust is deprecated, and the shift towards modern identity management.",
  content: `
## Introduction

To integrate external applications with Dynamics 365, developers must authenticate. The protocols used for this authentication have evolved significantly over the last decade.

Understanding this evolution is critical, especially when migrating legacy on-premise systems or older integrations into the modern Dataverse cloud.

## The Era of Active Directory (On-Premise)

Before the cloud, Dynamics CRM was hosted on-premise, on physical servers running inside corporate data centers.

### NTLM & Kerberos
In an on-premise environment, authentication was handled natively by Windows Server Active Directory.
- If a user logged into their Windows PC and opened Internet Explorer, they were silently logged into CRM using **Kerberos** or **NTLM**.
- If a developer wrote a C# integration script on a local server, the script authenticated using the native Windows Service Account it was running under.

There were no Tokens. There was no OAuth. Security was enforced at the network boundary.

## The Shift to the Cloud (IFD & WS-Trust)

As companies began exposing their on-premise CRM to the public internet (Internet Facing Deployment, or IFD) and Microsoft launched the early versions of CRM Online, network-boundary security was no longer sufficient.

### WS-Trust (Active Directory Federation Services)
Microsoft introduced claims-based authentication using **ADFS** and the **WS-Trust** protocol.
- Developers passed a raw Username and Password (Basic Authentication) in their C# connection strings.
- The CRM SDK packaged these credentials into a SOAP XML envelope and sent it to the ADFS server.
- The ADFS server validated the credentials and issued a SAML token, which granted access to CRM.

> [!CAUTION]
> **WS-Trust is inherently insecure.** It cannot enforce Multi-Factor Authentication (MFA) because a C# script cannot tap a smartphone to approve a push notification. Furthermore, the Username and Password traverse the network (even if encrypted), increasing the risk of interception.

## The Modern Era (OAuth 2.0 & Entra ID)

Because WS-Trust could not support modern security requirements like MFA, Conditional Access Policies, or Zero Trust architecture, Microsoft completely deprecated it.

**As of 2022, WS-Trust and Basic Authentication are permanently disabled for Dataverse.**

### The Modern Authentication Standard
All Dataverse integrations must now use **Modern Authentication (OAuth 2.0)** backed by **Microsoft Entra ID**.
- Applications do not pass Usernames and Passwords to Dataverse.
- Applications acquire **Access Tokens** directly from Entra ID.
- Dataverse only accepts API requests containing a cryptographically signed Access Token.

## Identity vs Access (Authentication vs Authorization)

With the shift to Entra ID, the concepts of Authentication and Authorization were strictly separated.

- **Authentication (Entra ID):** Determines *who* you are. Entra ID handles MFA, password resets, Conditional Access (e.g., blocking logins from outside the corporate VPN), and token issuance.
- **Authorization (Dataverse):** Determines *what* you can do. Once Dataverse receives the Access Token, it checks its internal Security Roles to decide if the identity is allowed to Read, Write, or Delete records.

## Things to Remember

- On-premise **Kerberos/NTLM** does not exist in the cloud.
- **WS-Trust and Basic Authentication** are permanently deprecated.
- All integrations must use **OAuth 2.0** and **Entra ID**.
- **Entra ID** handles Authentication; **Dataverse** handles Authorization.

## What's Next

To understand how modern authentication works under the hood, we must explore the industry-standard protocol that powers it: **OAuth 2.0**.
  `.trim(),
};
