import { createClient } from '@supabase/supabase-js'

export function createServerSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Ini harus SERVICE ROLE KEY, bukan anon key
    {
      auth: {
        persistSession: false,
        detectSessionInUrl: false,
      },
    }
  )
}
