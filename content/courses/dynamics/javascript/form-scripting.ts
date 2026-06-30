import { DocContent } from "@/types/docs";

export const formScripting: DocContent = {
  title: "Form Scripting",
  description:
    "Learn how to use JavaScript to add complex, dynamic logic to Model-Driven forms by hooking into the Dataverse Client API event pipeline (OnLoad, OnChange, OnSave).",
  content: `
## Introduction

While **Business Rules** are the preferred declarative, no-code method for handling form logic in Dataverse, they are limited. They cannot query the database asynchronously, perform complex mathematical algorithms, or interact with external REST APIs.

When a requirement exceeds the capabilities of a Business Rule, Solution Architects authorize the use of **JavaScript Form Scripting** via the Dataverse Client API.

## What is it?

Form Scripting involves writing standard JavaScript functions and registering them to execute precisely when specific events fire on a Model-Driven Form.

These scripts are uploaded to Dataverse as **Web Resources**. Once uploaded, you use the Form Designer to bind your functions to specific form events.

## Form Events

There are three primary events on a Model-Driven Form that trigger JavaScript:

### 1. OnLoad
This event fires immediately when the form finishes rendering data. 
- **Use Case:** Hiding a specific tab if the current user belongs to a restricted Security Role, or checking if the form is in "Create" mode versus "Update" mode to lock certain fields.

### 2. OnChange
This event fires when a user changes the value of a specific field and then tabs out or clicks away (loses focus).
- **Use Case:** When a user selects a \\\`Country\\\`, an OnChange script makes an asynchronous Web API call to fetch the local tax rate and populates the \\\`Tax Rate\\\` field automatically.

### 3. OnSave
This event fires when the user clicks the Save button (or when auto-save triggers).
- **Use Case:** Validating that an email address matches a strict regex pattern. If it fails, the script can actively cancel the save operation and throw a blocking error to the user.

## The Execution Context (Architectural Standard)

> [!CAUTION]
> **Never use Xrm.Page**
> In older versions of Dynamics CRM, developers used the global \\\`Xrm.Page\\\` object. This is **deprecated** and will break. You must use the Execution Context.

Your JavaScript function must accept an object called the \\\`executionContext\\\`. This object is injected into your function by the Dataverse platform when the event fires. 

The \\\`executionContext\\\` is your only gateway to safely interacting with the form. You use it to get the \\\`formContext\\\`, which contains all the supported methods to read fields, hide tabs, and show notifications.

\`\`\`javascript
var Contoso = Contoso || {};
Contoso.Account = Contoso.Account || {};

Contoso.Account.onLoad = function(executionContext) {
    // 1. Extract the secure form context from the execution context
    var formContext = executionContext.getFormContext();

    // 2. Use the form context to read a field value
    var accountName = formContext.getAttribute("name").getValue();

    console.log("Form loaded for: " + accountName);
};
\`\`\`

To make this work, when registering the script in the Form Designer, you **must** check the box that says **"Pass execution context as first parameter"**.

## Namespacing (Enterprise Requirement)

Because all JavaScript Web Resources attached to a form are loaded into the same global browser \\\`window\\\` object, you **must** use strict Namespacing. 

If you lazily name your function \\\`onLoad()\\\` and a third-party managed solution also has a function named \\\`onLoad()\\\`, one will overwrite the other in memory, causing fatal crashes. 

Always wrap your functions in a unique namespace (usually the client's company name and the table name).
\`\`\`javascript
// Enterprise Standard Namespacing
var Nexora = Nexora || {};
Nexora.Contact = (function() {
    return {
        onLoad: function(executionContext) { ... }
    };
})();
\`\`\`

## Best Practices

- **Use Async/Await:** Network calls (like querying the Web API) are inherently asynchronous. Use Promises or \\\`async/await\\\` so your script does not freeze the main browser thread.
- **Fail Gracefully:** Wrap your code in \\\`try/catch\\\` blocks. If your JavaScript throws an unhandled error on OnLoad, the entire form will freeze and the user will be permanently blocked from working.
- **Do not manipulate the DOM:** Never use \\\`document.getElementById()\\\` or jQuery. Microsoft constantly changes the underlying HTML/React structure of Model-Driven Apps. If you manipulate the DOM directly, your code will break during the next cloud update.

## Things to Remember

- Use JS only when **Business Rules** are insufficient.
- The three events are **OnLoad, OnChange, and OnSave**.
- Always check **"Pass execution context as first parameter"**.
- Use strict **Namespacing** to avoid function collisions.
- Never use **jQuery or raw DOM manipulation**.

## What's Next

We know how to trigger our scripts, but what specific methods can we actually call to manipulate the form? Next, we will cover the **Xrm API**.
  `.trim(),
};
