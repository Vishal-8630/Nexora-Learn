import { DocContent } from "@/types/docs";

export const solutionLayering: DocContent = {
  title: "Solution Layering & Active Customizations",
  description:
    "Debugging deployment failures by understanding Active vs Managed solution layers.",
  content: `
## The Concept of Solution Layers

Dataverse uses a sophisticated component layering system. When multiple solutions modify the same component (like the Account Main Form), Dataverse calculates which change "wins" based on solution layers.

The most critical concept to understand is the difference between the **Managed Layer** and the **Active (Unmanaged) Layer**.

*   **Managed Layers:** These are installed when you import a Managed Solution into UAT or Production. They stack on top of each other.
*   **Active (Unmanaged) Layer:** This sits at the very top of everything. **The Active Layer always wins.**

---

## The Nightmare Scenario: "My changes aren't showing up!"

Imagine you are deploying a new JavaScript file and a Form change to the UAT environment via a Managed Solution. The pipeline succeeds, but when the testers look at the UAT environment, the old JavaScript is still running, and the new column isn't on the form.

**What happened?**
Someone went directly into the UAT environment and manually modified the form or the JavaScript file. By doing so, they created an **Active Customization** on top of that component in UAT.

Because the Active layer *always* overrides Managed layers, Dataverse ignores your deployment and continues serving the manual change.

---

## How to Fix It (Removing Active Customizations)

To fix this, you must strip away the unauthorized Active Layer in the target environment.

1.  Open the target environment (e.g., UAT) in the Power Apps portal.
2.  Navigate to the Default Solution (or the managed solution you just imported).
3.  Find the component that isn't updating (e.g., the Account Main Form).
4.  Select the component, click the ellipsis (\`...\`), and select **Solution Layers**.
5.  In the panel that opens, you will see a visual stack. At the very top, you will see an **Active** layer.
6.  Select the Active layer and click **Remove active customizations**.

> [!CAUTION]
> **Data Loss Warning**
> Removing an active customization will instantly revert the component to its managed state. If the user added an unmanaged column to that form that doesn't exist in your source code, it will be wiped from the form.

---

## Best Practice: Environment Lockdowns

To prevent this nightmare, **no one should have System Administrator access in UAT or Production**. 

Environments downstream from Development should be heavily locked down to prevent "cowboy coding" and manual tweaks, ensuring that your automated ALM pipelines are the single source of truth for the system state.
`,
};
