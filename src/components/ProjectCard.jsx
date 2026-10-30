import { usePreferences } from "../hooks/usePreferences";

export default function ProjectCard({ project }) {
  const { localize, t } = usePreferences();
  return (
    <article className="project" data-category={project.category}>
      <a
        className={`project-visual visual-${project.id}`}
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${localize(project.title)} ${t("on GitHub")}`}
      >
        <span className="visual-top">
          <span>
            {t("PROJECT")} {project.id}
          </span>
          <span aria-hidden="true">↗</span>
        </span>
        <div className="diagram">
          <span>{project.workflow.input}</span>
          <i aria-hidden="true" />
          <strong>{project.workflow.model}</strong>
          <i aria-hidden="true" />
          <span>{project.workflow.output}</span>
        </div>
        <span className="visual-bottom">{t("WORKFLOW OVERVIEW")}</span>
      </a>
      <div className="project-copy">
        <p className="eyebrow">{localize(project.label)}</p>
        <h3>{localize(project.title)}</h3>
        <p>{localize(project.description)}</p>
        <div className="project-stack">{project.stack}</div>
      </div>
    </article>
  );
}
