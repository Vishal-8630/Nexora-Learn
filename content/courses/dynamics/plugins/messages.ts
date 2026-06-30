import { DocContent } from "@/types/docs";

export const messages: DocContent = {
  title: "Plugin Messages",
  description:
    "Plugins are triggered by Messages (events). Learn how to target the right message for your business logic, including Create, Update, Delete, and Retrieve.",
  content: `
## Introduction

A Plugin does not just run randomly. It must be subscribed to a specific event. In the Dataverse architecture, these events are called **Messages**.

Everything that happens in Dataverse—whether initiated by a user in the browser, an integration script via the API, or an internal system process—is executed by passing a Message through the Execution Pipeline.

## Common Messages

When you register a plugin, you must define which Message it listens for. The most common CRUD (Create, Read, Update, Delete) messages are:

### 1. Create
- **Trigger:** A new record is being created.
- **What you get:** You receive the exact data the user input into the form (the "Target"). You do not receive fields the user left blank.

### 2. Update
- **Trigger:** An existing record is being modified.
- **What you get:** This is critical—you *only* receive the fields that were actually changed. If a user only updates the \`Phone Number\` on an Account, the "Target" data passed to your plugin will only contain the \`Phone Number\`. It will not contain the \`Account Name\` or \`Address\`.

### 3. Delete
- **Trigger:** A record is being deleted.
- **What you get:** You only receive the \`EntityReference\` (the GUID and the logical name) of the record being deleted.

## Read Messages (Retrieve and RetrieveMultiple)

Plugins can also intercept data as it is being *read* from the database, before it is displayed to the user.

### Retrieve
- **Trigger:** A single record is being opened (e.g., a user double-clicks an Account to open the form).
- **Use Case:** You can write a Post-Operation \`Retrieve\` plugin to dynamically calculate a value and inject it into the form on the fly, without actually saving that value to the database.

### RetrieveMultiple
- **Trigger:** A list of records is being queried (e.g., a user opens a View, or a chart renders).
- **Use Case:** This is heavily used for advanced security. You can write a Pre-Operation \`RetrieveMultiple\` plugin to intercept the user's SQL/FetchXML query, and programmatically inject additional \`AND\` clauses to hide specific rows based on complex logic that the standard Security Model cannot handle.

## Specialized Messages

Beyond standard CRUD operations, there are dozens of specialized messages you can hook plugins into:

- **Assign:** When a record's owner changes.
- **SetState / SetStateDynamicEntity:** When a record is activated or deactivated.
- **Associate / Disassociate:** When an N:N relationship is created or broken between two records.
- **GrantAccess / RevokeAccess:** When a record is shared or unshared.
- **ExecuteWorkflow:** When a custom action or background process is triggered.

## Custom Actions (Custom Messages)

One of the most powerful features of Dataverse is that you are not limited to Microsoft's standard messages. 

You can create a **Custom Action** (e.g., \`new_VerifyCredit\`). This creates a brand new Message in the Dataverse pipeline. 
- You can write a Plugin and register it against the \`new_VerifyCredit\` message.
- A JavaScript button on the form can call the \`new_VerifyCredit\` message via the WebAPI.
- Dataverse receives the message, routes it through the pipeline, triggers your custom Plugin, and returns the result to the JavaScript.

## Best Practices

- **Filter your Update messages:** If you register a plugin on the \`Update\` message of the Account table, it will run *every single time* any field on the Account changes. This is terrible for performance. Always use **Filtering Attributes**. Tell the system: *"Only run this Update plugin if the Revenue field is changed."*
- **Avoid RetrieveMultiple plugins if possible:** Because \`RetrieveMultiple\` fires every time a grid is loaded, a chart is rendered, or a subgrid is viewed, putting heavy C# logic in this message will slow down the entire user interface globally.

## Common Mistakes

> [!WARNING]
> **Expecting full data on Update** — Developers often write an \`Update\` plugin that says \`if (target["status"] == "Closed") { sendEmail(target["emailaddress"]); }\`. This will crash. If the user only updated the Status field, the \`emailaddress\` field will not be present in the Target package. To get data that wasn't updated, you must use **Images**.

## Things to Remember

- Plugins bind to **Messages** (Create, Update, Delete).
- The **Update** message only contains fields that actually changed.
- **RetrieveMultiple** intercepts queries before they hit the database.
- You can create your own messages using **Custom Actions**.

## Related Topics

- [Execution Pipeline](/docs/plugins/execution-pipeline) — the pipeline the messages travel through
- [Images](/docs/plugins/images) — how to solve the missing data problem on the Update message

## What's Next

Because the Update message only gives you the fields that changed, you need a way to look at the rest of the record's data. To do that, we use **Images**.
  `.trim(),
};
