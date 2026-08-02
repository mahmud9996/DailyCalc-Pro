"use client";

import { useState } from "react";

export default function HistoryPanel({ history = [], onClear, renderEntry }) {
  const [open, setOpen] = useState(false);

  if (!history.length) return null;

  return (
    <div className="mt-4 rounded-xl border border-border dark:border-dark-border bg-paper/50 dark:bg-dark-bg/50">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-ink dark:text-white"
      >
        <span>Saved history ({history.length})</span>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>
      {open && (
        <div className="px-4 pb-4">
          <ul className="space-y-2 max-h-56 overflow-y-auto">
            {history.map((entry, i) => (
              <li
                key={entry.savedAt || i}
                className="text-xs text-ink-muted flex justify-between border-b border-border/60 dark:border-dark-border/60 pb-1.5"
              >
                {renderEntry(entry)}
              </li>
            ))}
          </ul>
          <button
            onClick={onClear}
            className="mt-3 text-xs font-medium text-accent hover:underline"
            type="button"
          >
            Clear history
          </button>
        </div>
      )}
    </div>
  );
}
