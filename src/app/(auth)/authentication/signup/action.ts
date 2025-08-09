'use server'
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function signup(data: { 
  "Display name": string; 
  email: string; 
  password: string 
}) {
  const supabase = await createClient();

  // Validate input
  if (!data.email || !data.password) {
    throw new Error("Email and password are required");
  }

  const { error, data: { user } } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        display_name: data["Display name"]
      },
       emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`
    }
  });

  if (error) {
    console.error('Signup error:', error);
    throw new Error(error.message);
  }

  if (!user) {
    throw new Error("User creation failed");
  }
  

  revalidatePath('/auth/email_confirm', 'layout');
  redirect(`/auth/email_confirm?email=${encodeURIComponent(data.email)}`);
}