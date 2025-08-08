import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ShortByFilter from "../atoms/sort-by";
import JobTypeFilter from "../atoms/job-type";
import { SalaryRangeSlider } from "../atoms/salary-range";
import JobExperience from "../atoms/job-experience";


const FilterAside = () => {
    return(
        <aside className="h-screen w-full bg-white border-r border-gray-100 p-4">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <Label>Job Filter</Label>
                <Button className="text-xs px-4 h-8 bg-white rounded-full border-gray-200 border shadow-none text-pink-600">Reset</Button>
            </div>
            <div className="py-4 border-b flex flex-col space-y-4">
                <label className="text-xs font-semibold mb-">ShortBy</label>
                <ShortByFilter/>
            </div>
            <div className="py-4 border-b flex flex-col space-y-4">
                <label className="text-xs font-semibold mb-">Job Type</label>
                <JobTypeFilter/>
            </div>
            <div className="py-4 border-b flex flex-col space-y-4">
                <label className="text-xs font-semibold mb-">Salary Range</label>
                <SalaryRangeSlider/>
            </div>
            <div className="py-4 border-b flex flex-col space-y-4">
                <label className="text-xs font-semibold mb-">Experience</label>
                <JobExperience/>
            </div>
        </aside>
    )
}
export default FilterAside;