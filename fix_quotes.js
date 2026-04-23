const fs = require('fs');

let content = fs.readFileSync('app/page.tsx', 'utf8');

// Replace these specific common words with escaped versions ONLY inside the TOPIC_DB array section.
// A simpler way is to just replace 'don't' with 'don\\'t' globally, but we only want to do it in strings.
const wordsToFix = [
  "don't", "isn't", "can't", "doesn't", "here's", "you're", "it's", "deprivation's", "do's and don'ts"
];

for (const word of wordsToFix) {
  // Regex to match the word when it's NOT already escaped.
  // E.g. don't -> don\'t
  const regex = new RegExp(`(?<!\\\\)${word.replace(/'/g, "'")}`, 'g');
  const escapedWord = word.replace(/'/g, "\\'");
  
  content = content.replace(regex, escapedWord);
}

fs.writeFileSync('app/page.tsx', content);
console.log("Fixed quotes!");
