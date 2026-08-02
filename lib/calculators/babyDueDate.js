const msPerDay = 1000 * 60 * 60 * 24;

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function calculateDueDate({ method, date }) {
  const inputDate = new Date(date);
  if (Number.isNaN(inputDate.getTime())) return null;

  let lmp, dueDate;

  if (method === "conception") {
    dueDate = addDays(inputDate, 266);
    lmp = addDays(inputDate, -14);
  } else {
    // Last menstrual period (Naegele's rule): LMP + 280 days
    lmp = inputDate;
    dueDate = addDays(inputDate, 280);
  }

  const today = new Date();
  const gestationDays = Math.floor((today - lmp) / msPerDay);

  let gestationWeeks = null;
  let gestationRemainderDays = null;
  let trimester = null;

  if (gestationDays >= 0 && gestationDays <= 300) {
    gestationWeeks = Math.floor(gestationDays / 7);
    gestationRemainderDays = gestationDays % 7;
    if (gestationWeeks < 13) trimester = 1;
    else if (gestationWeeks < 27) trimester = 2;
    else trimester = 3;
  }

  const daysUntilDue = Math.ceil((dueDate - today) / msPerDay);

  return {
    dueDate: dueDate.toISOString().slice(0, 10),
    lmpDate: lmp.toISOString().slice(0, 10),
    gestationWeeks,
    gestationRemainderDays,
    trimester,
    daysUntilDue,
  };
}
