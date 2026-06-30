import { DocContent } from "@/types/docs";

export const javascriptActions: DocContent = {
  title: "JavaScript Actions",
  description:
    "Learn how to wire custom JavaScript functions to Ribbon Commands, pass the correct parameters, and execute asynchronous logic.",
  content: `
## Introduction

When a user clicks a custom button on the classic Command Bar, the most common requirement is to execute a complex client-side process. 
You achieve this by creating a Web Resource and wiring a **JavaScript Action** to your Command Definition.

## Creating the JavaScript Function

Writing JavaScript for the Ribbon is very similar to writing JavaScript for Form Events (OnLoad/OnChange), with one major difference: **How you receive the Form Context.**

### The Wrong Way (Legacy)
Historically, developers relied on the global \`Xrm.Page\` object. 
\`\`\`javascript
// DEPRECATED - DO NOT USE
var name = Xrm.Page.getAttribute("name").getValue();
\`\`\`
Microsoft deprecated \`Xrm.Page\` because it prevents multiple forms from rendering on the same screen (which happens in modern app layouts).

### The Right Way (PrimaryControl)
Your JavaScript function must expect a parameter. 
When configuring the Command in Ribbon Workbench, you must pass the **\`PrimaryControl\`** CrmParameter. Dynamics 365 will inject the \`formContext\` into this parameter at runtime.

\`\`\`javascript
var Contoso = Contoso || {};
Contoso.Ribbon = Contoso.Ribbon || {};

// The primaryControl parameter is passed in from the Ribbon Command
Contoso.Ribbon.runCreditCheck = function (primaryControl) {
    
    // primaryControl IS the formContext
    var formContext = primaryControl;
    
    var accountId = formContext.data.entity.getId();
    var accountName = formContext.getAttribute("name").getValue();
    
    // ... execute logic ...
};
\`\`\`

## Handling Grids (Selected Records)

If your button is on the **Home Grid** or a **Subgrid**, there is no "Form Context" because the user is looking at a list of records.

Instead, you configure the Ribbon Command to pass \`SelectedControlSelectedItemIds\`.

\`\`\`javascript
// The selectedIds parameter is an array of GUIDs passed from the Ribbon Command
Contoso.Ribbon.deactivateMultiple = function (selectedIds) {
    
    if (selectedIds.length === 0) {
        Xrm.Navigation.openAlertDialog({ text: "Please select at least one record." });
        return;
    }

    for (var i = 0; i < selectedIds.length; i++) {
        var recordId = selectedIds[i];
        // ... call WebAPI to deactivate recordId ...
    }
};
\`\`\`

## Asynchronous Actions and Refreshing

Many ribbon actions involve calling an external API or updating data via \`Xrm.WebApi\`. These calls are **asynchronous**.

If your JavaScript updates the backend database via the WebAPI, the UI will not automatically know the data changed. You must explicitly tell the form or grid to refresh once your async call finishes.

### Refreshing a Form
\`\`\`javascript
Xrm.WebApi.updateRecord("account", accountId, data).then(
    function success(result) {
        // Refresh the form so the user sees the new data
        // Pass false to ensure we don't save over other unsaved changes
        primaryControl.data.refresh(false); 
    },
    function (error) {
        Xrm.Navigation.openErrorDialog({ message: error.message });
    }
);
\`\`\`

### Refreshing a Grid
If your button was on a grid, you must pass the \`SelectedControl\` CrmParameter (not just the IDs) to gain access to the grid context.
\`\`\`javascript
Contoso.Ribbon.updateGrid = function (selectedControl, selectedIds) {
    // ... do async WebApi work ...
    
    // Refresh the grid
    selectedControl.refresh();
};
\`\`\`

## Using Promises in Enable Rules

JavaScript isn't just used for Actions (clicking the button). It is also used in **Enable Rules** (Custom Rules) to determine if the button should be clickable.

If your Custom Rule needs to query Dataverse to decide if the button should be enabled, it must return a **Promise**. Dynamics 365 will wait for the Promise to resolve before enabling the button.

\`\`\`javascript
Contoso.Ribbon.shouldEnableCreditButton = function (primaryControl) {
    var accountId = primaryControl.data.entity.getId().replace(/[{}]/g, "");

    // Return the Promise directly to the Ribbon engine
    return Xrm.WebApi.retrieveRecord("account", accountId, "?$select=creditlimit").then(
        function success(result) {
            // Return true to enable the button, false to disable it
            if (result.creditlimit > 1000) {
                return true; 
            } else {
                return false;
            }
        },
        function error() {
            return false;
        }
    );
};
\`\`\`

## Things to Remember

- Pass **PrimaryControl** to get the \`formContext\` on Main Forms.
- Pass **SelectedControlSelectedItemIds** to get GUIDs on Grids.
- Always use **Xrm.Navigation** for dialogs, never \`alert()\` or \`confirm()\`.
- Return a **Promise** if you are querying the WebAPI inside an Enable Rule.
  `.trim(),
};
