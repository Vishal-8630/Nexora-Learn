import { DocContent } from "@/types/docs";

export const pluginTraceLogs: DocContent = {
  title: "Plugin Trace Logs",
  description:
    "How to enable, write to, and effectively read trace logs to hunt down silent plugin exceptions.",
  content: `
## The Importance of the ITracingService

When a C# Plugin throws a synchronous \`InvalidPluginExecutionException\`, the error is displayed on the user's screen in Dataverse. 

However, if the plugin fails *asynchronously* (in the background), or if you simply need to see what variable values were at runtime, you must use the \`ITracingService\`.

> [!CAUTION]
> **Never use Console.WriteLine()**
> \`Console.WriteLine()\` does absolutely nothing in a Dynamics 365 plugin. The only way to output text is via the \`ITracingService\`.

\`\`\`csharp
public void Execute(IServiceProvider serviceProvider)
{
    ITracingService tracer = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
    
    tracer.Trace("Plugin started.");
    
    // ...
    tracer.Trace($"The account name is: {accountName}");
}
\`\`\`

---

## Enabling Trace Logging

By default, Dataverse throws away all your \`tracer.Trace()\` logs to save storage space. You must explicitly tell the environment to save them.

1. Open the Power Platform Admin Center (or Advanced Settings in the legacy UI).
2. Go to **Settings > System > Administration > System Settings**.
3. Go to the **Customization** tab.
4. Locate **"Enable logging to plug-in trace log"**.
5. Set it to **"All"** (for Development) or **"Exception"** (for Production).

> [!WARNING]
> **Production Storage Costs**
> Never leave Trace Logging set to "All" in a Production environment for more than a few hours. Traces consume Dataverse Database Capacity, which is extremely expensive. It will rapidly bloat your storage.

---

## Reading the Logs

When a plugin executes, Dataverse creates a record in the **Plugin Trace Log** (\`plugintracelog\`) table.

You can view these logs by navigating to *Advanced Find* or by adding the "Plugin Trace Logs" table to a Model-Driven App.

**The most efficient way to read logs:**
Use the **Plugin Trace Viewer** tool inside XrmToolBox. It allows you to filter logs by Correlation ID, Exception type, and specific entity, making it infinitely faster to find the exact crash than using the standard Dataverse grid.
`,
};
