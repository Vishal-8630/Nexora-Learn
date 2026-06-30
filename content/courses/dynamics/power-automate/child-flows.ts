import { DocContent } from "@/types/docs";

export const childFlows: DocContent = {
  title: "Child Flows",
  description:
    "Learn how to create reusable logic blocks by calling Child Flows from Parent Flows, keeping your Power Automate architecture modular and maintainable.",
  content: `
## Introduction

If your enterprise has 15 different flows that all end by sending a highly formatted, branded HTML email via SendGrid, what happens when the Marketing department decides to change the logo in the email signature?

If you built 15 monolithic flows, you have to manually edit all 15 of them. 

To solve this, professional developers use **Child Flows**. You build one master "Send Branded Email" flow, and the other 14 flows simply call it, passing in the subject and body text as variables.

## What is a Child Flow?

A Child Flow is an Instant Cloud Flow that is designed to be triggered by another flow (the Parent), rather than by a user or a Dataverse event.

The Parent flow pauses, waits for the Child flow to finish executing its logic, and then reads the response from the Child before continuing.

## 1. Creating the Child Flow

To create a flow that can be called as a child, it must meet specific architectural requirements.

### The Trigger
The trigger must be **Manually trigger a flow**. 
- In this trigger, you define the Input Parameters. These are the variables the Parent flow must pass in. 
- *Example:* Create Text inputs for \`EmailSubject\` and \`EmailBody\`.

### The Logic
Add your actions (e.g., Send an Email, Query Dataverse, run a complex Math expression).

### The Response
A child flow **must** end with a specific action to pass data back to the parent. You must use the **"Respond to a Power App or flow"** action.
- In this action, you define the Output Parameters. 
- *Example:* Return a Boolean called \`Success\` and a String called \`ErrorMessage\`.

## 2. Calling the Child Flow (The Parent)

In your Parent flow (which could be an Automated Dataverse flow), you add the action: **Run a Child Flow**.

- You select the name of your Child Flow from a dropdown.
- The action will automatically inspect the Child's trigger and prompt you to fill in the \`EmailSubject\` and \`EmailBody\`.
- Once the action completes, the Parent flow will have access to Dynamic Content containing the \`Success\` and \`ErrorMessage\` outputs from the Child.

## Strict Requirements for Child Flows

Microsoft enforces strict rules on Child Flows to ensure enterprise stability. If you do not follow these, the "Run a Child Flow" action will fail or the Child flow will refuse to save.

1. **Must be in a Solution:** Both the Parent and the Child flow **must** be built inside a Dataverse Solution. You cannot use Child Flows in the "My flows" area.
2. **Embedded Connections:** The Child Flow must use embedded connections. If the child flow connects to Dataverse or Outlook, you cannot use "Run-only user" connections. You must go to the Child flow's details page, edit the "Run only users" settings, and explicitly hardcode the connection to use a specific account (usually a Service Principal).
3. **Must have a Response:** If the Child flow does not end with a "Respond" action (even if you are returning blank data), the Parent flow will not be able to call it.

## Best Practices

- **Create a Utility Solution:** If you have 10 child flows that act as generic utilities (Error Logging, Email Sending, Number Formatting), put them in a dedicated "Contoso Core Utilities" solution. Deploy this solution to Production first, so any future app you build can rely on these utilities being present.
- **Error Handling in Child Flows:** If a Child Flow fails, the "Run a Child Flow" action in the Parent will also fail. It is often better to put a Try/Catch block *inside* the Child flow, catch the error, and return \`Success: false\` to the parent via the Response action. This allows the Parent to gracefully decide what to do next, rather than crashing.

## Things to Remember

- Child flows enable **modular, reusable architecture**.
- They must use the **Manually trigger a flow** trigger.
- They must end with the **Respond to a Power App or flow** action.
- They must exist inside a **Solution**.
- Connection references in the child must be **embedded**.

## What's Next

We just learned that Child Flows must be built inside a Solution. In fact, for professional Dynamics 365 ALM, *all* flows must be built inside Solutions. Next, we cover the specifics of **Solution-aware Flows**.
  `.trim(),
};
