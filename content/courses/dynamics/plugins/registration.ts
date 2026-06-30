import { DocContent } from "@/types/docs";

export const registration: DocContent = {
  title: "Plugin Registration",
  description:
    "Learn how to use the Plugin Registration Tool to deploy your compiled C# assemblies to Dataverse and configure steps, filters, and secure configuration data.",
  content: `
## Introduction

Once you have finished writing your C# Plugin in Visual Studio and compiled it into a \`.dll\` assembly, it is useless until Dataverse knows about it.

To bridge this gap, Microsoft provides a Windows desktop application called the **Plugin Registration Tool (PRT)**.

## The Plugin Registration Tool (PRT)

The PRT connects securely to your Dataverse environment. It allows you to:
1. Upload your \`.dll\` assembly to the cloud.
2. Register **Steps** (telling Dataverse exactly when to execute your code).
3. Register **Images** (snapshots of data).
4. Provide **Configuration Data** (passwords or settings injected into your plugin).

## Step 1: Registering the Assembly

Before you can register events, you must upload the file.

1. In Visual Studio, ensure your project is **Signed** with a Strong Name Key (\`.snk\`). Dataverse rejects unsigned assemblies.
2. Build the project to generate the \`.dll\`.
3. Open the PRT, connect to your environment, and click **Register -> Register New Assembly**.
4. Browse to your \`.dll\`. 
5. Select **Isolation Mode: Sandbox** and **Location: Database**.
6. Click Register.

Your code is now stored in the Dataverse database.

## Step 2: Registering a Step

Dataverse has the code, but it doesn't know when to run it. You define this by adding a **Step** to your assembly.

Right-click your newly registered Assembly in the PRT and select **Register New Step**. You must configure the following:

- **Message:** What event triggers this? (e.g., \`Create\`, \`Update\`, \`Delete\`).
- **Primary Entity:** Which table? (e.g., \`account\`).
- **Filtering Attributes:** *(Critical for Updates!)* Which specific fields must change to trigger this plugin? If you leave this blank, the plugin runs on *every* update, crippling performance.
- **Event Pipeline Stage of Execution:** \`PreValidation\`, \`PreOperation\`, or \`PostOperation\`.
- **Execution Mode:** \`Synchronous\` (blocks UI) or \`Asynchronous\` (runs in background).

## Step 3: Unsecure and Secure Configuration

Sometimes, your C# code needs configuration data that changes between environments. 
- *Example:* Your plugin connects to an external ERP system. In Dev, it connects to \`api-dev.erp.com\`. In Prod, it connects to \`api.erp.com\`. You also need to provide an API Password.

You should **never** hardcode URLs or passwords in your C# code. 

Instead, you provide this data in the PRT during Step Registration, and Dataverse injects it into your plugin's constructor when it runs.

### Unsecure Configuration
Used for non-sensitive data (URLs, feature flags). This data is stored in plain text and is exported when you move your Solution from Dev to Prod.

### Secure Configuration
Used for sensitive data (API keys, passwords). This data is encrypted in the database. **Crucially, Secure Configuration is stripped out when you export a Solution.** You must manually re-enter the API keys into the PRT in the Production environment after deployment.

### Accessing Configuration in C#

You access these strings by adding a constructor to your plugin class.

\`\`\`csharp
public class MyPlugin : IPlugin
{
    private string _unsecureConfig;
    private string _secureConfig;

    // Constructor injected by Dataverse
    public MyPlugin(string unsecure, string secure)
    {
        _unsecureConfig = unsecure;
        _secureConfig = secure;
    }

    public void Execute(IServiceProvider serviceProvider)
    {
        // You can now use _unsecureConfig and _secureConfig here
    }
}
\`\`\`

## Step 4: Updating an Assembly

As you continue development, you will make changes to your C# code. You do not need to delete and recreate everything in the PRT.

Simply recompile your project in Visual Studio, open the PRT, select your Assembly, and click **Update**. Upload the new \`.dll\` and your new code is immediately live, keeping all your previously configured Steps and Images intact.

## Best Practices

- **Use filtering attributes:** Never register an \`Update\` step without selecting filtering attributes.
- **Use the PAC CLI:** While the PRT UI is the traditional way to register plugins, modern DevOps teams use the Power Platform CLI (\`pac plugin init\`) and tools like the \`spkl\` task runner to automate registration directly from Visual Studio using code decorators.
- **Solution Awareness:** Ensure you add your Plugin Assembly and its Steps to your custom Dataverse Solution before exporting it to another environment.

## Common Mistakes

> [!WARNING]
> **Forgetting to update the Assembly Version** — If you use advanced ALM (Application Lifecycle Management) pipelines to deploy solutions, Dataverse sometimes ignores plugin updates if the Assembly Version number hasn't changed. Always increment your Assembly Version in Visual Studio (e.g., from 1.0.0.1 to 1.0.0.2) before exporting to Production.

## Things to Remember

- Use the **Plugin Registration Tool (PRT)** to deploy code.
- Assemblies must be **Signed** and registered in the **Sandbox**.
- A **Step** defines the Message, Entity, Stage, and Mode.
- Use **Secure/Unsecure Configuration** to inject API keys and URLs instead of hardcoding them.

## Related Topics

- [Execution Pipeline](/docs/plugins/execution-pipeline) — defining the Stage in the PRT
- [Images](/docs/plugins/images) — defining Pre/Post images in the PRT

## What's Next

This concludes Phase 6: Plugins! We have covered the entire lifecycle of server-side C# development in Dataverse. 
But what if we don't want our custom code to fire automatically on database events? What if we want to build a custom API endpoint that external systems can call on-demand? Next, we will cover **Custom APIs**.
  `.trim(),
};
