export const BMI_CATEGORIES = [
  { max: 18.5, label: "Underweight", color: "#3B82F6" },
  { max: 25, label: "Normal weight", color: "#7ED321" },
  { max: 30, label: "Overweight", color: "#F59E0B" },
  { max: Infinity, label: "Obese", color: "#EF4444" },
];

export function getBmiCategory(bmi) {
  return BMI_CATEGORIES.find((c) => bmi < c.max) || BMI_CATEGORIES[BMI_CATEGORIES.length - 1];
}

export function calculateBmi({ unit, weight, height, heightFeet, heightInches }) {
  const w = parseFloat(weight);
  if (!w || w <= 0) return null;

  let bmi;
  if (unit === "metric") {
    const h = parseFloat(height) / 100; // cm -> m
    if (!h || h <= 0) return null;
    bmi = w / (h * h);
  } else {
    const feet = parseFloat(heightFeet) || 0;
    const inches = parseFloat(heightInches) || 0;
    const totalInches = feet * 12 + inches;
    if (!totalInches) return null;
    bmi = (703 * w) / (totalInches * totalInches);
  }

  if (!Number.isFinite(bmi) || bmi <= 0) return null;

  const category = getBmiCategory(bmi);

  // Healthy weight range for the given height (BMI 18.5–24.9)
  let healthyRange = null;
  if (unit === "metric") {
    const h = parseFloat(height) / 100;
    healthyRange = { min: 18.5 * h * h, max: 24.9 * h * h, unit: "kg" };
  } else {
    const totalInches = (parseFloat(heightFeet) || 0) * 12 + (parseFloat(heightInches) || 0);
    healthyRange = {
      min: (18.5 * totalInches * totalInches) / 703,
      max: (24.9 * totalInches * totalInches) / 703,
      unit: "lb",
    };
  }

  return {
    bmi: Math.round(bmi * 10) / 10,
    category: category.label,
    color: category.color,
    healthyRange,
  };
}
