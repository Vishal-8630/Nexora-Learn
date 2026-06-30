import { DocContent } from "@/types/docs";

export const sourceControl: DocContent = {
  title: "Source Control & GitFlow",
  description:
    "Extracting Dataverse solutions to XML, branching strategies, and surviving customizations.xml merge conflicts.",
  content: `
## Why Source Control a Database?

A Dynamics 365 Solution is essentially a massive zip file containing XML definitions of your database schema, forms, views, and workflows. 

Professional teams do not use a single shared Development environment where everyone overwrites each other's work. Instead, each developer gets their own Dev environment, and the configuration is merged via Git.

---

## Unpacking Solutions with \`pac\`

To put a solution into Git, you must "unpack" the \`.zip\` file into human-readable XML files. The Power Platform CLI handles this.

**1. Clone the solution directly from your Dev environment:**
\`\`\`bash
pac solution clone --name "ContosoCore"
\`\`\`

This command automatically exports the unmanaged solution from Dataverse, creates a \`.cdsproj\` MSBuild project, and unpacks all the XML files (Entities, WebResources, Workflows) into a structured folder hierarchy.

**2. Pack the solution (to deploy it):**
If you pull someone else's branch and want to push their changes to your personal Dev environment:
\`\`\`bash
pac solution pack --zipfile ./ContosoCore.zip
pac solution import --path ./ContosoCore.zip
\`\`\`

---

## GitFlow for Dynamics 365

A standard Dynamics 365 branching strategy looks like this:

1.  \`main\`: Represents the exact state of Production.
2.  \`develop\`: Represents the integrated state of all current developer work.
3.  \`feature/xyz\`: A developer creates a branch from \`develop\`, works in their personal Dev environment, runs \`pac solution clone\`, and commits the XML.

When the developer creates a Pull Request into \`develop\`, a CI/CD pipeline should automatically pack the XML into a temporary solution and run the PowerApps Checker to validate it.

---

## Surviving \`customizations.xml\` Merge Conflicts

When two developers modify the exact same component (e.g., the Account Main Form), Git will throw a merge conflict on \`customizations.xml\` or \`FormXml\`.

> [!WARNING]
> **Do NOT blindly resolve XML conflicts!**
> If you accidentally break a closing \`</control>\` tag while resolving a Git conflict, the \`pac solution pack\` command will succeed, but the subsequent import into Dataverse will throw an unreadable schema validation exception.

**How to handle conflicts safely:**
1. Avoid them entirely by coordinating. Developer A works on Account Forms, Developer B works on Contact Forms.
2. If a conflict occurs on a massive XML block (like a Dashboard or Ribbon), it is often safer to accept *your* XML branch, deploy it to a temporary environment, manually apply the other developer's changes in the CRM UI, and re-export the clean XML.
`,
};
