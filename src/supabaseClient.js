import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vmicqakawfpqprtgnijz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtaWNxYWthd2ZwcXBydGduaWp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMzE4MTgsImV4cCI6MjA1OTgwNzgxOH0.NDEjken1xMt2gqhNKyA1bcKmQu_GDXfPTiMPrrz7YLM";

export const supabase = createClient(supabaseUrl, supabaseKey);
