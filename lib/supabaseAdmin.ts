import { createClient } from '@supabase/supabase-js'

/**
 * Server-only Supabase admin client — uses the service role key to bypass RLS.
 * NEVER import this in client components or expose it to the browser.
 * Only use in Server Actions, Route Handlers, or server components.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})
