import { DocContent } from "@/types/docs";

export const customApiOverview: DocContent = {
  title: "Create Custom APIs",
  description:
    "Learn how to create Custom APIs in Dataverse to define your own REST endpoints, pass input/output parameters, and execute custom server-side logic.",
  content: `
## Introduction

Dataverse comes with hundreds of out-of-the-box API endpoints (Messages) like \\\`Create\\\`, \\\`Update\\\`, \\\`Delete\\\`, and \\\`QualifyLead\\\`. 

But what if your business has a highly specific process? For example, "Verify Credit and Apply Discount". You don't want to scatter this complex logic across multiple random Update plugins. You want a single, dedicated API endpoint that any system (JavaScript, Power Automate, or external websites) can call.

To do this, you create a **Custom API**.

## What is a Custom API?

A Custom API allows you to define a brand new Message in the Dataverse event execution pipeline. 
It essentially gives you the ability to create your own REST endpoint on the Dataverse Web API.

**Decision Making: Custom API vs Custom Action**
> [!TIP]
> Custom APIs are the modern replacement for legacy Custom Actions. Custom Actions were built on top of the classic background Workflow engine, which is slow and deprecated. **Microsoft recommends using Custom APIs for all new code-first integrations.**

## 1. Defining the Custom API Metadata

You do not create Custom APIs by writing code first. You must define the API metadata in Dataverse. You can do this via the Maker Portal, or (highly recommended) by using XrmToolBox plugins like the "Custom API Manager".

To create one, you define:
- **Unique Name:** (e.g., \\\`con_VerifyCredit\\\`)
- **Binding Type:** 
  - *Global:* Not tied to any specific record (e.g., a generic math calculation).
  - *Entity:* Tied to a specific table (e.g., verifying credit for a specific Account).
  - *EntityCollection:* Tied to a list of records.
- **Plugin Type:** You can link the Custom API directly to a C# Plugin assembly. When the API is called, Dataverse will execute this specific plugin.

## 2. Input Parameters (The Request)

APIs need data to operate. You define **Custom API Request Parameters**.

If your API is \\\`con_VerifyCredit\\\`, you might need to pass in:
1. **Amount** (Decimal)
2. **OverrideLimit** (Boolean)

You create a "Custom API Request Parameter" record for each of these in Dataverse, linking them to your Custom API. You can define if they are Optional or Required.

## 3. Output Parameters (The Response)

When your API finishes running, it needs to return data back to the caller (e.g., the JavaScript that called it). You define **Custom API Response Properties**.

For \\\`con_VerifyCredit\\\`, you might return:
1. **IsApproved** (Boolean)
2. **ApprovalCode** (String)

You create these Response Properties in Dataverse. 

## 4. The C# Plugin (The Backend Logic)

Once the metadata is defined, you write the actual C# Plugin to perform the logic.

Unlike standard plugins that trigger on "Create" or "Update", this plugin is registered to trigger on your specific \\\`con_VerifyCredit\\\` message. Inside the plugin, you read the Input Parameters from the Context, and write the Output Parameters back to the Context.

\`\`\`csharp
public class VerifyCreditPlugin : IPlugin
{
    public void Execute(IServiceProvider serviceProvider)
    {
        IPluginExecutionContext context = (IPluginExecutionContext)
            serviceProvider.GetService(typeof(IPluginExecutionContext));

        // 1. Read Input Parameters (from the API Request)
        decimal amount = (decimal)context.InputParameters["Amount"];
        bool overrideLimit = (bool)context.InputParameters["OverrideLimit"];

        // 2. Perform Business Logic
        bool approved = false;
        string code = "REJECTED";

        if (amount < 1000 || overrideLimit)
        {
            approved = true;
            code = "APP-" + Guid.NewGuid().ToString().Substring(0, 5);
        }

        // 3. Set Output Parameters (for the API Response)
        context.OutputParameters["IsApproved"] = approved;
        context.OutputParameters["ApprovalCode"] = code;
    }
}
\`\`\`

## 5. Linking the Code to the API

Finally, you compile your code into a DLL and upload it using the Plugin Registration Tool. 
Then, you go back to your Custom API record in the Maker Portal and set the "Plugin Type" lookup to point directly to your newly uploaded Assembly class.

Now, whenever anything calls the \\\`con_VerifyCredit\\\` endpoint, Dataverse automatically runs your C# code.

## Best Practices

- **Always use Custom APIs over Actions:** Custom APIs are code-first and much more performant.
- **Prefix carefully:** Always use your publisher prefix (e.g., \\\`con_\\\`) for the Unique Name to prevent naming collisions with Microsoft's internal APIs.
- **Secure your APIs:** You can configure the \`Execute Privilege Name\` on the Custom API to ensure only users with a specific Security Role can call your endpoint.

## Things to Remember

- Custom APIs allow you to define custom **Dataverse REST endpoints**.
- You define the API via **Metadata** (Inputs and Outputs) before writing code.
- A **C# Plugin** handles the backend execution logic.
- They replace legacy **Custom Actions**.

## What's Next

Now that we have created a Custom API and its C# backend, how do we actually call it from the frontend? Next, we will cover **Invoking Custom APIs**.
  `.trim(),
};
