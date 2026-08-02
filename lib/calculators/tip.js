export const TIP_PRESETS = [10, 15, 18, 20, 25];

export function calculateTip({ bill, tipPercent, people }) {
  const b = parseFloat(bill);
  const tip = parseFloat(tipPercent);
  const p = Math.max(1, parseInt(people, 10) || 1);

  if (!b || b <= 0 || Number.isNaN(tip) || tip < 0) return null;

  const tipAmount = (b * tip) / 100;
  const total = b + tipAmount;

  return {
    tipAmount: Math.round(tipAmount * 100) / 100,
    total: Math.round(total * 100) / 100,
    perPersonTotal: Math.round((total / p) * 100) / 100,
    perPersonTip: Math.round((tipAmount / p) * 100) / 100,
    people: p,
  };
}
