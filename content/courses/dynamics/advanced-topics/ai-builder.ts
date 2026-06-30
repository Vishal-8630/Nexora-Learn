import { DocContent } from "@/types/docs";

export const aiBuilder: DocContent = {
  title: "AI Builder",
  description:
    "Discover how AI Builder empowers citizen developers to integrate prebuilt and custom machine learning models, intelligent document processing, and predictive AI directly into Power Apps and Power Automate flows, without writing code.",
  content: `
## Introduction

In the Microsoft Power Platform ecosystem, while **Copilot Studio** excels at building conversational AI experiences (chatbots), **AI Builder** serves a distinct and powerful purpose: democratizing the integration of advanced machine learning and cognitive services into everyday business processes.

It enables both citizen developers and professional developers to leverage sophisticated AI capabilities—such as computer vision, natural language processing, and predictive analytics—directly within their Power Apps and Power Automate solutions. This means you can infuse your applications and workflows with intelligence without needing deep data science expertise or writing complex Python code.

## What is AI Builder?

AI Builder is a low-code/no-code capability within the Power Platform that allows you to add artificial intelligence to your business applications and processes. It provides a set of prebuilt and custom AI models designed to solve common business problems, making advanced AI accessible to a broader audience.

**Key Problems AI Builder Solves:**
*   **Automating Data Extraction:** Eliminating manual data entry from documents like invoices, receipts, or custom forms.
*   **Enhancing Business Decisions:** Predicting outcomes (e.g., sales opportunities, customer churn) to guide strategic actions.
*   **Improving Customer Service:** Analyzing sentiment from customer feedback to prioritize responses or identify trends.
*   **Streamlining Operations:** Classifying text or images to automate routing, categorization, or quality control.

## Prebuilt vs. Custom Models

AI Builder offers two primary categories of models, catering to different business needs.

### 1. Prebuilt Models

These models are developed, trained, and maintained by Microsoft, leveraging vast datasets and Azure Cognitive Services. They are ready to use instantly for common business scenarios, requiring no training data from you.

*   **Invoice Processing:** Automatically extracts key information like total amount, vendor name, invoice ID, and line items from standard invoice PDFs or images. Ideal for automating accounts payable workflows.
*   **Receipt Processing:** Extracts merchant name, total amount, and transaction date from photos of receipts. Perfect for expense reporting applications.
*   **Sentiment Analysis:** Analyzes text (e.g., emails, social media posts, customer reviews) to determine the emotional tone, classifying it as positive, negative, or neutral. Useful for customer service and feedback analysis.
*   **Identity Document Reader:** Extracts structured data (e.g., name, date of birth, document number) from government-issued identity documents like driver's licenses and passports.
*   **Text Recognition (OCR):** Extracts text from images and PDF documents, making scanned content searchable and editable.
*   **Language Detection:** Identifies the language of a given text.

### 2. Custom Models

When your business has unique data or highly specific requirements that prebuilt models cannot address, you can train your own custom AI Builder models. This involves providing your own data, labeling it, and allowing AI Builder to learn from it.

*   **Document Processing (Custom):** Train a model to extract specific data fields from your proprietary documents (e.g., custom purchase orders, shipping manifests, insurance claims). You upload examples of your documents, draw boxes around the data you want to extract (e.g., "Tracking Number," "Weight"), and AI Builder learns the layout and content.
    *   **How Custom Document Processing Works (Simplified):**
        1.  **Upload Sample Documents:** Provide at least 5-10 examples of your document type.
        2.  **Tag Fields:** For each document, manually highlight and label the specific fields you want to extract (e.g., "Customer Name," "Order ID").
        3.  **Train Model:** AI Builder uses your tagged examples to learn the patterns and locations of these fields.
        4.  **Publish & Use:** Once trained, the model can automatically extract data from new, similar documents.
*   **Prediction:** Build models to predict future outcomes based on historical data. For example, you can point AI Builder at your Dataverse "Opportunity" table, and it can analyze past "Won" and "Lost" opportunities to predict the probability that a current active opportunity will be won. This helps sales teams prioritize efforts.
*   **Object Detection:** Train a model to identify and count specific objects within images (e.g., identifying defects on a production line, counting inventory items).
*   **Text Classification:** Categorize text into custom categories (e.g., classifying customer support tickets into "Technical Issue," "Billing Inquiry," "Feature Request").

## How AI Builder Works: The Lifecycle

Regardless of whether you use a prebuilt or custom model, the general lifecycle involves:

1.  **Model Selection/Creation:**
    *   **Prebuilt:** Choose an existing model (e.g., Invoice Processing).
    *   **Custom:** Define your model type (e.g., Document Processing), upload and label your data, then train the model.
2.  **Model Training (Custom Only):** AI Builder's automated machine learning capabilities analyze your labeled data to build and optimize the model.
3.  **Model Publishing:** Once trained and evaluated, the model is published, making it available for consumption.
4.  **Model Consumption:** Integrate the published model into your Power Apps or Power Automate solutions.

## Integration Points

Once an AI Builder model is ready, you consume its capabilities primarily through the following Power Platform components:

1.  **Power Automate:** This is the most common integration point, allowing you to automate processes that leverage AI.
    *   **Example Scenario:** Automating Invoice Processing
        *   **Trigger:** "When a new email arrives with a PDF attachment."
        *   **Action (AI Builder):** "Pass the PDF attachment to the AI Builder Invoice Processing model."
        *   **Action (Dataverse):** "Extract the Total Amount, Vendor Name, and Line Items from the AI Builder output, then create a new Invoice record in Dataverse, populating the relevant fields."
        *   **Action (Notification):** "Send a Teams notification to the accounting department with a link to the new invoice record."
2.  **Power Apps (Canvas Apps & Model-driven Apps):** You can embed AI Builder controls directly into your applications to provide real-time AI capabilities to users.
    *   **Example Scenario:** Field Service Equipment Identification
        *   A field worker opens a Canvas app on their mobile device.
        *   They use an **AI Builder Object Detector control** to point their phone camera at a piece of heavy machinery.
        *   The AI model instantly identifies the equipment type and serial number.
        *   The app then uses this information to pull up the related maintenance history and operational data from Dataverse, displaying it to the worker.
    *   **Example Scenario:** Document Scanning in a Model-driven App
        *   A user uploads a scanned document to a record in a Model-driven App.
        *   A Power Automate flow, triggered by the document upload, uses an AI Builder Document Processing model to extract key data.
        *   The extracted data is then used to automatically populate fields on the Model-driven App form, reducing manual data entry.

## Decision Making: When to Use AI Builder

Consider AI Builder when:
*   You need to add AI capabilities to Power Apps or Power Automate solutions.
*   You prefer a low-code/no-code approach to AI integration.
*   Your use case aligns with available prebuilt models (e.g., document processing, sentiment analysis).
*   You have sufficient, high-quality data to train a custom model for specific needs (e.g., proprietary document layouts, unique prediction scenarios).
*   You want to quickly prototype and deploy AI-powered solutions.
*   The cost model (AI Credits) aligns with your expected transaction volume and budget.

## Decision Making: When to Consider Alternatives

While powerful, AI Builder might not always be the optimal choice. Consider alternatives or a hybrid approach when:
*   **Extreme Customization/Control is Needed:** For highly experimental, research-grade AI, or when you need granular control over model architecture, training algorithms, and deployment infrastructure.
    *   **Alternative:** **Azure Machine Learning (Azure ML)** provides a comprehensive platform for data scientists and ML engineers to build, train, and deploy custom models with full control.
*   **Direct API Integration is Preferred:** If you're a pro-developer building a custom application outside of the Power Platform and want to integrate specific cognitive services without the Power Platform wrapper.
    *   **Alternative:** Directly consume **Azure Cognitive Services APIs** (e.g., Computer Vision, Text Analytics, Language Service) or **Azure OpenAI Service**. This offers more flexibility but requires coding expertise.
*   **Very High Volume, Real-time, Low-Latency Inference:** For scenarios requiring extremely high throughput or sub-millisecond response times that might exceed AI Builder's typical performance characteristics or credit consumption limits.
    *   **Alternative:** Optimized deployments in **Azure ML** or custom-built microservices.
*   **Complex Data Preprocessing/Feature Engineering:** If your data requires extensive, complex transformations before it can be used for training, which might be cumbersome to achieve purely within Power Automate or Dataverse.
    *   **Alternative:** Data pipelines built with **Azure Data Factory** or **Azure Synapse Analytics** feeding into Azure ML.

## Licensing and Performance Considerations

AI Builder is licensed based on **"AI Credits."** These credits are consumed each time an AI Builder model is used (e.g., processing a document, analyzing sentiment, making a prediction).

*   **Credit Consumption:** Different models consume credits at different rates. For example, processing a page of a document might consume more credits than a single sentiment analysis call.
*   **Capacity Management:** Enterprise architects and solution owners must carefully estimate the expected volume of AI transactions to ensure sufficient AI credits are provisioned for the tenant. Running out of credits can lead to service interruptions.
*   **Monitoring:** Regularly monitor AI credit consumption through the Power Platform admin center to anticipate needs and avoid unexpected overages or service degradation.
*   **Performance:** While AI Builder is designed for efficiency, processing large documents or high volumes of requests can take time. Design your Power Automate flows with appropriate timeouts and asynchronous patterns for optimal performance. Consider batch processing for large datasets where immediate real-time results aren't critical.

## Best Practices

To maximize the effectiveness and maintainability of your AI Builder solutions:

*   **Data Quality is Paramount (Custom Models):** Ensure your training data is clean, accurate, representative, and sufficiently diverse. "Garbage in, garbage out" applies strongly to AI.
*   **Sufficient Training Data (Custom Models):** Provide enough examples for your custom models to learn effectively. Microsoft provides minimums (e.g., 5 documents per field for Document Processing), but more is often better.
*   **Consistent Labeling (Custom Models):** When tagging data for custom models, ensure consistency in how you define and label fields across all your sample documents.
*   **Robust Error Handling:** Implement comprehensive error handling in your Power Automate flows that consume AI Builder models. Account for scenarios where the model might fail to extract data, return low confidence scores, or encounter service errors.
*   **Monitor AI Credit Usage:** Regularly review your AI credit consumption in the Power Platform admin center to manage costs and ensure service continuity.
*   **Model Lifecycle Management:** For custom models, plan for periodic retraining with new data to maintain accuracy as business processes or data patterns evolve. Consider versioning your models.
*   **Start Small, Iterate, and Scale:** Begin with a pilot project to validate the AI Builder model's effectiveness before rolling it out to a wider audience or critical business processes.
*   **Security and Compliance:** Ensure that the data you use for training and inference complies with all relevant data privacy regulations and organizational security policies.

## Common Mistakes

Avoid these pitfalls when working with AI Builder:

*   **Underestimating Training Data Needs:** Believing a custom model can be trained effectively with only a handful of examples, leading to poor accuracy and unreliable results.
*   **Ignoring Confidence Scores:** Not checking the confidence score returned by AI Builder models. Low confidence indicates potential inaccuracies and should trigger human review or alternative processing.
*   **Not Handling Failures Gracefully:** Building flows that assume AI Builder will always succeed, leading to broken processes when the model encounters an issue or fails to extract data.
*   **Over-reliance on AI:** Expecting AI Builder to be 100% accurate. AI is a tool to assist, not replace, human judgment, especially for critical data.
*   **Neglecting Credit Monitoring:** Failing to track AI credit consumption, which can lead to unexpected costs or the tenant running out of credits, causing service interruptions.
*   **Using AI Builder for Simple Logic:** Applying AI Builder to problems that can be solved more simply and cost-effectively with standard Power Automate actions, conditional logic, or regular expressions.

## Things to Remember

*   **AI Builder** brings powerful Azure AI capabilities (Computer Vision, NLP, Predictive ML) to the Power Platform.
*   It empowers **citizen developers** to integrate AI without code.
*   Choose **Prebuilt Models** for common tasks (invoice, receipt, sentiment) and **Custom Models** for unique business data (proprietary documents, specific predictions).
*   Integrate models primarily via **Power Automate** for automation and **Power Apps** for real-time user experiences.
*   Licensing is based on **AI Credits**; monitor usage carefully.
*   **Data quality, error handling, and credit management** are crucial for successful implementations.

## Related Topics

*   **Power Automate:** Learn how to build automated workflows that integrate AI Builder.
*   **Power Apps (Canvas and Model-driven):** Discover how to embed AI capabilities directly into your business applications.
*   **Dataverse:** Understand the central data platform that often stores data for AI Builder models and their outputs.
*   **Copilot Studio:** Explore how to build conversational AI experiences and chatbots, complementing AI Builder's capabilities.
*   **Azure Cognitive Services:** Dive deeper into the underlying AI services that power many of AI Builder's features for professional developers.
*   **Microsoft Learn AI Builder Documentation:** Official Microsoft documentation for in-depth technical details and tutorials.
  `.trim(),
};