"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { TOOLS } from "@/lib/toolsList";

export default function SearchBar({ variant = "default" }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${variant === "hero" ? "max-w-xl mx-auto" : "max-w-sm"}`}
    >
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search calculators — e.g. BMI, VAT, mortgage…"
          className={`w-full rounded-full border border-border dark:border-dark-border bg-surface dark:bg-dark-surface pl-9 pr-4 text-sm text-ink dark:text-white placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent/40 ${
            variant === "hero" ? "py-3" : "py-2"
          }`}
        />
      </div>

      {open && results.length > 0 && (
        <ul className="absolute z-30 mt-2 w-full rounded-xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface shadow-card overflow-hidden">
          {results.map((tool) => (
            <li key={tool.slug}>
              <Link
                href={`/calculators/${tool.slug}`}
                onClick={() => setOpen(false)}
                className="flex flex-col px-4 py-2.5 hover:bg-paper dark:hover:bg-dark-bg transition-colors"
              >
                <span className="text-sm font-medium text-ink dark:text-white">
                  {tool.name}
                </span>
                <span className="text-xs text-ink-muted">{tool.tagline}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
