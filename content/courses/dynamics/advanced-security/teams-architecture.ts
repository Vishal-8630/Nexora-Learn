import { DocContent } from "@/types/docs";

export const teamsArchitecture: DocContent = {
  title: "Access Teams vs Owner Teams",
  description:
    "When to use lightweight Access Teams to prevent POA (Principal Object Access) table bloat.",
  content: `
## The "Share" Button Problem

In Dynamics 365, if a user clicks the "Share" button on an Account and shares it with another user, Dataverse writes a row into an internal SQL table called the **Principal Object Access (POA)** table.

If you have 1,000 users constantly sharing millions of records with each other, the POA table explodes in size. A massive POA table will destroy the performance of the entire CRM, causing basic views to take 30 seconds to load.

To avoid this, we use **Teams**.

---

## Type 1: Owner Teams

An Owner Team is essentially a virtual user. 

*   You assign a Security Role directly to the Team.
*   You make the Team the **Owner** of a record.
*   Any user added to that Team instantly inherits the team's Security Roles and gains access to the records owned by the team.

**When to use:**
When a record belongs to a department rather than an individual. (e.g., A "Tier 1 Support Queue" team owns an incoming Case until a specific human takes it).

---

## Type 2: Access Teams (The Performance Savior)

Access Teams were introduced specifically to stop POA table bloat.

Instead of users clicking "Share" and manually picking permissions, an Access Team is a lightweight, system-managed template attached to a specific record.

### How it works:
1. You create an **Access Team Template** for the Account table (e.g., "Account VIP Sales Squad") and define the permissions (Read, Write, Append).
2. You place a Subgrid on the Account form pointed to "All Record Types > Users".
3. When John wants to collaborate on an Account with Sarah, he does not click "Share". Instead, he adds Sarah to the Access Team subgrid directly on the Account form.

### Why is this better?
Dataverse caches Access Team permissions much more efficiently than manual POA shares. Furthermore, if you need to revoke access, you simply remove Sarah from the subgrid, rather than digging through the "Shared With" menu.

> [!IMPORTANT]
> **C# Automation**
> Access Teams are brilliant for automated sharing. If your C# plugin needs to grant access to a record, do not use a \`GrantAccessRequest\` (which creates a raw POA share). Instead, use an \`AddUserToRecordTeamRequest\` to silently add the user to the record's Access Team.
`,
};
