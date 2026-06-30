import { DocContent } from "@/types/docs";

export const queryOptimization: DocContent = {
  title: "Query Optimization (OData & Web API)",
  description:
    "Learn how to architect optimized REST API queries by eliminating N+1 problems, utilizing $expand for server-side SQL joins, and bypassing full table scans.",
  content: `
## Introduction

When building external web applications (like a React portal or Node.js backend) that communicate with the Dataverse Web API via OData, developers often fall into common architectural traps that crush SQL performance and trigger severe API throttling.

## 1. The N+1 Query Problem (Architectural Failure)

This is the most common performance killer in modern decoupled web applications querying Dataverse.

**The Scenario:**
You need to render a data grid of 50 Accounts, and adjacent to each Account, you need to display the Primary Contact's email address.

**The Bad Approach (N+1):**
1. The developer executes 1 query to retrieve the 50 Accounts.
2. The developer writes a \\\`for\\\` loop in JavaScript.
3. For *each* of the 50 accounts, they execute a separate API request to fetch the related Primary Contact payload.
*Total HTTP API calls: 1 + 50 = 51 sequential calls.* 

If multiple users execute this React component simultaneously, Dataverse will rapidly throttle the application with HTTP 429 errors to protect the server.

**The Architectural Solution ($expand):**
Utilize OData's \\\`$expand\\\` parameter to force the Dataverse platform to execute a SQL JOIN on the server side, returning all relational data in a single JSON payload.

\`\`\`http
GET /api/data/v9.2/accounts?$select=name&$expand=primarycontactid($select=emailaddress1)
\`\`\`
*Total HTTP API calls: 1 call.*

## 2. Using $select (Mandatory)

As highlighted throughout this documentation, never execute an OData endpoint without a strict \\\`$select\\\` parameter. 
Dataverse tables can contain hundreds of schema columns. Returning 50 records with 300 columns each results in a massive, bloated JSON payload. The Dataverse IIS server burns CPU cycles serializing it, the network struggles to transmit it, and the client browser wastes RAM parsing it.

## 3. Avoid Leading Wildcards (Index Bypassing)

When executing an OData filter like \\\`$filter=contains(name, 'Contoso')\\\`, Dataverse translates this directly to \\\`LIKE '%Contoso%'\\\` in T-SQL.

Because there is a wildcard \\\`%\\\` at the *beginning* of the string, the SQL Server engine **cannot utilize a B-Tree Index**. It is forced to execute a Full Table Scan, reading every single physical row in the database table to verify if the word "Contoso" exists anywhere inside the string.

If functionally possible, always architect searches using \\\`startswith\\\`:
\`\`\`http
$filter=startswith(name, 'Contoso')
\`\`\`
This translates to \\\`LIKE 'Contoso%'\\\`. Because there is no leading wildcard, the SQL Server engine can instantly seek to the 'C' section of the B-Tree Index, executing the query exponentially faster.

## 4. Querying by GUID (Primary Key)

If you know the exact GUID (Primary Key) of the record you require, never utilize the \\\`$filter\\\` syntax.

**Bad (Forces an Index Seek):**
\`\`\`http
GET /api/data/v9.2/accounts?$filter=accountid eq 00000000-0000-0000-0000-000000000001
\`\`\`

**Good (Direct Primary Key Cluster Lookup):**
\`\`\`http
GET /api/data/v9.2/accounts(00000000-0000-0000-0000-000000000001)
\`\`\`

## Things to Remember

- Eradicate the **N+1 problem** by strictly utilizing **\\\`$expand\\\`** for relational data.
- Always append **\\\`$select\\\`** to minimize JSON payload size and serialization overhead.
- Avoid **leading wildcards (\\\`contains\\\`)** to ensure SQL can utilize B-Tree Indexes.
- Retrieve individual records directly by **GUID** rather than utilizing filter syntax.

## What's Next

Congratulations! You have completed the **Nexora Learn** Dynamics 365 Architecture documentation suite. You are now equipped with the architectural principles, patterns, and strict enterprise standards required to build, deploy, and scale production-grade solutions on the Microsoft Power Platform.
  `.trim(),
};
