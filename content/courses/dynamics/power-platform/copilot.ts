import { DocContent } from "@/types/docs";

export const copilot: DocContent = {
  title: "Copilot",
  description:
    "Microsoft Copilot brings next-generation AI to the Power Platform and Dynamics 365, allowing makers to build apps and users to query data using natural language.",
  content: `
## Introduction

Artificial Intelligence is fundamentally changing how software is built and used. In the Microsoft ecosystem, this AI capability is branded as **Copilot**. 

For Dynamics 365 and the Power Platform, Copilot acts as an intelligent assistant for both the developers building the solutions (makers) and the end-users interacting with the data.

## What is it?

**Copilot** in the Power Platform and Dynamics 365 is an integrated, generative AI assistant powered by large language models (LLMs) from OpenAI.

It exists in two main contexts:
1. **Copilot for Makers:** AI that helps you build Power Apps, write Power Automate flows, and generate Power Fx formulas using natural language.
2. **Copilot for Users:** AI embedded inside Dynamics 365 apps that helps sales reps, customer service agents, and other users summarize records, draft emails, and query Dataverse data.

## Why do we need it?

Building complex applications and workflows traditionally required deep technical knowledge, memorizing syntax, and reading extensive documentation.

Copilot accelerates development:
- Instead of writing a complex OData filter query, you can type: *"Filter this gallery to only show active accounts in Seattle."*
- Instead of manually building a 10-step approval flow, you can type: *"Create a flow that sends an approval to my manager when a high-value opportunity is won."*

For end-users, Copilot reduces administrative overhead. A customer service agent can ask Copilot to *"Summarize this 50-email case thread,"* saving them 15 minutes of reading.

## Where is it used?

Copilot is integrated natively across the platform:

- **Power Apps Studio:** Describe the app you want to build, and Copilot will generate the Dataverse table schema and a starting Canvas App.
- **Power Automate:** Describe the process, and Copilot will assemble the trigger and actions.
- **Power Pages:** Ask Copilot to generate a web form, write Liquid code, or draft webpage text.
- **Dynamics 365 Sales / Customer Service:** A side-panel assistant that can draft email replies, summarize meetings, and prepare users for upcoming appointments.
- **Microsoft Copilot Studio:** A dedicated tool (formerly Power Virtual Agents) for building your own custom conversational AI bots connected to your business data.

## How does it work?

Under the hood, Copilot uses the **Azure OpenAI Service**.

When you type a prompt (e.g., "Summarize this Account"):
1. The prompt is sent to Azure OpenAI.
2. The context (the specific Dataverse record you are looking at) is securely passed along.
3. The LLM processes the data and generates a response.
4. The response is displayed back in the UI.

Microsoft ensures that **your tenant's data is never used to train the public foundation models**. The data boundary remains strictly within your organization's Azure environment.

## Example

Imagine a developer needs to build an app for tracking employee hardware requests.

**Without Copilot:**
1. Open Dataverse, manually create a \`Hardware Request\` table.
2. Manually add columns for \`Item\`, \`Price\`, \`Requested By\`, \`Status\`.
3. Open Power Apps, insert a Gallery, connect it to the table.
4. Write a Power Fx formula: \`Filter('Hardware Requests', Status = 'Active')\`.

**With Copilot:**
1. Open Power Apps and type: *"Create an app to track employee hardware requests including item name, price, and status."*
2. Copilot automatically provisions the Dataverse table with the correct columns, fills it with sample data, and generates a fully functioning Canvas app with the gallery already filtered. 
3. The developer just reviews and publishes.

## Best Practices

- **Verify AI output:** Copilot is an assistant, not an autopilot. Always review the Power Fx formulas, flow logic, and drafted emails it generates before saving or sending.
- **Provide context:** When prompting Copilot to build an app, be specific about the data you need (e.g., *"Create an app to track inventory with columns for SKU, Quantity, and Warehouse Location"*).
- **Use Copilot Studio for custom bots:** If you want to build a chatbot for your customers that answers questions based on your company's PDFs or SharePoint sites, use Microsoft Copilot Studio.

## Common Mistakes

> [!WARNING]
> **Assuming Copilot understands your custom business logic natively.** Copilot generates standard solutions based on common patterns. If you have a highly unique, custom-coded plugin architecture, Copilot cannot automatically refactor or understand it without explicit context.

## Things to Remember

- Copilot brings generative AI to the platform via Azure OpenAI.
- It accelerates development for makers (generating apps, flows, and code).
- It boosts productivity for users (summarizing data, drafting emails).
- Your enterprise data is secure and is not used to train public models.

## Related Topics

- [Power Apps](/docs/power-platform/power-apps) — where Copilot can generate UI and logic
- [Power Automate](/docs/power-platform/power-automate) — where Copilot can generate workflows
- [Dataverse](/docs/power-platform/dataverse) — the data that Copilot queries and summarizes

## What's Next

Copilot leverages AI for development and daily tasks. Next, we will look at **AI Builder**, which allows you to build custom AI models (like receipt processing or sentiment analysis) directly into your apps and flows.
  `.trim(),
};
