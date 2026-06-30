import { DocContent } from "@/types/docs";

export const csharpCodingStandards: DocContent = {
  title: "C# Coding Standards",
  description:
    "Enterprise best practices for writing secure, performant, and maintainable C# plugins.",
  content: `
## 1. Thread Safety (The Golden Rule)

As discussed in the Plugin Mistakes section, a Dataverse plugin class is instantiated once and cached in memory. Multiple users triggering the plugin will execute on the exact same class instance simultaneously via different threads.

> [!CAUTION]
> **Never use class-level variables.**
> Any variable that maintains state (e.g., \`private Guid _accountId;\`) must be declared *inside* the \`Execute(IServiceProvider)\` method. If you declare it at the class level, User B's thread will overwrite User A's data, causing terrifying cross-contamination.

---

## 2. The Early Return Pattern

Plugins should fail fast. Instead of nesting your entire plugin logic inside a massive \`if (context.Depth == 1)\` block, use the "Early Return" pattern.

\`\`\`csharp
// BAD (Arrow Code)
public void Execute(IServiceProvider serviceProvider) 
{
    if (context.Depth == 1) 
    {
        if (target.Contains("name")) 
        {
            // Do work
        }
    }
}

// GOOD (Fail Fast)
public void Execute(IServiceProvider serviceProvider) 
{
    if (context.Depth > 1) return;
    if (!target.Contains("name")) return;
    
    // Do work cleanly without nesting
}
\`\`\`

---

## 3. Disposing WCF Connections

When writing a Console Application or an Azure Function that connects to Dataverse via the \`ServiceClient\` (or the legacy \`CrmServiceClient\`), it opens a heavy Windows Communication Foundation (WCF) connection.

You must dispose of this connection properly, or you will cause connection exhaustion on your server.

**Best Practice:** Always wrap your \`ServiceClient\` in a \`using\` block.

\`\`\`csharp
using (ServiceClient serviceClient = new ServiceClient(connectionString))
{
    // The connection will automatically close and dispose when exiting this block
    IOrganizationService service = serviceClient;
    service.Create(account);
}
\`\`\`
*(Note: You do not need to do this inside a Plugin, as the \`IOrganizationServiceFactory\` handles the lifecycle for you).*

---

## 4. Null Checking (GetAttributeValue)

Never access an entity's attribute directly via the indexer (\`entity["name"]\`) unless you have explicitly checked \`entity.Contains("name")\` first. If the field is blank in the database, the indexer will throw a \`KeyNotFoundException\`.

Instead, use the strongly-typed \`GetAttributeValue<T>()\` extension method. It safely returns the default value (e.g., \`null\` for strings, \`0\` for ints) if the field is missing.

\`\`\`csharp
// BAD (Will crash if revenue is blank)
Money revenue = (Money)account["revenue"];

// GOOD (Safely returns null)
Money revenue = account.GetAttributeValue<Money>("revenue");
if (revenue != null) { ... }
\`\`\`
`,
};
