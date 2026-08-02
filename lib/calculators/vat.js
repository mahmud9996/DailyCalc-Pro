export const VAT_RATES = [
  { label: "UK Standard (20%)", value: 20 },
  { label: "UK Reduced (5%)", value: 5 },
  { label: "UK Zero (0%)", value: 0 },
  { label: "Custom", value: "custom" },
];

export function calculateVat({ amount, rate, mode }) {
  const a = parseFloat(amount);
  const r = parseFloat(rate);
  if (!a || a <= 0 || Number.isNaN(r) || r < 0) return null;

  let net, gross, vatAmount;

  if (mode === "add") {
    // amount entered is the net (VAT-exclusive) price
    net = a;
    vatAmount = (net * r) / 100;
    gross = net + vatAmount;
  } else {
    // amount entered is the gross (VAT-inclusive) price
    gross = a;
    net = gross / (1 + r / 100);
    vatAmount = gross - net;
  }

  return {
    net: Math.round(net * 100) / 100,
    gross: Math.round(gross * 100) / 100,
    vatAmount: Math.round(vatAmount * 100) / 100,
    rate: r,
  };
}
