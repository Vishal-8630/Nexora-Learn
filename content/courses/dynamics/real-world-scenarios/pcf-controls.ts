import { DocContent } from "@/types/docs";

export const pcfControls: DocContent = {
  title: "Power Apps Component Framework (PCF)",
  description:
    "Replace standard Dataverse form inputs with rich, interactive, React-based custom components using PCF.",
  content: `
## The Business Requirement

"The standard Dataverse text field for 'Shipping Address' is prone to typos. We want a visual, interactive Google Maps widget right on the Account form. As the user types the address, it should autocomplete, drop a pin on the map, and save the Latitude and Longitude back to the Dataverse record."

## The Naive Approach

A beginner might create an HTML Web Resource (an \`<iframe>\`), embed it on the Dataverse form, write custom HTML/JS to render the Google Map, and use the \`window.parent.Xrm\` object to attempt to push the Latitude/Longitude back up into the parent form.
- **Why it fails:** \`<iframe>\` integrations are slow, block page loading, look jarringly different from the native Fluent UI styling, and frequently break across mobile and tablet devices.

## The Enterprise Architecture

The architect uses the **Power Apps Component Framework (PCF)** to build a native-feeling control.

### 1. Initialization (PAC CLI)
The developer uses the PAC CLI to initialize a new PCF project (\`pac pcf init\`). They define the control in the \`ControlManifest.Input.xml\`, specifying that this control binds to a "SingleLine.Text" field (the Address) and outputs two "Decimal" fields (Lat and Long).

### 2. React and Fluent UI
PCF officially supports React. The developer builds the component using standard React hooks and styles it using Microsoft's **Fluent UI** library. Because they use Fluent UI, the map's search bar, fonts, and borders match the native Dynamics 365 interface perfectly.

### 3. The Context API
Inside the \`updateView\` method of the PCF control, the developer receives the \`context\` object provided by the Dataverse host. 
- They extract the current address string: \`context.parameters.addressField.raw\`.
- They render the Google Map React component.

### 4. Notifying the Host
When the user drags the pin on the map to a new location, the React component fires an \`onChange\` event.
The PCF control does *not* use \`Xrm.WebApi\` to save the data. Instead, it calls \`context.parameters.addressField.notifyOutputChanged()\`.
This alerts the Dataverse form that the data has changed. The form pulls the new Latitude and Longitude from the control's \`getOutputs()\` method and marks the form as "Dirty" (unsaved changes). 

The Dataverse host handles the actual SQL save operation when the user clicks the "Save" button on the ribbon.

## Things to Remember

- Never use HTML Web Resources (\`<iframe>\`) for data entry. Use **PCF**.
- PCF controls run natively in the DOM, meaning they are fast and mobile-responsive.
- Use **React and Fluent UI** to ensure the control looks exactly like native Dynamics 365.
- The control does not save data directly; it uses \`notifyOutputChanged()\` to pass data back to the host form.
  `.trim(),
};
