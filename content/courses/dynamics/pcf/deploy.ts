import { DocContent } from "@/types/docs";

export const deploy: DocContent = {
  title: "Deploying PCF Controls",
  description:
    "Learn how to rapidly push PCF controls to Dataverse during active development, and how to rigorously package them into ALM Solutions for enterprise deployment.",
  content: `
## Introduction

Once you have successfully built and compiled your PCF control locally, you must inject the payload into the Dataverse database so administrators can bind it to Model-Driven Forms.

There are two primary architectural methods for deployment:
1. **The Developer Push:** (Rapid prototyping, used strictly for active Sandbox development).
2. **The Solution Package:** (Rigorous ALM, used for migrating from Dev to QA to Prod).

## Method 1: The Developer Push (pac pcf push)

During active development (especially if you need to validate WebAPI transactions that the local Test Harness cannot simulate), you require a fast feedback loop to push code directly to your Sandbox environment.

### 1. Authenticate
First, you must authorize the Power Platform CLI against your target environment.
\`\`\`bash
pac auth create --url https://your-env.crm.dynamics.com
\`\`\`

### 2. Push
Execute the push command, strictly specifying the publisher prefix associated with your solution.
\`\`\`bash
pac pcf push --publisher-prefix con
\`\`\`

**Architectural Mechanics:**
The CLI automatically executes a production build, generates a temporary unmanaged Dataverse Solution behind the scenes, uploads your PCF payload into that solution, and publishes customizations. 

> [!CAUTION]
> **Never push to Production**
> The \\\`push\\\` command overwrites the existing control in the environment outside of standard Application Lifecycle Management (ALM) pipelines. Never execute this command against a UAT or Production environment.

## Method 2: The Solution Package (Enterprise ALM)

For enterprise deployments, you cannot use \\\`pac pcf push\\\`. You must package the PCF payload inside a standard Dataverse Solution (\\\`.zip\\\` file) so it can be deployed deterministically via Azure DevOps or GitHub Actions.

### 1. Create a Solution Project
Create a new directory adjacent to your PCF source folder (e.g., \\\`SolutionPackage\\\`). 
Navigate into it and initialize a Dataverse solution MSBuild project:
\`\`\`bash
pac solution init --publisher-name Contoso --publisher-prefix con
\`\`\`

### 2. Link the PCF Control
Bind the solution project to the PCF source directory.
\`\`\`bash
pac solution add-reference --path ..\\YourPcfControlFolder
\`\`\`

### 3. Build the Solution
Execute the standard MSBuild command:
\`\`\`bash
dotnet build
\`\`\`

**Architectural Mechanics:**
MSBuild will trigger \\\`npm run build\\\` on your PCF control, extract the compiled Webpack payload, and package it into a compliant \\\`solution.zip\\\` file located in the \\\`bin/Debug\\\` or \\\`bin/Release\\\` directory.
You can now manually import this ZIP into Dataverse, or commit the repository and allow the CI/CD pipeline to handle deployment.

## The Versioning Trap (Architectural Rule)

> [!CAUTION]
> **Dataverse Silently Ignores Identical Versions**
> If you deploy version \\\`1.0.0\\\` to QA, and then patch a bug in your TypeScript code, you **must** manually increment the semantic version in your \\\`ControlManifest.Input.xml\\\` to \\\`1.0.1\\\` before executing the build. 
> 
> If you deploy \\\`1.0.0\\\` twice, Dataverse assumes the payload is identical to the existing record in SQL and will **not** extract the new JavaScript bundle, leaving your bug unfixed in the environment without throwing an error.

## Configuring the Control on a Form

Once the payload is in Dataverse, the Solution Architect must configure it:
1. Open the Model-Driven Form in the Maker Portal.
2. Select the Dataverse schema column (e.g., "Budget Amount").
3. Click **Components -> Add Component**.
4. Select your custom PCF Control.
5. Map any \\\`bound\\\` schema columns or static \\\`input\\\` properties demanded by your Manifest.
6. Declare which physical form factors (Web, Phone, Tablet) should render the custom component instead of the default Microsoft UI.
7. Save and Publish.

## Things to Remember

- Execute **\\\`pac pcf push\\\`** exclusively for rapid Sandbox prototyping.
- Execute **\\\`pac solution init\\\`** and MSBuild to construct ZIP files for Enterprise CI/CD.
- You must strictly **increment the semantic version number** in the Manifest before deploying mutated code.
- Administrators must explicitly bind the component to the form in the **Maker Portal**.

## What's Next

Now that we can build and deploy controls, we need to focus on specific component architectures, starting with **Field Controls**.
  `.trim(),
};
