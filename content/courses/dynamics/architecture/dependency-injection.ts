import { DocContent } from "@/types/docs";

export const dependencyInjection: DocContent = {
  title: "Dependency Injection in Dataverse Plugins",
  description:
    "Discover how Dataverse now natively supports modern Inversion of Control (IoC) and Dependency Injection (DI) patterns within its plugin pipeline, enabling more testable, maintainable, and scalable solutions.",
  content: `
## Introduction

For many years, developing a Dataverse (formerly Dynamics CRM) Plugin involved a significant amount of boilerplate code within the \`Execute()\` method. Developers had to manually extract core services from the \`IServiceProvider\`, such as the \`ITracingService\`, \`IOrganizationServiceFactory\`, and \`IOrganizationService\`.

This approach led to several challenges:
*   **Boilerplate Code**: Repetitive setup code in every plugin.
*   **Tight Coupling**: Plugins were directly coupled to the Dataverse execution context, making it difficult to isolate and test business logic.
*   **Difficult Unit Testing**: Testing required complex setups or even connecting to a live Dataverse instance, hindering efficient CI/CD pipelines.

## Understanding Dependency Injection (DI)

Before diving into the Dataverse specifics, let's define key concepts:

*   **Dependency Injection (DI)**: A design pattern where an object receives its dependencies from an external source rather than creating them itself. Instead of a class being responsible for creating its collaborators, those collaborators are "injected" into it, typically through its constructor.
*   **Inversion of Control (IoC)**: The broader principle that DI implements. It means that the flow of control is inverted; instead of your code calling a library, the framework calls your code. In DI, the responsibility for creating and managing dependencies is inverted from the consuming class to an external container.
*   **IoC Container (or DI Container)**: A framework that manages the creation and lifecycle of objects and their dependencies. It resolves dependencies automatically when an object is requested. Dataverse now leverages a form of this internally.

**Why DI Matters**: DI promotes loose coupling, making code more modular, reusable, and significantly easier to test, maintain, and scale.

## The Modern Approach: Native DI in Dataverse

With the introduction of **Dependent Assemblies** and ongoing architectural enhancements, Dataverse has embraced modern .NET development patterns, including native support for Dependency Injection. This shift aligns Dataverse plugin development with best practices found in other contemporary .NET applications.

The core idea is to inject required services directly into your plugin's constructor or the constructors of your business logic classes, rather than manually retrieving them from \`IServiceProvider\` within the \`Execute\` method.

### How it Works: The Role of \`PluginBase\`

While \`IServiceProvider\` is still passed to the \`Execute\` method, the recommended modern approach for custom services involves leveraging a base class like \`PluginBase\` (provided by the Microsoft.PowerApps.SDK.PluginFramework NuGet package) or a similar pattern.

The \`PluginBase\` class facilitates DI by:
1.  **Providing a DI Container**: It often includes an internal mechanism to register and resolve dependencies.
2.  **Simplifying Service Access**: It allows you to define your plugin's dependencies in its constructor, and the \`PluginBase\` (or the underlying Dataverse framework) handles their resolution.
3.  **Integrating with \`ILogger\`**: It provides direct support for injecting \`ILogger<T>\` for structured logging.

**Simplified Flow of Dependency Resolution:**

\`\`\`
Dataverse Execution Pipeline
        ↓
PluginBase (SDK)
        ↓ (Manages dependency resolution for your plugin)
Your Custom Plugin (Constructor receives injected dependencies)
        ↓
Your Business Logic Services (Also receive injected dependencies)
\`\`\`

### The New \`IPlugin\` Implementation Example

When using the modern approach, your plugin's constructor can declare its dependencies. For custom business logic, you'd typically register these services with a DI container managed by your plugin solution, often facilitated by \`PluginBase\`.

*Example Concept:*
\`\`\`csharp
using Microsoft.Xrm.Sdk;
using Microsoft.Extensions.Logging; // For modern logging

// Define an interface for your business logic
public interface ITaxCalculator
{
    decimal Calculate(decimal amount);
}

// Implement your business logic
public class SalesTaxCalculator : ITaxCalculator
{
    private readonly ILogger<SalesTaxCalculator> _logger;

    public SalesTaxCalculator(ILogger<SalesTaxCalculator> logger)
    {
        _logger = logger;
    }

    public decimal Calculate(decimal amount)
    {
        _logger.LogInformation($"Calculating tax for amount: {amount}");
        // Real-world: Fetch tax rates, apply complex logic
        return amount * 0.08m; // Example: 8% sales tax
    }
}

// Your Plugin class, inheriting from PluginBase (or similar pattern)
// Note: For custom services like ITaxCalculator, you'd register them
// with the PluginBase's internal container or a custom service provider.
// ILogger is often resolved more directly by the framework.
public class CalculateTaxPlugin : PluginBase // Assuming PluginBase from SDK
{
    private readonly ITaxCalculator _taxCalculator;
    private readonly ILogger<CalculateTaxPlugin> _logger;

    // Dependencies are injected into the constructor
    public CalculateTaxPlugin(ITaxCalculator taxCalculator, ILogger<CalculateTaxPlugin> logger)
        : base(typeof(CalculateTaxPlugin)) // Pass plugin type to base
    {
        _taxCalculator = taxCalculator;
        _logger = logger;
    }

    protected override void ExecuteCrmPlugin(
        ILocalPluginContext localPluginContext,
        ILogger logger) // ILogger is also available here
    {
        _logger.LogInformation("CalculateTaxPlugin Execution Started.");

        // Access Dataverse services via localPluginContext
        var context = localPluginContext.PluginExecutionContext;
        if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity entity)
        {
            if (entity.Contains("new_amount"))
            {
                decimal amount = entity.GetAttributeValue<Money>("new_amount").Value;
                decimal tax = _taxCalculator.Calculate(amount);
                entity["new_taxamount"] = new Money(tax);
                _logger.LogInformation($"Calculated tax: {tax} for amount: {amount}");
            }
        }
    }
}
\`\`\`
*(Note: The exact implementation of \`PluginBase\` and how custom services are registered can vary slightly with SDK updates. The key takeaway is the shift towards constructor injection for dependencies.)*

## Why Dependency Injection is Crucial for Modern Dataverse Development

Adopting DI in your Dataverse plugins brings significant benefits:

1.  **Enhanced Testability**: This is the primary driver.
    *   **Unit Testing**: By injecting interfaces (e.g., \`ITaxCalculator\`), you can easily "mock" or "fake" these dependencies during unit tests. This allows your tests to run in isolation, without needing a connection to Dataverse, making them fast and reliable.
    *   **CI/CD Pipelines**: Fast unit tests are essential for efficient Continuous Integration/Continuous Deployment. Frameworks like Moq or FakeXrmEasy become invaluable here.
2.  **Improved Maintainability**:
    *   **Loose Coupling**: Components are less dependent on each other, making it easier to modify or replace a dependency without affecting the entire system.
    *   **Easier Refactoring**: Code becomes more modular and easier to reorganize.
3.  **Increased Reusability**:
    *   Business logic encapsulated in services (e.g., \`ITaxCalculator\`) can be reused across multiple plugins, custom workflow activities, or even external applications.
4.  **Better Scalability**:
    *   Well-structured, loosely coupled code is inherently more scalable as individual components can be developed and optimized independently.
5.  **Clearer Separation of Concerns**:
    *   The plugin's \`Execute\` method focuses solely on orchestrating the Dataverse context and calling business logic. The business logic itself resides in separate, testable service classes.
6.  **Adherence to Best Practices**:
    *   Aligns with modern software engineering principles like the Single Responsibility Principle (SRP) and Interface Segregation Principle (ISP).

## When to Use and When to Avoid

**When to Use Dependency Injection:**
*   **Always for new Dataverse plugins**: It's the recommended modern approach for building robust, maintainable solutions.
*   **For complex business logic**: When your plugin performs more than a trivial operation.
*   **In enterprise solutions**: Where testability, maintainability, and scalability are paramount.
*   **When unit testing is a requirement**: DI is fundamental for effective unit testing.

**When to Avoid Dependency Injection:**
*   **Rarely, if ever**: While there's a slight initial learning curve and setup, the long-term benefits of DI almost always outweigh the perceived overhead, even for simpler plugins. For extremely trivial plugins (e.g., just setting a single field based on another), the full DI pattern might seem overkill, but adopting it consistently fosters good habits.

**Alternatives to Plugins (Contextual Note):**
It's important to remember that DI is about *how* you write a good plugin, not *whether* to use a plugin. For certain scenarios, alternatives like Power Automate, client-side JavaScript, or custom workflow activities might be more appropriate. However, if a plugin is the right choice, DI is the best way to build it.

## Best Practices

*   **Use Interfaces**: Always define interfaces for your services (e.g., \`ITaxCalculator\`) and inject the interface, not the concrete implementation. This is crucial for mocking.
*   **Keep \`Execute\` Methods Thin**: The \`Execute\` (or \`ExecuteCrmPlugin\` in \`PluginBase\`) method should primarily handle context extraction, call your injected business logic, and manage Dataverse interactions. All complex logic should reside in separate, injected services.
*   **Follow Single Responsibility Principle (SRP)**: Each service class should have one reason to change.
*   **Register Services Appropriately**: If you're managing a custom DI container within your plugin solution, ensure services are registered with the correct lifetimes (e.g., transient for new instances per request, singleton for shared instances).
*   **Leverage \`ILogger<T>\`**: Use the modern \`Microsoft.Extensions.Logging\` for structured and consistent logging within your plugins and services.
*   **Utilize \`PluginBase\`**: For custom service resolution, \`PluginBase\` or a similar pattern is the recommended way to integrate your DI container with the Dataverse execution pipeline.

## Common Mistakes

*   **Reverting to Old Habits**: Manually extracting \`IOrganizationService\` and \`ITracingService\` within \`Execute\` instead of using injected services or \`ILocalPluginContext\`.
*   **Hard-coding Dependencies**: Directly instantiating concrete service classes within your plugin or business logic, defeating the purpose of DI.
*   **Monolithic Plugins**: Putting all business logic directly into the \`Execute\` method, making it untestable and hard to maintain.
*   **Not Using Interfaces**: Injecting concrete classes instead of interfaces, which hinders testability and flexibility.
*   **Over-injecting**: Having too many dependencies in a single constructor, often indicating a violation of the Single Responsibility Principle.

## Limitations

*   **Initial Learning Curve**: For developers new to DI, there's an initial investment in understanding the concepts and setup.
*   **DI Container Scope**: The native Dataverse DI container is primarily for core Dataverse services and \`ILogger\`. For custom business services, you typically manage their registration and resolution through a \`PluginBase\` class or a custom service provider within your plugin solution, which adds a layer of abstraction compared to a full .NET Core application.
*   **Performance Overhead**: While minimal, there is a slight overhead associated with dependency resolution compared to direct instantiation. This is almost always negligible in the context of Dataverse plugin execution.

## Things to Remember

*   Dataverse now supports modern **Dependency Injection** patterns, aligning with best practices.
*   Embrace **constructor injection** for your plugin and business logic dependencies.
*   **\`PluginBase\`** is key for integrating custom services with the Dataverse DI pipeline.
*   DI is crucial for **Unit Testing**, **maintainability**, and **scalability**.
*   Always inject **interfaces**, not concrete implementations.
*   Avoid **boilerplate code** and **monolithic \`Execute\` methods**.

## Related Topics

*   **Plugin Registration Tool**: Learn how to deploy and configure your plugins in Dataverse.
*   **Dependent Assemblies**: Understand how to package and deploy multiple assemblies with your plugin.
*   **Unit Testing Dataverse Plugins**: Dive deeper into strategies and frameworks for testing your plugin code.
*   **\`IPluginExecutionContext\`**: Explore the details of the execution context available within a plugin.
*   **Power Automate vs. Plugins**: Understand the decision-making process for choosing between different automation technologies in Dataverse.
  `.trim(),
};