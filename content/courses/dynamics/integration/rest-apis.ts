import { DocContent } from "@/types/docs";

export const restApis: DocContent = {
  title: "REST APIs (The Web API)",
  description:
    "Learn how to use the Dataverse Web API to perform standard HTTP CRUD operations using JSON payloads from any programming language.",
  content: `
## Introduction

The **Dataverse Web API** is a modern, standard RESTful endpoint that allows you to interact with your database using universal HTTP methods (GET, POST, PATCH, DELETE) and lightweight JSON payloads.

It is built on top of the **OData v4** protocol, meaning it supports complex query strings appended directly to the URL for filtering, sorting, and pagination.

## The Endpoint

Every Dataverse environment has a unique Web API endpoint. 
It follows this format:
\\\`https://[organization_URI]/api/data/v[version]/\\\`

For example:
\\\`https://contoso.crm.dynamics.com/api/data/v9.2/\\\`

To interact with this API securely, you must always include an OAuth 2.0 Access Token (Bearer Token) in the \\\`Authorization\\\` header, typically obtained via a Service Principal (App Registration) in Entra ID.

## HTTP Methods (CRUD)

### 1. Create (POST)
To create a new record, send an HTTP \\\`POST\\\` request to the plural name (EntitySetName) of the table.

**Request:**
\`\`\`http
POST https://contoso.crm.dynamics.com/api/data/v9.2/accounts HTTP/1.1
Content-Type: application/json
Authorization: Bearer [TOKEN]

{
    "name": "Sample Account",
    "creditonhold": false,
    "description": "This is the description of the sample account",
    "revenue": 5000000
}
\`\`\`

**Response:**
Dataverse returns a \\\`204 No Content\\\` status code upon success. The GUID of the newly created record is returned in the \\\`OData-EntityId\\\` response header.

### 2. Read (GET)
To retrieve a specific record by its primary key, append the GUID of the record in parentheses.

**Request:**
\`\`\`http
GET https://contoso.crm.dynamics.com/api/data/v9.2/accounts(00000000-0000-0000-0000-000000000001)?$select=name,revenue HTTP/1.1
Authorization: Bearer [TOKEN]
\`\`\`

*Note the \\\`$select\\\` parameter. We cover the vital importance of OData filtering in the OData section.*

### 3. Update (PATCH)
To update an existing record, you must use \\\`PATCH\\\`, not \\\`PUT\\\`. 
A \\\`PATCH\\\` request performs a partial update: it only updates the specific columns you provide in the JSON payload and leaves all other columns in the database untouched.

**Request:**
\`\`\`http
PATCH https://contoso.crm.dynamics.com/api/data/v9.2/accounts(00000000-0000-0000-0000-000000000001) HTTP/1.1
Content-Type: application/json
Authorization: Bearer [TOKEN]

{
    "revenue": 6000000
}
\`\`\`

### 4. Delete (DELETE)
To hard-delete a record, send a \\\`DELETE\\\` request to the record's URL.

**Request:**
\`\`\`http
DELETE https://contoso.crm.dynamics.com/api/data/v9.2/accounts(00000000-0000-0000-0000-000000000001) HTTP/1.1
Authorization: Bearer [TOKEN]
\`\`\`

## Handling Lookup Columns (The @odata.bind Gotcha)

When you are creating or updating a record, how do you set a Lookup column (e.g., setting the \\\`Primary Contact\\\` on an Account)?

> [!CAUTION]
> **You cannot pass a raw GUID string.** 
> If you pass \\\`"primarycontactid": "1111-2222"\\\`, the API will throw an error. You must use the **OData Bind** syntax. You are essentially telling the Web API: *"Bind this lookup column to this specific record at this specific API URL."*

**Example (Setting a Primary Contact):**
\`\`\`json
{
    "name": "Sample Account",
    "primarycontactid@odata.bind": "/contacts(11111111-1111-1111-1111-111111111111)"
}
\`\`\`

If you forget to append \\\`@odata.bind\\\` to the schema column name, or if you forget the leading slash \\\`/\\\` before the plural table name inside the string, the Web API will throw a \\\`400 Bad Request\\\` error.

## Things to Remember

- The Web API is **RESTful, uses JSON**, and is universally compatible with modern languages.
- Use **POST** for Create, **PATCH** for Update, **DELETE** for Delete.
- The URL always requires the **plural name** of the table (EntitySetName).
- Set Lookup columns using the strict **\\\`@odata.bind\\\`** URL syntax.

## What's Next

Now that we understand how to write and update records via the Web API, we need to understand how to query and filter them. Next, we cover the underlying querying engine: the **OData Protocol**.
  `.trim(),
};
