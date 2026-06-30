import { DocContent } from "@/types/docs";

export const deployment: DocContent = {
  title: "Deployment & Pipelines (CI/CD)",
  description:
    "Explore the methodologies for deploying Dataverse solutions, from manual Maker Portal exports to fully automated Azure DevOps CI/CD pipelines.",
  content: `
## Introduction

You have built your Unmanaged Solution in the Development (DEV) environment. You have configured your Publisher, left your Environment Variables blank, and abstracted your authentications into Connection References.

It is time to move the application to the UAT (User Acceptance Testing) and Production environments.

There are three ways to deploy a Dataverse solution, ranging from manual "citizen developer" methods to fully automated enterprise Continuous Integration/Continuous Deployment (CI/CD).

## What is Deployment in Dataverse?

Deployment is the act of migrating the metadata (tables, apps, flows, plugins) from one environment to another. In Dataverse, this is done by exporting a **Solution** as a \`.zip\` package and importing it downstream.

## Method 1: Manual Export/Import

This is the traditional method, used by smaller organizations or for quick hotfixes.

1. **In DEV:** Open the Maker Portal, select the Solution, and click **Export**.
2. Run the internal Publisher check.
3. Choose **Managed**.
4. Download the \`.zip\` file to your local computer's Downloads folder.
5. **In PROD:** Open the Maker Portal, click **Import**, and select the \`.zip\` file.
6. The wizard will prompt you to map any Connection References and provide values for Environment Variables.

> [!WARNING]
> Manual deployments are highly prone to human error. A developer might accidentally export as Unmanaged, deploy it to Prod, and permanently ruin the environment's layering stack. 

## Method 2: Power Platform Pipelines (In-Product)

To bridge the gap between error-prone manual exports and complex Azure DevOps pipelines, Microsoft introduced **Power Platform Pipelines**.

This is a native feature inside Dataverse (requiring a specific Host environment setup by IT).

\`\`\`text
DEV Environment
       │
       ▼ (Click 'Deploy')
Pipelines Host Environment (Background processing)
       │
       ▼ (Auto-imports as Managed)
UAT Environment
\`\`\`

1. In the Dev Maker Portal, a new **Pipelines** icon appears next to the solution.
2. The developer clicks **Deploy to UAT**.
3. The system *automatically* exports the solution as Managed in the background.
4. The system automatically imports it into UAT, prompting the developer for the Environment Variable values via a clean UI.

## Method 3: Azure DevOps CI/CD (Enterprise Standard)

For enterprise development teams, manual clicks are unacceptable. Deployments must be repeatable, auditable, and tracked in Source Control.

Microsoft provides the **Power Platform Build Tools for Azure DevOps** (and identical actions for GitHub).

### The CI/CD Workflow

A standard enterprise deployment pipeline looks like this:

\`\`\`text
Developer finishes in DEV
          │
          ▼
Pipeline: Export & Unpack to XML
          │
          ▼
Commit to Git Branch (Source Control)
          │
          ▼ (Pull Request Approved)
Pipeline: Pack to .zip & Run Solution Checker
          │
          ▼
Release Pipeline: Deploy to UAT & Prod
\`\`\`

1. **Commit to Git (Source Control):**
   - An Azure DevOps pipeline runs the \`pac solution export\` and \`pac solution unpack\` commands in the background.
   - The pipeline commits the raw, human-readable XML files to a Git Branch and opens a Pull Request.
   - Senior developers review the XML differences (e.g., ensuring no one accidentally deleted a required column).

2. **Build (The Artifact):**
   - Once the PR is approved, a Build Pipeline runs.
   - It runs the **Power Apps Checker** to scan the code for security vulnerabilities.
   - It runs \`pac solution pack\` to compile the XML back into a Managed \`.zip\` file.
   - The \`.zip\` is saved as an immutable Pipeline Artifact.

3. **Release (Deployment):**
   - The Release Pipeline takes the Managed \`.zip\` artifact and deploys it to UAT.
   - The pipeline uses a **Deployment Settings JSON file** to automatically populate the Connection References and Environment Variables (so nobody has to type them in manually).
   - Once QA signs off, the exact same \`.zip\` artifact is pushed to Production.

## When to Use What? (Decision Making)

- **Use Manual Export/Import** ONLY for personal learning, sandbox experimentation, or critical emergency hotfixes when pipelines are down.
- **Use Power Platform Pipelines** if you are a citizen developer team, lack Azure DevOps licensing, or need a simple, visual, click-to-deploy experience without source control.
- **Use Azure DevOps / GitHub Actions** if you are an enterprise team. This is the only way to enforce code reviews, track XML changes over time, and achieve true CI/CD.

## Enterprise Considerations

- **Service Principals (Security):** Your automated pipelines should never use a regular user's username/password to connect to Dataverse. Always configure an Application User (Service Principal) with a Client ID and Secret in Azure Entra ID.
- **Immutable Artifacts (Scalability):** The exact \`.zip\` file generated in the Build stage must be the one deployed to UAT and Prod. Never rebuild the \`.zip\` between environments, as it introduces the risk of code changing mid-deployment.

## Common Mistakes

> [!WARNING]
> **Active Customizations in Prod**
> If someone manually edits a Form directly in Production, they create an "Active" (Unmanaged) layer. When your pipeline deploys an update to that Form, the pipeline will succeed, but the changes will not be visible to users because the Unmanaged layer sits on top of the Managed layer. Always lock down Prod security roles to prevent direct edits!

## Best Practices

- **Automate Everything:** Rely on Deployment Settings JSON files rather than manual UI prompts.
- **Run Solution Checker:** Always include the Power Apps Checker task in your build pipeline. Treat warnings as build failures.
- **Version Control:** Ensure your pipeline increments the solution version (e.g., \`1.0.1.x\`) during the export phase so Dataverse registers it as an upgrade.

## Things to Remember

- Deployments move metadata between environments using **Solutions**.
- Manual exports are highly prone to **human error**.
- **Power Platform Pipelines** offer native, in-product deployment automation.
- **Azure DevOps/GitHub** is required for enterprise Source Control and Pull Requests.
- Automated pipelines should run under a **Service Principal**.

## Related Topics

- [Managed Solutions](/docs/alm/managed-solutions) — what happens to the solution when it hits Prod
- [Connection References](/docs/alm/connection-references) — how to abstract connections for pipelines
- [Environment Variables](/docs/alm/environment-variables) — how to handle configuration data across environments
  `.trim(),
};
