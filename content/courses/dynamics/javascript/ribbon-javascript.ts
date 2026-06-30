import { DocContent } from "@/types/docs";

export const ribbonJavascript: DocContent = {
  title: "Ribbon JavaScript",
  description:
    "Learn how to execute JavaScript functions when a user clicks custom buttons on the Command Bar, and how to govern button visibility using strict Enable Rules.",
  content: `
## Introduction

The **Command Bar** (historically and structurally referred to as the Ribbon) is the row of buttons at the top of every Form and View in a Model-Driven App (e.g., Save, Delete, Assign).

As a developer, you will frequently be asked to inject custom buttons into this bar. For example, a "Verify Credit" button on an Account, or a "Convert to PDF" button on a Quote. When the user clicks that button, your custom JavaScript must execute securely.

## What is it?

**Ribbon JavaScript** is standard JavaScript code (hosted in a Web Resource) that is explicitly wired to a button on the Command Bar.

Unlike Form Scripting (which triggers passively based on form load or data changes), Ribbon Scripting requires active, intentional user interaction (clicking the button).

## Anatomy of a Custom Command

When you construct a custom button (using tools like the Ribbon Workbench or the Power Apps Command Designer), you are actually defining a **Command**. A Command consists of two primary components:

1. **Action:** What happens when the user clicks the button? (This executes your JS function).
2. **Enable Rules / Display Rules:** Should this button be visible and clickable right now? (This evaluates your JS function to determine state).

## 1. Command Actions (Executing Code)

To run JavaScript from a button, you configure the Command's Action to point to a specific function inside your namespaced Web Resource.

### Passing the Context (PrimaryControl)
Form Scripts use the \\\`executionContext\\\` to get the \\\`formContext\\\`. Ribbon buttons do not have an execution context in the same way.

When configuring the button in Ribbon Workbench, you must explicitly pass **CRM Parameters**.
- Pass \\\`PrimaryControl\\\` to get the equivalent of \\\`formContext\\\`.
- Pass \\\`SelectedControlSelectedItemIds\\\` if the button is on a View and you need an array of the GUIDs of all the rows the user checked.

\`\`\`javascript
// Ribbon Action Function
var Nexora = Nexora || {};
Nexora.AccountRibbon = {
    
    // The primaryControl is injected from the Ribbon configuration
    btnVerifyCredit_Click: function (primaryControl) {
        
        // PrimaryControl acts exactly like formContext
        var accountId = primaryControl.data.entity.getId().replace(/[{}]/g, "");
        var accountName = primaryControl.getAttribute("name").getValue();
        
        Xrm.Utility.showProgressIndicator("Verifying credit for " + accountName);
        
        // Call an external API...
    }
};
\`\`\`

## 2. Enable Rules (Dynamic Visibility)

You do not want the "Verify Credit" button to be clickable if the Account is already marked as "Inactive". 

You can create an **Enable Rule** backed by a Custom Javascript Rule. This function is evaluated constantly by the platform rendering engine. It must return a strict boolean (\\\`true\\\` or \\\`false\\\`). 
- If it returns \\\`true\\\`, the button is enabled.
- If it returns \\\`false\\\`, the button is disabled (grayed out) or hidden entirely.

\`\`\`javascript
// Ribbon Enable Rule Function
Nexora.AccountRibbon.verifyCredit_EnableRule = function(primaryControl) {
    if (!primaryControl) return false;
    
    // Get the status of the account
    var stateCode = primaryControl.getAttribute("statecode").getValue();
    
    // 0 is Active. If Active, return true to show the button.
    if (stateCode === 0) {
        return true;
    }
    
    return false;
};
\`\`\`

> [!CAUTION]
> **Enable Rules MUST be Synchronous and Lightning Fast**
> Enable rules are evaluated repeatedly (every time the form refreshes, data changes, or tabs are clicked). **Never** put asynchronous API calls (\\\`Xrm.WebApi\\\`) inside an Enable Rule. Waiting for a network request to resolve will permanently lock the ribbon from rendering and crash the form. Enable rules must execute in milliseconds using only data already present on the form.

## Modern Power Fx Commands

Historically, Ribbon JavaScript was the *only* way to make custom buttons work. 

Recently, Microsoft introduced the **Modern Command Designer**, which allows makers to write button logic using **Power Fx** (the low-code language used in Canvas Apps).

**Decision Framework:**
- **For simple logic:** (e.g., updating a field value when clicked, or navigating to a view), use Power Fx. It is faster to build and easier to maintain.
- **For enterprise logic:** (e.g., querying external REST APIs, chaining complex asynchronous WebApi calls, or opening Dialogs), continue to use Ribbon JavaScript.

## Refreshing the UI

If your button's JavaScript updates the database in the background using the WebAPI, the user looking at the form will not see the changes until they manually hit F5. 
Make sure your script calls \\\`primaryControl.data.refresh()\\\` at the end of its execution to pull the fresh data from SQL and sync the UI.

## Things to Remember

- Ribbon buttons consist of **Actions** (what they do) and **Enable Rules** (when they are visible).
- You must explicitly pass \\\`PrimaryControl\\\` from the ribbon configuration to your JavaScript to access form data.
- **Enable Rules must return a boolean** and should never contain slow network calls.
- **Power Fx** is the modern, low-code alternative for simple ribbon buttons.

## What's Next

We have now covered how to manipulate the UI and trigger logic via JavaScript and buttons. But what if we need to guide a user visually through a multi-step, multi-table process spanning several weeks? Next, we will cover **Business Process Flows**.
  `.trim(),
};
