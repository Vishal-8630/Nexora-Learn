import { DocContent } from "@/types/docs";

export const dynamicsArchitecture: DocContent = {
  title: "Dynamics Architecture",
  description:
    "Dynamics 365 CRM applications are built on a strict layered architecture. Understanding these layers dictates where data lives, where custom code goes, and how components communicate.",
  content: `
## Introduction

The Dynamics 365 platform is not a single monolithic application — it is a stack of interconnected abstraction layers. Each layer has a specific, strict responsibility. Understanding how they fit together is the most critical prerequisite before you start writing custom code.

This page covers the architecture of the **CRM / Dataverse side** of Dynamics 365 (Sales, Customer Service, Field Service, etc.).

## The 4 Architectural Layers

From the bottom up, the platform has four main layers:

\`\`\`text
┌──────────────────────────────────────────────┐
│           User Interface Layer               │
│    (Browser, Model-Driven Apps, Canvas Apps) │
├──────────────────────────────────────────────┤
│           Business Logic Layer               │
│   (Plugins, Workflows, Power Automate,       │
│    JavaScript, Business Rules)               │
├──────────────────────────────────────────────┤
│           Data Layer (Dataverse)             │
│   (Tables, Security Model, Event Pipeline,   │
│    OData REST API)                           │
├──────────────────────────────────────────────┤
│           Infrastructure Layer               │
│      (Microsoft Azure, Entra ID,             │
│       Azure SQL, Blob Storage)               │
└──────────────────────────────────────────────┘
\`\`\`

## Layer 1 — Infrastructure (Azure)

The entire platform runs as a true SaaS on **Microsoft Azure**. You do not manage this layer — Microsoft does. It provides:

- **Microsoft Entra ID** (formerly Azure AD) — Handles all user authentication, MFA, and identity.
- **Azure SQL Elastic Pools** — The underlying highly-available database engine behind Dataverse.
- **Azure Blob Storage** — Stores file attachments and document content (to keep the SQL database lean).
- **Azure Service Bus** — Used heavily behind the scenes for asynchronous messaging and plugin execution.

*Architectural Rule:* As a developer, you interact with this layer indirectly through APIs. You never configure the Azure SQL database directly. You do not have SQL Server Management Studio access.

## Layer 2 — Data Layer (Dataverse)

**Dataverse** is the core of everything. It is not just a database; it is a managed cloud API abstraction layer sitting on top of Azure SQL. All Dynamics 365 CRM data lives here.

Dataverse provides:
- **Tables and Columns** — The structured relational data model.
- **Security Model** — The complex role-based access control engine that runs at the row and column level.
- **Event Pipeline** — The core engine that fires events whenever records are created, updated, or deleted. This is what your custom code hooks into.
- **Web API** — The OData REST API that exposes all Dataverse data to the outside world securely.

## Layer 3 — Business Logic

This is where developers and solution architects spend most of their time. The business logic layer sits between the data and the user interface.

It includes:
- **Plugins (C#)** — Strictly synchronous server-side code that runs inside the Dataverse Event Pipeline. Used for complex validations and transactional logic.
- **Power Automate Flows** — Asynchronous low-code automations running in the background.
- **Business Rules** — Declarative logic running on the form or server.
- **JavaScript (Client API)** — Code that runs purely in the user's browser to manipulate the UI (show/hide fields, calculate totals on the fly).

## Layer 4 — User Interface

Users interact with Dynamics 365 through presentation layers built on top of the layers below.

- **Model-Driven Apps** — The primary interface for Dynamics 365 CRM. The UI is completely metadata-driven, generated automatically from the Dataverse table structure.
- **Canvas Apps** — Fully custom UIs built in Power Apps, used for task-based mobile scenarios.
- **Power Pages** — External-facing websites connected directly to Dataverse, used for customer/partner portals.

## How a Request Flows Through the System

When a user saves an Account record in Dynamics 365, this is the architectural flow:

1. The user clicks **Save** in the browser (UI Layer).
2. Any **JavaScript** on the form runs first, executing client-side validation.
3. The browser form sends an HTTP PATCH request to the **Dataverse Web API**.
4. Dataverse receives the request and fires the **Event Pipeline**:
   - **Pre-Validation** — C# Plugins registered here run before the transaction starts (e.g., checking if the user is allowed to save).
   - **Pre-Operation** — C# Plugins registered here run inside the transaction, before the SQL save (e.g., formatting a phone number).
   - **Main Operation** — Dataverse executes the actual Azure SQL update.
   - **Post-Operation** — C# Plugins registered here run after the record is written, but inside the transaction (e.g., creating a related Welcome Task).
5. The record is now saved. Any asynchronous Power Automate flows triggered by the save are dropped into an Azure Service Bus queue for background processing.

## Environments and Tenants

Every Dynamics 365 organization starts with a **Tenant** — a dedicated instance of Microsoft services assigned to a company (e.g., \\\`contoso.onmicrosoft.com\\\`).

Within a tenant, you create **Environments**. Each environment is a separate, physically isolated instance of Dataverse and its applications.

You develop in a DEV environment, export your customizations as a **Solution** (a ZIP file), and import that Solution into the UAT and PROD environments via Azure DevOps pipelines.

## Things to Remember

- Dynamics 365 is deeply layered: **Azure → Dataverse → Business Logic → UI**.
- **Dataverse is not just SQL**; it is a full API and security abstraction layer.
- The **Event Pipeline** is the heart of the system where all C# Plugins execute.
- **Model-Driven Apps** are just metadata-driven UI shells sitting on top of Dataverse.

## What's Next

Before you start building inside this architecture, you need to understand **Dynamics 365 Licensing** — how access is granted and what it costs the enterprise.
  `.trim(),
};
