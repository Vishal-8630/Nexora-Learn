import { DocContent } from "@/types/docs";

export const xrmWebApi: DocContent = {
  title: "Xrm.WebApi",
  description:
    "Learn how to execute asynchronous CRUD operations directly against the Dataverse OData endpoint using the native Xrm.WebApi object.",
  content: `
## Introduction

The \\\`formContext\\\` (Xrm Client API) allows you to read and modify data that is *currently rendered on the screen*. 

But what if a user selects a \\\`Primary Contact\\\` on an Account form, and you need to automatically retrieve that contact's job title and past purchase history from the database? That data is not on the screen. 

To query Dataverse directly from client-side JavaScript, bypassing the form entirely, you use the **Xrm.WebApi**.

## What is it?

**Xrm.WebApi** is a built-in JavaScript namespace that provides methods to interact securely with the Dataverse OData v4 REST endpoint.

It handles authentication automatically (since the user is already authenticated within the Model-Driven App session) and returns standard JavaScript **Promises**, making it the architectural standard for asynchronous database operations.

## 1. Retrieve a Single Record

Use \\\`retrieveRecord\\\` to fetch a specific record when you already possess its GUID.

\`\`\`javascript
var accountId = "5531d753-95af-42e5-9c17-1f22b7a957b9";

// Syntax: retrieveRecord(entityLogicalName, id, options)
Xrm.WebApi.retrieveRecord("account", accountId, "?$select=name,revenue").then(
    function success(result) {
        console.log("Account Name: " + result.name);
        console.log("Revenue: " + result.revenue);
    },
    function(error) {
        console.log(error.message);
    }
);
\`\`\`

> [!IMPORTANT]
> **Performance Rule:** Always use the \\\`$select\\\` OData query option to strictly return only the columns you need. Querying all columns (omitting \\\`$select\\\`) severely degrades SQL performance and increases network payload size.

## 2. Retrieve Multiple Records

Use \\\`retrieveMultipleRecords\\\` to execute a query (via OData or FetchXML) and return an array of results.

\`\`\`javascript
// OData query: Find all active contacts in Seattle
var query = "?$select=firstname,lastname&$filter=address1_city eq 'Seattle' and statecode eq 0";

Xrm.WebApi.retrieveMultipleRecords("contact", query).then(
    function success(results) {
        for (var i = 0; i < results.entities.length; i++) {
            console.log(results.entities[i].firstname);
        }
    },
    function(error) {
        console.log(error.message);
    }
);
\`\`\`

## 3. Create a Record

Use \\\`createRecord\\\` to insert new data into Dataverse. You pass a JSON object mapping logical names to values.

\`\`\`javascript
var data =
{
    "name": "Sample Account",
    "creditonhold": false,
    "description": "This is the description.",
    "revenue": 5000000
};

Xrm.WebApi.createRecord("account", data).then(
    function success(result) {
        console.log("Account created with ID: " + result.id);
    },
    function (error) {
        console.log(error.message);
    }
);
\`\`\`

## 4. Update a Record

Use \\\`updateRecord\\\` to mutate data on an existing record. Pass *only* the columns you intend to modify.

\`\`\`javascript
var accountId = "5531d753-95af-42e5-9c17-1f22b7a957b9";
var data = {
    "telephone1": "555-0100"
};

Xrm.WebApi.updateRecord("account", accountId, data).then(
    function success(result) {
        console.log("Account updated");
    },
    function (error) {
        console.log(error.message);
    }
);
\`\`\`

## 5. Delete a Record

Use \\\`deleteRecord\\\` to permanently remove a record from the database.

\`\`\`javascript
var accountId = "5531d753-95af-42e5-9c17-1f22b7a957b9";

Xrm.WebApi.deleteRecord("account", accountId).then(
    function success(result) {
        console.log("Account deleted");
    }
);
\`\`\`

## Architectural Requirement: OData Binding for Lookups

When creating or updating a record via the Web API, setting a relational lookup field requires strict OData binding syntax. You cannot simply pass a raw GUID string. 

You must use the exact "Navigation Property Name" and append \\\`@odata.bind\\\`, pointing to the plural Entity Set Name of the target table.

\`\`\`javascript
var data = {
    "firstname": "John",
    // Link this contact to an existing account.
    // 'parentcustomerid_account' is the schema navigation property.
    // '/accounts(...)' uses the plural Entity Set Name.
    "parentcustomerid_account@odata.bind": "/accounts(5531d753-95af-42e5-9c17-1f22b7a957b9)" 
};

Xrm.WebApi.createRecord("contact", data).then(...);
\`\`\`

## Modern Standard: Async / Await

Because \\\`Xrm.WebApi\\\` returns standard Promises, you must use modern \\\`async/await\\\` syntax in enterprise codebases. This prevents "callback hell" and ensures asynchronous logic is readable and maintainable.

\`\`\`javascript
Nexora.Contact.onLoad = async function(executionContext) {
    var formContext = executionContext.getFormContext();
    var parentAccount = formContext.getAttribute("parentcustomerid").getValue();
    
    if (!parentAccount) return;

    var accountId = parentAccount[0].id.replace(/[{}]/g, "");

    try {
        // Main thread pauses here until the API returns
        var result = await Xrm.WebApi.retrieveRecord("account", accountId, "?$select=revenue");
        
        if (result.revenue > 1000000) {
            formContext.ui.setFormNotification("This is a VIP Account", "INFO", "vipMsg");
        }
    } catch (error) {
        console.error("API failed: " + error.message);
    }
};
\`\`\`

## Common Mistakes

> [!CAUTION]
> **Failing to Prevent Default on Save Validation** 
> If you execute an asynchronous Web API call inside an \\\`OnSave\\\` event to validate data, the form will finish saving to SQL *before* your API call returns, defeating the purpose. If you need async validation on save, you must use \\\`executionContext.getEventArgs().preventDefault()\\\` first, run the API, and then programmatically trigger the save if valid.

## Things to Remember

- Use **\\\`retrieveRecord\\\`** for a single GUID, and **\\\`retrieveMultipleRecords\\\`** for queries.
- Binding relational lookups strictly requires the **\\\`@odata.bind\\\`** syntax.
- All methods return **Promises** and should be consumed via **\\\`async/await\\\`**.
- The API handles token authentication natively.

## What's Next

We can now read and write data invisibly in the background. But what if we need to actively prompt the user for input or confirmation? Next, we will cover **Dialogs**.
  `.trim(),
};
