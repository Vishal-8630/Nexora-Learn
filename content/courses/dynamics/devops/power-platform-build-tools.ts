import { DocContent } from "@/types/docs";

export const powerPlatformBuildTools: DocContent = {
  title: "Power Platform Build Tools",
  description:
    "Learn how Microsoft's official Build Tools extension enables Azure Pipelines to communicate natively with Dataverse and perform automated deployments.",
  content: `
## Introduction

If you write a blank YAML script in Azure Pipelines, the build server is just a standard Windows or Linux virtual machine. It has no idea what Dynamics 365 is, what a "Solution" is, or how to import an XML-based ZIP file into Dataverse.

To give Azure DevOps the ability to interact with the Power Platform natively, you must install the **Power Platform Build Tools** extension from the Visual Studio Marketplace into your Azure DevOps organization.

## What are the Build Tools?

The Build Tools are a collection of pre-configured Azure DevOps pipeline tasks. They abstract away the complex REST API calls and CLI commands, allowing you to drag-and-drop steps into your CI/CD pipeline.

Under the hood, these tasks are primarily wrappers around the **PAC CLI** (Power Apps Component CLI). 

## Key Tasks Provided

When designing a pipeline, you will use these core tasks:

### 1. Power Platform Tool Installer
This task must be the very first step in *every* pipeline. It tells the Azure DevOps agent to reach out to the internet, download the latest version of the PAC CLI, and install it on the temporary virtual machine so the subsequent tasks can execute.

### 2. Power Platform Export Solution
Connects to your Dev environment and extracts the Solution ZIP file. You can configure it to extract as Unmanaged, Managed, or Both (for enterprise pipelines, you generally extract both).

### 3. Power Platform Unpack Solution
Takes the exported Unmanaged ZIP file and unpacks it into raw XML, JSON, and HTML files. This is critical because Git cannot track changes inside a binary ZIP file. Git needs raw text files to show line-by-line differences during a Pull Request.

### 4. Power Platform Pack Solution
The reverse of the above. It takes the XML files stored in the Git repository and compresses them back into a deployable ZIP file.

### 5. Power Platform Import Solution
Connects to a target environment (QA, UAT, Prod) and imports the Managed ZIP file.

### 6. Power Platform Set Connection Variables
Used during deployment to inject the correct Azure Key Vault secrets and Service Principal credentials into the environment variables of the target environment.

## Authentication (Service Principals)

For Azure DevOps to execute these tasks against your Dataverse environment, it must authenticate.

You cannot use a standard username and password (because Multi-Factor Authentication and conditional access policies would block the automated pipeline). 

**The Enterprise Standard:** 
You must create an **App Registration (Service Principal)** in Microsoft Entra ID, assign it a Client Secret or Certificate, and create an Application User inside Dataverse with "System Administrator" privileges. 
You then configure a **Service Connection** in Azure DevOps using this Client ID and Secret. The pipeline uses this connection to authenticate silently.

## Things to Remember

- The **Power Platform Build Tools** extension must be installed in Azure DevOps.
- Every pipeline must begin with the **Tool Installer** task.
- **Unpacking** a solution to XML is required for Git Source Control visibility.
- Pipelines must authenticate to Dataverse using a **Service Principal (S2S)**.

## What's Next

Now that we have the tools installed, we can design the first half of the CI/CD process: The **Build Pipeline (Continuous Integration)**.
  `.trim(),
};
