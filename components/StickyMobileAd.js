"use client";

import { useState } from "react";
import AdSlot from "./AdSlot";

export default function StickyMobileAd() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 block md:hidden border-t border-border dark:border-dark-border bg-surface/95 dark:bg-dark-surface/95 backdrop-blur px-2 pt-1 pb-[env(safe-area-inset-bottom)]">
      <div className="relative">
        <button
          onClick={() => setDismissed(true)}
          aria-label="Close ad"
          className="absolute -top-3 right-0 h-6 w-6 rounded-full bg-ink text-white dark:bg-white dark:text-ink text-xs flex items-center justify-center shadow-card"
        >
          ×
        </button>
        <AdSlot position="sticky" className="min-h-[50px] max-h-[50px]" />
      </div>
    </div>
  );
}
