"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

export default function NoSessionCard() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <Card className="w-full max-w-md border border-gray-200 shadow-sm rounded-2xl bg-white">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Welcome to <span className="text-pink-600">JobPortal</span>
          </CardTitle>
          <p className="text-sm text-gray-500">
            Sign in to explore opportunities, track your applications, and build your career.
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-3 mt-2">
          <Link href="/authentication/signin">
            <Button
              variant="default"
              className="w-full rounded-xl text-white bg-pink-600 hover:bg-indigo-700 transition"
            >
              <LogIn className="w-4 h-4 mr-2" /> Log In
            </Button>
          </Link>
          <Link href="authentication/signup">
            <Button
              variant="outline"
              className="w-full rounded-xl border-gray-300 hover:bg-gray-100"
            >
              <UserPlus className="w-4 h-4 mr-2" /> Create an Account
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
