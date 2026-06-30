import { DocContent } from "@/types/docs";

export const approvalWorkflows: DocContent = {
  title: "Approval Workflows",
  description:
    "Implement multi-stage, hierarchical approval processes using Power Automate and Dataverse state transitions.",
  content: `
## The Business Requirement

"When a salesperson submits a Quote over $50,000, it must be locked so they can't edit it. It must go to their direct manager for approval. If the manager approves, it goes to the VP of Sales. If the VP approves, the Quote is unlocked and marked 'Approved'. If anyone rejects it, it goes back to 'Draft' and the salesperson is notified."

## The Naive Approach

A beginner might add two new Lookup fields to the Quote table (\`Manager Approver\`, \`VP Approver\`) and write a classic synchronous Workflow that sends an email asking the manager to log into Dynamics to click a custom ribbon button.
- **Why it fails:** Classic workflows cannot wait for human interaction efficiently (they go into a "Waiting" state, consuming massive SQL resources). Executives hate logging into CRM just to click an "Approve" button.

## The Enterprise Architecture

### 1. State and Status Reason
First, architect the Data Model. Ensure the Quote table utilizes the native \`StateCode\` (Active/Inactive) and \`StatusCode\` (Draft, Pending Approval, Approved, Rejected) columns. 

### 2. Form Security (Locking)
When the salesperson clicks "Submit for Approval", a JavaScript function changes the StatusCode to "Pending Approval". 
A Dataverse **Business Rule** is configured: *If StatusCode = 'Pending Approval', lock all fields on the form.* This prevents the salesperson from sneaking in a discount while the manager is reviewing it.

### 3. Power Automate (Approvals Connector)
Create a Power Automate flow triggered when the Quote StatusCode changes to "Pending Approval".
1. **Get Manager:** Use the Office 365 Users connector to dynamically find the submitter's direct manager.
2. **Start and Wait for an Approval (V2):** This native action sends an actionable Adaptive Card directly to the manager's Microsoft Teams and Outlook. The manager clicks "Approve" right inside the email—no CRM login required.
3. **Condition:** If Approved, repeat the process for the VP. 
4. **Final Action:** If fully approved, the flow updates the Dataverse Quote StatusCode to "Approved" (which unlocks the form or advances the BPF). If rejected, it updates to "Draft" and emails the salesperson.

## Handling Reassignments and Timeouts

The enterprise architect also anticipates edge cases:
- *What if the VP is on vacation?* The Power Automate Approval action has a timeout setting (e.g., 7 days). If it times out, the flow routes the approval to a fallback queue.
- *Audit Trail:* Power Automate automatically writes the exact timestamp, approver comments, and outcome to the native Dataverse \`Approval\` tables, providing a perfect audit log for compliance.

## Things to Remember

- Use **Business Rules** tied to \`StatusCode\` to lock the UI during review.
- Never use Classic Workflows for human approvals. Use **Power Automate Approvals**.
- Deliver approval requests directly to **Microsoft Teams/Outlook** via Adaptive Cards.
- Always design for edge cases like **vacations and timeouts**.
  `.trim(),
};
