const COMMON_PASSWORDS = new Set([
  "password", "123456", "123456789", "qwerty", "111111", "12345678",
  "abc123", "password1", "iloveyou", "admin", "letmein", "welcome",
  "monkey", "dragon", "football", "1q2w3e4r", "sunshine", "master",
  "123123", "qwerty123",
]);

function hasSequential(str) {
  const lower = str.toLowerCase();
  const sequences = ["abcdefghijklmnopqrstuvwxyz", "0123456789", "qwertyuiop", "asdfghjkl", "zxcvbnm"];
  for (const seq of sequences) {
    for (let i = 0; i <= seq.length - 3; i++) {
      const chunk = seq.slice(i, i + 3);
      if (lower.includes(chunk) || lower.includes([...chunk].reverse().join(""))) {
        return true;
      }
    }
  }
  return false;
}

function hasRepeats(str) {
  return /(.)\1\1/.test(str);
}

export function analyzePassword(password) {
  if (!password) return null;

  const length = password.length;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);

  let poolSize = 0;
  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasDigit) poolSize += 10;
  if (hasSymbol) poolSize += 32;
  if (poolSize === 0) poolSize = 1;

  let entropy = length * Math.log2(poolSize);

  const isCommon = COMMON_PASSWORDS.has(password.toLowerCase());
  const sequential = hasSequential(password);
  const repeated = hasRepeats(password);

  // Penalize predictable patterns — they reduce real-world guess resistance
  // far more than raw entropy suggests.
  if (isCommon) entropy = Math.min(entropy, 10);
  if (sequential) entropy *= 0.6;
  if (repeated) entropy *= 0.8;

  let label, color, score;
  if (entropy < 28) {
    label = "Very Weak"; color = "#EF4444"; score = 1;
  } else if (entropy < 36) {
    label = "Weak"; color = "#F59E0B"; score = 2;
  } else if (entropy < 60) {
    label = "Fair"; color = "#EAB308"; score = 3;
  } else if (entropy < 90) {
    label = "Strong"; color = "#7ED321"; score = 4;
  } else {
    label = "Very Strong"; color = "#22C55E"; score = 5;
  }

  // Estimate offline fast-hash crack time at 10 billion guesses/sec, average case.
  const guesses = Math.pow(2, entropy) / 2;
  const seconds = guesses / 1e10;
  const crackTime = formatDuration(seconds);

  const suggestions = [];
  if (length < 12) suggestions.push("Use at least 12 characters.");
  if (!hasUpper) suggestions.push("Add uppercase letters.");
  if (!hasLower) suggestions.push("Add lowercase letters.");
  if (!hasDigit) suggestions.push("Add numbers.");
  if (!hasSymbol) suggestions.push("Add symbols (e.g. !, @, #, $).");
  if (isCommon) suggestions.push("Avoid common, easily-guessed passwords.");
  if (sequential) suggestions.push("Avoid sequential patterns like 'abc' or '123'.");
  if (repeated) suggestions.push("Avoid repeating the same character 3+ times.");
  if (suggestions.length === 0) suggestions.push("Great! This password follows strong security practices.");

  return {
    length,
    entropy: Math.round(entropy * 10) / 10,
    label,
    color,
    score,
    crackTime,
    hasLower,
    hasUpper,
    hasDigit,
    hasSymbol,
    isCommon,
    sequential,
    repeated,
    suggestions,
  };
}

function formatDuration(seconds) {
  if (seconds < 1) return "instantly";
  const units = [
    ["century", 60 * 60 * 24 * 365.25 * 100],
    ["year", 60 * 60 * 24 * 365.25],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
    ["second", 1],
  ];
  for (const [name, unitSeconds] of units) {
    const value = seconds / unitSeconds;
    if (value >= 1) {
      const rounded = Math.round(value);
      return `${rounded.toLocaleString()} ${name}${rounded === 1 ? "" : "s"}`;
    }
  }
  return "instantly";
}
