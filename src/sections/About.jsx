import { ArrowUpRight } from "lucide-react";
import { usePreferences } from "../hooks/usePreferences";

export default function About() {
  const { t } = usePreferences();
  return (
    <section id="about" className="section container about">
      <div>
        <p className="eyebrow">01 / {t("ABOUT")}</p>
        <h2 className="multiline">{t("Curiosity backed\nby engineering.")}</h2>
      </div>
      <div className="about-copy">
        <p className="lead">
          {t(
            "I’m an Informatics Engineering graduate from Universitas Negeri Surabaya. My work sits at the intersection of AI, data, and software development.",
          )}
        </p>
        <p>
          {t(
            "At Platinum Ceramics, I work on document validation using OCR and Vision-Language Models. Previously, I worked on freelance machine learning projects and developed web applications at Radnet Digital Indonesia.",
          )}
        </p>
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
