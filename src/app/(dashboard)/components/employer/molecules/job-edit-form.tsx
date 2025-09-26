"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";

type JobDetails = {
  id?: string;
  job_id?: string;
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  skills?: string[];
  benefit?: string[];
  created_at?: string;
};

type JobProps = {
  id: string;
  company_name: string;
  company_image: string;
  job_title: string;
  tags: string[];
  work_type: string;
  work_mode: string;
  experience_min: number | null;
  experience_max: number | null;
  salary_amount: number | null;
  city: string;
  country: string;
  total_application: number;
  posted_at: string;
  job_details?: JobDetails[];
};

export default function EditJobFormDialog({ job }: { job: JobProps }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [jobTitle, setJobTitle] = useState(job.job_title || "");
  const [companyName, setCompanyName] = useState(job.company_name || "");
  const [companyImage, setCompanyImage] = useState(job.company_image || "");
  const [salary, setSalary] = useState<number | "">(job.salary_amount ?? "");
  const [city, setCity] = useState(job.city || "");
  const [country, setCountry] = useState(job.country || "");
  const [workType, setWorkType] = useState(job.work_type || "");
  const [workMode, setWorkMode] = useState(job.work_mode || "");
  const [expMin, setExpMin] = useState<number | "">(job.experience_min ?? "");
  const [expMax, setExpMax] = useState<number | "">(job.experience_max ?? "");
  const [tags, setTags] = useState<string[]>(job.tags || []);

  const details = job.job_details?.[0] || {
    description: "",
    responsibilities: [],
    requirements: [],
    skills: [],
    benefit: [],
  };

  const [description, setDescription] = useState(details.description || "");
  const [responsibilities, setResponsibilities] = useState<string[]>(
    details.responsibilities || []
  );
  const [requirements, setRequirements] = useState<string[]>(
    details.requirements || []
  );
  const [skills, setSkills] = useState<string[]>(details.skills || []);
  const [benefit, setBenefit] = useState<string[]>(details.benefit || []);

  const steps = ["Basic", "Location & Type", "Description", "Lists", "Review"];
  const progress = Math.round(((step + 1) / steps.length) * 100);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const body = {
        job_title: jobTitle,
        company_name: companyName,
        company_image: companyImage,
        city,
        country,
        salary_amount: typeof salary === "number" ? salary : null,
        work_type: workType,
        work_mode: workMode,
        tags,
        experience_min: typeof expMin === "number" ? expMin : null,
        experience_max: typeof expMax === "number" ? expMax : null,
        job_details: [
          { description, responsibilities, requirements, skills, benefit },
        ],
      };

      const res = await fetch(`/api/employe/jobs/${job.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Update failed");
      toast.success("Job updated!");
      setOpen(false);
    } catch (err: any) {
      toast.error("Update failed", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  // helper input untuk list
  const renderListInputs = (
    label: string,
    values: string[],
    setValues: React.Dispatch<React.SetStateAction<string[]>>
  ) => (
    <div className="space-y-2">
      <p className="font-medium">{label}</p>
      {values.map((val, i) => (
        <Input
          key={i}
          value={val}
          onChange={(e) => {
            const copy = [...values];
            copy[i] = e.target.value;
            setValues(copy);
          }}
          placeholder={`${label} ${i + 1}`}
        />
      ))}
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => setValues([...values, ""])}
      >
        + Add {label}
      </Button>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="shadow-none border-0 px-0 font-normal text-xs"
        >
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit Job</DialogTitle>
          <DialogDescription>
            Update the details of the selected job posting.
          </DialogDescription>
          <div className="mt-3 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-pink-500 to-red-500"
            />
          </div>
        </DialogHeader>

        {/* Step 0: Basic */}
        {step === 0 && (
          <div className="grid gap-3">
            <Input
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <Input
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <Input
              placeholder="Company Image URL"
              value={companyImage}
              onChange={(e) => setCompanyImage(e.target.value)}
            />
          </div>
        )}

        {/* Step 1: Location & Type */}
        {step === 1 && (
          <div className="grid gap-3">
            <Input
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Input
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <Input
              placeholder="Work Type (Full-time, Part-time)"
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
            />
            <Input
              placeholder="Work Mode (Onsite, Remote)"
              value={workMode}
              onChange={(e) => setWorkMode(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Salary Amount"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
            />
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min Exp"
                value={expMin}
                onChange={(e) => setExpMin(Number(e.target.value))}
              />
              <Input
                type="number"
                placeholder="Max Exp"
                value={expMax}
                onChange={(e) => setExpMax(Number(e.target.value))}
              />
            </div>
            <Textarea
              placeholder="Tags (comma separated)"
              value={tags.join(", ")}
              onChange={(e) =>
                setTags(
                  e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean)
                )
              }
            />
          </div>
        )}

        {/* Step 2: Description */}
        {step === 2 && (
          <div className="grid gap-3">
            <Textarea
              placeholder="Job Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
            />
          </div>
        )}

        {/* Step 3: Lists */}
        {step === 3 && (
          <div className="grid gap-6">
            {renderListInputs("Responsibilities", responsibilities, setResponsibilities)}
            {renderListInputs("Requirements", requirements, setRequirements)}
            {renderListInputs("Skills", skills, setSkills)}
            {renderListInputs("Benefit", benefit, setBenefit)}
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="space-y-3 text-sm">
            <p><b>Job Title:</b> {jobTitle}</p>
            <p><b>Company:</b> {companyName}</p>
            <p><b>Salary:</b> {salary}</p>
            <p><b>Location:</b> {city}, {country}</p>
            <p><b>Type:</b> {workType} | {workMode}</p>
            <p><b>Experience:</b> {expMin} - {expMax} years</p>
            <p><b>Tags:</b> {tags.join(", ")}</p>
            <p><b>Description:</b> {description}</p>
            <p><b>Responsibilities:</b> {responsibilities.join(", ")}</p>
            <p><b>Requirements:</b> {requirements.join(", ")}</p>
            <p><b>Skills:</b> {skills.join(", ")}</p>
            <p><b>Benefit:</b> {benefit.join(", ")}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-3 border-t">
          {step > 0 && (
            <Button variant="ghost" onClick={() => setStep(step - 1)}>
              <ArrowLeft size={14} /> Prev
            </Button>
          )}
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep(step + 1)}>
              Next <ArrowRight size={14} />
            </Button>
          ) : (
            <Button onClick={handleUpdate} disabled={loading}>
              {loading ? (
                "Updating..."
              ) : (
                <>
                  <Check size={14} /> Update
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
