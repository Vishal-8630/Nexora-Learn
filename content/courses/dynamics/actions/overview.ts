import { DocContent } from "@/types/docs";

export const actionsOverview: DocContent = {
  title: "Classic Actions in Dataverse",
  description:
    "Explore Classic Actions, a legacy feature in Dataverse for creating custom messages and endpoints using the low-code workflow designer. Understand their role, limitations, and why Custom APIs are the recommended modern alternative.",
  content: `
## Introduction

Before Microsoft introduced **Custom APIs**, the primary method for creating a custom endpoint or message in **Dataverse** was through a **Classic Action**. Dataverse is the data platform that powers Microsoft Power Apps, Dynamics 365, and other Microsoft Cloud services.

While Custom APIs represent the modern, code-first approach, you will inevitably encounter thousands of Classic Actions in existing enterprise implementations. Therefore, understanding them is crucial for anyone working with established Dynamics 365 or Power Platform solutions.

Furthermore, Classic Actions still offer a niche use case: defining a custom endpoint where the business logic can be entirely implemented using a *low-code* approach (the classic workflow engine), without requiring C# development.

## What is a Classic Action?

A **Classic Action** is a type of **Process** in Dataverse, similar to a Workflow or a Business Process Flow. Its core purpose is to allow you to define a custom **Message** (e.g., \`new_EscalateCase\`) that can be invoked programmatically, all without writing traditional code.

When you create an Action, Dataverse automatically generates a corresponding **Web API endpoint** for it. This endpoint allows external applications, client-side scripts, or other Dataverse components to execute your custom logic by sending a request to this specific message.

### How a Classic Action Works Conceptually

\`\`\`
Caller (e.g., JavaScript, Power Automate, External System)
      |
      V
Dataverse Web API Endpoint (e.g., POST /api/data/v9.x/new_EscalateCase)
      |
      V
Dataverse Message (new_EscalateCase)
      |
      V
Action Logic (Defined via Classic Workflow Designer Steps)
      |
      V
Response (Output Parameters returned to Caller)
\`\`\`

## 1. Creating a Classic Action

Classic Actions are primarily managed through the legacy interface. They are not fully supported in the modern Power Apps maker portal.

1.  Navigate to the **Power Apps portal** (make.powerapps.com).
2.  Select your environment.
3.  Click the **Settings** gear icon in the top right, then select **Advanced Settings**.
4.  In the Advanced Settings area, go to **Settings -> Processes**.
5.  Click **New**.
6.  For **Category**, select **Action**.
7.  For **Entity**, choose:
    *   A specific **table** (e.g., "Case") if the Action needs to operate in the context of a particular record (a "bound" Action).
    *   "None (global)" if the Action is general-purpose and doesn't require a specific record context (an "unbound" Action).
8.  Click **OK**.

## 2. Input and Output Parameters

Just like Custom APIs, Actions can accept data as input and return data as output. These are defined directly within the visual Action designer in the **Process Arguments** grid.

For each parameter, you specify:
*   **Direction:**
    *   **Input:** Data passed *into* the Action when it's invoked.
    *   **Output:** Data returned *from* the Action upon completion.
*   **Type:** The data type of the parameter (e.g., String, Integer, Boolean, DateTime, EntityReference (Lookup), Entity, EntityCollection).
*   **Name:** A logical name for the parameter (e.g., \`EscalationReason\` for an input, \`NewOwnerId\` for an output).

### Example: Invoking an Action with Parameters

Consider an Action named \`new_EscalateCase\` with an input parameter \`EscalationReason\` (String) and an output parameter \`NewOwnerId\` (EntityReference).

**Conceptual Web API Request Body (Input):**
\`\`\`json
{
  "EscalationReason": "Customer reported critical system outage affecting all users."
}
\`\`\`

**Conceptual Web API Response Body (Output):**
\`\`\`json
{
  "NewOwnerId": {
    "entityType": "systemuser",
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef"
  },
  "EscalationStatus": "Escalated to Tier 2 Support"
}
\`\`\`

## 3. The Logic (Workflow Steps)

This is the fundamental difference between Classic Actions and Custom APIs.

*   In a **Custom API**, the business logic *must* be implemented using a C# Plugin.
*   In a **Classic Action**, the business logic is constructed using the visual **Classic Workflow Designer**. This allows business analysts or low-code developers to define complex sequences of operations without writing code.

You can add various steps to an Action's logic:
*   **Create Record:** To create new Dataverse records (e.g., an "Escalation History" log).
*   **Update Record:** To modify existing records (e.g., change the status of a Case).
*   **Assign Record:** To change the owner of a record.
*   **Send Email:** To send notifications.
*   **Perform Action:** To call another Action or a built-in Dataverse message.
*   **Assign Value:** This is a special and crucial step used to populate your **Output Parameters**. Data from earlier steps (e.g., a newly created record's ID, or a calculated value) can be assigned to an output parameter, making it available to the caller.

## Mixing Code and Low-Code

While Classic Actions are primarily low-code, they still generate a standard **Message** within the Dataverse execution pipeline. This means that professional developers can use the **Plugin Registration Tool** to register C# Plugins against your custom Action message (e.g., \`new_EscalateCase\`).

This capability allowed for a hybrid approach:
*   A business analyst could define the basic flow and data manipulation using the workflow designer.
*   A developer could then add a C# Plugin (e.g., a Pre-Operation plugin to validate inputs, or a Post-Operation plugin to perform complex calculations or integrations that the workflow designer couldn't handle).

However, this hybrid approach often led to significant **maintainability challenges** and is generally discouraged today.

## Classic Actions vs. Custom APIs: Why the Shift?

Microsoft introduced Custom APIs as the modern replacement for Classic Actions due to several key limitations of Actions:

1.  **Performance:** The classic workflow engine, which powers Actions, is significantly slower and less efficient compared to native C# plugin execution. Each workflow step incurs overhead, making Actions unsuitable for high-volume or performance-critical operations.
2.  **Application Lifecycle Management (ALM):** Classic Actions are notoriously difficult to manage within a robust ALM strategy. Their definition is stored as XML within the solution, making source control, merging, and automated deployment challenging compared to the metadata-driven approach of Custom APIs.
3.  **Debugging and Maintainability:** Mixing low-code workflow steps with pro-code plugins on the same Action created a debugging nightmare. If an Action failed, determining whether the issue originated from the workflow logic or the C# plugin was often a complex and time-consuming task.
4.  **Scalability:** Due to their performance characteristics, Classic Actions are less scalable than Custom APIs, especially under heavy load.

## Best Practices

*   **Prioritize Custom APIs for New Development:** For all new architectural designs and custom message requirements, Microsoft strongly recommends using **Custom APIs**. They offer superior performance, ALM capabilities, and a cleaner development model.
*   **Consider Actions *Only* for Pure Low-Code Endpoints:** The only remaining justifiable use case for a Classic Action is when you *must* expose a custom API endpoint to an external system or client-side script, and the entire business logic can be implemented using the classic workflow designer *without* any C# development resources available.
*   **Avoid Mixing Logic Types:** If you choose to use an Action, either implement 100% of the logic within the workflow designer, or leave the workflow completely blank and implement 100% of the logic in a C# Plugin registered against the Action's message. Mixing them introduces extreme technical debt and debugging complexity.
*   **Focus on Maintainability:** Always consider the long-term maintainability of your solution. Complex logic in workflow designers can become difficult to understand and update over time.
*   **Security Considerations:** Actions execute in the security context of the calling user. Ensure that the calling user has appropriate security roles and privileges to perform all operations defined within the Action's workflow steps to prevent unauthorized data access or modifications.

## Common Mistakes

Beginners and even intermediate developers often make these mistakes when dealing with Classic Actions:

*   **Over-reliance for Complex Logic:** Attempting to build intricate business logic using the classic workflow designer. This quickly leads to unmaintainable, slow, and difficult-to-debug processes that are hard to document and version control.
*   **Ignoring Performance Implications:** Using Classic Actions for high-volume or performance-critical operations, even when extended with C# plugins. The inherent overhead of the workflow engine can still introduce significant latency.
*   **Mixing Workflow and Plugin Logic:** As highlighted in best practices, combining workflow steps with C# plugins on the same Action is a common pitfall that severely complicates debugging and maintenance.
*   **Lack of Error Handling:** Not implementing robust error handling within the workflow steps. Classic workflows have limited error handling capabilities compared to C# plugins, which can lead to cryptic failures for end-users.

## Things to Remember

*   **Legacy Feature:** Classic Actions are a predecessor to Custom APIs.
*   **Low-Code Logic:** Primarily use the visual workflow designer for logic.
*   **Custom Messages:** Create custom Dataverse messages and Web API endpoints.
*   **Hybrid Potential (Discouraged):** Can be extended with C# plugins, but mixing logic is a common mistake.
*   **Limitations:** Suffer from performance, ALM, and debugging challenges compared to Custom APIs.
*   **Modern Alternative:** Always prefer Custom APIs for new development.

## Related Topics

Because Actions generate standard Dataverse Messages, executing them is nearly identical to executing Custom APIs. To deepen your understanding, consider these topics:

*   **Using Actions from JavaScript and Plugins:** Learn how to invoke Classic Actions programmatically.
*   **Custom APIs in Dataverse:** Explore the modern, recommended approach for creating custom messages.
*   **Dataverse Messages and the Execution Pipeline:** Understand how messages flow through Dataverse and how plugins interact with them.
*   **Dataverse Workflows (Classic):** Gain a deeper insight into the underlying engine that powers Classic Actions.
*   **Plugin Development in Dataverse:** Learn how to write C# plugins for advanced logic and integrations.
  `.trim(),
};