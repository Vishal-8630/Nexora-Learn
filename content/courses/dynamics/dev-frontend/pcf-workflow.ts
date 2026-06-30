import { DocContent } from "@/types/docs";

export const pcfWorkflow: DocContent = {
  title: "PCF Initialization & Workflows",
  description:
    "Bootstrapping PCF components, local harness limitations, and building to solutions.",
  content: `
## Initializing a PCF Project

The Power Apps Component Framework (PCF) allows you to build custom React controls that replace standard fields or grids in the UI.

To scaffold a new project, use the \`pac\` CLI in an empty directory:

\`\`\`bash
# Create a Field control (e.g., a custom slider or map)
pac pcf init --namespace Contoso --name CustomSlider --template field --framework react

# Install the Node dependencies
npm install
\`\`\`

---

## The Local Test Harness

PCF development is fantastic because you can test your React code locally without deploying to Dataverse.

\`\`\`bash
npm start
\`\`\`
This opens a local browser window where you can interact with your component.

### The Limitations of the Harness

> [!WARNING]
> **The Harness is a Lie**
> The local \`npm start\` harness only mocks a tiny fraction of the actual \`ComponentFramework.Context\`. 

If your PCF control needs to use \`context.webAPI\` to retrieve related records, or \`context.navigation\` to open a dialog, **these will fail in the local harness**.

To test these features, you have two choices:
1. **Deploy to Dataverse:** Build the solution and push it to a live Dev environment. (Slow).
2. **Mock the Context:** Write a wrapper around the \`context\` object in your React code that returns fake data when running locally (\`window.location.hostname === "localhost"\`), and uses the real \`context\` when deployed.

---

## Packaging the PCF Control

Once your React code is done, you cannot upload the raw \`index.ts\` file to Dataverse. It must be packaged into a Solution \`.zip\` file.

**1. Create a Solution Project**
In a parent directory (outside your PCF folder), create a new solution project.
\`\`\`bash
mkdir Contoso.Solutions
cd Contoso.Solutions
pac solution init --publisher-name Contoso --publisher-prefix contoso
\`\`\`

**2. Link the PCF Project**
Tell the Solution project that it contains your PCF control.
\`\`\`bash
pac solution add-reference --path ..\\CustomSlider
\`\`\`

**3. Build the Solution**
Run MSBuild (or \`dotnet build\`) on the Solution project. 
\`\`\`bash
dotnet build
\`\`\`
This command automatically triggers Webpack in your PCF folder, bundles the React code, creates the Dataverse XML definitions, and packages everything into a deployable \`bin/Debug/Contoso.zip\` file.
`,
};
