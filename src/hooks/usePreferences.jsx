import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../data/translations";

const PreferencesContext = createContext(null);

export function readStorage(key, session = false) {
  try {
    return (session ? window.sessionStorage : window.localStorage).getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key, value, session = false) {
  try {
    (session ? window.sessionStorage : window.localStorage).setItem(key, value);
  } catch {
    // Keep preferences usable in memory when browser storage is blocked.
  }
}

export function PreferencesProvider({ children }) {
  const [language, setLanguage] = useState(() =>
    readStorage("portfolio-language") === "id" ? "id" : "en",
  );
  const [theme, setTheme] = useState(() =>
    readStorage("portfolio-theme") === "dark" ? "dark" : "light",
  );

  useEffect(() => {
    document.documentElement.lang = language;
    writeStorage("portfolio-language", language);
  }, [language]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    writeStorage("portfolio-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === "dark" ? "#17211d" : "#f7f7f2";
  }, [theme]);

  const t = (text) => (language === "id" ? (translations[text] ?? text) : text);
  const localize = (text) => text[language];

  return (
    <PreferencesContext.Provider
      value={{ language, setLanguage, theme, setTheme, t, localize }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error("usePreferences requires PreferencesProvider");
  return context;
}
