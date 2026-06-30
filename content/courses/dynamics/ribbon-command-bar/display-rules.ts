import { DocContent } from "@/types/docs";

export const displayRules: DocContent = {
  title: "Display Rules",
  description:
    "Display Rules dictate whether a button on the Command Bar is visible to the user or completely hidden, usually based on application state or security roles.",
  content: `
## Introduction

Sometimes, graying out a button isn't enough. If you have a custom "Admin Debug" button, you don't want standard sales users to even know it exists. Seeing grayed-out buttons they can never click clutters the UI and causes confusion.

To completely hide a button from the Command Bar, we use **Display Rules**.

## What is it?

A **Display Rule** evaluates conditions at the moment the form or grid loads. 
- If the rule evaluates to \`True\`, the button is rendered on the screen.
- If the rule evaluates to \`False\`, the button is removed from the DOM completely.

*Note: As mentioned in Enable Rules, the modern Unified Interface often hides disabled buttons automatically to save space. However, Display Rules are specifically evaluated early in the page load lifecycle to determine rendering, making them faster for permanent hiding.*

## Standard Display Rule Types

When using the Ribbon Workbench, you can add standard Display Rules without writing code:

### 1. MiscellaneousPrivilegeRule
Checks if the current user has a specific global privilege.
- *Example:* Only show the "Export Data" button if the user has the global "Export to Excel" security privilege.

### 2. EntityPrivilegeRule
Checks if the user has specific access to a specific table.
- *Example:* Only show the button if the user has \`Delete\` privileges on the \`Account\` table.

### 3. ClientTypeRule
Checks what kind of application the user is running.
- **Web:** Standard browser.
- **Outlook:** The legacy Dynamics CRM Outlook client.
- **Mobile:** The Power Apps mobile app.
- *Example:* Hide the "Print Report" button if the user is on the Mobile app, because printing isn't supported there.

### 4. FormEntityContextRule
Checks if the button is being displayed in the context of a specific form.
- *Example:* You add a button to the global Application Ribbon, but you create a Display Rule so it only appears when the user is specifically looking at the \`Opportunity\` table.

## Custom JavaScript Display Rules

Just like Enable Rules, you can write a \`CustomRule\` for a Display Rule that executes a JavaScript function. The function must return a boolean (\`true\` or \`false\`).

\`\`\`javascript
var Nexora = Nexora || {};
Nexora.Ribbon = {
    
    // Check if the user is in a specific security role
    isAdminUser: function() {
        var globalContext = Xrm.Utility.getGlobalContext();
        var userRoles = globalContext.userSettings.securityRoles;
        
        // Example GUID of the System Administrator role
        var adminRoleId = "11111111-2222-3333-4444-555555555555";
        
        for (var i = 0; i < userRoles.length; i++) {
            if (userRoles[i] === adminRoleId) {
                return true; // Show the button
            }
        }
        
        return false; // Hide the button
    }
};
\`\`\`

## Display Rules vs Enable Rules

Because the modern UI hides disabled buttons, developers often ask: *"Should I use a Display Rule or an Enable Rule?"*

1. **Use Display Rules for static, unchanging conditions:** If the condition will not change while the user is looking at the screen (e.g., the user's Security Roles, the Client Type, or if it's the Mobile App).
2. **Use Enable Rules for dynamic, data-driven conditions:** If the condition might change while the user is typing (e.g., hiding a button until the "Total Amount" field becomes greater than $500).

Display rules are evaluated *once* when the ribbon loads. Enable rules are evaluated *constantly*. Using Display Rules for static checks is much better for performance.

## Best Practices

- **Avoid hardcoding GUIDs:** In the custom JavaScript example above, hardcoding a Security Role GUID is risky because the GUID might be different in the Production environment. It is safer to query the WebAPI for the role name, but remember that Display Rules should be fast and synchronous! A better approach is to use standard \`EntityPrivilegeRules\` based on a dummy table only Admins have access to.
- **Layer your security:** Hiding a button with a Display Rule does **not** secure the underlying action. If the button triggers a workflow or an API call, a malicious user can still trigger that workflow via the browser console. Always secure the backend (Plugins/Roles) in addition to hiding the button.

## Common Mistakes

> [!WARNING]
> **Trying to dynamically hide buttons based on form data using Display Rules** — If you use a Display Rule to check if the \`Status = Active\`, the button might show correctly when the form loads. But if the user changes the status to \`Inactive\` without refreshing the page, the Display Rule will *not* re-evaluate, and the button will still be visible. Use Enable Rules for data-dependent hiding.

## Things to Remember

- **Display Rules** determine if the button exists on the screen.
- They are evaluated **once** during load.
- Use them for static checks (**Security Roles**, **Client Type**).
- Use **Enable Rules** for dynamic checks based on form data.

## What's Next

This concludes Phase 7 and all core UI customization techniques! 
We now move out of the core CRM configuration and into enterprise integration and architecture. Next, we look at **Standalone Sections** starting with **Power Automate**.
  `.trim(),
};
