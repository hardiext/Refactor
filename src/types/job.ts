// lib/mappers/job.ts

export interface JobFromDb {
  id: string;
  company_name: string;
  company_image: string;
  job_title: string;
  tags: string[];
  work_type: string;
  work_mode: string;
  experience_min: number | null;
  experience_max: number | null;
  salary_type: "fixed" | "range";
  salary_amount: number | null;
  salary_min: number | null;
  salary_max: number | null;
  city: string;
  country: string;
  total_application: number;
  job_details?: Array<{
    id?: string;
    description?: string;
    responsibilities?: string[];
    requirements?: string[];
    skills?: string[];
    benefit?: string[];
    created_at?: string;
  }>;
  posted_at: string;
}

interface SalaryRange {
  type: "range";
  min: number;
  max: number;
}

interface SalaryFixed {
  type: "fixed";
  amount: number;
}

type Salary = SalaryRange | SalaryFixed;

export interface CardProps {
  id: string;
  company_name: string;
  company_image: string;
  job_title: string;
  tags: string[];
  work_type: string;
  work_mode: string;
  experience_min: number | null;
  experience_max: number | null;
  salary: Salary;
  city: string;
  country: string;
  total_application: number;
  postedAt: string;
}

export type ApplyFormData = {
  name: string;
  email: string;
  phone: string;
  age: number;
  resume: FileList;
  portfolio?: string;
  coverLetter?: string;
  reason?: string;
  salary?: number;
  agree?: boolean;
};
export type ApplyFormData1 = {
  fullname: string;
  email: string;
  phone: string;
  location: string;
  linkedln: string;
  position: string;
  experience: string;
  skill: string | string[];
  resume: File;
  portfolio?: string;
  coverLetter?: string;
  agree?: boolean;
};

export type JobDetailType = {
  id: string;
  job_title: string;
  company_name: string;
  company_image: string;
  city: string;
  country: string;
  // tags: string[];
  salary_amount: number;
  work_type: string;
  work_mode: string;
  experience_min: number | null;
  experience_max: number | null;
  // total_applicants: number;
  job_details?: Array<{
    id?: string;
    description?: string;
    responsibilities?: string[];
    requirements?: string[];
    skills?: string[];
    benefit?: string[];
    created_at?: string;
  }>;
  posted_at: string;
};

export type JobCardPropsDetail = {
  id: string;
  job_title: string;
  company_name: string;
  company_image: string;
  total_applicants: number;
  job_details?: Array<{
    id?: string;
    description?: string;
  }>;
};

export const mapJobFromDb = (job: JobFromDb): CardProps => {
  const salary: Salary =
    job.salary_type === "fixed"
      ? { type: "fixed" as const, amount: Number(job.salary_amount) }
      : {
          type: "range" as const,
          min: Number(job.salary_min),
          max: Number(job.salary_max),
        };

  return {
    id: job.id,
    company_name: job.company_name,
    company_image: job.company_image,
    job_title: job.job_title,
    tags: job.tags,
    work_type: job.work_type,
    work_mode: job.work_mode,
    experience_min: job.experience_min,
    experience_max: job.experience_max,
    salary,
    city: job.city,
    country: job.country,
    
    total_application: job.total_application,
    
    postedAt: job.posted_at,
  };
};
