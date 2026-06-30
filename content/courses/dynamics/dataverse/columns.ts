import { DocContent } from "@/types/docs";

export const columns: DocContent = {
  title: "Columns in Dataverse",
  description:
    "Columns define the specific pieces of data you want to store inside a Dataverse table. Learn about column types, behaviors, and calculated/rollup capabilities.",
  content: `
## Introduction

Once you have created a Table (like \\\`Vehicle\\\`), you need a way to store specific pieces of information about that table, such as the color, the mileage, and the purchase date. 

In Dataverse, you do this by creating **Columns**.

*Note: In older versions of Dynamics CRM, Columns were referred to as **Fields** or **Attributes**.*

## What is it?

A **Column** represents a single piece of data stored within a Table. 

When you create a column, you must define its **Data Type** (e.g., Text, Number, Date). The data type dictates how the data is stored in the database, how it looks on a Model-Driven form, and what kind of validation Dataverse automatically applies to it.

## Common Data Types (Decision Making)

Dataverse supports a wide variety of column types. Choosing the right one is critical because **you cannot easily change a column's data type after it is created.**

- **Single Line of Text:** For short strings (names, emails, short URLs). Maximum 4,000 characters.
- **Multiple Lines of Text:** For long descriptions or notes. Maximum 1,048,576 characters.
- **Whole Number:** For integers (e.g., Number of Employees, Mileage).
- **Decimal / Float:** For numbers with fractions (e.g., Exchange Rates, Weight).
- **Currency:** A specialized number type that automatically handles currency symbols and exchange rates to the organization's base currency.
- **Date and Time:** Can store just the Date, or the Date and Time.
- **Yes/No (Boolean):** A simple true/false toggle (formerly called Two Options).
- **File / Image:** Stores a file attachment or a thumbnail image directly on the record.

**Decision: Choice vs Lookup**
If you need a user to select "Red", "Blue", or "Green", do you use a Choice column or a Lookup to a custom \\\`Color\\\` table?
- Use a **Choice Column** if the list is static (e.g., Days of the Week) and does not require additional metadata.
- Use a **Lookup** if the list changes frequently, is managed by end-users, or if each "Color" needs its own metadata (e.g., a hex code field).

## Choice Columns (Option Sets)

When you want a user to select from a predefined list of static values, you use a **Choice** column. 

There are two ways to define choices:
1. **Local Choice:** The list of options is defined specifically for this one column on this one table. (Generally avoid this).
2. **Global Choice:** The list of options is defined centrally in Dataverse. You can reuse this same list across multiple tables. If you add "Yellow" to the list later, every table using that Global Choice updates automatically.

## Data Calculation Engine

Sometimes you don't want a user to type in data; you want Dataverse to calculate it automatically.

### Formula Columns (Power Fx)
Microsoft is currently standardizing on **Formula Columns**. They use **Power Fx** (the same Excel-like language used in Canvas Apps) to perform calculations. They are highly flexible and evaluate in real-time. 

### Legacy Calculated Columns
These perform real-time calculations using classic string manipulation based on other columns in the *same row*. Microsoft is deprecating these in favor of Formula columns.

### Rollup Columns
These aggregate data from *child records* up to a parent record.
- *Example:* An \\\`Account\\\` has a rollup column called \\\`Total Value of Open Opportunities\\\` which sums the value of all related \\\`Opportunity\\\` rows.
- **Important:** Rollup columns do not calculate in real-time. By default, an asynchronous system job recalculates them every 12 hours, though users can manually click a "Recalculate" button on the UI.

## Column Behaviors (Time Zones)

When dealing with Date and Time columns, you must select a behavior:
- **User Local:** (Default). The date/time shifts depending on the time zone of the user viewing the record. (e.g., A meeting at 9:00 AM EST shows as 6:00 AM PST to a user in California).
- **Date Only:** Stores only the date (e.g., a Birthday). It does not shift based on time zones.
- **Time-Zone Independent:** Stores the exact time entered and never shifts it, regardless of who views it (e.g., a hotel check-in time, which must always be 3:00 PM local time of the hotel).

## Best Practices

- **Use Global Choices:** Default to using Global Choices unless you are 100% certain the list of options will never be used on another table.
- **Don't use Text for numbers:** If a field should only contain a number, use a Whole Number column. If you use Text, users will enter "Ten", "10", or "10ish", destroying your ability to run analytical reports.

## Common Mistakes

> [!WARNING]
> **Changing Date/Time Behaviors** 
> You can change a Date/Time column from "User Local" to "Date Only", but you **cannot** change it back. Be extremely careful when configuring date behaviors, especially for integrations.

## Things to Remember

- Columns were formerly called **Fields** or **Attributes**.
- Data types cannot be easily changed after creation.
- **Formula columns** (Power Fx) evaluate data on the same row in real-time.
- **Rollup columns** aggregate data from child rows asynchronously (every 12 hours).

## What's Next

Now that we have Tables and Columns, we need to link them together. Next, we will cover **Relationships** — how Dataverse models connections between different pieces of data.
  `.trim(),
};
