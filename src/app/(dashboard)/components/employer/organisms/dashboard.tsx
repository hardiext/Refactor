"use client";

import { useProfileContext } from "@/components/profile-povider";
import useGetProfile from "@/hook/useGetProfile";
import { Session } from "@supabase/auth-helpers-nextjs";
import React from "react";
import DashboardGrid from "../../../../(routes)/components/organisms/dashboard-grid";
import StatCard from "../molecules/stat-card";
import MyJobCard from "./prview-tablte-job";
import MyJobTableCard from "./prview-tablte-job";
import ScheduleCard from "../molecules/calender-card";
import RecentApplicant from "./recent-applicant";
interface Job {
  id: string;
  title: string;
  date_posted: string;
  status: "Active" | "Pending" | "Closed";
  applicants: number;
}

export function Dashboard({ userId }: { userId?: string }) {
  const { profile } = useGetProfile({ userId });

  return (
    <div className="relative flex min-h-screen bg-gray-50 ">
      <article className="px-4 py-4 w-full z-10 flex-1 relative flex flex-col space-y-2">
        <div className="flex items-end justify-between p-4 bg-white rounded-sm">
          <div>
            <h1 className="text-md font-semibold">Hello, John👋</h1>
            <h1 className="text-md font-medium bg-gradient-to-br from-pink-500 via-pink-600 to-red-600 bg-clip-text text-transparent mt-1">
              Welcome to Kerjago Dashboard
            </h1>
          </div>
            <div>
              <span className="text-xs font-medium px-2 py-1.5 border border-gray-100 shadow-xs rounded-xs">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
        </div>
        <div className="">
          <StatCard />
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 w-full gap-4 items-stretch">
          <div className="">
            <MyJobTableCard />
          </div>
          <div className="">
            <ScheduleCard />
          </div>
        </div>
        <div>
          <RecentApplicant/>
        </div>
      </article>
    </div>
  );
}
