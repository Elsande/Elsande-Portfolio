import { ArrowUpRight, Copy, Check, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "../data/profile";
import { usePreferences } from "../hooks/usePreferences";
import ExternalLink from "../components/ExternalLink";

export default function Contact() {
  const { language, t } = usePreferences();
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    setFeedback(null);
  }, [language]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setFeedback({ language, message: "Email address copied." });
    } catch {
      setFeedback({
        language,
        message: "Please copy the email address above manually.",
      });
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <p className="eyebrow">05 / {t("GET IN TOUCH")}</p>
        <div className="contact-layout">
          <div>
            <h2 className="multiline">{t("Have something\nin mind?")}</h2>
            <p>
              {t(
                "Open to conversations about AI, data, and opportunities to build useful things together.",
              )}
            </p>
          </div>
          <div className="contact-right">
            <a className="email-link" href={`mailto:${profile.email}`}>
              {profile.email}
              <ArrowUpRight className="icon" aria-hidden="true" />
            </a>
            <div className="contact-socials">
              <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
              <ExternalLink href={profile.github}>GitHub</ExternalLink>
              <button className="text-link" id="copy-email" onClick={copyEmail}>
                {feedback?.language === language &&
                feedback.message === "Email address copied." ? (
                  <Check className="icon" aria-hidden="true" />
                ) : (
                  <Copy className="icon" aria-hidden="true" />
                )}
                {t("Copy email")}
              </button>
            </div>
            <p id="copy-status" role="status" aria-live="polite">
              {feedback?.language === language ? t(feedback.message) : ""}
            </p>
            <span className="location inline-icon">
              <MapPin className="icon" aria-hidden="true" />
              {profile.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
