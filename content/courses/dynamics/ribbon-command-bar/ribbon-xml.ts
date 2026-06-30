import { DocContent } from "@/types/docs";

export const ribbonXml: DocContent = {
  title: "Ribbon XML Architecture",
  description:
    "Understand the underlying RibbonDiffXml architecture that defines how buttons, menus, and rules are structured in Dataverse.",
  content: `
## Introduction

Before the Modern Command Designer existed, every button, menu, and rule on the Dynamics 365 Ribbon was defined by a massive XML schema known as **RibbonDiffXml**.

Even today, when you use the Ribbon Workbench or the Modern Command Designer, you are simply using a visual UI to generate this XML behind the scenes. Understanding this architecture is crucial for troubleshooting deployment failures and building advanced customizations.

## The RibbonDiffXml Structure

When you export a Dataverse Solution containing a customized table, you will find a \`customizations.xml\` file. Inside this file is the \`<RibbonDiffXml>\` node.

It consists of three primary sections:
1. **\`<CustomActions>\`**: Defines the physical buttons and where they are placed.
2. **\`<CommandDefinitions>\`**: Defines what happens when a button is clicked.
3. **\`<RuleDefinitions>\`**: Defines the conditions that control if a button is visible or enabled.

## 1. Custom Actions (The UI)

A \`<CustomAction>\` defines the visual element (a Button, a Flyout Menu, or a Split Button) and its exact location on the screen.

\`\`\`xml
<CustomAction Id="Contoso.account.form.RunCreditCheck.CustomAction" 
              Location="Mscrm.Form.account.MainTab.Save.Controls._children" 
              Sequence="45">
  <CommandUIDefinition>
    <Button Id="Contoso.account.form.RunCreditCheck.Button" 
            Command="Contoso.account.form.RunCreditCheck.Command" 
            LabelText="Run Credit Check" 
            ToolTipTitle="Check Credit" 
            ToolTipDescription="Queries the external ERP for credit limits." 
            TemplateAlias="o1" 
            Image32by32="$webresource:con_credit_icon.svg" />
  </CommandUIDefinition>
</CustomAction>
\`\`\`

- **Location:** The specific ID of the existing Microsoft ribbon group where this button should be injected.
- **Sequence:** Determines the order. If Microsoft's "Save" button is sequence 40, a sequence of 45 places your button immediately to its right.
- **Command:** A critical link. This points to the ID of a \`<CommandDefinition>\` that dictates the button's behavior.

## 2. Command Definitions (The Brains)

A Button by itself does nothing. It must be bound to a Command.

\`\`\`xml
<CommandDefinition Id="Contoso.account.form.RunCreditCheck.Command">
  <EnableRules>
    <EnableRule Id="Contoso.account.form.IsActive.EnableRule" />
  </EnableRules>
  <DisplayRules>
    <DisplayRule Id="Contoso.account.form.HasManagerRole.DisplayRule" />
  </DisplayRules>
  <Actions>
    <JavaScriptFunction FunctionName="Contoso.Ribbon.runCreditCheck" 
                        Library="$webresource:con_account_ribbon.js">
      <CrmParameter Value="PrimaryControl" />
    </JavaScriptFunction>
  </Actions>
</CommandDefinition>
\`\`\`

- **Rules:** The Command references Display and Enable rules. If any rule evaluates to "False", the Command prevents the Button from rendering or being clickable.
- **Actions:** The Command defines what JavaScript function to execute when the user clicks the button.

## 3. Rule Definitions (The Logic)

Rules evaluate the state of the form, the data, or the user.

\`\`\`xml
<RuleDefinitions>
  <TabDisplayRules />
  <DisplayRules>
    <DisplayRule Id="Contoso.account.form.HasManagerRole.DisplayRule">
      <ValueRule Field="statecode" Value="0" InvertResult="false" />
    </DisplayRule>
  </DisplayRules>
  <EnableRules>
    <!-- Complex rules often point to custom JavaScript functions to return true/false -->
    <EnableRule Id="Contoso.account.form.CustomCheck.EnableRule">
      <CustomRule FunctionName="Contoso.Ribbon.shouldEnable" 
                  Library="$webresource:con_account_ribbon.js">
        <CrmParameter Value="PrimaryControl" />
      </CustomRule>
    </EnableRule>
  </EnableRules>
</RuleDefinitions>
\`\`\`

## Hiding Out-of-the-Box Buttons

To hide a button provided by Microsoft (e.g., the standard "Delete" button), you do not delete Microsoft's XML. Instead, you create a \`<HideCustomAction>\` node.

\`\`\`xml
<HideCustomAction Id="Contoso.HideDeleteButton" 
                  HideActionId="Mscrm.Form.account.MainTab.Actions.Delete" 
                  Location="Mscrm.Form.account.MainTab.Actions.Delete" />
\`\`\`
This instructs the rendering engine to suppress Microsoft's button.

## Summary of the Architecture

1. The user looks at the **Button** (\`<CustomAction>\`).
2. The Button is wired to a **Command** (\`<CommandDefinition>\`).
3. The Command checks the **Rules** (\`<RuleDefinitions>\`).
4. If the user clicks the Button, the Command fires the **Action** (JavaScript).

## What's Next

Writing thousands of lines of raw XML is prone to catastrophic typos that can crash the entire Dynamics UI. Instead, developers use a visual tool to generate this XML. Next, we cover the **Ribbon Workbench**.
  `.trim(),
};
