import { useState, useEffect, useCallback } from "react";

const THEME_EVENT = "app-theme-change";

function readTheme() {
  return document.documentElement.getAttribute("data-theme") || "dark";
}

export function useTheme() {
  const [theme, setThemeState] = useState(readTheme);

  useEffect(() => {
    const handler = () => setThemeState(readTheme());
    window.addEventListener(THEME_EVENT, handler);
    return () => window.removeEventListener(THEME_EVENT, handler);
  }, []);

  const setTheme = useCallback((next) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      // localStorage unavailable (private browsing, etc.) — theme just won't persist
    }
    window.dispatchEvent(new CustomEvent(THEME_EVENT));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(readTheme() === "dark" ? "light" : "dark");
  }, [setTheme]);

  return [theme, toggleTheme];
}

export default useTheme;
