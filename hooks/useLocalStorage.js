"use client";

import { useCallback, useEffect, useState } from "react";
import { readLocalStorage, writeLocalStorage } from "@/lib/utils";

// Generic hook for a piece of state persisted to localStorage.
export function useLocalStorage(key, fallback) {
  const [value, setValue] = useState(fallback);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setValue(readLocalStorage(key, fallback));
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (ready) writeLocalStorage(key, value);
  }, [key, value, ready]);

  return [value, setValue, ready];
}

// Specialized helper for "save history" lists capped at N entries.
export function useHistory(key, max = 10) {
  const [history, setHistory, ready] = useLocalStorage(key, []);

  const addEntry = useCallback(
    (entry) => {
      setHistory((prev) => {
        const next = [{ ...entry, savedAt: new Date().toISOString() }, ...prev];
        return next.slice(0, max);
      });
    },
    [max, setHistory]
  );

  const clearHistory = useCallback(() => setHistory([]), [setHistory]);

  return { history, addEntry, clearHistory, ready };
}
