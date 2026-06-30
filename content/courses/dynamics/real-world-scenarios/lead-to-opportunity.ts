import { DocContent } from "@/types/docs";

export const leadToOpportunity: DocContent = {
  title: "Lead-to-Opportunity Automation",
  description:
    "Architect the qualification process, handling automatic record creation, data mapping, and duplicate detection.",
  content: `
## The Business Requirement

"When a salesperson clicks 'Qualify' on a Lead, the system must automatically create an Account, a Contact, and an Opportunity. It must carry over all the custom fields from the Lead to the Opportunity, and alert the Sales Manager if the Opportunity is over $1M."

## The Naive Approach

A beginner might write a synchronous C# Plugin registered on the \`QualifyLead\` message. 
The plugin uses \`service.Create()\` to manually create the Account, Contact, and Opportunity, maps 50 individual fields line-by-line in C#, and then uses \`SendEmailRequest\` to email the manager.
- **Why it fails:** Hardcoding 50 field mappings in C# is a maintenance nightmare. Sending emails synchronously from a plugin causes the "Qualify" button to freeze the user's browser.

## The Enterprise Architecture

### 1. The Business Process Flow (BPF)
Use the out-of-the-box Lead-to-Opportunity Sales Process BPF. This guides the user through the visual stages (Qualify -> Develop -> Propose). 
When the user clicks "Qualify", the Dataverse platform *natively* handles the creation of the Account, Contact, and Opportunity records.

### 2. Relationship Mappings (No Code)
Instead of writing C# to copy fields, the architect opens the 1:N Relationship between Lead and Opportunity. 
Under "Field Mappings", they visually map the custom \`Lead Source\` field to the Opportunity \`Lead Source\` field. Dataverse will automatically copy the data during the native Qualify event.

### 3. Duplicate Detection Rules
To prevent creating 5 different "Microsoft" accounts, the architect configures Duplicate Detection Rules on the Account table (matching on Name + Website). During qualification, Dataverse will warn the user if an Account already exists and allow them to link it instead of creating a new one.

### 4. Power Automate (Asynchronous Alert)
To handle the $1M alert, the architect creates a Power Automate flow.
- **Trigger:** Dataverse "When a row is added" (Table: Opportunity).
- **Condition:** If \`EstimatedRevenue\` > 1,000,000.
- **Action:** Send a Teams Adaptive Card or Outlook Email to the Sales Manager.
- **Why:** This happens asynchronously in the background. The salesperson's UI never freezes, and modifying the email template doesn't require a developer to recompile a C# plugin.

## Things to Remember

- Rely on native **Business Process Flows (BPFs)** for qualification logic.
- Use **Relationship Field Mappings** instead of C# to copy data between records.
- Enforce data hygiene using **Duplicate Detection Rules**.
- Offload notifications (Emails/Teams) to **Power Automate** to protect UI performance.
  `.trim(),
};
