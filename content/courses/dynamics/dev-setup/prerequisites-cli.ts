import { DocContent } from "@/types/docs";

export const prerequisitesCli: DocContent = {
  title: "Prerequisites & Power Platform CLI",
  description:
    "The mandatory workstation setup for a Dynamics 365 developer, including Visual Studio, Node.js, and managing authentication profiles via the pac CLI.",
  content: `
## The Dynamics 365 Developer Workstation

Setting up your workstation correctly is the most critical first step. Unlike standard web development, Dynamics 365 development requires a hybrid toolset spanning .NET, Node.js, and proprietary Microsoft tooling.

### Core Prerequisites

Before touching any code, ensure you have the following installed:

1. **Visual Studio 2022**: Essential for C# Plugin development. Ensure you install the **.NET desktop development** workload. *(VS Code is not sufficient for plugin development due to the lack of robust MSBuild and remote debugging support).*
2. **Node.js (LTS)**: Required for PCF (Power Apps Component Framework) and modern Web Resource development (TypeScript/Webpack).
3. **.NET Framework 4.6.2 & .NET 6+**: Plugins still heavily rely on .NET Framework 4.6.2, while newer tooling relies on modern .NET.

> [!WARNING]
> **Avoid the Microsoft Store versions!**
> Do not install Node.js or Python from the Microsoft Store. Always download the official installers to avoid strict PATH and permission issues when running CLI tools.

---

## Power Platform CLI (pac)

The Power Platform CLI (\`pac\`) is the absolute center of a modern Dynamics developer's workflow. It replaces legacy tools like the SDK Plugin Registration Tool for many tasks.

### Installation

Install it globally via Visual Studio Code extensions (Power Platform Tools) or via the Windows MSI. The easiest way for developers is often via the .NET Global Tool:

\`\`\`bash
dotnet tool install --global Microsoft.PowerApps.CLI.Tool
\`\`\`

### Managing Environments (\`pac auth\`)

As a developer, you will likely work across multiple environments (Dev, UAT, Production) and multiple client tenants. Managing these connections via the CLI is critical.

**1. Create a Connection Profile:**
\`\`\`bash
pac auth create --url https://your-dev-env.crm.dynamics.com --name "ProjectA-Dev"
\`\`\`
*This will open a browser to authenticate. Use your developer credentials.*

**2. List Your Profiles:**
\`\`\`bash
pac auth list
\`\`\`

**3. Switch Active Environments:**
Before running a solution export or deploying a PCF control, ensure you are pointed to the correct environment!
\`\`\`bash
pac auth select --index 1
\`\`\`

> [!TIP]
> **Pro Tip for Consultants**
> If you are a consultant working across different client Azure tenants, you will frequently encounter token cache issues. Use \`pac auth clear\` to wipe your cached credentials when Edge gets confused about which identity you are trying to use.

---

## Conclusion

With VS2022, Node.js, and the \`pac\` CLI authenticated against your Dev environment, your terminal is ready. Next, we will configure the graphical tools essential for daily survival.
`,
};
