import { DocContent } from "@/types/docs";

export const namingConventions: DocContent = {
  title: "Naming Conventions",
  description:
    "Enforce strict schema prefixes and C# naming standards to prevent collisions and ensure long-term codebase maintainability.",
  content: `
## Introduction

When multiple vendors or development teams work inside the same Dataverse tenant, overlapping schema names can destroy a database. 

If Vendor A creates a custom column called \\\`new_territory\\\` and Vendor B tries to install a solution that also contains a column called \\\`new_territory\\\` (but with a different data type), the deployment will fail catastrophically.

Naming conventions are the first line of defense for enterprise architecture.

## The Solution Publisher Prefix

Every Solution in Dataverse is tied to a **Publisher**.
The Publisher defines a strict schema prefix (between 2 and 8 characters).

> [!CAUTION]
> **Rule #1: Never use the default "new_" prefix.**
> If you see \\\`new_account\\\` in an enterprise environment, the architect has failed. It indicates that the developer used the default system publisher rather than establishing a corporate standard.

**Rule #2: Establish a corporate prefix.**
If your company is Contoso, create a Publisher named "Contoso Corporation" with the prefix \\\`cont_\\\`.
Every single custom table, column, and web resource created by your team will automatically be prefixed with \\\`cont_\\\` (e.g., \\\`cont_invoice\\\`). This guarantees your schema will never collide with a third-party AppSource vendor (who might use the \\\`msdyn_\\\` or \\\`sert_\\\` prefix).

## C# Code Conventions

Naming conventions extend far beyond the database schema; they are critical for the C# codebase. An enterprise Dataverse environment might have 500 custom plugins. If they are poorly named, debugging becomes impossible.

### 1. Project Naming
Use a standard dot-notation namespace that matches the corporate structure and the specific application.
- **Format:** \\\`[Company].[BusinessUnit].[Application].[Layer]\\\`
- **Example:** \\\`Contoso.Sales.Core.Plugins\\\`

### 2. Plugin Class Naming
Plugins are triggered by specific events (Messages) on specific tables (Entities) at specific times (Stages). The class name must explicitly tell the developer what it does without them having to open the Plugin Registration Tool.
- **Format:** \\\`[Entity][Message][Stage]\\\`
- **Example:** \\\`AccountPreValidationCreate\\\` or \\\`InvoicePostOperationUpdate\\\`

### 3. Early Bound Class Naming
When using the CrmSvcUtil (or PAC CLI) to generate Early Bound classes, map the generated classes to a distinct namespace (e.g., \\\`Contoso.Data.Entities\\\`) so they do not conflict with your custom business logic objects.

## Web Resource Naming

Web Resources (JavaScript, HTML, Images) are stored in a flat folder structure in Dataverse, making them incredibly difficult to organize.

Architects must enforce a virtual folder structure using slashes in the Web Resource name.
- **Bad:** \\\`cont_accountscript.js\\\`
- **Good:** \\\`cont_/scripts/account/main.js\\\`
- **Good:** \\\`cont_/images/icons/save_icon.png\\\`

**Why?** While Dataverse stores them flat in the database, modern developer tools (like Visual Studio and VS Code) will parse the slashes and display them as a clean, hierarchical folder tree, dramatically improving developer experience.

## Things to Remember

- Never use the **\\\`new_\\\`** publisher prefix.
- Establish a unique **Corporate Publisher Prefix** (e.g., \\\`cont_\\\`).
- C# Plugins must be named by **Entity, Message, and Stage** to make debugging easier.
- Fake a folder hierarchy in Web Resources using **slashes** in the schema name.

## What's Next

With conventions in place, we can start writing C# code. How do we share common logic across 50 different plugins? We use **Shared Libraries**.
  `.trim(),
};
