import { DocContent } from "@/types/docs";

export const reactControls: DocContent = {
  title: "React PCF Controls",
  description:
    "Learn how to architect Virtual PCF controls using React, managing state decoupling, prop injection, and utilizing the native Dataverse rendering engine.",
  content: `
## Introduction

When the Power Apps Component Framework (PCF) initially launched, developers were forced to build standard controls using raw HTML DOM manipulation (e.g., \\\`document.createElement\\\`). 

Today, Microsoft mandates that enterprise developers construct **React PCF Controls**. The Dataverse platform natively bundles and supports React, eliminating the need to bundle the React library yourself. This drastically reduces the JavaScript payload size and significantly improves client-side rendering performance.

## Virtual vs Standard Controls

When initializing a new PCF project, you dictate the fundamental architecture:
\`\`\`bash
pac pcf init --namespace Contoso --name ReactSlider --template field -fw react
\`\`\`

Utilizing the \\\`-fw react\\\` flag fundamentally alters the component architecture:
- In a **Standard** control, the \\\`updateView\\\` method provides a raw HTML \\\`<div>\\\`. You manually append DOM elements to it.
- In a **Virtual (React)** control, the \\\`updateView\\\` method returns a strictly typed \\\`React.ReactElement\\\`. The Power Apps platform takes that object and natively injects it into its own internal React Virtual DOM hierarchy.

## 1. The React Component (Props)

Your React component receives data from the Dataverse pipeline exclusively via **Props**.

\`\`\`tsx
import * as React from 'react';

export interface IHelloWorldProps {
    name?: string;
    onNameChange: (newName: string) => void;
}

export const HelloWorld: React.FC<IHelloWorldProps> = (props) => {
    return (
        <div>
            <h1>Hello, {props.name}</h1>
            <input 
                type="text" 
                value={props.name || ""} 
                onChange={(e) => props.onNameChange(e.target.value)} 
            />
        </div>
    );
}
\`\`\`

## 2. The index.ts (The Bridge)

The \\\`index.ts\\\` file acts as the architectural bridge between Dataverse and your React UI. It must implement the \\\`ComponentFramework.ReactControl\\\` interface.

### init()
Executed for one-time environment setup (e.g., fetching initial static WebAPI data or establishing structural variables).

### updateView()
This fires whenever Dataverse detects a change in the state pipeline (e.g., the user loaded the form, or a Business Rule mutated a background field). 
You must construct the React element and inject the latest Props.

\`\`\`typescript
public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
    const props: IHelloWorldProps = {
        // Pass data FROM the Dataverse pipeline TO React
        name: context.parameters.sampleProperty.raw || "",
        
        // Pass a callback function to extract data FROM React BACK to Dataverse
        onNameChange: (newValue: string) => {
            this._currentValue = newValue;
            
            // Notify the Dataverse transaction pipeline that data has mutated
            this.notifyOutputChanged();
        }
    };

    // Return the React Element (The platform will mount it)
    return React.createElement(HelloWorld, props);
}
\`\`\`

### getOutputs()
Fires immediately after you execute \\\`this.notifyOutputChanged()\\\`. Dataverse executes this method to extract the new value and commit it to the Form Context.

\`\`\`typescript
public getOutputs(): IOutputs {
    return {
        sampleProperty: this._currentValue
    };
}
\`\`\`

## Decoupling State and Re-renders (Architectural Rule)

> [!CAUTION]
> **The Input Lag Anti-Pattern**
> In a standard React application, when a user types in a textbox, the \\\`onChange\\\` event updates local State, and the UI re-renders instantly.
> 
> In a PCF Control, if you type in a textbox and immediately call \\\`notifyOutputChanged()\\\`, the data travels out of React, into Dataverse, Dataverse processes the business logic, and then Dataverse fires \\\`updateView()\\\` again, which pushes the new data back into React via Props.
> 
> If the network or browser is slow, typing quickly will cause the textbox cursor to violently jump or lag because the state loop latency is too high.

**Architectural Best Practice:**
Your React component must maintain its own local \\\`useState\\\` for immediate, fluid UI updates. You must use a debounced \\\`useEffect\\\` hook (or an \`onBlur\` event) to push the final mutated value to Dataverse via \\\`notifyOutputChanged\\\` only when the user finishes interacting.

## Things to Remember

- Execute \\\`-fw react\\\` to architect native **Virtual controls**.
- \\\`updateView\\\` must explicitly return a **ReactElement**.
- React communicates with Dataverse via **Props** and **notifyOutputChanged**.
- You must decouple local **State** to ensure a smooth UI, pushing to Dataverse asynchronously.

## What's Next

This concludes the Power Apps Component Framework module. You can now build highly customized, enterprise-grade UIs. However, complex UIs and heavy code often lead to severe performance degradation if unchecked. Next, we enter the final phase: **Performance Optimization**.
  `.trim(),
};
