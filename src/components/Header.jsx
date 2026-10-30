import { Sun, Moon, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePreferences } from "../hooks/usePreferences";

const links = [
  ["about", "About"],
  ["experience", "Experience"],
  ["projects", "Work"],
  ["contact", "Contact"],
];

export default function Header({ archive }) {
  const { language, setLanguage, theme, setTheme, t } = usePreferences();
  const [open, setOpen] = useState(false);
  const header = useRef(null);
  const menuButton = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const onClick = (event) => {
      // The icon can be replaced during the click; the original event path stays stable.
      if (!event.composedPath().includes(header.current)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#main">
        {t("Skip to content")}
      </a>
      <header className="site-header" ref={header}>
        <div className="container nav">
          <a
            className="brand"
            href="./index.html"
            aria-label={t("Iffo Elsande home")}
          >
            ie<span>.</span>
          </a>
          <nav
            id="navigation"
            className={open ? "open" : ""}
            aria-label={t("Main navigation")}
          >
            {links.map(([anchor, label]) => (
              <a
                key={anchor}
                href={`${archive ? "./index.html" : ""}#${anchor}`}
                onClick={() => setOpen(false)}
              >
                {t(label)}
              </a>
            ))}
          </nav>
          <div className="nav-tools">
            <button
              id="lang-toggle"
              aria-label={
                language === "en"
                  ? "Switch to Indonesian"
                  : "Ganti ke bahasa Inggris"
              }
              onClick={() => setLanguage(language === "en" ? "id" : "en")}
            >
              {language.toUpperCase()}{" "}
              <span aria-hidden="true">
                / {language === "en" ? "ID" : "EN"}
              </span>
            </button>
            <button
              id="theme-toggle"
              aria-pressed={theme === "dark"}
              aria-label={t(
                theme === "dark"
                  ? "Switch to light theme"
                  : "Switch to dark theme",
              )}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "dark" ? (
                <Sun className="icon" aria-hidden="true" />
              ) : (
                <Moon className="icon" aria-hidden="true" />
              )}
            </button>
            <button
              id="menu-toggle"
              ref={menuButton}
              aria-label={t(open ? "Close navigation" : "Open navigation")}
              aria-expanded={open}
              aria-controls="navigation"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <X className="icon" aria-hidden="true" />
              ) : (
                <Menu className="icon" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
