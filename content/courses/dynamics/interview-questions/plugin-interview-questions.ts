import { DocContent } from "@/types/docs";

export const pluginInterviewQuestions: DocContent = {
  title: "C# Plugin Interview Questions",
  description:
    "The most common technical questions asked during a Senior Dynamics 365 Developer interview regarding backend C#.",
  content: `
## Core Plugin Concepts

**Q: What is the difference between a Pre-Image and a Post-Image?**
*   **A:** A Pre-Image is a snapshot of the database record *before* the SQL transaction occurs. A Post-Image is a snapshot *after* the transaction. Pre-Images are available on Update and Delete. Post-Images are available on Create and Update. You use a Pre-Image to compare what changed (e.g., "Did the status change from Active to Inactive?").

**Q: How do you prevent an infinite loop in a plugin?**
*   **A:** By checking the \`context.Depth\` property. If a plugin on Account Update triggers another update on the same Account, the Depth increments. If \`context.Depth > 1\`, the plugin should immediately \`return\` to break the loop.

**Q: Explain the difference between \`context.UserId\` and \`context.InitiatingUserId\`.**
*   **A:** \`InitiatingUserId\` is the GUID of the human being who clicked the button in the UI. It never changes, even across nested workflow calls. \`UserId\` is the context the plugin is currently running under. If the step is registered to run as SYSTEM, the \`UserId\` will be the SYSTEM GUID, but the \`InitiatingUserId\` will remain the original user.

## Code and Architecture

**Q: Why is \`new ColumnSet(true)\` considered bad practice?**
*   **A:** It forces the SQL Server to retrieve every single column on the table (which could be hundreds), destroying database performance and wasting memory. You should only ever retrieve the exact columns your code needs.

**Q: What happens if you declare a private class-level variable in a Plugin?**
*   **A:** Dataverse caches the plugin class instance in memory for performance. Multiple users triggering the plugin will execute on the same instance simultaneously across different threads. A class-level variable will cause thread-safety issues, where User A's data overwrites User B's data, causing severe data corruption.

**Q: How do you handle external NuGet dependencies in a modern Dataverse plugin?**
*   **A:** Historically, we used ILMerge to fuse the DLLs together, but this is unsupported by Microsoft. The modern, supported approach is to package the plugin and its dependencies into a NuGet \`.nupkg\` file (Dependent Assemblies) using the \`pac plugin init\` tooling, and register the entire package via the Plugin Registration Tool.
`,
};
