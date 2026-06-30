import { DocContent } from "@/types/docs";

export const fetchxmlReporting: DocContent = {
  title: "FetchXML (Reporting Context)",
  description:
    "Learn how FetchXML replaces SQL in the cloud, specifically tailored for building Dataverse datasets in paginated SSRS reports.",
  content: `
## Introduction

In the Integration phase, we learned that FetchXML is a proprietary XML querying language used to pull data from Dataverse.

When it comes to Reporting, FetchXML is absolutely critical. Because Microsoft does not allow direct T-SQL queries against the cloud database for standard SSRS reports, FetchXML is the *only* way to supply data to a traditional paginated report.

## FetchXML vs SQL

If you are a traditional SQL developer building reports, you must understand the translation layer.

### 1. Selecting Columns
**SQL:**
\`\`\`sql
SELECT name, revenue FROM account
\`\`\`
**FetchXML:**
\`\`\`xml
<fetch>
  <entity name="account">
    <attribute name="name" />
    <attribute name="revenue" />
  </entity>
</fetch>
\`\`\`

### 2. Joins (Link-Entity)
**SQL:**
\`\`\`sql
SELECT a.name, c.fullname 
FROM account a 
LEFT JOIN contact c ON a.primarycontactid = c.contactid
\`\`\`
**FetchXML:**
\`\`\`xml
<fetch>
  <entity name="account">
    <attribute name="name" />
    <link-entity name="contact" from="contactid" to="primarycontactid" link-type="outer" alias="c">
      <attribute name="fullname" />
    </link-entity>
  </entity>
</fetch>
\`\`\`

## Using FetchXML in Report Builder

When you build a report using Microsoft Report Builder or Visual Studio (BIDS), you must configure a **Data Source** and a **Dataset**.

1. **Data Source:** You do not connect to a SQL Server. You choose **"Microsoft Dynamics 365 Fetch"** as the connection type, and you provide your Dataverse environment URL.
2. **Dataset:** In the Query Designer, you paste your raw FetchXML string.

The reporting engine executes the XML query against the Dataverse API, parses the returning JSON/XML, and populates the fields in your report designer.

## Dynamic Parameters in FetchXML

The most common requirement for an operational report is allowing the user to filter it. (e.g., A report that says: *"Show me all Accounts in [State]"*, where the user types the state into a prompt).

In standard SQL, you use parameters like \`@State\`.
In FetchXML for SSRS, you use the exact same \`@\` syntax inside the \`<condition>\` node.

\`\`\`xml
<fetch>
  <entity name="account">
    <attribute name="name" />
    <filter>
      <condition attribute="address1_stateorprovince" operator="eq" value="@StateParam" />
    </filter>
  </entity>
</fetch>
\`\`\`

When you paste this into Report Builder, the tool automatically detects \`@StateParam\` and creates a User Parameter in the report UI. When the user runs the report in Dynamics 365, a popup will ask them to enter the state, and that value is dynamically injected into the FetchXML query before execution.

## The Pre-Filtering Magic

There is a massive feature specific to Dynamics 365 called **Pre-Filtering**.

Imagine you build an "Account Summary" report. A user opens an Account record, clicks "Run Report", and expects the report to run *only for that specific Account*.

If you write a hardcoded FetchXML query, it will pull all 50,000 accounts. You must tell Dataverse to automatically inject a filter for the specific record the user is looking at.

You achieve this by adding the \`enableprefiltering="true"\` attribute to the entity node.

\`\`\`xml
<fetch>
  <entity name="account" enableprefiltering="true" prefilterparametername="CRM_FilteredAccount">
    <attribute name="name" />
  </entity>
</fetch>
\`\`\`

When Dataverse sees this attribute, it intercepts the query at runtime and dynamically appends an extra filter (e.g., \`WHERE accountid = [current_record_id]\`) before executing it. This makes your reports context-aware.

## Things to Remember

- Direct **SQL queries** are blocked in cloud SSRS reports; you must use **FetchXML**.
- Paste FetchXML into the **Dataset Query Designer** in Report Builder.
- Use **\`@ParamName\`** to create user prompts.
- Use **\`enableprefiltering="true"\`** to make reports run in the context of the current record.

## What's Next

Now that we know how to write the query, let's look at the actual tool used to design the layout of these paginated reports: **SSRS**.
  `.trim(),
};
