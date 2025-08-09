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
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { login } from "@/app/(auth)/authentication/signin/action";


type FormData = {
  email: string;
  password: string;
};

const SignForm = () => {
  
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormData>({
    defaultValues: {
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

  return (
    <Form {...form}>
      <form className="flex flex-col gap-y-4">
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
          <a href="" className="text-xs font-semibold text-pink-600">
            Forget password
          </a>
        </div>
        <div className="mt-2">
          <Button
            formAction={login}
            type="submit"
            className="bg-pink-500 w-full h-12 hover:bg-pink-600 cursor-pointer"
          >
            Log In
          </Button>
        </div>
        <div className="flex items-center justify-center space-x-0.5">
          <Label className="text-xs text-gray-400">
            Dont't have an account?{" "}
          </Label>
          <a href="/authentication/signup" className="text-black bg-white font-semibold text-xs">
            
            Sign Up

            </a>
        </div>
      </form>
    </Form>
  );
};

export default SignForm;
