import { DocContent } from "@/types/docs";

export const fieldLevelSecurity: DocContent = {
  title: "Field Level Security (Column Profiles)",
  description:
    "How to mask and protect Highly Confidential (PII) data at the column level.",
  content: `
## Beyond Table-Level Security

Standard Security Roles dictate whether a user can Read or Write an entire **Account** record. But what if all Sales Users need to see the Account, but only the HR Manager is allowed to see the **Social Security Number** column on that Account?

You cannot solve this with a standard Security Role. You must use **Field Level Security** (now often called Column Security Profiles).

---

## How Field Security Works

By default, every column you create in Dataverse is readable and writable by anyone who has access to the record. 

When you enable Field Security on a column, Dataverse instantly strips Read, Update, and Create privileges for that specific column from *everyone in the entire system* (except System Administrators).

To give access back, you must create a **Column Security Profile**.

### Step-by-Step Configuration

1. **Enable the Column:**
   Go to the Table > Columns. Open your \`Social Security Number\` column. Expand Advanced Options, and check **Enable column security**.
   *(If you look at the app now, the field will display \`********\` to standard users).*

2. **Create the Profile:**
   Go to Power Platform Admin Center > Environments > Settings > Users + permissions > **Column security profiles**.
   Create a new profile named "HR PII Access".

3. **Configure Permissions:**
   Open the profile, go to the **Field Permissions** tab, find your column, and set Read, Update, and Create to **Yes**.

4. **Assign Users:**
   Go to the **Users** (or Teams) tab in the profile and add the HR Manager.

---

## The C# Plugin Impact

> [!WARNING]
> **Plugins run as the User!**
> If a C# plugin triggers on Account Update, and it attempts to read the \`Social Security Number\` column, but the user who clicked "Save" does not have the Column Security Profile, the \`Retrieve\` will silently return \`null\` for that column.

If your plugin absolutely must process that data (e.g., sending it to an external API), you must impersonate the **SYSTEM** user to bypass the Field Level Security check.

\`\`\`csharp
// The user's service (Will return null for secured fields they cannot see)
IOrganizationService userService = factory.CreateOrganizationService(context.UserId);

// The SYSTEM service (Can read the secured Social Security Number)
IOrganizationService systemService = factory.CreateOrganizationService(null);
\`\`\`
`,
};
