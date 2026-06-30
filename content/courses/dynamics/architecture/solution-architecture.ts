import { DocContent } from "@/types/docs";

export const solutionArchitecture: DocContent = {
  title: "Solution Architecture",
  description:
    "Define the overarching strategy for organizing Dataverse components into logical, deployable Solution packages.",
  content: `
## Introduction

A Dataverse "Solution" is essentially a ZIP file that acts as a deployment vehicle for your codebase and database schema. 

When an organization decides to build a new custom application, the first and most consequential question the architect must answer is: *"Do we put everything into one massive solution, or break it up?"*

## The Monolithic Strategy: One Solution per Application

For most mid-sized projects, the standard approach is a single solution per distinct business application.

**Example:** You are building an app for the HR team to manage onboarding.
- Create a Solution: \\\`Contoso Onboarding\\\`
- Inside it, put the \\\`Employee\\\` table, the \\\`Onboarding Task\\\` table, the Canvas App, and the C# Plugins.

**Decision Making (When to use):**
- **Pros:** It is incredibly easy to deploy via Azure DevOps. You never have to worry about missing dependencies because everything is in one single ZIP file.
- **Cons:** If 15 developers are working on the HR app simultaneously, they will step on each other's toes during Source Control merges, and exporting the massive ZIP file takes a long time.

## The Segmented Strategy: Layer-Based

For massive enterprise deployments (e.g., a Global Sales rollout involving 50 developers), a single solution is a bottleneck. The architect must physically segment the solution.

**Example:**
- Solution 1: \\\`Contoso Sales Data Model\\\` (Contains only the Tables and Columns).
- Solution 2: \\\`Contoso Sales Plugins\\\` (Contains only the C# Assemblies).
- Solution 3: \\\`Contoso Sales UI\\\` (Contains the Model-Driven App and Web Resources).

**Decision Making (When to use):**
- **Pros:** The Plugin team can compile and deploy their code to QA independently of the UI team. Build pipelines are lightning fast.
- **Cons:** **Dependency Hell**. If the Plugin team writes code that triggers off a new \\\`Territory\\\` column, but the Data Model team hasn't deployed the \\\`Territory\\\` column to QA yet, the Plugin deployment will crash.

## Managing Dependencies (The Architect's Job)

If you choose a segmented architecture, you must strictly manage dependencies.

Dataverse tracks dependencies natively. If Solution B uses a table from Solution A, Dataverse will explicitly block you from deleting Solution A until Solution B is removed.

> [!IMPORTANT]
> **Architectural Rule:** Dependencies must always flow **downward**, never upward or circularly.
> - *UI* depends on *Plugins*.
> - *Plugins* depend on *Data Model*.
> - *Data Model* depends on absolutely nothing.

If you create a circular dependency (Solution A needs a field from Solution B, but Solution B needs a workflow from Solution A), you have destroyed your ALM process and neither solution can be deployed independently.

## Things to Remember

- Use **Single Solutions** for simple, isolated apps or small teams.
- Use **Segmented Solutions** (Data, Logic, UI) for massive enterprise rollouts.
- Manage dependencies strictly; dependencies must flow **downward**.
- Avoid **Circular Dependencies** at all costs.

## What's Next

Segmenting solutions is the hallmark of professional enterprise deployments. Next, we dive deeper into the specific patterns of **Solution Segmentation**.
  `.trim(),
};
