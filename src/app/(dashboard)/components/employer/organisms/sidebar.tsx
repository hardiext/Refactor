"use client"
import {
  FiHome,
  FiBriefcase,
  FiUsers,
  FiSettings,
  FiFileText,
  FiBarChart2,
} from "react-icons/fi";
import { BsBarChart, BsRobot } from "react-icons/bs";
import { BiMessageSquareDots } from "react-icons/bi";
import { Label } from "@/components/ui/label";
import { IoIosHelpCircleOutline } from 'react-icons/io';
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { content: "Home", menu: "/", icon: <FiHome /> },
  { content: "Job", menu: "/myjob", icon: <FiBriefcase /> },
  { content: "Applicants", menu: "/applicants", icon: <FiUsers /> },
  { content: "Analytics", menu: "/analytics", icon: <BsBarChart /> },
  { content: "Message", menu: "/message", icon: <BiMessageSquareDots /> },
];

const feature = [
  { content: "AI Interview", menu: "ai-interview", icon: <BsRobot /> },
  { content: "Resume Screener", menu: "resume-screener", icon: <FiFileText /> },
  {
    content: "Candidate Ranking",
    menu: "candidate-ranking",
    icon: <FiBarChart2 />,
  },
];

export function AppSidebar() {
  const pathname =usePathname()
  return (
    <div className="w-1/2 lg:w-1/6 md:relative lg:flex hidden  min-h-screen flex-col justify-between border-r border-gray-100">
      <div>
        <div className="px-4 py-4 border-b">
          <Label className="mb-2 text-xs font-normal">Main</Label>
          <ul className="space-y-2">
            {menu.map((item, index) => (
              <Link href={item.menu} key={index}>
                <button
                 
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs transition 
                ${
                  pathname === item.menu
                    ? "bg-pink-50/30 text-neutral-800"
                    : "hover:bg-pink-100 text-gray-700"
                }`}
                >
                  <span
                    className={`${
                      pathname === item.menu ? "text-pink-600" : "text-black"
                    }`}
                  >
                    {item.icon}
                  </span>
                  {item.content}
                </button>
              </Link>
            ))}
          </ul>
        </div>
        <div className="px-4 py-4 ">
          <Label className="mb-2 text-xs font-normal">Feature</Label>
          <ul className="space-y-2">
            {feature.map((item, index) => (
              <Link href={item.menu} key={index}>
                <button
                
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs transition 
                ${
                  pathname === item.menu
                    ? "bg-pink-50/30 text-neutral-800"
                    : "hover:bg-pink-100 text-gray-900"
                }`}
                >
                  <span
                    className={`${
                      pathname === item.menu ? "text-pink-600" : "text-black"
                    }`}
                  >
                    {item.icon}
                  </span>
                  {item.content}
                </button>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col space-y-4 py-2 px-4 ">
            <button className="flex items-center space-x-2">
              <FiSettings className="text-xs text-gray-500"/>
              <Label className="text-xs text-gray-500">Setting</Label>
            </button>
            <button className="flex items-center space-x-2">
              <IoIosHelpCircleOutline className="text-xs text-gray-500"/>
              <Label className="text-xs text-gray-500">Help & Support</Label>
            </button>
      </div>
    </div>
  );
}
