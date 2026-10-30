import Reveal from "../components/Reveal";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { projects } from "../data/projects";
import { usePreferences } from "../hooks/usePreferences";
import ProjectCard from "../components/ProjectCard";

const filters = [
  ["all", "All projects"],
  ["research", "Research"],
  ["vision", "Computer vision"],
  ["ml", "Machine learning"],
];

export default function ProjectsPage() {
  const { t, language } = usePreferences();
  const [filter, setFilter] = useState("all");
  const visibleProjects = projects.filter(
    (project) => filter === "all" || project.category === filter,
  );

  return (
    <section className="container project-intro">
      <a className="text-link" href="./index.html">
        <ArrowLeft className="icon" aria-hidden="true" />
        {t("Back to home")}
      </a>
      <p className="eyebrow">{t("PROJECT ARCHIVE / 2024–2026")}</p>
      <h1>{t("Work, in practice.")}</h1>
      <p className="lead">
        {t(
          "A collection of research and applied machine learning projects. Explore the workflows and source code.",
        )}
      </p>
      <div className="filters" role="group" aria-label={t("Filter projects")}>
        {filters.map(([value, label]) => (
          <button
            key={value}
            className={`filter${filter === value ? " active" : ""}`}
            data-filter={value}
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
          >
            {t(label)}
          </button>
        ))}
      </div>
      <p
        id="filter-status"
        className="sr-only"
        role="status"
        aria-live="polite"
      >
        {visibleProjects.length}{" "}
        {language === "id" ? "proyek ditampilkan" : "projects shown"}
      </p>
      <div className="projects-grid">
        {visibleProjects.map((project, index) => (
          <Reveal key={project.id} delay={(index % 2) * 80}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
