import { DocContent } from "@/types/docs";

export const dlpPolicies: DocContent = {
  title: "Data Loss Prevention (DLP) Policies",
  description:
    "Administering tenant-wide policies to prevent connectors from leaking CRM data to Twitter or Dropbox.",
  content: `
## The Power Automate Threat

Power Automate is incredible because it allows citizen developers to connect Dataverse to over 1,000 external services (Twitter, Dropbox, Google Drive, SQL Server).

However, this is a massive security nightmare. 

What prevents a disgruntled employee from creating a Flow that says: *"When a new Contact is created in Dataverse, tweet their phone number to the public"*? Or *"When an Opportunity closes, export the revenue data to my personal Google Drive"*?

The answer is **Data Loss Prevention (DLP) Policies**.

---

## What is a DLP Policy?

A DLP Policy is a tenant-level rule configured in the Power Platform Admin Center. It categorizes all 1,000+ connectors into three distinct buckets:

### 1. Business Data Only
Connectors in this bucket are allowed to talk to each other, but they are absolutely forbidden from communicating with connectors in the Non-Business bucket.
*(Example: Dataverse, Office 365 Outlook, SharePoint).*

### 2. No Business Data Allowed (Non-Business)
Connectors in this bucket can talk to each other, but cannot touch Business Data.
*(Example: Twitter, Facebook, Personal Gmail).*

### 3. Blocked
Connectors in this bucket are completely banned. Flows using them will instantly fail and cannot be turned on.
*(Example: Unapproved 3rd party APIs).*

---

## The Impact on Developers

If you build a Power Automate flow that connects Dataverse (Business bucket) to Dropbox (Non-Business bucket), the moment you click "Save", the platform will throw a DLP violation error and disable the flow.

### Granular Control
Modern DLP policies allow you to be incredibly granular:
*   You can allow the **Twitter** connector, but block the "Post a Tweet" action, only allowing the "Search for Tweets" action.
*   You can allow the **SQL Server** connector, but restrict it to only connect to \`192.168.1.50\`, blocking connections to any other database.

> [!WARNING]
> **Environment Scoping**
> By default, you should create a highly restrictive DLP policy and apply it to **All Environments**. Then, create a slightly more relaxed policy and apply it to specific environments (like a dedicated Integration environment) where you know the traffic is safe.
`,
};
