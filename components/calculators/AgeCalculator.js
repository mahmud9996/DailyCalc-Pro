"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { calculateAge } from "@/lib/calculators/age";
import { useHistory } from "@/hooks/useLocalStorage";
import { formatDateReadable } from "@/lib/utils";
import ShareButton from "@/components/ShareButton";
import HistoryPanel from "@/components/HistoryPanel";

const REGIONS = [
  { code: "US", label: "United States" },
  { code: "UK", label: "United Kingdom" },
  { code: "BD", label: "Bangladesh" },
];

export default function AgeCalculator() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [dob, setDob] = useState(searchParams.get("dob") || "");
  const [region, setRegion] = useState(searchParams.get("region") || "US");
  const [result, setResult] = useState(null);
  const { history, addEntry, clearHistory } = useHistory("dcp-age-history");

  useEffect(() => {
    if (!dob) {
      setResult(null);
      return;
    }
    const r = calculateAge(dob);
    setResult(r);
  }, [dob]);

  function handleCalculate(e) {
    e.preventDefault();
    if (!dob || !result || result.error) return;
    addEntry({ dob, region, years: result.years, months: result.months, days: result.days });
    const params = new URLSearchParams({ dob, region });
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const locale = region === "US" ? "en-US" : "en-GB";

  return (
    <div className="rounded-2xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-5 md:p-6 shadow-card">
      <form onSubmit={handleCalculate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
            Date of birth
          </label>
          <input
            type="date"
            required
            max={new Date().toISOString().slice(0, 10)}
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full rounded-lg border border-border dark:border-dark-border bg-paper dark:bg-dark-bg px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
            Date format region
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full rounded-lg border border-border dark:border-dark-border bg-paper dark:bg-dark-bg px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
          >
            {REGIONS.map((r) => (
              <option key={r.code} value={r.code}>
                {r.label} ({r.code === "US" ? "MM/DD/YYYY" : "DD/MM/YYYY"})
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full sm:w-auto rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-600 transition-colors"
          >
            Calculate age
          </button>
        </div>
      </form>

      {result && result.error && (
        <p className="mt-4 text-sm text-red-500">{result.error}</p>
      )}

      {result && !result.error && (
        <div className="mt-6">
          <div className="lcd-display rounded-2xl px-6 py-5 flex flex-col items-center text-center">
            <span className="lcd-label text-[10px] mb-1">YOUR EXACT AGE</span>
            <span className="lcd-digits text-3xl md:text-4xl font-semibold">
              {result.years}y {result.months}m {result.days}d
            </span>
            <span className="lcd-label text-[10px] mt-2">
              born {formatDateReadable(dob, locale)}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            {[
              ["Total months", result.totalMonths.toLocaleString()],
              ["Total weeks", result.totalWeeks.toLocaleString()],
              ["Total days", result.totalDays.toLocaleString()],
              ["Total hours", result.totalHours.toLocaleString()],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-paper dark:bg-dark-bg p-3">
                <div className="text-sm font-semibold text-ink dark:text-white">{value}</div>
                <div className="text-[11px] text-ink-muted mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-sm text-ink-muted">
            Your next birthday is in <strong className="text-ink dark:text-white">{result.daysToNextBirthday} days</strong> ({formatDateReadable(result.nextBirthdayDate, locale)}).
          </p>

          <div className="mt-4">
            <ShareButton
              getShareUrl={() =>
                `${window.location.origin}${pathname}?dob=${dob}&region=${region}`
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
            <span>{entry.dob}</span>
            <span>{entry.years}y {entry.months}m {entry.days}d</span>
          </>
        )}
      />
    </div>
  );
}
