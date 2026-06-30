import { DocContent } from "@/types/docs";

export const pluginProfiler: DocContent = {
  title: "Remote Debugging (Plugin Profiler)",
  description:
    "How to capture a crash in Production and replay it locally step-by-step in Visual Studio.",
  content: `
## The Remote Debugging Dilemma

Imagine a C# plugin is throwing a \`NullReferenceException\` in the Production environment. You cannot attach Visual Studio to the live Microsoft Dataverse servers. How do you step through the code to find exactly which line is throwing the error?

You use the **Plugin Profiler**.

---

## How the Plugin Profiler Works

The Plugin Profiler is a tool that injects itself between Dataverse and your plugin. When a user clicks "Save" in Production, the Profiler intercepts the entire execution context (including every variable, the exact Target entity, and the User ID), serializes it into a massive block of text, and saves it.

You then download that text file to your local computer, open Visual Studio, and tell it to "replay" the exact scenario locally on your machine.

---

## Step-by-Step Profiling

### 1. Install the Profiler
Open the **Plugin Registration Tool** and connect to the environment where the bug is happening.
Click **Install Profiler**.

### 2. Profile the Step
1. Find the specific Plugin Step that is failing (e.g., \`Update of Account\`).
2. Right-click the step and click **Start Profiling**.
3. Choose **Exception** (if you want it to capture the context only when the plugin crashes).

### 3. Trigger the Bug
Go into the live Dynamics 365 environment and perform the exact UI action that causes the error. The error will pop up, but this time, the Profiler has captured a snapshot of the execution state.

### 4. Download the Log
In the Plugin Registration Tool, click **Debug**. It will prompt you to download the Error Log file you just generated.

### 5. Replay in Visual Studio
1. Open your C# Plugin project in Visual Studio.
2. Place a **Breakpoint** on the first line of your \`Execute\` method.
3. Click **Debug > Attach to Process**.
4. Attach to the \`PluginRegistration.exe\` process.
5. In the Plugin Registration Tool (Debug window), select your downloaded Log file, select your local compiled \`.dll\`, and click **Start Execution**.

Visual Studio will instantly light up. You can now press \`F10\` and step through the code line-by-line, watching exactly how your local code reacts to the live Production data snapshot!
`,
};
