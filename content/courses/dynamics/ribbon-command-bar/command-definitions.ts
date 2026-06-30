import { DocContent } from "@/types/docs";

export const commandDefinitions: DocContent = {
  title: "Command Definitions",
  description:
    "Learn how Command Definitions act as the central nervous system connecting UI buttons to Rules and Actions in the Ribbon architecture.",
  content: `
## Introduction

In the Dynamics 365 Ribbon architecture, you never attach logic directly to a Button. 

Instead, a Button (the UI) is bound to a **Command Definition**. The Command Definition acts as a central hub that orchestrates exactly how that button behaves.

## Why use Command Definitions?

Why not just put the JavaScript function directly on the button? **Reusability.**

Imagine you have a complex business rule: *"The 'Approve' action should only be visible to Managers, only when the record is Active, and clicking it calls the \`ApproveRecord\` JavaScript function."*

You might want an "Approve" button on the **Main Form**, and another "Approve" button on the **Home Grid** so users can approve multiple records at once. 
Instead of duplicating the rules and logic on both buttons, you create **one** Command Definition. You then point both buttons to that same Command Definition.

## Structure of a Command

A Command Definition consists of three parts:

### 1. Display Rules
- "Should this button even exist on the screen?"
- A command can have multiple Display Rules. If *any* of them evaluate to false, the button is completely hidden from the UI.
- *Example:* Hide the button on mobile devices, or hide it if the user lacks a specific security role.

### 2. Enable Rules
- "If the button is on the screen, is the user allowed to click it?"
- If an Enable Rule evaluates to false, the button remains visible, but it is grayed out (disabled).
- *Example:* Disable the button if the user hasn't filled out the "Reason" text field on the form yet.

### 3. Actions
- "What happens when the user actually clicks the button?"
- A command can trigger a JavaScript function, open a URL, or (in the modern designer) run a Power Fx formula.

## Passing Parameters (CrmParameters)

When an Action (like a JavaScript function) or a Custom Rule fires, it usually needs to know *what* it is acting upon. You must pass parameters from the Command down to your code.

In the Ribbon Workbench, you configure **CrmParameters**.

**Common CrmParameters:**
- \`PrimaryControl\`: (The most important one). This passes the \`formContext\` to your JavaScript, allowing your script to read and write data on the form.
- \`SelectedControlSelectedItemIds\`: Used on Home Grids/Subgrids. Passes an array of GUIDs representing the rows the user checked in the grid.
- \`PrimaryEntityTypeName\`: Passes the logical name of the table (e.g., \`"account"\`).

## Troubleshooting Commands

If you add a custom button in Ribbon Workbench, but it refuses to show up in Dynamics 365, the Command Definition is almost always the culprit.

**The Golden Rule of Ribbon Troubleshooting:**
If a Button does not have a Command attached to it, or if the Command has zero Actions defined inside it, **Dynamics 365 will automatically hide the button**.

*Why?* Because Microsoft assumes a button that does nothing is a broken button, so it suppresses it from the user interface.

## Things to Remember

- **Buttons** are just UI. **Commands** are the brains.
- A Command contains **Display Rules, Enable Rules, and Actions**.
- Always pass **PrimaryControl** to your JavaScript so you have access to the Form Context.
- A button without a valid Command will be **hidden automatically**.

## What's Next

Now that we understand how Commands act as the hub, let's look at the primary type of action executed by those commands: **JavaScript Actions**.
  `.trim(),
};
