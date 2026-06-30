import { DocContent } from "@/types/docs";

export const dependencyManagement: DocContent = {
  title: "Dependency Management (NuGet & ILMerge)",
  description:
    "How to include external NuGet packages (like Newtonsoft.Json) in your Dynamics 365 plugins.",
  content: `
## The Problem with External Dependencies

If you build a standard .NET Console Application and install \`Newtonsoft.Json\` via NuGet, Visual Studio downloads the \`Newtonsoft.Json.dll\` and puts it in your \`/bin/Debug\` folder alongside your \`MyConsoleApp.exe\`.

Dynamics 365 plugins do not work like this. When you use the Plugin Registration Tool, you can only upload **one single .dll file**. If your plugin code references \`Newtonsoft.Json\`, Dataverse will throw a \`FileNotFoundException\` at runtime because the Dataverse sandbox does not have \`Newtonsoft.Json.dll\` installed.

---

## The Legacy Solution: ILMerge

For over a decade, developers used a tool called **ILMerge** (or ILRepack). 

ILMerge is a post-build task that literally takes your \`MyPlugin.dll\` and the external \`Newtonsoft.Json.dll\`, rips them apart, and physically fuses them together into a single, massive \`MyPlugin.dll\`.

**How to use it (Legacy):**
1. Install the \`ILMerge.MSBuild.Task\` NuGet package into your Plugin project.
2. Ensure "Copy Local" is set to \`True\` for your external dependencies in Visual Studio.
3. Build the project. The MSBuild task runs in the background and fuses the files.
4. Upload the fused DLL to the Plugin Registration Tool.

> [!WARNING]
> **Microsoft Unsupported**
> Microsoft explicitly states that using ILMerge for Dynamics 365 plugins is **unsupported**. While it works 99% of the time, it frequently breaks when trying to merge complex networking or cryptographic libraries.

---

## The Modern Solution: Dependent Assemblies

In recent years, Microsoft finally released a native, supported solution: **Dependent Assemblies**.

Instead of fusing the files together, you can now package your \`MyPlugin.dll\` and all external NuGet \`.dll\` files into a single NuGet \`.nupkg\` package and upload the entire package to Dataverse.

### How to use Dependent Assemblies (via pac CLI)

The easiest way to utilize this is by scaffolding your project with the Power Platform CLI:

\`\`\`bash
pac plugin init --server-class true
\`\`\`

1. Add your NuGet packages to the project normally (e.g., \`dotnet add package Newtonsoft.Json\`).
2. Build your project (\`dotnet build\`).
3. Because the project was scaffolded by \`pac plugin init\`, it uses the modern SDK MSBuild targets. During the build, it automatically generates a NuGet package (\`.nupkg\`) in your \`/bin/Debug\` folder.
4. Open the Plugin Registration Tool.
5. Instead of selecting "Register New Assembly", select **Register New Package**.
6. Select the \`.nupkg\` file.

Dataverse will unpack the package on the server, extract your plugin, and ensure the external dependencies are natively available to the sandbox at runtime. No ILMerge required!
`,
};
