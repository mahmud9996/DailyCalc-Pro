export function formatDateISO(date) {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

export function formatDateReadable(date, locale = "en-US") {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatCurrency(value, currency = "USD", locale = "en-US") {
  if (Number.isNaN(value) || value === null || value === undefined) return "";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value, decimals = 2) {
  if (Number.isNaN(value) || value === null || value === undefined) return "";
  return Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

// Safe localStorage read/write — no-op on the server.
export function readLocalStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeLocalStorage(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore quota / privacy-mode errors — history is a nice-to-have.
  }
}

// Encode a plain object of primitive values into a compact URL query string
// so calculator results can be shared via link.
export function encodeStateToQuery(state) {
  const params = new URLSearchParams();
  Object.entries(state).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  });
  return params.toString();
}

export function decodeQueryToState(searchParams, keys) {
  const state = {};
  keys.forEach((key) => {
    const val = searchParams.get(key);
    if (val !== null) state[key] = val;
  });
  return state;
}
