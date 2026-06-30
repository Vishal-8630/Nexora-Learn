import { DocContent } from "@/types/docs";

export const pluginImpersonation: DocContent = {
  title: "Impersonation and Execution Context",
  description:
    "Understanding InitiatingUserId vs UserId, and how to execute code bypassing security roles.",
  content: `
## The Security Context of a Plugin

By default, when a user clicks "Save" and triggers a plugin, the plugin code executes under the security context of that specific user. 

If the code attempts to \`Retrieve\` a related Contact, but the user's Security Role does not grant them read access to Contacts, the plugin will crash with a \`Principal user is missing prvReadContact privilege\` exception.

Sometimes, a plugin *must* do something the user is not allowed to do manually (e.g., logging an entry in a highly secured Audit table). This is where Impersonation is used.

---

## The Two User IDs

Inside the \`IPluginExecutionContext\`, there are two distinct User IDs:

### 1. \`context.InitiatingUserId\`
The GUID of the actual human being sitting at the keyboard who clicked the button that started the entire chain of events. **This never changes**, even if the plugin calls another plugin that calls a workflow.

### 2. \`context.UserId\`
The GUID of the user whose permissions the plugin is currently running under. By default, this is the same as the \`InitiatingUserId\`. However, you can change this in the Plugin Registration Tool.

---

## Executing as SYSTEM

When registering a step in the Plugin Registration Tool, there is a field called **Run in User's Context**.
*   **Calling User:** (Default). The plugin obeys the security roles of the person clicking Save.
*   **SYSTEM:** The plugin runs as the omnipotent system account, bypassing all security role checks.

If you set it to SYSTEM, \`context.UserId\` will become the SYSTEM GUID.

> [!CAUTION]
> **Use SYSTEM sparingly**
> If your plugin creates a new record while running as SYSTEM, the \`Created By\` field on that record will say "SYSTEM". This ruins traceablity. You will no longer know which human actually caused the record to be created.

---

## Impersonating via \`IOrganizationService\`

Instead of globally registering the step as SYSTEM, professional developers keep the step as "Calling User", but create a separate, isolated \`IOrganizationService\` connection inside the C# code when they need to elevate privileges.

When you create the service, you pass in the User ID you want it to act as. Passing \`null\` creates a SYSTEM service.

\`\`\`csharp
// 1. The Standard Service (Runs as the person who clicked Save)
IOrganizationService userService = factory.CreateOrganizationService(context.UserId);

// 2. The Elevated Service (Runs as SYSTEM, bypassing security)
IOrganizationService systemService = factory.CreateOrganizationService(null);
\`\`\`

**Best Practice Workflow:**
1. Use \`userService\` for 90% of your queries so that standard security roles and business unit restrictions apply normally.
2. Use \`systemService\` *only* for the specific 10% of operations (like writing to a secure log table) that the user is not allowed to do themselves.
`,
};
