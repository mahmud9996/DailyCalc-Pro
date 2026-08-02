import CalculatorLayout from "@/components/CalculatorLayout";
import PasswordStrengthChecker from "@/components/calculators/PasswordStrengthChecker";

const NAME = "Password Strength Checker";
const SLUG = "password-strength-checker";
const DESCRIPTION =
  "Check password strength in real time using entropy scoring, pattern detection, and a practical improvement checklist — entirely in your browser.";

export const metadata = {
  title: "Password Strength Checker — Real-Time Security Analysis",
  description:
    "Free password strength checker: get real-time entropy scoring, an estimated crack time, and practical suggestions to strengthen your password. Nothing is ever sent or stored.",
  alternates: { canonical: `/calculators/${SLUG}` },
  openGraph: { title: NAME, description: DESCRIPTION },
};

const faqs = [
  {
    q: "Is my password sent to a server when I use this tool?",
    a: "No. The entire analysis runs locally in your browser using JavaScript. Your password is never transmitted over the network, logged, or saved — closing or refreshing the page erases it completely.",
  },
  {
    q: "What does 'entropy' mean for a password?",
    a: "Entropy measures how unpredictable a password is, expressed in bits. It's calculated from the password's length and the variety of character types used (lowercase, uppercase, numbers, symbols). Higher entropy means dramatically more possible combinations an attacker would need to try.",
  },
  {
    q: "Why did a long password still score as weak?",
    a: "Length alone doesn't guarantee strength. Predictable patterns — common passwords, sequential characters like '123' or 'abc', or repeated characters — are heavily penalized because real-world attackers try these patterns first, long before attempting a true random guess-and-check.",
  },
  {
    q: "How is the 'time to crack' estimated?",
    a: "The estimate assumes an offline attack against a fast (but not instant) hash at roughly 10 billion guesses per second, averaging half the total possible combinations. Real-world crack times vary enormously depending on how the password is stored — a well-salted, slow hash can make cracking far harder than this baseline estimate suggests.",
  },
  {
    q: "What makes a genuinely strong password?",
    a: "A strong password combines meaningful length (12+ characters, ideally more), a mix of character types, and unpredictability — avoiding dictionary words, personal information, and reused passwords from other accounts. A password manager that generates and stores long random passwords is the most reliable approach.",
  },
];

export default function PasswordStrengthCheckerPage() {
  return (
    <CalculatorLayout
      slug={SLUG}
      name={NAME}
      tagline="Type a password to see its real-time strength score, estimated crack time, and how to improve it."
      metaDescription={DESCRIPTION}
      calculatorSlot={<PasswordStrengthChecker />}
      faqs={faqs}
      explanation={
        <>
          <h2>How This Checker Scores Password Strength</h2>
          <p>
            Rather than relying on simple rules like "must contain a number,"
            this tool calculates an entropy score based on your password's
            length and character variety, then applies penalties for
            predictable patterns that real attackers exploit first — common
            passwords, sequential runs like "qwerty" or "12345," and
            repeated characters like "aaa."
          </p>

          <h2>Reading Your Results</h2>
          <ul>
            <li><strong>Very Weak / Weak</strong> — crackable in seconds to hours; avoid for any real account.</li>
            <li><strong>Fair</strong> — acceptable for low-stakes accounts, not recommended for email, banking, or password managers.</li>
            <li><strong>Strong / Very Strong</strong> — resistant to automated guessing attacks for a meaningful length of time.</li>
          </ul>

          <h2>Practical Tips for Stronger Passwords</h2>
          <p>
            Length matters more than complexity for most real-world attacks
            — a long passphrase of unrelated words is often both stronger
            and easier to remember than a short, symbol-heavy password.
            Never reuse the same password across multiple accounts: if one
            site is breached, reused passwords let attackers access your
            other accounts too. A password manager remains the most
            practical way to use long, unique, random passwords everywhere.
          </p>
        </>
      }
    />
  );
}
