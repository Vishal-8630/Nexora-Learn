import { DocContent } from "@/types/docs";

export const gitBranching: DocContent = {
  title: "Git Branching Strategies",
  description:
    "Learn how to apply standard Git branching models to Dataverse solutions to enable parallel development and seamless hotfixes.",
  content: `
## Introduction

Because the Power Platform Build Tools unpack Dataverse solutions into raw XML files, you can (and must) use standard Git source control practices.

However, resolving a Git Merge Conflict in a Dataverse XML file is notoriously difficult. If two developers modify the exact same Form XML, the resulting merge conflict is often unreadable. 
Therefore, establishing a strict Git Branching strategy is critical to minimize collisions in enterprise environments.

## The Feature Branch Workflow

The industry standard for Dynamics 365 development is the **Feature Branch Workflow** (often simplified from GitFlow).

### 1. The Main Branch (\\\`main\\\`)
This branch represents the exact state of your **Production** environment. 
- You never commit directly to \\\`main\\\`.
- The Release Pipeline that deploys to Production is triggered exclusively from \\\`main\\\`.

### 2. The Development Branch (\\\`dev\\\`)
This branch represents the integrated state of all current work, and mirrors your integrated **DEV** Dataverse environment.
- Nightly Build Pipelines run against this branch.

### 3. Feature Branches (\\\`feature/new-sales-form\\\`)
When Developer A is assigned a ticket to build a new Sales Form, they:
1. Branch off \\\`dev\\\` to create \\\`feature/new-sales-form\\\`.
2. Build the form in their *personal* Dev Dataverse environment.
3. Export the solution, unpack it, and commit the XML to their feature branch.
4. Create a **Pull Request (PR)** to merge their feature branch back into \\\`dev\\\`.

By forcing developers to work in isolated feature branches and personal Dataverse environments, you ensure that half-finished, broken code is never accidentally exported and deployed to QA.

## Handling Merge Conflicts (Real-World Perspective)

Despite best efforts, merge conflicts will happen.

*Scenario:* Developer A adds a "Revenue" field to the Main Form. Developer B adds a "Territory" field to the same Main Form. They both create Pull Requests to \\\`dev\\\`. 
The first PR merges fine. The second PR throws a Merge Conflict in the \\\`customizations.xml\\\` file.

> [!CAUTION]
> **Never guess the XML.** 
> The Form XML schema is incredibly strict. If you manually delete the wrong closing \\\`</row>\\\` tag in a text editor to resolve the conflict, the XML will become invalid. When the pipeline packs it into a ZIP and tries to import it, Dataverse will throw a fatal schema validation error, breaking the entire pipeline.

**How to resolve it properly:**
1. **Re-Integrate in Dataverse:** The safest way to resolve a Dataverse merge conflict is to have Developer B pull the latest \\\`dev\\\` code (which now contains Developer A's "Revenue" field) into their local machine.
2. Developer B packs it and imports it into their personal Dataverse environment.
3. Developer B then uses the drag-and-drop Form Designer in the browser to place their "Territory" field next to the "Revenue" field.
4. Finally, Developer B re-exports the solution and commits the clean, system-generated XML.

## The Hotfix Branch

What happens if a critical bug is discovered in Production, but the \\\`dev\\\` branch is currently full of half-finished features for next month's release? You cannot deploy \\\`dev\\\` to Prod.

You use a **Hotfix Branch**.
1. Create a branch named \\\`hotfix/bug-name\\\` directly off the \\\`main\\\` branch.
2. Spin up a temporary Dataverse environment and import the code from the hotfix branch.
3. Fix the bug, unpack, and commit back to the hotfix branch.
4. Merge the hotfix branch directly into \\\`main\\\` (triggering an emergency Prod deployment).
5. Crucially, merge the hotfix branch *down* into \\\`dev\\\` so the bug doesn't accidentally get reintroduced in next month's release.

## Things to Remember

- Never commit directly to **\\\`main\\\`**.
- Use **Feature Branches** to isolate incomplete work in personal developer environments.
- Resolve complex XML merge conflicts by **re-integrating in the Dataverse UI**, not by manually editing XML tags.
- Use **Hotfix Branches** off \\\`main\\\` for emergency production bugs.

## What's Next

Now that we have covered how to build and version our code, we need to understand how the tools that execute these pipelines actually work. Let's look at the **Power Platform Build Tools**.
  `.trim(),
};
