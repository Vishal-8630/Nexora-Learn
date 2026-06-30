import { DocContent } from "@/types/docs";

export const aiBuilder: DocContent = {
  title: "AI Builder",
  description:
    "AI Builder is a Power Platform capability that allows makers to easily integrate AI models into Power Apps and Power Automate to optimize business processes.",
  content: `
## Introduction

Historically, adding Artificial Intelligence to a business process—such as automatically extracting data from a scanned invoice or predicting if a customer will churn—required a team of data scientists and complex Azure infrastructure.

The Power Platform democratizes this through **AI Builder**.

## What is it?

**AI Builder** is a turnkey capability within the Power Platform that provides AI models designed to optimize business processes. 

It allows makers to easily add intelligence to their Power Apps and Power Automate flows using a point-and-click interface, with no coding or data science experience required.

## Why do we need it?

Businesses are drowning in unstructured data: PDF invoices, customer emails, photos of equipment, and paper forms. 

Manually reading a PDF invoice and typing the vendor name, total amount, and line items into a Dataverse table is slow, expensive, and prone to human error. AI Builder automates these manual cognitive tasks, turning unstructured data (images, text, PDFs) into structured data (database records).

## Types of AI Models

AI Builder offers two categories of models:

### 1. Prebuilt Models
These are ready to use immediately. Microsoft has already trained them on massive datasets.
- **Receipt Processing:** Extracts merchant, date, and total from photos of receipts.
- **Invoice Processing:** Extracts key fields from standard invoices.
- **Business Card Reader:** Extracts name, company, email, and phone from a photo of a business card.
- **Sentiment Analysis:** Analyzes a block of text and determines if it is positive, negative, or neutral.
- **Language Detection & Translation:** Detects the language of a text and translates it.

### 2. Custom Models
These require you to provide your own historical data to train the model to understand your specific business context.
- **Document Processing:** You upload 50 examples of your company's highly unique, custom PDF forms, and teach the AI where to find the specific fields you care about.
- **Object Detection:** You upload photos of your company's products on store shelves, and train the AI to recognize and count them.
- **Prediction:** You connect the AI to a Dataverse table (e.g., historical Opportunities) and train it to predict a future outcome (e.g., "Will this new Opportunity be won or lost?").

## Where is it used?

AI Builder is deeply integrated into the Power Platform:

- **Power Automate:** Used heavily in background automation. For example, a flow triggers when an email arrives with an attachment, runs the attachment through the AI Builder Invoice model, and saves the extracted data to Dataverse.
- **Power Apps:** Used in UI applications. For example, a Canvas App on a mobile phone includes the AI Builder Business Card scanner control. A user snaps a photo, and the app automatically populates the text fields on the screen.

## How does it work?

Under the hood, AI Builder simplifies the powerful **Azure AI Services** (formerly Azure Cognitive Services) and Azure Machine Learning. 

When you use the Document Processing model, AI Builder is orchestrating Azure Form Recognizer behind the scenes. The heavy lifting of provisioning the cloud compute, tuning the machine learning algorithms, and exposing the API is entirely hidden from the maker.

## Example

A logistics company receives hundreds of delivery dockets per day as PDF attachments via email. Currently, clerks open each email and manually type the Docket Number and Delivery Date into Dynamics 365.

**The AI Builder Solution:**
1. A developer creates a **Custom Document Processing** model in AI Builder.
2. They upload 10 sample dockets and draw boxes around the "Docket Number" and "Date" fields to train the model.
3. They create a **Power Automate flow** that triggers when an email arrives at \`dockets@company.com\`.
4. The flow passes the PDF attachment to the AI Builder model.
5. AI Builder returns the structured data (Number and Date).
6. The flow creates a new \`Delivery\` record in Dataverse with the extracted data.

The manual data entry team is no longer needed for this task.

## Best Practices

- **Start with Prebuilt:** Always check if a prebuilt model (like Invoice or Receipt processing) fits your needs before spending time and money training a custom model.
- **Data Quality is everything:** When training a custom prediction or object detection model, the AI is only as good as the data you feed it. Ensure your historical training data is accurate, diverse, and unbiased.
- **Handle low confidence scores:** AI Builder returns a "Confidence Score" (e.g., 95%) with its predictions. In Power Automate, add a condition: if the confidence score is below 80%, route the document to a human for manual review instead of processing it automatically.

## Common Mistakes

> [!WARNING]
> **Ignoring Licensing Costs** — AI Builder is not free. It is licensed via "AI Builder Credits", which are consumed every time a model runs. A common mistake is building a flow that processes thousands of documents a day without calculating the credit consumption, resulting in the tenant running out of credits and the automation failing.

## Things to Remember

- AI Builder adds cognitive capabilities (vision, text analysis, prediction) to the Power Platform.
- **Prebuilt models** are ready instantly; **Custom models** must be trained on your data.
- It is primarily consumed via **Power Automate** (flows) and **Power Apps** (controls).
- It relies on Azure AI Services under the hood.
- Usage consumes AI Builder Credits, which must be managed.

## Related Topics

- [Power Automate](/docs/power-platform/power-automate) — where AI Builder is most frequently used
- [Copilot](/docs/power-platform/copilot) — comparing generative AI vs cognitive AI models
- [Canvas Apps](/docs/introduction/canvas-apps) — where AI Builder UI controls are deployed

## What's Next

We have now explored the individual components of the Power Platform (Apps, Automate, BI, Pages, Dataverse, Copilot, AI Builder). Next, we will tie it all together and look at **How Power Platform Components Work Together** to solve complex enterprise problems.
  `.trim(),
};
