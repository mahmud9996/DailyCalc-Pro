export function calculateMortgage({ homePrice, downPayment, rate, years }) {
  const price = parseFloat(homePrice);
  const down = parseFloat(downPayment) || 0;
  const annualRate = parseFloat(rate);
  const termYears = parseFloat(years);

  if (!price || price <= 0) return null;
  if (down < 0 || down >= price) return null;
  if (Number.isNaN(annualRate) || annualRate < 0) return null;
  if (!termYears || termYears <= 0) return null;

  const principal = price - down;
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = termYears * 12;

  let monthlyPayment;
  if (monthlyRate === 0) {
    monthlyPayment = principal / numPayments;
  } else {
    const factor = Math.pow(1 + monthlyRate, numPayments);
    monthlyPayment = (principal * monthlyRate * factor) / (factor - 1);
  }

  const totalPaid = monthlyPayment * numPayments;
  const totalInterest = totalPaid - principal;

  return {
    principal: Math.round(principal * 100) / 100,
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalPaid: Math.round(totalPaid * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    downPaymentPercent: Math.round((down / price) * 1000) / 10,
  };
}
