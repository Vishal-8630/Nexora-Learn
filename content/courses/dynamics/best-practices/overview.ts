import { DocContent } from "@/types/docs";

export const bestPracticesOverview: DocContent = {
  title: "Architecture & Best Practices",
  description:
    "A curated collection of architectural patterns, performance guidelines, and governance recommendations for building robust Dynamics 365 solutions.",
  content: `
## Introduction

Dynamics 365 and Dataverse are incredibly flexible platforms. You can achieve the exact same business requirement in five different ways (e.g., a Business Rule, a Plugin, a Workflow, a Power Automate Flow, or JavaScript).

However, choosing the *wrong* way can lead to technical debt, severe performance degradation, and unmaintainable architecture. Following established enterprise best practices ensures your system scales securely.

## 1. The Customization Hierarchy

When presented with a business requirement, a Senior Developer always starts at the top of this hierarchy and only moves down if absolutely necessary.

\`\`\`text
1. Out-of-the-Box (OOTB)
        │
2. No-Code (Business Rules / Calculated Columns)
        │
3. Low-Code (Power Automate)
        │
4. Client-Side Pro-Code (JavaScript)
        │
5. Server-Side Pro-Code (C# Plugins / Azure Functions)
\`\`\`

**Decision Making:**
Why this order? Because **code is a liability**. Every line of C# or JavaScript you write is code your team must maintain, upgrade, and regression test during the next Microsoft biannual release. OOTB features are maintained by Microsoft for free.

## 2. Performance Best Practices

Performance is the most common complaint in poorly designed Dynamics 365 systems.

- **Minimize Synchronous Logic:** If a user clicks "Save" and has to wait 10 seconds for the screen to refresh while a synchronous plugin runs, they will hate the system. Move heavy processing to Asynchronous Plugins, background Power Automate flows, or Azure Service Bus.
- **Never Query "Select *":** Whether in C# (\\\`new ColumnSet(true)\\\`), JavaScript OData, or Power Automate, always explicitly select the exact 2 or 3 columns you need. Querying all 300 columns on the Account table for 10,000 records will destroy SQL performance and crash the system.
- **Avoid RetrieveMultiple Plugins:** Intercepting the read queries for data grids is a massive performance bottleneck. Use the standard Security Model (Business Units, Teams) for data restriction whenever possible.
- **Collapse Form Tabs:** In Model-Driven Apps, put non-essential data in collapsed tabs. Controls and subgrids inside a collapsed tab do not render until the user clicks the tab, drastically speeding up the initial form load time.

## 3. Data Modeling Best Practices

- **Don't create a table for everything:** If a client asks for an "Approved Vendor" list, do you need a custom \\\`new_Vendor\\\` table? Often, the standard \\\`Account\\\` table with a custom "Type = Vendor" choice field is much better, because it instantly inherits all the standard Account functionality (integration, AI insights, etc.).
- **Understand Ownership:** Choose carefully between Organization-owned and User/Team-owned tables. Once a table is created, you cannot change its ownership type. If the data will ever require row-level security, it must be User/Team owned.
- **Use standard columns first:** If you need a "First Name" field on a Contact, do not create \\\`new_firstname\\\`. Use the existing \\\`firstname\\\` column. Standard columns are deeply wired into native search, AI, and integration features.

## 4. Coding Standards

- **Early Bound vs Late Bound:** Use Early Bound C# classes for complex projects. The compile-time safety and IntelliSense prevent bugs that Late Bound string typos cause at runtime.
- **Namespace your JavaScript:** Always wrap your JS in a unique namespace (e.g., \\\`Contoso.Sales.AccountForm\\\`) to prevent global function collisions.
- **No DOM Manipulation:** Never use \\\`document.getElementById()\\\` or jQuery in Dynamics 365. Always use the officially supported \\\`formContext\\\` API.

## 5. ALM and Governance

- **Never develop in Production:** All changes, no matter how small, must originate in Dev and flow to Prod via a **Managed Solution**.
- **Keep solutions focused:** Use segmented solutions. Do not add the entire Account table to your solution if you only added one new column to it. Add only that specific column.
- **Use Environment Variables:** Never hardcode URLs, API keys, or admin email addresses in flows or plugins. Secure API keys using **Azure Key Vault**.

## Common Mistakes

> [!CAUTION]
> **The "God" Plugin** 
> A common beginner mistake is creating a single plugin step on the Account \\\`Update\\\` message, *without* filtering attributes, that contains 5,000 lines of \\\`if/else\\\` statements to handle every possible business scenario. This plugin fires every time anyone touches any field on the Account, destroying system performance and becoming impossible to debug. 
> **Fix:** Build small, modular plugins bound to highly specific filtering attributes.

## Things to Remember

- Follow the **Customization Hierarchy**: Code is a last resort.
- **Performance** is dictated by synchronous logic and massive SQL queries.
- **Never manipulate the DOM** in JavaScript.
- Always deploy **Managed Solutions**.

## What's Next

We have reviewed the core best practices for writing code. Let's look at one of the most powerful modern code-first capabilities in the platform: **Custom APIs**.
  `.trim(),
};
