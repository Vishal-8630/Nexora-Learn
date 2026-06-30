import { DocContent } from "@/types/docs";

export const scenarioBasedChallenges: DocContent = {
  title: "Scenario-Based Whiteboard Challenges",
  description:
    "Complex, real-world architectural scenarios often presented in Senior interviews.",
  content: `
## Scenario 1: The Massive ERP Sync

**The Prompt:** *"The client has an on-premises SQL Server ERP system. Every night at 2:00 AM, they need to push 2 million updated product and pricing records into Dynamics 365 Dataverse. How do you design this integration?"*

**The Traps (What NOT to say):**
*   *"I'll write a Power Automate flow."* (It will time out and cost a fortune in API calls).
*   *"I'll write a C# console app."* (It will take 14 hours to run sequentially and hit API limits).
*   *"I'll use a Dataflow."* (Dataflows are great for 50k rows, but 2 million rows daily will cause severe throttling and memory issues).

**The Architectural Answer:**
"I would use **Azure Data Factory (ADF)**. 
1. ADF has a native Dataverse connector that supports batching (\`ExecuteMultiple\`) and high parallelism. 
2. It handles Dataverse Service Protection API Limits (Throttling) natively, pausing and retrying automatically.
3. To prevent duplicating records, I will configure an **Alternate Key** on the Dataverse Product table (e.g., \`ERP_ProductID\`). ADF will use this key to perform an **Upsert**.
4. I will ensure all custom synchronous C# plugins on the Product table are either disabled during the sync window, or bypassed using the \`BypassCustomPluginExecution\` parameter to prevent the migration from crawling to a halt."

---

## Scenario 2: The UI Performance Nightmare

**The Prompt:** *"The client is complaining that the Account form takes 12 seconds to load. You are tasked with fixing it. Walk me through your debugging process."*

**The Architectural Answer:**
"1. **Check the OnLoad JavaScript:** I would open the Form Properties and see how many scripts are firing on load. If they are making synchronous API calls, I will rewrite them to be asynchronous Promises.
2. **Check the Subgrids:** If the form has 10 subgrids, Dataverse is running 10 heavy FetchXML queries on load. I would move non-critical subgrids to different Form Tabs and configure the tabs to collapse by default. (Dataverse delays loading subgrids until the tab is expanded).
3. **Check the Command Bar:** I would open Ribbon Workbench. If there are Custom Enable Rules using JavaScript, I will ensure they are asynchronous (returning a Promise) and marked as \`IsCore=true\`.
4. **Check for God Tables:** I will look at the form structure. If there are 300 columns on the form, the database IO is choking. We need to normalize the data."

---

## Scenario 3: The Broken Production Deployment

**The Prompt:** *"You deploy a Managed Solution to Production. A specific JavaScript file and a Business Rule did not update, even though the pipeline succeeded. What happened, and how do you fix it?"*

**The Architectural Answer:**
"Someone has been doing 'cowboy coding'. They went directly into the Production environment, opened the Default Solution, and manually edited that JavaScript file and Business Rule.
By doing this, they created an **Active (Unmanaged) Customization layer** on top of those components. Active layers always override Managed layers, which is why Dataverse is ignoring my deployment.
To fix it, I will go into Production, select the broken components, open the **Solution Layers** panel, and click **Remove active customizations**. This will instantly revert the components to the state of my recently deployed Managed Solution. Then, I will lock down the Production environment security roles so no one has System Administrator access."
`,
};
