const fs = require('fs');

let content = fs.readFileSync('app/page.tsx', 'utf8');

// 1. Remove Supabase import
content = content.replace(/import { supabase } from '@\/lib\/supabaseClient';/g, '');

// 2. Fetch Profiles
content = content.replace(
  /const { data, error } = await supabase[\s\S]*?\.order\('created_at', { ascending: true }\);\s*if \(error\) throw error;/m,
  `const res = await fetch('/api/profiles');\n      if (!res.ok) throw new Error(await res.text());\n      const data = await res.json();`
);

// 3. Create Profile
content = content.replace(
  /const { data, error } = await supabase[\s\S]*?\.single\(\);\s*if \(error\) throw error;/m,
  `const res = await fetch('/api/profiles', {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ name: newProfileName.trim(), emoji: newProfileEmoji })\n      });\n      if (!res.ok) {\n        const errData = await res.json();\n        throw new Error(errData.error || 'Failed to create profile');\n      }\n      const data = await res.json();`
);

// 4. Update Profile Key
content = content.replace(
  /const { error } = await supabase[\s\S]*?\.eq\('id', activeProfile\.id\);\s*if \(error\) throw error;/m,
  `const res = await fetch(\`/api/profiles/\${activeProfile.id}\`, {\n        method: 'PATCH',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ gemini_api_key: apiKeyInput.trim() })\n      });\n      if (!res.ok) throw new Error(await res.text());`
);

// 5. Fetch Templates
content = content.replace(
  /let query = supabase[\s\S]*?const { data, error } = await query;\s*if \(error\) throw error;/m,
  `const url = activeProfile ? \`/api/templates?profileId=\${activeProfile.id}\` : '/api/templates';\n      const res = await fetch(url);\n      if (!res.ok) throw new Error(await res.text());\n      const data = await res.json();`
);

// 6. Delete Template (do this before others to avoid matching issues)
content = content.replace(
  /const { error } = await supabase[\s\S]*?\.delete\(\)[\s\S]*?\.eq\('id', template\.id\);\s*if \(error\) throw error;/m,
  `const res = await fetch(\`/api/templates/\${template.id}\`, { method: 'DELETE' });\n      if (!res.ok) throw new Error(await res.text());`
);

// 7. Rename Template
content = content.replace(
  /const { error } = await supabase[\s\S]*?\.update\({ name: newName, updated_at: new Date\(\)\.toISOString\(\) }\)[\s\S]*?\.eq\('id', template\.id\);\s*if \(error\) throw error;/m,
  `const res = await fetch(\`/api/templates/\${template.id}\`, { \n        method: 'PUT', \n        headers: { 'Content-Type': 'application/json' }, \n        body: JSON.stringify({ name: newName, updated_at: new Date().toISOString() }) \n      });\n      if (!res.ok) throw new Error(await res.text());`
);

// 8. Insert Template (upsert payload)
// In handleSaveEdits:
// const { error } = await supabase
//   .from('campaign_settings')
//   .upsert(payload, { onConflict: 'name' });
// if (error) throw error;
content = content.replace(
  /const { error } = await supabase[\s\S]*?\.upsert\(payload, { onConflict: 'name' }\);\s*if \(error\) throw error;/m,
  `const res = await fetch('/api/templates', {\n          method: 'POST',\n          headers: { 'Content-Type': 'application/json' },\n          body: JSON.stringify(payload)\n        });\n        if (!res.ok) throw new Error(await res.text());`
);

// 9. Update Template (update payload)
// const { error } = await supabase
//   .from('campaign_settings')
//   .update(payload)
//   .eq('id', editingTemplateId);
// if (error) throw error;
content = content.replace(
  /const { error } = await supabase[\s\S]*?\.update\(payload\)[\s\S]*?\.eq\('id', editingTemplateId\);\s*if \(error\) throw error;/mg,
  `const res = await fetch(\`/api/templates/\${editingTemplateId}\`, {\n        method: 'PUT',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify(payload)\n      });\n      if (!res.ok) throw new Error(await res.text());`
);

// 10. Upload Images
content = content.replace(
  /const { error: uploadError } = await supabase\.storage[\s\S]*?\.upload\(fileName, blob, { upsert: true, contentType: match\[1\] }\);\s*if \(uploadError\) throw uploadError;\s*const { data: urlData } = supabase\.storage[\s\S]*?\.getPublicUrl\(fileName\);\s*imageUrls\.push\(urlData\.publicUrl\);/m,
  `const res = await fetch('/api/upload', {\n          method: 'POST',\n          headers: { 'Content-Type': 'application/json' },\n          body: JSON.stringify({\n            base64: match[2],\n            contentType: match[1],\n            fileName\n          })\n        });\n        if (!res.ok) throw new Error(await res.text());\n        const uploadData = await res.json();\n        imageUrls.push(uploadData.url);`
);

// 11. Upload Additional Images (in handleSaveEdits)
content = content.replace(
  /const { error: uploadError } = await supabase\.storage[\s\S]*?\.upload\(fileName, blob, { upsert: true, contentType: match\[1\] }\);\s*if \(uploadError\) throw uploadError;\s*const { data: urlData } = supabase\.storage[\s\S]*?\.getPublicUrl\(fileName\);\s*uploadedNewUrls\.push\(urlData\.publicUrl\);/m,
  `const res = await fetch('/api/upload', {\n            method: 'POST',\n            headers: { 'Content-Type': 'application/json' },\n            body: JSON.stringify({\n              base64: match[2],\n              contentType: match[1],\n              fileName\n            })\n          });\n          if (!res.ok) throw new Error(await res.text());\n          const uploadData = await res.json();\n          uploadedNewUrls.push(uploadData.url);`
);

// 12. App Settings Fallback (remove it entirely)
content = content.replace(
  /try {\s*\n\s*const { data, error } = await supabase\.from\('app_settings'\)\.select\('value'\)\.eq\('key', 'gemini_api_key'\)\.single\(\);\s*\n\s*if \(!error && data && data\.value\) {\s*\n\s*setHasKey\(true\);\s*\n\s*}\s*\n\s*} catch \(err\) {}/g,
  `// Removed legacy app_settings fallback`
);

fs.writeFileSync('app/page.tsx', content);
console.log("Refactored app/page.tsx successfully.");
