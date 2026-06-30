import { DocContent } from "@/types/docs";

export const powerPages: DocContent = {
  title: "Power Pages",
  description:
    "Power Pages allows you to build secure, data-driven, external-facing websites that are directly connected to Microsoft Dataverse.",
  content: `
## Introduction

By default, Dynamics 365 and Power Apps are internal tools. They require a user to have a Microsoft Entra ID (Active Directory) account in your tenant and an assigned license to log in.

But what if you need a customer to log in and submit a support ticket? What if you need a partner to update their contact information, or citizens to apply for a permit?

For external audiences, you use **Power Pages**.

## What is it?

**Power Pages** (formerly known as Power Apps Portals) is a secure, enterprise-grade, low-code Software as a Service (SaaS) platform for creating, hosting, and administering modern external-facing business websites.

It sits on top of Microsoft Dataverse, meaning the data displayed on the website is the exact same data your internal users see in Dynamics 365.

## Why do we need it?

If a business wants a customer portal that connects to Dynamics 365, the traditional approach is to hire web developers to build a custom React/Angular application, host it on Azure, write a custom backend (Node.js/C#), and use the Dataverse Web API to securely move data back and forth.

This requires significant effort in web development, security, authentication (OAuth), and infrastructure management.

Power Pages provides this out-of-the-box. It provides a visual designer to build the web pages, handles user authentication, and securely surfaces Dataverse data to the web without requiring you to build a custom API backend.

## How does it work?

Power Pages is built on standard web technologies (HTML, CSS, JavaScript, Liquid templates, and Bootstrap).

### Key Components

- **Design Studio** — a low-code visual interface for designing pages, styling the site, and configuring data access.
- **Lists** — a component that takes a Dataverse View and renders it as a data grid on the website.
- **Basic/Multistep Forms** — components that take a Dataverse Form and render it as a web form, allowing external users to create or update records.
- **Liquid** — an open-source template language integrated into Power Pages that allows developers to add dynamic content and write complex logic server-side.

### Authentication

Power Pages supports multiple identity providers. External users do not need a Microsoft license. They can log in using:
- Azure AD B2C (recommended)
- Microsoft accounts, LinkedIn, Google, Facebook
- Any SAML 2.0 or OpenID Connect provider
- Local username and password

## Example

A city government uses Dynamics 365 Customer Service to manage citizen complaints (potholes, graffiti, broken streetlights).

To allow citizens to submit these issues, they use Power Pages:

1. A citizen browses to the city's Power Pages website (e.g., \`portal.city.gov\`).
2. They log in using their Google or Microsoft account.
3. They fill out a web form to report a pothole.
4. Behind the scenes, Power Pages immediately creates a \`Case\` record directly in **Dataverse**.
5. Inside the city offices, a dispatcher using the **Dynamics 365 Customer Service** model-driven app instantly sees the new Case and assigns it to a repair crew.
6. When the repair crew resolves the Case in Dynamics 365, the citizen logs back into the portal and sees the status is updated to "Resolved".

There is no data syncing or custom API required — both the portal and Dynamics 365 look at the exact same Dataverse database.

## Security

Exposing internal database records to the public internet is dangerous. Power Pages handles this through **Table Permissions**.

By default, data in Dataverse is completely hidden from the portal. You must explicitly create Table Permissions that define exactly which records a web user is allowed to see.

For example, you can configure a permission that says: *"A logged-in portal user can only see Support Cases where the 'Customer' column matches their own Contact record."*

## Best Practices

- **Never bypass Table Permissions** — Security is paramount for external websites. Always use Table Permissions to restrict data access.
- **Use Liquid for custom logic** — If the out-of-the-box Forms and Lists do not meet your requirements, use Liquid templates and the Web API to build custom UI components.
- **Leverage Bootstrap** — Power Pages uses the Bootstrap CSS framework. Don't write custom CSS for layout; use Bootstrap classes.

## Things to Remember

- Power Pages is for **external** audiences (customers, partners, citizens).
- It connects directly to Dataverse.
- It uses Lists and Forms to expose Dataverse Views and Forms to the web.
- Developers can extend it using standard web technologies (HTML, CSS, JS, Liquid).
- Table Permissions are strictly required to expose data securely.

## Related Topics

- [Power Platform Overview](/docs/power-platform/overview) — where Power Pages fits in the suite
- [Dataverse](/docs/power-platform/dataverse) — the database driving the portal
- [Dataverse Forms](/docs/dataverse/forms) — the metadata used to render portal forms

## What's Next

We have covered apps, databases, automation, and websites. Finally, we need a way to analyze all this data. Next, we look at **Power BI**.
  `.trim(),
};
