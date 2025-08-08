"use client"

import React, {
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import debounce from "lodash.debounce"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import SearchInput from "../atoms/search-input"
import LocationInput from "../atoms/location-input"
import JobTypeSelect from "../atoms/job-type-select"
import SalaryRangeSelect from "../atoms/salary-range-select"

interface SearchNavProps {
  onSearchChange: (filters: {
    searchText: string
    location: string
    jobType: string
    salaryRange: string
  }) => void
}

export interface SearchNavRef {
  triggerSearch: () => void
}

const SearchNav = forwardRef<SearchNavRef, SearchNavProps>(
  ({ onSearchChange }, ref) => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

    const [searchText, setSearchText] = useState("")
    const [location, setLocation] = useState("")
    const [jobType, setJobType] = useState("")
    const [salaryRange, setSalaryRange] = useState("")

    // ✅ Sync state from URL on load or manual entry
    useEffect(() => {
      const s = searchParams.get("searchText") || ""
      const l = searchParams.get("location") || ""
      const j = searchParams.get("jobType") || ""
      const sr = searchParams.get("salaryRange") || ""

      setSearchText((prev) => (prev !== s ? s : prev))
      setLocation((prev) => (prev !== l ? l : prev))
      setJobType((prev) => (prev !== j ? j : prev))
      setSalaryRange((prev) => (prev !== sr ? sr : prev))

      onSearchChange({ searchText: s, location: l, jobType: j, salaryRange: sr })
    }, [searchParams, onSearchChange])

    // ✅ Debounced update to URL and call to onSearchChange
    const debouncedSearchChange = useCallback(
      debounce((filters: any) => {
        onSearchChange(filters)

        const params = new URLSearchParams()
        if (filters.searchText) params.set("searchText", filters.searchText)
        if (filters.location) params.set("location", filters.location)
        if (filters.jobType) params.set("jobType", filters.jobType)
        if (filters.salaryRange) params.set("salaryRange", filters.salaryRange)

        router.push(`${pathname}?${params.toString()}`, { scroll: false })
      }, 300),
      [onSearchChange, pathname, router]
    )

    // ✅ Call debounced search on input changes
    useEffect(() => {
      debouncedSearchChange({ searchText, location, jobType, salaryRange })
    }, [searchText, location, jobType, salaryRange, debouncedSearchChange])

    // ✅ Manual trigger (flush debounce immediately)
    const triggerSearch = () => {
      debouncedSearchChange.flush()
    }

    useImperativeHandle(ref, () => ({ triggerSearch }))

    const clearSearch = () => setSearchText("")

    return (
      <>
        {/* Desktop Layout */}
        <div className="w-full hidden md:grid grid-cols-4 gap-6">
          <SearchInput
            value={searchText}
            onChange={setSearchText}
            onEnter={triggerSearch}
            onClear={clearSearch}
          />
          <LocationInput
            value={location}
            onChange={setLocation}
            onEnter={triggerSearch}
          />
          <JobTypeSelect
            value={jobType}
            onChange={setJobType}
          />
          <SalaryRangeSelect
            value={salaryRange}
            onChange={setSalaryRange}
          />
        </div>

        {/* Mobile Layout */}
        <div className="w-full flex items-center gap-4 md:hidden">
          <div className="flex-1 relative">
            <SearchInput
              value={searchText}
              onChange={setSearchText}
              onEnter={triggerSearch}
              onClear={clearSearch}
            />
          </div>

          <Dialog open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
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
                <JobTypeSelect
                  value={jobType}
                  onChange={setJobType}
                />
                <SalaryRangeSelect
                  value={salaryRange}
                  onChange={setSalaryRange}
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100 transition"
                  onClick={() => {
                    setLocation("")
                    setJobType("")
                    setSalaryRange("")
                  }}
                >
                  Reset
                </button>
                <DialogTrigger asChild>
                  <button
                    onClick={() => {
                      triggerSearch()
                      setIsMobileFilterOpen(false)
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
    )
  }
)

SearchNav.displayName = "SearchNav"
export default SearchNav
