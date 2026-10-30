import Reveal from "../components/Reveal";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";
import { usePreferences } from "../hooks/usePreferences";
import ProjectCard from "../components/ProjectCard";

export default function SelectedWork() {
  const { t } = usePreferences();
  return (
    <section id="projects" className="section container">
      <div className="section-heading">
        <div>
          <p className="eyebrow">03 / {t("SELECTED WORK")}</p>
          <h2>{t("A few things I’ve built.")}</h2>
        </div>
        <a className="text-link" href="./projects.html">
          {t("All projects")}
          <ArrowUpRight className="icon" aria-hidden="true" />
        </a>
      </div>
      <div className="projects-grid">
        {projects.slice(0, 2).map((project, index) => (
          <Reveal key={project.id} delay={index * 80}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
