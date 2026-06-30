import { DocContent } from "@/types/docs";

export const licensing: DocContent = {
  title: "Licensing",
  description:
    "Dynamics 365 licensing dictates which applications users can access, but more importantly for developers, it dictates hard technical boundaries like API limits and storage capacity.",
  content: `
## Introduction

Licensing in Dynamics 365 is not just an administrative billing task; it is the fundamental mechanism that controls *who* can access *what* within the platform, and *how much* computing power your environment is allowed to consume.

As a Solution Architect or Developer, you must understand licensing to ensure you do not design a solution that requires features the client cannot afford.

## How it Works

Dynamics 365 primarily uses a **per-user, per-app model**.

- Each user who needs to actively work inside a Dynamics 365 app needs a license assigned to them in Entra ID.
- The type of license determines which apps they can open, and what tables they can write to.

## License Types

Dynamics 365 offers two primary tiers of user licenses for CRM applications:

| License | Who it's for | Architectural Access Level |
|---|---|---|
| **Full License** (e.g., Sales Enterprise) | Power users who need full access to all features | Complete Read/Write access to all tables, forms, and features within the licensed app context. |
| **Team Member License** | Users who only need light access | Read access to most tables, but **strictly limited write access** (e.g., they can update an Account, but cannot create a complex Opportunity). Cannot use premium features. |

*Architectural Warning:* Never assume all users will have Full Licenses. Team Member licenses are a fraction of the cost, so enterprises buy them in bulk. If your custom C# plugin assumes the user has full write privileges to a specific table, it will crash for Team Members.

## Dataverse Capacity

Beyond per-user licenses, your tenant receives a pool of **Dataverse storage** shared across all environments (DEV, UAT, PROD). Storage is broken into three distinct meters:

1. **Database Storage** — The structured relational data in Dataverse tables (Azure SQL). This is the most expensive storage.
2. **File Storage** — Attachments, documents, and images (Azure Blob).
3. **Log Storage** — Audit logs and telemetry data.

Each Dynamics 365 user license purchased adds a small amount of storage to the tenant's pool. 

> [!CAUTION]
> **The Storage Trap**
> If the tenant exceeds its Database Storage pool, Microsoft will **lock the environment**. You will not be able to create new environments, copy environments, or restore backups until you either delete data or purchase expensive add-on storage capacity. Architects must proactively design data retention policies to prevent this.

## API Limits (Service Protection)

Every license comes with a strict **API request limit** per 24 hours.
If a user is licensed for Dynamics 365 Sales Enterprise, they are allowed a specific number of API calls per day (e.g., 40,000 requests).

If you write a poorly optimized Power Automate flow or a C# integration that loops through 100,000 records using that user's connection, Microsoft will throttle the connection, and the integration will fail.

## What Developers Need to Know

- **Premium Connectors:** Power Automate flows that touch Dataverse or external systems (like SQL Server) require a premium Power Automate license.
- **Application Users:** Calling the Dataverse Web API from an external server (like a Node.js app) requires setting up a Service Principal (Application User). Application users do not consume a paid license, but they share the tenant's global API limit pool.
- **Multiplexing is Illegal:** You cannot build a custom web portal that allows 500 unlicensed users to submit data, which is then written to Dataverse using a single licensed "System Account". This violates Microsoft's multiplexing rules. Every user interacting with the data must be licensed.

## Things to Remember

- Dynamics 365 uses a **per-user licensing model**.
- **Team Member** licenses have strict write limitations.
- Dataverse **Database Storage** is highly restricted and expensive.
- Licensing governs hard technical boundaries like **API Request Limits**.
- **Multiplexing** to bypass licenses is a compliance violation.

## What's Next

With the Introduction section complete, you now have the foundational context of the CRM applications. The next section covers the **Power Platform** — the technical foundation that sits beneath Dynamics 365.
  `.trim(),
};
