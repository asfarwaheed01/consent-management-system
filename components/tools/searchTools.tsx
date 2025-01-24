// components/tools/search-tools.tsx
"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchToolsProps {
  onSearch: (value: string) => void;
}

export function SearchTools({ onSearch }: SearchToolsProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
      <Input
        placeholder="Search by name, description, or keywords..."
        className="pl-10 bg-white dark:bg-gray-800"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
