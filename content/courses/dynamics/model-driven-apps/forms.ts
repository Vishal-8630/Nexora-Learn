import { DocContent } from "@/types/docs";

export const forms: DocContent = {
  title: "Model-Driven Forms",
  description:
    "Forms are the primary user interface abstraction for viewing and editing records in a Model-Driven App. Learn the strict hierarchy of Tabs, Sections, and Controls.",
  content: `
## Introduction

When a user double-clicks an \\\`Account\\\` record in a list, a screen opens showing the Account's name, phone number, address, and related contacts. That screen is a **Form**.

In Model-Driven Apps, you do not write HTML/CSS to build forms. Instead, forms are **metadata abstractions**. You use the drag-and-drop Form Designer to arrange Dataverse columns into a structured layout, and the platform's React engine handles the responsive rendering automatically.

## Types of Forms

Dataverse provides several distinct form types to handle different architectural user scenarios:

### 1. Main Form
This is the primary interface used for deep interaction with a record. It takes up the full screen and contains the complete set of data, tabs, and related subgrids. Users spend 90% of their time on Main forms.

### 2. Quick Create Form
A highly optimized, slide-out panel used to create new records rapidly without forcing the user to leave their current screen. 
- *Example:* While looking at an Account, a user clicks "+" to add a Contact. A Quick Create form slides down from the top right, asking only for mandatory fields (First Name, Last Name, Email).

### 3. Quick View Form
A read-only widget that you embed inside *another* table's form to display related data contextually.
- *Example:* On an \\\`Opportunity\\\` form, the user selects the parent \\\`Account\\\`. Underneath that lookup, a Quick View form automatically loads the Account's phone number and address, so the user does not have to navigate away to find it.

## Form Structure Hierarchy

The Main Form is structured in a strict metadata hierarchy to organize massive amounts of enterprise data:

1. **Tabs:** The highest level of organization. Tabs run horizontally across the screen to separate major blocks of data (e.g., "Summary", "Details", "Financials").
2. **Sections:** Inside a Tab, you place Sections. A section groups related fields together (e.g., "Contact Info" vs "Address"). Sections can be configured for 1 to 4 columns.
3. **Controls (Fields):** Inside a Section, you place the actual visual representation of the Dataverse Columns. 

## UI Controls (Visual Formatting)

By default, a Text column renders as a standard text box. However, you can apply **Controls** to change how the data is visualized without changing the underlying SQL database schema.

- A Number column can be rendered as a **Star Rating**.
- A Yes/No column can be rendered as a **Toggle Switch**.
- A Text column can be rendered as a **Barcode Scanner** (for the mobile application).

## Lookup Filtering

A powerful feature of form configuration is the ability to filter Lookup columns dynamically based on other selections on the form without writing code.

- *Example:* You have a \\\`Country\\\` lookup and a \\\`State\\\` lookup. You can configure the \\\`State\\\` lookup properties to only show states that belong to the selected \\\`Country\\\`. If the user selects "Canada", the State lookup will only show Provinces.

## Best Practices

- **Keep the Summary tab lean:** The first tab ("Summary") must load incredibly fast and only contain the 10-15 most critical fields. Put the other 100 fields on secondary tabs. The platform lazy-loads tabs, so secondary tabs do not impact initial rendering performance.
- **Use Subgrids wisely:** Embedding lists of related records (like all related Cases) on the main form is powerful, but placing too many subgrids on the first tab will significantly degrade form load times.
- **Enable Quick Create:** Always enable and design Quick Create forms for high-volume transactional tables (Activities, Contacts, Opportunities) to reduce friction during user data entry.

## Common Mistakes

> [!WARNING]
> **The Mega-Section Anti-Pattern** 
> A common architectural mistake is creating a single section and dumping 50 fields into it in a single column. This forces users into endless vertical scrolling. Break data into logical 2-column or 3-column sections to effectively utilize modern wide-screen monitors.

## Things to Remember

- **Main Forms** are for deep data entry; **Quick Create** is for rapid transactional entry.
- Forms are strictly structured via **Tabs -> Sections -> Controls**.
- You can augment visualization using **UI Controls** (like Star Ratings).
- **Lookup Filtering** allows you to restrict dropdown options contextually.

## What's Next

Forms allow you to look at one record at a time. To look at lists of records and query the database visually, you need **Views**.
  `.trim(),
};
