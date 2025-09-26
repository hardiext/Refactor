"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowLeft, Check, Plus, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { showWarning } from "../atoms/toast";
import { createClient } from "@/utils/supabase/client";

/**
 * MultiInputList: simple component to manage dynamic list of strings (tags)
 */
function MultiInputList({
  items,
  setItems,
  placeholder,
  label,
}: {
  items: string[];
  setItems: (v: string[]) => void;
  placeholder?: string;
  label?: string;
}) {
  const [value, setValue] = useState("");
  const add = () => {
    const val = value.trim();
    if (!val) return;
    setItems([...items, val]);
    setValue("");
  };
  const remove = (i: number) => setItems(items.filter((_, idx) => idx !== i));

  return (
    <div>
      {label && <div className="text-sm font-medium mb-2">{label}</div>}
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none"
          placeholder={placeholder ?? "Add item and press Add"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
        />
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-2 bg-pink-600 text-white px-3 py-2 rounded text-sm"
        >
          <Plus size={14} /> Add
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((it, i) => (
          <span
            key={i}
            className="flex items-center gap-2 bg-gray-100 text-sm px-2 py-1 rounded-full"
          >
            <span className="max-w-[12rem] truncate">{it}</span>
            <button
              type="button"
              onClick={() => remove(i)}
              className="text-xs px-1 rounded hover:bg-gray-200"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function JobFormDialogWizard() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyImage, setCompanyImage] = useState("");
  const [salary, setSalary] = useState<number | "">("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [workType, setWorkType] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [expMin, setExpMin] = useState<number | "">("");
  const [expMax, setExpMax] = useState<number | "">("");

  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [benefit, setBenefit] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const steps = ["Basic", "Location & Type", "Description", "Lists", "Review"];
  const supabase = createClient();

  const canNext = () => {
    if (step === 0) return jobTitle.trim() && companyName.trim();
    if (step === 1) return true;
    if (step === 2) return description.trim();
    return true;
  };
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  const goto = (index: number) =>
    setStep(Math.max(0, Math.min(index, steps.length - 1)));

  const resetForm = () => {
    setJobTitle("");
    setCompanyName("");
    setCompanyImage("");
    setSalary("");
    setCity("");
    setCountry("");
    setWorkType("");
    setWorkMode("");
    setExpMin("");
    setExpMax("");
    setDescription("");
    setResponsibilities([]);
    setRequirements([]);
    setSkills([]);
    setBenefit([]);
    setStep(0);
    setTags([]);
  };
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${fileExt}`;
      const filePath = `company-logos/${fileName}`;

      const { error } = await supabase.storage
        .from("profile-photos")
        .upload(filePath, file);

      if (error) throw error;

      const { data } = supabase.storage
        .from("profile-photos")
        .getPublicUrl(filePath);
      setCompanyImage(data.publicUrl);

      toast.success("Logo uploaded successfully!");
    } catch (err: any) {
      toast.error(" Upload failed", {
        description: err.message,
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setAlert(null);
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
        tags: tags,
        experience_min: typeof expMin === "number" ? expMin : null,
        experience_max: typeof expMax === "number" ? expMax : null,
        job_details: [
          {
            description,
            responsibilities,
            requirements,
            skills,
            benefit,
          },
        ],
      };

      const res = await fetch("/api/employe/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Server error");

      setOpen(false);
      resetForm();

      toast.success("Job posted successfully!");
      setAlert({
        type: "success",
        message: `${jobTitle} at ${companyName} created successfully.`,
      });
    } catch (err: any) {
      toast.error("Failed to post job", {
        description: err.message || "Something went wrong",
      });
      setAlert({
        type: "error",
        message: err.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const progress = Math.round(((step + 1) / steps.length) * 100);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="py-1.5 h-auto px-3 text-xs text-neutral-800 bg-white border hover:bg-gradient-to-t from-pink-500 to-red-500 hover:text-white">
          <Plus size={14} className="mr-1" /> Add Job
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">
              Post a New Job
            </DialogTitle>
            <div className="text-xs text-muted-foreground">
              Step {step + 1} of {steps.length}
            </div>
          </div>

          <div className="mt-3 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-500"
            ></div>
          </div>
        </DialogHeader>

        {/* alert visual */}
        {alert && (
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium mt-3 ${
              alert.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            <AlertCircle size={16} />
            {alert.message}
          </div>
        )}

        <div className="mt-4 space-y-4 px-1">
          {step === 0 && (
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-sm font-medium">Job Title</label>
                <Input
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Senior Frontend Developer"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Company Name</label>
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Acme Ltd"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Company Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  disabled={uploading}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 
                             file:px-4 file:rounded-full file:border-0 
                             file:text-sm file:font-semibold 
                             file:bg-pink-600 file:text-white 
                             hover:file:bg-pink-700"
                />
                {uploading && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Uploading...
                  </p>
                )}
                {companyImage && (
                  <img
                    src={companyImage}
                    alt="Company Logo Preview"
                    className="mt-2 h-16 object-contain rounded"
                  />
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Salary (USD)</label>
                <Input
                  value={salary === "" ? "" : formatter.format(salary)}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, ""); // ambil angka saja
                    setSalary(raw ? Number(raw) : "");
                  }}
                  placeholder="$1,000"
                />
              </div>
              <div>
                <MultiInputList
                  items={tags}
                  setItems={setTags}
                  label="Tags"
                  placeholder="e.g. remote, senior, react"
                />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-sm font-medium">City</label>
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Jakarta"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Country</label>
                <Input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Indonesia"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Work Type</label>
                  <Input
                    value={workType}
                    onChange={(e) => setWorkType(e.target.value)}
                    placeholder="Full-time"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Work Mode</label>
                  <Input
                    value={workMode}
                    onChange={(e) => setWorkMode(e.target.value)}
                    placeholder="Remote"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">
                    Min Experience (yrs)
                  </label>
                  <Input
                    value={expMin === "" ? "" : String(expMin)}
                    onChange={(e) =>
                      setExpMin(e.target.value ? Number(e.target.value) : "")
                    }
                    type="number"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Max Experience (yrs)
                  </label>
                  <Input
                    value={expMax === "" ? "" : String(expMax)}
                    onChange={(e) =>
                      setExpMax(e.target.value ? Number(e.target.value) : "")
                    }
                    type="number"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a compelling job description..."
                rows={6}
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <MultiInputList
                items={responsibilities}
                setItems={setResponsibilities}
                label="Responsibilities"
                placeholder="e.g. Build UI"
              />
              <MultiInputList
                items={requirements}
                setItems={setRequirements}
                label="Requirements"
                placeholder="e.g. React"
              />
              <MultiInputList
                items={skills}
                setItems={setSkills}
                label="Skills"
                placeholder="e.g. JavaScript"
              />
              <MultiInputList
                items={benefit}
                setItems={setBenefit}
                label="Benefits"
                placeholder="e.g. Health insurance"
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Preview</div>
                  <div className="mt-2 font-semibold text-lg">
                    {jobTitle || "Job Title"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {companyName}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm">
                    {city} {country && `• ${country}`}
                  </div>
                  <div className="text-sm">
                    {workType} • {workMode}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium">Description</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {description || "—"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium">Responsibilities</div>
                  <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground">
                    {responsibilities.length ? (
                      responsibilities.map((r, i) => <li key={i}>{r}</li>)
                    ) : (
                      <li>—</li>
                    )}
                  </ul>
                </div>

                <div>
                  <div className="text-sm font-medium">Requirements</div>
                  <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground">
                    {requirements.length ? (
                      requirements.map((r, i) => <li key={i}>{r}</li>)
                    ) : (
                      <li>—</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer navigation */}
        <div className="flex items-center justify-between mt-6 pt-3 border-t">
          <div>
            {step > 0 && (
              <Button
                variant="ghost"
                onClick={() => goto(step - 1)}
                className="inline-flex items-center gap-2"
              >
                <ArrowLeft size={14} /> Prev
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {step < steps.length - 1 ? (
              <Button
                onClick={() =>
                  canNext()
                    ? goto(step + 1)
                    : showWarning("Be careful!", "Check your inputs again")
                }
                className="inline-flex items-center gap-2 bg-blue-600"
              >
                Next <ArrowRight size={14} />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="inline-flex items-center gap-2"
              >
                {loading ? (
                  "Posting..."
                ) : (
                  <>
                    <Check size={14} /> Publish
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
