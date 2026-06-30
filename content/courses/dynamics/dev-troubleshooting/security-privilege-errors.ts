import { DocContent } from "@/types/docs";

export const securityPrivilegeErrors: DocContent = {
  title: "Decoding Security Privilege Errors",
  description:
    "How to translate and resolve the dreaded 'Principal user is missing prvRead...' exceptions.",
  content: `
## The Most Common Dynamics Error

If you develop on Dynamics 365 for more than a week, you will encounter a screen displaying this error:

> \`Principal user (Id=81a2..., type=8, roleCount=2, privilegeCount=120, accessMode=0) is missing prvReadAccount privilege (Id=12b3...) on OTC=1.\`

To a junior developer, this looks like a terrifying system crash. To a senior developer, it perfectly identifies exactly what is wrong.

---

## Decoding the Error String

Let's break down the error piece by piece:

### 1. \`Principal user (Id=81a2...)\`
This is the GUID of the user attempting the action. You can copy this GUID, append it to your URL (\`...main.aspx?pagetype=entityrecord&etn=systemuser&id=81a2...\`), and instantly see exactly who the user is.

### 2. \`missing prvReadAccount privilege\`
This is the exact action they are failing to perform. 
*   **prv**: Privilege
*   **Read**: The action (Create, Read, Write, Delete, Append, AppendTo, Assign, Share).
*   **Account**: The table they are trying to interact with.

### 3. \`OTC=1\`
OTC stands for **Object Type Code**. This is a legacy integer ID for the table. OTC 1 is always Account, OTC 2 is always Contact. (Custom tables have random OTCs like 10045).

---

## How to Fix It

The user's Security Roles do not grant them the right to Read an Account record.

**Step 1: Check the User's Roles**
Check the user record in CRM to see which Security Roles they have assigned.

**Step 2: Check the Role Configuration**
Open the Power Platform Admin Center, navigate to the Security Role, and go to the Core Records tab (where Account lives).
Ensure the user has a "Read" circle (Yellow, Green, or Full Green) on the Account row.

> [!CAUTION]
> **The Access Level Trap (Business Units)**
> A user might have "Local" (Yellow/Half-Circle) Read access to Accounts, meaning they can only read Accounts *owned by someone in their exact Business Unit*. If they are trying to read an Account owned by a user in a different Business Unit, they will still throw this exact error, even though they technically have "Read" access. You must check the Owner of the record they are trying to access.

---

## Automated Troubleshooting Tools

Manually cross-referencing GUIDs and Business Units is tedious. Professional developers use the **Access Checker** or **User Security Manager** plugins in XrmToolBox. 

These tools allow you to paste in the User GUID and the Record GUID, and they will calculate exactly why the user is blocked (e.g., "They are in BU 'Sales', but the record is owned by BU 'Marketing', and their role only grants BU-level read.").
`,
};
