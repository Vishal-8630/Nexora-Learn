import { DocContent } from "@/types/docs";

export const sites: DocContent = {
  title: "Power Pages Sites",
  description:
    "Learn the foundational architecture of Power Pages Sites, how they are provisioned, and how they connect directly to Microsoft Dataverse.",
  content: `
## Introduction

Power Pages (formerly known as Power Apps Portals or Dynamics 365 Portals) is a secure, enterprise-grade, low-code Software as a Service (SaaS) platform for creating, hosting, and administering external-facing business websites.

Unlike Model-Driven apps, which are strictly for internal employees, Power Pages Sites allow you to expose your Dataverse data to the outside world—customers, partners, vendors, and anonymous citizens.

## The Architecture

When you provision a Power Pages site, you are essentially spinning up an Azure Web App that is permanently wired into your specific Dataverse environment.

The architecture is entirely metadata-driven. 
If you want to create a new webpage, you do not FTP an \`.html\` file to a server. Instead, you create a "Web Page" record in a specific Dataverse table. The Power Pages rendering engine reads that record from the database and renders the HTML dynamically for the end user.

### Key Dataverse Tables
When a site is installed, hundreds of custom tables are added to your environment with the \`adx_\` prefix (a remnant of Adxstudio, the company Microsoft acquired to build the platform).
- \`adx_website\`: The root record for your site.
- \`adx_webpage\`: Represents a single page on the site.
- \`adx_pagetemplate\`: The layout structure of a page.
- \`adx_weblinkset\`: Represents navigation menus (like the header or footer).

## Creating a Site

You create a site from the **Power Pages Design Studio** (make.powerpages.microsoft.com).

1. Select your target environment.
2. Click **Create a site**.
3. Choose a template (or start blank).
4. Provide a name and a web address (e.g., \`contosoportal.powerappsportals.com\`).
5. Provisioning takes anywhere from 5 to 30 minutes, as Microsoft deploys the Azure infrastructure and installs the \`adx_\` solution tables into your environment.

## Site Visibility and Custom Domains

By default, newly created sites are **Private**. This means only internal Azure Active Directory (Microsoft Entra ID) users within your tenant can see the site. This allows developers to build the site safely.

Once development is complete, you change the Site Visibility to **Public** in the Power Pages admin center.

### Custom Domains
For a production site, you do not want your customers visiting \`contosoportal.powerappsportals.com\`.
Using the Power Platform Admin Center, you can assign a custom domain (e.g., \`partners.contoso.com\`). You will need to configure a CNAME record in your DNS provider and upload an SSL certificate (or use a free Microsoft-managed certificate) to ensure the site is served securely over HTTPS.

## Capacity and Licensing

Power Pages is licensed differently than Dynamics 365 or Power Apps.
- **Authenticated Users:** Licensed via "Capacity Packs" (e.g., 100 authenticated users per month).
- **Anonymous Users:** Licensed separately (e.g., 500 anonymous users per month).

Because of this, architectural decisions in Power Pages (like choosing to make a knowledge base public vs requiring login) have direct, significant financial impacts on the business.

## Things to Remember

- Power Pages expose **Dataverse data to external users**.
- The entire website is stored as **metadata inside Dataverse** (\`adx_\` tables).
- Sites start as **Private** and must be made **Public** for go-live.
- You can apply **Custom Domains and SSL certificates**.

## What's Next

When creating a site, you must choose a starting point. Next, we cover the various **Templates** available in Power Pages.
  `.trim(),
};
