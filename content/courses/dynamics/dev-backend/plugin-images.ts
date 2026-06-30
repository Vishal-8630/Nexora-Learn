import { DocContent } from "@/types/docs";

export const pluginImages: DocContent = {
  title: "Pre-Images and Post-Images",
  description:
    "How to access data before and after an SQL transaction without making expensive API calls.",
  content: `
## The Problem with the \`Target\`

When a plugin fires on an \`Update\` step, the \`Target\` entity in \`context.InputParameters\` is highly optimized: **It only contains the fields the user actually changed on the form.**

If the user changes the Account's \`Main Phone\`, the \`Target\` will contain the new phone number. But what if your plugin needs to check the Account's \`Credit Limit\` to decide what to do? The \`Credit Limit\` was not changed, so it is missing from the \`Target\`. 

Junior developers will issue a \`service.Retrieve()\` to fetch the credit limit. This is a massive waste of processing power.

---

## The Solution: Plugin Images

Plugin Images allow you to tell the Dataverse SQL engine: *"When this update happens, take a snapshot of the database row and hand it to my plugin."*

There are two types of images:

### 1. Pre-Image
A snapshot of the database row **exactly as it existed a millisecond before the update occurred**.
*   **Use Case:** Comparing old values to new values. ("Did the status change from A to B?")
*   **Availability:** \`Update\`, \`Delete\` (You cannot have a Pre-Image on a \`Create\`, because the record didn't exist yet!).

### 2. Post-Image
A snapshot of the database row **exactly as it exists a millisecond after the update occurred**.
*   **Use Case:** You need the full, current state of the record after the user's changes have been merged into the database.
*   **Availability:** \`Create\`, \`Update\`.

---

## Registering an Image

Images must be registered using the Plugin Registration Tool.

1. Right-click your registered Step and select **Register New Image**.
2. Select **Pre Image** or **Post Image** (or both).
3. **Entity Alias:** Name it something logical, like \`PreImage\` or \`PostImage\`. You will use this exact string in your C# code.
4. **Parameters:** Click the button to select specific columns. **Never select "All Columns".** Only select the specific columns your plugin needs to read, otherwise you severely impact the database performance.

---

## Accessing the Image in C#

Once registered, you can retrieve the snapshot directly from the \`IPluginExecutionContext\`.

\`\`\`csharp
public void Execute(IServiceProvider serviceProvider)
{
    var context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

    // Accessing the Target (What the user changed)
    Entity target = (Entity)context.InputParameters["Target"];

    // Accessing the Pre-Image (What the database looked like before)
    if (context.PreEntityImages.Contains("PreImage"))
    {
        Entity preImage = context.PreEntityImages["PreImage"];
        
        // Example: Did the name change?
        string oldName = preImage.GetAttributeValue<string>("name");
        string newName = target.Contains("name") ? target.GetAttributeValue<string>("name") : oldName;
    }
}
\`\`\`
`,
};
