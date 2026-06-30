import { DocContent } from "@/types/docs";

export const fiddlerAutoResponder: DocContent = {
  title: "Live Debugging with Fiddler",
  description:
    "How to use Fiddler AutoResponder to inject local JavaScript into a live Production environment.",
  content: `
## The Production Bug Dilemma

Imagine a catastrophic bug is happening in the Production environment inside a complex 3000-line JavaScript Web Resource. 

You cannot easily debug it because the code is minified. You cannot add \`console.log\` statements because you are absolutely forbidden from modifying code directly in Production.

How do you debug it? **You use Fiddler.**

---

## What is Fiddler AutoResponder?

[Telerik Fiddler Classic](https://www.telerik.com/fiddler/fiddler-classic) is a web debugging proxy. It sits between your browser and the internet.

The **AutoResponder** feature allows you to tell Fiddler: *"Hey, if the browser asks Microsoft for \`account_main.js\`, intercept that request, DO NOT go to Microsoft, and instead hand the browser this local file from my \`C:/dev/\` folder."*

This allows you to write unminified code, add \`debugger;\` statements, and test fixes on your local machine *while interacting with the live Production Dataverse UI*, without ever deploying a single change to the server!

---

## Step-by-Step Setup

1. **Install Fiddler Classic** and enable HTTPS Decryption (\`Tools > Options > HTTPS > Decrypt HTTPS traffic\`).
2. Open your Dynamics 365 environment in the browser and open the form with the broken script.
3. In Fiddler, look at the Web Sessions list on the left. Find the request for your web resource (e.g., \`.../webresources/contoso_account.js\`).
4. **Drag and Drop** that session from the left pane into the **AutoResponder** tab on the right pane.
5. In the AutoResponder Rule Editor at the bottom:
   * **Rule:** \`EXACT:https://yourorg.crm.dynamics.com/.../webresources/contoso_account.js\`
   * **Action:** Click the dropdown, select **Find a file...**, and select your local unminified JavaScript file (e.g., \`C:\\Dev\\contoso_account.js\`).
6. Check the **Enable Rules** and **Unmatched requests passthrough** checkboxes at the top of the AutoResponder tab.

### The Result

Now, refresh your browser in Dynamics 365. 

The browser will ask for the file, Fiddler will intercept it, and it will serve your local file. You can now add \`console.log\` and \`debugger;\` to your local file, save it, refresh the browser, and instantly see the results in Production, entirely safely!
`,
};
