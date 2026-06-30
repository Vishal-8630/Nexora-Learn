import { DocContent } from "@/types/docs";

export const sharedLibraries: DocContent = {
  title: "Shared Libraries (ILMerge vs Dependent Assemblies)",
  description:
    "Understand the architectural shift from ILMerge to Dependent Assemblies for managing NuGet packages and shared code in Dataverse.",
  content: `
## Introduction

In enterprise C# development, you rarely write everything from scratch. You rely on external libraries (like \\\`Newtonsoft.Json\\\` for API integrations) or internal corporate libraries (like \\\`Contoso.Logging.dll\\\`).

Historically, referencing an external DLL inside a Dataverse Plugin was incredibly difficult because the Dataverse Sandbox only allowed you to upload a **single DLL file** per Plugin Assembly.

## The Old Way: ILMerge

For over a decade, architects used a hack called **ILMerge** (or ILRepack). 

If a developer wrote a Plugin (1MB) that relied on \\\`Newtonsoft.Json\\\` (5MB), the build pipeline would use the ILMerge executable to physically smash the two DLLs together into a single, massive 6MB DLL. This mutant DLL was then uploaded to Dataverse.

**The Problems with ILMerge:**
- It is officially unsupported by Microsoft.
- It frequently corrupts complex assemblies.
- If 10 different Plugin Assemblies all merged \\\`Newtonsoft.Json\\\`, you uploaded 50MB of redundant binary data to the Dataverse database, destroying capacity.

## The New Way: Dependent Assemblies (Plugin Packages)

In recent years, Microsoft officially solved this problem by introducing **Dependent Assemblies** (also known as Plugin Packages).

Using the PAC CLI (specifically \\\`pac plugin init\\\`), developers can create a new project type that utilizes standard NuGet \\\`PackageReference\\\` tags. 
When the project is compiled, the PAC CLI grabs the primary Plugin DLL and all of its dependent external DLLs, and zips them together into a standard **NuGet Package (.nupkg)**.

### The Deployment Process
Instead of registering a raw \\\`.dll\\\` file in the Plugin Registration Tool, you register the \\\`.nupkg\\\` file as a **Plugin Package**. 
Dataverse natively unpacks the NuGet package on the server side and makes the dependent libraries available to the Plugin at runtime.

## Architecting Shared Internal Code (Real-World Perspective)

If you have a massive enterprise deployment with three distinct apps (Sales, Service, Marketing), you will likely have three distinct Plugin projects. 

However, all three projects might need to calculate a complex "Customer Risk Score". You do not copy/paste that logic.

1. Create a C# Class Library project named \\\`Contoso.Core.BusinessLogic\\\`.
2. Compile it and push it to a private **Azure Artifacts** (or GitHub Packages) NuGet feed.
3. In the Sales, Service, and Marketing Plugin projects, add a standard NuGet reference to \\\`Contoso.Core.BusinessLogic\\\`.
4. The PAC CLI will automatically bundle your internal shared library into the final \\\`.nupkg\\\` deployment payload for each respective app.

> [!TIP]
> **Performance Consideration:** While Dependent Assemblies are fully supported, downloading large NuGet packages into the Dataverse Sandbox at runtime can add a few milliseconds of latency to cold starts. Only include the libraries you absolutely need.

## Things to Remember

- Never use the unsupported **ILMerge** hack.
- Use **Dependent Assemblies (Plugin Packages/.nupkg)** to natively bundle external libraries.
- Publish shared corporate logic to **Azure Artifacts** as internal NuGet packages.

## What's Next

Now that we can safely inject external DLLs into our plugins, how do we structure the actual C# code inside the plugin to make it testable? We use **Dependency Injection**.
  `.trim(),
};
