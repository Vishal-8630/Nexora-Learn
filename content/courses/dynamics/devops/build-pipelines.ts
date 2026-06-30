import { DocContent } from "@/types/docs";

export const buildPipelines: DocContent = {
  title: "Build Pipelines (CI)",
  description:
    "Master the Continuous Integration process by configuring Build Pipelines to automatically extract, validate, and pack your Dataverse solutions.",
  content: `
## Introduction

The **Build Pipeline** represents the "Continuous Integration (CI)" half of CI/CD.

The primary responsibility of a Build Pipeline in Dynamics 365 is to take the raw, Unmanaged components sitting in a developer's sandbox, convert them into source code, validate them, and prepare a "Build Artifact" (a Managed Solution ZIP) that is ready for deployment.

## The Standard Build Process

A standard enterprise Build Pipeline triggered on a nightly schedule (or upon Pull Request completion) executes the following YAML sequence:

\`\`\`text
1. Export Unmanaged Solution (From Dev)
        │
2. Export Managed Solution (From Dev)
        │
3. Unpack Unmanaged ZIP to XML (Source Control)
        │
4. Run Solution Checker (Quality Gate)
        │
5. Publish Managed ZIP as Artifact
\`\`\`

1. **Tool Installer:** Downloads the PAC CLI to the build agent.
2. **Ping Environment:** Tests the Service Principal connection to the Dev environment to ensure it is awake.
3. **Export Solution (Unmanaged):** Extracts the latest Unmanaged ZIP from the Dev environment.
4. **Export Solution (Managed):** Extracts the Managed version of the same solution (this will be our actual deployment artifact).
5. **Unpack Solution:** Takes the Unmanaged ZIP and explodes it into raw XML, JSON, and C# files.
6. **Command Line Script (Git Commit):** Uses native Git commands to commit the unpacked XML files and push them to the \\\`main\\\` branch in Azure Repos.
7. **Publish Build Artifact:** Takes the Managed ZIP file and uploads it to Azure DevOps storage so the Release Pipeline can access it later.

## Solution Checker (Quality Gate)

A critical step that should be included in every Build Pipeline is the **Power Platform Checker** task.

This task uploads your solution to Microsoft's cloud validation engine. The engine analyzes your C# Plugins, Web Resources, and Canvas Apps against hundreds of performance, security, and best-practice rules.

**Real-World Scenario:**
If a developer wrote a C# Plugin that contains a synchronous external HTTP call (a major performance violation), the Solution Checker will flag it. You can configure the pipeline task to automatically **fail the build** if the solution checker returns any "Critical" severity issues, preventing bad code from ever reaching QA.

## Compiling C# Code

If your solution contains complex C# Plugins or custom PCF controls (TypeScript/React), the Build Pipeline must also compile them.

Before exporting the solution from Dataverse, a robust pipeline will:
1. Run \\\`npm install\\\` and \\\`npm run build\\\` to compile the PCF controls.
2. Run \\\`dotnet build\\\` to compile the C# plugins.
3. Run \\\`dotnet test\\\` to execute Unit Tests using FakeXrmEasy.
4. Run \\\`pac auth\\\` and \\\`pac plugin push\\\` to push the compiled DLLs into the Dev environment.
*Then*, the pipeline proceeds with exporting the final solution.

## Build Artifacts

The final output of a Build Pipeline is a **Build Artifact**. 
This is usually a folder containing the Managed Solution \\\`.zip\\\` file and any configuration data files (like a JSON file mapping Environment Variables for different environments). 

The Build Pipeline is now complete. The code is safely in Git, the Managed ZIP is ready, and it hands the baton over to the **Release Pipeline**.

## Things to Remember

- The Build Pipeline focuses on **Extraction, Validation, and Source Control**.
- Use the **Power Platform Checker** to automatically fail builds containing bad code.
- Compile **C# and PCF controls** and run Unit Tests during the build phase.
- The final output is a **Build Artifact** (Managed Solution ZIP).

## What's Next

Now that we have a verified Managed Solution sitting in Azure Artifacts, how do we safely push it to the QA and Production databases without breaking them? We use **Release Pipelines**.
  `.trim(),
};
