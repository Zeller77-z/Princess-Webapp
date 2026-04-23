const fs = require('fs');

let content = fs.readFileSync('app/page.tsx', 'utf8');
// Normalize to LF
content = content.replace(/\r\n/g, '\n');

function replaceBlock(oldBlock, newBlock) {
  if (content.indexOf(oldBlock) !== -1) {
    content = content.replace(oldBlock, newBlock);
  } else {
    console.error("COULD NOT FIND BLOCK:", oldBlock.substring(0, 50));
  }
}

replaceBlock(`import { supabase } from '@/lib/supabaseClient';`, ``);

replaceBlock(`      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: true });
      if (error) throw error;`,
`      const res = await fetch('/api/profiles');
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();`);

replaceBlock(`      const { data, error } = await supabase
        .from('user_profiles')
        .insert({ name: newProfileName.trim(), emoji: newProfileEmoji })
        .select()
        .single();
      if (error) throw error;`,
`      const res = await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newProfileName.trim(), emoji: newProfileEmoji })
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to create profile');
      }
      const data = await res.json();`);

replaceBlock(`      // Save to Supabase for cloud sync
      const { error } = await supabase
        .from('user_profiles')
        .update({ gemini_api_key: apiKeyInput.trim() })
        .eq('id', activeProfile.id);
      if (error) throw error;`,
`      // Save to API
      const res = await fetch(\`/api/profiles/\${activeProfile.id}\`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gemini_api_key: apiKeyInput.trim() })
      });
      if (!res.ok) throw new Error(await res.text());`);

replaceBlock(`      let query = supabase
        .from('campaign_settings')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (activeProfile) {
        query = query.eq('user_profile_id', activeProfile.id);
      }
      
      const { data, error } = await query;
      if (error) throw error;`,
`      const url = activeProfile ? \`/api/templates?profileId=\${activeProfile.id}\` : '/api/templates';
      const res = await fetch(url);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();`);

replaceBlock(`        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(fileName, blob, { upsert: true, contentType: match[1] });
        
        if (uploadError) {
          console.error('Upload error:', uploadError);
          continue;
        }
        
        const { data: urlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);
        
        imageUrls.push(urlData.publicUrl);`,
`        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            base64: match[2],
            contentType: match[1],
            fileName
          })
        });
        
        if (!res.ok) {
          console.error('Upload error:', await res.text());
          continue;
        }
        
        const uploadData = await res.json();
        imageUrls.push(uploadData.url);`);

replaceBlock(`        const { error } = await supabase
          .from('campaign_settings')
          .update(payload)
          .eq('id', editingTemplateId);
        
        if (error) throw error;`,
`        const res = await fetch(\`/api/templates/\${editingTemplateId}\`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error(await res.text());`);

replaceBlock(`        const { error } = await supabase
          .from('campaign_settings')
          .upsert(payload, { onConflict: 'name' });

        if (error) throw error;`,
`        const res = await fetch('/api/templates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error(await res.text());`);

replaceBlock(`      const { error } = await supabase
        .from('campaign_settings')
        .delete()
        .eq('id', template.id);

      if (error) throw error;`,
`      const res = await fetch(\`/api/templates/\${template.id}\`, { method: 'DELETE' });
      if (!res.ok) throw new Error(await res.text());`);

replaceBlock(`      const { error } = await supabase
        .from('campaign_settings')
        .update({ name: newName, updated_at: new Date().toISOString() })
        .eq('id', template.id);
        
      if (error) throw error;`,
`      const res = await fetch(\`/api/templates/\${template.id}\`, { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ name: newName, updated_at: new Date().toISOString() }) 
      });
      if (!res.ok) throw new Error(await res.text());`);

replaceBlock(`          const { error: uploadError } = await supabase.storage
            .from('product-images')
            .upload(fileName, blob, { upsert: true, contentType: match[1] });

          if (uploadError) {
            console.error('Upload error:', uploadError);
            continue;
          }

          const { data: urlData } = supabase.storage
            .from('product-images')
            .getPublicUrl(fileName);
          
          uploadedNewUrls.push(urlData.publicUrl);`,
`          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              base64: match[2],
              contentType: match[1],
              fileName
            })
          });
          
          if (!res.ok) {
            console.error('Upload error:', await res.text());
            continue;
          }
          
          const uploadData = await res.json();
          uploadedNewUrls.push(uploadData.url);`);

replaceBlock(`      const { error } = await supabase
        .from('campaign_settings')
        .update(payload)
        .eq('id', editDataTemplate.id);
      if (error) throw error;`,
`      const res = await fetch(\`/api/templates/\${editDataTemplate.id}\`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(await res.text());`);

fs.writeFileSync('app/page.tsx', content);
console.log("Literal replacement script finished.");
