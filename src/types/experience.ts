export type Experience = {
  id: string;
  profile_id: string;
  company: string;
  role: string;
  period: string;
  start_date?: string;
  end_date?: string;
  location?: string;
  description?: string;
  skills?: string[];
  logoUrl?: string;
  link?: string;
  created_at?: string;
  updated_at?: string;
  is_current?: boolean;
};
