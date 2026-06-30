import { DocContent } from "@/types/docs";

export const oauth: DocContent = {
  title: "OAuth 2.0",
  description:
    "An architectural breakdown of the OAuth 2.0 protocol and how Microsoft Authentication Library (MSAL) simplifies token acquisition.",
  content: `
## Introduction

**OAuth 2.0** is the industry-standard protocol for authorization. It is not specific to Microsoft; it is the same protocol used by Google, Facebook, and Twitter.

OAuth 2.0 allows a user or an application to grant a third-party application limited access to resources (like Dataverse) *without* exposing their password.

## The OAuth Actors

To understand OAuth, you must understand the four participants in the transaction:

1. **Resource Owner:** The entity that owns the data. (For S2S integrations, this is your organization. For delegated integrations, this is the human user).
2. **Client:** Your custom Python script, C# app, or mobile app that wants to access the data.
3. **Authorization Server:** The server that validates identity and issues tokens. (In our case, **Microsoft Entra ID**).
4. **Resource Server:** The server hosting the data. (In our case, **Dataverse**).

## The Access Token

The ultimate goal of the OAuth protocol is for the **Client** to obtain an **Access Token** from the **Authorization Server**.

An Access Token is a JSON Web Token (JWT). It is a Base64-encoded string that contains cryptographic claims about the identity.

If you decode an Entra ID Access Token (using a tool like jwt.ms), you will see claims like:
- \`aud\` (Audience): Who is this token for? (e.g., your Dataverse environment URL).
- \`iss\` (Issuer): Who created this token? (e.g., your Entra ID tenant).
- \`appid\` (App ID): Which Client ID requested this token?
- \`exp\` (Expiration): When does this token expire?

> [!IMPORTANT]
> Access Tokens are temporary. They typically expire after **60 minutes**. This limits the damage if a hacker intercepts the token.

## Microsoft Authentication Library (MSAL)

Because OAuth 2.0 involves complex cryptographic handshakes and HTTP redirects, writing the raw HTTP requests manually is tedious and error-prone.

Microsoft provides the **Microsoft Authentication Library (MSAL)** to handle the heavy lifting. MSAL is available for C#, Node.js, Python, Java, and React.

### Why use MSAL?
1. **Token Caching:** MSAL automatically caches the Access Token in memory.
2. **Silent Renewals:** When the 60-minute token expires, MSAL automatically uses a "Refresh Token" to fetch a new Access Token in the background, without interrupting the application or prompting the user to log in again.
3. **Security:** MSAL handles all the cryptographic validation locally on your machine to ensure the token hasn't been tampered with.

## OAuth Grant Types

OAuth defines several "flows" (Grant Types) for different scenarios. The two most common for Dataverse are:

### 1. Authorization Code Flow (Delegated)
Used for web and mobile apps where a human user is present.
1. The App redirects the user to the Microsoft login page.
2. The user types their password and approves MFA.
3. Microsoft redirects back to the App with an "Authorization Code".
4. The App exchanges the Code for an Access Token.

### 2. Client Credentials Flow (Server-to-Server)
Used for backend scripts where no human is present.
1. The Script sends its Client ID and Client Secret directly to Microsoft Entra ID.
2. Entra ID validates the secret and immediately returns an Access Token.

## Things to Remember

- **OAuth 2.0** issues temporary **Access Tokens (JWTs)** instead of passwords.
- Access Tokens typically expire after **60 minutes**.
- Use **MSAL** (Microsoft Authentication Library) to handle caching and token renewals.
- Use **Client Credentials** for background S2S scripts.

## What's Next

Now that we understand the actors and the libraries, let's look at the exact HTTP requests required to execute the **Token Flow** for a Server-to-Server integration.
  `.trim(),
};
