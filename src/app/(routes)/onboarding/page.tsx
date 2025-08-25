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
import { motion } from "framer-motion";

import CountryCitySelect from "../components/molecules/onboarding-select";
import ProfessionalTitleSelect from "../components/molecules/prefisonal-select";

export default function OnboardingPage() {
  const supabase = createClient();
  const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [prefesionalTitle, setPrefesionalTitle] = useState("");
  const [bio, setBio] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) router.push("/authentication/signin");
      else setUserId(data.user.id);

      const { data: profile } = await supabase
        .from("profile")
        .select("id")
        .eq("user_id", data.user?.id)
        .maybeSingle();

      if (profile) router.push("/");
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
        username: username,
        city: city,
        country: country,
        bio: bio,
        professional_title: prefesionalTitle,
        description,
      },
    ]);

    if (error) setError(error.message);
    else router.push("/");

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-pink-50 p-6">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:w-1/2 flex flex-col justify-center text-center lg:text-left space-y-6 "
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">
            Welcome to Profile Setup
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Just a couple of steps and you’re ready to go. Let’s complete your
            profile so we can personalize your experience.
          </p>
          <Image
            src={images.onboarding}
            alt="Onboarding"
            width={380}
            height={380}
            className="rounded-xl shadow-md mx-auto lg:mx-0"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:w-1/2"
        >
          <Card className="border shadow-sm rounded-2xl">
            <CardContent className="px-8 py-6 space-y-8">
              <div>
                <div className="mb-4">
                  {step === 1 && (
                    <h2 className="font-semibold text-neutral-800">
                      Basic Information
                    </h2>
                  )}
                  {step === 2 && (
                    <h2 className="font-semibold text-neutral-800">
                      Profile Details
                    </h2>
                  )}
                  {step === 3 && (
                    <h2 className="font-semibold text-neutral-800">
                      Profesional Information
                    </h2>
                  )}
                  {step === 4 && (
                    <h2 className="font-semibold text-neutral-800">
                      Bio & Description
                    </h2>
                  )}
                </div>
                <Progress value={(step / 4) * 100} />
                <p className="mt-2 text-sm text-gray-500">Step {step} of 4</p>
              </div>
              {step === 1 && (
                <div className="flex flex-col gap-4">
                  <div>
                    <Label
                      htmlFor="fullName"
                      className="font-medium text-gray-700 mb-2"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="username"
                      className="font-medium mb-2 text-gray-700"
                    >
                      Username
                    </Label>
                    <Input
                      id="username"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex justify-end mt-6">
                    <Button
                      onClick={handleNext}
                      disabled={!fullName || !username}
                      className="bg-pink-600 hover:bg-pink-700 text-white rounded-lg"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="flex flex-col gap-6">
                  <CountryCitySelect
                    country={country}
                    setCountry={setCountry}
                    city={city}
                    setCity={setCity}
                  />

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className="rounded-lg"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!country || !city}
                      className="bg-pink-600 hover:bg-pink-700 text-white rounded-lg"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div>
                  <div className="flex flex-col gap-4">
                    <ProfessionalTitleSelect
                      title={prefesionalTitle}
                      setTitle={setPrefesionalTitle}
                    />
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className="rounded-lg"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!prefesionalTitle}
                      className="bg-pink-600 hover:bg-pink-700 text-white rounded-lg"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
              {step === 4 && (
                <div className="flex flex-col gap-4">
                  <div>
                    <Label
                      htmlFor="bio"
                      className="font-medium text-gray-700 mb-2"
                    >
                      Short Bio
                    </Label>
                    <Textarea
                      id="bio"
                      placeholder="A brief bio about yourself"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="description"
                      className="font-medium text-gray-700 mb-2"
                    >
                      Description(optional)
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="A more detailed description about you"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={5}
                      required
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <div className="flex justify-between mt-6">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className="rounded-lg"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={!bio ||  loading}
                      className="bg-pink-600 hover:bg-pink-700 text-white rounded-lg"
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
