import { Briefcase, Verified } from "lucide-react";

import React, { useRef, useState, useEffect } from "react";
import { FilterOptions } from "@/hook/usejob";
import { SearchNavRef } from "../molecules/search-hero";
import dynamic from "next/dynamic";

const Trusted = dynamic(() => import("../molecules/trusted"), { ssr: false });
const PopularSearch = dynamic(() => import("../molecules/popular-search"), {
  ssr: false,
});

const SearchNav = dynamic(() => import("../molecules/search-hero"), { ssr: false });


interface SearchNavProps {
  onSearchChange: (filters: { searchText: string }) => void;
}

const HeroSection: React.FC<SearchNavProps> = ({ onSearchChange }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    searchText: "",
    location: "",
    jobType: "",
    salaryRange: "",
  });
  const [showVideo, setShowVideo] = useState(false);

  const handleSearchChange = (filter: FilterOptions) => {
    setFilters(filter);
    onSearchChange({ searchText: filter.searchText });
  };

  const searchRef = useRef<SearchNavRef>(null);

  useEffect(() => {
    const t = setTimeout(() => setShowVideo(true), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="lg:min-h-[625px] grid grid-cols-1">
      <div className="lg:h-[625px] h-auto col-span-1 relative max-w-screen">
        {/* Background: Image dulu, lalu ganti ke video */}
        {!showVideo ? (
          <img
            src="/video/poster.webp"
            alt="Background poster"
            className="absolute inset-0 w-full lg:h-full h-[220px] object-cover brightness-50"
          />
        ) : (
          <video
            className="absolute inset-0 w-full lg:h-full h-[220px] object-cover brightness-50"
            src="/video/work.webm"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster="/video/poster.webp"
          />
        )}

        <article className="relative z-10 w-full bg-black/40 md:py-8 md:px-12 lg:h-[625px] h-[220px] px-8 py-12 flex flex-col justify-center">
          <div>
            <div className="flex items-center space-x-1">
              <Briefcase size={40} className="text-yellow-400" />
              <h1 className="lg:text-5xl text-3xl font-semibold text-white">
                Found the right job?
              </h1>
            </div>
            <div className="flex mt-2 items-center space-x-1">
              <h1 className="lg:text-5xl text-3xl mt-2 font-semibold text-white">
                Let us guide you{" "}
                <span className="bg-gradient-to-br from-pink-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                  from here
                </span>
              </h1>
              <Verified
                size={30}
                className="shadow-2xl text-blue-600 lg:block hidden"
              />
            </div>
          </div>

          {/* Desktop Only */}
          <div className="lg:block hidden">
            <div className="mt-6">
              <SearchNav ref={searchRef} onSearchChange={handleSearchChange} />
            </div>
            <div className="mt-10">
              <PopularSearch />
            </div>
            <div className="absolute bottom-10 w-full max-w-max flex items-center space-x-2">
              <span className="text-sm text-white w-[100px]">Trusted by :</span>
              <Trusted />
            </div>
          </div>
        </article>

        {/* Mobile Only */}
        <div>
          <div className="lg:hidden block bg-white py-6">
            <div className="mt-0 px-4">
              <SearchNav ref={searchRef} onSearchChange={setFilters} />
            </div>
            <div className="mt-4 px-4">
              <PopularSearch />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
