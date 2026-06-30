import { DocContent } from "@/types/docs";

export const formScriptingPatterns: DocContent = {
  title: "Form Scripting Patterns & Async OnSave",
  description:
    "Modern getFormContext usage and handling asynchronous validation during the OnSave event.",
  content: `
## Xrm.Page is Dead

If you Google a Dynamics CRM JavaScript question, 90% of the answers from 2011-2019 will tell you to use \`Xrm.Page.getAttribute()\`.

**Do not use this.** It was deprecated years ago and will cause your code to fail in modern contexts (like Editable Grids or PCF controls).

Always pass the \`execution context\` as the first parameter in the Form Properties UI, and extract the form context from it.

\`\`\`javascript
// The Modern Approach
export function onFormLoad(executionContext) {
    const formContext = executionContext.getFormContext();
    
    const nameAttribute = formContext.getAttribute("name");
    nameAttribute.setValue("New Name");
}
\`\`\`

---

## The Async OnSave Nightmare

Historically, if you wanted to validate data when the user clicked "Save", you would do this:

\`\`\`javascript
// The OLD (Synchronous) Way
export function onSave(executionContext) {
    if (someConditionIsFalse) {
        // Stop the save instantly
        executionContext.getEventArgs().preventDefault(); 
        Xrm.Navigation.openAlertDialog({ text: "Validation failed!" });
    }
}
\`\`\`

**The Problem:** What if your validation requires an API call (\`Xrm.WebApi.retrieveMultipleRecords\`)? API calls are asynchronous (Promises). The \`onSave\` function will fire the API call, reach the end of the function, and Dataverse will save the record *before* your API call finishes and has a chance to call \`preventDefault()\`.

### The Solution: Async OnSave Handlers

Microsoft introduced a massive feature to solve this. You can now tell Dataverse to *wait* for your Promise to resolve before it completes the save transaction.

**Step 1: Enable the Feature**
Go to Power Platform Admin Center > Environments > Settings > Features. Turn on **"Async onload / onsave handlers"**.

**Step 2: Return a Promise**

\`\`\`javascript
// The NEW (Asynchronous) Way
export function onSave(executionContext) {
    const formContext = executionContext.getFormContext();
    const saveEventArgs = executionContext.getEventArgs();

    // 1. Instantly pause the save operation
    saveEventArgs.disableAsyncTimeout(); 

    // 2. Create a Promise for your API call
    const validationPromise = new Promise((resolve, reject) => {
        Xrm.WebApi.retrieveMultipleRecords("account", "?$top=1").then(
            function success(result) {
                if (result.entities.length > 0) {
                    // Validation failed! Block the save.
                    saveEventArgs.preventDefault();
                    Xrm.Navigation.openAlertDialog({ text: "API Validation failed!" });
                }
                resolve(); // Let the platform know we are done checking
            },
            function error(error) {
                saveEventArgs.preventDefault();
                resolve();
            }
        );
    });

    // 3. Return the promise to the platform
    return validationPromise;
}
\`\`\`
`,
};
