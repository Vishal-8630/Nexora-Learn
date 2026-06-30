import { DocContent } from "@/types/docs";

export const scheduledFlows: DocContent = {
  title: "Scheduled Flows",
  description:
    "Learn how to use Scheduled Cloud Flows to run batch processes, daily reporting, and routine data cleanup at specific times.",
  content: `
## Introduction

Sometimes business logic isn't driven by a user clicking a button, or a single record being updated. Sometimes, logic is driven by the clock.

- "Every Friday at 5 PM, send a summary email of all closed deals."
- "On the 1st of every month, generate invoices for active subscriptions."
- "Every night at 2 AM, delete all temporary log files older than 30 days."

To handle time-based automation, we use a **Scheduled Cloud Flow**.

## The Recurrence Trigger

A Scheduled Flow only has one trigger: **Recurrence**.

When you configure this trigger, you define the cadence. It can be as broad as "Once a Month" or as granular as "Every 1 Minute".

### Configuration Options
- **Interval:** The number of times it should run (e.g., 1, 5, 10).
- **Frequency:** The time unit (Month, Week, Day, Hour, Minute, Second).
- **Time Zone:** Crucial for global enterprises. Always explicitly set the Time Zone so your "8 AM" run doesn't fire at 3 AM because the server is on UTC time.
- **Specific Times:** If you choose "Week", you can select specific days (e.g., Monday, Wednesday, Friday) and specific hours (e.g., 08:00, 17:00).

## Common Architecture Patterns

Because Scheduled Flows are not triggered by a specific record, they usually follow a standard batch-processing pattern:

1. **Trigger:** Recurrence (e.g., Every day at Midnight).
2. **Retrieve Data:** Use the Dataverse "List rows" action to fetch all records that meet a criteria. (e.g., \`Fetch all Contracts where EndDate is less than Today\`).
3. **Loop:** Use an "Apply to each" control to iterate through the retrieved records.
4. **Process:** Inside the loop, perform an action (e.g., Update the Contract Status to "Expired", or send a renewal email).

## Performance and Limits

Scheduled flows that process large amounts of Dataverse records can run into API limits and timeouts.

### 1. Pagination
By default, the Dataverse "List rows" action only returns the first 5,000 records. If you have 20,000 expired contracts, your flow will miss 15,000 of them.
- **Fix:** Go to the Settings of the "List rows" action, turn on **Pagination**, and set the Threshold to 100,000.

### 2. Concurrency in Loops
By default, an "Apply to each" loop processes records sequentially (one at a time). If you are processing 5,000 records, this will take hours.
- **Fix:** Go to the Settings of the "Apply to each" loop, turn on **Concurrency Control**, and increase the degree of parallelism (up to 50). The flow will now process 50 records simultaneously, drastically reducing runtime.

### 3. Maximum Runtime
A single Power Automate flow execution has a hard timeout limit of **30 Days**. While this seems long, if a Scheduled Flow processes 500,000 records sequentially, it could easily hit this limit and fail.

## Best Practices

- **Off-Peak Hours:** Always schedule heavy batch processing flows (like data archiving or massive recalculations) to run outside of standard business hours (e.g., 2 AM) to avoid degrading system performance for users.
- **Filter Early:** When retrieving records to process, use strict OData filter queries (e.g., \`statuscode eq 1\`). Never retrieve the entire database and use a "Condition" inside the loop to check if the record is active. It wastes massive amounts of memory and API calls.

## Things to Remember

- Scheduled flows use the **Recurrence** trigger.
- They are ideal for **batch processing** and **reporting**.
- Always use **Pagination** and **OData Filters** when retrieving data to process.
- Turn on **Concurrency** in loops for better performance.

## What's Next

We have covered the three main flow types (Instant, Automated, Scheduled). Now, let's dive deep into the most critical trigger for Dynamics 365 developers: the **Dataverse Trigger**.
  `.trim(),
};
