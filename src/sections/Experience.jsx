import { experience } from "../data/experience";
import { usePreferences } from "../hooks/usePreferences";

export default function Experience() {
  const { t, localize } = usePreferences();
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / {t("EXPERIENCE")}</p>
            <h2>{t("Learning. Building. Applying.")}</h2>
          </div>
          <p className="multiline">
            {t("Hands-on work, from research\nto real business workflows.")}
          </p>
        </div>
        <div className="timeline">
          {experience.map((role) => (
            <article className="role" key={role.company}>
              <p className="role-date">{localize(role.date)}</p>
              <div>
                <h3>{role.title}</h3>
                <p className="company">{role.company}</p>
                <p>{localize(role.description)}</p>
                <p className="role-stack">{role.stack}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
