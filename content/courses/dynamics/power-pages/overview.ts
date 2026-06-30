import { DocContent } from "@/types/docs";

export const powerPagesOverview: DocContent = {
  title: "Power Pages (Advanced)",
  description:
    "Learn how Power Pages provides a secure, external-facing portal for partners and customers to interact directly with Dataverse data.",
  content: `
## Introduction

Dynamics 365 and Model-Driven Apps are designed for **internal users** (your employees). You license them, assign them security roles, and they log into the CRM.

But what if you want your *customers* to log in to a portal to view their Support Cases, submit new warranty claims, or update their profile? You cannot give every customer a $100/month Dynamics license.

To solve this, Microsoft offers **Power Pages** (formerly Power Apps Portals).

## What is it?

**Power Pages** is a secure, enterprise-grade, low-code platform for creating external-facing websites.

These websites are fundamentally wired directly into Dataverse. When a customer fills out a "Submit Case" form on the Power Pages website, the data is instantly saved into the \`Incident\` (Case) table in Dataverse. There is no API middleware, no syncing, and no delay.

## Architecture

A Power Page website consists of Dataverse records. The actual web pages, site settings, and web templates are all stored as records inside your Dataverse database.

When a user visits the URL, the Power Pages hosting engine reads these records, compiles the HTML, CSS, and Liquid code, and renders the website in the browser.

## Key Components

### 1. Web Pages and Web Templates
The visual structure of the site. Web Templates use **Liquid** (an open-source template language) to dynamically fetch and display Dataverse data inside HTML.

### 2. Basic Forms (Entity Forms)
The most powerful feature. You can take a standard Model-Driven Form (the exact same form you built for internal users) and surface it on the website. Power Pages automatically translates the Dataverse form into a responsive, Bootstrap-styled web form.

### 3. Multistep Forms (Web Forms)
Used for complex processes (e.g., a 5-step loan application). You string multiple Dataverse forms together into a wizard, complete with conditional branching and progress bars.

### 4. Lists (Entity Lists)
Surfaces a Dataverse View as a web-based data grid. A customer can see a list of "My Open Cases," click a row, and drill down into the details.

## Security (Table Permissions)

Security in Power Pages is strict. By default, external users cannot see *any* Dataverse data.

To grant access, you must configure **Table Permissions**.
- **Global Access:** The user can see all records in the table (e.g., a public FAQ list).
- **Contact Access:** The user can only see records directly linked to their Contact record in Dataverse (e.g., "Only show Cases where I am the customer").
- **Account Access:** The user can see records linked to their parent Account (e.g., "I am the Admin for Contoso Corp, let me see all cases submitted by any Contoso employee").

You assign these Table Permissions to **Web Roles** (e.g., "Authenticated User", "Premium Customer"), and assign those Web Roles to Dataverse Contacts.

## Authentication Providers

Power Pages supports standard modern authentication. You can allow users to log in using:
- Azure AD B2C (The recommended standard for customer portals)
- Microsoft Entra ID (For B2B partner portals)
- Google, Facebook, Twitter, LinkedIn
- Local Authentication (Email and password stored in Dataverse)

## Pro-Code Extensibility

While Power Pages has a low-code design studio, pro developers can heavily customize it:
- **Liquid:** Write complex server-side logic in the HTML templates (e.g., \`{% if user %}\` to check if someone is logged in).
- **WebAPI:** Power Pages has a secure, client-side WebAPI. You can write JavaScript/AJAX on the web page to directly create or update Dataverse records without reloading the page.
- **Custom CSS:** The framework is built on Bootstrap, making it easy for web developers to theme the site to exactly match corporate branding.

## Best Practices

- **Never use Local Authentication in Production:** Managing passwords inside Dataverse is a security risk and an administrative nightmare. Always use Azure AD B2C or a modern Identity Provider.
- **Use Liquid for performance:** If you need to render a complex list of related data, writing a Liquid template is often faster and cleaner than writing client-side JavaScript that hits the WebAPI.
- **Don't duplicate logic:** Use Dataverse Plugins for business logic. If an external user creates a Case via Power Pages, and an internal user creates a Case via the CRM, the exact same backend Dataverse plugin will fire for both. 

## Common Mistakes

> [!WARNING]
> **Ignoring Table Permissions** — If you place a List of Accounts on a webpage and forget to assign a Table Permission, the list will simply render empty. Developers often spend hours debugging their HTML, not realizing the Dataverse security engine is blocking the data layer.

## Things to Remember

- Power Pages surfaces Dataverse data to **external users**.
- You expose data using **Basic Forms, Multistep Forms, and Lists**.
- Data access is heavily restricted by **Table Permissions**.
- You use **Liquid** templates for dynamic, server-side HTML rendering.

## Related Topics

- [Forms](/docs/model-driven-apps/forms) — the internal forms that are surfaced on the portal
- [Views](/docs/model-driven-apps/views) — the internal views that power portal Lists
  `.trim(),
};
