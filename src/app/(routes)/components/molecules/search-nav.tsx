"use client";

import React, { useState, forwardRef, useImperativeHandle } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import SearchInput from "../atoms/search-input";
import LocationInput from "../atoms/location-input";
import JobTypeSelect from "../atoms/job-type-select";
import SalaryRangeSelect from "../atoms/salary-range-select";
import useSearchSuggestions from "@/hook/useSugesstionSearch";

interface SearchNavProps {
  onSearchChange: (filters: {
    searchText: string;
    location: string;
    jobType: string;
    salaryRange: string;
  }) => void;
}

export interface SearchNavRef {
  triggerSearch: () => void;
}

const SearchNav = forwardRef<SearchNavRef, SearchNavProps>(
  ({ onSearchChange }, ref) => {
    const pathname = usePathname();
    const router = useRouter();

    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // state utama
    const [searchTextInput, setSearchTextInput] = useState("");
    const [searchTextApplied, setSearchTextApplied] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("");
    const [salaryRange, setSalaryRange] = useState("");

    // ambil suggestion berdasarkan input
    const { results: suggestions } = useSearchSuggestions(searchTextInput);

    const applySearch = (val: string) => {
      setSearchTextApplied(val);

      onSearchChange({
        searchText: val,
        location,
        jobType,
        salaryRange,
      });

      const params = new URLSearchParams();
      if (val) params.set("searchText", val);
      if (location) params.set("location", location);
      if (jobType) params.set("jobType", jobType);
      if (salaryRange) params.set("salaryRange", salaryRange);

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const triggerSearch = () => {
      applySearch(searchTextInput);
    };

    useImperativeHandle(ref, () => ({ triggerSearch }));

    const clearSearch = () => setSearchTextInput("");

    return (
      <>
        {/* Desktop Layout */}
        <div className="w-full hidden md:grid grid-cols-4 gap-6">
          <SearchInput
            value={searchTextInput}
            onChange={setSearchTextInput}
            onEnter={triggerSearch}
            onClear={clearSearch}
            suggestions={suggestions}
            onSuggestionClick={(s) => applySearch(s.label)}
          />
          <LocationInput
            value={location}
            onChange={setLocation}
            onEnter={triggerSearch}
          />
          <JobTypeSelect value={jobType} onChange={setJobType} />
          <SalaryRangeSelect value={salaryRange} onChange={setSalaryRange} />
        </div>

        {/* Mobile Layout */}
        <div className="w-full flex items-center gap-4 md:hidden">
          <div className="flex-1 relative">
            <SearchInput
              value={searchTextInput}
              onChange={setSearchTextInput}
              onEnter={triggerSearch}
              onClear={clearSearch}
              suggestions={suggestions}
              onSuggestionClick={(s) => applySearch(s.label)}
            />
          </div>

          <Dialog
            open={isMobileFilterOpen}
            onOpenChange={setIsMobileFilterOpen}
          >
            <DialogTrigger asChild>
              <Button className="text-sm py-2 bg-purple-600 text-white rounded-md">
                Filter
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Filter</DialogTitle>
                <DialogDescription>
                  Filter your job search by location, type, and salary.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <LocationInput
                  value={location}
                  onChange={setLocation}
                  onEnter={triggerSearch}
                />
                <JobTypeSelect value={jobType} onChange={setJobType} />
                <SalaryRangeSelect
                  value={salaryRange}
                  onChange={setSalaryRange}
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100 transition"
                  onClick={() => {
                    setLocation("");
                    setJobType("");
                    setSalaryRange("");
                  }}
                >
                  Reset
                </button>
                <DialogTrigger asChild>
                  <button
                    onClick={() => {
                      triggerSearch();
                      setIsMobileFilterOpen(false);
                    }}
                    className="bg-purple-600 text-white px-4 py-2 text-sm rounded"
                  >
                    Apply
                  </button>
                </DialogTrigger>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </>
    );
  }
);
// update
SearchNav.displayName = "SearchNav";
export default SearchNav;
