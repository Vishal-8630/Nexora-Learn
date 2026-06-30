import { DocContent } from "@/types/docs";

export const keyVault: DocContent = {
  title: "Azure Key Vault",
  description:
    "Learn the critical role of Azure Key Vault in securing integration credentials, API keys, and connection strings away from the Dataverse application layer.",
  content: `
## Introduction

Throughout this documentation, we have discussed connecting Dynamics 365 to external systems:
- An Azure Function calling an SAP API using an \\\`API_KEY\\\`.
- A C# Plugin authenticating with a \\\`Client Secret\\\`.
- Dataverse writing to Azure Blob Storage using a \\\`SAS Token\\\`.

**Where do you store these passwords?**

If a developer hardcodes an API key in a C# Plugin or an Environment Variable plaintext field and deploys it, that key is permanently stored in the Dataverse database. Anyone who decompiles the DLL or inspects the source code repository can steal it.

The enterprise standard for storing secrets is **Azure Key Vault**.

## What is Azure Key Vault?

Azure Key Vault is a highly secure cloud service designed to safeguard cryptographic keys and secrets (passwords, certificates, API keys) used by cloud applications.

It is backed by Hardware Security Modules (HSMs), ensuring that secrets cannot be extracted or tampered with by unauthorized parties.

## The Architecture Pattern (Managed Identities)

Instead of storing the secret in Dataverse, you store it in Key Vault.

1. You save the SAP API Key in Key Vault and name it \\\`SAP-Production-Key\\\`.
2. You configure an Azure Function to process the SAP data.
3. You assign a **Managed Identity** to the Azure Function. (This gives the Function a dedicated identity in Microsoft Entra ID without requiring a password).
4. You grant that Managed Identity "Get Secret" permission in Key Vault.
5. When the Azure Function runs, it queries Key Vault for \\\`SAP-Production-Key\\\`.
6. Key Vault verifies the Function's Managed Identity natively and returns the string in memory.
7. The Function executes the API call.

In this architecture, the password exists *only* in Key Vault and in the temporary RAM of the Azure Function. It is never written to disk, and no human developer ever sees it.

## Key Vault with Environment Variables

Dataverse natively supports Azure Key Vault through **Environment Variables**.

When creating an Environment Variable in a Dataverse solution, you can select the **"Secret"** data type.
Instead of typing the physical password into Dataverse, you provide the Azure Key Vault URL (e.g., \\\`https://contoso-vault.vault.azure.net/secrets/sap-key\\\`).

When a Power Automate flow or a native Dynamics component references this Environment Variable, Dataverse automatically reaches out to Key Vault in the background, securely retrieves the value, and injects it into the flow. 
- *Note: To enable this, the Dataverse environment must be configured with a Service Principal that has access to the Key Vault.*

## Common Mistakes

> [!CAUTION]
> **Pricing Loops**
> Every time you read a secret from Key Vault, Microsoft charges a fraction of a cent. If you have an Azure Function that processes 10 million rows, and you query Key Vault for the API key inside the \\\`foreach\\\` loop, your monthly Azure bill will explode. 
> **Best Practice:** Fetch the Key Vault secret *once* at the beginning of the Azure Function and cache it in memory.

## Things to Remember

- Never **hardcode** passwords, connection strings, or API keys in code.
- Store all secrets in **Azure Key Vault**.
- Use **Managed Identities** to allow Azure services (like Functions) to read the vault without needing a password.
- Dataverse natively integrates with Key Vault via **Secret Environment Variables**.

## What's Next

We have covered the developer-centric Azure services. Next, we look at the enterprise low-code integration engine: **Azure Logic Apps**.
  `.trim(),
};
