import { DocContent } from "@/types/docs";

/**
 * Generates standard placeholder Markdown for a documentation page.
 * Replace with authored content as each section is written.
 */
export function placeholderContent(
  topicName: string,
  description: string
): DocContent {
  return {
    title: topicName,
    description,
    content: `
## Introduction

${description}

## What is it?

A detailed explanation of **${topicName}** will be added here, covering the definition, key concepts, and how it fits into the broader Microsoft Dynamics 365 ecosystem.

## Why do we need it?

Understanding **${topicName}** is essential for building, customizing, and maintaining Dynamics 365 solutions. This section will explain the business and technical motivations.

## How does it work?

This section will cover the inner workings of **${topicName}** — including architecture, data flow, configuration steps, and integration points within the Dynamics 365 platform.

## Example

A practical, real-world example demonstrating **${topicName}** in action will be provided here, including step-by-step walkthroughs.

\`\`\`csharp
// Example code will appear here
// with syntax highlighting enabled
\`\`\`

## Best Practices

Key recommendations for working with **${topicName}** will be listed here.

## Things to Remember

- Key point #1 about **${topicName}** will be listed here.
- Key point #2 — common pitfalls and best practices.
- Key point #3 — important limitations or considerations.

## Related Topics

Links to related documentation pages will appear here.

## What's Next

The next topic in the learning path will be suggested here.
    `.trim(),
  };
}
