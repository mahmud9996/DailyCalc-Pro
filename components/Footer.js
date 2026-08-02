import Link from "next/link";
import { TOOLS } from "@/lib/toolsList";
import AdSlot from "./AdSlot";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border dark:border-dark-border bg-surface dark:bg-dark-surface">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <AdSlot position="footer" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-10 grid grid-cols-2 gap-8 md:grid-cols-4">
        <div className="col-span-2">
          <span className="font-display text-lg font-bold text-ink dark:text-white">
            DailyCalc <span className="text-accent">Pro</span>
          </span>
          <p className="mt-3 text-sm text-ink-muted max-w-xs">
            Free, fast, and accurate calculators for finance, health, and
            everyday life — built for the US, UK, and Bangladesh.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink dark:text-white mb-3">
            Calculators
          </h3>
          <ul className="space-y-2">
            {TOOLS.slice(0, 6).map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={`/calculators/${tool.slug}`}
                  className="text-sm text-ink-muted hover:text-accent transition-colors"
                >
                  {tool.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink dark:text-white mb-3">
            Company
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="text-sm text-ink-muted hover:text-accent transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-ink-muted hover:text-accent transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="text-sm text-ink-muted hover:text-accent transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border dark:border-dark-border">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-ink-muted flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} DailyCalc Pro. All rights reserved.</span>
          <span>Results are estimates for informational purposes only, not professional advice.</span>
        </div>
      </div>
    </footer>
  );
}
