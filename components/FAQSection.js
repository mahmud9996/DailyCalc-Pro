"use client";

import { useState } from "react";
import AdSlot from "./AdSlot";

export default function FAQSection({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs.length) return null;

  // Insert the FAQ ad after the 2nd question (or middle, for short lists).
  const adIndex = Math.min(2, faqs.length - 1);

  return (
    <section className="mt-10" aria-label="Frequently asked questions">
      <h2 className="font-display text-2xl font-bold text-ink dark:text-white mb-4">
        Frequently Asked Questions
      </h2>
      <div className="divide-y divide-border dark:divide-dark-border rounded-2xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface overflow-hidden">
        {faqs.map((item, i) => (
          <div key={item.q}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={openIndex === i}
            >
              <span className="text-sm font-medium text-ink dark:text-white">
                {item.q}
              </span>
              <span
                className={`shrink-0 text-ink-muted transition-transform ${
                  openIndex === i ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 text-sm leading-relaxed text-ink-muted">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {faqs.length > adIndex + 1 && (
        <div className="my-6">
          <AdSlot position="faq" />
        </div>
      )}
    </section>
  );
}
