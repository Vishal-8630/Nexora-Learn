import { DocContent } from "@/types/docs";

export const reactComponents: DocContent = {
  title: "React Components",
  description: "Understanding the building blocks of React applications.",
  content: `
## What is a Component?

Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. 
Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called "props") and return React elements describing what should appear on the screen.

### Example

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
\`\`\`
`,
};
