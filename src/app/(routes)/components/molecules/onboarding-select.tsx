"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

const citiesPerCountry: Record<string, string[]> = {
  Indonesia: ["Jakarta", "Bandung", "Surabaya", "Medan"],
  Malaysia: ["Kuala Lumpur", "Penang", "Johor Bahru"],
  Singapore: ["Singapore"],
  Australia: ["Sydney", "Melbourne", "Brisbane"],
};

export default function CountryCitySelect({
  country,
  setCountry,
  city,
  setCity,
}: {
  country: string;
  setCountry: (val: string) => void;
  city: string;
  setCity: (val: string) => void;
}) {
  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const fallbackCountries = ["Indonesia", "Malaysia", "Singapore", "Australia"];

  // Fetch countries dari REST Countries API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
        if (!res.ok) throw new Error("Failed to fetch countries");
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Unexpected response");

        const countryList = data
          .map((c: any) => c.name.common)
          .sort((a: string, b: string) => a.localeCompare(b));
        setCountries(countryList);
      } catch (err) {
        console.error("Error fetching countries:", err);
        setCountries(fallbackCountries);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (!country || !citiesPerCountry[country]) {
      setCities([]);
      setCity("");
    } else {
      setCities(citiesPerCountry[country]);
    }
  }, [country, setCity]);

  return (
    <div className="flex flex-col gap-6">
      {/* Country */}
      <div>
        <Label className="font-medium text-gray-700 mb-2">Country</Label>
        <Select value={country} onValueChange={(val) => setCountry(val)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent className="max-h-60 overflow-auto">
            {countries.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* City */}
      <div>
        <Label className="font-medium text-gray-700 mb-2">City</Label>
        <Select
          value={city}
          disabled={cities.length === 0}
          onValueChange={(val) => setCity(val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={
                cities.length === 0 ? "Select a country first" : "Select a city"
              }
            />
          </SelectTrigger>
          <SelectContent className="max-h-60 overflow-auto">
            {cities.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
