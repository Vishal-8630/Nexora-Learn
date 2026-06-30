import { DocContent } from "@/types/docs";

export const instantFlows: DocContent = {
  title: "Instant Flows",
  description:
    "Learn about Instant Cloud Flows in Power Automate, which allow users to trigger automations manually with the click of a button.",
  content: `
## Introduction

In Power Automate, the "Trigger" is the event that starts the workflow. While many workflows run automatically in the background, there are scenarios where a user needs to explicitly decide when a process should run.

For this, we use an **Instant Cloud Flow** (often referred to as a "Button Flow").

## What is an Instant Flow?

An Instant Flow is triggered manually by a user. Instead of waiting for a record to be created or a scheduled time to arrive, the flow waits for a human to click a button.

## Common Use Cases

- **On-Demand Processing:** A user selects an Account record and clicks a button to "Run Credit Check" right now.
- **Mobile Convenience:** A field worker opens the Power Automate mobile app and taps a large button on their screen to log their arrival at a client site.
- **Data Input:** A manager clicks a button in Teams, which prompts them for a \`Discount Amount\`, and then runs a flow to apply that discount to all open quotes.

## Triggers for Instant Flows

When creating an Instant Flow, you must select the specific manual trigger mechanism:

### 1. Manually trigger a flow (The standard button)
This is the most common trigger. It can be clicked from the Power Automate mobile app, the web portal, or embedded inside other Microsoft apps.
- **Input Parameters:** You can configure this trigger to ask the user for data before the flow starts. For example, when they click the button, a popup can ask for a Text string, a Date, a File upload, or an Email address.

### 2. For a selected row (Dataverse / Dynamics 365)
If you select the Dataverse trigger **"When a row is selected"**, this flow becomes natively available inside Dynamics 365 Model-Driven Apps.
- **How it works:** When a user is looking at a grid (List View) of Contacts, they select a row, click the **Flow** button on the Command Bar, and choose your Instant Flow.
- **What it does:** It passes the specific GUID of the selected record into Power Automate, allowing your flow to process that specific record.

### 3. Power Apps (Canvas Apps)
You can trigger a flow directly from a custom button inside a Canvas App. The Canvas App can pass variables (like the text from a text input box) directly into the flow.

### 4. Microsoft Teams
You can create an Instant Flow that triggers from the "..." menu on a specific Teams message. For example, "Create Dynamics 365 Lead from this Teams Message".

## Best Practices

- **Limit Dataverse Button Flows:** While "For a selected row" is convenient, it can clutter the Command Bar if you have dozens of them. For highly complex operations that need to run from the Command Bar, consider building a [Custom API](/docs/custom-apis/overview) and calling it via JavaScript or Power Fx instead.
- **Provide clear input descriptions:** If your manual trigger asks the user for input, provide extremely clear labels (e.g., "Discount Percentage (1-100)" instead of just "Discount").

## Things to Remember

- Instant Flows require **manual human interaction**.
- They can prompt the user for **input variables**.
- The **"For a selected row"** trigger integrates directly into Dynamics 365 model-driven app command bars.

## What's Next

Instant Flows require a user to click a button. But what if we want the system to do the work automatically when data changes? Next, we will cover **Automated Flows**.
  `.trim(),
};
