const fs = require('fs');

let content = fs.readFileSync('app/page.tsx', 'utf8');

// Replace all contractions and possessives (e.g. You're, don't, skin's) 
// that are surrounded by letters with escaped single quotes.
// This prevents them from prematurely closing single-quoted strings in TSX/JS.
// We use a regex that matches a letter, a single quote, and another letter.
content = content.replace(/([a-zA-Z])'([a-zA-Z])/g, "$1\\'$2");

// But wait, what if they were ALREADY escaped? Like `don\'t`?
// If it's `don\'t`, the regex `([a-zA-Z])'([a-zA-Z])` will not match the backslash, 
// wait, the string in memory has `\` and `'`.
// If it was already escaped, the text in the file is `don\'t`.
// The regex `([a-zA-Z])'([a-zA-Z])` looks for a letter directly followed by a quote.
// In `don\'t`, the character before `'` is `\`, not a letter!
// Let's verify: "don\\'t".match(/([a-zA-Z])'([a-zA-Z])/g) -> null!
// So it is completely safe and won't double-escape!

fs.writeFileSync('app/page.tsx', content);
console.log("Fixed all internal single quotes!");
