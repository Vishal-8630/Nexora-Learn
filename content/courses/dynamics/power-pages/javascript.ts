import { DocContent } from "@/types/docs";

export const javascript: DocContent = {
  title: "JavaScript in Power Pages",
  description:
    "Learn how to use jQuery and standard DOM manipulation to add client-side interactivity and validation to Power Pages forms.",
  content: `
## Introduction

In standard Model-Driven apps, developers are strictly prohibited from manipulating the DOM. You must use the \`Xrm.Page\` or \`formContext\` APIs.

**Power Pages is different.** 
There is no \`formContext\`. A Power Pages site is just a standard ASP.NET web application rendering HTML to a browser. Therefore, you customize it using standard Web Development techniques: **jQuery and DOM manipulation**.

## Where to Write JavaScript

You do not upload \`.js\` files as Web Resources for Power Pages.

Instead, the Portal Management App provides a dedicated **Custom JavaScript** text field on several key tables:
- **Web Pages:** Code here runs when this specific page loads.
- **Basic Forms:** Code here runs when the form renders.
- **Advanced Form Steps:** Code here runs on a specific step of a multi-page wizard.
- **Lists:** Code here runs when the grid loads.

If you have global JavaScript that must run on every single page (e.g., Google Analytics tracking code), you place it inside the **Header** or **Footer** Web Templates.

## jQuery is King

Power Pages natively loads jQuery. Because the platform automatically generates the HTML for forms and lists, you use jQuery selectors to find the fields and manipulate them.

Power Pages forms use the logical name of the Dataverse column as the \`id\` attribute of the HTML \`<input>\` element.

### Example: Hiding a Field
If you want to hide the "Job Title" field on a Profile form:

\`\`\`javascript
$(document).ready(function() {
    // Hide the input and its corresponding label
    $("#jobtitle").closest("td").hide();
});
\`\`\`

### Example: OnChange Event
If you want to show an alert when the user changes their email address:

\`\`\`javascript
$(document).ready(function() {
    $("#emailaddress1").change(function() {
        alert("You changed your email to: " + $(this).val());
    });
});
\`\`\`

## Custom Form Validation

By default, Power Pages enforces standard Dataverse validation (e.g., preventing you from typing text into a Number field, or enforcing Required fields).

If you need complex custom validation (e.g., "End Date must be after Start Date"), you must write JavaScript to intercept the submit button.

Power Pages provides a global array called \`Page_Validators\`. You must inject a custom validator function into this array. If your function returns \`false\`, the portal halts the form submission and displays your custom error message.

\`\`\`javascript
if (window.jQuery) {
    (function ($) {
        $(document).ready(function () {
            
            // Create a custom validator
            if (typeof (Page_Validators) == 'undefined') return;

            var startDateValidator = document.createElement('span');
            startDateValidator.style.display = "none";
            startDateValidator.id = "customStartDateValidator";
            startDateValidator.controltovalidate = "cr16b_enddate";
            startDateValidator.errormessage = "<a href='#cr16b_enddate'>End Date must be after Start Date.</a>";
            
            // The validation logic
            startDateValidator.evaluationfunction = function () {
                var startDate = new Date($("#cr16b_startdate").val());
                var endDate = new Date($("#cr16b_enddate").val());
                
                if (endDate <= startDate) {
                    return false; // Blocks submission
                }
                return true; // Allows submission
            };

            // Add it to the page
            Page_Validators.push(startDateValidator);
        });
    }(window.jQuery));
}
\`\`\`

## Mixing Liquid and JavaScript

A very powerful technique is writing Liquid code *inside* the Custom JavaScript field. 

Because Liquid executes on the server *before* the JavaScript is sent to the browser, you can use Liquid to dynamically generate JavaScript.

\`\`\`javascript
$(document).ready(function() {
    
    // Liquid injects the User's ID into the JS variable during server render
    var currentUserId = '{{ user.id }}';
    
    if (!currentUserId) {
        console.log("User is not logged in.");
    } else {
        console.log("User ID is: " + currentUserId);
    }
});
\`\`\`

## Things to Remember

- Use **jQuery** to manipulate the DOM in Power Pages.
- There is no \`formContext\` or \`Xrm\` API on the portal.
- Use **Page_Validators** to block form submissions with custom logic.
- You can mix **Liquid** into your JavaScript to inject server-side data.

## What's Next

We just learned how to write validation logic for forms, but how do we actually get a Dataverse form onto the portal in the first place? Next, we cover **Forms**.
  `.trim(),
};
