"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import Link from "next/link";

interface Suggestion {
  type: "job" | "profile";
  id: string | number;
  label: string;
}

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  onEnter: () => void;
  onClear: () => void;
  suggestions: Suggestion[];
  onSuggestionClick: (s: Suggestion) => void;
}

const SearchInput = ({
  value,
  onChange,
  onEnter,
  onClear,
  suggestions,
  onSuggestionClick,
}: SearchInputProps) => {
  const handleEnter = () => {
    onEnter();
    onClear(); // reset setelah enter
  };

  const handleSuggestionClick = (s: Suggestion) => {
    onSuggestionClick(s);
    onClear(); // reset setelah pilih suggestion
  };

  return (
    <div className="relative flex flex-col w-full">
      {/* Input box */}
      <div className="relative flex items-center">
        <Search className="absolute left-2 text-gray-400" size={18} />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleEnter()}
          placeholder="Cari pekerjaan atau user..."
          className="placeholder:text-xs pl-8 border border-gray-100 text-xs bg-white shadow-none focus-visible:ring-ring/30 focus-visible:ring-[1px]"
        />
        {value && (
          <X
            onClick={onClear}
            className="absolute right-2 text-gray-400 cursor-pointer"
            size={18}
          />
        )}
      </div>

      {/* Dropdown suggestions */}
      {value && suggestions.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-white border rounded-md shadow z-20">
          {suggestions.map((s) => {
            const href =
              s.type === "job"
                ? `/explore?searchText=${encodeURIComponent(s.label)}`
                : `/profile/${s.id}`;

            return (
              <Link
                key={`${s.type}-${s.id}`}
                href={href}
                onClick={() => handleSuggestionClick(s)}
                className="block px-3 py-2 hover:bg-gray-100 cursor-pointer text-xs"
              >
                {s.type === "job" ? "💼 " : "👤 "}
                {s.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
