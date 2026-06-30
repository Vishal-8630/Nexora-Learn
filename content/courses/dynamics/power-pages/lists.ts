import { DocContent } from "@/types/docs";

export const lists: DocContent = {
  title: "Power Pages Lists",
  description:
    "Learn how to expose Dataverse Views to external users using Lists, allowing them to search, filter, and drill down into records.",
  content: `
## Introduction

A **List** (formerly known as an Entity List) is the Power Pages equivalent of a Dataverse View. 

It allows you to display a tabular grid of records on a portal webpage, complete with pagination, searching, and action buttons.

## Creating a List

You do not build the columns or the filtering logic in Power Pages. You build it in Dataverse.

1. **In Dataverse:** Create a standard Public View for your table (e.g., "Active Support Cases"). Add the columns you want to display and configure the filter criteria.
2. **In Portal Management:** Create a new "List" record.
3. Point the List to the Dataverse Table, and select the View you just created.

When you place this List on a Web Page, Power Pages reads the View definition and renders an HTML \`<table>\` dynamically.

## Security and Filtering

### Table Permissions
Like everything in Power Pages, Lists strictly obey **Table Permissions**. 
If your Dataverse View returns 10,000 cases, but the logged-in user only has a Contact-scoped Table Permission for their own 5 cases, the List will automatically filter the results. The user will only see their 5 cases.

### Search and Filters
You can enable robust filtering directly from the List configuration in Portal Management:
- **Search Box:** Adds a search bar above the grid. (Note: This only searches the columns physically present in the View).
- **Metadata Filters:** Adds a sidebar allowing users to filter by specific Dropdowns, Checkboxes, or Lookup fields (similar to e-commerce site filters).

## List Actions (Grid Configuration)

A static grid is boring. Users need to interact with the data. 

In the **Grid Configuration** section of the List record, you can add Action Buttons that appear on each row of the grid.

### 1. Details / Edit Action
You can configure a "View Details" button. When the user clicks a row, the portal redirects them to a new Web Page (which contains a Basic Form in Edit or ReadOnly mode) and passes the GUID of the clicked record in the URL.

\`https://contoso.com/view-case/?id=12345678-1234-1234-1234-123456789012\`

### 2. Create Action
You can add a "Create New" button above the grid, which redirects the user to a Web Page containing a Basic Form in Insert mode.

### 3. Workflow / Action Button
You can configure a button that triggers a classic synchronous Dataverse Workflow. 
*(Note: Power Automate Cloud Flows cannot be triggered directly from a List action; you must trigger a classic Workflow, which can then trigger a Flow).*

## Customizing the List UI

By default, the List renders as a standard bootstrap-styled HTML table. 

If you want the List to render as a visual calendar, a map, or a gallery of cards, you have two options:
1. **OOB Custom Controls:** Power Pages supports rendering Lists as a Calendar or Map via basic configuration in Portal Management.
2. **Liquid FetchXML:** If you need complete control over the HTML layout (e.g., a custom masonry grid of product cards), do not use the List component. Instead, write a custom Web Template using Liquid \`{% fetchxml %}\` to query the data and render your own custom HTML loops.

## Things to Remember

- Lists are driven by standard **Dataverse Views**.
- They enforce **Table Permissions** automatically.
- Configure **Grid Actions** to allow users to Edit, Create, or View Details.
- For hyper-custom layouts, skip the List component and use **Liquid \`fetchxml\`**.

## What's Next

This concludes Phase 14! You now understand the full architecture of Power Pages, from security and authentication to rendering dynamic data using Liquid, Forms, and Lists.
  `.trim(),
};
