import CalculatorLayout from "@/components/CalculatorLayout";
import PrayerTimeCalculator from "@/components/calculators/PrayerTimeCalculator";

const NAME = "Prayer Time Calculator";
const SLUG = "prayer-time-calculator";
const DESCRIPTION =
  "Auto-detect your location to get accurate Fajr, Dhuhr, Asr, Maghrib, and Isha prayer times using your preferred calculation method.";

export const metadata = {
  title: "Prayer Time Calculator — Accurate Salah Times for Your Location",
  description:
    "Free prayer time calculator with auto location detection: get today's Fajr, Dhuhr, Asr, Maghrib, and Isha times using ISNA, Muslim World League, or other calculation methods.",
  alternates: { canonical: `/calculators/${SLUG}` },
  openGraph: { title: NAME, description: DESCRIPTION },
};

const faqs = [
  {
    q: "How does location auto-detection work?",
    a: "When you tap 'Auto-detect my location,' your browser asks for permission to share your approximate coordinates. Those coordinates are sent only to the prayer-time calculation service to compute times for your exact position — they are not stored on our servers.",
  },
  {
    q: "What if I don't want to share my location?",
    a: "You can enter your city and country manually instead using the fallback form. This returns the same calculated times based on that city's registered coordinates.",
  },
  {
    q: "Which calculation method should I choose?",
    a: "Different Islamic authorities use slightly different angles for calculating Fajr and Isha. The Islamic Society of North America (ISNA) method is common in the US and Canada, the Muslim World League method is widely used internationally, and Umm al-Qura is standard in Saudi Arabia. If you're unsure, ISNA or Muslim World League are safe defaults for most regions, but check with your local mosque if precision matters for you.",
  },
  {
    q: "Why do prayer times change every day?",
    a: "Prayer times are based on the sun's position relative to your location, which shifts daily due to the Earth's rotation and orbit. Fajr and Isha in particular can vary noticeably through the year, especially at higher latitudes.",
  },
  {
    q: "Are these times authoritative for religious purposes?",
    a: "These times are calculated using established astronomical formulas and widely recognized calculation methods, and are intended as a convenient reference. For congregational prayer scheduling, always confirm with your local mosque, which may adjust times slightly for local practice.",
  },
];

export default function PrayerTimeCalculatorPage() {
  return (
    <CalculatorLayout
      slug={SLUG}
      name={NAME}
      tagline="Auto-detect your location or enter a city to see today's Fajr, Dhuhr, Asr, Maghrib, and Isha times."
      metaDescription={DESCRIPTION}
      calculatorSlot={<PrayerTimeCalculator />}
      faqs={faqs}
      explanation={
        <>
          <h2>How Prayer Times Are Calculated</h2>
          <p>
            Islamic prayer times are determined by the sun's position: Fajr
            begins at true dawn (a defined angle of the sun below the
            horizon), Dhuhr begins just after the sun passes its zenith,
            Asr is based on the length of an object's shadow, Maghrib
            begins at sunset, and Isha begins once twilight has fully
            faded. Because the exact angle used for Fajr and Isha differs
            slightly between Islamic authorities, several standard
            "calculation methods" exist.
          </p>

          <h2>Why Location Matters</h2>
          <p>
            Because prayer times depend on the sun's position, they differ
            significantly by latitude and longitude — and even by a few
            minutes between neighboring cities. Auto-detecting your
            location (or entering your city manually) ensures the times
            shown are calculated specifically for where you are, not a
            generic regional average.
          </p>

          <h2>Common Calculation Methods</h2>
          <ul>
            <li><strong>ISNA</strong> — widely used across the US and Canada.</li>
            <li><strong>Muslim World League</strong> — used broadly across Europe, the Far East, and parts of the US.</li>
            <li><strong>Umm al-Qura</strong> — the official method used in Saudi Arabia.</li>
            <li><strong>University of Islamic Sciences, Karachi</strong> — commonly used across South Asia, including Bangladesh and Pakistan.</li>
          </ul>
        </>
      }
    />
  );
}
