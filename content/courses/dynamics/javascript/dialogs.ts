import { DocContent } from "@/types/docs";

export const dialogs: DocContent = {
  title: "Dialogs (Xrm.Navigation)",
  description:
    "Learn how to use the Xrm.Navigation API to display native asynchronous Alert dialogs, Confirmation dialogs, and Progress indicators.",
  content: `
## Introduction

In legacy web development, developers frequently used the browser's native \\\`alert()\\\` or \\\`confirm()\\\` popup boxes. In modern Dynamics 365 architecture, these are highly discouraged. They are visually jarring, they block the browser's main thread synchronously, and they break the user experience on the mobile app.

In Model-Driven Apps, Microsoft provides the **Xrm.Navigation** API to surface beautiful, native, asynchronous dialogs that match the platform's design system.

## 1. Alert Dialog

An Alert Dialog is used to display a simple message to the user with a single "OK" button. 

You should use this when you need to forcefully inform the user of a critical business rule violation or state change.

\`\`\`javascript
var alertStrings = {
    confirmButtonLabel: "I Understand",
    text: "This customer's credit is currently on hold. Do not process orders.",
    title: "Credit Hold Warning"
};

var alertOptions = {
    height: 120,
    width: 260
};

Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
    function (success) {
        // This runs asynchronously after the user clicks the confirm button
        console.log("Alert dialog closed.");
    },
    function (error) {
        console.log(error.message);
    }
);
\`\`\`

## 2. Confirm Dialog

A Confirm Dialog is used when you need the user to make a binary Yes/No decision before proceeding with a destructive script.

Unlike the legacy native \\\`confirm()\\\`, this does not freeze the JavaScript thread. It returns a **Promise**, allowing your code to respond asynchronously based on the user's choice.

\`\`\`javascript
var confirmStrings = {
    text: "Are you sure you want to cancel this order? This cannot be undone.",
    title: "Confirm Cancellation",
    cancelButtonLabel: "No, keep order",
    confirmButtonLabel: "Yes, cancel order"
};

var confirmOptions = { height: 200, width: 450 };

Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
    function (success) {
        if (success.confirmed) {
            console.log("User clicked YES. Executing cancellation logic...");
            // Execute Dataverse Web API delete logic here
        }
        else {
            console.log("User clicked NO. Aborting.");
        }
    }
);
\`\`\`

## 3. Progress Indicator (Architectural Necessity)

When your JavaScript performs a long-running asynchronous operation (like querying the Web API, manipulating hundreds of rows, or calling an external HTTP service), the user might think the app is frozen and start double-clicking buttons, leading to data corruption.

To prevent this, you **must** display a Progress Indicator. This places a visual spinner over the screen, physically blocking user interaction until you programmatically close it.

\`\`\`javascript
// 1. Show the loading spinner and block the UI
Xrm.Utility.showProgressIndicator("Checking inventory levels, please wait...");

// 2. Perform long-running API call
Xrm.WebApi.retrieveMultipleRecords("product", "?$select=name").then(
    function success(result) {
        
        // 3. Close the spinner when done
        Xrm.Utility.closeProgressIndicator();
        
    },
    function error(err) {
        // 4. CRITICAL: Close the spinner on error as well!
        Xrm.Utility.closeProgressIndicator();
        console.log(err.message);
    }
);
\`\`\`

## 4. Error Dialog

If you catch a standard system error (like a fault object returned from an \\\`Xrm.WebApi\\\` call), you can display it using the native Error Dialog. This provides a detailed view allowing the user to download the log file for IT support.

\`\`\`javascript
Xrm.Navigation.openErrorDialog({ message: "Network timeout occurred connecting to ERP." }).then(
    function (success) {
        console.log("Error dialog closed");
    },
    function (error) {
        console.log(error);
    }
);
\`\`\`

## Best Practices

- **Never use \\\`alert()\\\` or \\\`confirm()\\\`:** They are unsupported, synchronous, and will cause bugs in the Dynamics 365 mobile application.
- **Understand Promises:** Because these dialogs return Promises, the lines of code written *underneath* the \\\`openConfirmDialog\\\` call will execute immediately, before the user clicks a button. You must put your conditional logic *inside* the \\\`then()\\\` callback function.

## Common Mistakes

> [!CAUTION]
> **Orphaned Progress Indicators** 
> A critical failure point is forgetting to call \\\`Xrm.Utility.closeProgressIndicator()\\\` in the \\\`catch\\\` or error block of a Promise. If your API call fails, the spinner will spin forever, permanently locking the screen and forcing the user to refresh their browser, losing all unsaved work.

## Things to Remember

- Use **Xrm.Navigation.openAlertDialog** for information.
- Use **Xrm.Navigation.openConfirmDialog** for choices.
- Use **Xrm.Utility.showProgressIndicator** to safely block the screen during Web API calls.
- Dialogs are asynchronous and return **Promises**.

## What's Next

Dialogs pop up over the current form. But what if we want to navigate the user entirely away from the current screen to a different form, a different view, or a custom webpage? Next, we will look at **Navigation**.
  `.trim(),
};
