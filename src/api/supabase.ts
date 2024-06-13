import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://feduquiamhahcejgnxhn.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlZHVxdWlhbWhhaGNlamdueGhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyNDEyMDksImV4cCI6MjAzMzgxNzIwOX0.w0dc4d6zt_8LjWUN993Hlp0dyxrH8b1DHFXlPk5xsHY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
