import { DocContent } from "@/types/docs";

export const deploymentVariables: DocContent = {
  title: "Environment Variables & Connection References",
  description:
    "How to ensure Power Automate flows and configurations survive environment transitions during deployment.",
  content: `
## The Hardcoded URL Problem

A classic beginner mistake is hardcoding a SharePoint Site URL, an external API endpoint, or an Admin email address directly into a C# Plugin or a Power Automate flow.

When you deploy that solution from DEV to UAT, the flow will still point to the DEV SharePoint site.

The solution to this is **Environment Variables**.

---

## Environment Variables

Environment Variables act as configuration keys that travel with your solution but can have different values in different environments.

### Creating an Environment Variable
1. Inside your Dev Solution, click **New > More > Environment Variable**.
2. Give it a Schema Name (e.g., \`contoso_SharePointSiteUrl\`).
3. Select a Data Type (String, JSON, Boolean, Two Options, etc.).
4. Add a **Default Value** (e.g., \`https://contoso.sharepoint.com/sites/dev\`).
5. *Crucially, do NOT set a Current Value if it's meant to change per environment. Only set the Default Value in DEV.*

### Using them in Code

**In C# Plugins:**
You must query the \`environmentvariabledefinition\` and \`environmentvariablevalue\` tables using FetchXML or QueryExpression to retrieve the value dynamically at runtime.

**In Power Automate:**
Environment Variables appear dynamically in the dynamic content pane. Simply click them to inject the URL or ID into your HTTP actions.

---

## Connection References

Power Automate flows use "Connections" to talk to Dataverse, SharePoint, Outlook, etc. Connections belong to specific users and cannot be packaged in a solution.

**Connection References** solve this. They are placeholders. 

1. When you build a Flow in a solution, Dataverse automatically creates a Connection Reference (e.g., \`contoso_sharedsharepointonline\`).
2. The Flow uses the *Reference*, not the underlying Connection.
3. When you deploy the solution to UAT or PROD via CI/CD, the deployment pipeline will pause and ask: *"Who should own this connection in UAT?"*
4. You map the Reference to a Service Principal or a dedicated Service Account in UAT.

> [!IMPORTANT]
> **Deployment Settings JSON**
> In automated CI/CD pipelines, you cannot manually click "Map Connection" during an import. You must generate a \`deploymentSettings.json\` file using the pac CLI (\`pac solution create-settings\`). This file maps your DEV Connection References and Environment Variables to their PROD values automatically during the pipeline run.
`,
};
