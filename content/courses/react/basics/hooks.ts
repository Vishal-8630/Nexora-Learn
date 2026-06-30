import { DocContent } from "@/types/docs";

export const reactHooks: DocContent = {
  title: "React Hooks",
  description: "Using state and lifecycle methods inside functional components.",
  content: `
## What are Hooks?

Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.

### useState

\`useState\` is a Hook that lets you add React state to function components.

\`\`\`jsx
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`
`,
};
