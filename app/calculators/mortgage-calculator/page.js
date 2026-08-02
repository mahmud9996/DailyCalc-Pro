import CalculatorLayout from "@/components/CalculatorLayout";
import MortgageCalculator from "@/components/calculators/MortgageCalculator";

const NAME = "Mortgage Calculator";
const SLUG = "mortgage-calculator";
const DESCRIPTION =
  "Estimate your monthly mortgage payment, total interest, and total cost for a US or UK home loan.";

export const metadata = {
  title: "Mortgage Calculator — Monthly Payment Estimator (US & UK)",
  description:
    "Free mortgage calculator: enter home price, down payment, interest rate, and loan term to instantly estimate your monthly payment, total interest, and total cost.",
  alternates: { canonical: `/calculators/${SLUG}` },
  openGraph: { title: NAME, description: DESCRIPTION },
};

const faqs = [
  {
    q: "What formula does this mortgage calculator use?",
    a: "It uses the standard fixed-rate amortization formula, which spreads the loan principal and interest into equal monthly payments over the full loan term, so early payments are interest-heavy and later payments are principal-heavy even though the payment amount stays the same each month.",
  },
  {
    q: "Does the monthly payment include property tax and insurance?",
    a: "No — this estimate covers principal and interest only. Your actual monthly outgoing will typically be higher once property tax, homeowners or buildings insurance, and (if applicable) private mortgage insurance or a UK ground rent/service charge are added.",
  },
  {
    q: "How much difference does a larger down payment make?",
    a: "A larger down payment reduces the loan principal directly, which lowers both your monthly payment and the total interest paid over the life of the loan. In the US, a down payment of 20% or more also typically avoids private mortgage insurance (PMI).",
  },
  {
    q: "Is this calculator accurate for UK mortgages?",
    a: "The underlying repayment-mortgage math is the same in the UK and US. Just switch the currency toggle to £ and enter your UK mortgage rate and term — keep in mind UK mortgage deals often have an initial fixed period shorter than the full loan term, after which the rate may change.",
  },
];

export default function MortgageCalculatorPage() {
  return (
    <CalculatorLayout
      slug={SLUG}
      name={NAME}
      tagline="Enter your home price, down payment, interest rate, and term to see your estimated monthly payment."
      metaDescription={DESCRIPTION}
      calculatorSlot={<MortgageCalculator />}
      faqs={faqs}
      explanation={
        <>
          <h2>How Mortgage Payments Are Calculated</h2>
          <p>
            A fixed-rate mortgage payment is calculated so that the exact
            same amount is paid every month for the full loan term, even
            though the balance of principal and interest within that payment
            shifts over time. In the early years, most of each payment goes
            toward interest; in the final years, most goes toward paying
            down the principal.
          </p>

          <h2>The Key Inputs Explained</h2>
          <ul>
            <li>
              <strong>Home price</strong> — the full purchase price of the
              property.
            </li>
            <li>
              <strong>Down payment</strong> — the portion you pay upfront in
              cash; the remainder becomes your loan principal.
            </li>
            <li>
              <strong>Interest rate (APR)</strong> — the annual interest rate
              on the loan, converted to a monthly rate for the calculation.
            </li>
            <li>
              <strong>Loan term</strong> — typically 15, 20, 25, or 30 years
              in the US, and commonly 25 years in the UK, though terms vary.
            </li>
          </ul>

          <h2>Why a Longer Term Lowers Your Payment but Raises Total Cost</h2>
          <p>
            Spreading the same loan principal over more months lowers each
            individual payment, but it also means you pay interest for
            longer — so a 30-year term will almost always cost more in total
            interest than a 15-year term at the same rate, even though the
            monthly payment is significantly lower.
          </p>
        </>
      }
    />
  );
}
