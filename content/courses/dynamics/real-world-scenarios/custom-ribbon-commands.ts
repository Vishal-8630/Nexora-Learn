import { DocContent } from "@/types/docs";

export const customRibbonCommands: DocContent = {
  title: "Custom Ribbon Commands",
  description:
    "Learn how to safely modify the Model-Driven command bar using the modern Command Designer and Power Fx.",
  content: `
## The Business Requirement

"We need a button on the Account form called 'Verify Credit'. It should only be visible to users with the 'Finance Manager' role, and only when the Account's Status is 'Active'. When clicked, it should call an external API to check the credit score and update the 'Credit Limit' field on the form."

## The Naive Approach

A beginner might download the community tool "Ribbon Workbench" (which modifies the underlying complex \`RibbonDiffXml\`). They write 300 lines of complex JavaScript to check the user's security role, evaluate the form state, make an \`XMLHttpRequest\` to the external API, parse the JSON, and update the form using \`formContext.getAttribute().setValue()\`.
- **Why it fails:** While Ribbon Workbench was the industry standard for 10 years, managing raw XML and complex JavaScript is a maintenance burden. If the external API requires authentication (e.g., an OAuth token), writing that securely in client-side JavaScript is a massive security risk.

## The Enterprise Architecture

The modern architect uses the native **Command Designer** and offloads the heavy lifting to the backend.

### 1. The Modern Command Designer
Instead of using external XML tools, the architect opens the Model-Driven App in edit mode, selects the Account table, and edits the **Command Bar**. They visually drag and drop a new button called "Verify Credit".

### 2. Visibility Rules (Power Fx)
Instead of writing JavaScript to evaluate if the button should be visible, the architect uses **Power Fx** (the same formula language used in Canvas Apps) directly in the Command Designer:
\`\`\`powerappsfl
If(
  Self.Selected.Item.State = 'State (Accounts)'.Active And
  User.Roles = "Finance Manager", 
  true, 
  false
)
\`\`\`
This natively controls the visibility of the button without writing a single line of JavaScript.

### 3. Offloading the API Call (Custom API)
Because the external API requires secure OAuth authentication, the architect refuses to put the API keys in front-end JavaScript.
- They create a **Custom API** in Dataverse called \`cont_VerifyCredit\`.
- They write a backend C# Plugin (or a Power Automate flow) bound to that Custom API to securely handle the HTTP request and update the Dataverse record.

### 4. The Action (JavaScript)
The only JavaScript the architect writes is a simple 5-line function bound to the button click. This script extracts the Account GUID from the form context and uses \`Xrm.WebApi.online.execute\` to call the \`cont_VerifyCredit\` Custom API.
Once the API returns success, the JavaScript calls \`formContext.data.refresh()\` to reload the UI, displaying the newly updated Credit Limit to the user.

## Things to Remember

- Move away from raw XML editing; use the modern **Command Designer**.
- Use **Power Fx** for simple visibility rules instead of JavaScript.
- Never place API keys or complex logic in client-side JavaScript.
- Offload heavy logic to the backend using a **Custom API**, and call it from the ribbon.
  `.trim(),
};
