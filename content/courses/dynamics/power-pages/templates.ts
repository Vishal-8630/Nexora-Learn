import { DocContent } from "@/types/docs";

export const templates: DocContent = {
  title: "Power Pages Templates",
  description:
    "Explore the various templates available in Power Pages, from blank canvases to full Dynamics 365 industry accelerators.",
  content: `
## Introduction

When you click "Create a Site" in Power Pages, you are presented with a library of templates. 

A template is not just a visual theme; it often includes pre-built Dataverse tables, pre-configured Table Permissions, pre-written Web API logic, and complex web pages designed to solve a specific business problem.

Choosing the right template is critical, as it defines the foundation of your portal architecture.

## 1. The Blank Template (Default)

The "Starter Layout" or "Blank" template is the most common choice for professional developers building custom enterprise applications.

**What it includes:**
- The core \`adx_\` system tables.
- A basic Home page, Contact Us page, and a generic Header/Footer.
- Basic Authentication configuration.

**Why use it?**
If you are building a custom portal (e.g., a "Vendor Onboarding Portal" for a custom ERP solution), you don't want the clutter of pre-built Microsoft apps. The Blank template gives you a clean slate.

## 2. Solution Templates

Microsoft provides templates designed to solve common cross-industry problems. These templates deploy entire functional apps into your environment.

- **Program Registration:** Allows external users to browse programs, register, and pay. Includes pre-built tables for Programs, Registrations, and Payments.
- **Building Permit Application:** A citizen portal for municipal governments to accept, track, and approve building permits.
- **FAQ / Knowledge Base:** A portal designed specifically to surface Dataverse Knowledge Articles to the public, featuring a robust search engine.

## 3. Dynamics 365 Templates (Legacy)

If you are a Dynamics 365 enterprise customer with specific first-party apps installed (like Customer Service or Sales), you have access to highly specialized Dynamics templates.

> [!WARNING]
> You cannot install these templates unless the corresponding Dynamics 365 App is already installed in your environment.

### Customer Self-Service Portal
Requires **Dynamics 365 Customer Service**.
Allows customers to:
- Log in and submit Support Cases.
- View the status of their existing Cases.
- Search the Knowledge Base.
- Participate in community Forums.

### Partner Portal
Requires **Dynamics 365 Sales**.
Allows business partners (resellers, distributors) to:
- Create and manage Opportunities.
- Accept or reject Leads distributed by the central organization.
- View Dashboards of their sales performance.

## Changing Templates

**You cannot change a template once a site is created.**

If you provision a Blank site, and two months later the business decides they want the Partner Portal functionality, you cannot "upgrade" your Blank site to a Partner Portal. 

You must provision a brand new Partner Portal site and manually migrate any custom code you wrote from the old site to the new one. Always confirm the business requirements before selecting a template.

## The Design Studio vs Portal Management App

Regardless of the template you choose, you will manage the site using two distinct interfaces:

1. **Power Pages Design Studio:** The modern, drag-and-drop WYSIWYG editor. Great for styling, adding text, and configuring basic forms.
2. **Portal Management App:** A classic Model-Driven app that exposes the raw \`adx_\` tables. This is where professional developers spend 90% of their time to configure complex Web Roles, write raw Liquid code, and manage Table Permissions.

## Things to Remember

- Templates dictate the **starting architecture and tables** of your site.
- Use the **Blank Template** for highly custom enterprise apps.
- **Dynamics 365 Templates** require specific D365 licensing (Sales/Service).
- You **cannot change a template** after the site is created.

## What's Next

A core feature of almost all templates is allowing external users to log in. Next, we cover **Authentication**.
  `.trim(),
};
