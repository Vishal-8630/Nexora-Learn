import { DocContent } from "@/types/docs";

export const liquid: DocContent = {
  title: "Liquid Templating",
  description:
    "Learn how to use Liquid, the open-source server-side templating language, to inject dynamic Dataverse data directly into your HTML.",
  content: `
## Introduction

If you write a standard HTML \`<p>Welcome User!</p>\`, it is static. It will say "Welcome User!" to every single person who visits the site.

To make it dynamic (e.g., \`<p>Welcome John Doe!</p>\`), you must render the HTML dynamically on the server. Power Pages achieves this using **Liquid**.

Liquid is an open-source template language created by Shopify and adopted by Microsoft for Power Pages.

## Liquid Syntax Basics

Liquid code is embedded directly into your HTML inside **Web Templates**. It executes on the Microsoft server *before* the HTML is sent to the user's browser.

There are two primary types of Liquid markup:
1. **Output \`{{ }}\`**: Prints data to the screen.
2. **Tags \`{% %}\`**: Performs logic (If statements, For loops).

### Output
\`\`\`liquid
<!-- Assuming the user is logged in -->
<h1>Welcome to the portal, {{ user.fullname }}!</h1>
\`\`\`
*(If the user is John Doe, the browser receives: \`<h1>Welcome to the portal, John Doe!</h1>\`)*

### Tags (Logic)
\`\`\`liquid
{% if user %}
    <p>You are logged in.</p>
{% else %}
    <p>Please sign in to view your dashboard.</p>
{% endif %}
\`\`\`

## Querying Dataverse with fetchxml

The most powerful feature of Liquid in Power Pages is the ability to query the Dataverse database directly from your HTML using the \`{% fetchxml %}\` tag.

> [!IMPORTANT]
> Liquid strictly enforces **Table Permissions**. If you write a FetchXML query to return all Accounts, Liquid will silently filter the results to only include the Accounts the current user has permission to see.

\`\`\`liquid
<!-- Define the query -->
{% fetchxml my_cases %}
<fetch top="5">
  <entity name="incident">
    <attribute name="title" />
    <attribute name="ticketnumber" />
    <order attribute="createdon" descending="true" />
  </entity>
</fetch>
{% endfetchxml %}

<!-- Render the results into an HTML table -->
<table class="table">
    <thead>
        <tr>
            <th>Ticket Number</th>
            <th>Title</th>
        </tr>
    </thead>
    <tbody>
        <!-- Loop through the results -->
        {% for case in my_cases.results.entities %}
            <tr>
                <td>{{ case.ticketnumber }}</td>
                <td>{{ case.title }}</td>
            </tr>
        {% else %}
            <!-- Handles the scenario where the array is empty -->
            <tr><td colspan="2">No cases found.</td></tr>
        {% endfor %}
    </tbody>
</table>
\`\`\`

## Global Liquid Objects

Power Pages injects several global objects into the Liquid context that you can use anywhere:

- **\`user\`**: The Contact record of the logged-in user. (e.g., \`{{ user.emailaddress1 }}\`).
- **\`page\`**: The current Web Page being viewed. (e.g., \`{{ page.title }}\`).
- **\`request\`**: Information about the HTTP request. (e.g., \`{{ request.params['id'] }}\` gets the 'id' parameter from the URL query string).
- **\`settings\`**: Access to Site Settings. (e.g., \`{{ settings['Contoso/ApiKey'] }}\`).
- **\`weblinks\`**: Access to navigation menus.

## Web Templates vs Page Templates

Where do you actually write this Liquid code?
You write it inside a **Web Template** record in the Portal Management app.

However, a Web Page cannot point directly to a Web Template. 
1. You write the Liquid in a **Web Template**.
2. You create a **Page Template** and point it to the Web Template.
3. You create a **Web Page** and assign it the Page Template.

This architecture allows you to write one Web Template (e.g., "Standard Two Column Layout") and reuse it across 50 different Web Pages.

## Security Considerations

Because Liquid executes on the server, it is extremely secure. If you use Liquid to evaluate if a user is an Administrator before rendering a button, a hacker cannot use Chrome DevTools to "unhide" the button, because the server completely excluded the button's HTML from the response.

## Things to Remember

- Liquid executes on the **server** before the page loads.
- Use **\`{{ }}\`** for output and **\`{% %}\`** for logic.
- Use **\`{% fetchxml %}\`** to query Dataverse (enforces Table Permissions).
- Liquid code is stored inside **Web Templates**.

## What's Next

While Liquid handles server-side rendering, we still need client-side logic for interactivity (like validating form fields before submission). Next, we cover **JavaScript** in Power Pages.
  `.trim(),
};
