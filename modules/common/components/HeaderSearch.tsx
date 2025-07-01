"use client";

import { Search } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import Fuse from "fuse.js";

const dummyData = [
  { title: "Introduction", url: "/docs/introduction" },
  { title: "Getting Started", url: "/docs/getting-started" },
  { title: "API Reference", url: "/docs/api-reference" },
  { title: "Deployment", url: "/docs/deployment" },
  { title: "Customization", url: "/docs/customization" },
];

export default function HeaderSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ title: string; url: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const fuse = useMemo(
    () =>
      new Fuse(dummyData, {
        keys: ["title"],
        threshold: 0.3,
      }),
    []
  );

  const handleSearch = useMemo(
    () =>
      debounce((text: string) => {
        if (text.trim().length === 0) {
          setResults([]);
          setLoading(false);
          return;
        }

        const searchResults = fuse.search(text).map((res) => res.item);
        setResults(searchResults);
        setLoading(false);
      }, 300),
    [fuse]
  );

  useEffect(() => {
    setLoading(true);
    handleSearch(query);
    return () => {
      handleSearch.cancel();
    };
  }, [query, handleSearch]);

  return (
    <div className="relative hidden md:flex  flex-col items-start justify-center w-full max-w-sm text-sm mr-4">
      {/* Search Input */}
      <div className="relative flex items-center w-full">
        <span className="absolute left-3 text-neutral-500 dark:text-neutral-400">
          <Search size={16} />
        </span>
        <input
          type="text"
          placeholder="Search docs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            w-full
            pl-9 pr-3 py-2
            rounded-md
            bg-neutral-100 text-neutral-900
            placeholder-neutral-500
            focus:outline-none
            focus:ring-2 focus:ring-neutral-400
            transition
            hover:bg-neutral-200

            dark:bg-neutral-700 dark:text-neutral-100
            dark:placeholder-neutral-500
            dark:focus:ring-neutral-600
            dark:hover:bg-neutral-700
          "
        />
      </div>

      {/* Results */}
      <div className=" absolute top-12 mt-2 w-full bg-white dark:bg-neutral-900 rounded-md shadow-lg">
        {loading ? (
          <div className="p-3 space-y-2 animate-pulse">
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded" />
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded" />
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2" />
          </div>
        ) : results.length > 0 ? (
          <ul className="divide-y divide-neutral-200 dark:divide-neutral-700">
            {results.map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.url}
                  className="block px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        ) : query.trim().length > 0 ? (
          <div className="p-3 text-neutral-500 dark:text-neutral-400">
            No results found.
          </div>
        ) : null}
      </div>
    </div>
  );
}
