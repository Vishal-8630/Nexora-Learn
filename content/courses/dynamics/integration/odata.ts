import { DocContent } from "@/types/docs";

export const odata: DocContent = {
  title: "OData Query Protocol",
  description:
    "Master the OData v4 query syntax used by the Dataverse Web API to filter, select, expand, and paginate data.",
  content: `
## Introduction

When using the Dataverse REST Web API, you don't write SQL queries. Instead, the Web API relies on the **OData (Open Data Protocol) v4** standard.

OData defines a standardized way to append query parameters directly to the URL to filter, sort, and shape the JSON response.

## Core OData Parameters

### 1. $select (Choosing Columns)
If you send a basic \\\`GET\\\` request to \\\`/api/data/v9.2/accounts\\\`, Dataverse will return every single column for every single account in the database. This creates a massive payload that severely hurts performance.

**Architectural Rule:** You must *always* use \\\`$select\\\` to limit the data returned to only the columns you actually need.

\`\`\`http
GET /api/data/v9.2/accounts?$select=name,revenue,telephone1
\`\`\`

### 2. $filter (Where Clause)
Use \\\`$filter\\\` to define conditions. OData supports logical operators like \\\`eq\\\` (equals), \\\`ne\\\` (not equals), \\\`gt\\\` (greater than), and \\\`lt\\\` (less than).

\`\`\`http
GET /api/data/v9.2/accounts?$select=name&$filter=revenue gt 1000000 and statecode eq 0
\`\`\`
*(Returns Active accounts with revenue > 1M)*

OData also supports advanced string functions:
\`\`\`http
GET /api/data/v9.2/accounts?$select=name&$filter=startswith(name, 'Contoso')
\`\`\`

### 3. $expand (Joins)
In a relational database, you frequently need data from related tables. In OData, you use \\\`$expand\\\` to traverse Lookup relationships (SQL Joins).

If you are querying Accounts and want to see the Name of the Primary Contact (a Many-to-One relationship):
\`\`\`http
GET /api/data/v9.2/accounts?$select=name&$expand=primarycontactid($select=fullname,emailaddress1)
\`\`\`

### 4. $top and $orderby (Sorting and Limits)
To get the top 5 accounts with the highest revenue:

\`\`\`http
GET /api/data/v9.2/accounts?$select=name,revenue&$orderby=revenue desc&$top=5
\`\`\`

## Pagination (Real-World Perspective)

Dataverse will not return 100,000 records in a single API call. By default, it aggressively limits the response to **5,000 records** per page to protect server health.

If your query matches 12,000 records, the first JSON response will contain an array of exactly 5,000 records. At the very bottom of the JSON object, Dataverse will dynamically inject an \\\`@odata.nextLink\\\` property.

\`\`\`json
{
  "value": [
    { "name": "Account 1" },
    { "name": "Account 5000" }
  ],
  "@odata.nextLink": "https://contoso.crm.dynamics.com/api/data/v9.2/accounts?$skiptoken=XYZ123..."
}
\`\`\`

> [!WARNING]
> **Ignoring Pagination** 
> The most common cause of integration failures in production is a developer testing an API call in DEV (with 100 records) and assuming it works, but failing to write a \\\`while\\\` loop to handle the \\\`@odata.nextLink\\\`. When deployed to PROD, the integration quietly drops all data past the 5,000th row. You **must** recursively call the \\\`nextLink\\\` URL until it returns null.

## Formatted Values

When you query Dataverse, Choice (OptionSet) and Lookup columns return raw data integers/GUIDs.
- A Choice column returns the integer: \\\`"industrycode": 1\\\`.
- A Lookup column returns the GUID: \\\`"_primarycontactid_value": "1111-2222"\\\`.

If you want the human-readable text ("Accounting" and "John Doe"), you must include a special HTTP Header in your API request:
\\\`Prefer: odata.include-annotations="OData.Community.Display.V1.FormattedValue"\\\`

Dataverse will then inject extra properties into the JSON response:
\`\`\`json
{
  "industrycode": 1,
  "industrycode@OData.Community.Display.V1.FormattedValue": "Accounting"
}
\`\`\`

## Things to Remember

- OData is the standard query language for the **REST Web API**.
- Always use **\\\`$select\\\`** to prevent pulling massive unneeded payloads.
- Use **\\\`$filter\\\`** for logic and **\\\`$expand\\\`** for SQL-like joins.
- Use the **FormattedValue header** to get human-readable text for OptionSets.
- You must handle **\\\`@odata.nextLink\\\`** pagination for sets larger than 5,000.

## What's Next

OData is great for standard API calls, but it struggles with incredibly complex, multi-layered SQL Outer joins and aggregations. For the most advanced reporting queries, Dynamics uses a proprietary XML standard: **FetchXML**.
  `.trim(),
};
