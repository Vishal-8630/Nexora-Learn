import { DocContent } from "@/types/docs";

export const fetchxmlOptimization: DocContent = {
  title: "FetchXML Optimization",
  description:
    "Master the techniques to write highly performant FetchXML queries by strictly minimizing SQL joins, enforcing late materialization, and utilizing no-lock.",
  content: `
## Introduction

FetchXML is not just a proprietary configuration language; it is translated directly into complex T-SQL statements by the Dataverse platform. A poorly structured FetchXML query will result in a catastrophic SQL Execution Plan, causing slow dashboards, Sandbox timeout errors, and throttled API requests.

## 1. Avoid Select *

Just as strictly enforced in C# plugins, never request all columns in a FetchXML query. If your Power BI report or View only displays 3 columns, you must strictly limit the XML to those 3 columns.

**Bad (Full Row Scan):**
\`\`\`xml
<fetch>
  <entity name="account">
    <all-attributes />
  </entity>
</fetch>
\`\`\`

**Good (Targeted Read):**
\`\`\`xml
<fetch>
  <entity name="account">
    <attribute name="name" />
    <attribute name="revenue" />
  </entity>
</fetch>
\`\`\`

## 2. No-Lock (Read Uncommitted)

In Azure SQL Server, when you query a table, the database places a "Shared Lock" on the retrieved rows to prevent other users from mutating them while you read. If a massive overnight report places a Shared Lock on the Account table, it can fundamentally block sales users from saving their data, causing application-wide freezing.

If you are executing a background report or an integration where you do not require 100% strict transactional consistency, you must use the **\\\`no-lock="true"\\\`** attribute.

\`\`\`xml
<fetch no-lock="true">
  <entity name="account">
    <attribute name="name" />
  </entity>
</fetch>
\`\`\`
This instructs SQL to read the data without requesting locks (Read Uncommitted), massively improving database concurrency.

## 3. Minimize Link-Entities (Joins)

Every time you author a \\\`<link-entity>\\\` tag, Dataverse translates it into a SQL \\\`JOIN\\\`. 
Dataverse tables (like Contact and Account) are already heavily joined in the background by Microsoft's security model (to calculate Principal Object Access for RBAC). Injecting more custom joins makes the query exponentially heavier for the SQL optimizer.

If you do not actually need data from the related table, and you only require its GUID, **do not join**.

**Architectural Scenario:** You need the GUID of the Account's Primary Contact.
- **Bad:** Joining to the Contact table just to extract the Contact ID.
- **Good:** The Contact ID is already physically stored directly on the Account table in the \\\`primarycontactid\\\` schema column. Query that column directly.

## 4. Outer vs Inner Joins

When you must join, you must pay strict attention to the \\\`link-type\\\`.
- \\\`link-type="inner"\\\`: The SQL engine can highly optimize inner joins using indexing.
- \\\`link-type="outer"\\\`: Outer joins are significantly slower and force broader table scans.

If you know architecturally that every record has a parent (e.g., Every Quote Line MUST logically have a parent Quote), always enforce an **Inner** join. Do not lazily default to Outer joins.

## 5. Late Materialization (Paging Cookies)

If you utilize FetchXML to retrieve 50,000 records via pagination, you must implement a **Paging Cookie**.

When Dataverse returns the first 5,000 records, it injects a Paging Cookie into the response payload. You must pass this cookie back into the next FetchXML request.
The cookie contains internal SQL bookmarks. It instructs the Azure SQL engine exactly where it left off, preventing the engine from having to expensively rescan the first 5,000 rows to find row 5,001.

## Things to Remember

- Never execute **\\\`<all-attributes />\\\`**.
- Utilize **\\\`no-lock="true"\\\`** to prevent blocking active users during heavy reads.
- Enforce **Inner joins** instead of Outer joins when data integrity allows.
- Avoid unnecessary **\\\`<link-entity>\\\`** joins if the ID is already physically present on the base table.
- Utilize **Paging Cookies** for all large data extracts.

## What's Next

FetchXML is one method of querying, but optimizing the SQL execution plan often requires structural database changes. Next, let's examine how Dataverse manages **Indexes & Database Tuning**.
  `.trim(),
};
