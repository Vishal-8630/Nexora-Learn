import { DocContent } from "@/types/docs";

export const pluginRegistrationStrategy: DocContent = {
  title: "Plugin Registration Strategy",
  description:
    "Design an enterprise strategy for registering plugins to avoid spaghetti execution paths, infinite loops, and pipeline timeouts.",
  content: `
## Introduction

In a small deployment, developers open the Plugin Registration Tool and attach their plugin to whatever message they feel like. 

In an enterprise deployment, if 15 developers all register different plugins on the \\\`Update\\\` of the \\\`Account\\\` table across Pre-Validation, Pre-Operation, and Post-Operation stages, the result is chaos. 
- When an Account is updated, which plugin fires first? 
- If Plugin A fails, does it rollback the transaction and break Plugin B?

Architects must enforce a strict **Plugin Registration Strategy**.

## 1. One Plugin per Stage Rule (The Router Pattern)

Many enterprise architectures enforce the "One Plugin per Message/Stage" pattern to regain control of the execution pipeline.

Instead of having 5 distinct DLLs all registered on the \\\`Pre-Operation Update\\\` of Account, you have exactly **one** C# class registered on that stage: \\\`AccountPreOperationUpdate\\\`.

Inside that single class, the code acts as a router. It calls the 5 different business logic classes in a highly specific, deterministic order.

**Pros:** The architect has absolute control over the execution sequence and error handling.
**Cons:** It tightly couples disparate business logic into a single routing file, which can make version control merging slightly more complex.

## 2. The Execution Order Field

If you do not use the single-router pattern, and you allow multiple plugins to be registered on the exact same message and stage, you *must* use the **Execution Order** field in the Plugin Registration Tool.

If two plugins are registered on Post-Operation Update of Account, and both have an Execution Order of \\\`1\\\`, Dataverse will execute them in a completely random order. 
An architect must document the exact numbering sequence (e.g., Validation plugins run at \\\`10\\\`, Sync external systems at \\\`50\\\`).

## 3. Pre-Operation vs Post-Operation (Decision Making)

The most common architectural mistake is registering a plugin on the wrong stage, destroying SQL performance.

### Pre-Operation (Stage 20)
- **Rule:** If the plugin modifies the *same* record that triggered it, it must be Pre-Operation. 
- **Why:** Because the database transaction hasn't committed yet. If you intercept the Account before it saves, modify the Revenue, and let the transaction continue, Dataverse saves the Revenue in the original SQL transaction. If you do this in Post-Operation, you have to call \\\`service.Update(account)\\\`, triggering a second, completely unnecessary SQL transaction.

### Post-Operation (Stage 40)
- **Rule:** If the plugin modifies a *different* record, or needs the GUID of a newly created record, it must be Post-Operation.
- **Why:** Because the original record is safely committed to the database, ensuring you don't generate orphaned child records if the parent transaction rolls back.

## 4. Filtering Attributes

> [!CAUTION]
> **Infinite Loops and Timeouts**
> Never register a plugin on the \\\`Update\\\` message without setting **Filtering Attributes**.
> If you leave filtering attributes blank, your complex C# plugin will fire every single time *any* field on the Account changes, crushing your system performance. 

Always select the exact fields that matter (e.g., "Only fire this plugin if the Revenue field is modified").

## Things to Remember

- Control execution order using a **Router Class** or the **Execution Order** property.
- Modify the *target* record in **Pre-Operation** to avoid double SQL updates.
- Modify *related* records in **Post-Operation**.
- Always define **Filtering Attributes** on Update plugins.

## What's Next

We have optimized our plugins and our solutions. Finally, we will review the ultimate architectural pattern for massive ALM deployments: **Solution Segmentation**.
  `.trim(),
};
