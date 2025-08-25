// components/organisms/RequireLogin.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UserCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function RequireLogin() {
  

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gradient-to-b from-gray-50 via-white to-pink-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-none p-10 max-w-md w-full text-center flex flex-col items-center gap-6"
      >
        <div className="bg-pink-100 p-4 rounded-full">
          <UserCircle2 className="w-14 h-14 text-pink-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Restricted Access
        </h2>
        <p className="text-gray-600">
          You need to log in to access your profile and manage personal information.
        </p>
        <a
        href="/authentication/signin"
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 rounded-lg shadow-sm"
        >
          Login Now
        </a>
      </motion.div>
    </div>
  );
}
