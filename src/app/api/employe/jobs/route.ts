
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

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

  const { data: job, error: jobError } = await supabase
    .from("jobs")
    .insert([
      {
        user_id: session.user.id,
        job_title,
        company_name,
        company_image,
        city,
        country,
        salary_amount,
        work_type,
        work_mode,
        tags,
        experience_min,
        experience_max,
      },
    ])
    .select()
    .single();

  if (jobError) {
    return NextResponse.json({ error: jobError.message }, { status: 400 });
  }


  if (job_details?.length) {
    const { error: detailError } = await supabase
      .from("job_details")
      .insert(
        job_details.map((d: any) => ({
          job_id: job.id,
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

  return NextResponse.json({ job }, { status: 201 });
}
