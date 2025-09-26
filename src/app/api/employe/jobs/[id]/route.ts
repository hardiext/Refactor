import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

interface PatchJobBody {
  job_title?: string;
  company_name?: string;
  company_image?: string;
  city?: string;
  country?: string;
  salary_amount?: number;
  work_type?: string;
  work_mode?: string;
  experience_min?: number;
  experience_max?: number;
  tags?: string[];
  job_details?: any[];
}

export async function PATCH(
  req: Request,
  context: { params: Record<string, string> } // ✅ tipe Record<string,string> aman
) {
  const { id } = context.params; // id sebagai string
  const supabase = await createClient();

  // Ambil user yg sudah diverifikasi
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: PatchJobBody = await req.json();

  const {
    job_title,
    company_name,
    company_image,
    city,
    country,
    salary_amount,
    work_type,
    work_mode,
    experience_min,
    experience_max,
    tags,
    job_details,
  } = body;

  // Update jobs table
  const { data: job, error: jobError } = await supabase
    .from("jobs")
    .update({
      job_title,
      company_name,
      company_image,
      city,
      country,
      salary_amount,
      work_type,
      work_mode,
      experience_min,
      experience_max,
      tags,
    })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (jobError) {
    return NextResponse.json({ error: jobError.message }, { status: 400 });
  }

  // Handle job_details → hapus lama → insert baru
  if (job_details?.length) {
    await supabase.from("job_details").delete().eq("job_id", id);

    const { error: detailError } = await supabase.from("job_details").insert(
      job_details.map((d: any) => ({
        job_id: id,
        description: d.description,
        responsibilities: d.responsibilities,
        requirements: d.requirements,
        skills: d.skills,
        benefit: d.benefit,
      }))
    );

    if (detailError) {
      return NextResponse.json({ error: detailError.message }, { status: 400 });
    }
  }

  return NextResponse.json({ job }, { status: 200 });
}
