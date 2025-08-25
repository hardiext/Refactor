import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareSupabaseClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const pathname = req.nextUrl.pathname

  if (!session && !pathname.startsWith('/authentication/signn')) {
    const url = req.nextUrl.clone()
    url.pathname = '/authentication/sigin'
    return NextResponse.redirect(url)
  }

  if (session && pathname !== '/onboarding' && pathname !== '/logout') {
    // Cek apakah profil user sudah ada
    const { data: profile } = await supabase
      .from('profile')
      .select('id')
      .eq('user_id', session.user.id)
      .maybeSingle()

    if (!profile) {
      // Jika belum ada profil → redirect ke /onboarding
      const url = req.nextUrl.clone()
      url.pathname = '/onboarding'
      return NextResponse.redirect(url)
    }
  }

  return res
}

// Middleware dijalankan di semua route
export const config = {
  matcher: ['/', '/profile', '/dashboard', '/(.*)'], 
}
