import { DocContent } from "@/types/docs";

export const automatedUiTesting: DocContent = {
  title: "Automated UI Testing (EasyRepro/Playwright)",
  description:
    "Setting up headless UI automation testing for Model-Driven Apps in a CI/CD pipeline.",
  content: `
## Why UI Testing is Difficult

Testing Dataverse Model-Driven apps is notoriously difficult. The DOM (Document Object Model) is incredibly complex, dynamic, and Microsoft frequently changes the HTML structure (e.g., the transition from the Legacy Web Client to the Unified Interface).

If you write standard Selenium tests targeting specific HTML \`div\` IDs or CSS classes, your tests will break every time Microsoft pushes a platform update.

---

## EasyRepro (The Microsoft Standard)

To solve this, Microsoft created **EasyRepro** (PowerApps-TestAutomation). 

EasyRepro is an open-source C# library built on top of Selenium. Instead of you writing code to find the "Save" button in the DOM, EasyRepro provides strongly-typed C# methods that abstract the UI away.

\`\`\`csharp
using Microsoft.Dynamics365.UIAutomation.Api.UCI;

public void TestCreateAccount()
{
    var client = new WebClient(TestSettings.Options);
    using (var xrmApp = new XrmApp(client))
    {
        // 1. Login
        xrmApp.OnlineLogin.Login(url, username, password);

        // 2. Navigate to Accounts
        xrmApp.Navigation.OpenApp("Sales Hub");
        xrmApp.Navigation.OpenSubArea("Customers", "Accounts");

        // 3. Create a record
        xrmApp.CommandBar.ClickCommand("New");
        xrmApp.Entity.SetValue("name", "Test Automation Account");
        xrmApp.Entity.Save();

        // 4. Assert success
        Assert.IsTrue(xrmApp.Entity.GetHeaderTitle().Contains("Test Automation Account"));
    }
}
\`\`\`

---

## The Transition to Playwright

While EasyRepro is widely used, it is built on Selenium, which can be slow and prone to timing/synchronization issues.

Modern Dynamics 365 test engineering is shifting towards **Playwright**.

Playwright (built by Microsoft) is significantly faster, supports auto-waiting (no more \`Thread.Sleep()\`), and handles the complex shadow DOMs used in PCF controls much better than Selenium.

While there isn't an official "EasyRepro for Playwright" yet, the community has built wrappers (like \`Xrm-Playwright\`) that provide similar strongly-typed navigation methods.

---

## Running in CI/CD

The ultimate goal is to run these tests automatically.

1. Your Azure DevOps CI pipeline builds the \`.zip\` solution.
2. The CD pipeline deploys the \`.zip\` to a temporary "Build" Dataverse environment.
3. The CD pipeline triggers a **Visual Studio Test Task**.
4. The task spins up a "Headless" browser (no UI), runs the EasyRepro/Playwright tests against the Build environment, and generates a Pass/Fail report.
5. If the tests pass, the pipeline proceeds to deploy to UAT. If they fail, the pipeline halts.
`,
};
