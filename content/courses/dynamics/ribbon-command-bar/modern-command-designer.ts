import { DocContent } from "@/types/docs";

export const modernCommandDesigner: DocContent = {
  title: "Modern Command Designer",
  description:
    "Learn how to use Microsoft's native Modern Command Designer to customize command bars using low-code Power Fx instead of JavaScript.",
  content: `
## Introduction

For years, if a business analyst wanted to add a simple button to a form that updated a "Status" field to "Approved", they had to hire a developer to write JavaScript and use the third-party Ribbon Workbench.

To modernize this, Microsoft introduced the **Modern Command Designer**. It allows makers to customize the Command Bar natively within the Power Apps portal using the low-code **Power Fx** language.

## What is it?

The Modern Command Designer is a native UI built directly into the Model-Driven App designer. 

Instead of dealing with complex XML files, makers can visually add buttons, dropdowns, and groups to the command bar. Most importantly, instead of writing JavaScript actions, makers write **Power Fx formulas** to define what the button does.

## Accessing the Designer

To use the modern designer:
1. Open your Model-Driven App in the **App Designer** (make.powerapps.com).
2. In the left navigation tree, find the Table you want to customize (e.g., Account).
3. Click the three dots (\`...\`) next to the table and select **Edit Command Bar**.
4. Choose which bar to edit (Main Grid, Main Form, Subgrid, or Associated View).

## Writing Power Fx Commands

When you add a new Command, you define its **Action**. Instead of pointing it to a JavaScript web resource, you select "Run Formula".

Because it uses Power Fx (the same language used in Canvas Apps), makers can leverage familiar, Excel-like syntax.

**Example 1: Updating the current record**
To create an "Approve" button that updates the status of the record currently open on the form:
\`\`\`powerappsfl
Patch(
    Accounts,
    Self.Selected.Item,
    { 'Approval Status': 'Approval Status (Accounts)'.Approved }
)
\`\`\`

**Example 2: Navigating to a specific View**
\`\`\`powerappsfl
Navigate( 'Active Accounts View' )
\`\`\`

**Example 3: Showing a Notification**
\`\`\`powerappsfl
Notify("Account has been successfully verified.", NotificationType.Success)
\`\`\`

## Component Library (The Backend)

Where does this Power Fx code actually live? Dataverse does not natively execute Power Fx on Model-Driven forms. 

When you click "Save and Publish" in the Command Designer, Microsoft secretly generates a hidden **Canvas App Component Library** in the background. It compiles your Power Fx into this library, and the Model-Driven app loads that library at runtime to execute your commands. 

*You should never manually edit this auto-generated Component Library.*

## JavaScript vs Power Fx

You do not *have* to use Power Fx. The Modern Command Designer still supports calling traditional JavaScript Web Resources. 

**When to use Power Fx:**
- Simple data updates (\`Patch\`).
- Showing notifications.
- Simple navigation.
- If the team lacks JavaScript developers.

**When to use JavaScript (and the Ribbon Workbench):**
- Complex, chained asynchronous operations (e.g., calling 3 different external REST APIs in sequence).
- Interacting directly with form UI elements (hiding tabs, locking fields). *Power Fx commands cannot currently interact with the Model-Driven form's UI state.*
- Opening complex Xrm.Navigation dialogs.
- Legacy ribbon customizations that require deeply complex Enable Rules.

## Best Practices

- **Adopt Power Fx for new simple buttons:** If a button just changes a field value and saves, use the Modern Designer. It is vastly easier to maintain.
- **Do not mix and match randomly:** Try to establish an architectural standard. If your organization has 50 complex JavaScript buttons, adding one Power Fx button might cause confusion for the next developer trying to figure out where the code lives.

## Common Mistakes

> [!WARNING]
> **Trying to manipulate the form with Power Fx** — You cannot write a Power Fx command to say "Hide the Details Tab". Power Fx commands run independently of the \`formContext\`. If you need to manipulate the UI of the Model-Driven form, you must use JavaScript.

## Things to Remember

- The Modern Designer is built into the **App Designer**.
- It uses **Power Fx** instead of JavaScript.
- Power Fx is compiled into a hidden **Component Library**.
- It is great for data manipulation (\`Patch\`), but cannot interact with form UI controls.

## What's Next

Whether you use the Ribbon Workbench or the Modern Designer, you often need to control *when* a button is clickable. Next, we will cover **Enable Rules**.
  `.trim(),
};
