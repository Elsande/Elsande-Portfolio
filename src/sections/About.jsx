import { about } from "../data/about";
import { ArrowUpRight } from "lucide-react";
import { usePreferences } from "../hooks/usePreferences";

export default function About() {
  const { t, localize } = usePreferences();
  return (
    <section id="about" className="section container about">
      <div>
        <p className="eyebrow">01 / {t("ABOUT")}</p>
        <h2 className="multiline">{localize(about.title)}</h2>
      </div>
      <div className="about-copy">
        <p className="lead">{localize(about.introduction)}</p>
        <p>{localize(about.background)}</p>
        <div className="education">
          <ArrowUpRight
            className="education-mark"
            size={28}
            aria-hidden="true"
          />
          <div>
            <strong>Universitas Negeri Surabaya</strong>
            <p>{t("B.Sc. Informatics Engineering · 2021–2026")}</p>
            <span>{t("Graduated with distinction")} · GPA 3.85 / 4.00</span>
          </div>
        </div>
      </div>
    </section>
  );
}
