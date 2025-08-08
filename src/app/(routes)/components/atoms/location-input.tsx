"use client"
import { Input } from "@/components/ui/input";
import { MapIcon } from "lucide-react";

interface LocationInputProps {
  value: string;
  onChange: (val: string) => void;
  onEnter: () => void;
}

const LocationInput = ({ value, onChange, onEnter }: LocationInputProps) => {
  return (
    <div className="relative flex items-center">
      <MapIcon className="absolute left-2 text-gray-400" size={18} />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onEnter()}
        placeholder="United States of Am"
        className="w-full placeholder:text-xs pl-8 text-xs border border-gray-100 shadow-none focus-visible:ring-ring/30 focus-visible:ring-[1px]"
      />
    </div>
  );
};

export default LocationInput;
