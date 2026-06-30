import { DocContent } from "@/types/docs";

export const siteSettings: DocContent = {
  title: "Site Settings",
  description:
    "Learn how to configure global application variables, toggle features, and manage environment-specific configurations using Site Settings.",
  content: `
## Introduction

Power Pages is a highly configurable platform. Instead of hardcoding behavior into the backend server logic, the platform relies on **Site Settings**.

A Site Setting is simply a key-value pair stored in the \`adx_sitesetting\` Dataverse table. The Power Pages rendering engine reads these settings to determine how the site should behave.

## Why use Site Settings?

1. **Global Configuration:** If you need to change the behavior of the entire portal (e.g., turning off the ability for users to upload files), you simply change a Site Setting. You don't need to deploy code.
2. **Environment Variables:** If your portal integrates with an external API, the URL for that API will be different in Dev, QA, and Prod. You can store the URL as a Site Setting, allowing you to change it per environment without modifying your custom code.
3. **No Code Deployments:** Business Administrators can tweak portal behavior directly from the Portal Management App in production without waiting for a developer.

## Important Out-of-the-Box Site Settings

When a portal is provisioned, hundreds of site settings are created automatically. Here are the most critical ones developers interact with:

### DisableCustomPluginError
- **Name:** \`Site/EnableCustomPluginError\`
- **Value:** \`true\` or \`false\`
- **Purpose:** By default, if a user submits a form on the portal, and a synchronous C# Plugin crashes in Dataverse, the portal displays a generic "An unknown error occurred" message to prevent leaking system architecture to the public. Setting this to \`true\` forces the portal to display the actual C# \`InvalidPluginExecutionException\` string to the user. This is vital for developers handling validation errors.

### DisableValidationWebTemplate
- **Name:** \`DisableValidationWebTemplate\`
- **Value:** \`true\` or \`false\`
- **Purpose:** Power Pages has a strict internal firewall. If you write custom Liquid code that attempts to render a form the user doesn't have permissions for, the portal throws a massive Yellow Screen of Death. Toggling this allows developers to bypass some of the stricter Liquid validation rules during complex customizations.

### HTTP Headers
- **Name:** \`HTTP/X-Frame-Options\`
- **Value:** \`SAMEORIGIN\`
- **Purpose:** Security. If you want to embed your Power Pages site inside an \`<iframe>\` on another website (like a corporate intranet), you must configure the CORS and X-Frame-Options site settings, otherwise modern browsers will block the portal from rendering.

## Creating Custom Site Settings

Developers should heavily utilize Site Settings for their own custom architecture.

**Scenario:** You are writing custom JavaScript on the portal to query an external weather API.
Do not hardcode the API key in your JavaScript file!

1. Create a Site Setting named \`Contoso/WeatherApiKey\`.
2. Set the value to \`12345ABCDE\`.
3. In your Web Template (Liquid), read the Site Setting and inject it into your JavaScript safely.

\`\`\`liquid
<script>
    // Liquid reads the Site Setting from Dataverse and injects it into the JS variable
    var weatherApiKey = "{{ settings['Contoso/WeatherApiKey'] }}";
    
    // Call the external API using the key
    fetch("https://api.weather.com?key=" + weatherApiKey);
</script>
\`\`\`

## Clearing the Cache

> [!WARNING]
> The Power Pages rendering engine heavily caches the \`adx_sitesetting\` table. If you change a Site Setting value in Dataverse, the portal **will not instantly reflect the change**.
> You must manually clear the portal cache. You can do this by navigating to \`https://yourportal.powerappsportals.com/_services/about\` (while logged in as a Portal Administrator) and clicking **Clear Cache**.

## Things to Remember

- Site Settings are **key-value pairs** stored in Dataverse.
- Use them to avoid **hardcoding environment variables**.
- Some out-of-the-box settings control **global portal behavior and security**.
- You must **Clear the Cache** when updating a Site Setting.

## What's Next

Now that we understand how to configure the site, let's look at how to build interactive, single-page application (SPA) experiences on the portal using the **Power Pages Web API**.
  `.trim(),
};
