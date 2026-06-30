import { DocContent } from "@/types/docs";

export const layering: DocContent = {
  title: "Solution Layering",
  description:
    "Master the internal stacking mechanics of Dataverse solutions to resolve conflicts and manage technical debt.",
  content: `
## Introduction

When you deploy a Managed Solution into a Dataverse environment, the system does not just overwrite the old database schema. It stacks the new solution on top of the existing components. 

Understanding how these layers interact is the most critical concept for resolving deployment bugs in Production. If a user complains that a deployment "didn't work", Solution Layering is usually the culprit.

## The Layering Stack

Imagine a physical stack of transparent papers.

1. **System Layer (Bottom):** The absolute foundation. This is the out-of-the-box Microsoft schema (e.g., the standard Account and Contact tables).
2. **Managed Layers (Middle):** Every time you import a Managed Solution, it creates a new layer on top. If you import Solution A, and then import Solution B, Solution B sits on top.
3. **Unmanaged Layer (Top):** Also known as the "Active Customizations" layer. Any change made directly in the environment (e.g., an Admin manually opening the form editor in Prod and moving a field) sits at the very top.

## How Conflicts are Resolved

When a user opens an Account form, Dataverse looks down through the stack from the top (Unmanaged) to the bottom (System) to figure out what the form should look like.

**The Top Layer Always Wins.**

### The Danger of the Unmanaged Layer

If you have a strict Azure DevOps pipeline deploying your \\\`Sales App\\\` as a Managed Solution, but a frantic Admin goes directly into Production and manually changes the label of a field from "Revenue" to "Total Revenue", they have created an **Unmanaged Customization** on top of your Managed layer.

Next week, your development team changes the label to "Annual Revenue" and deploys the pipeline. 
**The deployment will succeed, but the users will still see "Total Revenue".** 

Why? Because the manual change in the top Unmanaged layer trumps the Managed layer beneath it. This is why architects strictly forbid manual changes in QA and Prod.

## Merge vs Top Wins

When Managed solutions conflict with each other (e.g., Solution A and Solution B both try to modify the Account form), Dataverse handles it differently based on the component type.

1. **Top Wins (Single-value components):** For simple components like the max length of a text field or a field label, whichever Managed Solution was installed *last* (sits highest in the stack) wins completely.
2. **Merge (Complex components):** For complex XML components like Forms, Views, and Sitemap Ribbons, Dataverse attempts to mathematically merge the XML from both solutions. If Solution A adds a field to the left column, and Solution B adds a field to the right column, Dataverse merges them so both fields appear.

## Removing the Unmanaged Layer (The Fix)

If a rogue admin destroys your layering by making manual changes in Prod, you can fix it.

1. Select the specific component (e.g., the Account Form) in the Maker Portal.
2. Open its **Solution Layers** panel.
3. Click **Remove Active Customizations**. 

This deletes the top Unmanaged layer, allowing the Managed pipeline code underneath to shine through again and properly display your deployed updates.

## Decision Making: Managing Dependencies

Because Managed Solutions stack, you must be careful about dependencies. If Managed Solution B depends on a field inside Managed Solution A, you **cannot** delete Solution A until you delete Solution B first. Always design your solution architecture (e.g., Core vs Sales vs Service) with a clear dependency tree in mind.

## Things to Remember

- Dataverse stacks solutions: **System -> Managed -> Unmanaged**.
- When evaluating what the user sees, the **Top Layer Always Wins**.
- **Never make manual (Unmanaged) changes** in QA or Production.
- Forms and Ribbons use **Merge logic**, while simple fields use **Top Wins**.
- You can fix broken environments by **Removing Active Customizations**.

## What's Next

Layering handles the deployment mechanics, but the actual database structure must be designed correctly first. We move to **Domain Modeling**.
  `.trim(),
};
