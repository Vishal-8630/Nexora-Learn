import { DocContent } from "@/types/docs";

export const roleBasedDashboards: DocContent = {
  title: "Role-based Dashboards",
  description:
    "Deliver a personalized, focused UI experience by configuring app modules, sitemaps, and dashboards tailored to specific security roles.",
  content: `
## The Business Requirement

"We have two teams using Dynamics 365: Sales and Customer Service. When a Sales Rep logs in, they should see their Pipeline Dashboard, Leads, and Opportunities. When a Support Agent logs in, they should see their Ticket Queue, Cases, and Knowledge Base. Neither team should see the other team's stuff. It confuses them."

## The Naive Approach

A beginner might create one massive "Contoso App" that contains every single table (Leads, Cases, Opportunities). They then rely entirely on the Security Model (Security Roles) to hide the data. 
- **Why it fails:** While the Security Model will hide the *data* (a Sales Rep might click 'Cases' and see an empty list), the *UI* is still cluttered. The Sales Rep still sees the 'Cases' button on the left navigation, and they have to scroll past 15 Support dashboards to find their Sales dashboard. It results in terrible user adoption.

## The Enterprise Architecture

The architect solves this at the **App Module** level, ensuring the UI is tailored, not just the data access.

### 1. Distinct Model-Driven Apps
The architect creates two entirely separate Model-Driven Apps:
- App A: **Contoso Sales Hub**
- App B: **Contoso Support Desk**

### 2. Segmented Sitemaps
Each app gets its own specific Sitemap (the left navigation menu). 
- The Sales Sitemap only contains links to Dashboards, Leads, and Opportunities. 
- The Support Sitemap only contains links to Dashboards, Cases, and Queues.

### 3. Dashboard and Form Targeting
An entity (like Account) might be used by both teams. However, they need to see different things.
- **Forms:** The architect creates a "Sales Account Form" and a "Support Account Form". Inside the App Designer for the *Sales App*, they explicitly restrict the Account table to *only* display the Sales Form. 
- **Dashboards:** The architect restricts the Dashboards component in the App Designer so that the Sales App only includes the "Sales Pipeline Dashboard".

### 4. App Role Assignment
Finally, the architect ties the Apps to the Entra ID / Dataverse Security Roles.
- They select the *Contoso Sales Hub* app -> Manage Roles -> Check the "Salesperson" role.
- They select the *Contoso Support Desk* app -> Manage Roles -> Check the "Customer Service Representative" role.

**The Result:** When the Sales Rep logs into \`make.powerapps.com\`, they only see one tile: *Contoso Sales Hub*. When they open it, the UI is perfectly curated to their exact job function.

## Things to Remember

- Do not rely solely on Security Roles to clean up the UI; they only hide data, not navigation links.
- Create separate **Model-Driven Apps (App Modules)** for distinct business units.
- Use the App Designer to restrict **Forms, Views, and Dashboards** specifically for that app.
- Tie the App to the specific **Security Role** to control access.
  `.trim(),
};
