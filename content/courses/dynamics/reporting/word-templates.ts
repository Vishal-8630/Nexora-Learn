import { DocContent } from "@/types/docs";

export const wordTemplates: DocContent = {
  title: "Word Templates",
  description:
    "Learn how to use Microsoft Word Templates for single-record document generation, such as invoices, quotes, and customer letters.",
  content: `
## Introduction

While SSRS is used for complex, multi-page operational reports, it requires a developer to use Visual Studio and write FetchXML. 

If a business unit simply wants to generate a "Welcome Letter" for a new Contact, or a "Sales Quote" with a standard header and footer, requiring a developer is overkill. 

**Word Templates** provide a no-code mechanism for business analysts to generate highly formatted, single-record documents directly from Dynamics 365 using native Microsoft Word.

## How Word Templates Work

A Word Template uses standard Microsoft Word XML Content Controls. You map these controls to fields in your Dataverse database.

When a user opens a Contact record in Dynamics and clicks "Word Templates -> Welcome Letter", Dataverse takes the standard Word document, injects the Contact's specific First Name and Last Name into the Content Controls, and downloads the finished document.

## Building a Word Template

To build a Word Template, you must use the **Developer Tab** in Microsoft Word.

1. **Download the Schema:**
   - In Dynamics 365, navigate to **Settings -> Templates -> Document Templates**.
   - Click **New**, select **Word Template**, and choose your primary table (e.g., \`Quote\`).
   - You can also select 1:N, N:1, and N:N relationships (e.g., selecting the \`Quote Products\` table so you can print the line items on the quote).
   - Download the file.

2. **Map the Fields in Word:**
   - Open the downloaded file in Microsoft Word.
   - Enable the **Developer** tab in the Word ribbon.
   - Click the **XML Mapping Pane**.
   - In the dropdown, select the \`urn:microsoft-crm/document-template\` schema.
   - You will see a tree view of your Dataverse tables.
   - Type your static text (e.g., "Dear "). Then, right-click the \`firstname\` field in the mapping pane and choose **Insert Content Control -> Plain Text**.

3. **Handling Repeating Rows (1:N):**
   - If you want to print a table of all the Products on the Quote, create a standard Word table with a header row and one empty data row.
   - Highlight the entire empty data row.
   - In the XML Mapping Pane, find the 1:N relationship for Quote Products, right-click it, and select **Insert Content Control -> Repeating**.
   - Now, place the specific product fields (Name, Price) inside the columns of that row. Word will dynamically duplicate the row for every product Dataverse finds.

4. **Upload the Template:**
   - Save the Word document and upload it back to Dataverse as a System Template.

## Automation via Power Automate

Historically, Word Templates could only be generated manually by a user clicking a button, which downloaded a \`.docx\` file. If they wanted to email it, they had to manually attach it.

Today, you can automate this using the **"Microsoft Word Online (Business)"** connector in Power Automate.
You can build a flow that triggers when a Quote is activated. The flow runs the "Populate a Microsoft Word template" action, generates the document in memory, converts it to a PDF using OneDrive, and emails it directly to the customer—zero human interaction required.

## Limitations

> [!WARNING]
> Word Templates are strictly limited to the relationships you select when downloading the schema. You can only go **one level deep**. 
> For example, if you generate a document from the Account, you can list the associated Contacts. But you *cannot* list the Contacts, and then list the Support Tickets associated with each Contact. If you require multi-level, nested repeating tables, you must use **SSRS**.

## Things to Remember

- Word Templates are for **single-record document generation** (Quotes, Letters).
- They are built using the **XML Mapping Pane** in Microsoft Word.
- Use **Repeating Content Controls** to render 1:N related records (like line items).
- They can be automated and converted to PDFs using **Power Automate**.
- They cannot traverse deeper than **one level of relationships**.
  `.trim(),
};
