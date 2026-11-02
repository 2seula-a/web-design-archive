import { useState } from 'react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { projects } from '../data/projects'

const Pending = () => <p className="pending-copy">프로젝트 정보를 추후 입력할 예정입니다.</p>

export default function ProjectDetail() {
  const { slug } = useParams()
  const [videoError, setVideoError] = useState(false)
  const project = projects.find((item) => item.slug === slug)
  if (!project) return <section className="content-page"><h1>Project not found</h1><Link className="back-link" to="/"><ArrowLeft size={17} /> 프로젝트 목록으로</Link></section>

  return (
    <article className="detail-page page-enter">
      <Link className="back-link" to="/"><ArrowLeft size={17} /> 프로젝트 목록으로</Link>
      <header className="detail-hero">
        <p className="eyebrow">{project.categories.join(' · ')}</p>
        <h1>{project.title}</h1>
        {project.mediaType === 'video' && <p className="project-detail-type">{project.type}</p>}
        <p>{project.description}</p>
      </header>
      {project.mediaType === 'video' ? (
        <>
          <section className="video-player-section" aria-label={`${project.title} 영상`}>
            <video
              className="video-player"
              controls
              preload="metadata"
              poster={project.image}
              style={{ aspectRatio: project.videoAspectRatio }}
              onError={() => setVideoError(true)}
            >
              <source src={project.videoUrl} type="video/mp4" />
              브라우저가 HTML5 비디오를 지원하지 않습니다.
            </video>
            {videoError && <p className="video-error" role="status">영상을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p>}
          </section>
          <div className="detail-info-grid">
            <section><span>01</span><h2>프로젝트 소개</h2><p>{project.description}</p></section>
            <section><span>02</span><h2>제작 콘셉트</h2>{project.concept ? <p>{project.concept}</p> : <Pending />}</section>
            <section><span>03</span><h2>사용 도구</h2>{project.tools.length ? <p>{project.tools.join(', ')}</p> : <Pending />}</section>
            <section><span>04</span><h2>제작 정보</h2>{project.productionInfo ? <p>{project.productionInfo}</p> : <Pending />}</section>
          </div>
          <div className="detail-actions video-detail-actions">
            <Link className="text-link" to="/"><ArrowLeft size={17} /> 프로젝트 목록으로 돌아가기</Link>
          </div>
        </>
      ) : (
        <>
          <div className="detail-visual"><img src={project.image} alt={project.alt} /></div>
          <div className="detail-info-grid">
            <section><span>01</span><h2>프로젝트 소개</h2>{project.introduction ? <p>{project.introduction}</p> : <Pending />}</section>
            <section><span>02</span><h2>디자인 콘셉트</h2>{project.concept ? <p>{project.concept}</p> : <Pending />}</section>
            <section><span>03</span><h2>사용 툴</h2>{project.tools.length ? <p>{project.tools.join(', ')}</p> : <Pending />}</section>
            <section><span>04</span><h2>메인 컬러</h2>{project.colors.length ? <div className="swatches">{project.colors.map((color) => <span key={color} style={{ backgroundColor: color }} title={color} />)}</div> : <Pending />}</section>
          </div>
          <section className="full-design"><p className="eyebrow">FULL DESIGN</p><h2>Web Design Preview</h2><img src={project.fullImage} alt={`${project.title} 웹디자인 시안`} /></section>
          <div className="detail-actions">
            {project.websiteUrl ? <a className="primary-button" href={project.websiteUrl} target="_blank" rel="noreferrer">실제 웹사이트 방문 <ArrowUpRight size={18} /></a> : <span className="disabled-button">웹사이트 링크 추후 입력</span>}
            <Link className="text-link" to="/"><ArrowLeft size={17} /> 프로젝트 목록으로 돌아가기</Link>
          </div>
        </>
      )}
    </article>
  )
}
