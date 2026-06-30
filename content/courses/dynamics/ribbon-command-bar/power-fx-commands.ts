import { DocContent } from "@/types/docs";

export const powerFxCommands: DocContent = {
  title: "Power Fx Commands",
  description:
    "Learn how to use Power Fx in the Modern Command Designer to build low-code buttons for Model-Driven Apps without writing JavaScript.",
  content: `
## Introduction

For over a decade, customizing the Command Bar required deep knowledge of RibbonXML, third-party tools (Ribbon Workbench), and JavaScript. 

Microsoft has revolutionized this with the **Modern Command Designer**, allowing makers to use **Power Fx**—the exact same Excel-like formula language used in Canvas Apps—to write logic directly onto buttons.

## The Component Library

When you create your first Power Fx command on a table, Dataverse creates a hidden Canvas App in the background known as a **Component Library**.

This Component Library stores all the Power Fx logic for your modern commands. When the Model-Driven app loads, it downloads this Component Library and runs your Power Fx formulas natively in the browser.

## Writing Power Fx Actions

Instead of writing a JavaScript function to update a record, you write a Power Fx formula in the **Action** property of the modern button.

### Example: Updating the Current Record
If you add a button to the Main Form, you have access to the \`Self.Selected.Item\` object.

\`\`\`powerappsfl
// Mark the current Account as VIP
Patch(
    Accounts,
    Self.Selected.Item,
    { 'Account Type': 'Account Type (Accounts)'.VIP }
);
// Notify the user
Notify("Account upgraded to VIP!", NotificationType.Success);
\`\`\`

### Example: Updating Multiple Records (Grid)
If you add a button to a Grid, \`Self.Selected.AllItems\` contains a table of all the records the user checked.

\`\`\`powerappsfl
// Loop through all selected rows and update their status
ForAll(
    Self.Selected.AllItems,
    Patch(
        Accounts,
        ThisRecord,
        { 'Status Reason': 'Status Reason (Accounts)'.Active }
    )
);
\`\`\`

## Writing Power Fx Visibility Rules

In the classic Ribbon, you wrote Display Rules in XML. In the Modern Command Designer, you use the **Visible** property of the button.

This must evaluate to a boolean (\`true\` or \`false\`).

### Example: Visibility based on Data
\`\`\`powerappsfl
// Only show the button if the Account Revenue is greater than 1,000,000
If(
    Self.Selected.Item.'Annual Revenue' > 1000000,
    true,
    false
)
\`\`\`

### Example: Visibility based on Security Role
While there is no native \`HasRole\` function in Power Fx yet, you can query the Dataverse security tables directly.

\`\`\`powerappsfl
// Check if the current user has the "Sales Manager" role
If(
    CountRows(
        Filter(
            'Security Roles',
            Name = "Sales Manager" && 
            'Business Unit'.'Business Unit' = User().BusinessUnit
        )
    ) > 0,
    true,
    false
)
\`\`\`

## Limitations of Power Fx Commands

While Power Fx is incredibly fast to develop with, it currently has limitations compared to classic JavaScript:

1. **No direct DOM/Form manipulation:** In JavaScript, you can write \`formContext.getControl("name").setVisible(false)\`. You **cannot** do this in Power Fx. Power Fx on the command bar can only manipulate *data* (using Patch), not the UI of the Model-Driven form.
2. **No Dialogs:** You cannot open a custom HTML web resource dialog natively from a Power Fx command. You must use JavaScript and \`Xrm.Navigation.navigateTo\`.
3. **Complex ALM:** Because the logic is stored in a hidden Canvas App Component Library, resolving merge conflicts in source control (Git) for modern commands is much harder than merging a standard JavaScript file.

## Mixing Power Fx and JavaScript

The Modern Command Designer does not force you to use Power Fx. You can create a Modern Command and choose **JavaScript** as the action type. 

This allows you to enjoy the beautiful, native drag-and-drop UI of the Modern Command Designer while still executing complex, pro-code JavaScript for advanced scenarios.

## Things to Remember

- Power Fx commands run via a hidden **Component Library**.
- Use the **Action** property for logic (Patch, ForAll, Notify).
- Use the **Visible** property for Display Rules.
- Power Fx **cannot** manipulate form UI (hide/show tabs or fields).
  `.trim(),
};
