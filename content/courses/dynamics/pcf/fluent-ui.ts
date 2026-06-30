import { DocContent } from "@/types/docs";

export const fluentUi: DocContent = {
  title: "Fluent UI",
  description:
    "Learn how to implement the Fluent UI React component library to ensure your PCF controls natively inherit the design language and accessibility standards of Dynamics 365.",
  content: `
## Introduction

When architecting enterprise PCF controls, your primary objective is seamless user experience integration. If a user interacts with a native Dynamics 365 button, and then interacts with your custom PCF button, the rendering engine must execute identically. The hover animations, typography scales, focus outlines, and contrast ratios must perfectly match the host environment.

To guarantee this architectural consistency, you must utilize **Fluent UI** (specifically, \\\`@fluentui/react\\\`). This is the exact open-source React component library Microsoft's own engineering teams use to construct Dynamics 365.

## Installation

When you initialize a modern React PCF project (\\\`pac pcf init -fw react\\\`), the Power Platform CLI automatically injects the necessary Fluent UI dependencies into your \\\`package.json\\\`.

If you are migrating or upgrading a legacy standard project, you must install it manually via NPM:
\`\`\`bash
npm install @fluentui/react
\`\`\`

## Component Implementation

Instead of authoring standard HTML DOM nodes like \\\`<button>\\\` or \\\`<input>\\\`, you must import the Fluent React equivalent.

\`\`\`tsx
import * as React from 'react';
import { PrimaryButton, TextField, Toggle } from '@fluentui/react';

export const SettingsPanel = () => {
    return (
        <div>
            <TextField label="Account Name" required={true} />
            
            <Toggle label="Enable VIP Status" onText="Yes" offText="No" />
            
            <PrimaryButton text="Save Changes" onClick={() => alert("Saved")} />
        </div>
    );
};
\`\`\`

These components automatically render with the strict Microsoft design tokens, compliant Accessibility (ARIA) tags, and comprehensive keyboard navigation support out-of-the-box.

## Dynamic Theming (Architectural Requirement)

Dynamics 365 supports global dynamic theming. An enterprise administrator can alter the primary color of the environment from standard Microsoft Blue to a custom corporate Red. 

If you hardcode CSS styles (e.g., \\\`background-color: blue\\\`) inside your PCF control, your component will look completely disjointed when the global theme is altered. 

Fluent UI components are architected to automatically absorb the current Theme tokens from the host environment.

### Passing the Theme Context to Fluent UI
To guarantee your React components inherit the CRM's active theme, you must wrap your root component in a \\\`ThemeProvider\\\`, and explicitly pass the tokenized theme object extracted from the PCF context.

**In index.ts:**
\`\`\`typescript
public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
    
    // Extract the theme payload from the PCF context 
    // (Note: this requires casting to 'any' in older versions of the type definitions)
    const currentTheme = (context as any).fluentDesignLanguage?.tokenTheme;

    const props = {
        theme: currentTheme,
        data: context.parameters.sampleProperty.raw
    };

    return React.createElement(MyRootComponent, props);
}
\`\`\`

**In MyRootComponent.tsx:**
\`\`\`tsx
import { ThemeProvider } from '@fluentui/react';

export const MyRootComponent = (props) => {
    return (
        <ThemeProvider theme={props.theme}>
            <PrimaryButton text="I dynamically match the CRM theme!" />
        </ThemeProvider>
    );
};
\`\`\`

## Styling with CSS-in-JS (MergeStyles)

If you must author custom CSS that is not covered by a native Fluent component, do not utilize raw \\\`.css\\\` files. Instead, use Fluent's **MergeStyles** utility. This enforces a CSS-in-JS pattern, ensuring your custom styling blocks also respond dynamically to Theme variables.

\`\`\`tsx
import { mergeStyles, getTheme } from '@fluentui/react';

// Extract the active theme object
const theme = getTheme();

// The generated hashed class name will dynamically update if the CRM theme color changes
const customClass = mergeStyles({
    backgroundColor: theme.palette.themePrimary,
    color: theme.palette.white,
    padding: '10px',
    borderRadius: '4px'
});

export const CustomBox = () => <div className={customClass}>Hello Dynamics</div>;
\`\`\`

## Things to Remember

- Never utilize standard HTML inputs for enterprise forms. Use **Fluent UI React components**.
- Fluent UI guarantees strict **Accessibility (a11y)** compliance and visual consistency.
- You must wrap your React tree in a **ThemeProvider** to respect the environment's dynamic color tokens.
- Use **MergeStyles** for all custom CSS-in-JS rendering.

## What's Next

Now that we understand Fluent UI, we can look specifically at how to implement advanced React patterns inside our PCF components. Next, we cover **React Controls**.
  `.trim(),
};
