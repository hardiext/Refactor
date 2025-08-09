"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { signup } from "../../authentication/signup/action";


type FormData = {
  "Display name": string;
  email: string;
  password: string;
};

const SignUpForm = () => {
 
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const router = useRouter();

  const form = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      "Display name": "",
      email: "",
      password: "",
    },
  });

  const emailRules = {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Format email tidak valid",
    },
  };

  const passwordRules = {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password harus minimal 8 karakter",
    },
    pattern: {
      value: /^(?=.*[A-Z])(?=.*[0-9\W]).*$/,
      message: "Password harus mengandung huruf besar dan angka atau simbol",
    },
  };

  async function onSubmit(data: FormData) {
    setLoading(true);
    setAlert(null);
    try {
      await signup(data); // panggil action signup, pastikan ini async
      setAlert({ type: "success", message: "Signup berhasil! Anda akan diarahkan." });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      setAlert({ type: "error", message: error?.message || "Terjadi kesalahan saat signup." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        {alert && (
          <Alert
            variant={alert.type === "success" ? "default" : "destructive"}
            className="mb-4"
          >
            <AlertTitle>{alert.type === "success" ? "Sukses!" : "Error!"}</AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}
        <FormField
          control={form.control}
          name="Display name"
          rules={{ required: "Username is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-xs">Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="username"
                  {...field}
                  className="w-full bg-gray-50 h-12 shadow-none border-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          rules={emailRules}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-xs">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="jalanify@example.com"
                  {...field}
                  className="w-full bg-gray-50 h-12 shadow-none border-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          rules={passwordRules}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-xs">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="your password"
                    {...field}
                    className="w-full bg-gray-50 h-12 shadow-none border-0 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-gray-400" />
            <Label className="text-xs">Remember me</Label>
          </div>
          <a href="" className="text-xs font-semibold text-blue-700">
            Forget password
          </a>
        </div>
        <div className="mt-2">
          <Button
            disabled={!form.formState.isValid || loading}
            type="submit"
            className="bg-blue-700 w-full h-12 hover:bg-blue-900 cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-400 flex justify-center items-center gap-2"
          >
            {loading && <Loader2 className="animate-spin w-5 h-5" />}
            Sign Up
          </Button>
        </div>
        <div className="flex items-center justify-center space-x-0.5">
          <Label className="text-xs text-gray-400">have an account? </Label>
          <a
            href="/authentication/signin"
            className="text-black bg-white font-semibold text-xs"
          >
            Sign In
          </a>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
