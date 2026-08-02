"use client";

import { useState } from "react";

export default function ShareButton({ getShareUrl, label = "Share result" }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = getShareUrl();
    if (!url) return;

    if (navigator.share) {
      try {
        await navigator.share({ url, title: "DailyCalc Pro result" });
        return;
      } catch {
        // fall through to clipboard copy
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API blocked — no-op, button still visually responds.
    }
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 rounded-full border border-border dark:border-dark-border px-3.5 py-1.5 text-xs font-medium text-ink dark:text-white hover:border-accent hover:text-accent transition-colors"
      type="button"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="M8.59 13.51 15.42 17.49M15.41 6.51 8.59 10.49" />
      </svg>
      {copied ? "Link copied!" : label}
    </button>
  );
}
