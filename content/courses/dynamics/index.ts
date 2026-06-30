import { placeholderContent } from "./_template";

// ─── Introduction (authored) ──────────────────────────────────────────────────
import { whatIsDynamics365 } from "./introduction/what-is-dynamics-365";
import { crmVsErp } from "./introduction/crm-vs-erp";
import { sales } from "./introduction/sales";
import { customerService } from "./introduction/customer-service";
import { fieldService } from "./introduction/field-service";
import { marketing } from "./introduction/marketing";
import { modelDrivenApps } from "./introduction/model-driven-apps";
import { canvasApps } from "./introduction/canvas-apps";
import { businessCentral } from "./introduction/business-central";
import { dynamicsArchitecture } from "./introduction/dynamics-architecture";
import { licensing } from "./introduction/licensing";

const introduction = {
  "introduction/what-is-dynamics-365": whatIsDynamics365,
  "introduction/crm-vs-erp": crmVsErp,
  "introduction/sales": sales,
  "introduction/customer-service": customerService,
  "introduction/field-service": fieldService,
  "introduction/marketing": marketing,
  "introduction/model-driven-apps": modelDrivenApps,
  "introduction/canvas-apps": canvasApps,
  "introduction/power-pages": powerPages,
  "introduction/business-central": businessCentral,
  "introduction/dynamics-architecture": dynamicsArchitecture,
  "introduction/licensing": licensing,
};

// ─── Power Platform (authored) ────────────────────────────────────────────────
import { overview } from "./power-platform/overview";
import { powerApps } from "./power-platform/power-apps";
import { dataverse as dataverseDoc } from "./power-platform/dataverse";
import { powerAutomate } from "./power-platform/power-automate";
import { powerPages } from "./power-platform/power-pages";
import { powerBi } from "./power-platform/power-bi";
import { copilot } from "./power-platform/copilot";
import { aiBuilder } from "./power-platform/ai-builder";
import { architectureIntegration } from "./power-platform/architecture-integration";

const powerPlatform = {
  "power-platform/overview": overview,
  "power-platform/power-apps": powerApps,
  "power-platform/dataverse": dataverseDoc,
  "power-platform/power-automate": powerAutomate,
  "power-platform/power-pages": powerPages,
  "power-platform/power-bi": powerBi,
  "power-platform/copilot": copilot,
  "power-platform/ai-builder": aiBuilder,
  "power-platform/architecture-integration": architectureIntegration,
};

// ─── Dataverse ────────────────────────────────────────────────────────────────
import { tables } from "./dataverse/tables";
import { columns } from "./dataverse/columns";
import { relationships } from "./dataverse/relationships";
import { businessRules } from "./dataverse/business-rules";
import { alternateKeys } from "./dataverse/alternate-keys";
import { duplicateDetection } from "./dataverse/duplicate-detection";
import { auditing } from "./dataverse/auditing";
import { security } from "./dataverse/security";

const dataverse = {
  "dataverse/tables": tables,
  "dataverse/columns": columns,
  "dataverse/relationships": relationships,
  "dataverse/auditing": auditing,
  "dataverse/security": security,
  "dataverse/business-rules": businessRules,
  "dataverse/business-process-flows": placeholderContent(
    "Business Process Flows",
    "Business Process Flows guide users through defined stages and steps, ensuring consistent data entry and process adherence."
  ),
  "dataverse/alternate-keys": alternateKeys,
  "dataverse/duplicate-detection": duplicateDetection,
};

// ─── Model-Driven Apps ────────────────────────────────────────────────────────
import { forms } from "./model-driven-apps/forms";
import { views } from "./model-driven-apps/views";
import { dashboards } from "./model-driven-apps/dashboards";
import { charts } from "./model-driven-apps/charts";
import { sitemap } from "./model-driven-apps/sitemap";

const modelDrivenAppsSection = {
  "model-driven-apps/forms": forms,
  "model-driven-apps/views": views,
  "model-driven-apps/dashboards": dashboards,
  "model-driven-apps/charts": charts,
  "model-driven-apps/sitemap": sitemap,
};

// ─── JavaScript ───────────────────────────────────────────────────────────────

import { formScripting } from "./javascript/form-scripting";
import { xrmApi } from "./javascript/xrm-api";
import { xrmWebApi } from "./javascript/xrm-webapi";
import { dialogs } from "./javascript/dialogs";
import { navigation } from "./javascript/navigation";
import { customNotifications } from "./javascript/custom-notifications";
import { ribbonJavascript } from "./javascript/ribbon-javascript";

const javascript = {
  "javascript/form-scripting": formScripting,
  "javascript/xrm-api": xrmApi,
  "javascript/xrm-webapi": xrmWebApi,
  "javascript/dialogs": dialogs,
  "javascript/navigation": navigation,
  "javascript/custom-notifications": customNotifications,
  "javascript/ribbon-javascript": ribbonJavascript,
};

// ─── Plugins ──────────────────────────────────────────────────────────────────

import { whatIsPlugin } from "./plugins/what-is-plugin";
import { executionPipeline } from "./plugins/execution-pipeline";
import { messages } from "./plugins/messages";
import { images } from "./plugins/images";
import { executionContext } from "./plugins/execution-context";
import { organizationService } from "./plugins/organization-service";
import { tracing } from "./plugins/tracing";
import { registration } from "./plugins/registration";

const plugins = {
  "plugins/what-is-plugin": whatIsPlugin,
  "plugins/execution-pipeline": executionPipeline,
  "plugins/messages": messages,
  "plugins/images": images,
  "plugins/execution-context": executionContext,
  "plugins/organization-service": organizationService,
  "plugins/tracing": tracing,
  "plugins/registration": registration,
};

import { customApiOverview } from "./custom-apis/overview";
import { invokingCustomApis } from "./custom-apis/invoking";

const customApis = {
  "custom-apis/overview": customApiOverview,
  "custom-apis/invoking": invokingCustomApis,
};

import { actionsOverview } from "./actions/overview";
import { usingActions } from "./actions/invoking";

const actions = {
  "actions/overview": actionsOverview,
  "actions/invoking": usingActions,
};

import { ribbonCommandBarOverview } from "./ribbon-command-bar/overview";
import { ribbonXml } from "./ribbon-command-bar/ribbon-xml";
import { ribbonWorkbench } from "./ribbon-command-bar/ribbon-workbench";
import { modernCommandDesigner } from "./ribbon-command-bar/modern-command-designer";
import { enableRules } from "./ribbon-command-bar/enable-rules";
import { displayRules } from "./ribbon-command-bar/display-rules";
import { commandDefinitions } from "./ribbon-command-bar/command-definitions";
import { javascriptActions } from "./ribbon-command-bar/javascript-actions";
import { powerFxCommands } from "./ribbon-command-bar/power-fx-commands";

const ribbonCommandBar = {
  "ribbon-command-bar/overview": ribbonCommandBarOverview,
  "ribbon-command-bar/ribbon-xml": ribbonXml,
  "ribbon-command-bar/ribbon-workbench": ribbonWorkbench,
  "ribbon-command-bar/modern-command-designer": modernCommandDesigner,
  "ribbon-command-bar/enable-rules": enableRules,
  "ribbon-command-bar/display-rules": displayRules,
  "ribbon-command-bar/command-definitions": commandDefinitions,
  "ribbon-command-bar/javascript-actions": javascriptActions,
  "ribbon-command-bar/power-fx-commands": powerFxCommands,
};

// ─── Web Resources ────────────────────────────────────────────────────────────

import { htmlWebResources } from "./web-resources/html";
import { cssWebResources } from "./web-resources/css";
import { javascriptWebResources } from "./web-resources/javascript";
import { reactWebResources } from "./web-resources/react";
import { typescriptWebResources } from "./web-resources/typescript";
import { imagesWebResources } from "./web-resources/images";
import { resxWebResources } from "./web-resources/resx";

const webResources = {
  "web-resources/html": htmlWebResources,
  "web-resources/css": cssWebResources,
  "web-resources/javascript": javascriptWebResources,
  "web-resources/react": reactWebResources,
  "web-resources/typescript": typescriptWebResources,
  "web-resources/images": imagesWebResources,
  "web-resources/resx": resxWebResources,
};

// ─── Power Automate ───────────────────────────────────────────────────────────

import { powerAutomateOverview } from "./power-automate/overview";
import { instantFlows } from "./power-automate/instant-flows";
import { automatedFlows } from "./power-automate/automated-flows";
import { scheduledFlows } from "./power-automate/scheduled-flows";
import { dataverseTrigger } from "./power-automate/dataverse-trigger";
import { approvals } from "./power-automate/approvals";
import { http } from "./power-automate/http";
import { expressions } from "./power-automate/expressions";
import { errorHandling } from "./power-automate/error-handling";
import { childFlows } from "./power-automate/child-flows";
import { solutionAware } from "./power-automate/solution-aware";

const powerAutomatePhase = {
  "power-automate/overview": powerAutomateOverview,
  "power-automate/instant-flows": instantFlows,
  "power-automate/automated-flows": automatedFlows,
  "power-automate/scheduled-flows": scheduledFlows,
  "power-automate/dataverse-trigger": dataverseTrigger,
  "power-automate/approvals": approvals,
  "power-automate/http": http,
  "power-automate/expressions": expressions,
  "power-automate/error-handling": errorHandling,
  "power-automate/child-flows": childFlows,
  "power-automate/solution-aware": solutionAware,
};

// ─── PCF ──────────────────────────────────────────────────────────────────────

import { pcfOverview } from "./pcf/overview";
import { controlManifest } from "./pcf/control-manifest";
import { reactControls } from "./pcf/react-controls";
import { fieldControls } from "./pcf/field-controls";
import { datasetControls } from "./pcf/dataset-controls";
import { fluentUi } from "./pcf/fluent-ui";
import { contextApi } from "./pcf/context-api";
import { build } from "./pcf/build";
import { deploy } from "./pcf/deploy";

const pcfPhase = {
  "pcf/overview": pcfOverview,
  "pcf/control-manifest": controlManifest,
  "pcf/react-controls": reactControls,
  "pcf/field-controls": fieldControls,
  "pcf/dataset-controls": datasetControls,
  "pcf/fluent-ui": fluentUi,
  "pcf/context-api": contextApi,
  "pcf/build": build,
  "pcf/deploy": deploy,
};

// ─── Power Pages ──────────────────────────────────────────────────────────────

import { powerPagesOverview } from "./power-pages/overview";
import { sites } from "./power-pages/sites";
import { templates } from "./power-pages/templates";
import { authentication } from "./power-pages/authentication";
import { tablePermissions } from "./power-pages/table-permissions";
import { webRoles } from "./power-pages/web-roles";
import { siteSettings } from "./power-pages/site-settings";
import { webApi } from "./power-pages/web-api";
import { liquid } from "./power-pages/liquid";
import { javascript as powerPagesJavascript } from "./power-pages/javascript";
import { forms as powerPagesForms } from "./power-pages/forms";
import { lists as powerPagesLists } from "./power-pages/lists";

const powerPagesPhase = {
  "power-pages/overview": powerPagesOverview,
  "power-pages/sites": sites,
  "power-pages/templates": templates,
  "power-pages/authentication": authentication,
  "power-pages/table-permissions": tablePermissions,
  "power-pages/web-roles": webRoles,
  "power-pages/site-settings": siteSettings,
  "power-pages/web-api": webApi,
  "power-pages/liquid": liquid,
  "power-pages/javascript": powerPagesJavascript,
  "power-pages/forms": powerPagesForms,
  "power-pages/lists": powerPagesLists,
};

// ─── Security ─────────────────────────────────────────────────────────────────

import { securityOverview } from "./security/overview";
import { securityAuthentication } from "./security/authentication";
import { oauth } from "./security/oauth";
import { azureEntraId } from "./security/azure-entra-id";
import { servicePrincipals } from "./security/service-principals";
import { applicationUsers } from "./security/application-users";
import { tokenFlow } from "./security/token-flow";

const securityPhase = {
  "security/overview": securityOverview,
  "security/authentication": securityAuthentication,
  "security/oauth": oauth,
  "security/azure-entra-id": azureEntraId,
  "security/service-principals": servicePrincipals,
  "security/application-users": applicationUsers,
  "security/token-flow": tokenFlow,
};

// ─── ALM ──────────────────────────────────────────────────────────────────────

import { almOverview } from "./alm/overview";
import { solutions } from "./alm/solutions";
import { managedSolutions } from "./alm/managed-solutions";
import { unmanagedSolutions } from "./alm/unmanaged-solutions";
import { publishers } from "./alm/publishers";
import { environmentVariables } from "./alm/environment-variables";
import { connectionReferences } from "./alm/connection-references";
import { deployment } from "./alm/deployment";

const almPhase = {
  "alm/overview": almOverview,
  "alm/solutions": solutions,
  "alm/managed-solutions": managedSolutions,
  "alm/unmanaged-solutions": unmanagedSolutions,
  "alm/publishers": publishers,
  "alm/environment-variables": environmentVariables,
  "alm/connection-references": connectionReferences,
};

// ─── Azure Integration ────────────────────────────────────────────────────────

import { azureIntegrationOverview } from "./azure-integration/overview";
import { azureFunctions } from "./azure-integration/azure-functions";
import { serviceBus } from "./azure-integration/service-bus";
import { eventGrid } from "./azure-integration/event-grid";
import { storage } from "./azure-integration/storage";
import { keyVault } from "./azure-integration/key-vault";
import { logicApps } from "./azure-integration/logic-apps";

const azureIntegrationPhase = {
  "azure-integration/overview": azureIntegrationOverview,
  "azure-integration/azure-functions": azureFunctions,
  "azure-integration/service-bus": serviceBus,
  "azure-integration/event-grid": eventGrid,
  "azure-integration/storage": storage,
  "azure-integration/key-vault": keyVault,
  "azure-integration/logic-apps": logicApps,
};

// ─── Integration ──────────────────────────────────────────────────────────────

import { integrationOverview } from "./integration/overview";
import { restApis } from "./integration/rest-apis";
import { soap } from "./integration/soap";
import { webhooks } from "./integration/webhooks";
import { odata } from "./integration/odata";
import { fetchxml } from "./integration/fetchxml";
import { customConnectors } from "./integration/custom-connectors";

const integrationPhase = {
  "integration/overview": integrationOverview,
  "integration/rest-apis": restApis,
  "integration/soap": soap,
  "integration/webhooks": webhooks,
  "integration/odata": odata,
  "integration/fetchxml": fetchxml,
  "integration/custom-connectors": customConnectors,
};

// ─── Reporting ────────────────────────────────────────────────────────────────

import { reportingOverview } from "./reporting/overview";
import { fetchxmlReporting } from "./reporting/fetchxml";
import { ssrs } from "./reporting/ssrs";
import { powerBi as reportingPowerBi } from "./reporting/power-bi";
import { excelTemplates } from "./reporting/excel-templates";
import { wordTemplates } from "./reporting/word-templates";

const reportingPhase = {
  "reporting/overview": reportingOverview,
  "reporting/fetchxml": fetchxmlReporting,
  "reporting/ssrs": ssrs,
  "reporting/power-bi": reportingPowerBi,
  "reporting/excel-templates": excelTemplates,
  "reporting/word-templates": wordTemplates,
};

// ─── Performance Optimization ─────────────────────────────────────────────────

import { performanceOptimizationOverview } from "./performance-optimization/overview";
import { pluginOptimization } from "./performance-optimization/plugin-optimization";
import { fetchxmlOptimization } from "./performance-optimization/fetchxml-optimization";
import { queryOptimization } from "./performance-optimization/query-optimization";
import { indexes } from "./performance-optimization/indexes";
import { batchOperations } from "./performance-optimization/batch-operations";
import { asynchronousProcessing } from "./performance-optimization/asynchronous-processing";

const performanceOptimizationPhase = {
  "performance-optimization/overview": performanceOptimizationOverview,
  "performance-optimization/plugin-optimization": pluginOptimization,
  "performance-optimization/fetchxml-optimization": fetchxmlOptimization,
  "performance-optimization/query-optimization": queryOptimization,
  "performance-optimization/indexes": indexes,
  "performance-optimization/batch-operations": batchOperations,
  "performance-optimization/asynchronous-processing": asynchronousProcessing,
};

// ─── DevOps ───────────────────────────────────────────────────────────────────

import { devopsOverview } from "./devops/overview";
import { azureDevops } from "./devops/azure-devops";
import { buildPipelines } from "./devops/build-pipelines";
import { releasePipelines } from "./devops/release-pipelines";
import { solutionDeployment } from "./devops/solution-deployment";
import { powerPlatformBuildTools } from "./devops/power-platform-build-tools";
import { gitBranching } from "./devops/git-branching";

const devopsPhase = {
  "devops/overview": devopsOverview,
  "devops/azure-devops": azureDevops,
  "devops/build-pipelines": buildPipelines,
  "devops/release-pipelines": releasePipelines,
  "devops/solution-deployment": solutionDeployment,
  "devops/power-platform-build-tools": powerPlatformBuildTools,
  "devops/git-branching": gitBranching,
};

// ─── Administration ─────────────────────────────────────────────────────────────

import { administrationOverview } from "./administration/overview";
import { environments } from "./administration/environments";
import { capacity } from "./administration/capacity";
import { backup } from "./administration/backup";
import { restore } from "./administration/restore";
import { monitoring } from "./administration/monitoring";
import { auditLogs } from "./administration/audit-logs";
import { securityCenter } from "./administration/security-center";

const administrationPhase = {
  "administration/overview": administrationOverview,
  "administration/environments": environments,
  "administration/capacity": capacity,
  "administration/backup": backup,
  "administration/restore": restore,
  "administration/monitoring": monitoring,
  "administration/audit-logs": auditLogs,
  "administration/security-center": securityCenter,
};

// ─── Advanced Topics ──────────────────────────────────────────────────────────

import { advancedTopicsOverview } from "./advanced-topics/overview";
import { virtualTables } from "./advanced-topics/virtual-tables";
import { elasticTables } from "./advanced-topics/elastic-tables";
import { synapseLink } from "./advanced-topics/synapse-link";
import { copilotStudio } from "./advanced-topics/copilot-studio";
import { aiBuilder as advancedAiBuilder } from "./advanced-topics/ai-builder";
import { customerInsights } from "./advanced-topics/customer-insights";
import { omnichannel } from "./advanced-topics/omnichannel";
import { businessEvents } from "./advanced-topics/business-events";
import { offlineCapability } from "./advanced-topics/offline-capability";

const advancedTopicsPhase = {
  "advanced-topics/overview": advancedTopicsOverview,
  "advanced-topics/virtual-tables": virtualTables,
  "advanced-topics/elastic-tables": elasticTables,
  "advanced-topics/synapse-link": synapseLink,
  "advanced-topics/copilot-studio": copilotStudio,
  "advanced-topics/ai-builder": advancedAiBuilder,
  "advanced-topics/customer-insights": customerInsights,
  "advanced-topics/omnichannel": omnichannel,
  "advanced-topics/business-events": businessEvents,
  "advanced-topics/offline-capability": offlineCapability,
};

// ─── Architecture ─────────────────────────────────────────────────────────────

import { architectureOverview } from "./architecture/overview";
import { solutionArchitecture } from "./architecture/solution-architecture";
import { layering } from "./architecture/layering";
import { domainModeling } from "./architecture/domain-modeling";
import { namingConventions } from "./architecture/naming-conventions";
import { sharedLibraries } from "./architecture/shared-libraries";
import { dependencyInjection } from "./architecture/dependency-injection";
import { pluginRegistrationStrategy } from "./architecture/plugin-registration-strategy";
import { solutionSegmentation } from "./architecture/solution-segmentation";

const architecturePhase = {
  "architecture/overview": architectureOverview,
  "architecture/solution-architecture": solutionArchitecture,
  "architecture/layering": layering,
  "architecture/domain-modeling": domainModeling,
  "architecture/naming-conventions": namingConventions,
  "architecture/shared-libraries": sharedLibraries,
  "architecture/dependency-injection": dependencyInjection,
  "architecture/plugin-registration-strategy": pluginRegistrationStrategy,
  "architecture/solution-segmentation": solutionSegmentation,
};

// ─── Real-world Scenarios ─────────────────────────────────────────────────────

import { realWorldOverview } from "./real-world-scenarios/overview";
import { leadToOpportunity } from "./real-world-scenarios/lead-to-opportunity";
import { approvalWorkflows } from "./real-world-scenarios/approval-workflows";
import { quoteInvoiceGeneration } from "./real-world-scenarios/quote-invoice-generation";
import { roleBasedDashboards } from "./real-world-scenarios/role-based-dashboards";
import { customRibbonCommands } from "./real-world-scenarios/custom-ribbon-commands";
import { pcfControls } from "./real-world-scenarios/pcf-controls";
import { powerPagesAuth } from "./real-world-scenarios/power-pages-auth";
import { azureFunctionIntegrations } from "./real-world-scenarios/azure-function-integrations";
import { bulkDataImportExport } from "./real-world-scenarios/bulk-data-import-export";
import { scheduledBackgroundProcessing } from "./real-world-scenarios/scheduled-background-processing";

const realWorldScenariosPhase = {
  "real-world-scenarios/overview": realWorldOverview,
  "real-world-scenarios/lead-to-opportunity": leadToOpportunity,
  "real-world-scenarios/approval-workflows": approvalWorkflows,
  "real-world-scenarios/quote-invoice-generation": quoteInvoiceGeneration,
  "real-world-scenarios/role-based-dashboards": roleBasedDashboards,
  "real-world-scenarios/custom-ribbon-commands": customRibbonCommands,
  "real-world-scenarios/pcf-controls": pcfControls,
  "real-world-scenarios/power-pages-auth": powerPagesAuth,
  "real-world-scenarios/azure-function-integrations": azureFunctionIntegrations,
  "real-world-scenarios/bulk-data-import-export": bulkDataImportExport,
  "real-world-scenarios/scheduled-background-processing": scheduledBackgroundProcessing,
};

// ─── Developer Setup & Tooling ────────────────────────────────────────────────
import { prerequisitesCli } from "./dev-setup/prerequisites-cli";
import { xrmToolBoxEssentials } from "./dev-setup/xrmtoolbox-essentials";
import { browserConfiguration } from "./dev-setup/browser-configuration";
import { earlyBoundClasses } from "./dev-setup/early-bound-classes";

const devSetup = {
  "dev-setup/prerequisites-cli": prerequisitesCli,
  "dev-setup/xrmtoolbox-essentials": xrmToolBoxEssentials,
  "dev-setup/browser-configuration": browserConfiguration,
  "dev-setup/early-bound-classes": earlyBoundClasses,
};

// ─── Developer ALM & Solutions ────────────────────────────────────────────────
import { solutionBasics } from "./dev-alm/solution-basics";
import { solutionLayering } from "./dev-alm/solution-layering";
import { sourceControl } from "./dev-alm/source-control";
import { deploymentVariables } from "./dev-alm/deployment-variables";
import { ciCdPipelines } from "./dev-alm/ci-cd-pipelines";

const devAlm = {
  "dev-alm/solution-basics": solutionBasics,
  "dev-alm/solution-layering": solutionLayering,
  "dev-alm/source-control": sourceControl,
  "dev-alm/deployment-variables": deploymentVariables,
  "dev-alm/ci-cd-pipelines": ciCdPipelines,
};

// ─── Developer Backend ────────────────────────────────────────────────────────
import { pluginBootstrapping } from "./dev-backend/plugin-bootstrapping";
import { pluginCommonMistakes } from "./dev-backend/plugin-common-mistakes";
import { pluginImages } from "./dev-backend/plugin-images";
import { pluginImpersonation } from "./dev-backend/plugin-impersonation";
import { dependencyManagement } from "./dev-backend/dependency-management";
import { consoleApps } from "./dev-backend/console-apps";

const devBackend = {
  "dev-backend/plugin-bootstrapping": pluginBootstrapping,
  "dev-backend/plugin-common-mistakes": pluginCommonMistakes,
  "dev-backend/plugin-images": pluginImages,
  "dev-backend/plugin-impersonation": pluginImpersonation,
  "dev-backend/dependency-management": dependencyManagement,
  "dev-backend/console-apps": consoleApps,
};

// ─── Developer Frontend ───────────────────────────────────────────────────────
import { webResourceSetup } from "./dev-frontend/web-resource-setup";
import { cacheBusting } from "./dev-frontend/cache-busting";
import { fiddlerAutoResponder } from "./dev-frontend/fiddler-autoresponder";
import { formScriptingPatterns } from "./dev-frontend/form-scripting-patterns";
import { ribbonWorkbenchTips } from "./dev-frontend/ribbon-workbench-tips";
import { pcfWorkflow } from "./dev-frontend/pcf-workflow";

const devFrontend = {
  "dev-frontend/web-resource-setup": webResourceSetup,
  "dev-frontend/cache-busting": cacheBusting,
  "dev-frontend/fiddler-autoresponder": fiddlerAutoResponder,
  "dev-frontend/form-scripting-patterns": formScriptingPatterns,
  "dev-frontend/ribbon-workbench-tips": ribbonWorkbenchTips,
  "dev-frontend/pcf-workflow": pcfWorkflow,
};

// ─── Developer Troubleshooting ────────────────────────────────────────────────
import { pluginTraceLogs } from "./dev-troubleshooting/plugin-trace-logs";
import { pluginProfiler } from "./dev-troubleshooting/plugin-profiler";
import { securityPrivilegeErrors } from "./dev-troubleshooting/security-privilege-errors";
import { genericSqlErrors } from "./dev-troubleshooting/generic-sql-errors";
import { unitTestingMocking } from "./dev-troubleshooting/unit-testing-mocking";

const devTroubleshooting = {
  "dev-troubleshooting/plugin-trace-logs": pluginTraceLogs,
  "dev-troubleshooting/plugin-profiler": pluginProfiler,
  "dev-troubleshooting/security-privilege-errors": securityPrivilegeErrors,
  "dev-troubleshooting/generic-sql-errors": genericSqlErrors,
  "dev-troubleshooting/unit-testing-mocking": unitTestingMocking,
};

// ─── Enterprise Data Management ───────────────────────────────────────────────
import { dataflows } from "./data-management/dataflows";
import { azureDataFactory } from "./data-management/azure-data-factory";
import { ssisKingswaysoft } from "./data-management/ssis-kingswaysoft";
import { bulkDeletion } from "./data-management/bulk-deletion";

const dataManagement = {
  "data-management/dataflows": dataflows,
  "data-management/azure-data-factory": azureDataFactory,
  "data-management/ssis-kingswaysoft": ssisKingswaysoft,
  "data-management/bulk-deletion": bulkDeletion,
};

// ─── Advanced Enterprise Security ─────────────────────────────────────────────
import { fieldLevelSecurity } from "./advanced-security/field-level-security";
import { hierarchicalSecurity } from "./advanced-security/hierarchical-security";
import { teamsArchitecture } from "./advanced-security/teams-architecture";
import { dlpPolicies } from "./advanced-security/dlp-policies";
import { tenantIsolation } from "./advanced-security/tenant-isolation";

const advancedSecurity = {
  "advanced-security/field-level-security": fieldLevelSecurity,
  "advanced-security/hierarchical-security": hierarchicalSecurity,
  "advanced-security/teams-architecture": teamsArchitecture,
  "advanced-security/dlp-policies": dlpPolicies,
  "advanced-security/tenant-isolation": tenantIsolation,
};

// ─── Advanced ALM & Testing ───────────────────────────────────────────────────
import { solutionUpgradesPatches } from "./testing-automation/solution-upgrades-patches";
import { managedProperties } from "./testing-automation/managed-properties";
import { automatedUiTesting } from "./testing-automation/automated-ui-testing";
import { powerAppsTestStudio } from "./testing-automation/power-apps-test-studio";

const testingAutomation = {
  "testing-automation/solution-upgrades-patches": solutionUpgradesPatches,
  "testing-automation/managed-properties": managedProperties,
  "testing-automation/automated-ui-testing": automatedUiTesting,
  "testing-automation/power-apps-test-studio": powerAppsTestStudio,
};

// ─── Standalone Sections ──────────────────────────────────────────────────────

import { bestPracticesOverview } from "./best-practices/overview";
import { csharpCodingStandards } from "./best-practices/csharp-coding-standards";
import { javascriptPerformance } from "./best-practices/javascript-performance";
import { dataModelingStandards } from "./best-practices/data-modeling-standards";

import { interviewQuestionsOverview } from "./interview-questions/overview";
import { pluginInterviewQuestions } from "./interview-questions/plugin-interview-questions";
import { javascriptInterviewQuestions } from "./interview-questions/javascript-interview-questions";
import { architectureInterviewQuestions } from "./interview-questions/architecture-interview-questions";
import { scenarioBasedChallenges } from "./interview-questions/scenario-based-challenges";

const standalone = {
  "best-practices/overview": bestPracticesOverview,
  "best-practices/csharp-coding-standards": csharpCodingStandards,
  "best-practices/javascript-performance": javascriptPerformance,
  "best-practices/data-modeling-standards": dataModelingStandards,
  "interview-questions/overview": interviewQuestionsOverview,
  "interview-questions/plugin-interview-questions": pluginInterviewQuestions,
  "interview-questions/javascript-interview-questions": javascriptInterviewQuestions,
  "interview-questions/architecture-interview-questions": architectureInterviewQuestions,
  "interview-questions/scenario-based-challenges": scenarioBasedChallenges,
};

// ─── Combined Export ──────────────────────────────────────────────────────────

export const allContent: Record<string, ReturnType<typeof placeholderContent>> = {
  ...introduction,
  ...powerPlatform,
  ...dataverse,
  ...modelDrivenAppsSection,
  ...javascript,
  ...plugins,
  ...customApis,
  ...actions,
  ...ribbonCommandBar,
  ...webResources,
  ...pcfPhase,
  ...powerAutomatePhase,
  ...powerPagesPhase,
  ...securityPhase,
  ...almPhase,
  ...azureIntegrationPhase,
  ...integrationPhase,
  ...reportingPhase,
  ...performanceOptimizationPhase,
  ...devopsPhase,
  ...administrationPhase,
  ...advancedTopicsPhase,
  ...architecturePhase,
  ...realWorldScenariosPhase,
  ...devSetup,
  ...devAlm,
  ...devBackend,
  ...devFrontend,
  ...devTroubleshooting,
  ...dataManagement,
  ...advancedSecurity,
  ...testingAutomation,
  ...standalone,
};
