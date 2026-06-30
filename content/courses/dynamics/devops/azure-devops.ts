import { DocContent } from "@/types/docs";

export const azureDevops: DocContent = {
  title: "Azure DevOps",
  description:
    "Explore the core components of Azure DevOps, the industry-standard platform for managing the lifecycle of enterprise Dynamics 365 projects.",
  content: `
## Introduction

**Azure DevOps (ADO)** is Microsoft's premier platform for managing the entire Software Development Life Cycle (SDLC). 
While you can theoretically use Jira for ticketing and Jenkins for deployment, Azure DevOps provides an all-in-one suite that is deeply integrated with the Microsoft ecosystem, specifically Entra ID and the Power Platform.

## Core Components

Azure DevOps is broken down into several major services:

### 1. Azure Boards (Agile Planning)
This is where Project Managers and Business Analysts live. It is Microsoft's answer to Jira.
You create Epics, Features, User Stories, and Bugs. Developers take these tickets and move them across a Kanban board (To Do -> Doing -> Done). 

> [!TIP]
> In a true DevOps environment, a developer cannot commit C# plugin code without tagging the specific User Story ID from Azure Boards. This creates a perfect, auditable trail of *why* a specific line of code was changed for compliance purposes.

### 2. Azure Repos (Source Control)
This is where the actual code lives. It provides unlimited, private, cloud-hosted Git repositories.
Instead of storing the "master" version of a Dataverse solution inside a random Sandbox environment, you unpack the solution to XML and commit it here. 
Azure Repos supports Pull Requests (PRs), allowing senior developers to review code before it is allowed to merge into the main project.

### 3. Azure Pipelines (CI/CD)
This is the engine that actually executes deployments.
It allows you to write YAML scripts that define a series of automated steps. 
*Example:* "When a Pull Request is approved, spin up a Windows Server, download the Power Platform Build Tools, connect to the QA environment, import the Managed Solution, and send a Teams message."

### 4. Azure Artifacts
If your team writes a custom C# library (e.g., a custom logging framework) that needs to be shared across 5 different Dynamics 365 projects, you can publish that DLL to Azure Artifacts. It acts as a private, internal NuGet package manager.

### 5. Azure Test Plans
A suite for QA testers to write manual test cases, track execution, and automatically log bugs back into Azure Boards if a test fails.

## Decision Making: Azure DevOps vs GitHub

Microsoft acquired GitHub in 2018. Since then, they have been aggressively pushing GitHub Actions as a direct competitor to Azure Pipelines.

**Which should an Architect choose for Dynamics 365?**
- **Use GitHub:** For Open Source tools (like PCF controls shared with the community), public-facing projects, or teams heavily invested in the GitHub ecosystem.
- **Use Azure DevOps:** For massive, enterprise-grade, internal corporate projects. Azure DevOps is still the reigning champion in the enterprise space due to its superior Boards (Agile tracking) and highly mature Release environment gates.

## Things to Remember

- **Azure Boards:** For Agile project management and ticketing.
- **Azure Repos:** For Git-based source control.
- **Azure Pipelines:** For automated CI/CD deployments via YAML.
- **Azure DevOps** remains the enterprise standard over GitHub for complex internal Dynamics projects.

## What's Next

How do you actually configure Azure Pipelines to compile your C# Plugins and unpack your Dataverse Solutions? You use the **Power Platform Build Tools**.
  `.trim(),
};
