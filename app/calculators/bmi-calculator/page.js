import CalculatorLayout from "@/components/CalculatorLayout";
import BmiCalculator from "@/components/calculators/BmiCalculator";

const NAME = "BMI Calculator";
const SLUG = "bmi-calculator";
const DESCRIPTION =
  "Calculate Body Mass Index (BMI) in metric or imperial units with an instant chart and health category breakdown.";

export const metadata = {
  title: "BMI Calculator — Body Mass Index Chart & Category",
  description:
    "Free BMI calculator with instant chart: enter your height and weight in metric (kg/cm) or imperial (lb/ft-in) to see your BMI, healthy weight range, and category.",
  alternates: { canonical: `/calculators/${SLUG}` },
  openGraph: { title: NAME, description: DESCRIPTION },
};

const faqs = [
  {
    q: "What is a healthy BMI range?",
    a: "According to the World Health Organization, a BMI between 18.5 and 24.9 falls in the 'normal weight' range for most adults. Below 18.5 is classified as underweight, 25–29.9 as overweight, and 30 or above as obese.",
  },
  {
    q: "Is BMI accurate for everyone?",
    a: "BMI is a useful screening tool but doesn't distinguish between muscle and fat mass, so it can overestimate body fat in muscular athletes and underestimate it in older adults who've lost muscle mass. It's best used as a general indicator alongside other health measures, not a diagnosis.",
  },
  {
    q: "How is BMI calculated?",
    a: "In metric units, BMI equals weight in kilograms divided by height in meters squared. In imperial units, BMI equals 703 multiplied by weight in pounds, divided by height in inches squared.",
  },
  {
    q: "Does BMI apply to children the same way?",
    a: "No. Children and teenagers are assessed using age- and sex-specific BMI percentile charts rather than the fixed adult category thresholds used in this calculator, which is designed for adults 20 and older.",
  },
];

export default function BmiCalculatorPage() {
  return (
    <CalculatorLayout
      slug={SLUG}
      name={NAME}
      tagline="Enter your height and weight to instantly see your BMI, category, and healthy weight range."
      metaDescription={DESCRIPTION}
      calculatorSlot={<BmiCalculator />}
      faqs={faqs}
      explanation={
        <>
          <h2>Understanding Body Mass Index</h2>
          <p>
            Body Mass Index (BMI) is a simple screening measurement that
            relates your weight to your height. It's widely used by doctors,
            insurers, and public health bodies as a fast first check of
            whether someone's weight falls within a range typically
            associated with good health, because it requires only two
            measurements and no special equipment.
          </p>

          <h2>BMI Categories Explained</h2>
          <table>
            <thead>
              <tr>
                <th>BMI Range</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Below 18.5</td><td>Underweight</td></tr>
              <tr><td>18.5 – 24.9</td><td>Normal weight</td></tr>
              <tr><td>25.0 – 29.9</td><td>Overweight</td></tr>
              <tr><td>30.0 and above</td><td>Obese</td></tr>
            </tbody>
          </table>

          <h2>Real-Life Uses</h2>
          <ul>
            <li>
              <strong>Routine health check-ups</strong>, where BMI is often
              the first metric a doctor records.
            </li>
            <li>
              <strong>Life insurance applications</strong>, which frequently
              use BMI bands to help assess premiums.
            </li>
            <li>
              <strong>Fitness goal-setting</strong>, using the healthy-weight
              range as a target rather than a single number.
            </li>
          </ul>

          <h2>Limitations to Keep in Mind</h2>
          <p>
            BMI doesn't measure body fat directly, and it doesn't account for
            muscle mass, bone density, or fat distribution. A bodybuilder and
            a sedentary person of the same height and weight can have
            identical BMI scores despite very different body compositions.
            Use this calculator as a starting point for a conversation with a
            healthcare provider, not a final verdict on your health.
          </p>
        </>
      }
    />
  );
}
