import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://joguflygbdmxbyikwlva.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvZ3VmbHlnYmRteGJ5aWt3bHZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2ODUyOTcsImV4cCI6MjA5MDI2MTI5N30.155ZwjJzL44RTwxAb5MzyU68hnfT0BNbhmLG3BEv5YQ';

export const supabase = createClient(supabaseUrl, supabaseKey);
