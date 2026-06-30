import { DocContent } from "@/types/docs";

export const quoteInvoiceGeneration: DocContent = {
  title: "Quote and Invoice Generation",
  description:
    "Design an automated document generation pipeline to create pixel-perfect PDF Quotes and Invoices from Dataverse records.",
  content: `
## The Business Requirement

"When a salesperson clicks 'Generate Quote', the system must take the Dataverse Quote record, loop through all the related Quote Line Items, calculate the total tax, generate a pixel-perfect PDF with our corporate logo, save the PDF to SharePoint, and email it to the primary contact."

## The Naive Approach

A beginner might try to use SSRS (SQL Server Reporting Services) to build a report, and then write a 500-line C# Plugin to execute the report, capture the byte array, convert it to PDF, attach it to an Email record, and send it.
- **Why it fails:** SSRS is notoriously difficult to style pixel-perfectly. Writing C# to handle byte arrays and SharePoint authentication is prone to failure and extremely difficult to maintain when the marketing team wants to change the logo next month.

## The Enterprise Architecture

### 1. The Word Template (Design)
The architect utilizes native **Dynamics 365 Word Templates**. 
A business analyst opens Microsoft Word, connects it to Dataverse, and builds a beautiful template. They map the XML tags (e.g., \`<<Quote.TotalAmount>>\`) directly into the document and use a repeating table row for the \`Quote_Line_Items\` 1:N relationship. 

### 2. The Custom API (The Trigger)
The architect creates a **Custom API** in Dataverse called \`cont_GenerateQuoteDocument\`. 
This exposes an endpoint that can be triggered by a Custom Command (Ribbon Button) in the Model-Driven app.

### 3. Power Automate (The Engine)
Instead of writing C#, the architect uses Power Automate.
1. **Trigger:** "When an action is performed" (binds to the \`cont_GenerateQuoteDocument\` Custom API).
2. **Action 1 (Populate):** Use the premium "Populate a Microsoft Word template" connector. It takes the Word Template from Dataverse and injects the live Quote data into it.
3. **Action 2 (Convert):** Pass the generated Word document into the "Convert Word Document to PDF" action (often using OneDrive or a 3rd-party connector like Encodian or Muhimbi for enterprise features).
4. **Action 3 (Save):** Save the resulting PDF directly into the SharePoint folder associated with the Account using the native SharePoint connector.
5. **Action 4 (Email):** Send the PDF as an attachment via the Office 365 Outlook connector.

## Handling Tax Calculations

If the business requirement mentioned "calculate total tax," the architect knows this must happen *before* the document is generated.
- A **Pre-Operation Plugin** is registered on the Quote to execute the complex math, ensuring the database is perfectly updated the millisecond before Power Automate reads the data for the document.

## Things to Remember

- Never write C# to generate PDFs or send emails.
- Use **Word Templates** so business users can maintain the design.
- Use **Custom APIs** to connect UI ribbon buttons to Power Automate.
- Use **Power Automate** to orchestrate the populate, convert, save, and send steps.
  `.trim(),
};
