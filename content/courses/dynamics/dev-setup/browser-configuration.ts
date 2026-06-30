import { DocContent } from "@/types/docs";

export const browserConfiguration: DocContent = {
  title: "Browser Configuration & Cache Busting",
  description:
    "How to configure Chrome/Edge for Dynamics 365 development to prevent the infamous 'Cache Issue'.",
  content: `
## The Dynamics 365 Developer's Nemesis: The Browser Cache

If you ask any Dynamics 365 developer what their biggest frustration was during their first year, the answer is always the same: **"I updated my JavaScript Web Resource, I published it, but the old code is still running in the browser."**

Dynamics 365 heavily caches static resources (JavaScript, CSS, HTML) to improve performance for end-users. For developers, this is a nightmare.

---

## 1. Setting Up Your Developer Profile

Never do Dynamics 365 development in your personal browser profile. You will constantly run into Azure AD token conflicts between your company email and your client's email.

1. Create a **dedicated Edge or Chrome Profile** for your specific project.
2. Log into that profile exclusively with the project's Azure AD credentials.
3. This prevents "Pick an account" loops when jumping between the Power Apps portal, Azure DevOps, and the CRM interface.

---

## 2. DevTools: Disable Cache (The Golden Rule)

When writing JavaScript for forms, you must keep the browser's Developer Tools (F12) open, and you must configure it to disable the cache.

1. Open DevTools (\`F12\` or \`Ctrl+Shift+I\`).
2. Go to the **Network** tab.
3. Check the **Disable cache** checkbox.

> [!WARNING]
> **The Catch**
> The "Disable cache" checkbox *only works while the DevTools panel is open*. If you close F12 and refresh the page, Dynamics will immediately serve you the cached JavaScript file. Always keep F12 open on a second monitor while developing.

---

## 3. The "Hard Refresh" Workflow

Even with DevTools open, Dynamics utilizes aggressive Service Workers and unified routing that can bypass standard cache-clearing.

If your \`console.log\` isn't showing up after a publish, follow this exact sequence:
1. Ensure F12 is open.
2. Right-click the browser's Refresh button.
3. Select **Empty Cache and Hard Reload**.

---

## 4. The Nuclear Option: Cache-Busting via URL

If you are absolutely certain you published the Web Resource, but the browser refuses to fetch it (often happens on Mobile Apps or deeply cached unified interface frames), you can force a cache bust.

Dynamics appends a cache-control string to web resources:
\`\`\`text
https://org.crm.dynamics.com/%7B637894...%7D/webresources/new_myScript.js
\`\`\`

To force the server to issue a new cache key:
1. Open the Power Apps Maker Portal.
2. Publish All Customizations (this increments the internal version number).
3. Append \`?flags=clearCache=1\` to your Model-Driven App URL.
4. Hit Enter.

---

## 5. Console Tricks for Form Debugging

Because Dynamics loads form scripts asynchronously via \`eval()\`, finding your script in the "Sources" tab can be annoying.

**Tip 1: The \`debugger;\` statement**
Always place a \`debugger;\` keyword at the top of your function while writing it. When the form loads, Chrome will freeze execution and immediately jump to your virtual file, allowing you to set breakpoints.

**Tip 2: Global \`formContext\`**
When debugging in the console, you won't have access to the \`formContext\`. However, you can access the current XRM context directly in the console using the internal undocumented frames (use only for debugging, never in production code!):
\`\`\`javascript
// In the console, change context to the Main.aspx frame, then run:
var formContext = frames[0].Xrm.Page; // Legacy but works for quick console checks
\`\`\`
`,
};
