export type Skill = {
  id: string;        // UUID dari Supabase
  profile_id: string; // relasi ke profile
  name:  string[];   // array skill
};