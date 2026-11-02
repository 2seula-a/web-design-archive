import { ArrowUpRight, Play } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProjectCard({ project }) {
  return (
    <Link className="project-card" to={`/works/${project.slug}`} aria-label={`${project.title} 프로젝트 상세 보기`}>
      <div className="card-image-wrap">
        <img src={project.image} alt={project.alt} onError={(event) => event.currentTarget.parentElement.classList.add('image-error')} />
        {project.mediaType === 'video' && <span className="card-play-icon" aria-hidden="true"><Play size={17} fill="currentColor" /></span>}
        <span className="image-fallback">Project image<br />coming soon</span>
      </div>
      <div className="card-body">
        <div>
          <h2>{project.title}</h2>
          <p className="project-type">{project.type}</p>
          <p className="project-description">{project.description}</p>
        </div>
        <span className="card-arrow" aria-hidden="true"><ArrowUpRight size={20} /></span>
      </div>
    </Link>
  )
}
