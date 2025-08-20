"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { createClient } from "@/utils/supabase/client";
import {
  Clock,
  Eye,
  CheckCircle2,
  XCircle,
  Plus,
  Filter,
  Download,
  Edit3,
  Trash,
} from "lucide-react";

type JobApplication = {
  id: string;
  status: "pending" | "review" | "accepted" | "rejected";
  created_at: string;
  job: {
    job_title: string;
    company_name: string;
  } | null;
};

export default function TrackingLamaran() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchApplications() {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          setApplications([]);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("job_applications")
          .select(
            `
            id,
            status,
            created_at,
            job:job_id (job_title, company_name)
          `
          )
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          setApplications([]);
          setLoading(false);
          return;
        }

        function normalizeApplications(data: any[]): JobApplication[] {
          return data.map((item) => ({
            id: item.id,
            status: item.status,
            created_at: item.created_at,
            job: item.job
              ? {
                  job_title: item.job.job_title ?? "Unknown Job Title",
                  company_name: item.job.company_name ?? "Unknown Company",
                }
              : null,
          }));
        }

        if (data && Array.isArray(data)) {
          setApplications(normalizeApplications(data));
        } else {
          setApplications([]);
        }
      } catch {
        setApplications([]);
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, [supabase]);

  const statusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 text-yellow-600 border border-yellow-200";
      case "review":
        return "bg-blue-50 text-blue-600 border border-blue-200";
      case "accepted":
        return "bg-green-50 text-green-600 border border-green-200";
      case "rejected":
        return "bg-red-50 text-red-600 border border-red-200";
      default:
        return "bg-gray-50 text-gray-600 border border-gray-200";
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "review":
        return <Eye className="w-4 h-4" />;
      case "accepted":
        return <CheckCircle2 className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const stats = [
    {
      title: "Total Applications",
      value: applications.length,
      change: "+0% this month",
    },
    {
      title: "In Progress",
      value: applications.filter((a) => a.status === "pending" || a.status === "review").length,
      change: "+0% this month",
    },
    {
      title: "Interviews",
      value: applications.filter((a) => a.status === "review").length,
      change: "+0 this week",
    },
    {
      title: "Offers",
      value: applications.filter((a) => a.status === "accepted").length,
      change: "0 new",
    },
  ];

  return (
    <div className="mx-auto p-4 lg:pb-6 pb-[80px] sm:p-6 bg-white min-h-screen max-w-[95vw] sm:max-w-[90vw] lg:max-w-7xl">
      {/* HEADER */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-pink-400 bg-clip-text text-transparent">
            Tracking Job
          </h1>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button className="px-4 py-2.5 rounded-lg border border-gray-200 text-gray-600 flex items-center gap-2 hover:border-pink-400 hover:text-pink-500 transition shadow-none text-xs bg-white">
            <Download size={16} /> Export Data
          </button>
          <button className="px-4 py-2.5 rounded-lg text-xs bg-pink-500 text-white flex items-center gap-2 hover:bg-pink-600 shadow-sm">
            <Plus size={16} /> Add Application
          </button>
        </div>
      </header>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-5 shadow-none border border-gray-100 hover:shadow-md transition"
          >
            <p className="text-gray-500 text-sm font-medium">{s.title}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{s.value}</p>
            <p className="text-xs text-green-500 font-medium">{s.change}</p>
          </div>
        ))}
      </div>

      {/* APPLICATIONS TABLE */}
      <div className="bg-white rounded-xl p-5 shadow-none border border-gray-100 overflow-x-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Your Active Applications</h2>
          <div className="flex gap-3 flex-wrap">
            <button className="px-3 py-2.5 text-xs rounded-lg border shadow-none border-gray-200 text-gray-600 flex items-center gap-2 hover:border-pink-400 hover:text-pink-500 transition bg-white">
              <Filter size={16} /> Filter
            </button>
            <button className="px-3 py-2.5 text-xs rounded-lg bg-pink-500 text-white hover:bg-pink-600  shadow-none">
              View All
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-6 max-w-md">
          <span className="text-sm text-gray-600">65% completion rate</span>
          <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-pink-500 to-pink-300 w-2/3"></div>
          </div>
        </div>

        {loading ? (
          <div className="py-8 text-center text-gray-500">Memuat data...</div>
        ) : (
          <table className="w-full min-w-[600px] text-sm table-auto border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-3 px-2 text-left whitespace-nowrap">Company</th>
                <th className="py-3 px-2 text-left whitespace-nowrap">Position</th>
                <th className="py-3 px-2 text-left whitespace-nowrap">Status</th>
                <th className="py-3 px-2 text-left whitespace-nowrap">Applied</th>
                <th className="py-3 px-2 text-left whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className="border-b border-gray-100 hover:bg-pink-50 transition"
                >
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-3 min-w-[150px]">
                      <div className="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center text-pink-500 font-bold border border-pink-100 shrink-0">
                        {app.job?.company_name?.substring(0, 2).toUpperCase() ?? "??"}
                      </div>
                      <div className="truncate">
                        <p className="font-medium text-gray-800 truncate">{app.job?.company_name}</p>
                        <p className="text-xs text-gray-500 truncate">Remote • Worldwide</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 max-w-[180px] truncate">{app.job?.job_title}</td>
                  <td className="py-3 px-2 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(
                        app.status
                      )}`}
                    >
                      {statusIcon(app.status)}
                      {app.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-gray-500 whitespace-nowrap">
                    {dayjs(app.created_at).format("DD MMM YYYY")}
                  </td>
                  <td className="py-3 px-2 flex gap-2 whitespace-nowrap">
                    <button className="p-2 rounded-lg hover:bg-pink-50 text-gray-500 hover:text-pink-500 transition" aria-label="Edit Application">
                      <Edit3 size={16} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-pink-50 text-gray-500 hover:text-pink-500 transition" aria-label="Delete Application">
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {applications.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-500">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* TIMELINE */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mt-8 max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Upcoming Activities</h2>
          <button className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-pink-400 hover:text-pink-500 transition shadow-sm bg-white">
            View Calendar
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 border border-pink-100">
              <Clock size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tomorrow • 10:30 AM</p>
              <p className="font-medium text-gray-800">Technical Interview</p>
              <p className="text-sm text-gray-500">Meeting link will be sent 1 hour before</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}  