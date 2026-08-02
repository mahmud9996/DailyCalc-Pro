import { Suspense } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import AgeCalculator from "@/components/calculators/AgeCalculator";

const NAME = "Age Calculator";
const SLUG = "age-calculator";
const DESCRIPTION =
  "Calculate your exact age in years, months, and days from your date of birth — supports US, UK, and Bangladesh date formats.";

export const metadata = {
  title: "Age Calculator — Find Your Exact Age in Years, Months & Days",
  description:
    "Free age calculator: enter your date of birth to instantly see your exact age in years, months, days, weeks, and hours. Supports US (MM/DD/YYYY) and UK/BD (DD/MM/YYYY) formats.",
  alternates: { canonical: `/calculators/${SLUG}` },
  openGraph: { title: NAME, description: DESCRIPTION },
};

const faqs = [
  {
    q: "How is exact age calculated in years, months, and days?",
    a: "The calculator subtracts your date of birth from today's date, carrying over any negative day or month values to the previous unit — the same method used on official age-verification forms. For example, if today is the 3rd of a month and you were born on the 20th, the calculator borrows days from the previous month rather than showing a negative number.",
  },
  {
    q: "Does this work with UK and Bangladeshi date formats?",
    a: "Yes. Select United Kingdom or Bangladesh from the region dropdown to enter and read dates in DD/MM/YYYY format, or United States for MM/DD/YYYY. The underlying calculation is identical — only the input/output formatting changes.",
  },
  {
    q: "Why does my total-days count differ from a simple year × 365 calculation?",
    a: "A simple multiplication ignores leap years. This calculator counts the actual number of calendar days between your date of birth and today, so every February 29th you've lived through is correctly included.",
  },
  {
    q: "Can I calculate someone else's age, like a child's or a pet's?",
    a: "Yes — the calculator works for any past date, so it's commonly used for children's ages, pet birthdays, or historical date differences.",
  },
  {
    q: "Is my date of birth stored anywhere?",
    a: "No. The calculation runs entirely in your browser. If you use the optional 'save history' feature, that record is stored only in your own browser's local storage and is never sent to our servers.",
  },
];

export default function AgeCalculatorPage() {
  return (
    <CalculatorLayout
      slug={SLUG}
      name={NAME}
      tagline="Enter a date of birth to see exact age in years, months, days — plus total weeks and hours lived."
      metaDescription={DESCRIPTION}
      calculatorSlot={
        <Suspense fallback={<div className="h-64 animate-pulse rounded-2xl bg-paper dark:bg-dark-surface" />}>
          <AgeCalculator />
        </Suspense>
      }
      faqs={faqs}
      explanation={
        <>
          <h2>How the Age Calculator Works</h2>
          <p>
            This tool calculates your exact chronological age by comparing
            your date of birth against today's date, then expressing the
            difference in complete years, months, and days — not just a
            rounded estimate. It's the same calendar-aware method used on
            passport applications, school enrollment forms, and legal
            documents, where "29 years old" isn't precise enough and you need
            to know you are exactly 29 years, 4 months, and 12 days old.
          </p>

          <h2>Real-Life Uses for an Exact Age Calculation</h2>
          <ul>
            <li>
              <strong>Job and visa applications</strong> that require your
              precise age as of the application date, not just your birth
              year.
            </li>
            <li>
              <strong>School and university admissions</strong>, where cutoff
              ages are often measured to the day.
            </li>
            <li>
              <strong>Retirement and pension eligibility</strong> checks,
              where a few days can matter for benefit start dates.
            </li>
            <li>
              <strong>Milestone tracking</strong> — knowing exactly how many
              days old a baby is, or counting down to a milestone birthday.
            </li>
          </ul>

          <h2>US vs. UK vs. Bangladesh Date Formats</h2>
          <p>
            One of the most common sources of error in age calculations is
            date format confusion: 04/05/2020 means April 5th in the United
            States but May 4th in the United Kingdom and Bangladesh. This
            calculator's region selector adjusts how dates are entered and
            displayed so the underlying calculation always matches the date
            you intended.
          </p>

          <table>
            <thead>
              <tr>
                <th>Region</th>
                <th>Format</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>United States</td>
                <td>MM/DD/YYYY</td>
                <td>04/05/2020 = April 5, 2020</td>
              </tr>
              <tr>
                <td>United Kingdom</td>
                <td>DD/MM/YYYY</td>
                <td>04/05/2020 = May 4, 2020</td>
              </tr>
              <tr>
                <td>Bangladesh</td>
                <td>DD/MM/YYYY</td>
                <td>04/05/2020 = May 4, 2020</td>
              </tr>
            </tbody>
          </table>
        </>
      }
    />
  );
}
