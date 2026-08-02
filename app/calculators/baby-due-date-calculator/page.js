import CalculatorLayout from "@/components/CalculatorLayout";
import BabyDueDateCalculator from "@/components/calculators/BabyDueDateCalculator";

const NAME = "Baby Due Date Calculator";
const SLUG = "baby-due-date-calculator";
const DESCRIPTION =
  "Estimate your baby's due date using Naegele's rule from your last menstrual period, or from an estimated conception date.";

export const metadata = {
  title: "Pregnancy Due Date Calculator — Estimate Your Baby's Arrival",
  description:
    "Free pregnancy due date calculator: enter your last menstrual period or conception date to estimate your due date, current gestational age, and trimester.",
  alternates: { canonical: `/calculators/${SLUG}` },
  openGraph: { title: NAME, description: DESCRIPTION },
};

const faqs = [
  {
    q: "How is a pregnancy due date calculated?",
    a: "The most common method, Naegele's rule, adds 280 days (40 weeks) to the first day of your last menstrual period. If you know your estimated conception date instead, 266 days (38 weeks) is added, since conception typically occurs about two weeks after the start of the last period.",
  },
  {
    q: "How accurate is a due date estimate?",
    a: "A calculated due date is an estimate, not a guarantee — only about 1 in 20 babies are born on their exact due date. Most babies arrive within a two-week window before or after the estimated date. An ultrasound dating scan, typically done early in pregnancy, often provides a more precise estimate than date-based calculation alone.",
  },
  {
    q: "What are the three trimesters?",
    a: "Pregnancy is commonly divided into three trimesters: the first trimester runs through week 12, the second trimester spans roughly weeks 13–26, and the third trimester covers week 27 through birth, usually around week 40.",
  },
  {
    q: "Should I use this instead of seeing a doctor?",
    a: "No — this calculator is for general planning and informational purposes only. Your healthcare provider will confirm your due date using clinical methods, which may adjust the estimate based on ultrasound measurements or other factors specific to your pregnancy.",
  },
];

export default function BabyDueDateCalculatorPage() {
  return (
    <CalculatorLayout
      slug={SLUG}
      name={NAME}
      tagline="Estimate your due date from your last menstrual period or conception date, plus your current gestational age."
      metaDescription={DESCRIPTION}
      calculatorSlot={<BabyDueDateCalculator />}
      faqs={faqs}
      explanation={
        <>
          <h2>Naegele's Rule Explained</h2>
          <p>
            Naegele's rule is the standard formula used by midwives and
            doctors for a quick due-date estimate: take the first day of the
            last menstrual period (LMP), add one year, subtract three
            months, and add seven days — mathematically equivalent to adding
            280 days. It assumes a regular 28-day cycle with ovulation
            around day 14.
          </p>

          <h2>Using a Conception Date Instead</h2>
          <p>
            If you know your approximate conception date more precisely than
            your last period — for example, through fertility tracking or
            IVF — the calculator adds 266 days from that date instead,
            arriving at the same general due date without needing to assume
            a standard cycle length.
          </p>

          <h2>Understanding Gestational Age</h2>
          <p>
            Gestational age is measured in weeks from the first day of the
            last menstrual period, not from the conception date — which is
            why a pregnancy is described as "40 weeks" even though actual
            fetal development spans closer to 38 weeks from conception.
          </p>

          <h2>What to Do With This Estimate</h2>
          <ul>
            <li>Use it as a starting point for prenatal appointment scheduling.</li>
            <li>Track which trimester you're currently in.</li>
            <li>Confirm the estimate with a healthcare provider, especially via an early dating ultrasound.</li>
          </ul>
        </>
      }
    />
  );
}
