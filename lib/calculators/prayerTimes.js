export const CALCULATION_METHODS = [
  { id: 2, label: "Islamic Society of North America (ISNA)" },
  { id: 3, label: "Muslim World League" },
  { id: 1, label: "University of Islamic Sciences, Karachi" },
  { id: 5, label: "Egyptian General Authority of Survey" },
  { id: 4, label: "Umm al-Qura University, Makkah" },
  { id: 8, label: "Gulf Region" },
  { id: 15, label: "Moonsighting Committee Worldwide" },
];

const DISPLAY_ORDER = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

function todayDDMMYYYY() {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

export async function fetchTimingsByCoords(latitude, longitude, method = 2) {
  const url = `https://api.aladhan.com/v1/timings/${todayDDMMYYYY()}?latitude=${latitude}&longitude=${longitude}&method=${method}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch prayer times.");
  const json = await res.json();
  return parseTimingsResponse(json);
}

export async function fetchTimingsByCity(city, country, method = 2) {
  const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(
    city
  )}&country=${encodeURIComponent(country)}&method=${method}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch prayer times.");
  const json = await res.json();
  return parseTimingsResponse(json);
}

function parseTimingsResponse(json) {
  if (!json || json.code !== 200 || !json.data) {
    throw new Error("No prayer time data returned for this location.");
  }
  const rawTimings = json.data.timings;
  const timings = DISPLAY_ORDER.map((name) => ({
    name,
    time: (rawTimings[name] || "").split(" ")[0],
  }));
  return {
    timings,
    date: json.data.date?.readable,
    hijriDate: json.data.date?.hijri
      ? `${json.data.date.hijri.day} ${json.data.date.hijri.month.en} ${json.data.date.hijri.year} AH`
      : null,
    timezone: json.data.meta?.timezone,
  };
}
