"use client";

import { useEffect, useRef } from "react";

/**
 * Renders a Google AdSense unit (or a clearly-labeled placeholder while
 * NEXT_PUBLIC_ADSENSE_CLIENT is unset, so layout/spacing stays correct
 * during development and before AdSense approval).
 *
 * position: "top" | "after-result" | "mid-content" | "faq" | "footer" | "sticky"
 */
const SLOT_ENV_MAP = {
  top: process.env.NEXT_PUBLIC_AD_SLOT_TOP,
  "after-result": process.env.NEXT_PUBLIC_AD_SLOT_AFTER_RESULT,
  "mid-content": process.env.NEXT_PUBLIC_AD_SLOT_MID_CONTENT,
  faq: process.env.NEXT_PUBLIC_AD_SLOT_FAQ,
  footer: process.env.NEXT_PUBLIC_AD_SLOT_FOOTER,
  sticky: process.env.NEXT_PUBLIC_AD_SLOT_STICKY,
};

const LABELS = {
  top: "Ad",
  "after-result": "Ad",
  "mid-content": "Ad",
  faq: "Ad",
  footer: "Ad",
  sticky: "Ad",
};

const MIN_HEIGHT = {
  top: "min-h-[90px]",
  "after-result": "min-h-[250px]",
  "mid-content": "min-h-[250px]",
  faq: "min-h-[100px]",
  footer: "min-h-[90px]",
  sticky: "min-h-[50px]",
};

export default function AdSlot({ position = "top", className = "" }) {
  const ref = useRef(null);
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const slot = SLOT_ENV_MAP[position];
  const isConfigured = client && slot && !client.includes("0000000000000000");

  useEffect(() => {
    if (!isConfigured) return;
    try {
      // eslint-disable-next-line no-undef
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense script not yet loaded — safe to ignore.
    }
  }, [isConfigured]);

  return (
    <div
      data-ad-position={position}
      className={`w-full ${MIN_HEIGHT[position]} flex items-center justify-center overflow-hidden rounded-xl border border-dashed border-border dark:border-dark-border bg-paper/60 dark:bg-dark-surface/60 ${className}`}
      ref={ref}
      aria-label="Advertisement"
    >
      {isConfigured ? (
        <ins
          className="adsbygoogle block w-full"
          style={{ display: "block" }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <span className="text-xs uppercase tracking-wider text-ink-muted/60">
          {LABELS[position]} space · {position.replace("-", " ")}
        </span>
      )}
    </div>
  );
}
