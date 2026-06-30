import { DocContent } from "@/types/docs";

export const fetchxml: DocContent = {
  title: "FetchXML",
  description:
    "Learn how to construct complex FetchXML queries for advanced joins, aggregations, and reporting scenarios within Dataverse.",
  content: `
## Introduction

While OData is the standard for basic REST API queries, Microsoft has its own proprietary querying language specifically built for Dataverse called **FetchXML**.

FetchXML allows you to execute highly complex reporting queries that OData struggles with, such as deep Left Outer joins, complex nested \\\`OR\\\` statements across multiple tables, and advanced aggregate functions (Sum, Count, Average).

Whenever you build a View in the Dynamics 365 UI, Dataverse translates it into FetchXML under the hood.

## Basic Structure

FetchXML is a strict XML-based schema. A basic query to retrieve the Name and Revenue of all Active Accounts looks like this:

\`\`\`xml
<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
  <entity name="account">
    <attribute name="name" />
    <attribute name="revenue" />
    <order attribute="name" descending="false" />
    <filter type="and">
      <condition attribute="statecode" operator="eq" value="0" />
    </filter>
  </entity>
</fetch>
\`\`\`

## Advanced Joins (Link-Entity)

The true architectural power of FetchXML is how it handles SQL Joins using the \\\`<link-entity>\\\` tag.

Imagine you need to find all Accounts that have a Primary Contact who lives in "Seattle".

\`\`\`xml
<fetch>
  <entity name="account">
    <attribute name="name" />
    <!-- Join to Contact -->
    <link-entity name="contact" from="contactid" to="primarycontactid" link-type="inner" alias="c">
      <!-- Filter on Contact -->
      <filter type="and">
        <condition attribute="address1_city" operator="eq" value="Seattle" />
      </filter>
    </link-entity>
  </entity>
</fetch>
\`\`\`
Notice the \\\`link-type="inner"\\\`. This acts as a SQL Inner Join. If the Account does not have a Primary Contact, the Account will be excluded from the results entirely. If you change it to \\\`outer\\\`, the Account will be returned regardless (a Left Outer Join).

## Aggregations (Group By)

FetchXML supports complex SQL aggregations on the server side, returning just the math rather than thousands of records. To calculate the total sum of Estimated Revenue for all open Opportunities, grouped by the Customer:

\`\`\`xml
<fetch aggregate="true">
  <entity name="opportunity">
    <attribute name="estimatedvalue" aggregate="sum" alias="total_revenue" />
    <attribute name="customerid" groupby="true" alias="customer" />
  </entity>
</fetch>
\`\`\`
*Note: When using aggregations, the \\\`aggregate="true"\\\` attribute must be added to the root \\\`<fetch>\\\` node.*

## How to Execute FetchXML

You can execute FetchXML from almost anywhere in the Dynamics ecosystem.

### 1. From the REST Web API
You can pass a URL-encoded FetchXML string directly into the Web API using the \\\`fetchXml\\\` parameter.
\\\`GET /api/data/v9.2/accounts?fetchXml=<url_encoded_xml>\\\`

### 2. From C# Plugins (Organization Service)
You use the \\\`RetrieveMultiple\\\` method combined with a \\\`FetchExpression\\\`.
\`\`\`csharp
string fetchXml = "<fetch>...</fetch>";
EntityCollection results = service.RetrieveMultiple(new FetchExpression(fetchXml));
\`\`\`

### 3. From JavaScript (Client API)
You use \\\`Xrm.WebApi.retrieveMultipleRecords\\\` and pass the FetchXML string.

### 4. From Power Automate
The Dataverse "List Rows" action contains a specific text box where you can paste raw FetchXML.

## Common Mistakes

> [!CAUTION]
> **Writing FetchXML by hand** 
> Writing raw XML by hand is tedious and error-prone. One missing closing tag will crash the query. The global standard for Dynamics 365 developers is to use the **FetchXML Builder** plugin inside the **XrmToolBox**. This tool provides a graphical UI to construct the query, test it live against your Dataverse environment, and instantly convert it into C#, JavaScript, or OData syntax. Never write FetchXML by hand.

## Things to Remember

- FetchXML is a **proprietary XML language** for Dataverse.
- It excels at **complex joins (link-entity)** and **server-side aggregations**.
- You can execute it via the **Web API, C# Plugins, JS, or Power Automate**.
- Always use **FetchXML Builder in XrmToolBox** to generate the syntax.

## What's Next

We've covered how to write code to connect to Dataverse. But what if you want to expose a proprietary 3rd-party API directly to citizen developers using Power Apps and Power Automate, so they don't have to write code? You build a **Custom Connector**.
  `.trim(),
};
