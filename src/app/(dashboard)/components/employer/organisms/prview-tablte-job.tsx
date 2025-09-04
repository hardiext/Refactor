"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FiBriefcase, FiUsers } from "react-icons/fi";
import { format } from "date-fns";
import { Briefcase, MoreHorizontal } from "lucide-react";

interface Job {
  id: string;
  title: string;
  date_posted: string;
  status: "Active" | "Pending" | "Closed";
  applicants: number;
}

const jobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    date_posted: "2025-08-20",
    status: "Active",
    applicants: 12,
  },
  {
    id: "2",
    title: "Backend Engineer",
    date_posted: "2025-08-18",
    status: "Pending",
    applicants: 5,
  },
  {
    id: "3",
    title: "UI/UX Designer",
    date_posted: "2025-08-15",
    status: "Closed",
    applicants: 20,
  },
  {
    id: "4",
    title: "Fullstack Developer",
    date_posted: "2025-08-10",
    status: "Active",
    applicants: 8,
  },
];

export default function MyJobTableCard() {
  return (
    <Card className="rounded-md shadow-none border-0 border-gray-100  overflow-hidden pt-0 gap-0">
      <CardHeader className=" p-4 flex  justify-between">
        <div className="flex items-center space-x-1.5">
          <span className="text-xs">
            <FiBriefcase className="text-sm text-pink-500" />
          </span>
          <span className="text-xs font-semibold">Job Posted</span>
        </div>
        <MoreHorizontal size={16}/>
      </CardHeader>

      <CardContent className="px-4 py-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="b">
              <tr>
                <th className=" py-2 text-left text-[10px] font-normal text-gray-500">
                  Job Title
                </th>
                <th className=" py-2 text-right text-[10px] font-normal text-gray-500">
                  Status
                </th>
                <th className=" py-2  text-[10px] font-normal text-gray-500 text-right">
                  Applicants
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-pink-50 transition-colors">
                  <td className=" py-2 text-[10px] font-medium text-black flex items-center gap-2">
                    <FiBriefcase className="text-[12px] text-blue-500" />
                    {job.title}
                  </td>
                  <td className=" py-2 text-sm font-medium text-right">
                    <span
                      className={`px-1.5 py-1 rounded-sm text-[10px] font-semibold  ${
                        job.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : job.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className=" py-2 text-[10px] text-black font-medium text-right">
                    {job.applicants} application
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
