"use client";

import { useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { calculateBmi, BMI_CATEGORIES } from "@/lib/calculators/bmi";
import { useHistory } from "@/hooks/useLocalStorage";
import { formatNumber } from "@/lib/utils";
import HistoryPanel from "@/components/HistoryPanel";
import ShareButton from "@/components/ShareButton";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function BmiCalculator() {
  const [unit, setUnit] = useState("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const { history, addEntry, clearHistory } = useHistory("dcp-bmi-history");

  const result = useMemo(
    () => calculateBmi({ unit, weight, height, heightFeet, heightInches }),
    [unit, weight, height, heightFeet, heightInches]
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!result) return;
    addEntry({ bmi: result.bmi, category: result.category, unit });
  }

  const chartData = useMemo(() => {
    const refs = [
      { label: "Underweight", value: 17 },
      { label: "Normal", value: 22 },
      { label: "Overweight", value: 27.5 },
      { label: "Obese", value: 33 },
    ];
    if (result) refs.push({ label: "You", value: result.bmi });
    return {
      labels: refs.map((r) => r.label),
      datasets: [
        {
          data: refs.map((r) => r.value),
          backgroundColor: refs.map((r) =>
            r.label === "You" ? "#4338CA" : "#D6D9E0"
          ),
          borderRadius: 6,
        },
      ],
    };
  }, [result]);

  return (
    <div className="rounded-2xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-5 md:p-6 shadow-card">
      <div className="flex gap-2 mb-5">
        {["metric", "imperial"].map((u) => (
          <button
            key={u}
            onClick={() => setUnit(u)}
            type="button"
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              unit === u
                ? "bg-accent text-white"
                : "bg-paper dark:bg-dark-bg text-ink-muted"
            }`}
          >
            {u === "metric" ? "Metric (kg/cm)" : "Imperial (lb/ft-in)"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
            Weight ({unit === "metric" ? "kg" : "lb"})
          </label>
          <input
            type="number"
            min="1"
            step="0.1"
            required
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full rounded-lg border border-border dark:border-dark-border bg-paper dark:bg-dark-bg px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        {unit === "metric" ? (
          <div>
            <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
              Height (cm)
            </label>
            <input
              type="number"
              min="1"
              step="0.1"
              required
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full rounded-lg border border-border dark:border-dark-border bg-paper dark:bg-dark-bg px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
                Height (ft)
              </label>
              <input
                type="number"
                min="0"
                required
                value={heightFeet}
                onChange={(e) => setHeightFeet(e.target.value)}
                className="w-full rounded-lg border border-border dark:border-dark-border bg-paper dark:bg-dark-bg px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
                Height (in)
              </label>
              <input
                type="number"
                min="0"
                max="11"
                required
                value={heightInches}
                onChange={(e) => setHeightInches(e.target.value)}
                className="w-full rounded-lg border border-border dark:border-dark-border bg-paper dark:bg-dark-bg px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>
          </div>
        )}

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full sm:w-auto rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-600 transition-colors"
          >
            Calculate BMI
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-6">
          <div className="lcd-display rounded-2xl px-6 py-5 flex flex-col items-center text-center">
            <span className="lcd-label text-[10px] mb-1">YOUR BMI</span>
            <span className="lcd-digits text-4xl font-semibold">{result.bmi}</span>
            <span className="lcd-label text-[10px] mt-2">{result.category.toUpperCase()}</span>
          </div>

          <div className="mt-5 h-48">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: { beginAtZero: true, max: 40, grid: { color: "rgba(0,0,0,0.05)" } },
                },
              }}
            />
          </div>

          <p className="mt-4 text-sm text-ink-muted">
            A healthy weight range for your height is approximately{" "}
            <strong className="text-ink dark:text-white">
              {formatNumber(result.healthyRange.min, 1)}–{formatNumber(result.healthyRange.max, 1)} {result.healthyRange.unit}
            </strong>
            .
          </p>

          <div className="mt-4">
            <ShareButton
              getShareUrl={() =>
                `${window.location.origin}${window.location.pathname}?unit=${unit}&weight=${weight}&height=${unit === "metric" ? height : `${heightFeet}ft${heightInches}in`}`
              }
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {BMI_CATEGORIES.map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-1.5 rounded-full bg-paper dark:bg-dark-bg px-3 py-1 text-[11px] text-ink-muted"
              >
                <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
                {c.label}
              </span>
            ))}
          </div>
        </div>
      )}

      <HistoryPanel
        history={history}
        onClear={clearHistory}
        renderEntry={(entry) => (
          <>
            <span>BMI {entry.bmi}</span>
            <span>{entry.category}</span>
          </>
        )}
      />
    </div>
  );
}
