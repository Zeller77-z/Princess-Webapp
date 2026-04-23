const fs = require('fs');

let content = fs.readFileSync('app/page.tsx', 'utf8');

// The corrupted block:
const corruptedBlock = `} else if (message.includes('504') || errorStr.includes('504') || errorStr.includes('abort')) {
      setToastMessage('Generation took too long (Timeout). Please try generating fewer days or try again.');
    } else {`;

// Replace it with `} else {`
content = content.split(corruptedBlock).join('} else {');

// Wait, the indentation might be slightly different in some places!
// Let's use a regex to be safe.
const regex = /} else if \(message\.includes\('504'\) \|\| errorStr\.includes\('504'\) \|\| errorStr\.includes\('abort'\)\) \{\s*setToastMessage\('Generation took too long \(Timeout\)\. Please try generating fewer days or try again\.'\);\s*} else {/g;

content = content.replace(regex, '} else {');

fs.writeFileSync('app/page.tsx', content);
console.log("Fixed corrupted else blocks!");
