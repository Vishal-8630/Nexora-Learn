import { DocContent } from "@/types/docs";

export const duplicateDetection: DocContent = {
  title: "Duplicate Detection",
  description:
    "Duplicate Detection helps maintain data hygiene in Dataverse by warning users when they are about to create a record that matches an existing one.",
  content: `
## Introduction

Data quality is the most common reason CRM implementations fail. If salespeople don't trust the data, they won't use the system.

A primary cause of bad data is duplicates. If John Smith exists three times in the database, which record do you log the phone call against? Which record gets synced to the marketing system? 

To prevent this, Dataverse provides a native **Duplicate Detection** engine.

## What is it?

**Duplicate Detection** is a system feature that identifies potential duplicate records in Dataverse based on functional rules you define. 

**Decision Making: Alternate Keys vs Duplicate Detection**
- **Alternate Keys:** Strict, database-level constraint. Blocks duplicates with a hard error. Use for background API integrations.
- **Duplicate Detection:** Soft, UI-level constraint. Warns users with a pop-up dialog, but can optionally allow them to save anyway if they confirm it is not a duplicate. Use for human data entry.

## How does it work?

The feature relies on two components: **Duplicate Detection Rules** and **Duplicate Detection Jobs**.

### 1. Duplicate Detection Rules (Real-Time)
A rule defines the logic for what constitutes a duplicate. You specify the table and the columns to evaluate.
- *Example:* Match \\\`Contact\\\` to \\\`Contact\\\` where \\\`Email Address\\\` is an exact match.
- *Fuzzy matching:* You can configure rules to match on the "First N Characters" (e.g., match if the first 5 characters of the ZIP code are the same) or ignore blank values.

When a rule is published, Dataverse builds "Match Codes" in the background to ensure the evaluation happens instantly when a user clicks Save.

### 2. Duplicate Detection Jobs (Asynchronous)
Rules catch duplicates *as they are being created in the UI*. But what if a rule is created today, and the database already has thousands of duplicates from a massive Excel import last year?

A **Duplicate Detection Job** is an asynchronous background process you can schedule to scan the entire database (or a subset of records) against your published rules. 

\`\`\`text
Database (1M Contacts)
        │
Duplicate Detection Job (Runs on Weekend)
        │
        ▼
Generates "Duplicate Record" Report
        │
        ▼
Data Steward Manually Merges Duplicates
\`\`\`

## The User Experience

When a user creates a new Contact and clicks Save, Dataverse evaluates the active rules. If a match is found:
1. A pop-up dialog appears.
2. It says: *"A record with these values already exists."*
3. It displays the existing matching record(s) in a mini-grid.
4. The user can either click **Cancel** (and navigate to the existing record) or click **Ignore and Save** (if the system allows it).

## Cross-Table Detection

Duplicate detection rules don't just work within a single table. You can configure them to look across tables.
- *Example:* When creating a new \\\`Lead\\\`, check if a \\\`Contact\\\` already exists with the same email address. This prevents sales reps from treating an existing customer as a brand-new prospect.

## Best Practices

- **Keep rules simple and targeted:** Do not create a rule that says "Match if First Name = First Name". You will get thousands of false positives for "John". Combine fields: "Match if First Name = First Name AND Last Name = Last Name".
- **Merge, don't delete:** When cleaning up existing duplicates, always use the platform's native **Merge** tool. Merging takes all the child records (emails, opportunities, cases) from the duplicate and moves them to the master record before deactivating the duplicate. Deleting causes you to lose all that historical relationship data.
- **Run jobs regularly:** Schedule Duplicate Detection Jobs to run over the weekend to catch records that bypassed the UI (e.g., records created by a poorly configured API integration).

## Common Mistakes

> [!CAUTION]
> **Overloading the system with rules** 
> You can only have a maximum of 5 active duplicate detection rules per table. If you try to create overly complex logic covering every edge case, you will hit this limit. Stick to high-probability identifiers like Email, Phone Number, or Company Name.

## Things to Remember

- **Duplicate Detection** provides a "soft warning" UI pop-up to users.
- **Rules** define the matching logic.
- **Jobs** scan the database asynchronously for existing duplicates.
- Use **Alternate Keys** for strict API integrations.

## What's Next

We have now covered how to model data and keep the database clean. But how do we track who changed what data over time? Next, we look at Dataverse **Auditing**.
  `.trim(),
};
