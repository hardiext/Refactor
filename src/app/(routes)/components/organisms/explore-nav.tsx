"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import SearchNav, { SearchNavRef } from "../molecules/search-nav";
import { FilterOptions } from "@/hook/usejob";

interface ExploreNavProps {
  onSearchChange: (filters: FilterOptions) => void;
}

const ExploreNav: React.FC<ExploreNavProps> = ({ onSearchChange }) => {
  const searchRef = useRef<SearchNavRef>(null);

  return (
    <div className="w-full lg:px-6 px-4 py-4 bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between lg:gap-6 gap-4">
        <div className="lg:w-[90vw] w-[100vw]">
          <SearchNav ref={searchRef} onSearchChange={onSearchChange} />
        </div>
        <div className="lg:w-[10vw] w-[15vw] lg:block hidden">
          <Button
            onClick={() => {
              searchRef.current?.triggerSearch();
            }}
            className="rounded-md border-0 bg-gradient-to-br from-pink-500 to-red-400 transition-all ease-in-out duration-500 text-xs text-white font-medium w-full"
          >
            Search
          </Button>
        </div>
      </div>

      <div className="pt-4 lg:block hidden">
        <div className="flex items-center space-x-4">
          <label className="text-xs">Popular Search:</label>
          <div className="flex items-center gap-x-2 ">
            {["UI/UX Designer", "Backend", "Ilustator", "Frontend"].map((item) => (
              <div
                key={item}
                className="px-4 py-1 rounded-full bg-slate-50 text-xs hover:shadow-sm cursor-pointer transition-all border hover:bg-white hover:border-white border-gray-100"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreNav;
