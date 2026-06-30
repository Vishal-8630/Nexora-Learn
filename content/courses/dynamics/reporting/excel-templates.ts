import { DocContent } from "@/types/docs";

export const excelTemplates: DocContent = {
  title: "Excel Templates",
  description:
    "Learn how to create and deploy standardized Excel Templates to allow users to export and analyze Dataverse views with pre-configured charts and pivot tables.",
  content: `
## Introduction

Dynamics 365 provides a native "Export to Excel" button on every list view. While this is useful for raw data dumps, business users often want the exported data to be instantly formatted into Pivot Tables, with corporate colors, logos, and pre-built charts.

Instead of the user exporting the raw data and spending 20 minutes formatting it every single week, an administrator can build an **Excel Template**.

## How Excel Templates Work

An Excel Template is a standard \`.xlsx\` file that contains a data binding to a specific Dataverse Table/View, along with all the visual formatting you desire.

When a user selects an Excel Template in Dynamics 365, the system essentially executes the underlying View query, injects the real-time data into the hidden data tab of the Excel file, and downloads the fully rendered spreadsheet to the user's browser.

## Building an Excel Template

Creating an Excel template requires no coding.

1. **Download the Schema:**
   - In Dynamics 365, navigate to the View you want to base the template on (e.g., "Active Accounts").
   - Click the **Excel Templates** button in the ribbon -> **Download Template**.
   - Select the columns you want included. The system downloads a blank Excel file containing the data schema.

2. **Format in Excel:**
   - Open the downloaded file in Microsoft Excel.
   - You will see a raw table of data. **Do not alter the column names or delete the table.**
   - Create a new tab in the workbook.
   - Insert Pivot Tables, Pivot Charts, format colors, and add formulas. Point these charts to the raw data table on the first tab.
   - Hide the raw data tab if desired. Save the file.

3. **Upload the Template:**
   - Go back to Dynamics 365.
   - Navigate to **Settings -> Templates -> Document Templates**.
   - Click **Upload Template** and select your modified Excel file.

## System vs Personal Templates

When you upload the template via the Settings area, it becomes a **System Template**. It is available to all users in the organization (provided they have security access to read the underlying data). System Templates can be packaged into Solutions and deployed via ALM pipelines.

Users can also upload their own **Personal Templates**. These are only visible to the user who created them, unless explicitly shared.

## Security and Data Limitations

> [!WARNING]
> Excel Templates respect the security roles of the user generating the report. If John runs the "Global Sales" Excel Template, the resulting spreadsheet will only contain the sales data John is legally allowed to see in Dataverse. 
> 
> However, Excel exports are capped at **100,000 rows**. If your view contains 200,000 rows, the Excel template will silently truncate the data at 100k, leading to inaccurate Pivot Table sums.

## Things to Remember

- Excel Templates automate the formatting of **exported Views** using Pivot Tables and Charts.
- You download the schema, format in native Excel, and upload it back.
- They are subject to the **100,000 row export limit**.
- **System Templates** are solution-aware; **Personal Templates** are not.

## What's Next

Excel Templates are great for lists of records. But what if you need to generate a beautiful, highly formatted PDF contract for a *single* record? You use **Word Templates**.
  `.trim(),
};
