import { DocContent } from "@/types/docs";

export const security: DocContent = {
  title: "Security Model in Dataverse",
  description:
    "The Dataverse security model governs who can access what data. Understand Business Units, Security Roles, Teams, and Row-level vs Column-level security.",
  content: `
## Introduction

A CRM holds a company's most valuable and sensitive data: customer lists, revenue forecasts, and employee salaries. 

Not everyone in the organization should see everything. A sales rep in New York shouldn't see the deals being worked on by a rep in London. A junior clerk shouldn't be able to delete an Account. 

Controlling this access is the job of the **Dataverse Security Model**.

## What is it?

The Dataverse Security Model is a robust, role-based security framework. 

Unlike simple applications where you are either an "Admin" or a "User", Dataverse provides highly granular control over exactly which records a user can see, and what actions they can perform on those records, based on their position in the company hierarchy.

## Core Concepts

The security model is built on four foundational pillars:

### 1. Business Units (BU)
A Business Unit represents your organization's hierarchy. 
- Every environment has one "Root" Business Unit.
- You can create child BUs (e.g., "North America" and "Europe").
- Every User, Team, and record (if User/Team owned) belongs to exactly one Business Unit.

### 2. Users and Teams
A **User** is an individual person authenticated via Microsoft Entra ID. 
A **Team** is a group of users. 
- **Owner Teams:** Can own records directly (e.g., a "Tier 1 Support" team owning a Case). You can assign security roles directly to the Team.
- **Access Teams:** Used for dynamic, record-by-record sharing. They do not own records.

### 3. Privileges
A Privilege is the specific action you are allowed to take. There are 8 core privileges:
- **Create:** Make a new record.
- **Read:** View a record.
- **Write:** Edit an existing record.
- **Delete:** Remove a record.
- **Append:** Attach a child record to this record (e.g., attach a Note to an Account).
- **Append To:** Attach this record to a parent record.
- **Assign:** Change the owner of a record.
- **Share:** Grant access to a specific record to another user manually.

### 4. Access Levels (Depth)
For every privilege, you must define *how much* of the data they can apply it to. This is represented by visual circles (often called "pie slices").

- **None (Empty):** Cannot perform this action at all.
- **User (Quarter):** Can only perform the action on records *owned by them*.
- **Business Unit (Half):** Can perform the action on any record owned by anyone in *their* Business Unit.
- **Parent:Child BU (Three-Quarter):** Can perform the action on records in their BU, and any child BUs beneath them.
- **Organization (Full):** Can perform the action on any record in the entire system, regardless of who owns it.

## Security Roles (The Matrix)

A **Security Role** is simply a matrix combining Privileges and Access Levels for every table in the system.

\`\`\`text
Role: "Salesperson"
Table: Account
┌─────────┬─────────┬─────────┬─────────┐
│ Create  │ Read    │ Write   │ Delete  │
├─────────┼─────────┼─────────┼─────────┤
│ User    │ Org     │ User    │ None    │
└─────────┴─────────┴─────────┴─────────┘
\`\`\`
*(Meaning: They can see all accounts globally, but they can only edit the ones they own, and they cannot delete anything).*

You assign one or more Security Roles to a User or a Team. If a user has multiple roles, Dataverse takes the **least restrictive** combination of all their roles.

## Field-Level Security (Column Security)

Standard Security Roles apply to the entire *row*. If you can read the Account row, you can read all columns on it.

But what if you want everyone to see the \\\`Employee\\\` record, but only HR should see the \\\`Social Security Number\\\` column? 

You use **Column Security Profiles**. You enable Column Security on the specific field, and then create a profile granting Read/Update access to that field only to specific Teams or Users.

## Best Practices

- **Use Teams for assignment:** Instead of assigning 5 different Security Roles to 100 individual users manually, create an "Enterprise Sales" Team, assign the roles to the Team, and just add users to the Team via Entra ID groups. It is vastly easier to maintain.
- **Copy, don't edit standard roles:** Dataverse comes with standard roles (like "Salesperson"). Do not edit these directly. If a Microsoft system update modifies them, your changes might break. Copy the standard role, name it "Contoso Salesperson", and edit that.
- **Start restrictive:** Always start by granting the absolute minimum access required for a user to do their job, and expand it only when requested. 

## Common Mistakes

> [!CAUTION]
> **Granting "Organization" Delete privileges** 
> The most common disaster in Dynamics 365 is a Junior user accidentally mass-deleting 10,000 Accounts because their security role had a "Full Green Circle" for the Delete privilege. **Delete** should almost always be restricted to the User level or removed entirely for standard staff.

## Things to Remember

- **Business Units** map your company hierarchy and data boundaries.
- **Security Roles** define the matrix of Privileges (Read/Write) and Access Levels (User vs Org).
- **Column Security** restricts access to specific fields (like SSN or Salary).
- A user's total access is the sum of all their roles (least restrictive applies).

## What's Next

We have now covered the core database and security architecture of the platform. Next, we will explore how we safely deploy all these database customizations using **DevOps**.
  `.trim(),
};
