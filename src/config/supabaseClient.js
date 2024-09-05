const dotenv = require('dotenv');
dotenv.config();

const { createClient } = require('@supabase/supabase-js');

// Retrieve environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Create and configure Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
