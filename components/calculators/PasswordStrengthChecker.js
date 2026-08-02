"use client";

import { useMemo, useState } from "react";
import { analyzePassword } from "@/lib/calculators/passwordStrength";

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const result = useMemo(() => analyzePassword(password), [password]);

  const checklist = result
    ? [
        ["12+ characters", result.length >= 12],
        ["Uppercase letter", result.hasUpper],
        ["Lowercase letter", result.hasLower],
        ["Number", result.hasDigit],
        ["Symbol", result.hasSymbol],
        ["No common patterns", !result.sequential && !result.repeated && !result.isCommon],
      ]
    : [];

  return (
    <div className="rounded-2xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-5 md:p-6 shadow-card">
      <label className="block text-sm font-medium text-ink dark:text-white mb-1.5">
        Type or paste a password to check
      </label>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          autoComplete="off"
          spellCheck={false}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter a password…"
          className="w-full rounded-lg border border-border dark:border-dark-border bg-paper dark:bg-dark-bg px-3.5 py-2.5 pr-20 text-sm font-mono text-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-accent"
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
      <p className="mt-1.5 text-[11px] text-ink-muted">
        This check runs entirely in your browser — nothing is sent anywhere or saved.
      </p>

      {result && (
        <div className="mt-6">
          <div className="lcd-display rounded-2xl px-6 py-5 flex flex-col items-center text-center">
            <span className="lcd-label text-[10px] mb-1">STRENGTH</span>
            <span className="lcd-digits text-3xl font-semibold" style={{ color: result.color, textShadow: "none" }}>
              {result.label}
            </span>
            <span className="lcd-label text-[10px] mt-2">
              ~{result.entropy} bits of entropy
            </span>
          </div>

          <div className="mt-4 h-2 w-full rounded-full bg-paper dark:bg-dark-bg overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${result.score * 20}%`, backgroundColor: result.color }}
            />
          </div>

          <p className="mt-4 text-sm text-ink-muted">
            Estimated time to crack (offline attack, average case):{" "}
            <strong className="text-ink dark:text-white">{result.crackTime}</strong>
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {checklist.map(([label, passed]) => (
              <div key={label} className="flex items-center gap-2 text-xs">
                <span
                  className={`h-4 w-4 shrink-0 rounded-full flex items-center justify-center text-[10px] ${
                    passed ? "bg-signal-dim text-white" : "bg-paper dark:bg-dark-bg text-ink-muted border border-border dark:border-dark-border"
                  }`}
                >
                  {passed ? "✓" : ""}
                </span>
                <span className={passed ? "text-ink dark:text-white" : "text-ink-muted"}>{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl bg-paper dark:bg-dark-bg p-4">
            <h3 className="text-xs font-semibold text-ink dark:text-white mb-2">
              Suggestions
            </h3>
            <ul className="space-y-1">
              {result.suggestions.map((s) => (
                <li key={s} className="text-xs text-ink-muted">• {s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
