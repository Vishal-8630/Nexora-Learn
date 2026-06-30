import { DocContent } from "@/types/docs";

export const environmentVariables: DocContent = {
  title: "Environment Variables",
  description:
    "Learn how to decouple configuration data from your codebase using Environment Variables, ensuring seamless ALM deployments across Dev, UAT, and Prod.",
  content: `
## Introduction

When building an enterprise application, you often need to store configuration data. 

For example, imagine you write a C# Plugin or a Power Automate Flow that sends data to an external ERP system via a REST API. 
- In the **DEV** environment, the code should send data to \`https://dev.api.erp.com\`.
- In the **PROD** environment, the code should send data to \`https://api.erp.com\`.

If you hardcode \`https://dev.api.erp.com\` directly into your code, what happens when you deploy the Solution to Production? The Production code will mistakenly send live customer data to the Dev ERP system.

To prevent this architectural flaw, you use **Environment Variables**.

## What is an Environment Variable?

An Environment Variable is a dedicated component you create inside your Dataverse Solution. It holds a key-value pair. 

Instead of hardcoding the URL in your logic, you configure your code to *read* the value of the Environment Variable. 

When you deploy the Solution to Production, you can change the value of the Environment Variable specifically for that environment, without touching the underlying code.

\`\`\`text
DEV Environment
Variable: ErpUrl = dev.api.erp.com
          │
          ▼ (Deploy Solution)
PROD Environment
Variable: ErpUrl = api.erp.com (Admin sets this on import)
\`\`\`

## Types of Environment Variables

You can create several data types:
- **Text:** (e.g., API URLs, Client IDs).
- **Decimal/Number:** (e.g., Max discount thresholds, record limits).
- **JSON:** (e.g., Complex configuration arrays).
- **Two Options:** (True/False values, often used as **Feature Toggles** to turn off experimental features in Prod).
- **Data Source:** (Crucial for Power Apps Canvas Apps connecting to specific SharePoint sites/lists).
- **Secret:** (Integrates directly with Azure Key Vault to store passwords securely without exposing them in the Dataverse UI).

## Default Values vs Current Values

When you create an Environment Variable in your Unmanaged Solution (DEV), it has two value fields:

1. **Default Value:** This value becomes permanently baked into the Solution schema. It travels with the solution.
2. **Current Value:** This value is specific *only to the current environment*. It overrides the Default Value.

## Deploying Environment Variables

When you export your Managed Solution from Dev and import it into UAT or Prod, the import wizard will detect that the Environment Variable exists.

If the variable has no Default Value, a popup will appear during the import process saying: *"This solution requires configuration."* The admin importing the solution will be forced to type in the specific PROD URL before the import can complete. 

This ensures that the PROD environment is always explicitly configured with Prod data, and Dev data never accidentally leaks into Production.

## Usage in Code

### Power Automate
In a Flow, Environment Variables appear automatically in the Dynamic Content flyout menu. You simply drop the token into your HTTP action. No coding required.

### C# Plugins
In a Plugin, you must query Dataverse to retrieve the value. Environment variables are stored in the \`environmentvariabledefinition\` and \`environmentvariablevalue\` tables. 

\`\`\`csharp
// High-level example of retrieving a variable via SDK
QueryExpression query = new QueryExpression("environmentvariabledefinition");
// Filter by schemaname, link to environmentvariablevalue, and retrieve the value.
\`\`\`
*(Note: Consider caching this value in your plugin architecture so you do not hit the database on every execution).*

## When to Use What? (Decision Making)

### Environment Variable vs Custom Config Table
- **Use an Environment Variable** for backend infrastructure configuration (API endpoints, feature flags, Key Vault secrets).
- **Use a Custom Config Table** (e.g., "Business Settings" table) if the configuration needs to be frequently changed by non-admin business users via a Model-Driven App UI (e.g., "Current Tax Rate"). Business users cannot access the Maker Portal to change Environment Variables.

## Best Practices

> [!IMPORTANT]
> **Never set a Default Value.**
> If you set a Default Value to the DEV URL, and you deploy to PROD, the Prod environment will fall back to the Dev URL if an admin forgets to configure it.
> You should leave the Default Value blank, and **only set the Current Value** in your Dev environment.

- **Use Azure Key Vault:** Never store API keys or passwords in a standard Text Environment Variable. Anyone with System Administrator access can view them in plain text. Always use the **Secret** data type linked to Azure Key Vault.

## Common Mistakes

> [!WARNING]
> **Caching Issues**
> Dataverse heavily caches Environment Variables. If you change a Current Value in Production, it may take up to an hour for Power Automate or Plugins to pick up the new value. To force a refresh, you often need to turn the Flow off and on again.

## Things to Remember

- Environment Variables **decouple configuration** from code.
- Never set a **Default Value**; always use the **Current Value** in Dev.
- The deployment process automatically prompts admins for missing values.
- **Secrets** integrate natively with Azure Key Vault for enterprise security.
- Changes to values in Prod may be delayed due to **caching**.

## What's Next

Environment Variables handle text and URLs. But what about authentications to external systems (like SQL Server or SharePoint)? For that, we use **Connection References**.
  `.trim(),
};
