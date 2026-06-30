import { DocContent } from "@/types/docs";

export const fieldControls: DocContent = {
  title: "Field Controls",
  description:
    "Learn how to architect Field PCF Controls that replace a single column on a Dynamics 365 form with a highly customized, interactive React component.",
  content: `
## Introduction

A **Field Control** is a PCF component architected specifically to replace the standard Microsoft UI rendering for a single schema column on a Model-Driven Form.

- Instead of a standard text box, you render a full Rich Text Editor.
- Instead of a generic integer input, you render an interactive Drag Slider.
- Instead of a True/False dropdown, you render a visual iOS-style Toggle Switch.

## Initializing a Field Control

When utilizing the Power Platform CLI, you specify the template architecture:
\`\`\`bash
pac pcf init --namespace Contoso --name CustomSlider --template field -fw react
\`\`\`

## Binding Data (ControlManifest)

A Field Control typically maintains one primary **\\\`bound\\\`** property. This defines the absolute Dataverse SQL column the control is reading from and mutating.

\`\`\`xml
<property name="controlValue" 
          display-name-key="Slider Value" 
          of-type="Whole.None" 
          usage="bound" 
          required="true" />
\`\`\`

You can also architect auxiliary **\\\`input\\\`** properties. For example, if you build a Slider, you require Minimum and Maximum threshold parameters. The administrator will configure these statically in the Form Designer.

\`\`\`xml
<property name="minValue" display-name-key="Minimum" of-type="Whole.None" usage="input" />
<property name="maxValue" display-name-key="Maximum" of-type="Whole.None" usage="input" />
\`\`\`

## Reading Data in TypeScript

When the Model-Driven Form initially loads, or the backend data pipeline mutates, the \\\`updateView\\\` lifecycle method fires. You extract the payload from the \\\`context.parameters\\\` object.

\`\`\`typescript
public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
    
    // Extract the bound transaction value (e.g., 50)
    let currentValue: number = context.parameters.controlValue.raw || 0;
    
    // Extract the statically configured inputs (e.g., 0 and 100)
    let min: number = context.parameters.minValue.raw || 0;
    let max: number = context.parameters.maxValue.raw || 100;

    // Inject these parameters into your React tree as Props...
}
\`\`\`

## Mutating Data

When the user interacts with your React component (e.g., physically drags the slider to 75), the React DOM must fire a callback function back up to the \\\`index.ts\\\` wrapper.

You must persist this mutated value globally in the class instance, and then explicitly execute \\\`this.notifyOutputChanged()\\\`.

\`\`\`typescript
private _currentValue: number;

// Callback executed by the React component
public onChange(newValue: number): void {
    this._currentValue = newValue;
    this.notifyOutputChanged(); // Alerts the Dataverse platform that data has mutated
}
\`\`\`

Dataverse will then immediately execute your \\\`getOutputs\\\` method to extract the new data payload:

\`\`\`typescript
public getOutputs(): IOutputs {
    return {
        controlValue: this._currentValue
    };
}
\`\`\`

## Form State and Security Context (Architectural Rule)

Field controls are not isolated; they exist within the strict security context of the form. If a form is Read-Only (because the underlying record is deactivated, or the user lacks RBAC write privileges), your PCF control must natively render in a disabled, Read-Only state.

You evaluate this via the \\\`context.mode\\\` object.

\`\`\`typescript
let isReadOnly = context.mode.isControlDisabled;
let isVisible = context.mode.isVisible;

// You MUST pass isReadOnly as a Prop to your React component, 
// and explicitly disable the HTML inputs if true!
\`\`\`

## Common Mistakes

> [!CAUTION]
> **Ignoring isControlDisabled Context** 
> If you build a highly interactive custom rating control, but fail to evaluate \\\`context.mode.isControlDisabled\\\`, a user without SQL write privileges will still be able to click the UI elements on a Read-Only form. While the Dataverse backend will ultimately block the invalid SQL transaction, the UI state will appear broken and confusing. You must strictly disable your DOM inputs when the platform context demands it.

## Things to Remember

- Field Controls bind tightly to a **single Dataverse schema column**.
- Define the primary data pipeline as **\\\`usage="bound"\\\`**.
- Define static configuration parameters as **\\\`usage="input"\\\`**.
- You must always respect and implement **\\\`context.mode.isControlDisabled\\\`**.

## What's Next

Field controls handle singular data payloads. What if you want to replace an entire tabular list of records, like the "Active Contacts" grid? Next, we will cover **Dataset Controls**.
  `.trim(),
};
