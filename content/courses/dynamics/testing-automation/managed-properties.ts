import { DocContent } from "@/types/docs";

export const managedProperties: DocContent = {
  title: "Managed Properties (Locking Components)",
  description:
    "How ISVs lock down components so clients cannot modify or break them in Production.",
  content: `
## The Problem with Managed Solutions

When you deploy a Managed Solution to a target environment, the components belong to the Managed layer. 

However, by default, a System Administrator in the target environment can still open the Account form, add an unmanaged column to it, or change the logic of your workflow. This creates an **Active Customization** on top of your Managed layer.

If you are an ISV (Independent Software Vendor) selling a Dynamics 365 app, you do not want your customers modifying your proprietary JavaScript or deleting your core columns.

---

## Managed Properties

**Managed Properties** allow you (the publisher) to explicitly define what a customer is allowed to do with your components once the solution is installed as Managed.

### How to configure them

1. In your Development environment, open your Unmanaged Solution.
2. Select a component (e.g., a Custom Table, or a specific Column).
3. Click the ellipsis (\`...\`) and select **Managed Properties**.

### What you can lock down

*   **Can be customized:** If set to False, the customer cannot make any changes to this component.
*   **Can create forms/views:** You can lock the table schema, but still allow the customer to build their own forms and views on top of it.
*   **Can change requirement level:** Prevent a customer from changing a "Business Required" column back to "Optional", ensuring your C# plugins don't crash from null exceptions.

---

## When to use them

> [!WARNING]
> **Internal Enterprise ALM**
> If you are building an internal CRM for your own company (not selling an ISV app), **do not lock your Managed Properties**.
> If you lock a column, and later decide you need to change its data type, you will be unable to do so, even via a Solution Upgrade. Locking components internally often leads to ALM deadlocks where you are forced to completely uninstall the entire solution (losing all data) just to fix a property.

**Use Managed Properties strictly when:**
1. You are distributing an app via Microsoft AppSource.
2. You have a strict "Core Framework" solution deployed to 50 different countries' instances, and you need to physically prevent local administrators from breaking the core architecture.
`,
};
