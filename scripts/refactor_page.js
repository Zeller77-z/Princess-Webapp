const fs = require('fs');

let content = fs.readFileSync('app/page.tsx', 'utf8');

// 1. Remove Supabase import
content = content.replace(/import { supabase } from '@\/lib\/supabaseClient';/g, '');

// 2. Fetch Profiles
content = content.replace(
  /const { data, error } = await supabase\s*\n\s*\.from\('user_profiles'\)\s*\n\s*\.select\('\*'\)\s*\n\s*\.order\('created_at', { ascending: true }\);\s*\n\s*if \(error\) throw error;/g,
  `const res = await fetch('/api/profiles');\n      if (!res.ok) throw new Error(await res.text());\n      const data = await res.json();`
);

// 3. Create Profile
content = content.replace(
  /const { data, error } = await supabase\s*\n\s*\.from\('user_profiles'\)\s*\n\s*\.insert\({ name: newProfileName\.trim\(\), emoji: newProfileEmoji }\)\s*\n\s*\.select\(\)\s*\n\s*\.single\(\);\s*\n\s*if \(error\) throw error;/g,
  `const res = await fetch('/api/profiles', {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ name: newProfileName.trim(), emoji: newProfileEmoji })\n      });\n      if (!res.ok) {\n        const errData = await res.json();\n        throw new Error(errData.error || 'Failed to create profile');\n      }\n      const data = await res.json();`
);

// 4. Update Profile Key
content = content.replace(
  /const { error } = await supabase\s*\n\s*\.from\('user_profiles'\)\s*\n\s*\.update\({ gemini_api_key: apiKeyInput\.trim\(\) }\)\s*\n\s*\.eq\('id', activeProfile\.id\);\s*\n\s*if \(error\) throw error;/g,
  `const res = await fetch(\`/api/profiles/\${activeProfile.id}\`, {\n        method: 'PATCH',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ gemini_api_key: apiKeyInput.trim() })\n      });\n      if (!res.ok) throw new Error(await res.text());`
);

// 5. Fetch Templates
content = content.replace(
  /let query = supabase\s*\n\s*\.from\('campaign_settings'\)\s*\n\s*\.select\('\*'\)\s*\n\s*\.order\('updated_at', { ascending: false }\);\s*\n\s*if \(activeProfile\) {\s*\n\s*query = query\.eq\('user_profile_id', activeProfile\.id\);\s*\n\s*}\s*\n\s*const { data, error } = await query;\s*\n\s*if \(error\) throw error;/g,
  `const url = activeProfile ? \`/api/templates?profileId=\${activeProfile.id}\` : '/api/templates';\n      const res = await fetch(url);\n      if (!res.ok) throw new Error(await res.text());\n      const data = await res.json();`
);

// 6. Insert Template
content = content.replace(
  /const { error } = await supabase\s*\n\s*\.from\('campaign_settings'\)\s*\n\s*\.insert\(\[\s*\n\s*{\s*\n\s*id: newTemplateId,/g,
  `const res = await fetch('/api/templates', {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({\n          id: newTemplateId,`
);

content = content.replace(
  /user_profile_id: activeProfile\?\.id \|\| null,\s*\n\s*}\s*\n\s*\]\);\s*\n\s*if \(error\) throw error;/g,
  `user_profile_id: activeProfile?.id || null\n        })\n      });\n      if (!res.ok) throw new Error(await res.text());`
);

// 7. Update Template
content = content.replace(
  /const { error } = await supabase\s*\n\s*\.from\('campaign_settings'\)\s*\n\s*\.update\({/g,
  `const res = await fetch(\`/api/templates/\${editingTemplateId}\`, {\n        method: 'PUT',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({`
);

content = content.replace(
  /user_profile_id: activeProfile\?\.id \|\| null,\s*\n\s*}\)\s*\n\s*\.eq\('id', editingTemplateId\);\s*\n\s*if \(error\) throw error;/g,
  `user_profile_id: activeProfile?.id || null\n        })\n      });\n      if (!res.ok) throw new Error(await res.text());`
);

// 8. Delete Template
content = content.replace(
  /const { error } = await supabase\s*\n\s*\.from\('campaign_settings'\)\s*\n\s*\.delete\(\)\s*\n\s*\.eq\('id', templateId\);\s*\n\s*if \(error\) throw error;/g,
  `const res = await fetch(\`/api/templates/\${templateId}\`, { method: 'DELETE' });\n      if (!res.ok) throw new Error(await res.text());`
);

// 9. App Settings Fallback (remove it entirely)
content = content.replace(
  /try {\s*\n\s*const { data, error } = await supabase\.from\('app_settings'\)\.select\('value'\)\.eq\('key', 'gemini_api_key'\)\.single\(\);\s*\n\s*if \(!error && data && data\.value\) {\s*\n\s*setHasKey\(true\);\s*\n\s*}\s*\n\s*} catch \(err\) {}/g,
  `// Removed legacy app_settings fallback`
);

// 10. Upload Images
content = content.replace(
  /const { error: uploadError } = await supabase\.storage\s*\n\s*\.from\('princess-media'\)\s*\n\s*\.upload\(fileName, blob, {\s*\n\s*contentType: match\[1\],\s*\n\s*upsert: false\s*\n\s*}\);\s*\n\s*if \(uploadError\) throw uploadError;\s*\n\s*const { data: urlData } = supabase\.storage\s*\n\s*\.from\('princess-media'\)\s*\n\s*\.getPublicUrl\(fileName\);\s*\n\s*imageUrls\.push\(urlData\.publicUrl\);/g,
  `const res = await fetch('/api/upload', {\n          method: 'POST',\n          headers: { 'Content-Type': 'application/json' },\n          body: JSON.stringify({\n            base64: match[2],\n            contentType: match[1],\n            fileName\n          })\n        });\n        if (!res.ok) throw new Error(await res.text());\n        const uploadData = await res.json();\n        imageUrls.push(uploadData.url);`
);

// 11. Upload Additional Images (in handleSaveEdits)
content = content.replace(
  /const { error: uploadError } = await supabase\.storage\s*\n\s*\.from\('princess-media'\)\s*\n\s*\.upload\(fileName, blob, {\s*\n\s*contentType: match\[1\],\s*\n\s*upsert: false\s*\n\s*}\);\s*\n\s*if \(uploadError\) throw uploadError;\s*\n\s*const { data: urlData } = supabase\.storage\s*\n\s*\.from\('princess-media'\)\s*\n\s*\.getPublicUrl\(fileName\);\s*\n\s*uploadedNewUrls\.push\(urlData\.publicUrl\);/g,
  `const res = await fetch('/api/upload', {\n            method: 'POST',\n            headers: { 'Content-Type': 'application/json' },\n            body: JSON.stringify({\n              base64: match[2],\n              contentType: match[1],\n              fileName\n            })\n          });\n          if (!res.ok) throw new Error(await res.text());\n          const uploadData = await res.json();\n          uploadedNewUrls.push(uploadData.url);`
);

fs.writeFileSync('app/page.tsx', content);
console.log("Refactored app/page.tsx successfully.");
