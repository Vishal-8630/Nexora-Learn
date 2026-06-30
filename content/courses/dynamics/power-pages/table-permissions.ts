import { DocContent } from "@/types/docs";

export const tablePermissions: DocContent = {
  title: "Table Permissions",
  description:
    "The absolute core of Power Pages security. Learn how to configure Access Types and privileges to restrict data visibility for external users.",
  content: `
## Introduction

In standard Dynamics 365 Model-Driven apps, security is controlled by **Security Roles** assigned to \`SystemUsers\`.

Power Pages users are **Contacts**, not \`SystemUsers\`. Therefore, standard Dynamics 365 Security Roles do not apply to them. 

If you place a Dataverse List of "Support Cases" on a Power Pages site without configuring security, the list will be completely empty. To expose Dataverse data to external users safely, you must configure **Table Permissions**.

## What is a Table Permission?

A Table Permission is a record (managed in the Portal Management app or Design Studio) that explicitly grants read, write, create, or delete access to a specific Dataverse table for portal users.

Every Table Permission must define an **Access Type** (Scope). This tells the portal *which* records the user is allowed to see.

## The 4 Access Types (Scopes)

### 1. Global Access
- **What it does:** Grants access to *every* record in the table.
- **Use Case:** You have a "Countries" or "Products" table. You want every user (or even anonymous users) to be able to see the entire list of products.
- **Danger Level:** High. Never use Global Access on tables containing PII (Personally Identifiable Information) like Cases, Orders, or Accounts.

### 2. Contact Access
- **What it does:** Grants access to records directly related to the logged-in user.
- **How it works:** You define the relationship between the Table and the Contact table. 
- **Use Case:** A user logs in and views the Support Cases list. The Table Permission is set to Contact Access via the \`incident_customer_contacts\` relationship. The user will *only* see Cases where they are listed as the Customer.

### 3. Account Access
- **What it does:** Grants access to records related to the user's *Company* (Account).
- **How it works:** The portal looks at the logged-in Contact, finds their \`ParentCustomer\` (Account), and then finds records related to that Account.
- **Use Case:** John and Jane both work for Contoso. If they have Account Access, John can see Jane's support cases, and Jane can see John's support cases, because they both belong to the Contoso Account.

### 4. Parent Access
- **What it does:** Cascades permissions from another Table Permission.
- **How it works:** You cannot set up Parent Access on its own; it must be a child of an existing permission.
- **Use Case:** You gave the user Contact Access to their **Order**. An Order has many **Order Lines**. You create a Parent Access permission on the Order Lines table, pointing up to the Order permission. Now, the user can see all Order Lines, but *only* for the Orders they are allowed to see.

## Privileges

Once you define the Access Type, you define the Privileges.

- **Read:** Can they see the data in a List?
- **Write:** Can they edit the data in a Form?
- **Create:** Can they insert new records?
- **Delete:** Can they delete records?
- **Append / Append To:** Can they link this record to other records (e.g., adding a Note to a Case)?

## The "Anonymous" Trap

When you create a Table Permission, it doesn't do anything until you assign it to a **Web Role** (which we will cover next).

> [!CAUTION]
> If you create a Global Access Table Permission with Read/Write/Delete privileges, and accidentally assign it to the **Anonymous Users** Web Role, you have just allowed anyone on the internet to delete your Dataverse records without logging in. Always audit your Table Permissions carefully.

## Bypassing Table Permissions

It is impossible for standard Power Pages UI components (Lists, Basic Forms, Advanced Forms, Web API) to bypass Table Permissions. The Power Pages rendering engine enforces them rigorously at the server level.

If a developer writes custom JavaScript attempting to query the Web API for a record they don't have Table Permissions for, the server will return a 403 Forbidden error.

## Things to Remember

- Power Pages completely ignores internal Dynamics 365 **Security Roles**.
- Use **Global Access** for public reference data.
- Use **Contact Access** for personal data.
- Use **Account Access** for B2B company-wide data.
- Table Permissions are rigorously enforced at the **server level**.

## What's Next

A Table Permission is useless on its own. It must be attached to a user. We do this by assigning Table Permissions to **Web Roles**.
  `.trim(),
};
