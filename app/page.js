import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import SearchBar from "@/components/SearchBar";
import { TOOLS, CATEGORIES, getToolsByCategory } from "@/lib/toolsList";

export const metadata = {
  title: "DailyCalc Pro — Free Online Calculators for Daily Life",
  description:
    "Age, BMI, mortgage, VAT, salary, tip, prayer time, retirement, due date & password calculators — free, fast, and accurate for the US, UK & Bangladesh.",
  alternates: { canonical: "/" },
};

const CATEGORY_META = {
  finance: {
    title: "Finance",
    blurb: "Mortgages, salary, VAT/GST, and retirement planning.",
  },
  health: {
    title: "Health",
    blurb: "BMI and pregnancy due-date tools grounded in real formulas.",
  },
  lifestyle: {
    title: "Lifestyle",
    blurb: "Age, prayer times, tipping, and password security.",
  },
};

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border dark:border-dark-border">
        <div className="absolute inset-0 bg-grid-fade pointer-events-none" />
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 text-center relative">
          <span className="inline-block rounded-full border border-border dark:border-dark-border px-3 py-1 text-xs font-medium text-ink-muted mb-5">
            10 free tools · No sign-up required
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-ink dark:text-white leading-[1.05] max-w-3xl mx-auto">
            All-in-One Smart Calculator Platform for Daily Life
          </h1>
          <p className="mt-5 text-base md:text-lg text-ink-muted max-w-xl mx-auto">
            Precise, instant answers for money, health, and everyday
            decisions — built for the US, UK, and Bangladesh.
          </p>
          <div className="mt-8">
            <SearchBar variant="hero" />
          </div>

          <div className="mt-10 inline-flex flex-col items-center gap-2 rounded-2xl lcd-display px-6 py-4">
            <span className="lcd-label text-[10px]">Live preview</span>
            <span className="lcd-digits text-3xl md:text-4xl font-semibold">
              29y 4m 12d
            </span>
            <span className="lcd-label text-[10px]">age-calculator.dailycalcpro.com</span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <AdSlot position="top" />
      </div>

      {/* Categories */}
      {Object.keys(CATEGORY_META).map((catKey, idx) => (
        <section
          key={catKey}
          id={catKey}
          className="mx-auto max-w-6xl px-4 py-10 scroll-mt-20"
        >
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                {CATEGORIES[catKey]}
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-ink dark:text-white mt-1">
                {CATEGORY_META[catKey].title} Calculators
              </h2>
              <p className="text-sm text-ink-muted mt-1">
                {CATEGORY_META[catKey].blurb}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {getToolsByCategory(catKey).map((tool) => (
              <Link
                key={tool.slug}
                href={`/calculators/${tool.slug}`}
                className="group rounded-2xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-5 hover:border-accent hover:shadow-card transition-all"
              >
                <span className="text-base font-semibold text-ink dark:text-white group-hover:text-accent transition-colors">
                  {tool.name}
                </span>
                <p className="mt-1.5 text-sm text-ink-muted">{tool.tagline}</p>
                <span className="mt-3 inline-block text-xs font-medium text-accent">
                  Calculate →
                </span>
              </Link>
            ))}
          </div>

          {idx === 1 && (
            <div className="mt-8">
              <AdSlot position="mid-content" />
            </div>
          )}
        </section>
      ))}

      {/* SEO intro content */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="prose-dcp max-w-3xl">
          <h2>Why Use DailyCalc Pro for Your Everyday Calculations?</h2>
          <p>
            DailyCalc Pro brings together the ten calculators people search
            for most — from working out an exact age in years, months, and
            days, to estimating a mortgage payment, converting a salary into
            an hourly wage, or checking whether a password would survive a
            real-world guessing attack. Every tool runs instantly in your
            browser, so there is no waiting on a server and no account to
            create before you get an answer.
          </p>
          <p>
            The platform is built specifically with users in the{" "}
            <strong>United States</strong>, <strong>United Kingdom</strong>,
            and <strong>Bangladesh</strong> in mind. That means the Age
            Calculator understands US, UK, and Bangladeshi date formats, the
            Mortgage Calculator supports both US amortization and UK
            repayment conventions, the VAT/GST Calculator defaults to UK VAT
            rates, and the Prayer Time Calculator can auto-detect your
            location to return Fajr, Dhuhr, Asr, Maghrib, and Isha times
            wherever you are.
          </p>
          <p>
            Every calculator on this site is designed around three
            principles: speed, accuracy, and clarity. Results appear the
            moment you finish typing, the underlying formulas are the same
            ones used by banks, nutritionists, and religious authorities, and
            each result comes with a short, plain-English explanation so you
            understand not just the number but what it means. You can save
            any result to your local history, share a calculation with a
            direct link, and switch between light and dark mode depending on
            when and where you're working.
          </p>
          <p>
            Whether you're budgeting a new home purchase, tracking a
            pregnancy milestone, planning retirement, or simply splitting a
            restaurant bill fairly, DailyCalc Pro is built to be the fastest
            path from a question to a trustworthy answer — free, private, and
            available on any device.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-12">
        <AdSlot position="mid-content" />
      </div>

      {/* All tools list for crawlability / internal linking */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="font-display text-xl font-bold text-ink dark:text-white mb-4">
          All Calculators
        </h2>
        <div className="flex flex-wrap gap-2">
          {TOOLS.map((tool) => (
            <Link
              key={tool.slug}
              href={`/calculators/${tool.slug}`}
              className="rounded-full border border-border dark:border-dark-border px-4 py-1.5 text-sm text-ink-muted hover:border-accent hover:text-accent transition-colors"
            >
              {tool.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
