
import { useSearchParams } from "react-router-dom";
import ProjectGrid from "../components/ProjectGrid";
import { categoryNames, projects } from "../data/projects";

// 카테고리별 제목과 설명
const categoryContent = {
  "All Works": {
    title: "Selected Works",
    description:
      "A collection of web design, visual storytelling, and creative projects.",
  },
  Personal: {
    title: "Personal Projects",
    description:
      "Independent projects exploring design and creativity.",
  },
  Redesign: {
    title: "Redesign Works",
    description:
      "Reimagining existing content through a fresh perspective.",
  },
  Video: {
    title: "Motion & Film",
    description:
      "Creative storytelling through AI-generated visuals and motion.",
  },
  "E-Commerce": {
    title: "E-Commerce",
    description:
      "Digital shopping experiences with thoughtful design.",
  },
  Brand: {
    title: "Brand Experience",
    description:
      "Expressing brand identity through visual design.",
  },
  Corporate: {
    title: "Corporate Websites",
    description:
      "Clear and accessible digital experiences for organizations.",
  },
  "Landing Page": {
    title: "Landing Pages",
    description:
      "Focused web experiences that communicate a clear message.",
  },
};

export default function Works() {
  const [searchParams] = useSearchParams();
  const requested = searchParams.get("category") || "All Works";
  const active = categoryNames.includes(requested) ? requested : "All Works";

  const filtered =
    active === "All Works"
      ? projects
      : projects.filter((project) => project.categories.includes(active));

  const content = categoryContent[active] || categoryContent["All Works"];

  return (
    <section className="works-page page-enter">
      <header className="works-header">
        <div>
          <p className="eyebrow">CREATIVE PORTFOLIO · 2026</p>
          <h1>{content.title}</h1>
          <p>{content.description}</p>
        </div>
      </header>

      <ProjectGrid projects={filtered} />
    </section>
  );
}
