import { DocContent } from "@/types/docs";

export const pcfOverview: DocContent = {
  title: "Power Apps Component Framework (PCF)",
  description:
    "PCF empowers professional developers to build highly customized, reusable UI controls for Dataverse using modern web technologies like React.",
  content: `
## Introduction

By default, Dataverse renders a Text column as a standard HTML \\\`<input>\\\` box. While you can apply basic out-of-the-box controls (like a star rating), what happens when an enterprise client requests a completely custom user experience?

What if they want a Text column containing a JSON array to render as a fully interactive, drag-and-drop Kanban board directly inside the Model-Driven form?

To achieve this, developers build custom React components using the **Power Apps Component Framework (PCF)**.

## What is it?

PCF is the UI extensibility architecture for Dataverse. It allows professional developers to use modern web technologies (TypeScript, React, CSS) to build custom UI components. 

These components seamlessly replace standard field controls or data grids on a form. They look and feel exactly like native Microsoft components, integrating natively with the form's lifecycle, bidirectional data binding, and security context.

## The Architectural Shift (Death of IFrames)

Historically, to build a custom UI, developers created HTML Web Resources and embedded them in an **IFrame** on the form.
- **The IFrame Problem:** They are heavy, they load slowly, they do not flow natively with the form's CSS architecture, and communicating between the IFrame and the parent form requires unstable \\\`postMessage\\\` hacks.
- **The PCF Solution:** PCF controls do **not** use IFrames. They are injected natively into the browser's DOM alongside the standard Microsoft React components. They receive data automatically from the platform and push data back to the Dataverse pipeline without any custom event wiring.

## The PCF Architecture

A PCF component consists of three primary architectural elements:

### 1. ControlManifest.Input.xml
The metadata blueprint. It defines the structural contract of the control:
- What is the namespace and control name?
- What Dataverse data types does it bind to? (e.g., SingleLine.Text, Decimal, Dataset).
- What custom configurable properties are exposed to the maker in the App Designer?

### 2. index.ts (The Component Class)
The core TypeScript payload. It must implement the strict \\\`ComponentFramework.StandardControl\\\` interface, which dictates four lifecycle methods:

- \\\`init()\\\`: Fires exactly once when the control loads. Used to setup the DOM payload (or mount the React tree).
- \\\`updateView()\\\`: Fires whenever the bound data in Dataverse changes, or the form's physical dimensions change. Used to re-render the UI with the latest state.
- \\\`getOutputs()\\\`: Fires when your control needs to push mutated data back up to the Dataverse form context.
- \\\`destroy()\\\`: Fires when the form closes. Used to cleanly unmount React components and prevent memory leaks.

### 3. Resources (CSS, Resx)
CSS files for styling, and Resx files for multi-language localization.

## Datasets vs Field Controls

You can architect two types of PCF controls:

1. **Field Controls:** Replaces a single column (e.g., replacing a text box with a rich-text editor, or a custom color picker).
2. **Dataset Controls:** Replaces an entire View grid (e.g., replacing a standard SQL table grid with an interactive Bing Map plotting pins for every record).

## The Development Workflow

PCF development requires a modern Node.js CLI environment.

1. **Initialize:** Open VS Code and run \\\`pac pcf init --name MyControl --namespace Contoso --template field\\\`. This scaffolds the project hierarchy.
2. **Dependencies:** Run \\\`npm install\\\`.
3. **Code:** Write your TypeScript and React components.
4. **Test Locally:** Run \\\`npm start\\\`. This launches a local Node test harness in your browser, allowing rapid UI testing without deploying to Dataverse.
5. **Build & Deploy:** Run \\\`pac pcf push\\\` to package the compiled control into a Dataverse solution and push it to the development environment.

## Using React (The Standard)

Microsoft heavily standardizes on React for PCF development. They provide a specialized initialization template (\\\`--template field -fw react\\\`) that natively bundles React and Fluent UI. This allows developers to build enterprise-grade, accessible UI components incredibly quickly using Microsoft's own internal design language.

## Best Practices

- **Use Fluent UI:** If you want your custom control to blend seamlessly into the Dynamics 365 interface, you must use the \\\`@fluentui/react\\\` library. 
- **Check the Community:** Before spending a week building a custom calendar, check the **PCF Gallery** (pcf.gallery). The open-source community provides hundreds of free, production-ready PCF controls.

## Common Mistakes

> [!CAUTION]
> **Memory Leaks in destroy()** 
> If you attach custom DOM event listeners (like \\\`window.addEventListener("resize")\\\`) in your \\\`init\\\` method, but fail to explicitly remove them in the \\\`destroy\\\` method, those listeners remain active in the browser's memory even after the user navigates away from the form. Over a long session, the browser will consume massive amounts of RAM and crash the tab.

## Things to Remember

- PCF permanently replaces legacy **HTML IFrames**.
- Controls bind natively to **Fields** or **Datasets**.
- The core lifecycle methods are **init, updateView, getOutputs, and destroy**.
- PCF requires a modern **TypeScript/Node.js** workflow.

## What's Next

Now that we understand the architecture of PCF, we need to look at how these files are actually compiled and tested locally. Next, we cover **Building PCF Controls**.
  `.trim(),
};
