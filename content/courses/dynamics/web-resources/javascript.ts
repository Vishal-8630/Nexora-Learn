import { DocContent } from "@/types/docs";

export const javascriptWebResources: DocContent = {
  title: "JavaScript Web Resources",
  description:
    "The core of client-side customization. Learn how to manage, deploy, and structure JavaScript Web Resources in Dynamics 365.",
  content: `
## Introduction

JavaScript Web Resources (\`.js\` files) are the most critical client-side assets in Dynamics 365. 

They contain the code that executes when a user opens a form (OnLoad), changes a field (OnChange), clicks save (OnSave), or clicks a button on the Ribbon (Command Bar Actions).

## Uploading and Managing

When you write client-side logic, you upload the \`.js\` file to Dataverse as a **Script (JScript)** Web Resource.

- **Naming Convention:** Always use your publisher prefix and a logical structure (e.g., \`con_account_main_form.js\` or \`con_ribbon_utils.js\`).
- **Dependencies:** If your main script relies on a utility script, you can define dependencies in the Maker Portal. Dataverse will ensure the utility script is loaded into the browser before your main script runs.

## Architecture & Namespacing

Dynamics 365 is a Single Page Application (SPA). If you define a global variable or function in your Web Resource, it will clash with other Web Resources or even Microsoft's internal code.

**Never write global functions.**

\`\`\`javascript
// BAD: Global scope collision risk
function calculateTotal(formContext) { ... }

// GOOD: Namespacing
var Contoso = Contoso || {};
Contoso.Account = Contoso.Account || {};

Contoso.Account.calculateTotal = function(formContext) { ... };
\`\`\`

When configuring the Event Handler on the Form Designer, you simply type \`Contoso.Account.calculateTotal\` in the "Function" field.

## Debugging JavaScript

You do not need to repeatedly upload and publish your Web Resource just to test a single line of code change. 

**Using Fiddler or Charles Proxy:**
Pro-developers use network proxies like Fiddler AutoResponder to intercept the browser's request for the Web Resource from the Microsoft server, and replace it with the local \`.js\` file on their hard drive. This allows you to edit the file locally and hit "Refresh" in the browser to instantly see the changes.

**Source Maps:**
If you write your code in TypeScript (highly recommended) and transpile it to JavaScript, you should also upload the \`.map\` file as a separate Web Resource, or inline the source map, so you can debug the original TypeScript directly in Chrome DevTools.

## Xrm API vs Standard JavaScript

While you are writing JavaScript, you are heavily restricted in what you can do to the DOM.

- **DOM Manipulation:** \`document.getElementById\` and jQuery DOM selectors are strictly forbidden. If you need to hide a field, you must use \`formContext.getControl("name").setVisible(false)\`.
- **Window API:** Be careful using \`window.alert\` or \`window.confirm\`. They block the browser thread and create a poor user experience. Always use the asynchronous \`Xrm.Navigation.openAlertDialog\` and \`Xrm.Navigation.openConfirmDialog\` instead.

## Web Resources in HTML

If you have a custom HTML Web Resource and you want to use the Xrm API (e.g., to query data), you must include the special \`ClientGlobalContext.js.aspx\` file.

\`\`\`html
<head>
    <!-- Required to access Xrm and Dataverse APIs from custom HTML -->
    <script src="ClientGlobalContext.js.aspx" type="text/javascript"></script>
    
    <!-- Your custom logic -->
    <script src="con_custom_dialog_logic.js" type="text/javascript"></script>
</head>
\`\`\`

## Things to Remember

- Always wrap your code in a **Namespace**.
- Never manipulate the **DOM**.
- Use **Fiddler/Proxies** for rapid local debugging.
- JavaScript is used for **Form Events** and **Ribbon Actions**.

## What's Next

Writing vanilla JavaScript is prone to runtime errors. Modern Dynamics 365 development relies heavily on **TypeScript** and **React** to build robust client-side architecture. We will cover those next.
  `.trim(),
};
