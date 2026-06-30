import { DocContent } from "@/types/docs";

export const sitemap: DocContent = {
  title: "Site Map",
  description:
    "The Site Map is the primary XML-based navigation menu in a Model-Driven App. Learn how to structure Areas, Groups, and Subareas to create an intuitive UX.",
  content: `
## Introduction

You have built a perfect \\\`Opportunity\\\` form, a highly optimized "Active Opportunities" view, and a beautiful Sales Dashboard. But if the user cannot find them, the application is useless.

The left-hand navigation menu in a Model-Driven App that ties all these disconnected components together is called the **Site Map**.

## What is it?

The **Site Map** is the XML-based configuration that defines the absolute navigation structure of a specific Model-Driven App. 

It dictates what appears in the left navigation pane (or the bottom switcher for mobile). Through the Site Map, you grant users UI access to Tables (Views), Dashboards, Web Resources, and external URLs.

## Structure of the Site Map

The navigation is structured into three distinct hierarchical levels:

### 1. Areas
The highest level of navigation. If an app has multiple Areas, a dropdown switcher appears at the absolute bottom left of the screen. 
- *Example:* A massive enterprise CRM app might have a "Sales" Area, a "Service" Area, and a "Settings" Area. Switching Areas completely swaps the groups and links shown above it.

### 2. Groups
Groups are the non-clickable structural headers within an Area that visually categorize links.
- *Example:* In the Sales Area, you might have a Group called "Customers" and another Group called "Collateral".

### 3. Subareas
Subareas are the actual clickable routing links under a Group. 
- *Example:* Under the "Customers" Group, you define a Subarea for "Accounts" and a Subarea for "Contacts".

## The App Designer

In the modern Power Apps App Designer, configuring the Site Map is a visual, drag-and-drop experience.

You simply add a new Subarea, and define its **Type**:
- **Entity (Table):** Links to the default View of a table (e.g., clicking opens the Account grid).
- **Dashboard:** Links to a specific system dashboard.
- **Web Resource:** Opens a custom HTML/JavaScript page hosted within Dataverse.
- **URL:** Opens an external website (e.g., linking to a corporate SharePoint intranet).

## Security and the Site Map (Architectural Advantage)

The Site Map is highly intelligent regarding Dataverse Role-Based Access Control (RBAC). 

**Privilege Filtering:** You do **not** need to create different Site Maps for different security roles. If a Subarea links to the \\\`Invoices\\\` table, but the user logging in does not have "Read" privileges for the \\\`Invoices\\\` table in their Security Role, Dataverse will dynamically hide the "Invoices" link from their navigation.

This allows Solution Architects to build one master app for the entire company, and the navigation will dynamically trim itself down based on the user's specific security permissions.

## Best Practices

- **Role-Based Applications:** Do not put 50 tables in a single app's Site Map. Build specific apps for specific roles (e.g., a "Sales Hub" app and a "Customer Service Hub" app). A cluttered navigation paralyzes users.
- **Use Areas for Admin Settings:** Keep daily transactional work in the primary Area. Move configuration tables (like "Tax Rates" or "Territories") into a separate "Settings" Area so they do not clutter the main menu.
- **Use Standard Icons:** Subareas support SVG icons. Use consistent, recognizable icons for standard tables to help users navigate visually.

## Common Mistakes

> [!CAUTION]
> **Forgetting to add tables to the App Module** 
> Adding a table to the Site Map is not enough. You must also ensure the table (and its associated forms and views) is explicitly added to the Model-Driven App's metadata component list. If it is in the Site Map but missing from the App definition, it will cause fatal routing errors.

## Things to Remember

- The Site Map controls the left-hand **Navigation**.
- It is strictly structured via **Areas -> Groups -> Subareas**.
- Subareas can link to **Tables, Dashboards, Web Resources, or URLs**.
- It automatically hides links if the user lacks the **Security Role** to view the underlying data.

## What's Next

Now that you have mastered the metadata-driven UI of Model-Driven Apps, it's time to explore the broader concepts of the entire ecosystem. Next, we will dive into the overarching platform itself.
  `.trim(),
};
