import { DocContent } from "@/types/docs";

export const expressions: DocContent = {
  title: "Expressions (Functions)",
  description:
    "Master the expression language in Power Automate to format dates, manipulate strings, perform math, and handle null values.",
  content: `
## Introduction

While the visual "Dynamic Content" menu in Power Automate is easy to use, it is often not enough. 

- What if Dataverse gives you a date as \`2023-10-31T08:00:00Z\`, but your external ERP API requires it to be formatted as \`10/31/2023\`?
- What if an Account name is "  Contoso Corp  " and you need to trim the whitespace?
- What if an email address field is occasionally blank, causing your flow to crash?

To solve these, you use **Expressions**.

## The Expression Language

The expression language in Power Automate is heavily inspired by Azure Logic Apps (which uses Workflow Definition Language) and Microsoft Excel functions.

You write expressions in the formula bar, and they evaluate at runtime.

## 1. String Manipulation

String functions are critical for cleaning data before passing it between systems.

- **concat:** Join multiple strings together.
  \`concat('Hello ', triggerOutputs()?['body/firstname'], '!')\`
- **replace:** Swap out text.
  \`replace(variables('PhoneNumber'), '-', '')\` *(Removes dashes from a phone number)*
- **substring:** Extract part of a string.
  \`substring(variables('AccountNumber'), 0, 5)\` *(Gets the first 5 characters)*
- **toUpper / toLower:** Change casing.
  \`toUpper(triggerOutputs()?['body/name'])\`

## 2. Date and Time Formatting

Timezones and formats are the #1 cause of bugs in global integrations. Dataverse stores all DateTimes in UTC format. You must format them for humans or other systems.

- **formatDateTime:**
  \`formatDateTime(triggerOutputs()?['body/createdon'], 'MM/dd/yyyy')\` -> \`10/31/2023\`
- **addDays / addHours:**
  \`addDays(utcNow(), 30)\` *(Calculates a date 30 days from today, useful for setting Invoice Due Dates).*
- **convertFromUtc:**
  \`convertFromUtc(utcNow(), 'Eastern Standard Time')\` *(Converts the server time to a specific local timezone).*

## 3. Math and Logic

- **add, sub, mul, div:**
  \`mul(variables('Price'), 1.2)\` *(Multiplies by 1.2 to add 20% tax).*
- **if:** (Excel style if/then/else)
  \`if(equals(variables('Status'), 'Active'), 'Proceed', 'Stop')\`

## 4. Handling Nulls (The Coalesce Function)

If you attempt to write \`concat('Name: ', triggerOutputs()?['body/firstname'])\` and the firstname is completely null, the flow might throw an error or format badly.

The most important function for a Dataverse developer is **coalesce**. It checks a series of variables and returns the first one that isn't null. If all are null, it returns a default value.

\`coalesce(triggerOutputs()?['body/firstname'], 'Valued Customer')\`
*If they have a first name, use it. Otherwise, output "Valued Customer".*

## 5. Navigating JSON (The ? Operator)

When you pull Dynamic Content from the visual editor, Power Automate generates an expression behind the scenes that looks like this:
\`triggerOutputs()?['body/accountnumber']\`

What is the \`?\` for?
It is the **Safe Navigation Operator**. If the \`body\` object doesn't exist, the expression gracefully returns \`null\` instead of crashing the entire flow with a "Property cannot be evaluated" error. 
Always ensure the \`?\` is present when traversing deep JSON objects returned by HTTP actions.

## Advanced Tip: Compose Action

When you are building a complex nested expression (e.g., adding days to a date, formatting it, and converting the timezone all in one line), it is very difficult to debug if it fails.

Use the **Compose** action. Put your raw expression inside a Compose step just before you need it. When the flow runs, you can click on the Compose step in the Run History to see exactly what string the expression evaluated to, making debugging infinitely easier.

## Things to Remember

- Switch to the **Expression** tab to write formulas.
- Use **formatDateTime** to solve Dataverse UTC timezone issues.
- Use **coalesce** to safely handle empty Dataverse fields.
- Use the **Compose** action to debug complex formulas.

## What's Next

Even with perfect expressions, sometimes external systems fail or data is fundamentally corrupt. Next, we will cover how to gracefully catch and handle these crashes using **Error Handling**.
  `.trim(),
};
