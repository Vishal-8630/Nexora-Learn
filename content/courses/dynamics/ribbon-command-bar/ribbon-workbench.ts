import { DocContent } from "@/types/docs";

export const ribbonWorkbench: DocContent = {
  title: "Ribbon Workbench",
  description:
    "The Ribbon Workbench is the industry-standard community tool for customizing the Dynamics 365 Command Bar and Ribbon. Learn how to install and use it safely.",
  content: `
## Introduction

For over a decade, Microsoft did not provide an out-of-the-box UI for modifying the buttons at the top of Dynamics 365 forms and views. To add a custom button or hide a standard "Delete" button, developers had to manually extract a massive, complex XML file, edit it in Notepad, and re-import it. 

To solve this, Scott Durow created the **Ribbon Workbench**. It became so essential that it is considered mandatory software for any Dynamics 365 consultant or developer.

## What is it?

The **Ribbon Workbench** is a third-party, visual drag-and-drop editor for customizing the Dataverse Command Bar. 

It abstracts away the underlying \`customizations.xml\` file. Instead of writing raw XML, you drag a button onto a visual representation of the ribbon, assign an icon, and configure the JavaScript actions using a clean UI. The tool then handles the XML generation and deployment in the background.

## How to Access It

The Ribbon Workbench is a managed solution that you can install directly into your Dataverse environment, but the industry standard is to run it via the **XrmToolBox**.

1. Download and open the **XrmToolBox** (a Windows desktop app for Dataverse tools).
2. Connect to your Dataverse environment.
3. Open the **Plugin Store** and install "Ribbon Workbench 2016".
4. Open the tool.

## The "Tiny Solution" Rule

When you open the Ribbon Workbench, it asks you to select a Dataverse Solution to load. 

**This is the most critical rule of the Ribbon Workbench:** *Never load your master development solution.*

The tool has to download, parse, and re-upload the entire XML definition of every table in the solution. If you load a solution with 50 tables, the tool will freeze, run out of memory, or take 20 minutes to publish.

**Best Practice Workflow:**
1. Go to Dataverse and create a new, temporary solution (e.g., \`RibbonEdits_Account\`).
2. Add *only* the specific table you want to modify (e.g., \`Account\`).
3. **Do not include all components.** Uncheck the box that says "Include all objects". You only want the metadata of the table.
4. Open the Ribbon Workbench and load this tiny solution. It will load in 5 seconds.
5. Make your edits and click Publish.

## The Three Ribbons

When you load a table in the Ribbon Workbench, you will see three distinct bars you can customize:

1. **Home Page (Grid):** The buttons shown when looking at the main View (list of records).
2. **SubGrid:** The buttons shown on a subgrid embedded *inside* a form (e.g., the "Add Existing Contact" button inside the Account form).
3. **Form:** The buttons shown at the top of the screen when viewing a specific, single record.

## Hiding Standard Buttons

Often, clients want to prevent users from doing things like Exporting to Excel, or Deleting records. While you can do this via Security Roles, sometimes you need to hide the button based on complex logic.

In the Ribbon Workbench, you can right-click any standard Microsoft button and select **Hide**. 
- *Note:* Hiding a button creates a "Hide Action" in your solution. It does not delete the button from Microsoft's underlying system.

## Un-customizing

If you break a standard button (e.g., you accidentally hid the "Save" button), you can right-click the customized button in the Ribbon Workbench and select **Un-customize**. This removes your custom XML override and restores the default Microsoft behavior.

## Common Mistakes

> [!WARNING]
> **Orphaned Web Resources** — If you configure a button to call a JavaScript Web Resource, but forget to add that Web Resource to your solution when deploying to Production, clicking the button will result in a silent failure or a script error. The Ribbon Workbench does *not* automatically package your JS files for deployment.

## Things to Remember

- Always use the **XrmToolBox** to run the Ribbon Workbench.
- Always create a **tiny, temporary solution** containing only the table you are modifying.
- You can modify the **Grid**, **SubGrid**, or **Form** ribbons.
- Right-click to **Hide** or **Un-customize** standard buttons.

## What's Next

While the Ribbon Workbench is the classic tool, Microsoft recently released their own native, low-code alternative. Next, we look at the **Modern Command Designer**.
  `.trim(),
};
