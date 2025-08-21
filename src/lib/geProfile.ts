
import { Experience } from '@/types/experience';
import { createClient } from '@/utils/supabase/client';

export async function getUserProfile(userId: string) {
    const supabase = createClient()  // Ambil profile
  const { data: profile, error: profileError } = await supabase
    .from('profile')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (profileError) throw profileError;
  const { data: experiences, error: expError } = await supabase
    .from('work_experience')
    .select('*')
    .eq('profile_id', profile.id)
    .order('start_date', { ascending: false });

  if (expError) throw expError;

  return { profile, experiences: experiences as Experience[] };
}
