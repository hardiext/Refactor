import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ApplyFormData, ApplyFormData1 } from "@/types/job";
import { UseFormReturn } from "react-hook-form";
const Step3Review = ({ form }: { form: UseFormReturn<ApplyFormData1> }) => {
  const {
    register,
    formState: { errors },
    getValues,
  } = form;

  const values = getValues();

  return (
    <div className="w-full">
      <div className=" border-l-4 rounded-xs border-l-pink-500 px-2">
        <Label className="text-lg">Review Your Application</Label>
      </div>
      <p className="text-sm text-gray-500 mt-4">
        Please review your information before submitting your application.
      </p>
      <div className="flex flex-col gap-y-[10px] mt-[20px] ">
        <div className="flex flex-col space-y-6 ">
          <Card className="shadow-none border-0 p-4 bg-purple-50 oerflow-x-auto ">
            <CardHeader className="p-0 flex items-center justify-between">
              <h1 className="text-md">Experience</h1>
              <button className="text-pink-500 text-sm">Edit</button>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4 p-0">
              <div className="flex items-center space-x-2">
                <Label className="text-sm font-medium text-gray-400">
                  Position:
                </Label>
                <span className="text-sm">{values.position || "-"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Label className="text-sm font-medium text-gray-400">
                  Years of Experience:
                </Label>
                <span className="text-sm">{values.experience || "-"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Label className="text-sm font-medium text-gray-400">
                  Key Skills:
                </Label>
                <span className="text-sm">{values.skill || "-"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Label className="text-sm font-medium text-gray-400">
                  Portfolio:
                </Label>
                <span className="text-sm">{values.portfolio || "-"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Label className="text-sm font-medium text-gray-400">
                  Resume:
                </Label>
                <span>{values.resume?.name[0] || "-"}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none border-0 p-4 bg-purple-50">
            <CardHeader className="p-0 flex items-center justify-between">
              <h1 className="text-md">Personal Information</h1>
              <button className="text-pink-500 text-sm">Edit</button>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4 p-0">
              <div className="flex items-center space-x-2">
                <Label className="text-sm font-medium text-gray-400">
                  Full Name:
                </Label>
                <span className="text-sm">{values.fullname || "-"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Label className="text-sm font-medium text-gray-400">
                  Email:
                </Label>
                <span className="text-sm">{values.email || "-"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Label className="text-sm font-medium text-gray-400">
                  Phone Number:
                </Label>
                <span className="text-sm">{values.phone || "-"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Label className="text-sm font-medium text-gray-400">
                  Location:
                </Label>
                <span className="text-sm">{values.location || "-"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Label className="text-sm font-medium text-gray-400">
                  LinkedIn:
                </Label>
                <span className="text-sm">{values.linkedln || "-"}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-[20px] border-l-4 rounded-xs border-l-pink-500 px-2">
          <Label className="text-lg">Final Details</Label>
        </div>
        <div>
          <Label className="text-xs font-medium mb-2 mt-2">Cover Letter</Label>
          <Textarea
            {...register("coverLetter", {
              required: "Tell us why you're a great fit for this position",
            })}
            placeholder="Tell us why you're a great fit for this position"
            className="shadow-none text-xs"
          />
        </div>
        <div>
          <label className="inline-flex items-center space-x-2 cursor-pointer">
            <input
              {...register("agree", {
                required: "You must agree before submitting",
              })}
              type="checkbox"
              className="form-checkbox"
            />
            <span className="text-xs">
              agree to the <span className="text-blue-500">Privacy Policy</span> and consent to my data being processed
              for this application.
            </span>
          </label>
          {errors.agree && (
            <p className="text-red-500 text-xs mt-1">{errors.agree.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default Step3Review