import CalculatorLayout from "@/components/CalculatorLayout";
import RetirementCalculator from "@/components/calculators/RetirementCalculator";

const NAME = "Retirement Date Calculator";
const SLUG = "retirement-date-calculator";
const DESCRIPTION =
  "Calculate your exact retirement date from your date of birth and target retirement age, with a US Social Security full retirement age reference.";

export const metadata = {
  title: "Retirement Date Calculator — Find Your Exact Retirement Date",
  description:
    "Free retirement date calculator: enter your date of birth and target retirement age to see your exact retirement date and a countdown in years, months, and days.",
  alternates: { canonical: `/calculators/${SLUG}` },
  openGraph: { title: NAME, description: DESCRIPTION },
};

const faqs = [
  {
    q: "How is my retirement date calculated?",
    a: "The calculator adds your chosen retirement age directly to your date of birth. For example, someone born on June 15, 1990 who plans to retire at 65 would reach that retirement date on June 15, 2055.",
  },
  {
    q: "What is the US Social Security full retirement age?",
    a: "Full retirement age (FRA) is the age at which you qualify for 100% of your Social Security retirement benefit. It's 66 for people born between 1943 and 1954, and rises gradually to 67 for anyone born in 1960 or later. Claiming earlier, from age 62, permanently reduces your monthly benefit.",
  },
  {
    q: "Can I use this to plan for early or late retirement?",
    a: "Yes — the calculator accepts any target age, so you can compare retirement dates for early retirement (such as age 60 or 62), a standard target like 65 or 67, or delayed retirement past your full retirement age.",
  },
  {
    q: "Does this account for pension rules in the UK or Bangladesh?",
    a: "This calculator computes a simple age-based date and doesn't apply country-specific pension eligibility rules. UK State Pension age and Bangladeshi government service retirement rules differ from the US Social Security schedule shown here, so check your local pension authority for exact eligibility dates.",
  },
];

export default function RetirementCalculatorPage() {
  return (
    <CalculatorLayout
      slug={SLUG}
      name={NAME}
      tagline="Enter your date of birth and target retirement age to find your exact retirement date and countdown."
      metaDescription={DESCRIPTION}
      calculatorSlot={<RetirementCalculator />}
      faqs={faqs}
      explanation={
        <>
          <h2>Planning Around a Retirement Date</h2>
          <p>
            Knowing your exact retirement date — not just "in my mid-60s" —
            makes it much easier to plan savings contributions, mortgage
            payoff timelines, and major life decisions like relocating or
            reducing work hours in the years leading up to retirement.
          </p>

          <h2>Choosing a Target Retirement Age</h2>
          <ul>
            <li>
              <strong>Early retirement (60–62)</strong> — often comes with
              reduced pension or Social Security benefits in exchange for
              more years of retirement.
            </li>
            <li>
              <strong>Full retirement age (66–67 in the US)</strong> — the
              age at which you receive 100% of your calculated Social
              Security benefit.
            </li>
            <li>
              <strong>Delayed retirement (68–70)</strong> — in the US,
              delaying past full retirement age increases your monthly
              Social Security benefit up to age 70.
            </li>
          </ul>

          <h2>A Note on Accuracy</h2>
          <p>
            This calculator provides a straightforward date based on age,
            useful for personal planning and goal-setting. It does not
            replace guidance from the Social Security Administration, a UK
            pension provider, or a financial advisor when making binding
            retirement decisions.
          </p>
        </>
      }
    />
  );
}
