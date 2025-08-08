"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const salaryRangeOptions = [
  { value: "all", label: "All salary ranges" },
  { value: "300-2000", label: "$300 - $2,000" },
  { value: "2000-5000", label: "$2,000 - $5,000" },
  { value: "5000-10000", label: "$5,000 - $10,000" },
  { value: "10000-20000", label: "$10,000 - $20,000" },
  { value: "20000-50000", label: "$20,000 - $50,000" },
  { value: "50000-100000", label: "$50,000 - $100,000" },
  { value: "100000-250000", label: "$100,000 - $250,000" },
  { value: "250000-1000000", label: "Above $250,000" },
];

interface SalaryRangeSelectProps {
  value: string;
  onChange: (val: string) => void;
}

const SalaryRangeSelect = ({ value, onChange }: SalaryRangeSelectProps) => (
  <Select value={value || "all"} onValueChange={(val) => onChange(val === "all" ? "" : val)}>
    <SelectTrigger className="px-4 w-full py-1 bg-white shadow-none text-sm rounded-lg border border-gray-100 text-neutral-900">
      <SelectValue placeholder="Salary range" />
    </SelectTrigger>
    <SelectContent>
      {salaryRangeOptions.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default SalaryRangeSelect;
