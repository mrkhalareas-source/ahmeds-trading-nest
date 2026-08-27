// Public Supabase client with Lovable Cloud fallbacks.
// The URL and publishable key are public values (safe to ship in the browser bundle).
// Env vars take precedence when present; fallbacks keep production working even if
// the build-time VITE_* injection is missing.
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { brokeredPreviewStorage } from "@/integrations/supabase/previewAuthStorage";

const FALLBACK_SUPABASE_URL = "https://niawnhcvktqyfvvajhtd.supabase.co";
const FALLBACK_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_BdCtZ0f-oIVOTTkpjDOlOw_MPmEWmGb";

export const SUPABASE_URL: string =
  (import.meta.env["VITE_SUPABASE_URL"] as string | undefined) ?? FALLBACK_SUPABASE_URL;

export const SUPABASE_PUBLISHABLE_KEY: string =
  (import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] as string | undefined) ??
  (import.meta.env["VITE_SUPABASE_ANON_KEY"] as string | undefined) ??
  FALLBACK_SUPABASE_PUBLISHABLE_KEY;

function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}

function createSupabaseFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );

    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }

    if (isNewSupabaseApiKey(supabaseKey) && headers.get("Authorization") === `Bearer ${supabaseKey}`) {
      headers.delete("Authorization");
    }

    headers.set("apikey", supabaseKey);
    return fetch(input, { ...init, headers });
  };
}

function createSupabaseClient() {
  return createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    global: {
      fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY),
    },
    auth: {
      storage: brokeredPreviewStorage(),
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

let _supabase: ReturnType<typeof createSupabaseClient> | undefined;

// Import like: import { supabase } from "@/lib/supabaseClient";
export const supabase = new Proxy({} as ReturnType<typeof createSupabaseClient>, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  },
});
