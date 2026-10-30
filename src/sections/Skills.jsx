import { skills } from "../data/skills";
import { usePreferences } from "../hooks/usePreferences";

export default function Skills() {
  const { t } = usePreferences();
  return (
    <section id="skills" className="section container skills">
      <div>
        <p className="eyebrow">04 / {t("TOOLKIT")}</p>
        <h2 className="multiline">{t("Tools behind\nthe work.")}</h2>
        <p>{t("Chosen for the problem at hand.")}</p>
      </div>
      <div className="skill-list">
        {skills.map((skill) => (
          <div className="skill-row" key={skill.title}>
            <h3>{skill.title}</h3>
            <p>{skill.tools}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
