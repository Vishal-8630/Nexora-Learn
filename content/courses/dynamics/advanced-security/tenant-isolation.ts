import { DocContent } from "@/types/docs";

export const tenantIsolation: DocContent = {
  title: "Tenant Isolation",
  description:
    "Preventing cross-tenant data exfiltration when consultants or vendors access your environment.",
  content: `
## The Cross-Tenant Vulnerability

Imagine your company (Contoso) hires a consulting firm (Fabrikam) to build a Power Automate flow in your environment.

The Fabrikam consultant logs into your Contoso environment. They build a Flow that connects to Dataverse (Business Data). They then add an Outlook action to email the data. 

**The Vulnerability:** When the consultant signs into the Outlook connector, they don't use their Contoso guest account. They use their personal \`consultant@fabrikam.com\` email address. The Flow runs, extracts your Contoso data, and emails it out through the Fabrikam tenant.

Your DLP policies won't catch this because Outlook is categorized as "Business Data".

---

## The Solution: Tenant Isolation

Tenant Isolation is a Power Platform setting that acts as a hard boundary around your Azure AD tenant.

When Tenant Isolation is **Turned On**:
*   A user logged into your Contoso environment **cannot** create a connection using an identity from a different tenant (like Fabrikam).
*   Conversely, a user logged into a Fabrikam environment cannot create a connection back into your Contoso Dataverse environment.

### How to Enable It
1. Go to Power Platform Admin Center > Policies > **Tenant Isolation**.
2. Turn the toggle to **On**.

---

## Managing Exceptions (Allow-Lists)

If you turn on strict Tenant Isolation, you might break legitimate business processes. For example, if your Contoso HR system explicitly needs to push data to a vendor's tenant via Power Automate.

Tenant Isolation supports **One-Way or Two-Way Allow Lists**.

You can add the specific Tenant ID of your vendor to the Allow List, granting the platform explicit permission to allow connections only to that specific external organization, while blocking all others.
`,
};
