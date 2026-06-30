import { DocContent } from "@/types/docs";

export const unitTestingMocking: DocContent = {
  title: "Unit Testing & Mocking",
  description:
    "Setting up FakeXrmEasy to test plugins in milliseconds without deploying to the server.",
  content: `
## The Problem with Manual Testing

To test a C# plugin manually, you must:
1. Build the DLL.
2. Open the Plugin Registration Tool.
3. Upload the DLL.
4. Open the browser, find a test record, and click "Save".
5. Realize you made a typo, fix the code, and repeat steps 1-4.

This cycle takes ~2 minutes per test. If you make 30 changes a day, you waste an entire hour just deploying code.

---

## The Solution: FakeXrmEasy

Professional developers use **FakeXrmEasy** (or Moq) to write automated Unit Tests for their plugins. 

FakeXrmEasy is an incredible open-source framework that creates a "Fake" Dataverse database entirely in your computer's RAM. It simulates the \`IOrganizationService\`, allowing your plugin to execute locally in milliseconds.

### 1. Install FakeXrmEasy
In your Unit Test project (e.g., xUnit or MSTest), install the NuGet packages:
\`\`\`bash
dotnet add package FakeXrmEasy.Core.v9
dotnet add package FakeXrmEasy.Plugins.v9
\`\`\`

### 2. Writing a Test

Imagine we have a plugin that triggers on Account Create, and its job is to set the \`Credit Limit\` to $5,000 if it is blank.

Here is how you test it instantly without a real server:

\`\`\`csharp
using FakeXrmEasy;
using Microsoft.Xrm.Sdk;
using Xunit;

public class AccountPluginTests
{
    [Fact]
    public void Should_Set_Credit_Limit_To_5000_On_Create()
    {
        // 1. Arrange: Setup the Fake In-Memory Context
        var context = new XrmFakedContext();
        
        // 2. Setup the Input Target (what the user is passing in)
        Entity targetAccount = new Entity("account");
        targetAccount.Id = Guid.NewGuid();
        // Notice we do NOT set a Credit Limit

        var inputParameters = new ParameterCollection { { "Target", targetAccount } };

        // 3. Act: Execute the Plugin against the Fake Context
        context.ExecutePluginWith<AccountSetCreditLimitPlugin>(inputParameters, null, null, null);

        // 4. Assert: Did the plugin do its job?
        // We query the fake database to see if the record was updated correctly
        Entity createdAccount = context.GetOrganizationService().Retrieve("account", targetAccount.Id, new Microsoft.Xrm.Sdk.Query.ColumnSet("creditlimit"));
        
        Assert.Equal(5000m, createdAccount.GetAttributeValue<Money>("creditlimit").Value);
    }
}
\`\`\`

### Why this matters
You can run this test by clicking "Run All Tests" in Visual Studio. It will execute in **15 milliseconds**. You can now refactor your code with total confidence, knowing instantly if you broke the business logic.
`,
};
