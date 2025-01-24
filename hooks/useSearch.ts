// app/hooks/useSearch.ts
import { useState, useCallback } from "react";
import { SearchResult } from "@/interfaces";

export const useSearch = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(
    async (query: string, source: "serper" | "brave" | "all" = "all") => {
      setIsSearching(true);
      setError(null);

      try {
        const response = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, source }),
        });

        if (!response.ok) throw new Error("Search failed");

        const data = await response.json();
        setResults(data.results);
        return data.results;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Search failed");
        return [];
      } finally {
        setIsSearching(false);
      }
    },
    []
  );

  return {
    results,
    isSearching,
    error,
    search,
  };
};
