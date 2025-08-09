'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import StepProgress from "../molecules/proger-bar";
import Step1PersonalInformation from "../molecules/step1";
import Step2PersonalExperinece from "../molecules/step2";
import Step3Review from "../molecules/step3";
import { useForm } from "react-hook-form";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import type { ApplyFormData1 } from "@/types/job";

interface applyProp {
  jobId: string;
  job_title: string;
  company_name: string;
  city: string;
  country: string;
  work_type: string;
}

const ApplyForm = ({
  job_title,
  company_name,
  city,
  country,
  work_type,
  jobId,
}: applyProp) => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  const form = useForm<ApplyFormData1>({
    mode: "onSubmit",
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      location: "",
      linkedln: "",
      position: "",
      experience: "",
      skill: [],
      portfolio: "",
      coverLetter: "",
      resume: undefined,
      agree: false,
    },
  });

  const {
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = form;

  const fieldsPerStep: Record<number, (keyof ApplyFormData1)[]> = {
    1: ["fullname", "email", "phone", "location", "linkedln"],
    2: ["position", "experience", "skill", "portfolio", "resume"],
    3: ["coverLetter", "agree"],
  };

  const onNext = async () => {
    const valid = await trigger(fieldsPerStep[step]);
    if (!valid) return;
    if (step < 4) {
      setStep((s) => Math.min(s + 1, totalSteps));
    }
  };

  const onRev = () => {
    if (step > 1) {
      setStep((s) => Math.min(s - 1, totalSteps));
    }
  };

  const onSubmit = async (data: ApplyFormData1) => {
    const valid = await trigger();
    if (!valid) return;

    let skillParsed: string[] = [];
    if (typeof data.skill === "string") {
      skillParsed = data.skill
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (Array.isArray(data.skill)) {
      skillParsed = data.skill;
    }

    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setErrorMsg("Kamu harus login untuk melamar.");
      setIsSubmitting(false);
      return;
    }

    const userId = session.user.id;
    const file = data.resume;
    let resumeUrl = "";

    if (file) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(`user-${userId}/${file.name}`, file);

      if (uploadError) {
        setErrorMsg("Gagal upload CV: " + uploadError.message);
        setIsSubmitting(false);
        return;
      }

      resumeUrl = supabase.storage.from("resumes").getPublicUrl(uploadData.path)
        .data.publicUrl;
    }

    const { error } = await supabase.from("job_applications").insert([
      {
        user_id: userId,
        job_id: jobId,
        fullname: data.fullname,
        email: data.email,
        phone: data.phone,
        location: data.location,
        linkedln: data.linkedln,
        position: data.position,
        experience: data.experience,
        skill: skillParsed,
        portofolio: data.portfolio,
        resume: resumeUrl,
        cover_letter: data.coverLetter,
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      setErrorMsg("Gagal mengirim lamaran: " + error.message);
    } else {
      alert("lamaran berhasil terkirim")
      setSuccessMsg("Lamaran berhasil dikirim!");
      reset();
      setStep(1);
      setTimeout(() => {
        setIsOpen(false);
        setSuccessMsg("");
      }, 1500);
    }
  };

  // Function handle click tombol Apply form
  const handleApplyClick = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/authentication/signin"); // sesuaikan route sign in kamu
      return;
    }
    // Kalau sudah login, buka sheet
    setIsOpen(true);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <button
          onClick={handleApplyClick}
          className="bg-pink-500 text-white px-4 h-9 tex-xs rounded-xs cursor-pointer"
        >
          Apply form
        </button>
        <SheetContent className="pt-6  lg:max-w-[490px] max-w-[100vw] overflow-y-auto">
          <SheetHeader className="border-b">
            <SheetTitle className="text-xl">{job_title}</SheetTitle>
            <SheetDescription className="flex items-center space-x-6 text-xs text-gray-500 mt-2">
              <span>{company_name}</span>
              <span>
                {city}, {country}
              </span>{" "}
              <span>{work_type}</span>
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-4 px-4">
              <StepProgress
                currentStep={step}
                steps={["Personal Info", "Experience", "Review"]}
              />
              <div className="pt-4 mt-6">
                {step == 1 && <Step1PersonalInformation form={form} />}
                {step == 2 && <Step2PersonalExperinece form={form} />}
                {step == 3 && <Step3Review form={form} />}
              </div>
            </div>
            <SheetFooter className="flex flex-row items-center justify-end border-t">
              {step > 1 ? (
                <div
                  onClick={() => onRev()}
                  className="text-sm border border-gray-200 px-4 h-10 flex items-center justify-center rounded-md"
                >
                  Back
                </div>
              ) : null}

              <div>
                {step < totalSteps ? (
                  <div
                    onClick={() => onNext()}
                    className="text-sm  px-4 h-10 bg-pink-600 flex items-center justify-center rounded-md text-white"
                  >
                    Continue
                  </div>
                ) : (
                  <Button
                    disabled={!watch("agree") || isSubmitting}
                    type="submit"
                    className="text-sm  px-4 h-10 bg-pink-600 flex items-center justify-center rounded-md text-white"
                  >
                    {isSubmitting ? "Mengirim..." : "Kirim Lamaran"}
                  </Button>
                )}
              </div>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ApplyForm;
