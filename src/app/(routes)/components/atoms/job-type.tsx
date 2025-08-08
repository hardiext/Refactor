import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { jobType } from "@/constant/filter-value";

const jobTypeFilter = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {jobType.map((item, index) => (
        <div key={index} className="flex space-x-2 items-center">
          <Checkbox value={item.value}  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-0"/>
          <Label className="text-xs font-normal">{item.label}</Label>
        </div>
      ))}
    </div>
  );
};
export default jobTypeFilter;
