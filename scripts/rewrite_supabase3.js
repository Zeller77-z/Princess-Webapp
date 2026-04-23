const fs = require('fs');

let content = fs.readFileSync('app/page.tsx', 'utf8');

// 1. Upload logic 1
content = content.replace(
  /const { error: uploadError } = await supabase\.storage\s*\n\s*\.from\('product-images'\)\s*\n\s*\.upload\(fileName, blob, { upsert: true, contentType: match\[1\] }\);\s*\n\s*if \(uploadError\) {\s*\n\s*console\.error\('Upload error:', uploadError\);\s*\n\s*continue;\s*\n\s*}\s*\n\s*const { data: urlData } = supabase\.storage\s*\n\s*\.from\('product-images'\)\s*\n\s*\.getPublicUrl\(fileName\);\s*\n\s*imageUrls\.push\(urlData\.publicUrl\);/g,
  `const res = await fetch('/api/upload', {\n          method: 'POST',\n          headers: { 'Content-Type': 'application/json' },\n          body: JSON.stringify({\n            base64: match[2],\n            contentType: match[1],\n            fileName\n          })\n        });\n        if (!res.ok) {\n          console.error('Upload error:', await res.text());\n          continue;\n        }\n        const uploadData = await res.json();\n        imageUrls.push(uploadData.url);`
);

// 2. Upload logic 2 (uploadedNewUrls)
content = content.replace(
  /const { error: uploadError } = await supabase\.storage\s*\n\s*\.from\('product-images'\)\s*\n\s*\.upload\(fileName, blob, { upsert: true, contentType: match\[1\] }\);\s*\n\s*if \(uploadError\) {\s*\n\s*console\.error\('Upload error:', uploadError\);\s*\n\s*continue;\s*\n\s*}\s*\n\s*const { data: urlData } = supabase\.storage\s*\n\s*\.from\('product-images'\)\s*\n\s*\.getPublicUrl\(fileName\);\s*\n\s*uploadedNewUrls\.push\(urlData\.publicUrl\);/g,
  `const res = await fetch('/api/upload', {\n            method: 'POST',\n            headers: { 'Content-Type': 'application/json' },\n            body: JSON.stringify({\n              base64: match[2],\n              contentType: match[1],\n              fileName\n            })\n          });\n          if (!res.ok) {\n            console.error('Upload error:', await res.text());\n            continue;\n          }\n          const uploadData = await res.json();\n          uploadedNewUrls.push(uploadData.url);`
);

// 3. Update template 2
content = content.replace(
  /const { error } = await supabase\s*\n\s*\.from\('campaign_settings'\)\s*\n\s*\.update\(payload\)\s*\n\s*\.eq\('id', editDataTemplate\.id\);\s*\n\s*if \(error\) throw error;/g,
  `const res = await fetch(\`/api/templates/\${editDataTemplate.id}\`, {\n        method: 'PUT',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify(payload)\n      });\n      if (!res.ok) throw new Error(await res.text());`
);

fs.writeFileSync('app/page.tsx', content);
console.log("Refactored app/page.tsx successfully part 3.");
