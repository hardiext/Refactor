import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {  ApplyFormData1 } from "@/types/job";
import { UseFormReturn } from "react-hook-form";

const Step1PersonalInformation = ({
  form,
}: {
  form: UseFormReturn<ApplyFormData1>;
}) => {
  const {
    register,
    formState: { errors },
  } = form;
  return (
    <div className="w-full">
      <div className=" border-l-4 rounded-xs border-l-pink-500 px-2">
        <Label className="text-lg">Personal Information</Label>
      </div>
      <div className="flex flex-col gap-y-[20px] mt-[20px] ">
        <div>
          <Label className="text-xs font-medium mb-2">
            Current/Most Recent Position
          </Label>
          <Input
            {...register("fullname", { required: "Name is required" })}
            placeholder="John dae"
            className="shadow-none text-xs"
          />
        </div>
        <div>
          <Label className="text-xs font-medium mb-2">Email Adrees</Label>
          <Input
            {...register("email", { required: "email is required" })}
            type="email"
            placeholder="johndae@gmail.cpm"
            className="shadow-none text-xs"
          />
        </div>
        <div>
          <Label className="text-xs font-medium mb-2">Phone Number</Label>
          <Input
            {...register("phone", { required: "Phone number is required" })}
            placeholder="+62 123 123 12"
            className="shadow-none text-xs"
          />
        </div>
        <div>
            
          <Label className="text-xs font-medium mb-2">Location</Label>
          <Input {...register("location", { required: "Phone number is required" })} placeholder="city, country" className="shadow-none text-xs" />
        </div>
        <div className=" mt-[20px] border-l-4 rounded-xs border-l-pink-500 px-2">
          <Label className="text-lg">LinkedIn Profile</Label>
        </div>
        <div>
          <Label className="text-xs font-medium mb-2">LinkedIn Url</Label>
          <Input
          {...register("linkedln", { required: "LinkedIn url is required" })}
            placeholder="https://linkedln.com/in/yourprofile"
            className="shadow-none text-xs"
          />
        </div>
      </div>
    </div>
  );
};
export default Step1PersonalInformation;
