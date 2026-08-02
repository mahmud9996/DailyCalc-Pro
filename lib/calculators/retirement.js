function addYears(date, years) {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() + years);
  return d;
}

export function calculateRetirementDate({ birthDate, retirementAge }) {
  const birth = new Date(birthDate);
  const age = parseFloat(retirementAge);

  if (Number.isNaN(birth.getTime()) || !age || age <= 0) return null;

  const retirementDate = addYears(birthDate, age);
  const today = new Date();

  const msPerDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.ceil((retirementDate - today) / msPerDay);

  if (diffDays <= 0) {
    return {
      retirementDate: retirementDate.toISOString().slice(0, 10),
      alreadyReached: true,
    };
  }

  const years = Math.floor(diffDays / 365.25);
  const remainderDays = diffDays - Math.floor(years * 365.25);
  const months = Math.floor(remainderDays / 30.44);
  const days = Math.round(remainderDays - months * 30.44);

  return {
    retirementDate: retirementDate.toISOString().slice(0, 10),
    yearsLeft: years,
    monthsLeft: months,
    daysLeft: days,
    totalDaysLeft: diffDays,
    totalWeeksLeft: Math.floor(diffDays / 7),
    alreadyReached: false,
  };
}

// US Social Security "full retirement age" reference table, by birth year.
export const US_FULL_RETIREMENT_AGE = [
  { birthYearRange: "1943–1954", age: "66" },
  { birthYearRange: "1955", age: "66 and 2 months" },
  { birthYearRange: "1956", age: "66 and 4 months" },
  { birthYearRange: "1957", age: "66 and 6 months" },
  { birthYearRange: "1958", age: "66 and 8 months" },
  { birthYearRange: "1959", age: "66 and 10 months" },
  { birthYearRange: "1960 and later", age: "67" },
];
