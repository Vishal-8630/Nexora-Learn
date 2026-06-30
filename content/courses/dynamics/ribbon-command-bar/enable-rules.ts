import { DocContent } from "@/types/docs";

export const enableRules: DocContent = {
  title: "Enable Rules",
  description:
    "Enable Rules dictate whether a button on the Command Bar is clickable or grayed out based on data conditions and user actions.",
  content: `
## Introduction

A form might have a "Convert to PDF" button. But what if the record hasn't been saved yet (it has no data to convert)? Or what if the record is currently deactivated?

If the user clicks the button in these states, the script will crash. To prevent this, we use **Enable Rules** to ensure the button is only clickable when the conditions are perfect.

## What is it?

An **Enable Rule** evaluates conditions at runtime. 
- If the rule evaluates to \`True\`, the button is enabled (clickable). 
- If the rule evaluates to \`False\`, the button is visible, but grayed out (disabled).

*Note: In modern Unified Interface apps, disabled buttons are often hidden entirely to save space, blurring the line between Enable Rules and Display Rules. However, architecturally, they are distinct.*

## Standard Enable Rule Types

When using the Ribbon Workbench, you can add multiple standard "Rules" to a single Enable Rule grouping without writing code.

### 1. FormStateRule
Evaluates the current state of the form.
- **Create:** Is the user creating a brand new record?
- **Existing:** Is the user looking at a saved record?
- **ReadOnly:** Is the record locked?
- *Example:* Disable the "Convert to PDF" button if the FormState is \`Create\`.

### 2. SelectionCountRule (For Views)
When a button is on a Grid (List View), you can enable it based on how many rows the user has checked.
- **ExactlyOne:** Only enable if exactly 1 row is selected.
- **OneOrMore:** Enable if 1, 5, or 100 rows are selected.
- *Example:* A "Merge Records" button requires exactly two records to be selected.

### 3. RecordPrivilegeRule
Evaluates if the current user has specific security access to the record.
- *Example:* Disable the "Approve" button if the user does not have \`Write\` privileges to the underlying table.

## Custom JavaScript Enable Rules

When standard rules aren't enough, you can write a **CustomRule**. This executes a specific JavaScript function from your Web Resource.

The JavaScript function **must return a boolean** (\`true\` or \`false\`).

\`\`\`javascript
var Nexora = Nexora || {};
Nexora.Ribbon = {
    
    // Remember to pass PrimaryControl from the Ribbon Workbench!
    checkCreditEnable: function(primaryControl) {
        if (!primaryControl) return false;
        
        // Get the value of the Credit Hold field
        var creditHold = primaryControl.getAttribute("creditonhold").getValue();
        
        // If credit is on hold (true), disable the button (return false)
        if (creditHold === true) {
            return false; 
        }
        
        // Otherwise, enable the button
        return true;
    }
};
\`\`\`

## Multiple Rules (AND Logic)

You can attach multiple individual rules (e.g., a \`FormStateRule\` AND a \`CustomRule\`) to a single Enable Rule grouping. 
**All rules in the group must evaluate to True for the button to be enabled.** If any single rule returns False, the button is disabled.

## Performance Considerations

Dataverse evaluates Enable Rules constantly. They fire when the form loads, and they fire *again* every time the user changes data on the form (so the button can instantly enable/disable if a field changes).

Because of this constant re-evaluation:
1. **Never use asynchronous code:** If your CustomRule tries to use \`Xrm.WebApi\` to query the database, it will freeze the ribbon rendering while it waits for the network. Enable rules must be purely synchronous.
2. **Keep logic lightweight:** Do not write a 500-line algorithm in an Enable Rule. Keep the checks simple and targeted to the data already present in the \`PrimaryControl\`.

## Common Mistakes

> [!WARNING]
> **Returning 'undefined' in Custom Rules** — If your JavaScript function forgets to \`return true\` at the end, it will implicitly return \`undefined\`. Dataverse treats \`undefined\` as \`false\`, and your button will mysteriously remain disabled forever.

## Things to Remember

- **Enable Rules** dictate if a button is clickable.
- Standard rules cover **Form State**, **Selection Count**, and **Privileges**.
- **Custom Rules** use JavaScript functions that *must* return a boolean.
- Enable rules are evaluated constantly and must be highly performant.

## What's Next

Enable Rules determine if a button is clickable. But what if we want to determine if the button should even be visible to the user at all? Next, we cover **Display Rules**.
  `.trim(),
};
