import { DocContent } from "@/types/docs";

export const webResourceSetup: DocContent = {
  title: "TypeScript & Web Resource Setup",
  description:
    "Transitioning from legacy vanilla JS files to a modern TypeScript and Webpack development environment.",
  content: `
## The Legacy Way (Don't do this)

For a decade, Dynamics CRM developers wrote vanilla JavaScript directly in notepad or Visual Studio, opened the CRM Web Resource uploader UI, browsed for the \`.js\` file, clicked "Save", and clicked "Publish". 

This is incredibly slow, lacks IntelliSense, and is prone to syntax errors crashing the browser at runtime.

---

## The Modern Way: TypeScript & \`@types/xrm\`

Modern Dataverse frontend development uses TypeScript to catch errors at compile-time and provide deep IntelliSense for the Xrm API.

### 1. Initialize the Project
Create a new folder for your frontend code and initialize NPM.
\`\`\`bash
mkdir Contoso.WebResources
cd Contoso.WebResources
npm init -y
\`\`\`

### 2. Install Dependencies
You need TypeScript, Webpack (to bundle your code into a single file), and the official Microsoft XRM types.
\`\`\`bash
npm install typescript webpack webpack-cli --save-dev
npm install @types/xrm --save-dev
\`\`\`

### 3. Configure \`tsconfig.json\`
The \`@types/xrm\` package injects the \`Xrm\` namespace globally into your project, giving you instant autocomplete for things like \`Xrm.Navigation.openAlertDialog()\`.

\`\`\`json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "outDir": "./dist"
  }
}
\`\`\`

---

## Fast Deployment (Bypassing the UI)

You should never use the Dataverse UI to upload Web Resources during active development. It takes too long.

Instead, use a community tool like **Spkl** or the **XrmToolBox WebResource Manager**.

### Using Spkl
Spkl is a NuGet package you can add to a sibling C# project. It provides a \`deploy-webresources.bat\` script.
When you configure the \`spkl.json\` file, running the bat file will instantly push your local \`.js\` file to Dataverse and publish it in seconds, without ever opening the browser.
`,
};
