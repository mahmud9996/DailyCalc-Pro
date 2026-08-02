import Link from "next/link";
import AdSlot from "./AdSlot";
import FAQSection from "./FAQSection";
import StickyMobileAd from "./StickyMobileAd";
import {
  WebApplicationSchema,
  FAQSchema,
  BreadcrumbSchema,
} from "./SchemaMarkup";
import { getRelatedTools } from "@/lib/toolsList";

/**
 * Enforces the required page structure for every calculator:
 * 1. H1  2. Top ad  3. Calculator UI  4. Ad after result
 * 5. Explanation content  6. Mid-content ad  7. FAQ (+ ad)
 * 8. Related tools  9. Footer ad (site-wide, in <Footer/>)  10. Sticky mobile ad
 */
export default function CalculatorLayout({
  slug,
  name,
  tagline,
  metaDescription,
  calculatorSlot,
  explanation,
  faqs = [],
}) {
  const related = getRelatedTools(slug, 3);

  return (
    <>
      <WebApplicationSchema name={name} description={metaDescription} slug={slug} />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema name={name} slug={slug} />

      <div className="mx-auto max-w-3xl px-4 pb-24 pt-8 md:pb-16">
        <nav className="mb-3 text-xs text-ink-muted" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-accent">Home</Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink dark:text-white">{name}</span>
        </nav>

        <h1 className="font-display text-3xl md:text-4xl font-bold text-ink dark:text-white leading-tight">
          {name}
        </h1>
        {tagline && (
          <p className="mt-2 text-ink-muted text-base">{tagline}</p>
        )}

        <div className="mt-6">
          <AdSlot position="top" />
        </div>

        <div className="mt-6">{calculatorSlot}</div>

        <div className="mt-6">
          <AdSlot position="after-result" />
        </div>

        {explanation && (
          <article className="mt-10 prose-dcp">{explanation}</article>
        )}

        <div className="mt-8">
          <AdSlot position="mid-content" />
        </div>

        <FAQSection faqs={faqs} />

        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-bold text-ink dark:text-white mb-4">
              Related Calculators
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {related.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/calculators/${tool.slug}`}
                  className="rounded-xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-4 hover:border-accent transition-colors"
                >
                  <span className="block text-sm font-semibold text-ink dark:text-white">
                    {tool.name}
                  </span>
                  <span className="block mt-1 text-xs text-ink-muted">
                    {tool.tagline}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <StickyMobileAd />
    </>
  );
}
