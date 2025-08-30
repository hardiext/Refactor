"use client";

import { useProfileContext } from "@/components/profile-povider";
import useGetProfile from "@/hook/useGetProfile";
import { Session } from "@supabase/auth-helpers-nextjs";
import React from "react";
import DashboardGrid from "../../organisms/dashboard-grid";
import StatCard from "../molecules/stat-card";
import MyJobCard from "./prview-tablte-job";
import MyJobTableCard from "./prview-tablte-job";
import ScheduleCard from "../molecules/calender-card";
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


export function Dashboard({ userId }: { userId?: string }) {
  const { profile } = useGetProfile({ userId });

  return (
    <div className="relative flex min-h-screen bg-gradient-to-r overflow-hidden from-[#fefafb] via-[#fefafb] to-[#ffffff]">
      <div className="">
        <DashboardGrid />
      </div>
      <article className="px-4 py-6 w-full z-10 flex-1 relative">
        <span className="text-xs font-medium">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </span>
        <div className="mt-4">
          <h1 className="text-xl font-semibold">Hello, {profile?.full_name}</h1>
          <h1 className="text-xl font-medium bg-gradient-to-br from-pink-500 via-pink-600 to-red-600 bg-clip-text text-transparent mt-1">
            Welcome to Kerjago Dashboard
          </h1>
        </div>
        <div className="mt-4">
          <StatCard />
        </div>
        <div className="lg:flex-row flex-col flex  mt-6 gap-4">
          <div className="lg:w-1/2 ">
            <MyJobTableCard/>
          </div>
          <div className="lg:w-1/2">
            <ScheduleCard/>
          </div>
        </div>
      </article>
    </div>
  );
}
