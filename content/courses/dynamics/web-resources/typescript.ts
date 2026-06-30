import { DocContent } from "@/types/docs";

export const typescriptWebResources: DocContent = {
  title: "TypeScript in Dynamics 365",
  description:
    "Learn why TypeScript is the industry standard for writing Dynamics 365 client-side code, providing type safety, IntelliSense, and preventing runtime errors.",
  content: `
## Introduction

JavaScript is a dynamically typed language. If you write \`var name = formContext.getAttribute("firstname").getValue();\` and accidentally misspell "firstname" as "fistname", JavaScript will not warn you. You will only discover the error when a user opens the form in Production and it crashes.

**TypeScript** solves this. It is a strict syntactical superset of JavaScript developed by Microsoft. It adds static typing and compile-time error checking. 

Today, all professional Dynamics 365 client-side code (Form Scripts, Ribbon Actions, PCF Controls) should be written in TypeScript.

## The @types/xrm Package

To make TypeScript understand the Dynamics 365 API, you install the official type definitions provided by the community:

\`npm install @types/xrm --save-dev\`

Once installed, your editor (VS Code) instantly understands the entire Xrm object model. 

### IntelliSense and Autocomplete
If you type \`formContext.get\`, VS Code will autocomplete \`getAttribute\`, \`getControl\`, \`data\`, and \`ui\`. It will tell you exactly what parameters those functions expect and what they return.

### Compile-Time Errors
If you try to assign a string to an OptionSet field, or if you pass 3 arguments to an Xrm function that only expects 2, the TypeScript compiler will throw an error immediately, preventing you from ever uploading broken code to Dataverse.

## Early Bound TypeScript (XrmDefinitelyTyped)

Standard \`@types/xrm\` gives you IntelliSense for the Xrm API, but it does *not* know about your specific database schema. It doesn't know that your Account table has a custom column called \`con_creditlimit\`.

To get full schema safety, enterprise projects use tools like **XrmDefinitelyTyped**.

This tool connects to your Dataverse environment and generates specific TypeScript interfaces for all your tables. 

\`\`\`typescript
// Without XrmDefinitelyTyped (Late Bound - Prone to typos)
var limit = formContext.getAttribute("con_creditlimit").getValue();

// With XrmDefinitelyTyped (Early Bound - 100% Type Safe)
// If you misspell "con_creditlimit", the project will not compile.
var limit = formContext.getAttribute(account.Fields.con_creditlimit).getValue();
\`\`\`

## Transpilation (Compiling)

Browsers (and Dataverse) cannot execute TypeScript (\`.ts\`) files. 

Before uploading to Dynamics 365, you must run the TypeScript compiler (\`tsc\`). The compiler checks your code for errors, strips away all the type definitions, and outputs clean, older-generation JavaScript (like ES5 or ES6) that is guaranteed to run in all browsers.

You then upload this generated \`.js\` file to Dataverse as a standard Script Web Resource.

## Namespaces and Modules

TypeScript makes it incredibly easy to organize your code to avoid the global scope pollution issues common in vanilla JavaScript.

\`\`\`typescript
namespace Contoso.Sales.Account {
    
    export function onLoad(executionContext: Xrm.Events.EventContext): void {
        const formContext = executionContext.getFormContext();
        
        // Logic here
        hideCreditField(formContext);
    }

    // This function is private to this file, it cannot be called from the Ribbon
    function hideCreditField(formContext: Xrm.FormContext): void {
        formContext.getControl("creditlimit").setVisible(false);
    }
}
\`\`\`

## Source Maps

When an error occurs in the browser, the browser's console will point to the transpiled JavaScript file (which is often minified and unreadable). 

If you configure your \`tsconfig.json\` to output **Source Maps** (\`"sourceMap": true\`), the compiler generates a \`.js.map\` file. You can upload this alongside your script, or inline it. The browser's DevTools will use the map to show you your original TypeScript code in the debugger, making troubleshooting effortless.

## Things to Remember

- TypeScript prevents **runtime errors** by catching bugs at compile-time.
- Install **@types/xrm** for native API IntelliSense.
- Use **XrmDefinitelyTyped** for database schema IntelliSense.
- You must **transpile** TypeScript into JavaScript before uploading to Dataverse.
  `.trim(),
};
