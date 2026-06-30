import { DocContent } from "@/types/docs";

export const relationships: DocContent = {
  title: "Relationships in Dataverse",
  description:
    "Relationships define how tables in Dataverse connect to one another. Learn about One-to-Many, Many-to-Many, Cascading behaviors, and how to model data correctly.",
  content: `
## Introduction

A database is only as useful as its ability to connect data together. An \\\`Account\\\` is not very useful unless you can see all the \\\`Contacts\\\` that work there, the \\\`Opportunities\\\` they are negotiating, and the \\\`Cases\\\` they have submitted.

In Dataverse, you connect Tables together using **Relationships**.

## What is it?

A **Relationship** is a structural link between two tables that tells Dataverse how rows in those tables relate to one another. 

When you create a relationship, Dataverse automatically handles the complex underlying SQL joins. More importantly, relationships automatically create navigation links in Model-Driven Apps, allowing users to seamlessly click from a parent record to view a grid of related child records.

## Types of Relationships

There are two primary types of relationships in Dataverse:

### 1. One-to-Many (1:N) & Many-to-One (N:1)
This is the most common relationship. A single record in the primary (parent) table can be associated with multiple records in the related (child) table.

- **1:N Example:** One \\\`Account\\\` can have Many \\\`Contacts\\\`. 
- **N:1 Example:** From the perspective of the Contact, Many \\\`Contacts\\\` belong to One \\\`Account\\\`.

*How it works:* When you create a 1:N relationship, Dataverse automatically creates a **Lookup Column** on the child table. To link a Contact to an Account, the user selects the Account in the Contact's lookup column.

### 2. Many-to-Many (N:N)
A record in the first table can be associated with multiple records in the second table, and vice-versa.

- **N:N Example:** An \\\`Event\\\` can have Many \\\`Contacts\\\` attending, and a single \\\`Contact\\\` can attend Many \\\`Events\\\`.

*How it works:* There is no lookup column on either table. Instead, Dataverse creates a hidden "Intersect Table" in the SQL background that keeps track of the connections. You display these relationships using subgrids on the forms of both tables.

## Decision Making: Native N:N vs Manual Intersect

When building a Many-to-Many relationship, you have a crucial architectural choice:

**Use a Native N:N when:**
- You only need to know *that* they are connected. (e.g., This Contact is attending this Event).

**Use a Manual Intersect Table (Two 1:N relationships) when:**
- You need to track metadata *about* the connection. For example, if you need to know *when* the Contact registered for the Event, or if they paid for a VIP ticket, you cannot use a native N:N because you cannot add columns to the hidden intersect table. You must create a custom \\\`Event Registration\\\` table.

## Cascading Behaviors

When you create a 1:N relationship, you aren't just creating a link; you are defining how the tables interact when major events happen. This is called **Cascading Behavior**.

If I delete an \\\`Account\\\`, what should happen to all the \\\`Contacts\\\` linked to it? 

You define this by selecting the relationship type:

1. **Parental:** The child record is entirely dependent on the parent. If the Account is deleted, the Contacts are deleted. If the Account is reassigned to a new owner, the Contacts are reassigned to that new owner. 
2. **Referential:** The child records are independent. They are just linked. If the Account is deleted, the Contacts remain in the system, but their lookup column is cleared.
3. **Referential, Restrict Delete:** If the Account is deleted, the system throws an error and prevents the deletion until all related Contacts are manually removed or unlinked first.
4. **Custom:** You manually define the cascading rule for every action (Assign, Reparent, Share, Delete).

## Common Mistakes

> [!WARNING]
> **Database Locking from Cascading Assigns** 
> A very common enterprise mistake is creating a Parental relationship on a table with massive amounts of children. If a user reassigns an Account that has 50,000 child Activities, Dataverse will synchronously attempt to reassign all 50,000 Activities. This locks the database tables and causes severe SQL timeouts. 
> **Fix:** In enterprise scenarios, use Custom cascading and configure Assign to "Cascade None", then handle the security via background processes or hierarchy security models.

## Things to Remember

- **1:N relationships** create a Lookup column on the child table.
- **N:N relationships** use a hidden intersect table (which cannot hold custom columns).
- **Cascading Behaviors** dictate what happens to child records when the parent is deleted, assigned, or shared.

## What's Next

Now that our database schema is built with Tables, Columns, and Relationships, we need to enforce logic on how users interact with the data. Next, we will cover **Business Rules**.
  `.trim(),
};
