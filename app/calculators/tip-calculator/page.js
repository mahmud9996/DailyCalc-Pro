import CalculatorLayout from "@/components/CalculatorLayout";
import TipCalculator from "@/components/calculators/TipCalculator";

const NAME = "Tip Calculator";
const SLUG = "tip-calculator";
const DESCRIPTION =
  "Calculate a US-standard restaurant tip and split the total bill evenly between any number of people.";

export const metadata = {
  title: "Tip Calculator — Calculate & Split Restaurant Tips Instantly",
  description:
    "Free tip calculator: enter your bill, pick a tip percentage (10–25%), and split the total between any number of people. US-standard tipping made simple.",
  alternates: { canonical: `/calculators/${SLUG}` },
  openGraph: { title: NAME, description: DESCRIPTION },
};

const faqs = [
  {
    q: "What is a standard tip percentage in the US?",
    a: "For sit-down restaurant service in the US, 15–20% of the pre-tax bill is the most common range, with 18–20% typical for good service and 20–25% for exceptional service. Some diners tip a flat 15% for average service.",
  },
  {
    q: "Should I tip on the pre-tax or post-tax amount?",
    a: "Tipping etiquette in the US generally calls for calculating the tip on the pre-tax subtotal, though many people simplify by tipping on the total receipt amount — this calculator lets you enter whichever bill figure you prefer.",
  },
  {
    q: "How does bill splitting work with an uneven number of people?",
    a: "The calculator divides both the tip and the total bill equally across the number of people you enter. If your group wants to split unevenly — for example, based on what each person ordered — you can still use the total tip amount and total bill figures shown and allocate them manually.",
  },
  {
    q: "Is tipping required in the UK or Bangladesh?",
    a: "Tipping conventions vary by country. In the UK, a service charge is sometimes already included in the bill, and additional tipping is optional and typically lower (around 10%). In Bangladesh, tipping is less standardized and often more modest. This calculator defaults to US conventions but works with any percentage you choose.",
  },
];

export default function TipCalculatorPage() {
  return (
    <CalculatorLayout
      slug={SLUG}
      name={NAME}
      tagline="Enter your bill and tip percentage to split the total fairly between everyone at the table."
      metaDescription={DESCRIPTION}
      calculatorSlot={<TipCalculator />}
      faqs={faqs}
      explanation={
        <>
          <h2>How This Tip Calculator Works</h2>
          <p>
            Enter your bill total, choose a tip percentage using the quick
            preset buttons or a custom value, and the calculator instantly
            shows your total tip, grand total, and — if you're splitting the
            bill — exactly how much each person owes. It updates in real
            time as you type, so there's no need to press calculate more
            than once while you experiment with different tip percentages.
          </p>

          <h2>Common Tipping Scenarios</h2>
          <ul>
            <li>
              <strong>Dining out with friends</strong> — split both the bill
              and tip evenly across the table.
            </li>
            <li>
              <strong>Solo takeout or delivery</strong> — quickly check what
              a 15% or 20% tip adds to your total.
            </li>
            <li>
              <strong>Group events and catering</strong> — calculate a tip on
              a large bill and divide it among many attendees.
            </li>
          </ul>

          <h2>A Quick Guide to US Tipping Norms</h2>
          <table>
            <thead>
              <tr>
                <th>Service Quality</th>
                <th>Typical Tip</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Below average</td><td>10–12%</td></tr>
              <tr><td>Average / satisfactory</td><td>15%</td></tr>
              <tr><td>Good</td><td>18–20%</td></tr>
              <tr><td>Excellent</td><td>20–25%</td></tr>
            </tbody>
          </table>
        </>
      }
    />
  );
}
