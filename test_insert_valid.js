const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://joguflygbdmxbyikwlva.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvZ3VmbHlnYmRteGJ5aWt3bHZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2ODUyOTcsImV4cCI6MjA5MDI2MTI5N30.155ZwjJzL44RTwxAb5MzyU68hnfT0BNbhmLG3BEv5YQ'
);

async function run() {
  console.log("Attempting insert with REAL key...");
  const { data, error } = await supabase
    .from('user_profiles')
    .insert({ name: 'NodeTest', emoji: '🤖' })
    .select()
    .single();

  if (error) {
    console.error("ERROR:", error);
  } else {
    console.log("SUCCESS:", data);
  }
}

run();
