import { DocContent } from "@/types/docs";

export const resxWebResources: DocContent = {
  title: "RESX (Localization)",
  description:
    "Learn how to use RESX Web Resources to build multi-language, localized client-side architecture in Dynamics 365.",
  content: `
## Introduction

If a multinational company uses Dynamics 365, an employee in New York will use the CRM in English, while an employee in Paris will use the exact same CRM in French. 

Microsoft Dataverse handles the translation of out-of-the-box UI elements (like Table names and standard buttons) automatically based on the user's language settings. 

But what about your custom JavaScript? If you write \`Xrm.Navigation.openAlertDialog({ text: "Hello World" })\`, the French user will see "Hello World" in English. 

To localize custom client-side code and PCF controls, we use **RESX (Resource) Web Resources**.

## What is a RESX file?

A RESX file is an XML-based file format used by Microsoft for string resources. It stores key-value pairs of strings for a specific language.

*Example: \`messages.1033.resx\` (English - US)*
\`\`\`xml
<data name="GreetingMessage">
  <value>Hello World</value>
</data>
<data name="Error_CreditLimit">
  <value>The credit limit has been exceeded.</value>
</data>
\`\`\`

*Example: \`messages.1036.resx\` (French)*
\`\`\`xml
<data name="GreetingMessage">
  <value>Bonjour le monde</value>
</data>
<data name="Error_CreditLimit">
  <value>La limite de crédit a été dépassée.</value>
</data>
\`\`\`

*(Note: The numbers 1033 and 1036 are Microsoft Locale ID (LCID) codes).*

## Uploading RESX to Dataverse

1. You create an XML file containing your strings.
2. You upload it to Dataverse and select the type **String (RESX)**.
3. Crucially, when uploading, you must select the **Language** dropdown that matches the language of the strings inside the file.
4. You must name the files appropriately so they form a family (e.g., \`con_messages.1033.resx\` and \`con_messages.1036.resx\`).

## Using RESX in JavaScript (Xrm.Utility)

Once the files are uploaded, you can fetch the correct translated string dynamically in your JavaScript using the \`Xrm.Utility.getResourceString\` API.

\`\`\`javascript
// Syntax: Xrm.Utility.getResourceString("WebResourceName", "KeyName")

// Dynamics 365 will automatically check the current user's language settings.
// If the user is French, it will automatically pull from the 1036 RESX file.
var localizedMessage = Xrm.Utility.getResourceString("con_messages", "Error_CreditLimit");

// The popup will show in French or English depending on the user!
Xrm.Navigation.openAlertDialog({ text: localizedMessage });
\`\`\`

## Using RESX in PCF Controls

The Power Apps Component Framework natively supports RESX localization.

When you create a PCF control, you can add a \`strings\` folder containing your RESX files. You declare them in the \`ControlManifest.Input.xml\`:

\`\`\`xml
<resources>
  <code path="index.ts" order="1"/>
  <resx path="strings/CustomControl.1033.resx" version="1.0.0" />
  <resx path="strings/CustomControl.1036.resx" version="1.0.0" />
</resources>
\`\`\`

Inside your PCF TypeScript code, you fetch the string using the component framework context:

\`\`\`typescript
public updateView(context: ComponentFramework.Context<IInputs>): void {
    
    // PCF automatically resolves the correct language string based on the user's CRM settings
    const localizedString = context.resources.getString("Error_CreditLimit");
    
    // Render the React component with the localized string...
}
\`\`\`

## Best Practices

- **Never hardcode strings:** Even if your company only operates in one language right now, never hardcode user-facing strings (errors, notifications, dialogs) into your JavaScript or React components. Always use a RESX file. It makes future expansion trivial.
- **Fallback Language:** The English (1033) file is typically designated as the base/fallback language. If a user's specific language file is missing a translation for a specific key, Dataverse will fall back to the base language.

## Things to Remember

- RESX files store **Language Strings** as XML key-value pairs.
- Upload separate RESX files for **each supported language**.
- Use **Xrm.Utility.getResourceString** in JavaScript to fetch translations.
- Use **context.resources.getString** in PCF controls.

## What's Next

This concludes Phase 12! We have covered the entire client-side architecture stack: HTML, CSS, JavaScript, React, TypeScript, Images, and Localization.
  `.trim(),
};
