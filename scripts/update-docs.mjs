import fs from 'fs';
import path from 'path';

const API_KEY = process.env.GEMINI_API_KEY || "";
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

const PROMPT_INSTRUCTIONS = `
You are now acting as the Senior Technical Editor for Nexora Learn.
The documentation page I provide has already been generated.
Your job is NOT to rewrite it from scratch.
Instead, review it as if it were about to be published on one of the best technical documentation websites in the world.
Your goal is to improve the page while preserving its structure, writing style, and intent.

======================================================
REVIEW CRITERIA
======================================================
Review the page for all of the following.
1. Technical Accuracy
- Verify every statement.
- Correct outdated information.
- Use current Microsoft terminology.
- Remove inaccurate explanations.
- Mention legacy terminology only when helpful.

2. Completeness
Determine whether important concepts are missing.
A documentation page should answer:
- What is it?
- Why does it exist?
- When should it be used?
- When should it NOT be used?
- How does it work?
- What problem does it solve?
- What are its limitations?
- What should the learner study next?
If any of these are missing, add them naturally.

3. Real-world Perspective
Improve the page by adding practical engineering knowledge.
Whenever appropriate include:
- Real-world scenarios
- Enterprise use cases
- Design considerations
- Performance considerations
- Security considerations
- Scalability considerations
- Maintainability considerations
Teach how experienced Dynamics developers think.

4. Decision Making
One of the primary goals of Nexora Learn is to teach developers how to choose the correct technology.
Whenever appropriate, explain:
"When should I use this?"
"When should I avoid this?"
"What alternatives exist?"
"Why would Microsoft recommend this approach?"
If comparisons improve understanding, include them.
Examples: Plugin vs Power Automate, Plugin vs JavaScript, etc.

5. Beginner Friendliness
Assume the reader has never worked with Microsoft Dynamics.
Whenever new terminology appears: explain it, define it before using it, avoid assuming prior knowledge.
Remove unnecessary complexity.

6. Code Examples
If code improves understanding, include a short example.
The example should be: small, focused, modern, production-oriented.
Do not include unnecessary code.

7. Diagrams
Whenever a process is difficult to visualize, add a simple text diagram.
Do not generate images.

8. Best Practices
Expand the Best Practices section whenever appropriate.
Include Microsoft's recommended approaches.

9. Common Mistakes
Expand this section whenever appropriate.
Focus on mistakes beginners and intermediate developers commonly make.

10. Things to Remember
Ensure this section becomes a quick revision summary. Keep it concise.

11. Related Topics
Suggest logical related pages from the documentation. Do not repeat explanations.

12. Writing Quality
Improve: flow, readability, wording, grammar, consistency.
Prefer: short paragraphs, bullet points, practical explanations.
Avoid: repetition, fluff, unnecessary theory.

13. Do NOT
Do not make the page significantly longer unless the added content improves understanding.
Do not add information just to increase length.
Do not remove existing content unless it is incorrect.
Preserve the overall structure of the page.

QUALITY STANDARD
Imagine this documentation will be read by: beginners, experienced developers, solution architects, technical leads.
The final page should be clear enough for beginners while still being valuable for professionals.

Return ONLY the complete updated TypeScript file content containing the \`DocContent\` object exactly as it is structured in the input, but with your improvements applied to the \`title\`, \`description\`, and \`content\` string.
Do not wrap it in markdown code blocks if possible. If you must use a code block, use \`\`\`typescript ... \`\`\` and I will parse it out.
Output ONLY the raw code.
`;

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach(function(file) {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
    } else {
      if (file.endsWith(".ts")) {
        arrayOfFiles.push(path.join(dirPath, file));
      }
    }
  });
  return arrayOfFiles;
}

async function processFile(filePath) {
    console.log("Processing: " + filePath);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    try {
        const payload = {
            contents: [{
                parts: [{
                    text: PROMPT_INSTRUCTIONS + "\n\nFile Content to Improve:\n" + content
                }]
            }],
            generationConfig: {
                temperature: 0.2
            }
        };

        const res = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            console.error(`Failed ${filePath}: ${res.status} ${res.statusText}`);
            const errBody = await res.text();
            console.error(errBody);
            return;
        }

        const data = await res.json();
        let generatedContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!generatedContent) {
            console.error(`No content returned for ${filePath}`);
            return;
        }

        if (generatedContent.startsWith('```typescript')) {
            generatedContent = generatedContent.replace(/^```typescript\n/, '');
            generatedContent = generatedContent.replace(/\n```$/, '');
        } else if (generatedContent.startsWith('```')) {
            generatedContent = generatedContent.replace(/^```(.*?)\n/, '');
            generatedContent = generatedContent.replace(/\n```$/, '');
        }

        fs.writeFileSync(filePath, generatedContent, 'utf-8');
        console.log(`Successfully updated ${filePath}`);
    } catch (e) {
        console.error(`Exception on ${filePath}: `, e);
    }
}

async function main() {
    const docsDir = path.join(process.cwd(), 'content', 'docs');
    const files = getAllFiles(docsDir);
    console.log(`Found ${files.length} files to process.`);
    
    for (let i = 0; i < files.length; i++) {
        if (files[i].includes('what-is-plugin.ts')) continue;
        
        await processFile(files[i]);
        await new Promise(r => setTimeout(r, 3000)); // 3 second delay to avoid rate limits
    }
    console.log('All files processed.');
}

main();
