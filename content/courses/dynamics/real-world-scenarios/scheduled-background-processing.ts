import { DocContent } from "@/types/docs";

export const scheduledBackgroundProcessing: DocContent = {
  title: "Scheduled Background Processing",
  description:
    "Implement nightly batch jobs to calculate rollups, sync external data, and clean up the database using Power Automate and Azure Logic Apps.",
  content: `
## The Business Requirement

"Every night at 2:00 AM, the system must query all Active Contracts. If the Contract's 'Expiration Date' is today, it must update the Contract Status to 'Expired', send an alert to the Account Owner, and automatically generate a Renewal Opportunity."

## The Naive Approach

A beginner writes a C# Console Application and hosts it on a physical Windows Server under their desk using Windows Task Scheduler. 
- **Why it fails:** If the server loses power, the job stops running. If the developer leaves the company, no one knows where the code lives or how to update the hardcoded API passwords. It is unscalable and completely invisible to the IT monitoring team.

## The Enterprise Architecture

The modern architect relies entirely on cloud-native, serverless PaaS (Platform as a Service) offerings.

### The Standard Solution: Power Automate (Scheduled Flow)
For most background processing, **Power Automate** is the perfect tool.
1. **Trigger:** The architect creates a Scheduled Cloud Flow with a "Recurrence" trigger set to run at 2:00 AM daily.
2. **Action 1 (Query):** Use the Dataverse "List Rows" action. 
   - *Crucial Step:* The architect does not pull all 100,000 contracts into memory and loop through them. They use the **OData Filter Query** parameter: \`statuscode eq 1 and _expirationdate eq '@{utcNow('yyyy-MM-dd')}'\`. This forces the Dataverse SQL server to do the heavy lifting, returning only the 50 contracts that actually expire today.
3. **Action 2 (Loop & Update):** Use an "Apply to each" loop to iterate over the 50 results. Inside the loop, update the status to Expired, email the owner, and create the Opportunity.

### The High-Volume Solution: Azure Logic Apps + Batching
If the nightly job must process 50,000 contracts instead of 50, Power Automate loops will timeout and consume all of the tenant's API limits.

In this scenario, the architect elevates the process to **Azure Logic Apps** (the enterprise sibling of Power Automate) or **Azure Functions**.
They pull the 50,000 records, chunk them into arrays of 1,000, and use the Dataverse API \`ExecuteMultiple\` batch endpoint to process the updates in massive parallel threads.

## Things to Remember

- Never use on-premise Windows Task Scheduler for cloud environments.
- Use **Power Automate (Scheduled Flows)** for standard nightly batch jobs.
- Always use **OData Filter Queries** in the "List Rows" action to prevent pulling massive, unfiltered datasets into memory.
- For extreme volumes (>10,000 records), graduate from Power Automate loops to **Azure Logic Apps** or **Azure Functions** using batch APIs.

## Conclusion

This concludes the Dynamics 365 and Power Platform Curriculum. You have journeyed from the basics of the Dataverse schema all the way to enterprise DevOps, AI integrations, and real-world architectural design. 
You are now equipped with the knowledge to design and implement highly scalable, resilient, and intelligent business applications.
  `.trim(),
};
