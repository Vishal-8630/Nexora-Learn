import { DocContent } from "@/types/docs";

export const approvals: DocContent = {
  title: "Approvals",
  description:
    "Learn how to use the native Power Automate Approvals engine to route Dataverse records for human sign-off via Email and Microsoft Teams.",
  content: `
## Introduction

Many business processes require human authorization. 
- "Do not apply this 50% discount to the Quote until the VP of Sales approves it."
- "Do not mark this Time Off Request as Approved until the direct manager signs off."

Historically, developers had to build custom Dataverse tables and complex email routing to handle this. Now, Power Automate provides a native, highly integrated **Approvals Engine**.

## How Approvals Work

The Power Automate Approvals engine handles the routing, notifications, and state tracking of a request.

When you trigger an approval:
1. The engine generates an **Adaptive Card** (an interactive UI element).
2. It sends this card to the approver via **Email** and **Microsoft Teams**.
3. The flow pauses and waits.
4. The approver clicks "Approve" or "Reject" directly inside the email body or the Teams chat window (they do not need to log into Dynamics 365).
5. The flow resumes, passing the decision and any comments back into your workflow.

## Implementing an Approval

### Step 1: Start and wait for an approval
Add the "Start and wait for an approval" action to your flow.

You must configure the **Approval Type**:
- **Approve/Reject - Everyone must approve:** If you assign it to 3 managers, all 3 must click Approve. If one rejects, the whole request is rejected.
- **Approve/Reject - First to respond:** Sent to a pool of managers. As soon as any one of them clicks Approve or Reject, the flow continues.
- **Custom Responses:** Instead of Approve/Reject, you can define your own buttons (e.g., "Accept", "Need More Info", "Deny").

### Step 2: Configure the Payload
- **Title:** The subject line (e.g., \`Approval Required: Quote #12345\`).
- **Assigned To:** The email address of the approver. You can pull this dynamically from Dataverse (e.g., the Owner's Manager).
- **Details:** A markdown-supported body where you provide the context (Amount, Customer Name, Justification).
- **Item Link:** Provide a direct URL back to the specific record in Dynamics 365 so the approver can review the full details if needed.

### Step 3: Handle the Outcome
Add a **Condition** control immediately after the approval action.
- Check if the \`Outcome\` is equal to \`Approve\`.
- **If Yes:** Update the Dataverse Quote record status to "Approved".
- **If No:** Update the Dataverse Quote record status to "Rejected", and perhaps send an email to the submitter containing the \`Responses Comments\` (so they know why it was rejected).

## The Approvals Center

Approvers don't just have to rely on emails. They can go to the **Approvals Center** in Microsoft Teams (an app on the left sidebar) or the Power Automate portal to see a consolidated dashboard of all requests waiting for their signature across the entire company, and a history of everything they have previously approved.

## Advanced Patterns

### State Machines (Timeouts)
By default, an approval action waits for **30 Days**. If the approver ignores it for 30 days, the flow times out and fails.
To prevent this, you can configure the "Timeout" setting on the Approval action (e.g., \`P7D\` for 7 days). Then, use a "Configure run after" branch to catch the timeout, escalate to a higher manager, or auto-reject the request.

### Escaping the 30-Day Limit
If your business process routinely takes 3 months to approve (e.g., government permits), you cannot use "Start and wait for an approval" because the flow will die at 30 days.
Instead, use the **Create an approval** action (which sends the request but doesn't wait), save the Approval ID to your Dataverse record, and let the flow end. Create a *second* flow that triggers when the native Approval record in Dataverse is completed to handle the outcome.

## Things to Remember

- Approvals route interactive requests via **Email** and **Teams**.
- You can require **one** person or **everyone** to respond.
- Flows pause and wait for the response (up to a hard limit of **30 Days**).
- Use a **Condition** afterward to process the \`Outcome\` and \`Comments\`.

## What's Next

Approvals are great for human interaction. But what if we need to talk to a computer system that doesn't have a native Power Automate connector? Next, we will cover the **HTTP Action**.
  `.trim(),
};
