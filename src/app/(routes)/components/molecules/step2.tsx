import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApplyFormData1 } from "@/types/job";
import { UseFormReturn } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { File } from "lucide-react";

const Step2PersonalExperience = ({
  form,
}: {
  form: UseFormReturn<ApplyFormData1>;
}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = form;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setValue("resume", acceptedFiles[0]);
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"], "application/msword": [".doc", ".docx"] },
    multiple: false,
  });

  return (
    <div className="w-full">
      <div className="border-l-4 rounded-xs border-l-pink-600 px-2">
        <Label className="text-lg">Personal Experience</Label>
      </div>

      <div className="flex flex-col gap-y-5 mt-5">
        <div>
          <Label className="text-xs font-medium mb-2 block">
            Current/Most Recent Position
          </Label>
          <Input
            {...register("position", { required: "Position is required" })}
            placeholder="e.g. UX Designer"
            className="shadow-none text-xs"
          />
        </div>

        <div>
          <Label className="text-xs font-medium mb-2 block">Years of Experience</Label>
          <Select
            onValueChange={(value) => setValue("experience", value)}
          >
            <SelectTrigger className="text-xs w-full shadow-none">
              <SelectValue placeholder="Select years of experience" />
            </SelectTrigger>
            <SelectContent className="w-f">
              <SelectItem value="0-1">0 - 1 years</SelectItem>
              <SelectItem value="2-3">2 - 3 years</SelectItem>
              <SelectItem value="4-5">4 - 5 years</SelectItem>
              <SelectItem value="5+">5+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-xs font-medium mb-2 block">Key Skill</Label>
          <Input
            {...register("skill", { required: "Skill is required" })}
            placeholder="e.g. Figma, React, UI Design"
            className="shadow-none text-xs"
          />
        </div>


        <div className="mt-6 border-l-4 rounded-xs border-l-pink-600 px-2">
          <Label className="text-lg">Portfolio & Resume</Label>
        </div>

        <div>
          <Label className="text-xs font-medium mb-2 block">Portfolio Link</Label>
          <Input
            {...register("portfolio", { required: "Portfolio link is required" })}
            placeholder="https://yourportfolio.com"
            className="shadow-none text-xs"
          />
        </div>

        <div>
          <Label className="text-xs font-medium mb-2 block">Upload Resume (PDF/DOC)</Label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed hover:border-pink-600 p-4 h-[200px] bg-gray-50 flex flex-col items-center justify-center rounded text-xs text-center cursor-pointer ${
              isDragActive ? "border-pink-600 bg-purple-50" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the resume here...</p>
            ) : (
               <div className="flex flex-col items-center justify-center">
                     <File className="text-pink-400"/>
                     <p className="text-sm mt-2 font-semibold text-neutral-800">Drag & drop or click to upload</p>
                     <span className="mt-4 text-neutral-400">PDF,DOC,DOCX(max 5mb)</span>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2PersonalExperience;
