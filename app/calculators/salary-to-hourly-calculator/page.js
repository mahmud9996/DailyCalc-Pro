import CalculatorLayout from "@/components/CalculatorLayout";
import SalaryHourlyCalculator from "@/components/calculators/SalaryHourlyCalculator";

const NAME = "Salary to Hourly Converter";
const SLUG = "salary-to-hourly-calculator";
const DESCRIPTION =
  "Convert a US annual salary into hourly, daily, weekly, and monthly pay based on your actual work schedule.";

export const metadata = {
  title: "Salary to Hourly Calculator — Convert Annual Pay to Hourly Rate",
  description:
    "Free salary to hourly converter: enter your annual salary and work schedule to instantly see your hourly, daily, weekly, and monthly pay.",
  alternates: { canonical: `/calculators/${SLUG}` },
  openGraph: { title: NAME, description: DESCRIPTION },
};

const faqs = [
  {
    q: "How do I convert an annual salary to an hourly rate?",
    a: "Divide the annual salary by the total number of hours worked in a year — hours per week multiplied by the number of working weeks per year. For a standard full-time US schedule of 40 hours a week, 52 weeks a year, that's 2,080 hours.",
  },
  {
    q: "Should I use 52 or 50 weeks per year?",
    a: "Use 52 if your salary already accounts for paid time off (most standard US salaried positions). Use a lower number, such as 50, only if you want to estimate your effective hourly rate excluding unpaid weeks off — this calculator lets you adjust the figure either way.",
  },
  {
    q: "Does this calculator account for taxes?",
    a: "No — all figures shown are gross (pre-tax) pay, converted directly from your gross annual salary. Your actual take-home hourly rate will be lower after federal, state, and payroll taxes are deducted.",
  },
  {
    q: "Why is my 'daily' figure not simply hourly × 8?",
    a: "The daily figure is calculated from your actual hours-per-week and days-per-week inputs, so if you work a compressed schedule (for example, 40 hours across 4 days), your daily total will correctly reflect 10-hour days rather than assuming a standard 8-hour day.",
  },
];

export default function SalaryHourlyCalculatorPage() {
  return (
    <CalculatorLayout
      slug={SLUG}
      name={NAME}
      tagline="Enter your annual salary and work schedule to see your equivalent hourly, daily, weekly, and monthly pay."
      metaDescription={DESCRIPTION}
      calculatorSlot={<SalaryHourlyCalculator />}
      faqs={faqs}
      explanation={
        <>
          <h2>Why Convert Salary to an Hourly Rate?</h2>
          <p>
            Knowing your effective hourly rate is useful for comparing job
            offers with different pay structures, evaluating whether
            freelance or contract rates are competitive with a salaried
            role, and understanding the real value of your time when
            deciding whether extra unpaid work (like commuting or unpaid
            overtime) is worth it.
          </p>

          <h2>The Calculation, Step by Step</h2>
          <ul>
            <li>Multiply hours per week by working weeks per year to get total annual hours.</li>
            <li>Divide annual salary by total annual hours to get the hourly rate.</li>
            <li>Multiply the hourly rate by hours-per-day to get a daily figure.</li>
            <li>Multiply the hourly rate by hours-per-week to get a weekly figure.</li>
          </ul>

          <h2>A Worked Example</h2>
          <p>
            A $60,000 annual salary at a standard 40-hour week, 52 weeks a
            year, works out to roughly $28.85 per hour, $230.77 per day
            (8-hour day), and $1,153.85 per week — all before tax
            withholding.
          </p>
        </>
      }
    />
  );
}
