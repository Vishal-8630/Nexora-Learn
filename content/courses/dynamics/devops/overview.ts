import { DocContent } from "@/types/docs";

export const devopsOverview: DocContent = {
  title: "DevOps Overview",
  description:
    "An introduction to Continuous Integration and Continuous Deployment (CI/CD) specifically tailored for the Dynamics 365 and Power Platform ecosystem.",
  content: `
## Introduction

In the ALM phase, we discussed the core concepts of Unmanaged and Managed solutions. We learned that developers build in an Unmanaged environment, export the solution as Managed, and import it into Production.

If you are a lone developer on a tiny project, you can do this manually by clicking "Export" and "Import" in the browser. 

However, in an enterprise with 10 developers building complex C# Plugins, PCF Controls, and massive Canvas Apps simultaneously, manual deployment is disastrous. It leads to overwritten code, lost components, and deployment failures that can cripple a business.

This is where **DevOps** (Development & IT Operations) comes in.

## The Goal of DevOps

DevOps aims to completely automate the entire software delivery lifecycle (CI/CD). 
In the context of Dynamics 365, a successful DevOps implementation achieves the following:

1. **Source of Truth (Source Control):** The actual ZIP file in the Dataverse database is *not* the master copy of the code. The master copy of the code is securely stored in a Git Repository.
2. **Continuous Integration (CI):** Every time a developer finishes a feature, the system automatically runs a pipeline to verify that their code compiles, runs automated unit tests, and doesn't break the main branch.
3. **Continuous Deployment (CD):** Once the code is verified, a completely automated pipeline packages the Managed Solution and pushes it to QA, UAT, and Production environments without human interaction.

## The Challenge with Dataverse

DevOps is easy for standard web applications (like React or .NET Core) because they are entirely file-based architectures. 

Dataverse is fundamentally different because **it is a database-first application**. 

A Dataverse "Solution" is just a ZIP file containing XML files that describe database tables.
To put Dataverse into Source Control, you have to use a tool to extract that ZIP file from the database, unpack the XML files into human-readable text, and push them to Git. To deploy it, you have to pack the XML files back into a ZIP and inject it into the next database.

## Tools of the Trade

To achieve true CI/CD in Dynamics 365, solution architects rely on three primary pillars:

### 1. Azure DevOps (or GitHub)
The cloud platform that hosts the Git repository (the source code) and runs the automated pipeline scripts (YAML). It provides the compute power to execute the deployments.

### 2. Power Platform Build Tools
A set of pre-built pipeline tasks provided by Microsoft specifically designed to talk to Dataverse. They provide visual drag-and-drop steps for actions like "Export Solution", "Unpack Solution", and "Import Solution".

### 3. The PAC CLI (Power Apps CLI)
The underlying command-line tool that the pipelines actually use behind the scenes to perform the heavy lifting of packing and unpacking solutions. Professional developers often run PAC CLI commands locally on their machines before committing code.

## Things to Remember

- Manual solution deployment is entirely unacceptable in **enterprise environments**.
- The ultimate goal of DevOps is establishing **Source Control** and **Automated Deployments (CI/CD)**.
- Dataverse is uniquely challenging because it requires packing and unpacking **XML-based Solutions**.

## What's Next

Let's dive into the flagship platform used by Microsoft enterprises to manage this entire process: **Azure DevOps**.
  `.trim(),
};
