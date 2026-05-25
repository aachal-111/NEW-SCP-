// src/lib/supabaseClient.js
// Connects to your Supabase project using environment variables.
// VITE_ prefix exposes them to the browser bundle.

import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env')
}

// createClient returns a Supabase client that auto-generates REST API calls
// from the table schema — no manual endpoint writing required.
export const supabase = createClient(supabaseUrl, supabaseKey)
