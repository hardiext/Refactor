import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "lucide-react";
import ApplicantsTable from "../molecules/table-applicants";

const SelectByCategory = [
  { value: "all", label: "All Category" },
  { value: "recent", label: "Most Recent" },
  { value: "positon", label: "Position" },
];

const RecentApplicant = () => {
  return (
    <article className="w-full P-2 bg-white rounded-md">
      <div className="px-1 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2.5 bg-neutral-50 rounded-md">
            <User size={18} />
          </div>
          <h2 className="text-xs font-semibold">Recent Application</h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className="">
            <Input
              className="w-full max-w-xs bg-neutral-50 text-sm placeholder:text-xs border shadow-none"
              placeholder="Search"
            />
          </div>
          <div>
            <Select defaultValue="all">
              <SelectTrigger className="px-4 text-sm bg-neutral-50 shadow-none">
                <SelectValue placeholder="All Category" className="text-sm"/>
              </SelectTrigger>
              <SelectContent>
                {SelectByCategory.map((item) => (
                  <SelectItem value={item.value} key={item.value} className="text-sm">
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="">
        <ApplicantsTable/>
      </div>
    </article>
  );
};

export default RecentApplicant;
