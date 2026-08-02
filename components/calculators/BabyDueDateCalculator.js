"use client";

import { useMemo, useState } from "react";
import { calculateDueDate } from "@/lib/calculators/babyDueDate";
import { useHistory } from "@/hooks/useLocalStorage";
import { formatDateReadable } from "@/lib/utils";
import HistoryPanel from "@/components/HistoryPanel";
import ShareButton from "@/components/ShareButton";

export default function BabyDueDateCalculator() {
  const [method, setMethod] = useState("lmp");
  const [date, setDate] = useState("");
  const { history, addEntry, clearHistory } = useHistory("dcp-duedate-history");

  const result = useMemo(() => calculateDueDate({ method, date }), [method, date]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!result) return;
    addEntry({ method, date, dueDate: result.dueDate });
  }

  return (
    <div className="rounded-2xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-5 md:p-6 shadow-card">
      <div className="flex gap-2 mb-5">
        {[
          { key: "lmp", label: "Last menstrual period" },
          { key: "conception", label: "Conception date" },
        ].map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => setMethod(m.key)}
            className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
              method === m.key
                ? "bg-accent text-white"
                : "bg-paper dark:bg-dark-bg text-ink-muted"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
            {method === "lmp" ? "First day of last menstrual period" : "Estimated conception date"}
          </label>
          <input
            type="date"
            required
            max={new Date().toISOString().slice(0, 10)}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-border dark:border-dark-border bg-paper dark:bg-dark-bg px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-600 transition-colors"
        >
          Calculate due date
        </button>
      </form>

      {result && (
        <div className="mt-6">
          <div className="lcd-display rounded-2xl px-6 py-5 flex flex-col items-center text-center">
            <span className="lcd-label text-[10px] mb-1">ESTIMATED DUE DATE</span>
            <span className="lcd-digits text-2xl md:text-3xl font-semibold">
              {formatDateReadable(result.dueDate)}
            </span>
            {result.daysUntilDue > 0 && (
              <span className="lcd-label text-[10px] mt-2">
                {result.daysUntilDue} days to go
              </span>
            )}
          </div>

          {result.gestationWeeks !== null && (
            <p className="mt-4 text-sm text-ink-muted">
              You're approximately{" "}
              <strong className="text-ink dark:text-white">
                {result.gestationWeeks} weeks, {result.gestationRemainderDays} days
              </strong>{" "}
              pregnant — trimester{" "}
              <strong className="text-ink dark:text-white">{result.trimester}</strong>.
            </p>
          )}

          <div className="mt-4">
            <ShareButton
              getShareUrl={() =>
                `${window.location.origin}${window.location.pathname}?method=${method}&date=${date}`
              }
            />
          </div>
        </div>
      )}

      <HistoryPanel
        history={history}
        onClear={clearHistory}
        renderEntry={(entry) => (
          <>
            <span>{entry.method === "lmp" ? "LMP" : "Conception"}: {entry.date}</span>
            <span>Due {entry.dueDate}</span>
          </>
        )}
      />
    </div>
  );
}
