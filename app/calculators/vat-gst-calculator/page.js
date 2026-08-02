import CalculatorLayout from "@/components/CalculatorLayout";
import VatGstCalculator from "@/components/calculators/VatGstCalculator";

const NAME = "VAT / GST Calculator";
const SLUG = "vat-gst-calculator";
const DESCRIPTION =
  "Add or remove UK VAT at standard, reduced, zero, or custom rates — instantly see net, VAT amount, and gross price.";

export const metadata = {
  title: "VAT Calculator UK — Add or Remove VAT (20%, 5%, 0%)",
  description:
    "Free UK VAT/GST calculator: add VAT to a net price or remove VAT from a gross price at the 20% standard, 5% reduced, or a custom rate. Instant, accurate results.",
  alternates: { canonical: `/calculators/${SLUG}` },
  openGraph: { title: NAME, description: DESCRIPTION },
};

const faqs = [
  {
    q: "What is the current UK standard VAT rate?",
    a: "The UK standard VAT rate is 20%, applied to most goods and services. A reduced rate of 5% applies to specific items such as domestic energy, and a 0% rate applies to certain essentials like most food and children's clothing. Always check current HMRC guidance for the applicable rate to your goods or services.",
  },
  {
    q: "What's the difference between adding and removing VAT?",
    a: "Adding VAT starts from a net (VAT-exclusive) price and calculates what the customer actually pays. Removing VAT starts from a gross (VAT-inclusive) price — such as a receipt total — and works backward to find the pre-tax net amount and the VAT portion within it.",
  },
  {
    q: "Why isn't removing VAT simply gross × 20%?",
    a: "Because the 20% rate applies to the net amount, not the gross amount. To remove VAT correctly, the gross figure is divided by 1.20 (for a 20% rate) to find the net price, then the VAT amount is the difference between gross and net — not 20% of the gross figure, which would overstate the VAT.",
  },
  {
    q: "Is this calculator suitable for GST in other countries?",
    a: "Yes — the underlying add/remove tax math is identical for GST systems used in countries like Bangladesh, Australia, or India. Simply select 'Custom' and enter your local GST rate.",
  },
];

export default function VatGstCalculatorPage() {
  return (
    <CalculatorLayout
      slug={SLUG}
      name={NAME}
      tagline="Add VAT to a net price, or strip VAT out of a gross price, at standard, reduced, or custom rates."
      metaDescription={DESCRIPTION}
      calculatorSlot={<VatGstCalculator />}
      faqs={faqs}
      explanation={
        <>
          <h2>How UK VAT Calculations Work</h2>
          <p>
            Value Added Tax (VAT) is a consumption tax added at each stage of
            the supply chain in the UK. For everyday calculations, what
            matters is the relationship between three figures: the net price
            (before tax), the VAT amount, and the gross price (what the
            customer actually pays). This calculator handles both common
            directions of that calculation.
          </p>

          <h2>Adding VAT to a Net Price</h2>
          <p>
            If you know a product's pre-tax price and need to work out what
            a customer will pay, multiply the net price by the VAT rate to
            get the VAT amount, then add that to the net price to get the
            gross price. For example, a £100 net price at the 20% standard
            rate carries £20 of VAT, for a £120 gross price.
          </p>

          <h2>Removing VAT from a Gross Price</h2>
          <p>
            If you only have a VAT-inclusive total — such as a receipt or
            invoice total — and need to find the underlying net price, divide
            the gross amount by 1 plus the VAT rate as a decimal (1.20 for
            20%). A £120 gross price divided by 1.20 gives a £100 net price,
            with £20 as the VAT component.
          </p>

          <h2>Who Uses This Calculator</h2>
          <ul>
            <li>
              <strong>Small business owners</strong> pricing products and
              preparing invoices.
            </li>
            <li>
              <strong>Freelancers and contractors</strong> quoting VAT-
              inclusive or VAT-exclusive rates to clients.
            </li>
            <li>
              <strong>Shoppers and bookkeepers</strong> checking how much tax
              is embedded in a receipt total.
            </li>
          </ul>
        </>
      }
    />
  );
}
