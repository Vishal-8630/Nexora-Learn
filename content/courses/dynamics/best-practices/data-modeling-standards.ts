import { DocContent } from "@/types/docs";

export const dataModelingStandards: DocContent = {
  title: "Data Modeling Best Practices",
  description:
    "When to use polymorphic lookups, choices vs lookups, and avoiding table bloat.",
  content: `
## 1. Option Sets (Choices) vs Lookup Tables

A constant architectural debate: *"Should this dropdown be a Choice column, or should I create a new Table and use a Lookup?"*

### Use a Choice (Option Set) when:
*   The list of values is small (under 20).
*   The values rarely change (e.g., Status: \`Active\`, \`Inactive\`, \`Pending\`).
*   The values do not require additional metadata (e.g., a "Country" doesn't just need a name; it usually needs a Code, a Region, and a Currency. That requires a table).

### Use a Lookup Table when:
*   The list changes frequently, and end-users need to add values without IT intervention.
*   There are hundreds of values (e.g., a list of all US Cities).
*   You need to establish cascading security rules (e.g., if you own the "Region" record, you can see all Accounts in that Region).

---

## 2. Understanding Polymorphic Lookups

A standard Lookup column points to exactly one table (e.g., the \`Primary Contact\` lookup on an Account can *only* point to the Contact table).

A **Polymorphic Lookup** can point to multiple different tables. The most famous example is the \`Customer\` lookup on an Opportunity, which can point to *either* an Account *or* a Contact.

**When to use them:**
Only use them when strictly necessary (e.g., tracking an Activity that could be "Regarding" an Account, Lead, or Case). They make reporting in Power BI and fetching data via OData significantly more complex, as you constantly have to evaluate the \`LogicalName\` of the returned GUID to figure out what table you are actually looking at.

---

## 3. The "God Table" Anti-Pattern

Junior architects often attempt to build a single "God Table" (e.g., a \`Transaction\` table) that holds 500 columns representing Sales, Invoices, Returns, and Support Tickets, using a "Type" dropdown to determine what the record is.

**Why this fails:**
Dataverse tables have a hard limit of 1024 columns (dictated by the underlying SQL Server limits). Furthermore, every time you query a God Table, you load massive amounts of irrelevant \`null\` columns into memory.

**The Solution:**
Use specialized tables (\`Invoice\`, \`Return\`, \`Ticket\`). If they share common data, utilize Dataverse's **Activity** table inheritance, or build a separate lightweight \`Financial Summary\` table that relates to the specific transaction types.
`,
};
