"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

const SelectLanguage = () => {
  return (
    <Select defaultValue="en">
      <SelectTrigger className="px-1.5 py-1 text-sm rounded-full shadow-none text-neutral-900">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-black"/>
          <SelectValue className="text-xs font-semibold text-black" />
        </div>
      </SelectTrigger> 
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="id">Indonesia</SelectItem>
        <SelectItem value="fr">Français</SelectItem>
        <SelectItem value="es">Español</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectLanguage;
