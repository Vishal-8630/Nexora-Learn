import { DocContent } from "@/types/docs";

export const azureFunctionIntegrations: DocContent = {
  title: "Azure Function Integrations",
  description:
    "Extend Dataverse capabilities by offloading complex, long-running, or resource-intensive operations to serverless Azure Functions.",
  content: `
## The Business Requirement

"Every time an Opportunity is won, we need to generate a highly complex 3D CAD schematic based on the product dimensions, compress it into a ZIP file, and upload it to an external FTP server."

## The Naive Approach

A beginner writes a synchronous C# Plugin registered on the \`Win\` message of the Opportunity. The plugin downloads a third-party CAD rendering library (using ILMerge), attempts to run the intensive CPU rendering logic inside the 2-minute plugin execution window, and then uses C# \`FtpWebRequest\` to upload the file.
- **Why it fails:** Dataverse Plugins run in a restricted Sandbox. 
  1. The 3D rendering will exceed the 2-minute timeout, crashing the plugin.
  2. The CPU utilization will spike, throttling the environment.
  3. FTP/Network calls from the Dataverse Sandbox often fail due to strict outbound firewall rules.

## The Enterprise Architecture

The architect decouples the system using **Event-Driven Architecture** and offloads the heavy lifting to a Serverless **Azure Function**.

### 1. The Trigger (Service Bus)
Instead of executing the logic, the Dataverse Plugin simply registers the event.
The architect configures an Azure Service Bus queue. They register a Dataverse Service Endpoint step on the \`Win\` message.
When the Opportunity is won, Dataverse instantly drops a JSON payload (containing the Opportunity GUID and Product Dimensions) into the Service Bus queue. The CRM transaction completes in 50 milliseconds.

### 2. The Execution (Azure Function)
The architect writes a C# **Azure Function** configured with a \`ServiceBusTrigger\`. 
When the message arrives in the queue, the Azure Function wakes up.
- **No Timeouts:** Azure Functions can run for up to 10 minutes (Consumption plan) or infinitely (Premium plan).
- **No Sandbox Restrictions:** The Function has full access to the Azure VM's CPU, disk, and network, allowing it to easily use the CAD library and make the FTP network call.

### 3. The Callback (Dataverse SDK)
Once the FTP upload is complete, the Azure Function uses the \`Dataverse.Client\` SDK to connect back to the CRM environment. It updates the Opportunity record, setting a custom status field to "Schematic Generated Successfully", providing the CRM user with confirmation.

## Things to Remember

- Dataverse Plugins have a strict **2-minute timeout** and run in a restricted **Sandbox**.
- Offload long-running, CPU-intensive, or complex networking tasks to **Azure Functions**.
- Decouple the execution using an **Azure Service Bus** queue.
- Use the Azure Function to call back into Dataverse to update the status upon completion.
  `.trim(),
};
