import { DocContent } from "@/types/docs";

export const securityOverview: DocContent = {
  title: "Security & Authentication Overview",
  description:
    "An introduction to how Microsoft Dynamics 365 and Dataverse handle enterprise security, identity, and API authentication.",
  content: `
## Introduction

Security in Microsoft Dynamics 365 and Dataverse is not a single layer; it is a multi-layered, defense-in-depth architecture. 

Before a user can view a record, or an external system can query the Web API, they must successfully pass through several gates:
1. **Authentication (Who are you?):** Proving your identity to the Microsoft Entra ID (formerly Azure Active Directory) tenant.
2. **Authorization (What can you do?):** Dataverse checking if your authenticated identity has the necessary Security Roles to perform the requested action.

This phase focuses entirely on **Authentication**—specifically, how external applications, scripts, and integrations securely log into your Dataverse environment.

## The Deprecation of Basic Auth

Historically, if a developer wrote a C# script to migrate data into Dynamics CRM, they would simply pass a username and password (Basic Authentication) in the connection string.

> [!WARNING]
> **Basic Authentication is permanently deprecated and disabled in Dataverse.** 
> You can no longer pass a raw username and password to the Dataverse Web API or the Organization Service. All integrations must use modern authentication (OAuth 2.0).

## Modern Authentication (OAuth 2.0)

Because Dataverse is a SaaS platform hosted on Microsoft Azure, it relies entirely on **Microsoft Entra ID (Azure AD)** as its identity provider.

When a 3rd-party application (like a custom portal or a background Windows Service) needs to talk to Dataverse, it does not log directly into Dataverse. 
Instead:
1. The application asks Entra ID for an Access Token.
2. The application presents that token to Dataverse.
3. Dataverse validates the token's signature and grants access.

## Types of Authentication Flows

There are two primary ways an external system can authenticate with Dataverse:

### 1. Delegated (User) Authentication
- **Concept:** An application logs in *on behalf of a specific human user*.
- **Use Case:** You build a custom mobile app for your sales team. When John opens the app, he is prompted to log in with his Microsoft 365 credentials (and MFA). The app receives a token that says "I am acting on behalf of John".
- **Limitations:** If John leaves the company and his account is disabled, the mobile app stops working. It is entirely dependent on a licensed human user.

### 2. Server-to-Server (S2S) Authentication
- **Concept:** An application logs in *as itself*, without any human involvement.
- **Use Case:** A nightly backend script that syncs data from an on-premise SQL database into Dataverse. There is no UI, and no human to type in a password.
- **Implementation:** This is achieved using **Service Principals** and **Application Users**, which we will cover in depth in this phase.

## Things to Remember

- Basic Authentication (username/password) is **dead**.
- Dataverse relies 100% on **Microsoft Entra ID** and **OAuth 2.0**.
- **Delegated Authentication** acts on behalf of a human user.
- **Server-to-Server (S2S)** authentication acts as an independent application.

## What's Next

To understand how to configure these integrations, we must first look closer at the underlying identity provider: **Microsoft Entra ID**.
  `.trim(),
};
