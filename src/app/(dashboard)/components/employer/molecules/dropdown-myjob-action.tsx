import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import EditJobFormDialog from "./job-edit-form";

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
const DropdownMyJobAction = ({ job }: { job: JobProps }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal className="cursor-pointer" size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="text-xs">View</DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()} // cegah menu auto-close
        >
          <EditJobFormDialog job={job} />
        </DropdownMenuItem>

        <DropdownMenuItem className="text-xs">Private</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-xs">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default DropdownMyJobAction;
