"use client";

import { FiHome, FiBriefcase, FiUsers, FiSettings } from "react-icons/fi";
import { BsBarChart } from "react-icons/bs";
import { BiMessageSquareDots } from "react-icons/bi";

const menu = [
  { content: "Home", menu: "home", icon: <FiHome /> },
  { content: "Job", menu: "job", icon: <FiBriefcase /> },
  { content: "Applicants", menu: "applicants", icon: <FiUsers /> },
  { content: "Analytics", menu: "analytics", icon: <BsBarChart /> },
  { content: "Message", menu: "message", icon: <BiMessageSquareDots /> },
  { content: "Setting", menu: "setting", icon: <FiSettings /> },
];

export function AppSidebar({
  setMenu,
  activeMenu,
}: {
  setMenu: (menu: string) => void;
  activeMenu: string;
}) {
  return (
    <div className="w-1/2 lg:w-1/6 md:relative fixed min-h-screen flex flex-col justify-between">
      <ul className="space-y-2 px-2 py-4">
        {menu.map((item) => (
          <li key={item.menu}>
            <button
              onClick={() => setMenu(item.menu)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition 
                ${
                  activeMenu === item.menu
                    ? "bg-pink-50/30 text-neutral-800"
                    : "hover:bg-pink-100 text-gray-700"
                }`}
            >
              <span className={`${activeMenu === item.menu? "text-pink-600": "text-black"}`}>{item.icon}</span>
              {item.content}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
