"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/utils/supabase/client";

type Applicant = {
  id: string;
  fullname: string;
  email: string;
  position: string;
  linkedln: string;
  status: string;
};

const ApplicantsTable = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user?.id) {
        setApplicants([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("job_applications")
        .select("id, fullname, email, position, linkedln, status")
        .eq("user_id", session.user.id);

      if (error) {
        console.error("Error fetching applicants:", error.message);
        setApplicants([]);
      } else {
        setApplicants(
          data.map((d) => ({
            id: d.id,
            fullname: d.fullname,
            email: d.email,
            position: d.position,
            linkedln: d.linkedln,
            status: d.status,
          }))
        );
      }

      setLoading(false);
    };

    fetchApplicants();
  }, []);

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[600px] md:min-w-full px-2 overflow-x-scroll">
        <TableHeader>
          <TableRow className="border-b-0">
            <TableHead className="w-[120px] text-xs sm:text-sm md:text-xs flex items-center space-x-2">
              <input
                type="checkbox"
                className="h-3 w-3 rounded border-0 border-white bg-neutral-200 text-pink-600 focus:ring-pink-500"
              />
              <span>Name</span>
            </TableHead>
            <TableHead className="text-xs sm:text-sm md:text-xs">Email</TableHead>
            <TableHead className="text-xs sm:text-sm md:text-xs">Position</TableHead>
            <TableHead className="text-xs sm:text-sm md:text-xs">LinkedIn</TableHead>
            <TableHead className="text-xs sm:text-sm md:text-xs">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-xs sm:text-sm md:text-base">
                Loading...
              </TableCell>
            </TableRow>
          ) : applicants.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-xs sm:text-sm md:text-base">
                No applicants found
              </TableCell>
            </TableRow>
          ) : (
            applicants.map((a) => (
              <TableRow key={a.id} className="bg-slate-50">
                <TableCell className="font-medium flex items-center space-x-2 text-xs sm:text-sm md:text-xs">
                  <input
                    type="checkbox"
                    className="h-3 w-3 rounded border-0 border-white bg-neutral-200 text-pink-600 focus:ring-pink-500"
                  />
                  <span>{a.fullname}</span>
                </TableCell>
                <TableCell className="text-xs sm:text-sm md:text-xs">{a.email}</TableCell>
                <TableCell className="text-xs sm:text-sm md:text-xs">{a.position}</TableCell>
                <TableCell className="text-xs sm:text-sm md:text-xs">{a.linkedln}</TableCell>
                <TableCell className="text-xs sm:text-sm md:text-xs">{a.status}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
