import 'dotenv/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Retrieve environment variables
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;

// Create and configure Supabase client
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;