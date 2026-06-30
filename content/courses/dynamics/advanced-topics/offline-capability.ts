import { DocContent } from "@/types/docs";

export const offlineCapability: DocContent = {
  title: "Offline Capability in Dynamics 365 and Power Apps",
  description:
    "Design resilient Model-Driven and Canvas Apps that function seamlessly when field workers lose internet connectivity, ensuring business continuity and productivity.",
  content: `
## Introduction: Ensuring Business Continuity in Disconnected Environments

Microsoft Dynamics 365 and Power Apps are primarily cloud-based applications, relying on an internet connection to interact with Dataverse, their underlying data platform. However, many enterprise scenarios involve mobile workers operating in environments with unreliable or non-existent internet access. Imagine HVAC repair technicians in concrete basements, oil rig workers in remote locations, or sales representatives in rural areas. If these field workers cannot access critical information like work orders, customer details, or inventory, or if they cannot record their activities, business operations grind to a halt.

To address this critical challenge, architects and developers must implement **Offline Capability**. This feature allows users to continue working with their applications even when disconnected, synchronizing data with Dataverse once connectivity is restored. It's a cornerstone for maintaining productivity and data integrity in the field.

## Model-Driven Apps: The "Offline-First" Paradigm

For Model-Driven Apps, especially those used in Dynamics 365 Field Service, Microsoft has engineered a robust **"Offline-First"** architecture. This approach prioritizes the local device experience, making the application highly responsive and reliable regardless of network conditions.

### How Model-Driven App Offline Works

1.  **Offline Profile Configuration:** An administrator defines an "Offline Profile" within the **Power Platform admin center (PPAC)**. This profile is crucial, as it explicitly dictates:
    *   Which Dataverse tables (entities) are available offline.
    *   Which specific rows (records) from those tables should be downloaded to the device, often using filters based on user, date, or location (e.g., "Only download Work Orders assigned to the current user for the next 7 days").
    *   The relationships between tables that need to be maintained offline.
2.  **Initial Data Synchronization:** When the user (e.g., a technician) opens the app while connected to the internet (e.g., on Wi-Fi in the morning), the app downloads a localized **SQLite database** directly to their iOS or Android device. This database contains all the data specified in their assigned Offline Profile.
3.  **Offline-First Execution:** Once synchronized, the app *always* reads and writes data to this local SQLite database, even if the device has perfect cellular reception. This design choice makes the app incredibly fast and responsive, as it avoids network latency for every operation.
4.  **Background Synchronization:** As the user makes changes (e.g., marks a Work Order as "Complete", adds a new service task), these modifications are recorded in the local database. Whenever an internet connection is detected, the app silently and automatically syncs these **delta changes** (only the modifications, not the entire dataset) back to Dataverse in the background.

#### Text Diagram: Model-Driven App Offline Sync Flow

\`\`\`
[User Device]
    |
    | 1. Admin Configures Offline Profile (PPAC)
    V
[Dataverse] <---------------------------------------------------
    |                                                           |
    | 2. Initial Sync (Full Data based on Profile)              |
    V                                                           |
[Local SQLite DB on Device] <-----------------------------------
    |                                                           |
    | 3. App Reads/Writes Locally (Offline-First)               |
    V                                                           |
[User Interacts with App] --------------------------------------
    |                                                           |
    | 4. Background Sync (Delta Changes) when Online            |
    V                                                           |
[Dataverse] ----------------------------------------------------
\`\`\`

### When to Use Model-Driven App Offline

*   **Standard Business Processes:** When your offline needs align with the out-of-the-box capabilities and forms of Model-Driven Apps (e.g., Field Service, Sales, Inspections).
*   **Rapid Development:** Leveraging the built-in offline capabilities significantly reduces development time and complexity compared to custom solutions.
*   **Robustness and Performance:** The "Offline-First" architecture provides excellent performance and reliability with minimal developer effort.
*   **Large User Bases:** Managing offline for many users is simplified through centralized profile management.

## Conflict Resolution: Last Write Wins

A common challenge in offline scenarios is **data conflicts**. What happens if a technician updates an Account record offline, but an internal sales representative simultaneously updates the exact same Account in the live Dataverse database?

Dataverse automatically handles these conflicts using a **Last Write Wins** policy. The offline app tracks the precise timestamp when the technician saves their changes on the device. When the device regains connectivity and attempts to sync, Dataverse compares the technician's save timestamp with the timestamp of the internal sales representative's save. The change with the most recent timestamp is applied, overwriting the older modification.

While "Last Write Wins" is the default and often sufficient, it's crucial to understand its implications. In some critical business scenarios, a "Last Write Wins" policy might lead to data loss if the overwritten change was vital. For such cases, advanced custom logic (not out-of-the-box) would be required to implement more sophisticated conflict resolution strategies, such as merging changes or prompting the user.

## Canvas Apps: Manual Offline Logic with Power Fx

Unlike Model-Driven Apps, which provide automatic offline synchronization, **Canvas Apps** require the developer to manually implement the caching and synchronization logic using Power Fx functions. This approach offers maximum flexibility and control over the user experience and data handling.

**Power Fx** is the low-code language used in Power Apps. To enable offline functionality in a Canvas App, developers primarily use two Power Fx functions:

1.  **\`LoadData(CollectionName, Key)\`**: Reads a cached JSON **collection** (an in-memory table of data) from the mobile device's local storage into the app's memory. The \`Key\` parameter is a unique identifier for the cached data.
2.  **\`SaveData(CollectionName, Key)\`**: Writes the current in-memory collection back to the mobile device's local storage.

The developer must write explicit Power Fx logic, often utilizing the \`Connection.Connected\` property, to determine the device's internet status:

*   **If \`Connection.Connected\` is \`true\` (online):** The app should directly interact with Dataverse using functions like \`Patch()\`, \`SubmitForm()\`, or \`Collect()\` to update the live data.
*   **If \`Connection.Connected\` is \`false\` (offline):** The app should \`Collect()\` data to a local in-memory collection, then use \`SaveData()\` to persist this collection to the device's local storage. When connectivity is restored, the app must then read this stored data using \`LoadData()\` and \`Patch()\` it to Dataverse.

#### Power Fx Example: Basic Offline Save Logic

\`\`\`powerfx
// On App.OnStart or a screen's OnVisible property
// Initialize or load data based on connection status
If(Connection.Connected,
    // If online, load data directly from Dataverse
    ClearCollect(colItems, 'My Dataverse Table');
Else(
    // If offline, load data from local storage
    LoadData(colItems, "MyOfflineItems");
);

// On a button's OnSelect property to save data
If(Connection.Connected,
    // If online, patch directly to Dataverse
    Patch('My Dataverse Table', Defaults('My Dataverse Table'), { Title: TextInput1.Text });
Else(
    // If offline, collect to local collection and save
    Collect(colItems, { Title: TextInput1.Text, IsSynced: false }); // Add a flag for sync status
    SaveData(colItems, "MyOfflineItems");
    Notify("Saved offline. Will sync when online.", NotificationType.Information);
);

// On App.OnStart or a screen's OnVisible property (after initial LoadData)
// Logic to sync pending offline changes when online
If(Connection.Connected,
    ForAll(Filter(colItems, IsSynced = false),
        Patch('My Dataverse Table', Defaults('My Dataverse Table'), { Title: ThisRecord.Title });
        // After successful patch, update the local collection to reflect synced status
        // or remove the item if it's no longer needed in the local queue.
        // For simplicity, we'll just refresh the entire collection from Dataverse.
    );
    ClearCollect(colItems, 'My Dataverse Table'); // Refresh with latest from Dataverse
    SaveData(colItems, "MyOfflineItems"); // Update local cache with fresh data
);
\`\`\`

#### Text Diagram: Canvas App Offline Logic Flow

\`\`\`
[User Device]
    |
    | 1. App Checks Connection.Connected
    |
    +--- IF Online ---+                       +--- IF Offline ---+
    |                 |                       |                  |
    V                 V                       V                  V
[Direct Dataverse]  [Patch/Collect]         [Local Collection] [SaveData to Local Storage]
    ^                 ^                       ^                  ^
    |                 |                       |                  |
    +-----------------+                       +------------------+
    |                                         |
    | 2. User Interacts with App              |
    |                                         |
    +--- IF Online (later) ---+               |
    |                         |               |
    V                         V               |
[LoadData from Local] -> [Patch to Dataverse]
\`\`\`

### When to Use Canvas App Offline

*   **Highly Custom User Interface:** When the standard Model-Driven forms are insufficient, and you need pixel-perfect control over the UI/UX.
*   **Specific Data Subsets:** When you only need to cache a very small, specific subset of data that doesn't require complex relationships or filtering logic.
*   **Complex Offline Business Logic:** When you need fine-grained control over how data is handled, validated, or transformed while offline, beyond what Model-Driven apps offer.
*   **Proof-of-Concept or Simple Apps:** For simpler scenarios where the overhead of an Offline Profile is too much, or for quick prototypes.

## Decision Making: Model-Driven vs. Canvas App Offline

Choosing between Model-Driven and Canvas App offline capabilities depends on your project's requirements, complexity, and development resources.

| Feature / Consideration | Model-Driven App Offline (Offline-First)                               | Canvas App Offline (LoadData/SaveData)                                |
| :---------------------- | :--------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| **Development Effort**  | Low (Configuration-based via Offline Profile)                          | High (Manual Power Fx coding for all sync logic)                      |
| **Complexity**          | Handles complex relationships, filtering, and sync automatically       | Requires manual handling of relationships, filtering, and sync logic  |
| **User Experience**     | Standardized forms, consistent UI, fast local performance              | Highly customizable UI, performance depends on developer's logic      |
| **Data Volume**         | Designed for larger, filtered datasets with relationships              | Best for smaller, simpler datasets                                    |
| **Conflict Resolution** | Automatic "Last Write Wins"                                            | Must be custom-implemented in Power Fx                                |
| **Server-Side Logic**   | Plugins/Workflows fire on sync to Dataverse                            | Plugins/Workflows fire on sync to Dataverse                           |
| **Maintainability**     | Centralized profile management, less code to maintain                  | More Power Fx code to maintain, higher risk of bugs                   |
| **Best For**            | Field Service, Sales, Inspections, standard business processes         | Highly specialized UIs, simple data entry, specific custom workflows  |

Microsoft generally recommends the Model-Driven App "Offline-First" approach for most enterprise scenarios requiring robust offline capabilities due to its ease of configuration, built-in reliability, and performance. Canvas App offline is powerful for niche requirements where extreme UI customization or very specific offline logic is paramount.

## Limitations and Considerations

Implementing offline capabilities introduces several important considerations and limitations:

*   **Data Volume and Filtering:** Mobile devices have limited RAM and storage. You *must* aggressively filter the data downloaded to the device. Attempting to sync tens of thousands of records or entire databases will lead to app crashes, extremely long initial sync times, and poor user experience. Design your Offline Profiles (Model-Driven) or \`LoadData\` queries (Canvas) to retrieve only essential, relevant data.
*   **Server-Side Logic (Plugins, Workflows, Cloud Flows):** C# plugins, real-time workflows, and Power Automate cloud flows execute on the Dataverse server. They *do not* fire when a user is offline and interacting with the local database. Any business logic dependent on these server-side components will only execute once the device regains connectivity and successfully synchronizes the changes to Dataverse. Client-side JavaScript (Model-Driven) or Power Fx (Canvas) can still execute offline.
*   **Initial Synchronization Time:** The first sync can take a significant amount of time, especially if the dataset is large. Users need to be aware of this and ideally perform the initial sync on a stable, fast network connection.
*   **Data Staleness:** Offline data is only as current as the last successful synchronization. Users might be working with slightly outdated information. The UI should ideally indicate when data was last synced.
*   **Security Implications:** Data stored locally on a mobile device is a security risk if the device is lost or stolen. Implement device-level security measures (e.g., encryption, remote wipe capabilities) in conjunction with offline apps.
*   **Complex Business Logic:** Replicating complex server-side business logic (e.g., intricate calculations, data validations requiring external lookups) within an offline client can be challenging and error-prone.
*   **User Experience (UX) Design:** It's crucial to design the app's UI/UX to clearly communicate the current online/offline status, pending syncs, and potential conflicts to the user.

## Best Practices for Offline Apps

To build robust and user-friendly offline applications, consider these best practices:

*   **Aggressive Data Filtering:** This is paramount. Only download the absolute minimum data required for the user's role and immediate tasks. Use precise filters in Model-Driven Offline Profiles or \`Filter()\` functions in Canvas Apps.
*   **Clear UI/UX for Offline Status:**
    *   Visually indicate when the app is offline (e.g., a banner, icon).
    *   Show when data is syncing or when a sync has failed.
    *   Provide feedback when an action is performed offline and will sync later.
*   **Graceful Error Handling:** Implement robust error handling for sync failures, network issues, and data conflicts. Inform the user clearly and provide options for resolution where possible.
*   **Thorough Testing:** Test all offline scenarios extensively, including:
    *   Initial sync on various network conditions.
    *   Making changes offline and syncing.
    *   Conflict resolution scenarios.
    *   App behavior when connectivity is intermittent.
    *   Performance on different device types.
*   **User Training:** Educate users on how the offline functionality works, what to expect, how to initiate syncs (if manual), and what to do in case of conflicts or sync failures.
*   **Security Measures:** Ensure mobile devices are secured with passcodes, encryption, and consider Mobile Device Management (MDM) solutions for remote wiping capabilities.
*   **Optimize for Performance:** Design forms and views to be efficient. Minimize the number of fields and sub-grids loaded, especially in Model-Driven Apps.
*   **Consider Client-Side Logic:** For immediate feedback and basic validations, use client-side JavaScript (Model-Driven) or Power Fx (Canvas) that can execute offline.

## Common Mistakes to Avoid

*   **Not Filtering Data Sufficiently:** This is the most common mistake, leading to poor performance, crashes, and long sync times.
*   **Assuming Server-Side Logic Runs Offline:** Forgetting that plugins, workflows, and cloud flows only execute when data syncs to Dataverse can lead to unexpected behavior or data inconsistencies.
*   **Poor or Missing Offline Status Indicators:** Users get confused if they don't know whether they are online, offline, or if their data is syncing.
*   **Ignoring Conflict Resolution:** Relying solely on "Last Write Wins" without understanding its business implications for critical data. For Canvas Apps, not implementing any conflict resolution at all.
*   **Lack of Error Handling for Sync Failures:** Users need to know if their data failed to sync and what steps they can take.
*   **Inadequate Testing:** Only testing online scenarios or basic offline functionality, missing edge cases like intermittent connectivity or large data changes.
*   **Storing Sensitive Data Unencrypted:** Exposing confidential information if a device is compromised.

## Things to Remember

*   **Model-Driven Apps** use a robust **"Offline-First"** architecture with a configurable **Offline Profile** and a local **SQLite database** for performance and reliability.
*   **Dataverse** handles conflicts in Model-Driven Apps using a **Last Write Wins** policy.
*   **Canvas Apps** require developers to manually implement offline logic using **\`LoadData\`** and **\`SaveData\`** Power Fx functions, often combined with \`Connection.Connected\`.
*   **Aggressively filter data** to prevent performance issues, crashes, and long sync times on mobile devices.
*   **Server-side logic** (plugins, workflows, cloud flows) **does not execute offline**; it only runs when data syncs to Dataverse.
*   Design for a clear **User Experience (UX)**, indicating online/offline status and sync progress.

## Related Topics

*   [Configure Mobile Offline for Model-Driven Apps](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/configure-mobile-offline)
*   [Power Fx \`LoadData\` and \`SaveData\` functions](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-savedata-loaddata)
*   [Power Platform admin center (PPAC) Overview](https://learn.microsoft.com/en-us/power-platform/admin/admin-overview)
*   [Designing User Experience for Mobile Apps](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/design-ux-mobile)
*   [Dataverse Security Roles and Privileges](https://learn.microsoft.com/en-us/power-platform/admin/security-roles-privileges)
  `.trim(),
};