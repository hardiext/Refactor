import React, { forwardRef, useImperativeHandle, useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import debounce from "lodash.debounce";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { FilterOptions } from "@/hook/usejob";

interface SearchNavProps {
  onSearchChange: (filters: FilterOptions) => void;
}

export interface SearchNavRef {
  triggerSearch: () => void;
}

const SearchNav = forwardRef<SearchNavRef, SearchNavProps>(({ onSearchChange }, ref) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State filter hanya untuk searchText di sini, tapi bisa diperluas
  const [searchText, setSearchText] = useState(searchParams.get("searchText") || "");

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((filters: FilterOptions) => {
      onSearchChange(filters);

      const params = new URLSearchParams();
      if (filters.searchText) params.set("searchText", filters.searchText);
      // Kalau ada filters lain, bisa ditambahkan ke URL params juga

      router.replace(`explore?${params.toString()}`, { scroll: false });
    }, 300),
    [onSearchChange, router]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useImperativeHandle(ref, () => ({
    triggerSearch: () => {
      debouncedSearch({ searchText, location: "", jobType: "", salaryRange: "" });
    },
  }), [debouncedSearch, searchText]);

  const handleSearch = () => {
    debouncedSearch({ searchText, location: "", jobType: "", salaryRange: "" });
  };

  return (
    <div className="lg:max-w-[70vw]">
      <div className="flex items-center w-full relative">
        <div className="absolute z-20 right-2">
          <Button
            className="bg-gradient-to-br from-pink-600 to-red-600 h-10 px-6 lg:rounded-lg rounded-full"
            onClick={handleSearch}
          >
            <span className="lg:block hidden">Search</span>
            <Search className="text-white" />
          </Button>
        </div>
        <Input
          placeholder="Search dream job now"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="w-full px-4 lg:placeholder:text-md placeholder:text-sm lg:border border-0  focus-visible:ring-ring/50 focus-visible:ring-[1px] lg:h-14 h-13 lg:bg-white shadow-none  lg:rounded-lg rounded-full lg:border-gray-200 bg-gray-100  backdrop-blur-sm"
        />
      </div>
    </div>
  );
});

export default SearchNav;
