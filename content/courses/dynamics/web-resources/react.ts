import { DocContent } from "@/types/docs";

export const reactWebResources: DocContent = {
  title: "React in Dynamics 365",
  description:
    "Learn how to use React to build modern, highly interactive UI components for Dynamics 365, replacing legacy HTML/jQuery spaghetti code.",
  content: `
## Introduction

For years, developers built custom UI in Dynamics 365 using HTML Web Resources filled with jQuery. This often led to unmaintainable, brittle "spaghetti code" that was difficult to debug and impossible to test.

Today, Microsoft heavily encourages the use of **React**—a declarative, component-based JavaScript library—for building complex client-side architecture in Dataverse.

## How React fits into Dynamics 365

React is used in two distinct ways within the Dynamics 365 ecosystem:

1. **Inside PCF Controls:** This is the primary and most supported way. When you initialize a Power Apps Component Framework project using \`pac pcf init --template field -fw react\`, Microsoft automatically scaffolds a React environment. The React component renders natively in the DOM, replacing standard fields or grids.
2. **Inside HTML Web Resources:** If you are building a full-page custom Dashboard or a massive popup dialog that doesn't fit the PCF model, you can build a React Single Page Application (SPA), bundle it using Webpack, and upload the \`index.html\` and \`bundle.js\` as Web Resources.

## The Virtual DOM Advantage

Dynamics 365 forms can be heavy. If you write vanilla JavaScript to constantly query the WebAPI, redraw a custom HTML table, and attach event listeners to 50 rows, the browser will lag.

React uses a **Virtual DOM**. When data changes, React calculates exactly which single \`<td>\` element needs to be updated and updates only that specific pixel on the screen, drastically improving performance inside the CRM.

## Using Fluent UI React

If you are building a custom UI, it must look like Dynamics 365. You should not be writing CSS to make your buttons look like Microsoft's buttons.

Instead, you install the **Fluent UI React** library (\`@fluentui/react\`). 

This library provides out-of-the-box React components for everything:
- \`PrimaryButton\`
- \`DetailsList\` (Data Grids)
- \`ComboBox\` (Lookups)
- \`DatePicker\`

When you use these components, your custom React app will identically match the fonts, colors, hover states, and accessibility standards of the native Dynamics 365 platform.

## State Management and the WebAPI

React components manage their own state. When interacting with Dataverse, the pattern is straightforward:

1. **useEffect (Mount):** When the React component loads, fire an asynchronous call to \`Xrm.WebApi.retrieveMultipleRecords\`.
2. **setState:** When the WebAPI returns data, call \`setRecords(data)\` to update the React State.
3. **Render:** React automatically detects the state change and re-renders your \`DetailsList\` to show the fetched data.

## Bundling (Webpack)

Dataverse does not natively understand React (\`JSX\` or \`TSX\` files). You cannot just upload a \`.tsx\` file as a Web Resource.

You must compile your React code down to standard JavaScript. 
- In **PCF**, the Power Platform CLI handles this automatically when you run \`npm run build\`.
- In **HTML Web Resources**, you must set up a build tool like **Webpack** or **Vite** to transpile your React code and bundle it (along with the Fluent UI library) into a single \`bundle.js\` file, which you then upload to Dataverse.

## Things to Remember

- React prevents **spaghetti code** and offers massive **performance improvements**.
- It is the default framework for **PCF controls**.
- Use **Fluent UI** for native styling.
- You must **bundle** React code before uploading it as a Web Resource.

## What's Next

React dictates *how* you build UI components. But how do you ensure the data flowing into those components is free of bugs? Next, we will cover **TypeScript**.
  `.trim(),
};
