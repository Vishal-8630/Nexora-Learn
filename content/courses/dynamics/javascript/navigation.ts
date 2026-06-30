import { DocContent } from "@/types/docs";

export const navigation: DocContent = {
  title: "Navigation (navigateTo)",
  description:
    "Learn how to programmatically navigate users between records, views, and custom web resources using the supported Xrm.Navigation API.",
  content: `
## Introduction

When a user clicks a button in a Model-Driven App, they expect something to happen. Often, that "something" is being routed to a different screen—perhaps opening a related record, jumping to a specific dashboard, or opening a custom HTML popup.

Historically, developers used \\\`window.open()\\\` or manipulated the browser URL manually to achieve this. 

> [!CAUTION]
> **Do not manipulate the URL**
> Manually modifying the browser URL breaks the Single Page Application (SPA) architecture of Dynamics 365. It forces a hard page reload, bypassing the browser cache and destroying application performance. You must use **Xrm.Navigation.navigateTo**.

## What is it?

\\\`Xrm.Navigation.navigateTo\\\` is the single, unified architectural standard for routing users anywhere within a Model-Driven App. 

It takes two objects:
1. **pageInput:** Defines *where* you are going (e.g., an Entity Record, a View, or a Custom Page).
2. **navigationOptions:** Defines *how* it should open (e.g., inline in the current window, or as a popup dialog centered on the screen).

## 1. Navigating to a Record (Form)

To open an existing record, or to open a blank form to create a new record.

\`\`\`javascript
var pageInput = {
    pageType: "entityrecord",
    entityName: "account",
    entityId: "5531d753-95af-42e5-9c17-1f22b7a957b9" // Remove to open a blank 'create' form
};

var navigationOptions = {
    target: 1 // 1 = Inline (current window), 2 = Dialog (popup overlay)
};

Xrm.Navigation.navigateTo(pageInput, navigationOptions).then(
    function success() {
        console.log("Navigation successful");
    },
    function error(err) {
        console.log("Navigation failed: " + err.message);
    }
);
\`\`\`

## 2. Opening a Record as a Dialog Popup

If a user is working on an Opportunity and needs to quickly edit the parent Account, navigating them completely away from the Opportunity is highly disruptive to their workflow. 

Instead, you can open the Account form as a popup dialog over the current screen by changing \\\`target\\\` to 2.

\`\`\`javascript
var pageInput = {
    pageType: "entityrecord",
    entityName: "account",
    entityId: "5531d753-95af-42e5-9c17-1f22b7a957b9"
};

var navigationOptions = {
    target: 2, // Open as a Dialog
    width: { value: 80, unit: "%" }, // Take up 80% of screen width
    position: 1 // 1 = Center, 2 = Side panel
};

Xrm.Navigation.navigateTo(pageInput, navigationOptions);
\`\`\`

## 3. Navigating to a View (Entity List)

To route the user to a specific data grid (View).

\`\`\`javascript
var pageInput = {
    pageType: "entitylist",
    entityName: "contact",
    viewId: "00000000-0000-0000-00AA-000010001004" // GUID of the System View
};

var navigationOptions = {
    target: 1
};

Xrm.Navigation.navigateTo(pageInput, navigationOptions);
\`\`\`

## 4. Navigating to a Web Resource or Custom Page

Sometimes standard forms aren't enough, and you build a highly customized Canvas Custom Page or a custom HTML Web Resource. You can route users to them seamlessly.

\`\`\`javascript
var pageInput = {
    pageType: "webresource",
    webresourceName: "new_custom_ui.html"
};

var navigationOptions = {
    target: 2,
    width: 500,
    height: 400,
    title: "Custom Tool"
};

Xrm.Navigation.navigateTo(pageInput, navigationOptions);
\`\`\`

## Using openForm (Legacy Wrapper)

For convenience, Microsoft maintains \\\`Xrm.Navigation.openForm()\\\`. Under the hood, it simply calls \\\`navigateTo\\\`, but it offers a slightly simpler syntax if you are strictly opening Entity Records and need to pass default values into a new form:

\`\`\`javascript
var entityFormOptions = {
    entityName: "contact",
    useQuickCreateForm: true
};

// Pre-fill the First Name and Last Name
var formParameters = {
    firstname: "John",
    lastname: "Doe"
};

Xrm.Navigation.openForm(entityFormOptions, formParameters);
\`\`\`

## Best Practices

- **Contextual UX:** Use Target 2 (Dialogs) for quick edits to keep users in their flow. If a task takes less than 30 seconds, pop it in a dialog. If it is deep data entry, route them inline (Target 1).
- **Hardcoding GUIDs:** If you use \\\`navigateTo\\\` to open a specific View, **do not** hardcode the View's GUID if it is a Personal View. GUIDs can change across environments. Only hardcode GUIDs for System Views that are locked in managed ALM solutions.

## Things to Remember

- **\\\`Xrm.Navigation.navigateTo\\\`** is the mandatory universal routing method.
- **pageInput** defines the destination (Record, View, Web Resource).
- **target: 1** opens in the current window.
- **target: 2** opens as a modern popup dialog.

## What's Next

Sometimes you don't want to block the screen or force a navigation. You just want to gently warn the user about something on the current form. Next, we look at **Custom Notifications**.
  `.trim(),
};
