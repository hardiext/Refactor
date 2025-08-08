"use client";

import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("../app/(routes)/components/organisms/navbar"), {
  ssr: false,
  loading: () => <div className="h-16 bg-gray-100" />,
});

export default function NavbarClient() {
  return <Navbar />;
}
