import { DocContent } from "@/types/docs";

export const solutionAware: DocContent = {
  title: "Solution-Aware Flows",
  description:
    "Learn why enterprise developers only build flows inside Dataverse Solutions, and how Connection References and Environment Variables make deployment seamless.",
  content: `
## Introduction

When a standard user goes to make.powerautomate.com and clicks "New Flow", it is created in the "My flows" list. 
These are personal flows. They belong to that user. If that user quits the company and their Office 365 account is deleted, the flow dies, and the business process stops working.

As a Dynamics 365 professional, you must never build flows in "My flows". You must build **Solution-Aware Flows**.

## What is a Solution-Aware Flow?

A Solution-Aware flow is a flow created *inside* a Dataverse Solution (the same container used for Tables and C# Plugins). 

When you build a flow inside a solution, it becomes an enterprise asset. It can be exported as a Managed Solution and deployed to Test and Production environments securely via ALM pipelines.

## The Problem with Connections

When you build a flow in "My flows" that connects to SharePoint and Dataverse, Power Automate hardcodes your personal user credentials (your "Connections") into the flow definition.

If you export this flow and move it to Production, it will break, because the Production environment doesn't want to use your personal Dev credentials.

Solution-Aware flows solve this using **Connection References**.

## Connection References

When you build a flow inside a Solution, Power Automate does not hardcode your connection. Instead, it creates a **Connection Reference** (e.g., \`con_DataverseConnection\`).

The flow uses the Reference, and the Reference points to the actual credentials.

**The Deployment Lifecycle:**
1. In DEV, \`con_DataverseConnection\` points to John's Developer Account.
2. The team exports the Solution as a Managed zip file.
3. The team imports the Solution into PROD.
4. During the import process, Dataverse detects the Connection Reference and halts. It asks the admin: *"What credentials should I use for \`con_DataverseConnection\` in this environment?"*
5. The Admin selects the enterprise Service Principal account.
6. The flow is imported and instantly works in Prod, using the correct Prod credentials, without anyone having to edit the flow.

## Environment Variables

Connections aren't the only things that change between environments. 

What if your flow sends an HTTP request to an internal ERP API? 
- In Dev, the URL is \`https://api-dev.contoso.com\`.
- In Prod, the URL is \`https://api.contoso.com\`.

If you hardcode the URL in the HTTP action, you will have to manually edit the Managed flow in Prod (which you shouldn't do).

Instead, you use **Environment Variables**.
1. Create an Environment Variable in your Solution called \`ERP_Api_Url\`.
2. Set its "Default Value" to the Dev URL.
3. In your Power Automate flow, select the Environment Variable from the Dynamic Content menu instead of typing the URL.
4. When deploying to Prod, the ALM pipeline will prompt the Admin to provide the Production URL.

## Managing Flow Ownership

Because Solution-Aware flows belong to the Solution (the enterprise) and not the individual user, they are much easier to manage.

If a developer leaves the company, an Administrator can easily assign a Service Principal account to take ownership of all flows in the Solution.

## Best Practices

- **Never use "My flows":** Even for quick tests, build the habit of creating a temporary Solution first.
- **Group Connection References:** If you have 10 flows in a solution that all connect to Dataverse, ensure they all share the exact same Connection Reference. Do not create 10 different connection references to Dataverse, or the admin will have to map 10 different credentials during deployment.
- **Turn flows on after deployment:** When a solution is imported into a new environment, flows are often imported in an "Off" state. Ensure your ALM pipeline has a step to activate the flows, or an admin must do it manually.

## Things to Remember

- Enterprise flows must be built inside **Dataverse Solutions**.
- **Connection References** decouple the flow from the specific user credentials.
- **Environment Variables** handle URLs, IDs, and text that change between Dev and Prod.
- Solution-aware flows are crucial for **ALM and DevOps**.

## What's Next

This concludes Phase 10: Power Automate! We have covered everything from basic triggers to advanced enterprise deployment strategies.
  `.trim(),
};
