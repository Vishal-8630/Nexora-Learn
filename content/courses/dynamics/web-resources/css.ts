import { DocContent } from "@/types/docs";

export const cssWebResources: DocContent = {
  title: "CSS Web Resources",
  description:
    "Learn how to use CSS Web Resources to style HTML Web Resources and custom controls in Dynamics 365.",
  content: `
## Introduction

When you build custom HTML Web Resources, they start with default browser styling, which looks terrible inside the highly polished Dynamics 365 interface.

To make your custom HTML blend in with the rest of the CRM, you must apply Cascading Style Sheets (CSS). In Dataverse, you store these stylesheets as **CSS Web Resources**.

## Creating a CSS Web Resource

1. Write your standard CSS in a local \`.css\` file.
2. Go to the Dataverse Maker Portal -> Web Resources.
3. Upload the file, selecting **Style Sheet (CSS)** as the type.
4. Name it using your publisher prefix (e.g., \`con_custom_dialog.css\`).

## Linking CSS to HTML Web Resources

Once the CSS file is uploaded, you link it inside your HTML Web Resource exactly like standard web development, using a relative path.

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Custom Dialog</title>
    <!-- Relative path to the CSS Web Resource -->
    <link rel="stylesheet" type="text/css" href="con_custom_dialog.css">
</head>
<body>
    <button class="primary-btn">Submit</button>
</body>
</html>
\`\`\`

## Styling Limitations in Dynamics 365

> [!WARNING]
> **You cannot style the native Dynamics 365 UI.**  
> In the early days of CRM 2011, developers used "DOM Hacking" to inject custom CSS into the main page to turn the native Save button green or make the Account Name field bold. 
> 
> **This is strictly prohibited and entirely unsupported.** Microsoft frequently changes the underlying DOM structure of Model-Driven Apps. If you hack the native DOM, your code will break during the next Microsoft update.

You can **only** apply CSS Web Resources to the custom HTML Web Resources or PCF controls that *you* create.

## Matching the Microsoft Design Language

If you are building custom HTML, your goal should be to make the user forget they are looking at custom HTML. It should look natively built by Microsoft.

### Use Fluent UI
Instead of manually writing thousands of lines of CSS to perfectly mimic Microsoft's fonts, colors, and button shadows, professional developers use **Fluent UI**.

Fluent UI is Microsoft's open-source design framework (the exact framework used to build Dynamics 365 and Office 365). 

While you can write vanilla CSS, it is highly recommended to build your custom UI using React and the Fluent UI React component library, which brings all the correct CSS automatically.

## CSS in PCF Controls

If you are building a Power Apps Component Framework (PCF) control, you do not upload your CSS as a separate Dataverse Web Resource.

Instead, you write your CSS locally in your PCF project, and define it in the \`ControlManifest.Input.xml\`:

\`\`\`xml
<resources>
  <code path="index.ts" order="1"/>
  <!-- The PCF compiler bundles this CSS automatically -->
  <css path="css/CustomControl.css" order="1" />
</resources>
\`\`\`

## Things to Remember

- Upload \`.css\` files as **Style Sheet (CSS)** Web Resources.
- Link them to your custom HTML files using standard **relative \`<link>\` tags**.
- **Never** inject CSS to modify the native Dynamics 365 forms or grids.
- Use **Fluent UI** to ensure your custom UI perfectly matches the Dynamics 365 aesthetic.
  `.trim(),
};
