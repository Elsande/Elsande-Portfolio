import { usePreferences } from "../hooks/usePreferences";
import { profile } from "../data/profile";

export default function Footer() {
  const { t } = usePreferences();
  return (
    <footer className="container footer">
      <a
        className="brand"
        href="./index.html"
        aria-label={t("Iffo Elsande home")}
      >
        ie<span>.</span>
      </a>
      <span>
        © {new Date().getFullYear()} {profile.name}
      </span>
      <a href="#main">{t("Back to top ↑")}</a>
    </footer>
  );
}
