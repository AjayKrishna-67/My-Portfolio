import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const listeners = new Set<() => void>();

// The `dark` class on <html> is the source of truth. index.html sets it before
// first paint (saved choice, else the system setting) so there is no flash.
function readTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function setTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Private mode or blocked storage: the choice simply lasts for this visit.
  }
  listeners.forEach((notify) => notify());
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  return () => {
    listeners.delete(notify);
  };
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, readTheme, () => "light");
}
