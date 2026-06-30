import { DocContent } from "@/types/docs";

export const contextApi: DocContent = {
  title: "Context API",
  description:
    "Explore the ComponentFramework.Context object, which provides the architectural bridge between isolated PCF controls and the Dataverse host environment.",
  content: `
## Introduction

When you build a PCF control, it runs inside a secure, sandboxed container within the browser. All communication with the outside host environment (Dynamics 365 / Dataverse) happens exclusively through the **\\\`ComponentFramework.Context\\\`** object. 

This object is injected into your \\\`init\\\` and \\\`updateView\\\` lifecycle methods. It acts as the sole architectural bridge to the Dataverse WebAPI, the user's localization settings, routing/navigation, and mobile device hardware.

## 1. User Settings (context.userSettings)

If you are rendering a Date or Number, you must format it according to the user's explicit local preferences (e.g., \\\`MM/DD/YYYY\\\` in the US vs \\\`DD/MM/YYYY\\\` in Europe). Failing to do so breaks enterprise compliance.

\`\`\`typescript
const isRTL = context.userSettings.isRightToLeft;
const languageId = context.userSettings.languageId;
const userId = context.userSettings.userId;

// Crucial for evaluating client-side RBAC logic (returns an array of GUIDs)
const securityRoles = context.userSettings.securityRoles;
\`\`\`

## 2. Formatting (context.formatting)

Dataverse provides utility methods to safely format raw database payloads into human-readable strings based on the user's settings.

\`\`\`typescript
const rawDate = new Date();
const displayDate = context.formatting.formatDateShort(rawDate);

const rawCurrency = 150000.5;
const displayCurrency = context.formatting.formatCurrency(rawCurrency); // "$150,000.50"
\`\`\`

## 3. Navigation (context.navigation)

If you need to open a record, show an error dialog, or open a confirmation prompt, you **must** use the native navigation API. 

> [!CAUTION]
> **Never use window.alert**
> Native browser modals like \\\`window.alert()\\\` or \\\`window.confirm()\\\` block the main UI thread and provide a horrible user experience. They are strictly prohibited in enterprise PCF development.

\`\`\`typescript
// Open a non-blocking error dialog
context.navigation.openErrorDialog({ message: "Failed to retrieve dataset from SQL" });

// Open an Account record contextually
context.navigation.openForm({
    entityName: "account",
    entityId: "12345678-1234-1234-1234-123456789012"
});
\`\`\`

## 4. Web API (context.webAPI)

If your control requires relational data beyond the single column it is bound to, it can securely query Dataverse directly. 

> [!IMPORTANT]
> You **must** explicitly request the \\\`WebAPI\\\` feature in your \\\`ControlManifest.Input.xml\\\` file, otherwise \\\`context.webAPI\\\` will intentionally evaluate to \\\`undefined\\\` at runtime.

\`\`\`typescript
// Retrieve the primary contact for an account asynchronously
context.webAPI.retrieveRecord("contact", contactId, "?$select=fullname,emailaddress1").then(
    (result) => {
        console.log(result.fullname);
    },
    (error) => {
        console.error(error.message);
    }
);
\`\`\`

*Architectural Note: The PCF WebAPI is a restricted, secure subset of the global \\\`Xrm.WebApi\\\`. Executing custom unbound OData actions is notably difficult via \\\`context.webAPI\\\`.*

## 5. Device Hardware (context.device)

If your PCF control is executed on the Power Apps Mobile Client, you can access the phone's native hardware sensors.

> [!IMPORTANT]
> You must explicitly request device features in the Manifest (e.g., \\\`<uses-feature name="Device.captureImage" required="true" />\\\`).

\`\`\`typescript
// Intercept the native camera API
context.device.captureImage({ allowEdit: true, preferFrontCamera: false }).then(
    (file) => {
        // file.fileContent contains the Base64 image payload
        console.log("Image captured securely.");
    },
    (error) => {
        console.error("Hardware permission denied.");
    }
);
\`\`\`

## Injecting Context into React

Because the \\\`context\\\` object is only provided to the \\\`index.ts\\\` wrapper, you must pass it down into your React tree if you want to execute WebAPI or Navigation calls from child components.

**Option 1: Props Drilling**
Pass \\\`context\\\` as a property in your root interface. This is acceptable for simple trees but creates tight coupling in deep DOM hierarchies.

**Option 2: React Context API (Recommended)**
Create a React Context to hold the PCF Context, wrap your root component in a Provider, and utilize the \\\`useContext\\\` hook deep within your React tree. This decouples your UI components from the PCF infrastructure.

## Things to Remember

- The **Context API** is your sole architectural bridge to Dataverse.
- Utilize **userSettings** and **formatting** to ensure global localization compliance.
- Utilize **navigation** for dialogs and routing.
- You must declare **WebAPI** and **Device** usage in the XML Manifest.

## What's Next

Now that we understand how the code communicates with Dataverse, we must understand how Dataverse reads the control's architecture. Next, we cover the **Control Manifest**.
  `.trim(),
};
