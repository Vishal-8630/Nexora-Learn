import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function fixFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // We are looking for the content property that starts with a backtick and ends with `.trim()
    // However, since the backticks inside the template literal are breaking the regex if we are not careful,
    // let's split the file by 'content: `' and the end '`.trim(),'
    
    const startMarker = 'content: `';
    const endMarkerIndex = content.lastIndexOf('`.trim(),');
    
    const startIndex = content.indexOf(startMarker);
    
    if (startIndex !== -1 && endMarkerIndex !== -1 && endMarkerIndex > startIndex) {
        const prefix = content.substring(0, startIndex + startMarker.length);
        const suffix = content.substring(endMarkerIndex);
        let innerContent = content.substring(startIndex + startMarker.length, endMarkerIndex);
        
        // Unescape existing escaped backticks and ${} to normalize
        innerContent = innerContent.replace(/\\`/g, '`');
        innerContent = innerContent.replace(/\\\$\{/g, '${');
        
        // Now properly escape all backticks and ${}
        innerContent = innerContent.replace(/`/g, '\\`');
        innerContent = innerContent.replace(/\$\{/g, '\\${');
        
        const newContent = prefix + innerContent + suffix;
        fs.writeFileSync(filePath, newContent, 'utf-8');
        console.log(`Fixed ${filePath}`);
    } else {
        console.log(`Could not match structure for ${filePath}`);
    }
}

try {
    const modifiedFiles = execSync('git diff --name-only').toString().split('\n').filter(Boolean);

    for (const file of modifiedFiles) {
        if (file.endsWith('.ts') && file.startsWith('content/docs/')) {
            fixFile(path.join(process.cwd(), file));
        }
    }
} catch (e) {
    console.error("Failed to run fix script:", e);
}
