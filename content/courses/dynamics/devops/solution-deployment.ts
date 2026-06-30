import { DocContent } from "@/types/docs";

export const solutionDeployment: DocContent = {
  title: "Solution Deployment Strategies",
  description:
    "Review the architectural strategies and golden rules for deploying Dynamics 365 solutions across enterprise environment landscapes.",
  content: `
## Introduction

Configuring Azure DevOps pipelines is only half the battle. If your underlying Solution architecture is flawed, the most advanced CI/CD pipeline in the world will still result in failed deployments, broken production systems, and massive technical debt.

Here are the enterprise strategies for Solution Deployment in Dataverse.

## The Golden Rule: Managed Only

We covered this in the ALM phase, but it warrants repeating in the DevOps context:
**Never deploy an Unmanaged Solution to a Production environment.**

If an architect or developer attempts to bypass the Azure DevOps pipeline by manually exporting an Unmanaged Solution and dropping it into Production "because it's just a quick fix," they are creating an **Active Customization**. 
That customization will sit on top of the Managed layer permanently. The next time the automated pipeline runs, it will fail to overwrite that manual change, fracturing your environment alignment and destroying your ALM strategy.

## Single vs Multiple Solutions

Should you pack your entire enterprise architecture into one massive solution, or break it into 15 smaller ones?

### 1. The Monolith (Single Solution)
- **Pros:** Extremely easy to deploy. You never have to worry about missing dependencies.
- **Cons:** Very slow to import. If 10 developers are working on different features, they all step on each other's toes and CI/CD build times skyrocket.

### 2. Segmented Architecture (Multiple Solutions)
- **Pros:** Fast deployments. Teams can release independently.
- **Cons:** High risk of dependency failures. 

*Scenario:* Team A creates a custom "Territory" column on the Account table in the "Core Solution". Team B builds a plugin that triggers off that column in the "Sales Solution". 
If the Release Pipeline deploys the "Sales Solution" before the "Core Solution", the deployment will crash because the Territory column doesn't exist in QA yet.

**Best Practice:** Use a segmented architecture, but clearly define strict dependency layers (e.g., Base Data Model -> Core Business Logic -> UI/Apps). Your Azure DevOps pipeline must be explicitly configured to deploy the Base layer first, followed by the upper layers.

## Decision Making: Upgrade vs Update

When deploying a Managed Solution that already exists in the target environment, Dataverse asks how you want to apply the changes.

1. **Update:** Overwrites existing components with new logic, but **does not delete anything**. If you deleted a field in Dev, it will remain forever in Prod. *(Fastest, but leaves massive technical debt).*
2. **Upgrade:** Imports the new version, applies the changes, and explicitly **deletes** any components that no longer exist in the solution payload. *(Slightly slower, but keeps Prod clean).*

> [!CAUTION]
> **Zombie Fields**
> Your Azure DevOps pipeline should *always* be configured to use the **Upgrade** action. If you use Update, your Production database will slowly accumulate "zombie" fields, plugins, and web resources over the years, eventually hitting system limits and degrading performance.

## Environment Strategies

A standard enterprise requires at minimum 3 environments:
1. **DEV:** Unmanaged. Where developers build.
2. **UAT (or QA):** Managed. Must be an exact replica of Prod. This is where the pipeline deploys first to verify that the Managed Solution upgrade doesn't crash.
3. **PROD:** Managed. The live system.

Many enterprises add a 4th environment: **PRE-PROD (Staging)**, used exclusively for load testing and final data migration dry-runs before weekend go-lives.

## Things to Remember

- Deploying **Unmanaged Solutions to Prod** destroys pipeline integrity.
- If using multiple solutions, the pipeline must explicitly deploy the **Data Model layer first**.
- Configure the pipeline to use the **Upgrade** action to delete removed components.
- Maintain a strict **DEV -> UAT -> PROD** environment separation.

## What's Next

Congratulations! You have completed the DevOps module. You now understand how to extract, pack, validate, and deploy Dataverse solutions securely. Next, we shift gears to system connectivity in the **Integration** module.
  `.trim(),
};
