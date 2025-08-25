"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import images from "@/app/assets/list-image";

export default function OnboardingPage() {
  const supabase = createClient();
  const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) router.push("/login");
      else setUserId(data.user.id);

      const { data: profile } = await supabase
        .from("profile")
        .select("id")
        .eq("user_id", data.user?.id)
        .maybeSingle();

      if (profile) router.push("/"); // sudah punya profil
    };
    getUser();
  }, [supabase, router]);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);

    const { error } = await supabase.from("profile").insert([
      {
        user_id: userId,
        full_name: fullName,
        description,
      },
    ]);

    if (error) setError(error.message);
    else router.push("/");

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-50 via-pink-50 to-pink-50 p-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
        {/* Left Hero */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-4">
          <h1 className="text-3xl font-bold text-pink-700 mb-4 text-center md:text-left">
            Welcome to Your Profile Setup!
          </h1>
          <p className="text-gray-600 mb-6 text-center md:text-left">
            Let's get started by filling in a few important details. This helps us
            personalize your experience.
          </p>
          <Image
            src={images.onboarding}
            alt="Onboarding illustration"
            width={350}
            height={350}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Right Form */}
        <Card className="md:w-1/2 shadow-2xl">
          <CardContent className="flex flex-col gap-6 p-8">
            <Progress value={(step / 2) * 100} className="mb-6" />
            {step === 1 && (
              <div className="flex flex-col gap-4">
                <Label htmlFor="fullName" className="text-lg font-medium">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="border-pink-300 focus:border-pink-500 focus:ring focus:ring-pink-200"
                />
                <Button
                  onClick={handleNext}
                  disabled={!fullName}
                  className="mt-2 bg-pink-600 hover:bg-pink-700 text-white"
                >
                  Next
                </Button>
              </div>
            )}
            {step === 2 && (
              <div className="flex flex-col gap-4">
                <Label htmlFor="description" className="text-lg font-medium">
                  Short Bio
                </Label>
                <Textarea
                  id="description"
                  placeholder="Tell us a bit about yourself..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="border-pink-300 focus:border-pink-500 focus:ring focus:ring-pink-200 resize-none"
                  rows={5}
                />
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex justify-between mt-2">
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!description || loading}
                    className="bg-pink-600 hover:bg-pink-700 text-white"
                  >
                    {loading ? "Saving..." : "Finish"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
