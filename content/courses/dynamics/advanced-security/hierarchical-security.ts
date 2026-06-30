import { DocContent } from "@/types/docs";

export const hierarchicalSecurity: DocContent = {
  title: "Hierarchical Security Models",
  description:
    "Implementing Manager vs Position hierarchies for complex record sharing.",
  content: `
## The Limitation of Business Units

Standard Security Roles are tied to **Business Units**. If a user has "Local" (Yellow/Half-Circle) Read access to Opportunities, they can see all Opportunities owned by anyone in their specific Business Unit.

But what if you have a massive Sales division all in one Business Unit, and a Sales Manager should *only* be able to see the Opportunities owned by their direct reports, not the entire division?

This requires **Hierarchical Security**.

---

## Enabling Hierarchical Security

Hierarchical Security is turned off by default because it requires Dataverse to constantly calculate massive relationship trees every time a user runs a query.

To enable it:
1. Go to Power Platform Admin Center > Settings > Users + permissions > **Hierarchy security**.
2. Check **Turn on Hierarchy Modeling**.

Once enabled, you have two distinct models to choose from. **You can only pick one per environment.**

---

## Model 1: The Manager Hierarchy

This model relies on the **Manager** lookup field on the \`SystemUser\` table.

*   If John is Mary's Manager, John can automatically Read, Write, and Append to any record owned by Mary.
*   If Mary is Peter's Manager, John can also Read (but not Write) Peter's records (Read-only access rolls up the chain).

**Best for:** Companies with strict, traditional reporting structures.

---

## Model 2: The Position Hierarchy

This model does not care who your manager is. Instead, it relies on a custom table called **Position** (\`position\`).

You build a tree of Positions:
*   VP of Sales
    *   Regional Director
        *   Account Executive

Users are then assigned to these Positions. 
*   If Sarah is the Regional Director, she has full access to the records owned by all Account Executives under her branch of the tree, regardless of who their actual HR manager is.

**Best for:** Matrix organizations, or companies where a single "Manager" lookup doesn't accurately reflect who needs data access (e.g., a Project Manager needing access to an Engineer's records).

---

## Performance Considerations

> [!CAUTION]
> **The Depth Limit**
> By default, Dataverse will only calculate hierarchy access up to **3 levels deep**. If you have a 10-level deep organizational chart, the CEO will not be able to see the records of a junior intern at the bottom. You can change this depth limit in the Admin Center, but setting it higher than 5 can cause massive SQL performance degradation on complex queries.
`,
};
