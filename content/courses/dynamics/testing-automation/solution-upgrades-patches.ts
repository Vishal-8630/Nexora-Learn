import { DocContent } from "@/types/docs";

export const solutionUpgradesPatches: DocContent = {
  title: "Solution Upgrades vs Patches",
  description:
    "Understanding the critical differences between importing an Update, an Upgrade, and a Patch.",
  content: `
## Deploying Changes to Production

When you import a Managed Solution into Production that already exists (e.g., deploying version 1.1 on top of version 1.0), you are presented with options on how Dataverse should handle the deployment.

Understanding these options is the difference between a successful deployment and accidentally deleting Production data.

---

## 1. Upgrade (The Enterprise Standard)

When you select **Upgrade** during import, Dataverse performs a two-step process:
1. It imports Version 1.1 into the system alongside Version 1.0.
2. Once the import is successful, it **deletes Version 1.0**.

**Why use Upgrade?**
This is the only way to delete components from a target environment. If you deleted a column from the Account table in Dev, and you import as an Upgrade, Dataverse sees the column is missing in 1.1, looks at 1.0, and deletes the column from Production (along with all data in that column).

> [!CAUTION]
> **Data Loss Risk**
> Upgrades are dangerous. If a developer accidentally removed a Table from the solution in Dev (even if they didn't delete it from the system, just removed it from the Solution container), the Upgrade process in Production will assume it needs to be deleted and will wipe out the entire table.

---

## 2. Update (The Safe Additive Approach)

When you select **Update**, Dataverse simply merges Version 1.1 into Version 1.0.

**Why use Update?**
It is strictly additive. If you add a new column, it gets added. If you removed a column from your Solution in Dev, the Update process ignores the removal. The column will remain in Production. This prevents accidental data loss but leaves "garbage" components in UAT/Production over time.

---

## 3. Patches (The Hotfix Approach)

Sometimes you have a massive solution (CoreCRM) that takes 45 minutes to import. You discover a typo in a JavaScript file in Production that needs an instant fix. You don't want to wait 45 minutes to deploy the entire CoreCRM solution.

You use a **Patch**.

1. In Dev, select the CoreCRM solution and click **Clone a Patch**.
2. This creates a tiny, empty solution named \`CoreCRM_Patch_1\`.
3. Add *only* the broken JavaScript file to the Patch. Fix the typo.
4. Export the Patch and import it to Production. It will import in 30 seconds.

**Rolling up Patches:**
You cannot have infinite patches. Eventually, you must go back to Dev, select the original CoreCRM solution, and click **Clone Solution**. This rolls all existing Patches back into the main solution and increments the Major/Minor version.
`,
};
