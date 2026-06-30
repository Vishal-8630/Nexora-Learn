import { DocContent } from "@/types/docs";

export const dataverseTrigger: DocContent = {
  title: "The Dataverse Trigger",
  description:
    "A deep dive into the Microsoft Dataverse 'When a row is added, modified or deleted' trigger, covering filtering, scope, and execution context.",
  content: `
## Introduction

For Dynamics 365 developers building Automated Flows, 99% of your workflows will begin with a single specific trigger: **"When a row is added, modified or deleted"** from the Microsoft Dataverse connector.

If this trigger is misconfigured, it can bring an entire enterprise CRM system to its knees by generating millions of unnecessary API calls.

## Trigger Configuration

When you add this trigger to your flow, you must configure three required fields:

### 1. Change Type
What event should start the flow?
- **Added:** (Create)
- **Modified:** (Update)
- **Deleted:** (Delete)
You can combine these (e.g., "Added or Modified").

### 2. Table Name
Which table are we listening to? (e.g., \`Accounts\`, \`Contacts\`, \`Opportunities\`).

### 3. Scope
This is the security context of the trigger. It determines *whose* changes will fire the flow.
- **User:** The flow only triggers if the user who *owns* the flow modifies a record.
- **Business Unit:** The flow triggers if anyone in the flow owner's Business Unit modifies a record.
- **Parent: Child Business Unit:** Extends the above to child BUs.
- **Organization:** The flow triggers if *anyone* in the entire company modifies a record. *(As a developer building system-wide integrations, you will almost always use Organization).*

## Advanced Options (Critical for Performance)

If you only configure the three required fields on a "Modified" trigger for the Account table, **your flow will fire every single time any field on any Account is changed by anyone.**

To prevent this, you must open the "Advanced options" and use filtering.

### 1. Select Columns (Filtering Attributes)
This is identical to Plugin Filtering Attributes. You provide a comma-separated list of logical column names (e.g., \`revenue, statuscode\`).
- If you do this, the flow will **only** trigger if the user actually changed the Revenue or the Status. If they only change the Phone Number, the flow stays silent.

### 2. Filter Rows (OData Query)
This allows you to add conditional logic to the trigger itself. 
- *Example:* You only want the flow to run if the Account is updated AND the Account Type is "VIP".
- You write an OData string: \`customertypecode eq 1\`.
- This prevents the flow from spinning up just to hit a "Condition" block that says "No" and turns off. It saves API quotas and keeps your run history clean.

### 3. Run As
By default, the flow runs using the connection reference of the person who built it. In a production deployment via Service Principal, you can configure the trigger to "Run As" the user who actually clicked the save button in Dataverse, allowing you to track their identity in external systems.

## Working with the Trigger Outputs

When the trigger fires, it passes a JSON payload (the Execution Context) into the flow.

You can access any field from the record using Dynamic Content. However, there are nuances:
- **Lookups:** The trigger returns the GUID of a lookup field (e.g., \`_parentcustomerid_value\`). It does not return the human-readable Name of the parent account. To get the name, you must use a "Get a row by ID" action later in the flow.
- **Choices (Option Sets):** The trigger returns the integer value (e.g., \`1\`). To get the text label (e.g., "Active"), you must use a special OData formatting header, or reference the specific \`@OData.Community.Display.V1.FormattedValue\` property in expressions.

## Common Mistakes

> [!WARNING]
> **Triggering Infinite Loops** — The classic error. A flow triggers on "Modified" for the Account table. Inside the flow, an action updates the Account table. This immediately triggers the flow again, creating an infinite loop. Always use **Select Columns** to ensure the flow only triggers when specific fields change, and ensure your flow does *not* update those specific fields.

## Things to Remember

- Use **Scope: Organization** for system-wide automations.
- Always configure **Select Columns** on Update triggers to prevent throttling.
- Use **Filter Rows** to evaluate logic before the flow even starts.
- Lookups return **GUIDs**, Choices return **Integers**.

## What's Next

Now that we know how to trigger flows efficiently based on Dataverse data, let's look at one of the most powerful out-of-the-box features in Power Automate: **Approvals**.
  `.trim(),
};
