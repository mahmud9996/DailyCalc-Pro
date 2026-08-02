"use client";

import { useMemo, useState } from "react";
import { calculateMortgage } from "@/lib/calculators/mortgage";
import { useHistory } from "@/hooks/useLocalStorage";
import { formatCurrency } from "@/lib/utils";
import HistoryPanel from "@/components/HistoryPanel";
import ShareButton from "@/components/ShareButton";

export default function MortgageCalculator() {
  const [currency, setCurrency] = useState("USD");
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [rate, setRate] = useState("6.5");
  const [years, setYears] = useState("30");
  const { history, addEntry, clearHistory } = useHistory("dcp-mortgage-history");

  const result = useMemo(
    () => calculateMortgage({ homePrice, downPayment, rate, years }),
    [homePrice, downPayment, rate, years]
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!result) return;
    addEntry({ homePrice, downPayment, rate, years, monthlyPayment: result.monthlyPayment });
  }

  const locale = currency === "GBP" ? "en-GB" : "en-US";

  return (
    <div className="rounded-2xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-5 md:p-6 shadow-card">
      <div className="flex gap-2 mb-5">
        {["USD", "GBP"].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCurrency(c)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              currency === c ? "bg-accent text-white" : "bg-paper dark:bg-dark-bg text-ink-muted"
            }`}
          >
            {c === "USD" ? "US ($)" : "UK (£)"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
            Home price
          </label>
          <input
            type="number"
            min="0"
            required
            value={homePrice}
            onChange={(e) => setHomePrice(e.target.value)}
            className="w-full rounded-lg border border-border dark:border-dark-border bg-paper dark:bg-dark-bg px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
            Down payment
          </label>
          <input
            type="number"
            min="0"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            className="w-full rounded-lg border border-border dark:border-dark-border bg-paper dark:bg-dark-bg px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
            Interest rate (% APR)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            required
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full rounded-lg border border-border dark:border-dark-border bg-paper dark:bg-dark-bg px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
            Loan term (years)
          </label>
          <input
            type="number"
            min="1"
            required
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full rounded-lg border border-border dark:border-dark-border bg-paper dark:bg-dark-bg px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full sm:w-auto rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-600 transition-colors"
          >
            Calculate payment
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-6">
          <div className="lcd-display rounded-2xl px-6 py-5 flex flex-col items-center text-center">
            <span className="lcd-label text-[10px] mb-1">MONTHLY PAYMENT</span>
            <span className="lcd-digits text-4xl font-semibold">
              {formatCurrency(result.monthlyPayment, currency, locale)}
            </span>
            <span className="lcd-label text-[10px] mt-2">
              principal &amp; interest only
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
            {[
              ["Loan amount", formatCurrency(result.principal, currency, locale)],
              ["Total interest", formatCurrency(result.totalInterest, currency, locale)],
              ["Total paid", formatCurrency(result.totalPaid, currency, locale)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-paper dark:bg-dark-bg p-3">
                <div className="text-sm font-semibold text-ink dark:text-white">{value}</div>
                <div className="text-[11px] text-ink-muted mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-ink-muted">
            Down payment is {result.downPaymentPercent}% of the home price.
            This estimate excludes property tax, homeowners insurance, and
            mortgage insurance.
          </p>

          <div className="mt-4">
            <ShareButton
              getShareUrl={() =>
                `${window.location.origin}${window.location.pathname}?price=${homePrice}&down=${downPayment}&rate=${rate}&years=${years}`
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
            <span>{entry.homePrice} @ {entry.rate}% / {entry.years}y</span>
            <span>{entry.monthlyPayment}/mo</span>
          </>
        )}
      />
    </div>
  );
}
