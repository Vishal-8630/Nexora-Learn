import { DocContent } from "@/types/docs";

export const solutionBasics: DocContent = {
  title: "Solution Basics & The Golden Rule",
  description:
    "Understanding Publishers, Prefixes, and why professionals never work in the Default Solution.",
  content: `
## The Golden Rule of Dynamics 365

Let's establish the most important rule of Microsoft Dynamics 365 development before doing anything else:

> [!CAUTION]
> **NEVER CUSTOMIZE THE DEFAULT SOLUTION.**
> If you open the classic interface or the Power Apps portal, you will see a solution named "Default Solution". Never add tables, columns, or web resources here. Doing so creates unmanaged components bound to the default \`new_\` or \`cr...\` prefix, which are nearly impossible to untangle later.

---

## What is a Solution?

A Solution is a container for your customizations (Tables, Columns, Plugins, JavaScript, Flows). It is the mechanism Microsoft provides to transport changes from a Development environment to a Test or Production environment.

If you don't put a component inside your custom solution, it cannot be easily deployed to Production.

---

## Publishers and Prefixes

Every custom Solution must have a **Publisher**. The Publisher defines who created the solution and, crucially, defines the **Prefix**.

If your company is named *Contoso*, you should create a Publisher named "Contoso" with the prefix \`contoso_\`.

*   **Bad (Default):** \`new_accountnumber\` or \`cr1a2_accountnumber\`
*   **Good (Professional):** \`contoso_accountnumber\`

### Why is this important?
Imagine your client buys a 3rd party ISV product (like a marketing add-on) and imports it. If both you and the ISV created a custom column named \`new_score\` on the Contact table, the import will fail due to a naming collision. By using \`contoso_score\`, you guarantee your schema names are globally unique.

---

## Creating Your Development Solution

When starting a new project, follow these steps:

1.  Navigate to Power Apps Maker Portal > **Solutions**.
2.  Click **New Publisher**. Name it after your client or project (e.g., \`AcmeCorp\`), and set the prefix (e.g., \`acme_\`).
3.  Click **New Solution**. Name it after the project (e.g., \`Acme Core CRM\`).
4.  Select the Publisher you just created.

From now on, **only** work inside this specific solution container. When you create a new table, do it from inside this solution. When you add a web resource, do it from inside this solution.
`,
};
