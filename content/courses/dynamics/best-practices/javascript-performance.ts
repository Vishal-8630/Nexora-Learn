import { DocContent } from "@/types/docs";

export const javascriptPerformance: DocContent = {
  title: "JavaScript Performance Standards",
  description:
    "Avoiding synchronous calls, batching requests, and optimizing Model-Driven App form load times.",
  content: `
## 1. The Death of Synchronous API Calls

For a long time, developers used synchronous \`XMLHttpRequest\` calls to force the browser to wait for Dataverse to return data before continuing script execution.

**Microsoft has strictly deprecated synchronous XMLHttpRequests.** Modern browsers will aggressively terminate them, and Dataverse blocks them.

*   **Rule:** Every single API call (\`Xrm.WebApi.retrieveRecord\`) must be handled asynchronously.
*   **Rule:** If your logic relies on the result of an API call, it must happen inside the \`then()\` Promise resolution, or you must use \`async/await\`.

---

## 2. Minimizing Form Load Scripts

The \`OnLoad\` event of a form is the most critical performance bottleneck in a Dynamics 365 system. If a user has to wait 8 seconds for a form to open, they will abandon the CRM.

### Best Practices for OnLoad:
1. **Never make an API call on Load unless absolutely necessary.** If you must, ensure it is asynchronous so the UI renders while the data fetches.
2. **Use Business Rules first.** If you are writing JavaScript just to hide/show a field or make a field mandatory based on a dropdown, delete the JavaScript and build a Business Rule instead. The platform caches and executes Business Rules significantly faster than custom Web Resources.
3. **Defer heavy logic.** If a script calculates a massive grid at the bottom of the form, attach that script to the \`OnTabStateChange\` event of that specific tab, rather than running it \`OnLoad\`. The code will only execute if the user actually scrolls down and opens the tab.

---

## 3. Batching WebAPI Requests

If you are writing a custom HTML Web Resource or a PCF control that needs to update 50 child records when a button is clicked, **do not execute 50 individual \`Xrm.WebApi.updateRecord\` calls in a \`for\` loop.**

This will spam the browser's network queue, severely impact performance, and likely trigger Dataverse API throttling limits.

**The Solution: OData Batch Requests**
You can bundle all 50 update commands into a single HTTP POST payload using the \`$batch\` OData endpoint. Dataverse will receive the single network request, unpack the 50 updates on the server, process them in a single SQL transaction, and return a single response.

*(Note: While \`Xrm.WebApi\` doesn't natively expose a simple \`.batch()\` method, you can construct the multipart HTTP string manually, or utilize community libraries like \`Xrm.Tools.CRMWebAPI\` to handle it cleanly).*
`,
};
