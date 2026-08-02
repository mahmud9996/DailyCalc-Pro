"use client";

import { useMemo, useState } from "react";
import { calculateTip, TIP_PRESETS } from "@/lib/calculators/tip";
import { useHistory } from "@/hooks/useLocalStorage";
import { formatCurrency } from "@/lib/utils";
import HistoryPanel from "@/components/HistoryPanel";
import ShareButton from "@/components/ShareButton";

export default function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tipPercent, setTipPercent] = useState(18);
  const [people, setPeople] = useState(1);
  const { history, addEntry, clearHistory } = useHistory("dcp-tip-history");

  const result = useMemo(
    () => calculateTip({ bill, tipPercent, people }),
    [bill, tipPercent, people]
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!result) return;
    addEntry({ bill, tipPercent, people, total: result.total });
  }

  return (
    <div className="rounded-2xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-5 md:p-6 shadow-card">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
            Bill amount ($)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            required
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            className="w-full rounded-lg border border-border dark:border-dark-border bg-paper dark:bg-dark-bg px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
            Tip percentage
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {TIP_PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setTipPercent(p)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  Number(tipPercent) === p
                    ? "bg-accent text-white"
                    : "bg-paper dark:bg-dark-bg text-ink-muted"
                }`}
              >
                {p}%
              </button>
            ))}
          </div>
          <input
            type="number"
            min="0"
            max="100"
            value={tipPercent}
            onChange={(e) => setTipPercent(e.target.value)}
            className="w-full rounded-lg border border-border dark:border-dark-border bg-paper dark:bg-dark-bg px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
            Split between how many people?
          </label>
          <input
            type="number"
            min="1"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            className="w-full rounded-lg border border-border dark:border-dark-border bg-paper dark:bg-dark-bg px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-600 transition-colors"
        >
          Calculate tip
        </button>
      </form>

      {result && (
        <div className="mt-6">
          <div className="lcd-display rounded-2xl px-6 py-5 flex flex-col items-center text-center">
            <span className="lcd-label text-[10px] mb-1">TOTAL PER PERSON</span>
            <span className="lcd-digits text-4xl font-semibold">
              {formatCurrency(result.perPersonTotal)}
            </span>
            <span className="lcd-label text-[10px] mt-2">
              incl. {formatCurrency(result.perPersonTip)} tip
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-center">
            <div className="rounded-xl bg-paper dark:bg-dark-bg p-3">
              <div className="text-sm font-semibold text-ink dark:text-white">
                {formatCurrency(result.tipAmount)}
              </div>
              <div className="text-[11px] text-ink-muted mt-0.5">Total tip</div>
            </div>
            <div className="rounded-xl bg-paper dark:bg-dark-bg p-3">
              <div className="text-sm font-semibold text-ink dark:text-white">
                {formatCurrency(result.total)}
              </div>
              <div className="text-[11px] text-ink-muted mt-0.5">Grand total</div>
            </div>
          </div>

          <div className="mt-4">
            <ShareButton
              getShareUrl={() =>
                `${window.location.origin}${window.location.pathname}?bill=${bill}&tip=${tipPercent}&people=${people}`
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
            <span>${entry.bill} bill, {entry.tipPercent}% tip</span>
            <span>${entry.total}</span>
          </>
        )}
      />
    </div>
  );
}
