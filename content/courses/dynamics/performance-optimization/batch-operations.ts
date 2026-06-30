import { DocContent } from "@/types/docs";

export const batchOperations: DocContent = {
  title: "Batch Operations",
  description:
    "Learn how to aggregate multiple API requests into a single Batch payload to bypass HTTP throttling limits and drastically improve network efficiency.",
  content: `
## Introduction

A common enterprise scenario is bulk data migration or synchronization. Imagine a nightly Azure Function that needs to insert 5,000 Invoices from an external ERP system into Dataverse.

If your script loops 5,000 times and synchronously sends 5,000 individual HTTP POST requests, you incur massive architectural penalties:
- **Network Latency:** The script waits for the HTTP request to travel to the Azure data center, process through the IIS web server, execute in SQL, and return 5,000 separate times.
- **API Throttling:** Dataverse heavily tracks API calls per user per minute. Hitting the Web API 5,000 times concurrently will violently trigger HTTP 429 (Too Many Requests) throttling errors, crashing your integration.

The architectural solution is to aggregate the requests using **Batch Operations**.

## 1. Web API (OData $batch)

The Dataverse REST endpoint natively supports the OData \\\`$batch\\\` standard. 

Instead of opening 1,000 individual HTTP connections, you construct a single, massive HTTP POST request directed at \\\`/api/data/v9.2/$batch\\\`. 
Inside the body of this request, you package all 1,000 individual Create commands using strict MIME multipart formatting.

When Dataverse receives the \\\`$batch\\\` payload, the IIS web server unpacks the 1,000 commands and routes them to the SQL database internally. 
- *Architectural Benefit:* You only incur the TCP/IP network latency of a single HTTP request, drastically reducing execution time.

## 2. Organization Service (ExecuteMultipleRequest)

If you are constructing a C# migration script utilizing the Dataverse SDK, you utilize the \\\`ExecuteMultipleRequest\\\` class.

\`\`\`csharp
var multipleRequest = new ExecuteMultipleRequest()
{
    Settings = new ExecuteMultipleSettings()
    {
        ContinueOnError = true,
        ReturnResponses = true
    },
    Requests = new OrganizationRequestCollection()
};

// Loop and aggregate 1,000 Create requests locally
for(int i = 0; i < 1000; i++)
{
    Entity invoice = new Entity("invoice");
    invoice["name"] = "Invoice " + i;
    
    CreateRequest create = new CreateRequest { Target = invoice };
    multipleRequest.Requests.Add(create);
}

// Send all 1,000 in a single network transmission
ExecuteMultipleResponse response = (ExecuteMultipleResponse)service.Execute(multipleRequest);
\`\`\`

### The Limitations of ExecuteMultiple
Microsoft enforces strict architectural limits on Batch processing to prevent a single integration from hogging the shared SQL CPU.
1. **Max Requests per Batch:** You cannot package more than **1,000** requests into a single \\\`ExecuteMultipleRequest\\\`.
2. **Max Concurrent Batches:** You cannot have more than **2** \\\`ExecuteMultipleRequests\\\` executing simultaneously per organization. If you attempt to run 10 multi-threaded batch jobs concurrently, Dataverse will intentionally block 8 of them until the first 2 finish.

## 3. BulkOperation / CreateMultiple (The Future)

While \\\`ExecuteMultipleRequest\\\` saves network latency, it still structurally executes as 1,000 distinct SQL INSERT statements on the database side, executing plugins for every single row.

Microsoft recently introduced the **\\\`CreateMultipleRequest\\\`** and **\\\`UpdateMultipleRequest\\\`** pipeline. 
Instead of sending 1,000 individual Create commands, you send a single command containing an array of 1,000 entities. Dataverse translates this into a highly optimized SQL Bulk Insert operation, bypassing individual row-level plugins, which is exponentially faster on the database side.

*(Note: As of writing, the \\\`CreateMultiple\\\` pipeline is still maturing and may not support all out-of-the-box Microsoft tables).*

## Things to Remember

- Never execute **thousands of individual API calls** in a synchronous loop.
- Utilize **OData \\\`$batch\\\`** for REST or **\\\`ExecuteMultipleRequest\\\`** for C#.
- Batches are strictly limited to **1,000 requests per payload**.
- Only **2 concurrent batches** are permitted per environment.

## What's Next

Batch operations are mandatory for external integrations. But what if the integration relies on pulling data out of Dataverse? You must ensure your queries are highly optimized. Next, we look at **Query Optimization**.
  `.trim(),
};
