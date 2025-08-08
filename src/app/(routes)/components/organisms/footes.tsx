import images from "@/app/assets/list-image";
import {
  InstagramIcon,
  Linkedin02Icon,
  NewTwitterRectangleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";

const navitem = [
  { label: "Jobs", href: "#" },
  { label: "About", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "FAQ", href: "#" },
];

const Footer = () => {
  return (
    <footer className="px-6 lg:px-12 py-8 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start border-b border-gray-200 pb-6">
        {/* Logo + Desc */}
        <div className="flex items-center space-x-2">
          <Image
            src={images.logo}
            alt="next_leap_logo"
            width={32}
            height={32}
          />
          <div className="flex flex-col">
            <span className="text-md font-semibold text-neutral-800">
              Kerjago
            </span>
            <span className="text-xs text-neutral-500">Level Up Career</span>
          </div>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap gap-x-6 gap-y-2 sm:justify-center text-sm font-medium text-neutral-800">
          {navitem.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex justify-start sm:justify-end items-center gap-3">
          {[Linkedin02Icon, InstagramIcon, NewTwitterRectangleIcon].map(
            (Icon, idx) => (
              <div
                key={idx}
                className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition"
              >
                <HugeiconsIcon
                  icon={Icon}
                  className="w-4 h-4 text-neutral-700"
                />
              </div>
            )
          )}
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-4 text-center">
        <span className="text-xs text-gray-500">
          © 2025 Kerja Go. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
