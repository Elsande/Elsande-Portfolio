import { ArrowUpRight, Download, ArrowDown, MapPin } from "lucide-react";
import { profile } from "../data/profile";
import { usePreferences } from "../hooks/usePreferences";
import ExternalLink from "../components/ExternalLink";

export default function Hero() {
  const { t } = usePreferences();
  return (
    <section className="container hero">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="tiny-cross" aria-hidden="true">
            +
          </span>
          <span className="status-dot" aria-hidden="true" />
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
            "I build AI and data solutions through machine learning, analytics, and software development. Based in Surabaya, Indonesia.",
          )}
        </p>
        <div className="actions">
          <a className="button primary" href="#projects">
            {t("Explore my work")}
            <ArrowUpRight className="icon" aria-hidden="true" />
          </a>
          <a className="button secondary" href={profile.cv} download>
            {t("Download CV")}
            <Download className="icon" aria-hidden="true" />
          </a>
        </div>
        <div className="hero-socials">
          <ExternalLink href={profile.github}>GitHub</ExternalLink>
          <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
        </div>
      </div>
      <div className="portrait-block">
        <div className="portrait-top">
          <span className="panel-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>{t("THE PERSON BEHIND THE WORK")}</span>
          <span>01 / IE</span>
        </div>
        <div className="portrait-image-wrapper">
          <img
            src={profile.portrait}
            width="896"
            height="1196"
            alt={t("Portrait of Iffo Elsande Pratama Putra")}
            fetchPriority="high"
          />
        </div>
        <div className="portrait-caption">
          <span>{profile.shortName}</span>
          <span className="inline-icon">
            <MapPin className="icon" aria-hidden="true" />
            Surabaya, ID
          </span>
        </div>
      </div>
      <div className="hero-bottom">
        <span>{t("Currently · AI Engineer Intern @ Platinum Ceramics")}</span>
        <a className="inline-icon" href="#about">
          {t("Scroll to discover")}
          <ArrowDown className="icon" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
