import ProjectCard from './ProjectCard'

export default function ProjectGrid({ projects }) {
  if (!projects.length) return <div className="empty-state">아직 등록된 프로젝트가 없습니다.</div>
  return <div className="project-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
}
