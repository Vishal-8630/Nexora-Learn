import { DocContent } from "@/types/docs";

export const powerPagesAuth: DocContent = {
  title: "Power Pages with Authentication",
  description:
    "Architect a secure, external-facing portal using Power Pages, Azure B2C authentication, and strict Table Permissions.",
  content: `
## The Business Requirement

"We need a customer support portal (website). Our customers must be able to log in, view their previous Support Cases, and submit new ones. The data must read and write directly to Dataverse in real-time. Obviously, Customer A should absolutely never be able to see Customer B's cases."

## The Naive Approach

A beginner might build a custom React Single Page Application (SPA), host it on Azure App Service, and write a complex Node.js backend that authenticates users, caches a Dataverse Application User token, and attempts to proxy OData requests while manually writing SQL-like \`WHERE CustomerId = 'A'\` filters in the Node.js code to prevent data leakage.
- **Why it fails:** Building custom portals is expensive. Writing custom middleware to enforce row-level security is extremely prone to human error. If a developer forgets a \`WHERE\` clause, Customer A sees Customer B's data, resulting in a massive compliance breach.

## The Enterprise Architecture

The architect uses **Power Pages**, the native external portal solution for Dataverse.

### 1. Identity Provider (Azure AD B2C)
Power Pages supports multiple identity providers (Local Login, LinkedIn, Google). For enterprise security, the architect configures **Azure AD B2C**.
When a customer registers on the portal, they create a credential in Azure B2C. Behind the scenes, Power Pages automatically maps that B2C login to a physical **Contact** record in the Dataverse database.

### 2. Web Roles
Just as internal users have Security Roles, external portal users have **Web Roles**. 
The architect assigns all authenticated customers to the "Authenticated User" Web Role. 

### 3. Table Permissions (Row-Level Security)
This is the most critical step. The architect creates a **Table Permission** for the \`Case\` table and links it to the "Authenticated User" Web Role.

They define the Access Type as **Contact Access**. 
This tells the Power Pages engine: *"When this user queries the Case table, automatically intercept the query and inject a filter so they only retrieve Cases where the 'Customer' lookup field exactly matches their physical Contact GUID."*

### 4. Forms and Lists
Instead of writing React code, the architect uses the Power Pages Studio.
- They drop a **List** component onto the page, pointing it at the "Active Cases" Dataverse View. 
- They drop a **Basic Form** component onto the page, pointing it to the Dataverse "Create Case" form.

Because Table Permissions are enforced at the server level, the List component automatically filters the grid. Customer A will seamlessly only see Customer A's cases. No custom code is required.

## Things to Remember

- Use **Power Pages** for external-facing Dataverse portals.
- Use **Azure AD B2C** for secure, scalable customer authentication.
- External security is managed via **Web Roles** and **Table Permissions**.
- **Contact Access** Table Permissions are the bulletproof way to enforce Row-Level Security without writing custom filter code.
  `.trim(),
};
