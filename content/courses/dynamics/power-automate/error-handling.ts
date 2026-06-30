import { DocContent } from "@/types/docs";

export const errorHandling: DocContent = {
  title: "Error Handling (Try/Catch)",
  description:
    "Learn how to gracefully handle API failures, timeouts, and logic errors in Power Automate using Scopes and Run After configurations.",
  content: `
## Introduction

By default, if an action in Power Automate fails (for example, an HTTP request to an external ERP system returns a 404 Not Found, or an expression tries to divide by zero), the flow stops immediately. The status of the flow run is marked as **Failed**, and the user who built the flow gets a nasty email.

In an enterprise environment, silent system failures are unacceptable. If an integration fails, we must update the CRM record to say "Integration Failed" and notify the IT support team.

To do this, we build **Try/Catch** logic using Scopes.

## The Scope Control

A **Scope** is simply a visual container in Power Automate. It doesn't do anything on its own; it just holds a group of other actions together.

By grouping actions into Scopes, we can monitor the success or failure of the *entire block of actions* at once.

## Building a Try/Catch/Finally Pattern

### Step 1: The "Try" Scope
1. Add a **Scope** control and rename it to **"Scope - Try"**.
2. Put all your risky business logic inside this scope (e.g., the HTTP call to the ERP, the Parse JSON step, and the Dataverse Update record step).

### Step 2: The "Catch" Scope
1. Add a second **Scope** control immediately beneath the first one, and rename it to **"Scope - Catch"**.
2. Inside this scope, add your error handling logic (e.g., Update the Dataverse record status to "Error", and send an email to the IT Helpdesk).

### Step 3: Configure Run After
This is the magic step. By default, Action B only runs if Action A is successful.
1. Click the three dots (\`...\`) on the **"Scope - Catch"** block.
2. Select **Configure run after**.
3. Uncheck "is successful".
4. Check **"has failed"** and **"has timed out"**.
5. Click Done.

*Notice that a red dotted line now connects the two scopes. The Catch scope will ONLY run if something inside the Try scope crashes.*

### Step 4: The "Finally" Scope (Optional)
Sometimes you have logic that must run regardless of whether the integration succeeded or failed (e.g., logging the execution to a custom Audit table).
1. Add a third scope called **"Scope - Finally"**.
2. Configure its run after settings to trigger if the Catch scope is successful, has failed, is skipped, or timed out. (Check all 4 boxes).

## Extracting the Error Message

If your flow enters the Catch block, you usually want to know *why* it failed so you can put the error message in the IT Helpdesk email.

You can use the \`result()\` expression to extract the raw error output from the Try scope.

1. Add a **Filter array** action inside your Catch scope.
2. Set the array to: \`result('Scope_-_Try')\` (Note: spaces in scope names become underscores).
3. Set the condition to filter where the item \`status\` is equal to \`Failed\`.
4. The output of this array will contain the exact action that failed and the detailed JSON error message provided by the API.

## Handling Timeouts

If an HTTP action makes a call to a server that is completely offline, it might hang for several minutes before failing. 

You can configure strict timeouts on individual actions.
1. Go to the Settings of the HTTP action.
2. Under **Timeout**, enter an ISO 8601 duration (e.g., \`PT30S\` for 30 seconds).
3. If the server doesn't respond in 30 seconds, the action throws a timeout error, which will immediately trigger your Catch scope.

## Terminating the Flow

If a flow fails, and your Catch block catches the error and gracefully updates CRM, Power Automate considers the overall flow run to be **Successful** (because the Catch block did exactly what it was told to do).

This makes your Run History look completely green, hiding the fact that 50 integrations failed today.

To fix this, always add a **Terminate** action as the very last step inside your Catch scope, and set its status to **Failed**. This ensures your IT team can still filter the Run History view to easily spot broken integrations, while still having handled the error gracefully in CRM.

## Things to Remember

- Use **Scopes** to group logic.
- Use **Configure run after** to catch failures and timeouts.
- Use the **result()** expression to read the error message.
- Always use a **Terminate** action at the end of a catch block to ensure the run history reflects the failure.

## What's Next

Now that we have robust error handling, our flows are getting very large. To keep them maintainable, we need to break them apart into reusable components. Next, we cover **Child Flows**.
  `.trim(),
};
