import { DocContent } from "@/types/docs";

export const solutionSegmentation: DocContent = {
  title: "Solution Segmentation",
  description:
    "Review the ultimate architectural pattern for massive ALM deployments, strictly separating Data, Logic, and UI into layered deployment vehicles.",
  content: `
## Introduction

In our earlier discussion on Solution Architecture, we introduced the concept of the Monolith vs the Segmented Solution. 

While the Monolith is fine for a 2-developer team building a small app, it will destroy a 50-person enterprise rollout. When multiple scrum teams attempt to merge their changes into a single massive ZIP file, Azure DevOps pipelines will fail, components will be overwritten, and deployment times will skyrocket.

To solve this, architects use **Solution Segmentation**.

## The Three-Tier Architecture

The industry standard for segmenting Dataverse solutions mirrors classic three-tier software architecture. 

You create three distinct Solutions, which are deployed by the Release Pipeline in a strict, sequential order.

### Layer 1: Data Model (The Foundation)
**Solution Name:** \\\`Contoso_Base_DataModel\\\`
- **Contents:** Only Tables, Columns, Relationships, Alternate Keys, and OptionSets. 
- **Rule:** There is absolutely no logic or UI in this solution.
- **Why:** The Data Model rarely changes once established. By isolating it, you can deploy it once and leave it alone, avoiding the massive overhead of exporting the schema every time you tweak a C# plugin.

### Layer 2: Business Logic (The Core)
**Solution Name:** \\\`Contoso_Core_Logic\\\`
- **Contents:** C# Plugins, Power Automate Flows, Classic Workflows, and Business Rules.
- **Rule:** This layer depends on Layer 1. The C# code needs the tables to exist. 
- **Why:** Developers modify plugins daily. Isolating them in this solution allows the CI/CD pipeline to compile the DLLs, pack a tiny ZIP file, and deploy it to QA in under 2 minutes.

### Layer 3: User Interface (The Presentation)
**Solution Name:** \\\`Contoso_Sales_App\\\`
- **Contents:** Model-Driven Apps, Canvas Apps, Forms, Views, PCF Controls, and JavaScript Web Resources.
- **Rule:** This layer depends on Layer 1 and Layer 2. The Form needs the tables to exist, and the JavaScript might call a Custom API defined in the Logic layer.
- **Why:** UI developers iterate constantly. They can deploy UI tweaks rapidly without accidentally triggering a re-compilation of the C# code.

## Handling the "Include All Components" Checkbox

The most critical rule of Solution Segmentation occurs when a developer adds a Table (e.g., \\\`Account\\\`) to the UI Solution so they can customize the Form.

When adding an existing table to a solution in the maker portal, Dataverse provides a checkbox: **"Include All Components"**.

> [!CAUTION]
> **Destroying the Segmentation**
> If a developer checks "Include All Components" when adding the Account table to the UI Solution, they instantly destroy the segmentation. 
> The system will copy all columns, all plugins, and all relationships into the UI solution. The UI solution becomes a Monolith, and the ALM pipeline is ruined.

**Architectural Rule:** When adding tables to segmented solutions, always uncheck "Include All Components". Only select the exact components you intend to modify (e.g., Select *only* the "Account Main Form"). This keeps the solution payload microscopic.

## Things to Remember

- Segment enterprise deployments into **Data, Logic, and UI** solutions.
- Dependencies flow strictly downward: **UI -> Logic -> Data**.
- Never check **"Include All Components"** unless absolutely necessary.
- Deployments must run in a strict sequence to satisfy missing dependencies.

## What's Next

Congratulations! You have completed the Architecture phase. The curriculum is nearly complete. We have covered the fundamental technical aspects of the platform. All that remains is learning how to integrate Dynamics 365 with the rest of the world. Next, we cover **Azure Integration**.
  `.trim(),
};
