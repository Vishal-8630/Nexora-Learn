import { DocContent } from "@/types/docs";

export const webApi: DocContent = {
  title: "Power Pages Web API",
  description:
    "Learn how to use the Power Pages Web API to perform asynchronous CRUD operations directly from client-side JavaScript.",
  content: `
## Introduction

Historically, if a developer wanted to build a highly interactive, single-page application (SPA) on a Power Pages site (e.g., a React app where users can drag and drop records), they had to build a custom middleware server because the portal could only process data via standard, clunky HTML form submissions.

Microsoft solved this by introducing the **Power Pages Web API**. It allows you to write client-side JavaScript (or React) on the portal that directly queries, creates, updates, and deletes Dataverse records asynchronously without refreshing the page.

## Enabling the Web API

For security reasons, the Web API is completely disabled by default. You must explicitly enable it for each specific table and column you want to expose.

You do this via **Site Settings**:

1. **Enable the Table:** 
   - Name: \`Webapi/account/enabled\`
   - Value: \`true\`
2. **Select the Columns:** 
   - Name: \`Webapi/account/fields\`
   - Value: \`name,accountnumber,telephone1\` (or \`*\` for all columns).
3. **Handle Errors:** 
   - Name: \`Webapi/error/innererror\`
   - Value: \`true\` (Helpful for debugging C# plugin crashes triggered by the Web API).

## Security and Table Permissions

> [!IMPORTANT]
> The Power Pages Web API strictly obeys **Table Permissions**. 
> If you write JavaScript to delete an Account via the Web API, but the logged-in user does not have "Delete" privileges in their Table Permission, the Web API will return a \`403 Forbidden\` error. You cannot bypass Table Permissions using the Web API.

## The SafeAjax Wrapper

To prevent Cross-Site Request Forgery (CSRF) attacks, every POST, PATCH, or DELETE request to the Power Pages Web API must include a special verification token in the headers.

Microsoft provides a boilerplate wrapper function called \`safeAjax\` that automatically fetches this token and attaches it to your requests. **You must use this wrapper.**

\`\`\`javascript
(function(webapi, $){
    function safeAjax(ajaxOptions) {
        var deferredAjax = $.Deferred();
        shell.getTokenDeferred().done(function (token) {
            if (!ajaxOptions.headers) {
                $.extend(ajaxOptions, {
                    headers: {
                        "__RequestVerificationToken": token
                    }
                }); 
            } else {
                ajaxOptions.headers["__RequestVerificationToken"] = token;
            }
            $.ajax(ajaxOptions).done(deferredAjax.resolve).fail(deferredAjax.reject);
        });
        return deferredAjax.promise();
    }
    webapi.safeAjax = safeAjax;
})(window.webapi = window.webapi || {}, jQuery);
\`\`\`

## Performing CRUD Operations

Once the wrapper is loaded, you can perform asynchronous operations using the \`/_api/\` endpoint.

### 1. Create (POST)
\`\`\`javascript
webapi.safeAjax({
    type: "POST",
    url: "/_api/accounts",
    contentType: "application/json",
    data: JSON.stringify({
        "name": "Sample Account",
        "telephone1": "555-1234"
    }),
    success: function (res, status, xhr) {
        // The ID of the newly created record is returned in the headers
        console.log("Created ID: " + xhr.getResponseHeader("entityid"));
    }
});
\`\`\`

### 2. Read (GET)
*Note: GET requests do not require the CSRF token, so you can use standard \`fetch\` or \`$.ajax\`.*
\`\`\`javascript
$.ajax({
    type: "GET",
    url: "/_api/accounts?$select=name,telephone1&$filter=name eq 'Sample Account'",
    contentType: "application/json",
    success: function (res) {
        console.log(res.value); // Array of matching accounts
    }
});
\`\`\`

### 3. Update (PATCH)
\`\`\`javascript
webapi.safeAjax({
    type: "PATCH",
    url: "/_api/accounts(00000000-0000-0000-0000-000000000001)",
    contentType: "application/json",
    data: JSON.stringify({
        "telephone1": "555-9999"
    }),
    success: function (res) {
        console.log("Account updated successfully.");
    }
});
\`\`\`

## Things to Remember

- The Web API must be explicitly enabled via **Site Settings**.
- It strictly enforces **Table Permissions**.
- You must include the **CSRF Token** (using the \`safeAjax\` wrapper) for any write operations.
- The endpoint is always **\`/_api/[tablename]\`**.

## What's Next

While the Web API is great for client-side JavaScript, what if we want to render data dynamically on the server *before* the HTML reaches the browser? We do this using the server-side templating language: **Liquid**.
  `.trim(),
};
