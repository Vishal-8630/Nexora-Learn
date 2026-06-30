import { DocContent } from "@/types/docs";

export const datasetControls: DocContent = {
  title: "Dataset Controls",
  description:
    "Learn how to architect Dataset PCF Controls that replace standard Dataverse grids with highly customized lists, calendars, or Kanban boards.",
  content: `
## Introduction

While Field Controls replace a single input component (like a text box), **Dataset Controls** replace an entire SQL-backed grid of data. 

If you want to view a list of Opportunities, the default Dynamics 365 UI provides a standard tabular grid. With a Dataset Control, you can completely replace that grid rendering with a visual Kanban Board, a Map plotting Account coordinates, or an interactive React Calendar.

## Initializing a Dataset Control

When scaffolding via the Power Platform CLI, you must specify the template as \\\`dataset\\\`:
\`\`\`bash
pac pcf init --namespace Contoso --name CustomKanban --template dataset -fw react
\`\`\`

## Binding Data (ControlManifest)

Instead of a standard \\\`<property>\\\` node, your XML manifest will define a **\\\`<data-set>\\\`** node. This instructs Dataverse to pipe an entire View's FetchXML result set into your component.

\`\`\`xml
<data-set name="recordsGrid" display-name-key="Dataset" />
\`\`\`

If your Kanban board requires specific schema columns to function (e.g., it must know which exact column holds the "Status" to physically group the cards), you define strict Property Sets inside the dataset node:

\`\`\`xml
<data-set name="recordsGrid" display-name-key="Dataset">
    <!-- Forces the admin to map a column representing the status -->
    <property-set name="statusColumn" 
                  display-name-key="Status Column" 
                  description-key="The column used to group records" 
                  of-type="OptionSet" 
                  usage="bound" 
                  required="true" />
</data-set>
\`\`\`

## Reading the Dataset Payload in TypeScript

In your \\\`updateView\\\` lifecycle method, you access the data pipeline through \\\`context.parameters.recordsGrid\\\`.

Unlike a Field Control which simply provides a string or integer, a Dataset Control injects a highly complex object containing:
- The raw records.
- The schema columns configured in the view.
- Pagination controls.
- Filtering and sorting states.

### Extracting Records Safely
\`\`\`typescript
const dataset = context.parameters.recordsGrid;

// Architecture Rule: Wait for the async SQL query to return from the server
if (dataset.loading) {
    return React.createElement(LoadingSpinner);
}

// Map through the sorted record IDs provided by the platform
const records = dataset.sortedRecordIds.map((id) => {
    const record = dataset.records[id];
    
    // Extract a specific known column value
    const title = record.getFormattedValue("name");
    
    // Extract the dynamically mapped Property Set column:
    const status = record.getFormattedValue(dataset.columns.find(c => c.alias === "statusColumn")?.name || "");

    return { id, title, status };
});
\`\`\`

## Handling Pagination (Architectural Requirement)

Dataset controls do **not** load all 10,000 records from SQL at once. Dataverse chunks the payload (usually 50-250 records per page). 
You must build explicit "Next Page" functionality (or infinite scrolling) into your React UI.

\`\`\`typescript
// Evaluate if there is more data in the SQL table
if (dataset.paging.hasNextPage) {
    // Command Dataverse to execute the FetchXML query for the next page.
    // This will asynchronously cause updateView() to fire again once the payload arrives.
    dataset.paging.loadNextPage();
}
\`\`\`

## Routing Records

If a user clicks a card on your Kanban board, they expect the record to open contextually. You must use the \\\`Navigation\\\` API provided by the PCF context to respect SPA routing.

\`\`\`typescript
public onCardClick(recordId: string, entityName: string) {
    this.context.navigation.openForm({
        entityName: entityName,
        entityId: recordId
    });
}
\`\`\`

## Things to Remember

- Dataset controls replace **Grids and Subgrids** natively.
- Utilize the **\\\`<data-set>\\\`** node in the XML manifest.
- Data arrives asynchronously over the network; always evaluate **\\\`dataset.loading\\\`**.
- You must handle **Pagination** manually using the \\\`paging\\\` API object.

## What's Next

Whether building a Field or Dataset control, you need it to look visually consistent with the rest of Dynamics 365. Next, we cover the **Fluent UI** React framework.
  `.trim(),
};
