import { DocContent } from "@/types/docs";

export const forms: DocContent = {
  title: "Power Pages Forms",
  description:
    "Learn how to expose Dataverse Model-Driven forms to external users using Basic Forms and Advanced Forms (Multi-Step Wizards).",
  content: `
## Introduction

The primary purpose of Power Pages is to allow external users to interact with Dataverse data. The easiest way to do this is by taking an existing Model-Driven Form (e.g., the "Contact" form) and publishing it to the portal.

Power Pages handles all the complex HTML generation, data binding, and submit logic automatically. 

There are two types of forms in Power Pages: **Basic Forms** and **Advanced Forms**.

## Basic Forms

A Basic Form (formerly known as an Entity Form) is a single-page form.

### How to Create One
1. **In Dataverse:** Create a standard Model-Driven form on your table. Keep it simple (one tab, a few sections).
2. **In Portal Management:** Create a new "Basic Form" record.
3. Select the Dataverse Table and point it to the specific Model-Driven Form you just created.
4. Set the **Mode**:
   - **Insert:** Creates a new record. (Requires Create Table Permissions).
   - **Edit:** Updates an existing record. Requires the Record ID to be passed in the URL (e.g., \`?id=1234\`). (Requires Write Table Permissions).
   - **ReadOnly:** Displays the data as non-editable text. (Requires Read Table Permissions).

### Form Success Behavior
You can configure what happens when the user clicks "Submit":
- Show a success message ("Thank you for your submission").
- Redirect to another webpage (e.g., back to the Home page).

### Metadata
If the Model-Driven form renders a lookup field, but you want it to render as a Dropdown on the portal, you don't need to write custom HTML. 

You create a **Basic Form Metadata** record. This allows you to override the behavior of specific columns on the portal (e.g., forcing a field to be read-only, changing the label, or converting a lookup to a dropdown).

## Advanced Forms

An Advanced Form (formerly known as a Web Form) allows you to break a massive Dataverse form down into a multi-step, paginated wizard.

*Example: A 5-step Mortgage Application process.*

### The Architecture
An Advanced Form is composed of multiple **Advanced Form Steps**.

- **Step 1 (Load Tab):** You can point the first step to "Tab 1" of your Model-Driven form. The user fills it out and clicks "Next". The portal creates the record in Dataverse.
- **Step 2 (Load Tab):** You point the second step to "Tab 2" of the form. The portal automatically passes the newly created GUID to this step so it can update the existing record.
- **Step 3 (Condition):** Advanced Forms support conditional branching. You can configure Step 3 to say: "If the user checked the 'Are you a veteran?' box in Step 2, go to Step 4. Otherwise, skip to Step 5."
- **Step 5 (Redirect):** The final step redirects the user to a "Thank You" page.

### State Management
Advanced Forms automatically track the user's progress using a Session ID stored in the URL. If the user closes their browser on Step 3 and comes back tomorrow, the portal will resume exactly where they left off.

## Security Considerations

As discussed in the Table Permissions section, placing a Basic Form on a Web Page does not magically grant the user access to the data. 

If you configure an "Edit" form, but the logged-in user does not have "Write" privileges via a Table Permission, the portal will render a red error message: *"You do not have the appropriate permissions."*

## Things to Remember

- **Basic Forms** are single-page (Insert, Edit, or ReadOnly).
- **Advanced Forms** are multi-step wizards with conditional branching.
- Both types rely on standard **Dataverse Model-Driven Forms** as their layout blueprint.
- Use **Form Metadata** to alter field behaviors specifically for the portal without affecting the internal CRM.

## What's Next

Forms are great for single records. But how do we display a table of multiple records to the user? Next, we cover **Lists**.
  `.trim(),
};
