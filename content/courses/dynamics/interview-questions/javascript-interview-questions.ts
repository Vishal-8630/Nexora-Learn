import { DocContent } from "@/types/docs";

export const javascriptInterviewQuestions: DocContent = {
  title: "JavaScript Interview Questions",
  description:
    "The most common technical questions asked regarding Dataverse Client-Side scripting.",
  content: `
## Xrm API and Form Context

**Q: Why should you never use \`Xrm.Page\`?**
*   **A:** \`Xrm.Page\` was deprecated years ago. It breaks in modern contexts like Editable Grids, PCF controls, and the Unified Interface. You must pass the \`execution context\` into your function via the Form Properties menu, and call \`executionContext.getFormContext()\`.

**Q: How do you pass the \`formContext\` to a function triggered by a Ribbon button?**
*   **A:** A Ribbon button click does not have an \`executionContext\`. You must configure the action in the Ribbon Workbench to pass a **CRM Parameter** set to \`PrimaryControl\`. The \`PrimaryControl\` object is the \`formContext\`.

**Q: How do you stop a user from saving a record using JavaScript?**
*   **A:** In the \`OnSave\` event handler, you call \`executionContext.getEventArgs().preventDefault()\`.

## Advanced Async Patterns

**Q: If you need to make an API call during the \`OnSave\` event to validate data before saving, how do you prevent the form from saving before the API call finishes?**
*   **A:** Because API calls are asynchronous (Promises), the standard \`preventDefault()\` will fire too late. You must enable "Async onsave handlers" in the environment settings. Then, in your code, call \`saveEventArgs.disableAsyncTimeout()\`, return a \`Promise\`, and only resolve or reject the Promise after your API call finishes.

**Q: Why are synchronous XMLHttpRequests banned in modern Dataverse development?**
*   **A:** They freeze the main browser thread, locking the UI and causing a terrible user experience. Modern browsers actively terminate them. All Dataverse Web API calls must be asynchronous using Promises (\`.then()\`) or \`async/await\`.

**Q: How do you force a Web Resource to bypass the browser cache during development?**
*   **A:** You can keep F12 DevTools open with "Disable cache" checked and perform a Hard Reload. If that fails, append \`&flags=clearCache=1\` to the end of the Model-Driven App URL to force Dataverse to flush its internal cache routing.
`,
};
