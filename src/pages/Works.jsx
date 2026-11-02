import { useSearchParams } from 'react-router-dom'
import ProjectGrid from '../components/ProjectGrid'
import { categoryNames, projects } from '../data/projects'

export default function Works() {
  const [searchParams] = useSearchParams()
  const requested = searchParams.get('category') || 'All Works'
  const active = categoryNames.includes(requested) ? requested : 'All Works'
  const filtered = active === 'All Works' ? projects : projects.filter((project) => project.categories.includes(active))

  return (
    <section className="works-page page-enter">
      <header className="works-header">
        <div>
          <p className="eyebrow">CREATIVE PORTFOLIO · 2026</p>
          <h1>Selected Works</h1>
          <p>A collection of web design, visual storytelling, and creative projects.</p>
        </div>
        <div className="header-note" aria-hidden="true">
          <em>Designing<br />with purpose</em>
          <span />
          <small>DESIGN · MOTION<br />· STORY</small>
        </div>
      </header>
      <ProjectGrid projects={filtered} />
    </section>
  )
}
