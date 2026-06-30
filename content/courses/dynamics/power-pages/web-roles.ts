import { DocContent } from "@/types/docs";

export const webRoles: DocContent = {
  title: "Web Roles",
  description:
    "Learn how to group Table Permissions, Page Restrictions, and users together using Web Roles in Power Pages.",
  content: `
## Introduction

If **Table Permissions** define *what* data can be accessed, **Web Roles** define *who* gets that access.

Web Roles in Power Pages are conceptually similar to Security Roles in Dynamics 365, but they are specifically designed for external portal users (Contacts).

## How Web Roles Work

1. You create a Web Role (e.g., "Partner Manager").
2. You attach multiple **Table Permissions** to this role.
3. You attach multiple **Webpage Access Control Rules** to this role.
4. You assign the Web Role to specific **Contact** records.

When a user logs into the portal, the system looks at their Contact record, checks their assigned Web Roles, and grants them the aggregate permissions of all those roles.

## The Two Special Web Roles

When you provision a Power Pages site, it comes with two special, out-of-the-box Web Roles that you must understand.

### 1. Anonymous Users Role
Any user who visits your portal without logging in is automatically granted the permissions of the "Anonymous Users" Web Role.
- You do not (and cannot) manually assign Contacts to this role.
- **Use Case:** You assign a Global Read Table Permission for the "Knowledge Article" table to this role, so anyone on the internet can read your public FAQ.

### 2. Authenticated Users Role
Any user who logs into your portal is automatically granted the permissions of the "Authenticated Users" Web Role, *in addition* to any specific roles you manually assigned them.
- You do not manually assign Contacts to this role.
- **Use Case:** You want every logged-in user to be able to edit their own Profile. You assign a Contact-Scoped Write Table Permission to this role. You don't have to worry about assigning a specific "Profile Editor" role to 100,000 customers; the Authenticated Users role handles it automatically.

## Webpage Access Control Rules

Table Permissions protect the raw data in Dataverse. But what if you want to hide an entire webpage (and its menu link) from a user?

You use **Webpage Access Control Rules**.

1. Navigate to the Portal Management app.
2. Create a Webpage Access Control Rule.
3. Set the scope to **Restrict Read**.
4. Select the specific Web Page you want to hide.
5. Assign the rule to a Web Role (e.g., "Partner Manager").

**Result:** If a regular customer logs in, they will not see the "Partner Dashboard" link in the header, and if they guess the URL (\`/partner-dashboard\`), the portal will throw an "Access Denied" error. If a Partner Manager logs in, they will see the page normally.

## Assigning Web Roles

For custom roles (e.g., "Premium Subscriber" or "Vendor Admin"), you must explicitly assign the role to the user's Contact record.

1. Open the Contact record in the standard Dynamics 365 Model-Driven app.
2. Navigate to the **Related** tab.
3. Select **Web Roles**.
4. Add the existing Web Role to the Contact.

In an enterprise architecture, you rarely do this manually. You typically build a Power Automate flow or a C# Plugin that automatically assigns Web Roles to Contacts based on business logic (e.g., when an Opportunity is Won, a Plugin automatically assigns the "Customer" Web Role to the primary contact).

## Things to Remember

- Web Roles group permissions and assign them to **Contacts**.
- Every visitor gets the **Anonymous Users** role.
- Every logged-in user gets the **Authenticated Users** role.
- Use **Webpage Access Control Rules** to hide entire pages and menu links based on Web Roles.

## What's Next

Now that security is handled, we need to look at how to configure global application behaviors (like enabling error logs or changing date formats) using **Site Settings**.
  `.trim(),
};
