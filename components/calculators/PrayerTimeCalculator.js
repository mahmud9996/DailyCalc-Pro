"use client";

import { useState } from "react";
import {
  CALCULATION_METHODS,
  fetchTimingsByCoords,
  fetchTimingsByCity,
} from "@/lib/calculators/prayerTimes";

export default function PrayerTimeCalculator() {
  const [method, setMethod] = useState(2);
  const [status, setStatus] = useState("idle"); // idle | locating | loading | error | done
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState(null);
  const [manualCity, setManualCity] = useState("");
  const [manualCountry, setManualCountry] = useState("");
  const [locationLabel, setLocationLabel] = useState("");

  function handleDetectLocation() {
    if (!navigator.geolocation) {
      setStatus("error");
      setErrorMsg("Geolocation isn't supported in this browser. Try entering your city manually below.");
      return;
    }
    setStatus("locating");
    setErrorMsg("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setStatus("loading");
        try {
          const { latitude, longitude } = position.coords;
          const data = await fetchTimingsByCoords(latitude, longitude, method);
          setResult(data);
          setLocationLabel(`your current location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`);
          setStatus("done");
        } catch (err) {
          setStatus("error");
          setErrorMsg(err.message || "Couldn't fetch prayer times for your location.");
        }
      },
      () => {
        setStatus("error");
        setErrorMsg("Location access was denied. Enter your city manually below instead.");
      },
      { timeout: 10000 }
    );
  }

  async function handleManualSubmit(e) {
    e.preventDefault();
    if (!manualCity || !manualCountry) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const data = await fetchTimingsByCity(manualCity, manualCountry, method);
      setResult(data);
      setLocationLabel(`${manualCity}, ${manualCountry}`);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Couldn't fetch prayer times for that city.");
    }
  }

  return (
    <div className="rounded-2xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-5 md:p-6 shadow-card">
      <div>
        <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
          Calculation method
        </label>
        <select
          value={method}
          onChange={(e) => setMethod(Number(e.target.value))}
          className="w-full rounded-lg border border-border dark:border-dark-border bg-paper dark:bg-dark-bg px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
        >
          {CALCULATION_METHODS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={handleDetectLocation}
        disabled={status === "locating" || status === "loading"}
        className="mt-4 w-full sm:w-auto inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-600 transition-colors disabled:opacity-60"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
        </svg>
        {status === "locating"
          ? "Detecting location…"
          : status === "loading"
          ? "Loading prayer times…"
          : "Auto-detect my location"}
      </button>

      {status === "error" && (
        <p className="mt-3 text-sm text-red-500">{errorMsg}</p>
      )}

      <details className="mt-4 group" open={status === "error"}>
        <summary className="cursor-pointer text-xs font-medium text-accent select-none">
          Or enter your city manually
        </summary>
        <form onSubmit={handleManualSubmit} className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="City (e.g. Dhaka)"
            required
            value={manualCity}
            onChange={(e) => setManualCity(e.target.value)}
            className="w-full rounded-lg border border-border dark:border-dark-border bg-paper dark:bg-dark-bg px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
          <input
            type="text"
            placeholder="Country (e.g. Bangladesh)"
            required
            value={manualCountry}
            onChange={(e) => setManualCountry(e.target.value)}
            className="w-full rounded-lg border border-border dark:border-dark-border bg-paper dark:bg-dark-bg px-3.5 py-2.5 text-sm text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
          <button
            type="submit"
            className="sm:col-span-2 rounded-full border border-accent px-6 py-2 text-sm font-semibold text-accent hover:bg-accent hover:text-white transition-colors"
          >
            Get prayer times for this city
          </button>
        </form>
      </details>

      {result && status === "done" && (
        <div className="mt-6">
          <div className="lcd-display rounded-2xl px-6 py-5 text-center">
            <span className="lcd-label text-[10px]">
              {result.date} {result.hijriDate ? `· ${result.hijriDate}` : ""}
            </span>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {result.timings.map((t) => (
                <div key={t.name}>
                  <div className="lcd-digits text-lg font-semibold">{t.time}</div>
                  <div className="lcd-label text-[9px] mt-0.5">{t.name}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-xs text-ink-muted">
            Showing times for {locationLabel}
            {result.timezone ? ` (${result.timezone})` : ""}. Times are
            calculated, not observed — always confirm with your local
            mosque for congregational prayer times.
          </p>
        </div>
      )}
    </div>
  );
}
