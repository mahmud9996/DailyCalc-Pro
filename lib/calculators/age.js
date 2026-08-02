function daysInMonth(year, monthIndex) {
  // monthIndex is 0-based; day 0 of next month = last day of this month
  return new Date(year, monthIndex + 1, 0).getDate();
}

export function calculateAge(birthDateStr, targetDateStr) {
  const birth = new Date(birthDateStr);
  const target = targetDateStr ? new Date(targetDateStr) : new Date();

  if (Number.isNaN(birth.getTime())) return null;
  if (birth > target) return { error: "Date of birth is in the future." };

  let years = target.getFullYear() - birth.getFullYear();
  let months = target.getMonth() - birth.getMonth();
  let days = target.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonthIndex = target.getMonth() - 1;
    const year = prevMonthIndex < 0 ? target.getFullYear() - 1 : target.getFullYear();
    const normalizedMonth = (prevMonthIndex + 12) % 12;
    days += daysInMonth(year, normalizedMonth);
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.floor((target - birth) / msPerDay);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = totalDays * 24;

  // Next birthday
  let nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday < target || nextBirthday.toDateString() === target.toDateString()) {
    if (nextBirthday < target) {
      nextBirthday = new Date(target.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
  }
  const daysToNextBirthday = Math.ceil((nextBirthday - target) / msPerDay);

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalMonths,
    totalHours,
    daysToNextBirthday,
    nextBirthdayDate: nextBirthday.toISOString().slice(0, 10),
  };
}

export const DATE_FORMATS = {
  US: "MM/DD/YYYY",
  UK: "DD/MM/YYYY",
  BD: "DD/MM/YYYY",
};
