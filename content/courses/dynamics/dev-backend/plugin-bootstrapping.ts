import { DocContent } from "@/types/docs";

export const pluginBootstrapping: DocContent = {
  title: "Plugin Bootstrapping & PRT Basics",
  description:
    "How to quickly scaffold a C# Plugin project, sign the assembly, and register it in Dataverse.",
  content: `
## Bootstrapping a Plugin Project

While you can technically create a blank Class Library (.NET Framework 4.6.2) in Visual Studio, the fastest and most reliable way to start a new Dynamics 365 plugin project is using the Power Platform CLI.

\`\`\`bash
pac plugin init --server-class true
\`\`\`

This command scaffolds a complete Visual Studio solution containing:
1. A strongly-named \`.snk\` key file (mandatory for Dynamics plugins).
2. The correct NuGet packages (\`Microsoft.CrmSdk.CoreAssemblies\`).
3. A base \`PluginBase\` class that drastically reduces the boilerplate code needed to initialize the \`ITracingService\` and \`IOrganizationService\`.

---

## The Strong Name Key (.snk)

Every custom assembly uploaded to Dataverse **must be signed** with a strong name key. 

If you create a project manually:
1. Right-click your Project in Visual Studio > **Properties**.
2. Go to **Signing**.
3. Check **Sign the assembly**.
4. Choose **<New...>** and create a key (a password is not required).

> [!CAUTION]
> **Source Control Warning**
> Check the \`.snk\` file into Git! If another developer clones your repo and builds the project without the original key, Visual Studio will generate a new one. This changes the public key token of the DLL. When you deploy, Dataverse will think it is a completely new plugin rather than an update, breaking all your registered steps.

---

## The Plugin Registration Tool (PRT)

Once your DLL is compiled, you must tell Dataverse *when* to execute it. This is done via the Plugin Registration Tool.

1.  Open the PRT via XrmToolBox or \`pac tool prt\`.
2.  Click **Register > Register New Assembly**.
3.  Select your compiled \`.dll\`. Ensure "Isolation Mode" is **Sandbox** and "Location" is **Database**.
4.  Right-click the newly registered assembly and click **Register New Step**.

### Key Step Configurations
*   **Message**: What event triggers this? (e.g., \`Create\`, \`Update\`, \`Delete\`).
*   **Primary Entity**: What table does this happen on? (e.g., \`account\`).
*   **Stage**: 
    *   **Pre-Validation**: Runs before security checks. Good for throwing errors.
    *   **Pre-Operation**: Runs before the SQL transaction saves. *Crucial for modifying the record being saved without requiring a second \`service.Update()\` call.*
    *   **Post-Operation**: Runs after the SQL save. The record now has a GUID. Good for creating related child records.
*   **Execution Mode**: **Synchronous** (blocks the UI until done) or **Asynchronous** (runs in the background).
`,
};
