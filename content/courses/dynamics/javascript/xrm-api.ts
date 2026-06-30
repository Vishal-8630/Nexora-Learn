import { DocContent } from "@/types/docs";

export const xrmApi: DocContent = {
  title: "Xrm API (Client API)",
  description:
    "The Xrm Client API provides a strictly supported object model to interact with Model-Driven forms. Learn how to securely read data, hide fields, and manage the UI.",
  content: `
## Introduction

When writing JavaScript for Model-Driven Apps, you are operating inside a highly complex, React-based Single Page Application rendered dynamically by Microsoft.

You **cannot** use standard HTML DOM manipulation (like \\\`document.getElementById()\\\` or jQuery). If Microsoft updates the layout of the app during a monthly cloud release, your DOM-based code will immediately crash.

Instead, Microsoft mandates the use of a supported abstraction layer called the **Client API Object Model (Xrm API)**. 

## The Contexts

To use the Xrm API, you must understand the two primary architectural contexts:

### 1. executionContext
This object is injected into your function by the event handler (OnLoad, OnSave, OnChange). Its primary purpose is to safely retrieve the \\\`formContext\\\` without relying on global variables.

### 2. formContext
This is the root object for interacting with the current form instance. It provides the methods required to access the underlying data (Attributes) and the visual elements on the screen (Controls).

\`\`\`javascript
function myOnLoad(executionContext) {
    var formContext = executionContext.getFormContext();
    // Execute all Xrm logic using formContext...
}
\`\`\`

> [!CAUTION]
> **Xrm.Page is Dead**
> In older legacy code (Dynamics CRM 2011-2016), you will see \\\`Xrm.Page\\\` used instead of \\\`formContext\\\`. \\\`Xrm.Page\\\` is officially deprecated. If you use it in new development, it will fail code reviews and eventually break.

## Attributes vs Controls

This is the most critical architectural distinction in the Xrm API:
- **Attributes** represent the actual *data* in the Dataverse database (the payload).
- **Controls** represent the *visual representation* of that data on the user's screen (the UI).

A single Attribute (e.g., \\\`emailaddress1\\\`) can have multiple Controls bound to it (e.g., it might be in the Header, and also in the Body of the form).

### Working with Attributes (Data)
Use \\\`formContext.getAttribute("logical_name")\\\` to interact with the data payload.

\`\`\`javascript
var nameAttr = formContext.getAttribute("name");

// Read a value
var currentName = nameAttr.getValue();

// Set a value programmatically
nameAttr.setValue("New Company Name");

// Check if the user changed the data but hasn't saved yet
var isDirty = nameAttr.getIsDirty();

// Fire the OnChange event manually to trigger dependent scripts
nameAttr.fireOnChange();
\`\`\`

### Working with Controls (UI)
Use \\\`formContext.getControl("logical_name")\\\` to interact with the UI rendering.

\`\`\`javascript
var nameControl = formContext.getControl("name");

// Hide the field from the screen
nameControl.setVisible(false);

// Lock the field (Read-Only)
nameControl.setDisabled(true);

// Show a blocking error message next to the field
nameControl.setNotification("This name is invalid", "unique_id_1");

// Clear the error message
nameControl.clearNotification("unique_id_1");
\`\`\`

## Form Level Methods (formContext.ui)

The \\\`ui\\\` object allows you to manipulate the form's structural layout as a whole.

\`\`\`javascript
// Get the current form type (1 = Create, 2 = Update, 3 = Read Only)
var formType = formContext.ui.getFormType();

// Hide an entire Tab
formContext.ui.tabs.get("tab_summary").setVisible(false);

// Hide an entire Section within a Tab
formContext.ui.tabs.get("tab_summary").sections.get("sec_contact").setVisible(false);
\`\`\`

## Data Level Methods (formContext.data)

The \\\`data.entity\\\` object allows you to perform record-level operations.

\`\`\`javascript
// Get the GUID of the current record
var recordId = formContext.data.entity.getId();

// Get the logical name of the table (e.g., "account")
var entityName = formContext.data.entity.getEntityName();

// Save the record programmatically
formContext.data.entity.save();
\`\`\`

## Global Context

Sometimes you need information about the environment, the app, or the current user, rather than the specific form. You access this via \\\`Xrm.Utility.getGlobalContext()\\\`.

\`\`\`javascript
var globalContext = Xrm.Utility.getGlobalContext();

// Get the current user's GUID
var userId = globalContext.userSettings.userId;

// Get the current user's Security Roles
var userRoles = globalContext.userSettings.securityRoles;

// Get the base URL of the Dynamics environment for API calls
var clientUrl = globalContext.getClientUrl();
\`\`\`

## Best Practices

- **Always use Logical Names:** The API requires the strict backend schema names, all in lowercase (e.g., \\\`new_accountnumber\\\`), never the Display Name ("Account Number").
- **Check for nulls defensively:** Always check if an attribute exists before calling \\\`getValue()\\\`. If a field was removed from the form by an administrator, \\\`getAttribute()\\\` will return null, and your script will throw a fatal error.
  \`\`\`javascript
  var attr = formContext.getAttribute("name");
  if (attr) {
      var val = attr.getValue();
  }
  \`\`\`

## Common Mistakes

> [!WARNING]
> **Confusing getValue and getText on Lookups/Choices** 
> \\\`getValue()\\\` on a Choice (OptionSet) column returns the integer value (e.g., \\\`100000001\\\`). If you want the localized human-readable text (e.g., "Active"), you must use \\\`getText()\\\`. For Lookups, \\\`getValue()\\\` returns an array containing the GUID, entity type, and name.

## Things to Remember

- \\\`Xrm.Page\\\` is dead. Use **\\\`formContext\\\`**.
- **Attributes** manage data (\\\`getValue\\\`, \\\`setValue\\\`).
- **Controls** manage UI (\\\`setVisible\\\`, \\\`setDisabled\\\`).
- Use **GlobalContext** for user and environment configuration.

## What's Next

The Client API is required for modifying the form you are currently looking at. But what if you need to query Dataverse for *other* records asynchronously? Next, we will cover the **Xrm.WebApi**.
  `.trim(),
};
