import { DocContent } from "@/types/docs";

export const build: DocContent = {
  title: "Building PCF Controls",
  description:
    "Learn the Webpack compilation process, resolving Node dependencies, and utilizing the local test harness before deploying to Dataverse.",
  content: `
## Introduction

Once you have authored your TypeScript, React components, and CSS, Dataverse cannot execute your raw source files. 

You must compile, transpile, and bundle everything into a single, optimized JavaScript payload that the Power Apps rendering engine can securely inject into the browser. This compilation pipeline is orchestrated by **npm**, **Webpack**, and the **Power Platform CLI (pac)**.

## The Compilation Process

When you execute \\\`npm run build\\\` in your terminal, several complex architectural steps occur under the hood:

1. **TypeScript Compilation:** The \\\`tsc\\\` compiler analyzes your code for strict type errors and transpiles the TypeScript down to standard, browser-compatible JavaScript.
2. **Manifest Validation:** The CLI reads your \\\`ControlManifest.Input.xml\\\` and verifies that all referenced resource files structurally exist.
3. **Webpack Bundling:** Webpack analyzes your dependency tree, taking your compiled JavaScript, your CSS, your imported React modules, and bundles them all into a single, cohesive file (\\\`bundle.js\\\`).

If the build is successful, an \\\`out\\\` folder is generated containing the final compiled assets ready for deployment.

## The Local Test Harness

Deploying a compiled payload to Dataverse takes several minutes. You cannot afford to deploy to the cloud every time you change a single CSS pixel during UI development. 

To solve this, Microsoft provides a **Local Test Harness** that simulates the Dynamics 365 form environment locally in your browser via a Node.js server.

### Starting the Test Harness
Execute the following command in your terminal:
\`\`\`bash
npm start
\`\`\`

Wait a few seconds, and a browser window will automatically launch (usually targeting \\\`http://localhost:8181\\\`).
*(Note: If you run \\\`npm start watch\\\`, Webpack will watch your directory and automatically hot-reload the browser every time you save a file in VS Code).*

### Simulating Dataverse
The Test Harness allows you to:
- Inject mock JSON data into your \\\`bound\\\` and \\\`input\\\` properties.
- Change the Form Factor (Web, Tablet, Phone) to validate responsive CSS breakpoints.
- Simulate the \\\`isControlDisabled\\\` state to ensure your control renders a proper Read-Only state.

### Architectural Limitations of the Test Harness

> [!CAUTION]
> **The WebAPI Context Does Not Exist Locally**
> The Test Harness **cannot** simulate the Dataverse WebAPI or Navigation context. 
> If your PCF control's TypeScript uses \\\`context.webAPI.retrieveRecord\\\`, it will instantly fail in the local test harness because the local Node server is not connected to a live Azure SQL database. You **must** deploy the control to a Sandbox Dataverse environment to test WebAPI transactions.

## Handling Build Errors

### 1. ESLint Errors
By default, Microsoft enforces a very strict ESLint configuration. If you leave unused variables or missing semicolons in your code, the production build will intentionally fail. 
You can temporarily bypass this during prototyping by running \\\`npm run build -- --buildMode development\\\`, but you must resolve the linting errors before executing a production build.

### 2. Missing NPM Dependencies
If you import a third-party library (like \\\`lodash\\\` or \\\`axios\\\`), you must ensure it is installed via \\\`npm install <package>\\\`. Webpack will fatally fail to build if it cannot resolve the module import inside your \\\`node_modules\\\` directory.

## Production Builds

When you are ready to prepare your control for ALM deployment to a UAT or Production environment, you must build it in production mode:

\`\`\`bash
npm run build -- --buildMode production
\`\`\`

This flag instructs Webpack to ruthlessly minify the JavaScript payload, strip out development \\\`console.log\\\` statements, and optimize the bundle size via tree-shaking. A production bundle is significantly smaller and faster for users to download when they open a CRM form.

## Things to Remember

- Use \\\`npm run build\\\` to compile TypeScript and bundle assets via Webpack.
- Use \\\`npm start watch\\\` for rapid local UI iteration.
- The Test Harness **cannot** execute WebAPI calls.
- Always execute \\\`--buildMode production\\\` before final deployment.

## What's Next

Once the \\\`out\\\` folder is generated, how do we actually inject it into the Dataverse cloud? Next, we cover **Deployment**.
  `.trim(),
};
