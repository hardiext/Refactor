"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function JobSearchFilter() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("latest");

  return (
    <div className="lg:flex-row flex-col flex w-full gap-4 lg:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cari pekerjaan... (judul, lokasi, tipe)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 shadow-none placeholder:text-xs bg-white border-gray-100"
        />
      </div>

      <div className=" flex gap-4">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="lg:w-[150px] w-full text-xs  border-gray-100 shadow-none bg-white">
            <SelectValue
              placeholder="Semua status"
              className="placeholder:text-xs "
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua status</SelectItem>
            <SelectItem value="open">Dibuka</SelectItem>
            <SelectItem value="closed">Ditutup</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="lg:w-[120px] w-full text-xs   border-gray-100 shadow-none bg-white">
            <SelectValue placeholder="Urutkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Terbaru</SelectItem>
            <SelectItem value="oldest">Terlama</SelectItem>
            <SelectItem value="popular">Paling Populer</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
