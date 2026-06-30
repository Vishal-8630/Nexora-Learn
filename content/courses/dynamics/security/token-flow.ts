import { DocContent } from "@/types/docs";

export const tokenFlow: DocContent = {
  title: "S2S Token Flow (Implementation)",
  description:
    "A practical guide to implementing the Server-to-Server (S2S) OAuth token flow using raw HTTP requests and MSAL.",
  content: `
## Introduction

While using the Microsoft Authentication Library (MSAL) is the recommended approach, understanding the raw HTTP requests required to obtain a token is critical for debugging, or for integrating Dataverse with legacy systems (like mainframes) where MSAL libraries do not exist.

In this section, we will walk through the **Client Credentials Flow** (Server-to-Server).

## Prerequisites

Before you can request a token, you must have:
1. **Tenant ID:** \`11111111-1111-1111-1111-111111111111\`
2. **Client ID:** \`22222222-2222-2222-2222-222222222222\`
3. **Client Secret:** \`SuperSecretPassword123\`
4. **Dataverse URL (Resource):** \`https://contoso.crm.dynamics.com/\`

## Step 1: Acquiring the Token (Raw HTTP)

To get an Access Token, your script must send a \`POST\` request to the Microsoft Entra ID OAuth2 endpoint for your specific tenant.

**Endpoint:**
\`https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/token\`

**Headers:**
\`Content-Type: application/x-www-form-urlencoded\`

**Body (Form Data):**
\`\`\`text
grant_type=client_credentials
&client_id=22222222-2222-2222-2222-222222222222
&client_secret=SuperSecretPassword123
&scope=https://contoso.crm.dynamics.com/.default
\`\`\`

> [!IMPORTANT]
> **The Scope Parameter:** In OAuth v2.0, you must specify what resource you are requesting a token for. For Dataverse S2S integrations, the scope is always your environment URL followed by \`/.default\`. This tells Entra ID to grant the token for all permissions statically configured on the App Registration.

### The Response
If the credentials are valid, Entra ID will return a JSON object:

\`\`\`json
{
    "token_type": "Bearer",
    "expires_in": 3599,
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbG..."
}
\`\`\`
The \`access_token\` is the massive string you need. It is valid for \`3599\` seconds (1 hour).

## Step 2: Calling the Dataverse API

Now that you have the Access Token, you must include it in the header of every HTTP request you send to Dataverse.

**Request:**
\`\`\`http
GET https://contoso.crm.dynamics.com/api/data/v9.2/accounts?$select=name HTTP/1.1
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbG...
OData-MaxVersion: 4.0
OData-Version: 4.0
Accept: application/json
\`\`\`

If the Application User in Dataverse has the correct Security Roles, Dataverse will process the token, authorize the request, and return the data.

## Implementing with MSAL (Node.js Example)

If you have access to Node.js, you should never write the raw HTTP requests above. You should use the \`@azure/msal-node\` library, which handles caching and token refreshing automatically.

\`\`\`javascript
const msal = require('@azure/msal-node');
const axios = require('axios');

// 1. Configure MSAL
const msalConfig = {
    auth: {
        clientId: "22222222-2222-2222-2222-222222222222",
        authority: "https://login.microsoftonline.com/11111111-1111-1111-1111-111111111111",
        clientSecret: "SuperSecretPassword123"
    }
};

const cca = new msal.ConfidentialClientApplication(msalConfig);

async function getAccounts() {
    // 2. Request the Token
    const tokenRequest = {
        scopes: ["https://contoso.crm.dynamics.com/.default"],
    };

    try {
        const response = await cca.acquireTokenByClientCredential(tokenRequest);
        
        // 3. Call Dataverse
        const crmResponse = await axios.get("https://contoso.crm.dynamics.com/api/data/v9.2/accounts?$select=name", {
            headers: {
                Authorization: \`Bearer \${response.accessToken}\`
            }
        });
        
        console.log(crmResponse.data.value);
    } catch (error) {
        console.error(error);
    }
}

getAccounts();
\`\`\`

## Things to Remember

- The raw HTTP flow requires a **POST to login.microsoftonline.com**.
- You must specify the **Scope** as \`https://yourorg.crm.dynamics.com/.default\`.
- You attach the token to Dataverse requests using the **Authorization: Bearer** header.
- Always use **MSAL libraries** if your programming language supports them.

## What's Next

You now understand the complete security architecture of Dynamics 365 and Dataverse. From human users accessing the UI, to custom Python scripts syncing data via OAuth 2.0 and Application Users.
  `.trim(),
};
