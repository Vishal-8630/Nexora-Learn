import { DocContent } from "@/types/docs";

export const realWorldOverview: DocContent = {
  title: "Real-world Scenarios Overview",
  description:
    "Bringing it all together: A capstone review of how the disparate components of Dataverse are combined to solve complex, real-world enterprise requirements.",
  content: `
## Introduction

Throughout this curriculum, we have isolated specific features: Tables, Plugins, Power Automate, PCF Controls, and Azure Integration.

However, in the real world, a business requirement is rarely solved by a single feature. If the business asks for "Automated Invoice Generation", you don't just use a Word Template. You need a Ribbon Button (JavaScript) to trigger an Action (Custom API), which fires a Plugin (C#) to calculate tax, which triggers Power Automate to generate the document and email the client.

## The Capstone Phase

This final phase serves as a capstone. We will look at 10 classic enterprise requirements that every Dynamics 365 architect will eventually face.

For each scenario, we will dissect:
1. **The Business Requirement:** What the user actually asked for.
2. **The Naive Approach:** How a beginner might solve it (and why it fails).
3. **The Enterprise Architecture:** How a senior architect solves it by combining multiple Dataverse tools.

## The Scenarios

We will cover end-to-end implementations for:
- Core CRM automation (Lead-to-Opportunity, Approvals, Invoicing)
- UI/UX enhancements (Role-based Dashboards, PCF, Ribbon Commands)
- Portal integration (Power Pages with Auth)
- Backend data pipelines (Bulk Import, Background Processing, Azure Functions)

## Things to Remember

- Enterprise solutions require **combining multiple platform features**.
- Always look past the user's initial request to understand the **underlying technical scale**.
- The "Enterprise Architecture" is usually the one that avoids synchronous UI blocks and leverages the cloud.

## What's Next

Let's start with the most fundamental CRM process in existence: Automating the **Lead-to-Opportunity** qualification pipeline.
  `.trim(),
};
