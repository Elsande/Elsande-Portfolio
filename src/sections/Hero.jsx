import { profile } from "../data/profile";
import { usePreferences } from "../hooks/usePreferences";
import ExternalLink from "../components/ExternalLink";

export default function Hero() {
  const { t } = usePreferences();
  return (
    <section className="container hero">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" />
          {t("AI & DATA PROFESSIONAL")}
        </p>
        <h1>
          {profile.shortName}
          <span>
            Pratama Putra<span className="accent">.</span>
          </span>
        </h1>
        <p className="hero-statement multiline">
          {t("From complex data.\nTo practical solutions.")}
        </p>
        <p className="hero-description">
          {t(
            "I build AI systems and data workflows, from document validation to machine learning. Based in Surabaya, Indonesia.",
          )}
        </p>
        <div className="actions">
          <a className="button primary" href="#projects">
            {t("Explore my work")}
            <span aria-hidden="true">↗</span>
          </a>
          <a className="button secondary" href={profile.cv} download>
            {t("Download CV")}
            <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="hero-socials">
          <ExternalLink href={profile.github}>GitHub</ExternalLink>
          <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
        </div>
      </div>
      <div className="portrait-block">
        <div className="portrait-top">
          <span>{t("THE PERSON BEHIND THE WORK")}</span>
          <span>01 / IE</span>
        </div>
        <img
          src={profile.portrait}
          width="896"
          height="1196"
          alt={t("Portrait of Iffo Elsande Pratama Putra")}
          fetchPriority="high"
        />
        <div className="portrait-caption">
          <span>{profile.shortName}</span>
          <span>Surabaya, ID ↗</span>
        </div>
      </div>
      <div className="hero-bottom">
        <span>{t("Currently · AI Engineer Intern @ Platinum Ceramics")}</span>
        <a href="#about">{t("Scroll to discover ↓")}</a>
      </div>
    </section>
  );
}
