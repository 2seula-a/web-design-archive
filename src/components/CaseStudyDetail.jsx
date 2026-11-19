import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import ImageLightbox from "./ImageLightbox";

const SectionHeading = ({ number, title, children }) => (
  <header className="case-section-heading">
    <span>{number}</span>
    <div>
      <p>{title}</p>
      {children}
    </div>
  </header>
);

export default function CaseStudyDetail({ project }) {
  const { caseStudy } = project;
  const backgroundItems = caseStudy.problems ?? caseStudy.backgroundItems ?? [];
  const solutionImage = (solution) =>
    solution.image ?? (caseStudy.useProjectImageForSolutions ? project.fullImage : null);

  return (
    <>
      <section className="case-section case-overview">
        <SectionHeading number="01" title="PROJECT OVERVIEW">
          <h2>프로젝트 소개</h2>
        </SectionHeading>
        <div className="case-overview-grid">
          <div className="case-overview-copy">
            <p className="case-kicker">{caseStudy.projectName}</p>
            <h3>{caseStudy.objective}</h3>
            <p>{project.introduction}</p>
          </div>
          <dl className="case-meta">
            <div><dt>프로젝트 유형</dt><dd>{caseStudy.projectType}</dd></div>
            <div><dt>제작 기간</dt><dd>{project.period}</dd></div>
            <div><dt>담당 역할</dt><dd>{caseStudy.role}</dd></div>
            <div><dt>사용 기술</dt><dd>{project.tools.join(", ")}</dd></div>
          </dl>
        </div>
      </section>

      <section className="case-section">
        <SectionHeading number="02" title={caseStudy.backgroundTitle ?? "BACKGROUND & PROBLEM"}>
          <h2>{caseStudy.backgroundHeading ?? "제작 배경 및 문제 정의"}</h2>
        </SectionHeading>
        <div className="case-problem-layout">
          <div>
            <p className="case-lead">{caseStudy.background}</p>
            {caseStudy.hypothesisNote && <p className="case-note">{caseStudy.hypothesisNote}</p>}
          </div>
          <ol className="case-problem-list">
            {backgroundItems.map((item, index) => (
              <li key={item}><span>0{index + 1}</span><p>{item}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="case-section">
        <SectionHeading number="03" title={caseStudy.strategyTitle ?? "PROJECT GOAL"}>
          <h2>{caseStudy.strategyHeading ?? "프로젝트 목표"}</h2>
        </SectionHeading>
        <div className="case-goal-grid">
          {caseStudy.goals.map((goal, index) => (
            <article key={goal.title}>
              <span>0{index + 1}</span>
              <h3>{goal.title}</h3>
              <p>{goal.description}</p>
            </article>
          ))}
        </div>
        {caseStudy.goalNote && <p className="case-note case-goal-note">{caseStudy.goalNote}</p>}
      </section>

      <section className="case-section">
        <SectionHeading number="04" title={caseStudy.solutionTitle ?? "DESIGN SOLUTION"}>
          <h2>{caseStudy.solutionHeading ?? "문제 해결을 위한 설계"}</h2>
        </SectionHeading>
        <div className="case-solutions">
          {caseStudy.solutions.map((solution, index) => (
            <article className={`case-solution${solutionImage(solution) ? "" : " case-solution--text-only"}`} key={solution.title}>
              {solutionImage(solution) && (
                <div className="case-solution-image">
                  <ImageLightbox
                    src={solutionImage(solution)}
                    alt={solution.imageAlt}
                    loading="lazy"
                    style={solution.imagePosition ? { objectPosition: solution.imagePosition } : undefined}
                  />
                </div>
              )}
              <div className="case-solution-copy">
                <p className="case-kicker">SOLUTION 0{index + 1}{solution.contribution ? ` · ${solution.contribution}` : ""}</p>
                <h3>{solution.title}</h3>
                <dl>
                  {solution.problem && <div><dt>{solution.problemLabel ?? "USER PROBLEM"}</dt><dd>{solution.problem}</dd></div>}
                  {solution.approach && <div><dt>{solution.approachLabel ?? "DESIGN & FUNCTION"}</dt><dd>{solution.approach}</dd></div>}
                  {solution.expectation && <div><dt>{solution.expectationLabel ?? "EXPECTED BENEFIT"}</dt><dd>{solution.expectation}</dd></div>}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="case-section">
        <SectionHeading number="05" title="DESIGN SYSTEM">
          <h2>디자인 콘셉트</h2>
        </SectionHeading>
        <div className="case-system-grid">
          <div className="case-palette">
            <p className="case-kicker">COLOR PALETTE</p>
            <div className="case-color-list">
              {project.colors.map((color) => (
                <div key={color}><span style={{ backgroundColor: color }} /><code>{color}</code></div>
              ))}
            </div>
            <p>{caseStudy.designSystem.direction}</p>
          </div>
          <div className="case-system-details">
            <article><p className="case-kicker">TYPOGRAPHY</p><p>{caseStudy.designSystem.typography}</p></article>
            <article><p className="case-kicker">UI ELEMENTS</p><p>{caseStudy.designSystem.ui}</p></article>
            <article><p className="case-kicker">RESPONSIVE</p><p>{caseStudy.designSystem.responsive}</p></article>
          </div>
        </div>
      </section>

      <section className="case-section">
        <SectionHeading number="06" title="OUTCOME & REFLECTION">
          <h2>구현 결과 및 회고</h2>
        </SectionHeading>
        <div className="case-result-grid">
          <div><h3>구현 결과</h3><ul>{caseStudy.outcomes.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><h3>회고</h3><ul>{caseStudy.reflections.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </div>
      </section>

      <section className="case-section case-links">
        <SectionHeading number="07" title="PROJECT LINKS">
          <h2>프로젝트 확인</h2>
        </SectionHeading>
        <div className="case-link-row">
          <p>{caseStudy.linkDescription ?? "실제 구현된 반응형 웹사이트를 확인할 수 있습니다."}</p>
          <div className="project-action-links">
            {project.websiteUrl && <a className="primary-button" href={project.websiteUrl} target="_blank" rel="noopener noreferrer">{caseStudy.websiteLabel ?? "실제 웹사이트 방문"} <ArrowUpRight size={18} /></a>}
            {project.previewUrl && <a className="primary-button" href={project.previewUrl} target="_blank" rel="noopener noreferrer">{caseStudy.previewLabel ?? "프로젝트 미리보기"} <ArrowUpRight size={18} /></a>}
            {project.figmaUrl && <a className="figma-button" href={project.figmaUrl} target="_blank" rel="noopener noreferrer">{caseStudy.resourceLabel ?? "관련 자료 보기"} <ArrowUpRight size={18} /></a>}
          </div>
        </div>
      </section>

      <div className="detail-actions case-detail-actions">
        <Link className="text-link" to="/"><ArrowLeft size={17} /> 프로젝트 목록으로 돌아가기</Link>
      </div>
    </>
  );
}
