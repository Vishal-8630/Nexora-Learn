import { DocContent } from "@/types/docs";

export const cacheBusting: DocContent = {
  title: "The Cache Issue (Cache-Busting)",
  description:
    "How to force the browser to actually load your updated JavaScript instead of the cached version.",
  content: `
## The Frustration

You write a new function in your JavaScript file. You upload it to Dataverse. You click "Publish". You open the Account form, click your custom ribbon button, and... nothing happens. 

You open the Chrome DevTools (\`F12\`), look at your source code, and see that **the browser is still running your old code from yesterday**.

Welcome to Dynamics 365 development.

---

## Why does this happen?

Dataverse aggressively caches static Web Resources (HTML, JS, CSS, Images) in the user's browser. It appends a unique cache-key (a GUID) to the URL. 
Example: \`https://org.crm.dynamics.com/%7B6378...%7D/webresources/new_script.js\`

Sometimes, publishing the web resource fails to instruct the Model-Driven App to request a new cache key.

---

## Strategy 1: The DevTools Hard Reload

If you are actively developing, you **must** keep the F12 Developer Tools open.

1. Open DevTools (F12).
2. Go to the **Network** tab and check **Disable cache**.
3. *This is often not enough due to Service Workers!*
4. With F12 open, **Right-Click the browser's refresh button** and select **Empty Cache and Hard Reload**.

---

## Strategy 2: The URL Flag (clearCache)

If Strategy 1 fails (especially common if the Web Resource is embedded deeply in a PCF control or an HTML web resource iframe), you can force Dataverse to flush its internal cache routing.

Append this exact query parameter to your Model-Driven App URL:
\`\`\`text
&flags=clearCache=1
\`\`\`
Hit enter. The app will reload slightly slower, and it will fetch the absolute latest version of every web resource.

---

## Strategy 3: The "Publish All" Nudge

Sometimes, clicking "Publish" on the single Web Resource doesn't trigger the metadata sync across Microsoft's global CDN. 

If all else fails:
1. Go to Solutions.
2. Click **Publish All Customizations**.
3. Wait 60 seconds.
4. Perform Strategy 2 (\`clearCache=1\`).

*Note: Publish All Customizations takes several minutes on large enterprise environments, so this should be your last resort.*
`,
};
