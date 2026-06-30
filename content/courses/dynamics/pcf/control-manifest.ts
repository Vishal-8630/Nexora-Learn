import { DocContent } from "@/types/docs";

export const controlManifest: DocContent = {
  title: "Control Manifest",
  description:
    "Learn about the ControlManifest.Input.xml file, the strict metadata blueprint that defines the configuration, schema binding, and resources for a PCF control.",
  content: `
## Introduction

When you deploy a Power Apps Component Framework (PCF) control, the Dataverse platform needs to know exactly what the control is, what database schema it expects, and what frontend assets (CSS, React bundles) it requires.

This architectural metadata is defined entirely inside the **\\\`ControlManifest.Input.xml\\\`** file. It acts as the absolute blueprint for your component.

## Structure of the Manifest

The XML manifest consists of three primary structural nodes:
1. **\\\`<control>\\\`**: The core metadata (Namespace, Version, Control Type).
2. **\\\`<property>\\\`** or **\\\`<data-set>\\\`**: The data inputs the Administrator will configure in the Power Apps Maker UI.
3. **\\\`<resources>\\\`**: The compiled files (TypeScript, CSS, RESX) the control requires to render.

## 1. The Control Node

This node defines the rigid identity of the control.
\`\`\`xml
<control namespace="Contoso.Controls" 
         constructor="SliderControl" 
         version="1.0.0" 
         display-name-key="Slider_Display_Key" 
         description-key="Slider_Desc_Key" 
         control-type="standard">
\`\`\`
- **namespace & constructor:** These must perfectly match the namespace and class name exported in your \\\`index.ts\\\` file.
- **version (ALM Requirement):** Crucial for Application Lifecycle Management. When you make changes, you **must** increment the semantic version (e.g., \\\`1.0.1\\\`) before building, otherwise Dataverse will completely ignore the update upon import.
- **control-type:** Usually \\\`standard\\\` for field controls, or \\\`virtual\\\` if it is heavily optimized for native React rendering.

## 2. Properties (Inputs and Outputs)

Properties define the schema data binding. When an Admin adds your custom control to a Form, they use the Maker UI to map a Dataverse SQL column to your property.

\`\`\`xml
<property name="sliderValue" 
          display-name-key="Value" 
          description-key="The value of the slider" 
          of-type="Whole.None" 
          usage="bound" 
          required="true" />
\`\`\`

### The "usage" attribute
- **\\\`bound\\\`**: This property is physically tied to the Dataverse data pipeline. If your PCF control mutates this value and calls \\\`notifyOutputChanged()\\\`, the Dataverse form becomes "dirty" and the user is prompted to save the transaction to SQL.
- **\\\`input\\\`**: A static configuration value passed in by the Admin (e.g., configuring a static "Max Limit" of 100 for the slider). The PCF control can read this payload, but cannot mutate it.

### Property Groups
If your control is complex (like a map that requires Latitude, Longitude, and Zoom Level), you can group properties together in the XML so they appear logically organized in the Maker UI properties panel.

## 3. Resources

The resources node dictates to the Webpack compiler which files to bundle into the final payload.

\`\`\`xml
<resources>
  <code path="index.ts" order="1" />
  <css path="css/SliderControl.css" order="1" />
  <resx path="strings/SliderControl.1033.resx" version="1.0.0" />
</resources>
\`\`\`
- **Code:** Points to the entry TypeScript file.
- **CSS:** Any stylesheets your component requires. The PCF compiler automatically scopes this CSS using generated hashes so it does not accidentally override the rest of the Dynamics 365 form.
- **Resx:** Used for enterprise multi-language localization.

## Feature Capabilities (Permissions)

The manifest also strictly defines what native device hardware or platform APIs the PCF control is allowed to access. If you are building a barcode scanner, you must explicitly request access to the device camera.

\`\`\`xml
<feature-usage>
  <uses-feature name="Device.captureAudio" required="true" />
  <uses-feature name="Device.captureImage" required="true" />
  <uses-feature name="Device.captureVideo" required="true" />
  <uses-feature name="Device.getBarcodeValue" required="true" />
  <uses-feature name="Device.getCurrentPosition" required="true" />
  <uses-feature name="Device.pickFile" required="true" />
  <uses-feature name="WebAPI" required="true" />
</feature-usage>
\`\`\`

> [!CAUTION]
> **WebAPI Feature Omission** 
> If your PCF control needs to query other tables in Dataverse (e.g., an autocomplete dropdown that queries Contacts), you **must** include \\\`<uses-feature name="WebAPI" required="true" />\\\`. Without this explicit declaration, the platform will silently block API access and \\\`context.webAPI\\\` will be undefined in your TypeScript logic.

## Things to Remember

- The Manifest is the strict **blueprint** for the Maker UI.
- Use **\\\`bound\\\`** properties for transactional data pipelines, and **\\\`input\\\`** properties for static configuration.
- You must declare all **CSS and RESX** files in the resources node.
- You must explicitly declare **WebAPI** or device hardware access in the feature-usage node.

## What's Next

We know how to bind to a single field using the Property node. Next, we cover how to bind to entire Dataverse lists using **Dataset Controls**.
  `.trim(),
};
