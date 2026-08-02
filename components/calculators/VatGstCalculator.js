"use client";

import { useMemo, useState } from "react";
import { calculateVat, VAT_RATES } from "@/lib/calculators/vat";
import { useHistory } from "@/hooks/useLocalStorage";
import { formatCurrency } from "@/lib/utils";
import HistoryPanel from "@/components/HistoryPanel";
import ShareButton from "@/components/ShareButton";

export default function VatGstCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState(20);
  const [customRate, setCustomRate] = useState("");
  const [mode, setMode] = useState("add"); // add = net -> gross, remove = gross -> net
  const { history, addEntry, clearHistory } = useHistory("dcp-vat-history");

  const effectiveRate = rate === "custom" ? customRate : rate;

  const result = useMemo(
    () => calculateVat({ amount, rate: effectiveRate, mode }),
    [amount, effectiveRate, mode]
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!result) return;
    addEntry({ amount, rate: effectiveRate, mode, gross: result.gross });
  }

  return (
    <div className="rounded-2xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-5 md:p-6 shadow-card">
      <div className="flex gap-2 mb-5">
        {[
          { key: "add", label: "Add VAT (I have the net price)" },
          { key: "remove", label: "Remove VAT (I have the gross price)" },
        ].map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => setMode(m.key)}
            className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
              mode === m.key
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
            {mode === "add" ? "Net (VAT-exclusive) amount (£)" : "Gross (VAT-inclusive) amount (£)"}
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border border-border dark:border-dark-border bg-paper dark:bg-dark-bg px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
            VAT / GST rate
          </label>
          <select
            value={rate}
            onChange={(e) =>
              setRate(e.target.value === "custom" ? "custom" : Number(e.target.value))
            }
            className="w-full rounded-lg border border-border dark:border-dark-border bg-paper dark:bg-dark-bg px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
          >
            {VAT_RATES.map((r) => (
              <option key={r.label} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
          {rate === "custom" && (
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              placeholder="Enter custom rate %"
              value={customRate}
              onChange={(e) => setCustomRate(e.target.value)}
              className="mt-2 w-full rounded-lg border border-border dark:border-dark-border bg-paper dark:bg-dark-bg px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-600 transition-colors"
        >
          Calculate VAT
        </button>
      </form>

      {result && (
        <div className="mt-6">
          <div className="lcd-display rounded-2xl px-6 py-5 flex flex-col items-center text-center">
            <span className="lcd-label text-[10px] mb-1">GROSS (VAT-INCLUSIVE)</span>
            <span className="lcd-digits text-4xl font-semibold">
              {formatCurrency(result.gross, "GBP", "en-GB")}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-center">
            <div className="rounded-xl bg-paper dark:bg-dark-bg p-3">
              <div className="text-sm font-semibold text-ink dark:text-white">
                {formatCurrency(result.net, "GBP", "en-GB")}
              </div>
              <div className="text-[11px] text-ink-muted mt-0.5">Net (excl. VAT)</div>
            </div>
            <div className="rounded-xl bg-paper dark:bg-dark-bg p-3">
              <div className="text-sm font-semibold text-ink dark:text-white">
                {formatCurrency(result.vatAmount, "GBP", "en-GB")}
              </div>
              <div className="text-[11px] text-ink-muted mt-0.5">VAT amount ({result.rate}%)</div>
            </div>
          </div>

          <div className="mt-4">
            <ShareButton
              getShareUrl={() =>
                `${window.location.origin}${window.location.pathname}?amount=${amount}&rate=${effectiveRate}&mode=${mode}`
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
            <span>{entry.mode === "add" ? "+ " : "− "}{entry.rate}% on £{entry.amount}</span>
            <span>£{entry.gross}</span>
          </>
        )}
      />
    </div>
  );
}
