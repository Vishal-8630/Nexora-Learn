import { DocContent } from "@/types/docs";

export const htmlWebResources: DocContent = {
  title: "HTML Web Resources",
  description:
    "Learn how to use HTML Web Resources in Dynamics 365 to create custom UI elements, dialogs, and embedded iframe content.",
  content: `
## Introduction

While Dynamics 365 provides a robust set of standard UI controls, there are times when you need complete control over the layout, styling, and behavior of a specific area.

Before the introduction of the Power Apps Component Framework (PCF), the primary way to build custom UI was to upload an **HTML Web Resource** and embed it inside a Model-Driven form or open it as a popup dialog.

## What is an HTML Web Resource?

An HTML Web Resource is simply an \`.html\` file uploaded to the Dataverse database. 

It acts as a standalone webpage hosted on the Dynamics 365 domain. Because it is hosted on the same domain, it has seamless access to the user's authentication context and the Dataverse Web API.

## Embedding HTML on a Form

You can place an HTML Web Resource directly onto a Model-Driven Form (it renders inside an \`<iframe>\`).

### Passing the Form Context
When embedding an HTML file, the HTML code is isolated from the main form. If your HTML needs to know which Account the user is looking at, you must configure the Web Resource control on the form to **"Pass record object-type code and unique identifier as parameters"**.

Dynamics 365 will append query string parameters to your HTML URL:
\`https://org.crm.dynamics.com/WebResources/con_custom_ui.html?id=1234&typename=account\`

Inside your HTML file, you must write JavaScript to parse \`window.location.search\` to extract the \`id\` so you can query Dataverse.

### Accessing the Parent Form (Legacy)
Historically, HTML developers used \`window.parent.Xrm\` to reach out of the iframe and manipulate the main form.
> [!WARNING]  
> Using \`window.parent.Xrm\` is completely deprecated and will break in modern UCI layouts. You must use the \`ClientGlobalContext.js.aspx\` library to access the API.

## Opening HTML as a Dialog

The most common use case for HTML Web Resources today is creating custom Popup Dialogs. 

You can launch an HTML Web Resource as a modal window using the \`Xrm.Navigation.navigateTo\` API.

\`\`\`javascript
var pageInput = {
    pageType: "webresource",
    webresourceName: "con_custom_dialog.html"
};

var navigationOptions = {
    target: 2, // 2 = Dialog
    width: 400,
    height: 300,
    position: 1 // Center
};

Xrm.Navigation.navigateTo(pageInput, navigationOptions).then(
    function success() {
        console.log("Dialog closed.");
    },
    function error(e) {
        console.log(e.message);
    }
);
\`\`\`

## HTML vs PCF

If you are building custom UI that is meant to act like a data field on a form, **do not use HTML Web Resources**. Use the **Power Apps Component Framework (PCF)**. 

PCF controls render natively in the DOM (no slow iframes) and receive data automatically without having to parse query string parameters.

**When to still use HTML:**
- Custom popup dialogs triggered by a Ribbon button.
- Massive, full-page dashboards that don't fit well into the PCF paradigm.
- Legacy system integrations that require rendering external websites via iframe.

## Things to Remember

- HTML files are hosted as **Web Resources**.
- They are isolated in **iframes** when placed on a form.
- Use **Xrm.Navigation.navigateTo** to open them as popup dialogs.
- For field-level custom UI, prefer **PCF** over HTML.
  `.trim(),
};
