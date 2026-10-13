import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Projet Supabase de Heavent People Agency (compte i.chaigari@heaventagency.com)
export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || "https://mapiwnsjsluiwmnulhqk.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_FuR1ZTbO1AX8nVdtVz9KYQ_0pJQs7dz";
export const FUNCTIONS_URL = `${SUPABASE_URL}/functions/v1`;

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
