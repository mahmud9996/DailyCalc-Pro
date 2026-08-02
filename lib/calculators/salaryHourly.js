export function calculateHourlyRate({ annualSalary, hoursPerWeek, weeksPerYear, daysPerWeek }) {
  const salary = parseFloat(annualSalary);
  const hpw = parseFloat(hoursPerWeek) || 40;
  const wpy = parseFloat(weeksPerYear) || 52;
  const dpw = parseFloat(daysPerWeek) || 5;

  if (!salary || salary <= 0 || hpw <= 0 || wpy <= 0) return null;

  const hourly = salary / (hpw * wpy);
  const daily = hourly * (hpw / dpw);
  const weekly = hourly * hpw;
  const monthly = salary / 12;

  return {
    hourly: Math.round(hourly * 100) / 100,
    daily: Math.round(daily * 100) / 100,
    weekly: Math.round(weekly * 100) / 100,
    monthly: Math.round(monthly * 100) / 100,
    annual: Math.round(salary * 100) / 100,
  };
}
