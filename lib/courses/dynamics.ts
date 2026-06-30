import { Course, NavGroup } from "@/types/docs";
import { allContent } from "@/content/courses/dynamics";

const groups: NavGroup[] = [
  {
    title: "Phase 1: Fundamentals",
    sections: [
      {
        title: "1. Introduction",
        slug: "introduction",
        items: [
          { title: "What is Dynamics 365", slug: "introduction/what-is-dynamics-365" },
          { title: "CRM vs ERP", slug: "introduction/crm-vs-erp" },
          { title: "Sales", slug: "introduction/sales" },
          { title: "Customer Service", slug: "introduction/customer-service" },
          { title: "Field Service", slug: "introduction/field-service" },
          { title: "Marketing", slug: "introduction/marketing" },
          { title: "Model-Driven Apps", slug: "introduction/model-driven-apps" },
          { title: "Canvas Apps", slug: "introduction/canvas-apps" },
          { title: "Power Pages", slug: "introduction/power-pages" },
          { title: "Business Central Overview", slug: "introduction/business-central" },
          { title: "Dynamics Architecture", slug: "introduction/dynamics-architecture" },
          { title: "Licensing", slug: "introduction/licensing" },
        ],
      },
      {
        title: "2. Power Platform",
        slug: "power-platform",
        items: [
          { title: "Overview", slug: "power-platform/overview" },
          { title: "Power Apps", slug: "power-platform/power-apps" },
          { title: "Dataverse", slug: "power-platform/dataverse" },
          { title: "Power Automate", slug: "power-platform/power-automate" },
          { title: "Power Pages", slug: "power-platform/power-pages" },
          { title: "Power BI", slug: "power-platform/power-bi" },
          { title: "Copilot", slug: "power-platform/copilot" },
          { title: "AI Builder", slug: "power-platform/ai-builder" },
          { title: "How Components Work Together", slug: "power-platform/architecture-integration" },
        ],
      },
      {
        title: "3. Developer Setup & Tooling",
        slug: "dev-setup",
        items: [
          { title: "Prerequisites & CLI", slug: "dev-setup/prerequisites-cli" },
          { title: "XrmToolBox Essentials", slug: "dev-setup/xrmtoolbox-essentials" },
          { title: "Browser Configuration", slug: "dev-setup/browser-configuration" },
          { title: "Early Bound Classes", slug: "dev-setup/early-bound-classes" },
        ],
      }
    ]
  },
  {
    title: "Phase 2: Data Modeling",
    sections: [
      {
        title: "4. Dataverse",
        slug: "dataverse",
        items: [
          { title: "Tables", slug: "dataverse/tables" },
          { title: "Columns", slug: "dataverse/columns" },
          { title: "Relationships", slug: "dataverse/relationships" },
          { title: "Auditing", slug: "dataverse/auditing" },
          { title: "Security", slug: "dataverse/security" },
          { title: "Business Rules", slug: "dataverse/business-rules" },
          { title: "Business Process Flows", slug: "dataverse/business-process-flows" },
          { title: "Alternate Keys", slug: "dataverse/alternate-keys" },
          { title: "Duplicate Detection", slug: "dataverse/duplicate-detection" },
        ],
      },
      {
        title: "5. Enterprise Data Management",
        slug: "data-management",
        items: [
          { title: "Dataflows", slug: "data-management/dataflows" },
          { title: "Azure Data Factory", slug: "data-management/azure-data-factory" },
          { title: "SSIS & KingswaySoft", slug: "data-management/ssis-kingswaysoft" },
          { title: "Bulk Deletion", slug: "data-management/bulk-deletion" },
        ],
      }
    ]
  },
  {
    title: "Phase 3: No-Code & Low-Code",
    sections: [
      {
        title: "6. Model-Driven Apps",
        slug: "model-driven-apps",
        items: [
          { title: "Forms", slug: "model-driven-apps/forms" },
          { title: "Views", slug: "model-driven-apps/views" },
          { title: "Dashboards", slug: "model-driven-apps/dashboards" },
          { title: "Charts", slug: "model-driven-apps/charts" },
          { title: "Site Map", slug: "model-driven-apps/sitemap" },
        ],
      },
      {
        title: "7. Power Automate",
        slug: "power-automate",
        items: [
          { title: "Overview", slug: "power-automate/overview" },
          { title: "Instant Flows", slug: "power-automate/instant-flows" },
          { title: "Automated Flows", slug: "power-automate/automated-flows" },
          { title: "Scheduled Flows", slug: "power-automate/scheduled-flows" },
          { title: "Dataverse Trigger", slug: "power-automate/dataverse-trigger" },
          { title: "Approvals", slug: "power-automate/approvals" },
          { title: "HTTP", slug: "power-automate/http" },
          { title: "Expressions", slug: "power-automate/expressions" },
          { title: "Error Handling", slug: "power-automate/error-handling" },
          { title: "Child Flows", slug: "power-automate/child-flows" },
          { title: "Solution-aware Flows", slug: "power-automate/solution-aware" },
        ],
      },
      {
        title: "8. Power Pages",
        slug: "power-pages",
        items: [
          { title: "Overview", slug: "power-pages/overview" },
          { title: "Sites", slug: "power-pages/sites" },
          { title: "Templates", slug: "power-pages/templates" },
          { title: "Authentication", slug: "power-pages/authentication" },
          { title: "Table Permissions", slug: "power-pages/table-permissions" },
          { title: "Web Roles", slug: "power-pages/web-roles" },
          { title: "Site Settings", slug: "power-pages/site-settings" },
          { title: "Web API", slug: "power-pages/web-api" },
          { title: "Liquid", slug: "power-pages/liquid" },
          { title: "JavaScript", slug: "power-pages/javascript" },
          { title: "Forms", slug: "power-pages/forms" },
          { title: "Lists", slug: "power-pages/lists" },
        ],
      }
    ]
  },
  {
    title: "Phase 4: Client-Side Customization",
    sections: [
      {
        title: "9. Web Resources",
        slug: "web-resources",
        items: [
          { title: "HTML", slug: "web-resources/html" },
          { title: "CSS", slug: "web-resources/css" },
          { title: "JavaScript", slug: "web-resources/javascript" },
          { title: "React", slug: "web-resources/react" },
          { title: "TypeScript", slug: "web-resources/typescript" },
          { title: "Images", slug: "web-resources/images" },
          { title: "RESX", slug: "web-resources/resx" },
        ],
      },
      {
        title: "10. JavaScript",
        slug: "javascript",
        items: [
          { title: "Form Scripting", slug: "javascript/form-scripting" },
          { title: "Xrm API", slug: "javascript/xrm-api" },
          { title: "Xrm.WebApi", slug: "javascript/xrm-webapi" },
          { title: "Dialogs", slug: "javascript/dialogs" },
          { title: "Navigation", slug: "javascript/navigation" },
          { title: "Custom Notifications", slug: "javascript/custom-notifications" },
          { title: "Ribbon JavaScript", slug: "javascript/ribbon-javascript" },
        ],
      },
      {
        title: "11. Ribbon & Command Bar",
        slug: "ribbon-command-bar",
        items: [
          { title: "Overview", slug: "ribbon-command-bar/overview" },
          { title: "Ribbon XML", slug: "ribbon-command-bar/ribbon-xml" },
          { title: "Ribbon Workbench", slug: "ribbon-command-bar/ribbon-workbench" },
          { title: "Modern Command Designer", slug: "ribbon-command-bar/modern-command-designer" },
          { title: "Enable Rules", slug: "ribbon-command-bar/enable-rules" },
          { title: "Display Rules", slug: "ribbon-command-bar/display-rules" },
          { title: "Command Definitions", slug: "ribbon-command-bar/command-definitions" },
          { title: "JavaScript Actions", slug: "ribbon-command-bar/javascript-actions" },
          { title: "Power Fx Commands", slug: "ribbon-command-bar/power-fx-commands" },
        ],
      },
      {
        title: "12. Developer Frontend",
        slug: "dev-frontend",
        items: [
          { title: "Web Resource Setup", slug: "dev-frontend/web-resource-setup" },
          { title: "Cache Busting", slug: "dev-frontend/cache-busting" },
          { title: "Live Debugging (Fiddler)", slug: "dev-frontend/fiddler-autoresponder" },
          { title: "Form Scripting Patterns", slug: "dev-frontend/form-scripting-patterns" },
          { title: "Ribbon Workbench Tips", slug: "dev-frontend/ribbon-workbench-tips" },
          { title: "PCF Workflows", slug: "dev-frontend/pcf-workflow" },
        ],
      }
    ]
  },
  {
    title: "Phase 5: Server-Side Customization",
    sections: [
      {
        title: "13. Plugins",
        slug: "plugins",
        items: [
          { title: "What is a Plugin", slug: "plugins/what-is-plugin" },
          { title: "Execution Pipeline", slug: "plugins/execution-pipeline" },
          { title: "Messages", slug: "plugins/messages" },
          { title: "Images", slug: "plugins/images" },
          { title: "Execution Context", slug: "plugins/execution-context" },
          { title: "Organization Service", slug: "plugins/organization-service" },
          { title: "Tracing", slug: "plugins/tracing" },
          { title: "Registration", slug: "plugins/registration" },
        ],
      },
      {
        title: "14. Classic Actions",
        slug: "actions",
        items: [
          { title: "Overview", slug: "actions/overview" },
          { title: "Invoking", slug: "actions/invoking" },
        ],
      },
      {
        title: "15. Custom APIs",
        slug: "custom-apis",
        items: [
          { title: "Overview", slug: "custom-apis/overview" },
          { title: "Invoking", slug: "custom-apis/invoking" },
        ],
      },
      {
        title: "16. Developer Backend",
        slug: "dev-backend",
        items: [
          { title: "Plugin Bootstrapping", slug: "dev-backend/plugin-bootstrapping" },
          { title: "Common Plugin Mistakes", slug: "dev-backend/plugin-common-mistakes" },
          { title: "Pre and Post Images", slug: "dev-backend/plugin-images" },
          { title: "Impersonation", slug: "dev-backend/plugin-impersonation" },
          { title: "Dependency Management", slug: "dev-backend/dependency-management" },
          { title: "Console Apps", slug: "dev-backend/console-apps" },
        ],
      }
    ]
  },
  {
    title: "Phase 6: Advanced Extensibility",
    sections: [
      {
        title: "17. PCF",
        slug: "pcf",
        items: [
          { title: "Overview", slug: "pcf/overview" },
          { title: "Control Manifest", slug: "pcf/control-manifest" },
          { title: "React Controls", slug: "pcf/react-controls" },
          { title: "Field Controls", slug: "pcf/field-controls" },
          { title: "Dataset Controls", slug: "pcf/dataset-controls" },
          { title: "Fluent UI", slug: "pcf/fluent-ui" },
          { title: "Context API", slug: "pcf/context-api" },
          { title: "Build", slug: "pcf/build" },
          { title: "Deploy", slug: "pcf/deploy" },
        ],
      },
      {
        title: "18. Architecture",
        slug: "architecture",
        items: [
          { title: "Overview", slug: "architecture/overview" },
          { title: "Solution Architecture", slug: "architecture/solution-architecture" },
          { title: "Layering", slug: "architecture/layering" },
          { title: "Domain Modeling", slug: "architecture/domain-modeling" },
          { title: "Naming Conventions", slug: "architecture/naming-conventions" },
          { title: "Shared Libraries", slug: "architecture/shared-libraries" },
          { title: "Dependency Injection", slug: "architecture/dependency-injection" },
          { title: "Plugin Registration Strategy", slug: "architecture/plugin-registration-strategy" },
          { title: "Solution Segmentation", slug: "architecture/solution-segmentation" },
        ],
      },
      {
        title: "19. Integration",
        slug: "integration",
        items: [
          { title: "Overview", slug: "integration/overview" },
          { title: "REST APIs", slug: "integration/rest-apis" },
          { title: "SOAP", slug: "integration/soap" },
          { title: "Webhooks", slug: "integration/webhooks" },
          { title: "OData", slug: "integration/odata" },
          { title: "FetchXML", slug: "integration/fetchxml" },
          { title: "Custom Connectors", slug: "integration/custom-connectors" },
        ],
      }
    ]
  },
  {
    title: "Phase 7: Developer Workflows",
    sections: [
      {
        title: "20. ALM",
        slug: "alm",
        items: [
          { title: "Overview", slug: "alm/overview" },
          { title: "Solutions", slug: "alm/solutions" },
          { title: "Managed Solutions", slug: "alm/managed-solutions" },
          { title: "Unmanaged Solutions", slug: "alm/unmanaged-solutions" },
          { title: "Publishers", slug: "alm/publishers" },
          { title: "Environment Variables", slug: "alm/environment-variables" },
          { title: "Connection References", slug: "alm/connection-references" },
          { title: "Deployment", slug: "alm/deployment" },
        ],
      },
      {
        title: "21. Developer ALM & Solutions",
        slug: "dev-alm",
        items: [
          { title: "Solution Basics", slug: "dev-alm/solution-basics" },
          { title: "Solution Layering", slug: "dev-alm/solution-layering" },
          { title: "Source Control", slug: "dev-alm/source-control" },
          { title: "Deployment Variables", slug: "dev-alm/deployment-variables" },
          { title: "CI/CD Pipelines", slug: "dev-alm/ci-cd-pipelines" },
        ],
      },
      {
        title: "22. DevOps",
        slug: "devops",
        items: [
          { title: "Overview", slug: "devops/overview" },
          { title: "Azure DevOps", slug: "devops/azure-devops" },
          { title: "Build Pipelines", slug: "devops/build-pipelines" },
          { title: "Release Pipelines", slug: "devops/release-pipelines" },
          { title: "Solution Deployment", slug: "devops/solution-deployment" },
          { title: "Power Platform Build Tools", slug: "devops/power-platform-build-tools" },
          { title: "Git Branching", slug: "devops/git-branching" },
        ],
      }
    ]
  },
  {
    title: "Phase 8: Advanced Operations",
    sections: [
      {
        title: "23. Security",
        slug: "security",
        items: [
          { title: "Overview", slug: "security/overview" },
          { title: "Authentication", slug: "security/authentication" },
          { title: "OAuth", slug: "security/oauth" },
          { title: "Azure Entra ID", slug: "security/azure-entra-id" },
          { title: "Service Principals", slug: "security/service-principals" },
          { title: "Application Users", slug: "security/application-users" },
          { title: "Token Flow", slug: "security/token-flow" },
        ],
      },
      {
        title: "24. Advanced Security",
        slug: "advanced-security",
        items: [
          { title: "Field Level Security", slug: "advanced-security/field-level-security" },
          { title: "Hierarchical Security", slug: "advanced-security/hierarchical-security" },
          { title: "Access Teams vs Owner Teams", slug: "advanced-security/teams-architecture" },
          { title: "DLP Policies", slug: "advanced-security/dlp-policies" },
          { title: "Tenant Isolation", slug: "advanced-security/tenant-isolation" },
        ],
      },
      {
        title: "25. Administration",
        slug: "administration",
        items: [
          { title: "Overview", slug: "administration/overview" },
          { title: "Environments", slug: "administration/environments" },
          { title: "Capacity", slug: "administration/capacity" },
          { title: "Backup", slug: "administration/backup" },
          { title: "Restore", slug: "administration/restore" },
          { title: "Monitoring", slug: "administration/monitoring" },
          { title: "Audit Logs", slug: "administration/audit-logs" },
          { title: "Security Center", slug: "administration/security-center" },
        ],
      },
      {
        title: "26. Reporting",
        slug: "reporting",
        items: [
          { title: "Overview", slug: "reporting/overview" },
          { title: "FetchXML", slug: "reporting/fetchxml" },
          { title: "SSRS", slug: "reporting/ssrs" },
          { title: "Power BI", slug: "reporting/power-bi" },
          { title: "Excel Templates", slug: "reporting/excel-templates" },
          { title: "Word Templates", slug: "reporting/word-templates" },
        ],
      }
    ]
  },
  {
    title: "Phase 9: Mastery",
    sections: [
      {
        title: "27. Azure Integration",
        slug: "azure-integration",
        items: [
          { title: "Overview", slug: "azure-integration/overview" },
          { title: "Azure Functions", slug: "azure-integration/azure-functions" },
          { title: "Service Bus", slug: "azure-integration/service-bus" },
          { title: "Event Grid", slug: "azure-integration/event-grid" },
          { title: "Storage", slug: "azure-integration/storage" },
          { title: "Key Vault", slug: "azure-integration/key-vault" },
          { title: "Logic Apps", slug: "azure-integration/logic-apps" },
        ],
      },
      {
        title: "28. Advanced Topics",
        slug: "advanced-topics",
        items: [
          { title: "Overview", slug: "advanced-topics/overview" },
          { title: "Virtual Tables", slug: "advanced-topics/virtual-tables" },
          { title: "Elastic Tables", slug: "advanced-topics/elastic-tables" },
          { title: "Synapse Link", slug: "advanced-topics/synapse-link" },
          { title: "Copilot Studio", slug: "advanced-topics/copilot-studio" },
          { title: "AI Builder", slug: "advanced-topics/ai-builder" },
          { title: "Customer Insights", slug: "advanced-topics/customer-insights" },
          { title: "Omnichannel", slug: "advanced-topics/omnichannel" },
          { title: "Business Events", slug: "advanced-topics/business-events" },
          { title: "Offline Capability", slug: "advanced-topics/offline-capability" },
        ],
      },
      {
        title: "29. Performance Optimization",
        slug: "performance-optimization",
        items: [
          { title: "Overview", slug: "performance-optimization/overview" },
          { title: "Plugin Optimization", slug: "performance-optimization/plugin-optimization" },
          { title: "FetchXML Optimization", slug: "performance-optimization/fetchxml-optimization" },
          { title: "Query Optimization", slug: "performance-optimization/query-optimization" },
          { title: "Indexes", slug: "performance-optimization/indexes" },
          { title: "Batch Operations", slug: "performance-optimization/batch-operations" },
          { title: "Asynchronous Processing", slug: "performance-optimization/asynchronous-processing" },
        ],
      },
      {
        title: "30. Best Practices",
        slug: "best-practices",
        items: [
          { title: "Overview", slug: "best-practices/overview" },
          { title: "C# Coding Standards", slug: "best-practices/csharp-coding-standards" },
          { title: "JavaScript Performance", slug: "best-practices/javascript-performance" },
          { title: "Data Modeling Standards", slug: "best-practices/data-modeling-standards" },
        ],
      },
      {
        title: "31. Real-world Scenarios",
        slug: "real-world-scenarios",
        items: [
          { title: "Overview", slug: "real-world-scenarios/overview" },
          { title: "Lead-to-Opportunity Automation", slug: "real-world-scenarios/lead-to-opportunity" },
          { title: "Approval Workflows", slug: "real-world-scenarios/approval-workflows" },
          { title: "Quote and Invoice Generation", slug: "real-world-scenarios/quote-invoice-generation" },
          { title: "Role-based Dashboards", slug: "real-world-scenarios/role-based-dashboards" },
          { title: "Custom Ribbon Commands", slug: "real-world-scenarios/custom-ribbon-commands" },
          { title: "PCF Controls", slug: "real-world-scenarios/pcf-controls" },
          { title: "Power Pages with Authentication", slug: "real-world-scenarios/power-pages-auth" },
          { title: "Azure Function Integrations", slug: "real-world-scenarios/azure-function-integrations" },
          { title: "Bulk Data Import/Export", slug: "real-world-scenarios/bulk-data-import-export" },
          { title: "Scheduled Background Processing", slug: "real-world-scenarios/scheduled-background-processing" },
        ],
      },
      {
        title: "32. Developer Troubleshooting",
        slug: "dev-troubleshooting",
        items: [
          { title: "Plugin Trace Logs", slug: "dev-troubleshooting/plugin-trace-logs" },
          { title: "Plugin Profiler", slug: "dev-troubleshooting/plugin-profiler" },
          { title: "Security Privilege Errors", slug: "dev-troubleshooting/security-privilege-errors" },
          { title: "Generic SQL Errors", slug: "dev-troubleshooting/generic-sql-errors" },
          { title: "Unit Testing & Mocking", slug: "dev-troubleshooting/unit-testing-mocking" },
        ],
      },
      {
        title: "33. Advanced ALM & Testing",
        slug: "testing-automation",
        items: [
          { title: "Solution Upgrades vs Patches", slug: "testing-automation/solution-upgrades-patches" },
          { title: "Managed Properties", slug: "testing-automation/managed-properties" },
          { title: "Automated UI Testing", slug: "testing-automation/automated-ui-testing" },
          { title: "Power Apps Test Studio", slug: "testing-automation/power-apps-test-studio" },
        ],
      },
      {
        title: "34. Interview Questions",
        slug: "interview-questions",
        items: [
          { title: "Overview", slug: "interview-questions/overview" },
          { title: "C# Plugin Questions", slug: "interview-questions/plugin-interview-questions" },
          { title: "JavaScript Questions", slug: "interview-questions/javascript-interview-questions" },
          { title: "Architecture Questions", slug: "interview-questions/architecture-interview-questions" },
          { title: "Scenario-based Challenges", slug: "interview-questions/scenario-based-challenges" },
        ],
      }
    ]
  }
];

export const dynamicsCourse: Course = {
  id: "dynamics",
  title: "Dynamics 365 Architecture",
  description: "Comprehensive developer training for Microsoft Dynamics 365 and Dataverse.",
  groups,
  contentMap: allContent,
};
