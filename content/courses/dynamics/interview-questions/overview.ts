import { DocContent } from "@/types/docs";

export const interviewQuestionsOverview: DocContent = {
  title: "Interview Questions",
  description:
    "A comprehensive collection of Dynamics 365 and Power Platform interview questions, covering architecture, Dataverse, JavaScript, and Plugins.",
  content: `
## Introduction

Whether you are preparing for a job interview as a Dynamics 365 Technical Consultant, Developer, or Solution Architect, or you are looking to test a candidate, this guide covers the most frequent and critical technical questions asked in the industry.

## 1. Architecture & General Concepts

**Q: What is the architectural difference between Dynamics 365 and the Power Platform?**
**A:** Power Platform is the underlying technology stack (Dataverse database, Power Apps UI, Power Automate logic). Dynamics 365 Customer Engagement apps (Sales, Service, Marketing) are essentially massive, complex, pre-built Model-Driven Apps created by Microsoft that sit on top of the Power Platform and Dataverse.

**Q: Explain the difference between a Managed and Unmanaged solution.**
**A:** Unmanaged solutions are open and editable, used exclusively in Development environments. Managed solutions are sealed and locked, used in UAT and Production. Deleting an unmanaged solution only deletes the container; deleting a managed solution permanently deletes all tables and data associated with it, which is why it is used for Production deployments.

**Q: When would you architect a solution using Power Automate vs a C# Plugin?**
**A:** Use Power Automate for asynchronous background processes, complex multi-stage approvals, or connecting to external APIs (due to the 2-minute plugin timeout). Use a C# Plugin when the logic must be strictly synchronous (running instantly before the SQL save completes), requires complex math/algorithms, or requires absolute transactional rollback if an error occurs.

## 2. Dataverse & Security

**Q: What is the difference between an Organization-owned and User/Team-owned table?**
**A:** Organization-owned tables contain reference data—everyone in the organization can see all records or no records (e.g., a list of Countries). User/Team-owned tables have an "Owner" field, allowing for strict row-level security using Business Units and Security Roles (e.g., Accounts or Opportunities). You cannot change this setting after creation.

**Q: How does the security model work? (The core pillars)**
**A:** The security model is built on **Business Units** (the organizational hierarchy and data boundaries), **Security Roles** (the matrix of privileges like Read/Write/Delete and depth like User/BU/Global), and **Teams** (grouping users together). You assign users to a Business Unit and grant them Security Roles, usually via Teams.

**Q: What is a cascading rule in a Dataverse relationship?**
**A:** It defines how actions on a parent record flow down to child records. For example, if you Delete an Account, should all related Contacts be deleted (Cascade All/Parental), or should the relationship just be severed (Remove Link/Referential)? Getting this wrong can cause massive accidental data loss.

## 3. Form Scripting (JavaScript)

**Q: Why should you never use \`document.getElementById\` in Dynamics 365?**
**A:** It is unsupported DOM manipulation. Microsoft frequently updates the underlying HTML of the platform. If you manipulate the DOM directly, your code will break during a cloud update. Always use the supported \`formContext\` API (Xrm API).

**Q: What is the Execution Context and why do we pass it?**
**A:** The Execution Context provides secure access to the \`formContext\`. Since \`Xrm.Page\` was deprecated, you must explicitly check the "Pass execution context as first parameter" box on the event handler so your JavaScript function can interact with the form's data and controls safely.

**Q: What is the difference between \`getValue\` and \`getText\` on a lookup field?**
**A:** \`getValue\` returns an array of objects containing the GUID, entity type, and name of the referenced record. \`getText\` is not natively supported for lookups in the same way it is for OptionSets/Choices (where \`getValue\` returns the integer and \`getText\` returns the string label).

## 4. Plugins (C#)

**Q: What are the stages of the Plugin Execution Pipeline?**
**A:** 
1. **Pre-Validation (Stage 10):** Runs outside the database transaction, before security checks.
2. **Pre-Operation (Stage 20):** Runs inside the transaction, before the SQL save. Ideal for modifying the record being saved.
3. **Main Operation (Stage 30):** Internal SQL execution (No custom plugins allowed here).
4. **Post-Operation (Stage 40):** Runs inside the transaction, after the SQL save. Ideal for creating related records because the primary record now has a GUID.

**Q: What is the difference between the Target, a Pre-Image, and a Post-Image?**
**A:** 
- **Target:** The specific fields the user is changing right now in this exact transaction.
- **Pre-Image:** A snapshot of the record in the database *before* the change occurred.
- **Post-Image:** A snapshot of the record in the database *after* the change occurred.

**Q: How do you prevent an infinite loop in a plugin?**
**A:** You check the \`Depth\` property of the \`IPluginExecutionContext\`. If a plugin updates an Account, which triggers the same plugin again, the Depth increases. You write \`if (context.Depth > 1) return;\` to break the loop. Dataverse automatically kills any transaction that reaches Depth 8.

## Summary

> [!TIP]
> **Show Architectural Reasoning**
> In an interview, do not just recite definitions. **Provide scenarios.** If asked about Pre-Operation vs Post-Operation, give a real-world example of formatting a phone number (Pre) versus creating a Welcome Task (Post). Demonstrating architectural reasoning is always more impressive than memorizing syntax.
  `.trim(),
};
