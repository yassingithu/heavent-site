import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { estDemo, CLE_SESSION_DEMO } from '@/demo/mode';
import { fetchDemo } from '@/demo/serveurDemo';

// Projet Supabase de Heavent People Agency (compte i.chaigari@heaventagency.com)
export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || "https://mapiwnsjsluiwmnulhqk.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_FuR1ZTbO1AX8nVdtVz9KYQ_0pJQs7dz";
export const FUNCTIONS_URL = `${SUPABASE_URL}/functions/v1`;

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";
// Démo Heavent Studio (/studio/demo/…) : session fictive séparée et faux serveur dans le navigateur.
// La vraie session de l'administration (localStorage) n'est jamais touchée.
const DEMO = estDemo();
const memoireDemo = new Map<string, string>();
const stockageDemo = {
  getItem: (k: string) => memoireDemo.get(k) ?? null,
  setItem: (k: string, v: string) => { memoireDemo.set(k, v); },
  removeItem: (k: string) => { if (k !== CLE_SESSION_DEMO) memoireDemo.delete(k); },
};
if (DEMO) {
  const user = { id: "demo-user", email: "demo@heavent.studio", aud: "authenticated", role: "authenticated", app_metadata: {}, user_metadata: {} };
  // Session gardée en mémoire seulement : fonctionne même si le navigateur bloque le stockage (Safari, navigation privée…)
  memoireDemo.set(CLE_SESSION_DEMO, JSON.stringify({ access_token: "demo", refresh_token: "demo", token_type: "bearer", expires_in: 86400, expires_at: Math.floor(Date.now() / 1000) + 365 * 86400, user }));
  const reel = window.fetch.bind(window);
  // Les appels directs (fetch vers les fonctions) passent aussi par la démo
  window.fetch = ((e: RequestInfo | URL, i?: RequestInit) => {
    const u = typeof e === "string" ? e : e instanceof URL ? e.toString() : e.url;
    return u.includes(".supabase.co") ? fetchDemo(e, i) : reel(e, i);
  }) as typeof fetch;
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, DEMO ? {
  auth: { storage: stockageDemo, storageKey: CLE_SESSION_DEMO, persistSession: true, autoRefreshToken: false, detectSessionInUrl: false },
  global: { fetch: fetchDemo },
  realtime: { params: { eventsPerSecond: 1 } },
} : {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
