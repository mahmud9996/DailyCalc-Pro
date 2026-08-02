"use client";

import { useMemo, useState } from "react";
import { calculateHourlyRate } from "@/lib/calculators/salaryHourly";
import { useHistory } from "@/hooks/useLocalStorage";
import { formatCurrency } from "@/lib/utils";
import HistoryPanel from "@/components/HistoryPanel";
import ShareButton from "@/components/ShareButton";

export default function SalaryHourlyCalculator() {
  const [annualSalary, setAnnualSalary] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");
  const [daysPerWeek, setDaysPerWeek] = useState("5");
  const { history, addEntry, clearHistory } = useHistory("dcp-salary-history");

  const result = useMemo(
    () => calculateHourlyRate({ annualSalary, hoursPerWeek, weeksPerYear, daysPerWeek }),
    [annualSalary, hoursPerWeek, weeksPerYear, daysPerWeek]
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!result) return;
    addEntry({ annualSalary, hourly: result.hourly });
  }

  return (
    <div className="rounded-2xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-5 md:p-6 shadow-card">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
            Annual salary ($)
          </label>
          <input
            type="number"
            min="0"
            required
            value={annualSalary}
            onChange={(e) => setAnnualSalary(e.target.value)}
            className="w-full rounded-lg border border-border dark:border-dark-border bg-paper dark:bg-dark-bg px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
            Hours per week
          </label>
          <input
            type="number"
            min="1"
            max="168"
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(e.target.value)}
            className="w-full rounded-lg border border-border dark:border-dark-border bg-paper dark:bg-dark-bg px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
            Working weeks per year
          </label>
          <input
            type="number"
            min="1"
            max="52"
            value={weeksPerYear}
            onChange={(e) => setWeeksPerYear(e.target.value)}
            className="w-full rounded-lg border border-border dark:border-dark-border bg-paper dark:bg-dark-bg px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
          <span className="text-[11px] text-ink-muted">52 = no unpaid time off</span>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
            Days per week
          </label>
          <input
            type="number"
            min="1"
            max="7"
            value={daysPerWeek}
            onChange={(e) => setDaysPerWeek(e.target.value)}
            className="w-full rounded-lg border border-border dark:border-dark-border bg-paper dark:bg-dark-bg px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full sm:w-auto rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-600 transition-colors"
          >
            Convert to hourly
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-6">
          <div className="lcd-display rounded-2xl px-6 py-5 flex flex-col items-center text-center">
            <span className="lcd-label text-[10px] mb-1">HOURLY RATE</span>
            <span className="lcd-digits text-4xl font-semibold">
              {formatCurrency(result.hourly)}/hr
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            {[
              ["Daily", formatCurrency(result.daily)],
              ["Weekly", formatCurrency(result.weekly)],
              ["Monthly", formatCurrency(result.monthly)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-paper dark:bg-dark-bg p-3">
                <div className="text-sm font-semibold text-ink dark:text-white">{value}</div>
                <div className="text-[11px] text-ink-muted mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <ShareButton
              getShareUrl={() =>
                `${window.location.origin}${window.location.pathname}?salary=${annualSalary}&hpw=${hoursPerWeek}&wpy=${weeksPerYear}`
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
            <span>${entry.annualSalary}/yr</span>
            <span>${entry.hourly}/hr</span>
          </>
        )}
      />
    </div>
  );
}
