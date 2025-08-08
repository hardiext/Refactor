"use client"
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  onEnter: () => void;
  onClear: () => void;
}

const SearchInput = ({ value, onChange, onEnter, onClear }: SearchInputProps) => {
  return (
    <div className="relative flex items-center">
      <Search className="absolute left-2 text-gray-400" size={18} />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onEnter()}
        placeholder="Front-end developer"
        className=" placeholder:text-xs pl-8 border border-gray-100 text-xs bg-white shadow-none focus-visible:ring-ring/30 focus-visible:ring-[1px]"
      />
      {value && (
        <X
          onClick={onClear}
          className="absolute right-2 text-gray-400 cursor-pointer"
          size={18}
        />
      )}
    </div>
  );
};

export default SearchInput;
