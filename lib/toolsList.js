// Central registry of every calculator — single source of truth for
// navigation, homepage listings, search, internal linking, and the sitemap.

export const CATEGORIES = {
  finance: "Finance",
  health: "Health",
  lifestyle: "Lifestyle",
};

export const TOOLS = [
  {
    slug: "age-calculator",
    name: "Age Calculator",
    shortName: "Age",
    category: "lifestyle",
    icon: "cake",
    tagline: "Find your exact age in years, months and days",
    description:
      "Calculate exact age from date of birth in US, UK, and Bangladesh date formats.",
  },
  {
    slug: "prayer-time-calculator",
    name: "Prayer Time Calculator",
    shortName: "Prayer Times",
    category: "lifestyle",
    icon: "compass",
    tagline: "Accurate Salah times for your exact location",
    description:
      "Auto-detects your location to show Fajr, Dhuhr, Asr, Maghrib and Isha times.",
  },
  {
    slug: "vat-gst-calculator",
    name: "VAT / GST Calculator",
    shortName: "VAT/GST",
    category: "finance",
    icon: "receipt",
    tagline: "Add or remove UK VAT and GST in seconds",
    description:
      "Calculate VAT-inclusive or VAT-exclusive prices at standard, reduced, or custom rates.",
  },
  {
    slug: "mortgage-calculator",
    name: "Mortgage Calculator",
    shortName: "Mortgage",
    category: "finance",
    icon: "home",
    tagline: "Monthly mortgage payments for US & UK home loans",
    description:
      "Estimate monthly repayments, total interest, and full amortization for any home loan.",
  },
  {
    slug: "salary-to-hourly-calculator",
    name: "Salary to Hourly Converter",
    shortName: "Salary → Hourly",
    category: "finance",
    icon: "wallet",
    tagline: "Convert annual salary to hourly, weekly & monthly pay",
    description:
      "Convert a US annual salary into hourly, daily, weekly and monthly take-home figures.",
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    shortName: "BMI",
    category: "health",
    icon: "activity",
    tagline: "Body Mass Index with chart and health category",
    description:
      "Calculate BMI in metric or imperial units with a visual chart and category breakdown.",
  },
  {
    slug: "tip-calculator",
    name: "Tip Calculator",
    shortName: "Tip",
    category: "lifestyle",
    icon: "coffee",
    tagline: "Split the bill and calculate tips instantly",
    description:
      "Calculate US-standard restaurant tips and split the total bill between any number of people.",
  },
  {
    slug: "retirement-date-calculator",
    name: "Retirement Date Calculator",
    shortName: "Retirement",
    category: "finance",
    icon: "calendar",
    tagline: "Find your exact retirement date",
    description:
      "Calculate your retirement date based on birth date and target retirement age.",
  },
  {
    slug: "baby-due-date-calculator",
    name: "Baby Due Date Calculator",
    shortName: "Due Date",
    category: "health",
    icon: "heart",
    tagline: "Estimate your baby's due date (Naegele's rule)",
    description:
      "Estimate your expected delivery date from your last menstrual period or conception date.",
  },
  {
    slug: "password-strength-checker",
    name: "Password Strength Checker",
    shortName: "Password Check",
    category: "lifestyle",
    icon: "shield",
    tagline: "Real-time password strength & security analysis",
    description:
      "Check password strength in real time with entropy scoring and practical improvement tips.",
  },
];

export function getToolBySlug(slug) {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(category) {
  return TOOLS.filter((t) => t.category === category);
}

export function getRelatedTools(slug, count = 3) {
  const current = getToolBySlug(slug);
  if (!current) return TOOLS.slice(0, count);
  const sameCategory = TOOLS.filter(
    (t) => t.category === current.category && t.slug !== slug
  );
  const rest = TOOLS.filter(
    (t) => t.category !== current.category && t.slug !== slug
  );
  return [...sameCategory, ...rest].slice(0, count);
}
