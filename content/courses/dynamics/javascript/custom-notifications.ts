import { DocContent } from "@/types/docs";

export const customNotifications: DocContent = {
  title: "Custom Notifications",
  description:
    "Learn how to display non-blocking, contextual warnings and error messages on forms and fields using the Xrm API to improve data integrity.",
  content: `
## Introduction

When validating data in a Model-Driven App via JavaScript, you should not rely entirely on aggressive, blocking pop-up alerts (\\\`openAlertDialog\\\`). If a user simply misspells an email address, locking their entire screen with a popup is a frustrating, legacy user experience.

Instead, you should provide gentle, contextual feedback exactly where the error occurred. In Dataverse, we achieve this using the **Xrm Notifications API**.

## Types of Notifications

There are two primary levels of notifications you can deploy:

1. **Form-Level Notifications:** A colored banner that appears at the top of the entire form.
2. **Control-Level (Field) Notifications:** A small red "X" or warning icon that appears directly next to the specific field containing the error.

## 1. Form-Level Notifications

Form-level notifications are best for general, form-wide warnings about the state of the record (e.g., "This account is past due on payments" or "This record is currently locked by Finance").

They appear as colored banners directly below the command bar.

### Adding a Form Notification

\`\`\`javascript
// Syntax: setFormNotification(message, level, uniqueId)
formContext.ui.setFormNotification(
    "Please verify the primary contact information before saving.",
    "WARNING",
    "verifyContactWarning"
);
\`\`\`

**Levels:**
- \\\`"ERROR"\\\`: Red banner with an X icon.
- \\\`"WARNING"\\\`: Yellow banner with a triangle icon.
- \\\`"INFO"\\\`: Blue banner with an i icon.

### Removing a Form Notification

Notifications do not disappear automatically. If the user fixes the issue, your JavaScript must explicitly clear the notification using the unique ID you provided when creating it.

\`\`\`javascript
// Remove the specific notification
formContext.ui.clearFormNotification("verifyContactWarning");
\`\`\`

## 2. Control-Level Notifications

When an error applies to a specific piece of data, put the error on that exact field. This draws the user's eye directly to what needs fixing.

> [!IMPORTANT]
> **Blocking the Save Event**
> Crucially, adding an \\\`ERROR\\\` notification to a control via JavaScript actively **prevents the user from saving the record**. Dataverse will block the save transaction until the notification is cleared. This makes Control Notifications a powerful data-integrity tool.

### Adding a Control Notification

\`\`\`javascript
var emailControl = formContext.getControl("emailaddress1");

// Syntax: setNotification(message, uniqueId)
emailControl.setNotification("This email address is invalid.", "emailError1");
\`\`\`

### Removing a Control Notification

Just like form notifications, you must clear the control notification when the data becomes valid, otherwise the form will remain permanently locked.

\`\`\`javascript
var emailControl = formContext.getControl("emailaddress1");
emailControl.clearNotification("emailError1");
\`\`\`

## Example: Real-time Email Validation

Here is a complete example of a script attached to the **OnChange** event of an Email field.

\`\`\`javascript
var Nexora = Nexora || {};
Nexora.Contact = (function () {
    return {
        validateEmail: function (executionContext) {
            var formContext = executionContext.getFormContext();
            var emailAttr = formContext.getAttribute("emailaddress1");
            var emailControl = formContext.getControl("emailaddress1");

            var emailValue = emailAttr.getValue();

            // Clear any existing errors first to unlock the form
            emailControl.clearNotification("invalidEmailError");

            // If empty, do nothing (let required-field logic handle it if needed)
            if (!emailValue) return;

            // Simple regex for email validation
            var emailPattern = /^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/;

            if (!emailPattern.test(emailValue)) {
                // Not a valid email - Show error on the field and block saving
                emailControl.setNotification("Please enter a valid email format.", "invalidEmailError");
            }
        }
    };
})();
\`\`\`

## Best Practices

- **Use Business Rules First:** You can show field-level error messages using native Business Rules without writing a single line of JavaScript. Only write notification scripts if the validation logic is too complex for a Business Rule (like Regex string matching).
- **Manage Unique IDs Carefully:** The \\\`uniqueId\\\` string is how you clear the message. If you use random IDs, you will not be able to remove the error later. Create a standardized naming convention (e.g., \\\`[FieldName]_Error\\\`).
- **Don't Spam the User:** Do not show 15 form-level notifications at once. It pushes the actual form data below the fold on small screens.

## Common Mistakes

> [!CAUTION]
> **Orphaned Errors** 
> If you attach a validation script to the \\\`OnSave\\\` event, trigger a control notification error, but fail to write the logic to *clear* it on the next valid save attempt, the error will persist forever. The user will be permanently blocked from saving the record.

## Things to Remember

- **Form Notifications** are banners at the top (\\\`setFormNotification\\\`).
- **Control Notifications** are icons next to fields (\\\`setNotification\\\`).
- Control Notifications **block the Save event**.
- You must manually **clear** notifications when the data is fixed.

## What's Next

All of the JavaScript we have discussed so far is triggered by Form Events (loading, saving, changing data). But what if we want to trigger code when a user actively clicks a custom button at the top of the screen? Next, we will cover **Ribbon JavaScript**.
  `.trim(),
};
