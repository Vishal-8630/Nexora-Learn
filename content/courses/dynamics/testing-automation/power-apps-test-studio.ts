import { DocContent } from "@/types/docs";

export const powerAppsTestStudio: DocContent = {
  title: "Power Apps Test Studio",
  description:
    "Native testing capabilities for Canvas Apps and Custom Pages.",
  content: `
## Testing Canvas Apps

EasyRepro and Playwright are designed for Model-Driven Apps. But what if you have built a complex Canvas App or a Custom Page? The DOM of a Canvas App is completely opaque, making traditional Selenium testing nearly impossible.

Microsoft provides a native tool for this: **Power Apps Test Studio**.

---

## How to use Test Studio

Test Studio is embedded directly inside the Power Apps Studio maker portal.

1. Open your Canvas App in Edit mode.
2. On the left navigation pane, click the **Advanced Tools** icon (the wrench and screwdriver).
3. Click **Open Tests**.

This opens a dedicated testing environment.

### 1. Recording Tests
The easiest way to build a test is to record it.
*   Click **Record**.
*   Interact with your app (type in a text box, click a button, navigate screens).
*   Test Studio automatically generates Power Fx formulas for every action you took (e.g., \`SetProperty(TextInput1.Text, "Hello"); Select(SubmitButton);\`).

### 2. Writing Assertions
A test isn't a test without verifying the result. You use the \`Assert\` function in Power Fx.

\`\`\`powerapps-fl
// Simulate clicking the calculate button
Select(CalculateButton);

// Assert that the total label now equals 500
Assert(TotalLabel.Text = "500", "Calculation failed! Expected 500.");
\`\`\`

---

## Automating Test Studio (CI/CD)

Running tests manually in the Studio is great, but enterprise ALM requires automation.

You can execute Power Apps Test Studio suites from an Azure DevOps pipeline using the **Power Apps Checker** and the native Power Platform Build Tools.

1. In your Test Studio, click **Publish**. This generates a playable URL for the test suite.
2. In Azure DevOps, add the task **Power Platform Server-Side Code Execution**.
3. Pass the URL of your test suite.
4. The pipeline will run the Canvas App tests in the background and report the assertions back to your DevOps test dashboard.

> [!TIP]
> **Component Libraries**
> If you are building reusable PCF controls or Canvas Component Libraries, you should write comprehensive Test Studio suites for the library itself before distributing it to your makers.
`,
};
