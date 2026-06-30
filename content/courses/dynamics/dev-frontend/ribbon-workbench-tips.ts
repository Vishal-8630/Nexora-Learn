import { DocContent } from "@/types/docs";

export const ribbonWorkbenchTips: DocContent = {
  title: "Ribbon Workbench & Command Bar",
  description:
    "Passing execution context, handling asynchronous enable rules, and securely hiding buttons.",
  content: `
## Modern Command Bar vs Ribbon Workbench

Microsoft introduced a modern Command Bar editor in the Power Apps maker portal. It uses Power Fx and is much easier to use than the legacy XML.

**However**, you will still use the Ribbon Workbench constantly because the modern editor cannot do everything. Specifically, it cannot easily hide legacy system buttons (like "Qualify" on a Lead) or implement complex JavaScript enable rules.

---

## 1. Passing the Context (\`PrimaryControl\`)

When you click a custom button in the Ribbon, it usually fires a JavaScript function. If that function needs to read data from the form, it needs the \`formContext\`.

Because there is no \`executionContext\` on a button click, you must pass the \`PrimaryControl\`.

1. In Ribbon Workbench, select your Command.
2. In the Action, add a **CRM Parameter**.
3. Set the parameter to **PrimaryControl**.
4. In your JavaScript function, the first argument will now be the \`formContext\`!

\`\`\`javascript
// PrimaryControl maps directly to formContext
export function onMyButtonClick(primaryControl) {
    const accountName = primaryControl.getAttribute("name").getValue();
    alert("You clicked the button on: " + accountName);
}
\`\`\`

---

## 2. Asynchronous Enable Rules

Sometimes a button should only be visible if a complex condition is met in a related table. This requires an API call. 

Historically, developers would make synchronous \`XMLHttpRequest\` calls to block the UI while checking. This is strictly prohibited now and will freeze the browser.

**How to make Async Enable Rules:**
1. Write a function that returns a \`Promise<boolean>\`.
2. In Ribbon Workbench, add a Custom Rule to your Enable Rules.
3. Check the **IsCore** property (set it to \`True\`, though Ribbon Workbench handles this automatically for Promises now).

\`\`\`javascript
export function shouldShowButton(primaryControl) {
    return new Promise((resolve, reject) => {
        const accountId = primaryControl.data.entity.getId();
        
        Xrm.WebApi.retrieveRecord("account", accountId, "?$select=creditlimit").then(
            function success(result) {
                if (result.creditlimit > 10000) {
                    resolve(true); // Show the button
                } else {
                    resolve(false); // Hide the button
                }
            },
            function error(error) {
                resolve(false);
            }
        );
    });
}
\`\`\`
*Note: The button will be hidden by default while the Promise is pending.*

---

## 3. Securely Hiding Buttons

If a user should not be allowed to Qualify a Lead unless they are a manager, Junior developers will often write a JavaScript Enable Rule to hide the button.

> [!CAUTION]
> **JavaScript is not Security!**
> Hiding a button via JavaScript does not prevent a user from triggering the action. They can still Qualify the Lead via bulk edit, via an API call in Postman, or by creating a Power Automate flow.

**The Fix:**
Always implement the security rule in a **C# Plugin (Pre-Validation)**. The Ribbon JavaScript is just a UI nicety to prevent the user from seeing a button that will ultimately throw an error anyway.
`,
};
