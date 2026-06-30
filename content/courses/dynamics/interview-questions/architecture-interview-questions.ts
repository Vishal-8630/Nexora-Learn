import { DocContent } from "@/types/docs";

export const architectureInterviewQuestions: DocContent = {
  title: "Architecture Interview Questions",
  description:
    "Questions designed to test your knowledge of Enterprise Solutions, ALM, and Security.",
  content: `
## ALM and Deployments

**Q: What is the difference between an Unmanaged and a Managed Solution?**
*   **A:** Unmanaged solutions are used in Development. They act as open containers. When you export as Managed and import into UAT/Production, the components are locked and stacked in a Managed Layer. If you delete a Managed solution, all components and data associated with it are completely wiped from the system.

**Q: A developer manually adds a field to a form directly in the UAT environment. Later, you deploy a Managed solution that updates that form. Why does your change not show up?**
*   **A:** The manual change in UAT created an **Active (Unmanaged) Customization**. The Active layer sits at the very top of the solution stack and always overrides Managed layers beneath it. To fix it, you must select the component in UAT, view Solution Layers, and "Remove active customizations".

**Q: What is the difference between an Update and an Upgrade when importing a Managed Solution?**
*   **A:** An Update merges the new solution on top of the old one (additive). An Upgrade imports the new solution, then completely deletes the old version. An Upgrade is the only way to automatically delete components from a target environment.

## Security Models

**Q: When would you use an Access Team instead of an Owner Team?**
*   **A:** An Owner Team physically owns the record. If multiple people from different departments need temporary access to collaborate on a single record without changing ownership, you use an Access Team. This prevents the "Principal Object Access" (POA) table from bloating, which happens when users manually click the "Share" button.

**Q: A user receives the error: \`Principal user is missing prvReadAccount\`. What are the two most likely causes?**
*   **A:** 
    1. The user's Security Role literally does not have the Read privilege on the Account table.
    2. The user has "Local" (Business Unit) level Read access, but they are trying to open an Account owned by someone in a different Business Unit.

**Q: What is a Data Loss Prevention (DLP) Policy?**
*   **A:** It is a tenant-level firewall that categorizes connectors (like Dataverse, SharePoint, Twitter) into Business, Non-Business, and Blocked buckets. It prevents citizen developers from building Power Automate flows that accidentally leak secure CRM data to public services like Twitter or personal Dropboxes.
`,
};
