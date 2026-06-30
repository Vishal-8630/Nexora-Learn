import { DocContent } from "@/types/docs";

export const xrmToolBoxEssentials: DocContent = {
  title: "XrmToolBox Survival Kit",
  description:
    "The absolute mandatory XrmToolBox plugins every Dynamics 365 developer needs to survive.",
  content: `
## What is XrmToolBox?

[XrmToolBox](https://www.xrmtoolbox.com/) is a Windows application that connects to Microsoft Dataverse and provides hundreds of community-built tools. It is not an exaggeration to say that working in Dynamics 365 without XrmToolBox is nearly impossible.

> [!IMPORTANT]
> **Security Note**
> XrmToolBox is widely approved in enterprise environments, but it requires communicating with your Dynamics 365 instance. Ensure you download it exclusively from the official source.

---

## The Mandatory Plugins

When you first install XrmToolBox, the plugin store can be overwhelming. Here are the tools you must install immediately.

### 1. FetchXML Builder
*Author: Jonas Rapp*

Writing FetchXML by hand is error-prone. FetchXML Builder provides a UI to construct complex queries, execute them, and view the results instantly.
*   **Why you need it:** You can build a query visually and instantly convert it into C# \`QueryExpression\`, OData endpoints, or Power Automate OData strings.
*   **Pro Tip:** If you have a view in CRM that isn't quite right, open it in FetchXML Builder, tweak the XML, and update the View definition directly from the tool.

### 2. Ribbon Workbench
*Author: Scott Durow*

The standard Power Apps maker portal only supports modern Command Bar customizations. If you need to hide legacy buttons (like "Qualify" on a Lead) or implement complex JavaScript enable rules, you **must** use the Ribbon Workbench.
*   **Why you need it:** It is the only reliable way to edit the massive, complex \`RibbonDiffXml\` without breaking your system.
*   **Pro Tip:** **NEVER load your entire solution into the Ribbon Workbench.** Create a tiny temporary solution containing *only* the Entity whose ribbon you want to edit. Loading large solutions will cause the tool to crash or timeout.

### 3. Plugin Registration Tool
*Author: Microsoft / Community*

While Microsoft ships an official Plugin Registration Tool in NuGet, the XrmToolBox version is identical but benefits from shared authentication.
*   **Why you need it:** Used to register C# assemblies, Steps (Messages like Update/Create), and Pre/Post Images.
*   **Pro Tip:** When a plugin throws an error in production, use the "Install Profiler" button in this tool to capture the exact execution state for local debugging in Visual Studio.

### 4. Metadata Browser
*Author: Tanguy Touzard*

When writing C# or JavaScript, you need the exact logical names of tables and columns.
*   **Why you need it:** The Power Apps portal is slow for checking schema names. The Metadata Browser lets you instantly search and filter all tables, finding the exact \`SchemaName\` vs \`LogicalName\`, OptionSet integer values, and relationship names.

### 5. View Designer
*Author: Innofactor*

*   **Why you need it:** Sometimes you need a view to display a column from a parent record that the standard CRM view editor doesn't allow you to select. View Designer lets you bypass the UI restrictions by letting you write the raw FetchXML for the view layout.

---

## Connection Management

Just like the \`pac\` CLI, you must manage your connections carefully. XrmToolBox uses a robust connection manager. 

> [!CAUTION]
> **Use Color Coding!**
> Always edit your Production connections in XrmToolBox to have a **BRIGHT RED background color**. When you open a tool, the background color of the tab will remind you that you are about to execute a query against live production data.
`,
};
