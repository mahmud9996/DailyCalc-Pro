"use client";

import { useMemo, useState } from "react";
import { calculateRetirementDate, US_FULL_RETIREMENT_AGE } from "@/lib/calculators/retirement";
import { useHistory } from "@/hooks/useLocalStorage";
import { formatDateReadable } from "@/lib/utils";
import HistoryPanel from "@/components/HistoryPanel";
import ShareButton from "@/components/ShareButton";

const AGE_PRESETS = [60, 62, 65, 66, 67, 70];

export default function RetirementCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [retirementAge, setRetirementAge] = useState(65);
  const { history, addEntry, clearHistory } = useHistory("dcp-retirement-history");

  const result = useMemo(
    () => calculateRetirementDate({ birthDate, retirementAge }),
    [birthDate, retirementAge]
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!result) return;
    addEntry({ birthDate, retirementAge, retirementDate: result.retirementDate });
  }

  return (
    <div className="rounded-2xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-5 md:p-6 shadow-card">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
            Date of birth
          </label>
          <input
            type="date"
            required
            max={new Date().toISOString().slice(0, 10)}
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full rounded-lg border border-border dark:border-dark-border bg-paper dark:bg-dark-bg px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
            Target retirement age
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {AGE_PRESETS.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setRetirementAge(a)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  Number(retirementAge) === a
                    ? "bg-accent text-white"
                    : "bg-paper dark:bg-dark-bg text-ink-muted"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
          <input
            type="number"
            min="40"
            max="100"
            value={retirementAge}
            onChange={(e) => setRetirementAge(e.target.value)}
            className="w-full rounded-lg border border-border dark:border-dark-border bg-paper dark:bg-dark-bg px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-600 transition-colors"
        >
          Calculate retirement date
        </button>
      </form>

      {result && (
        <div className="mt-6">
          <div className="lcd-display rounded-2xl px-6 py-5 flex flex-col items-center text-center">
            <span className="lcd-label text-[10px] mb-1">RETIREMENT DATE</span>
            <span className="lcd-digits text-2xl md:text-3xl font-semibold">
              {formatDateReadable(result.retirementDate)}
            </span>
          </div>

          {result.alreadyReached ? (
            <p className="mt-4 text-sm text-ink-muted">
              This retirement age has already passed based on the birth date
              entered.
            </p>
          ) : (
            <>
              <p className="mt-4 text-sm text-ink-muted">
                That's{" "}
                <strong className="text-ink dark:text-white">
                  {result.yearsLeft}y {result.monthsLeft}m {result.daysLeft}d
                </strong>{" "}
                from today ({result.totalDaysLeft.toLocaleString()} days, or{" "}
                {result.totalWeeksLeft.toLocaleString()} weeks).
              </p>

              <div className="mt-4">
                <ShareButton
                  getShareUrl={() =>
                    `${window.location.origin}${window.location.pathname}?dob=${birthDate}&age=${retirementAge}`
                  }
                />
              </div>
            </>
          )}

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-ink dark:text-white mb-2">
              US Social Security full retirement age (reference)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-ink-muted">
                    <th className="py-1 pr-4">Birth year</th>
                    <th className="py-1">Full retirement age</th>
                  </tr>
                </thead>
                <tbody>
                  {US_FULL_RETIREMENT_AGE.map((row) => (
                    <tr key={row.birthYearRange} className="border-t border-border dark:border-dark-border">
                      <td className="py-1.5 pr-4 text-ink-muted">{row.birthYearRange}</td>
                      <td className="py-1.5 text-ink dark:text-white">{row.age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <HistoryPanel
        history={history}
        onClear={clearHistory}
        renderEntry={(entry) => (
          <>
            <span>Age {entry.retirementAge}</span>
            <span>{entry.retirementDate}</span>
          </>
        )}
      />
    </div>
  );
}
