"use client";

import React from "react";
import Link from "next/link";

interface ButtonAuthProps {
  type: "login" | "signup";
  href: string;
}

const ButtonAuth: React.FC<ButtonAuthProps> = ({ type, href }) => {
  const baseClasses =
    "text-sm font-medium rounded-full px-4 h-8 flex items-center justify-center transition";

  const classes =
    type === "login"
      ? `${baseClasses} bg-gradient-to-br from-pink-500 to-red-500 text-white`
      : `${baseClasses} border-2 border-pink-500 text-pink-500 hover:bg-gradient-to-br hover:from-pink-500 hover:to-red-500 hover:text-white`;

  return (
    <a href={href}>
      <div className={classes}>{type === "login" ? "Login" : "Sign Up"}</div>
    </a>
  );
};

export default ButtonAuth;
