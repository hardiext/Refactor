"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import MyJobCard from "./myjob-car";
import { motion } from "framer-motion";

const JobListingCard = ({ userId }: { userId: string }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { staggerChildren: 0.1, duration: 0.3 },
        },
      }}
      className="col-span-2"
    >
      <Card className="bg-white shadow-none border border-gray-100 rounded-xl overflow-hidden">
        <CardHeader className="border-b border-gray-100 flex items-center justify-between bg-gray-50 px-6 py-4">
          <h3 className="text-md font-semibold text-gray-800">Job Listing</h3>
          <Badge className="lg:px-4 px-2 py-1.5 bg-white border border-slate-200 text-neutral-800 rounded-full">
            6 items
          </Badge>
        </CardHeader>

        <CardContent className="lg:p-6 p-2">
          <MyJobCard userId={userId} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default JobListingCard;
