import AdSlot from "@/components/AdSlot";

export const metadata = {
  title: "About Us",
  description:
    "Learn about DailyCalc Pro's mission to provide free, accurate, fast calculators for finance, health, and everyday life.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-ink dark:text-white">
        About DailyCalc Pro
      </h1>

      <div className="prose-dcp mt-6">
        <p>
          DailyCalc Pro was built around a simple idea: everyday numerical
          questions deserve fast, accurate, and free answers — without ads
          that interrupt the calculation, forms that demand an email address,
          or formulas hidden behind a paywall.
        </p>

        <h2>Our mission</h2>
        <p>
          We build focused, single-purpose calculators that do one job
          extremely well. Each tool on this site — from the Age Calculator to
          the Mortgage Calculator — is designed around the real formula used
          by professionals in that field, then wrapped in an interface simple
          enough to use on a phone in under thirty seconds.
        </p>

        <h2>Who we build for</h2>
        <p>
          Our audience spans the United States, United Kingdom, and
          Bangladesh, so we pay close attention to regional differences: date
          formats, currency, VAT versus GST, and local conventions like UK
          mortgage terminology or Bangladeshi prayer time calculation
          methods.
        </p>

        <h2>How we make money</h2>
        <p>
          DailyCalc Pro is completely free to use. The site is supported by
          display advertising, which allows us to keep every calculator
          available with no sign-up and no subscription. We work to keep
          advertising clearly labeled and unobtrusive, and we never let ad
          placement interfere with how a calculator works.
        </p>

        <h2>Accuracy and limitations</h2>
        <p>
          Every calculator uses well-established public formulas (such as
          Naegele's rule for due dates, standard loan amortization for
          mortgages, or BMI thresholds published by major health
          authorities). Results are estimates for informational purposes and
          are not a substitute for professional financial, medical, or legal
          advice.
        </p>
      </div>

      <div className="mt-10">
        <AdSlot position="mid-content" />
      </div>
    </div>
  );
}
