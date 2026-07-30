import { work } from '../content.ts'

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-heading">
      <div className="shell">
        <div className="section-head">
          <h2 id="work-heading">{work.heading}</h2>
          <p>{work.intro}</p>
        </div>

        <div className="projects">
          {work.projects.map((project) => (
            <article className="project" key={project.title}>
              <div className="project-top">
                <h3>{project.title}</h3>
                <span className="year">{project.year}</span>
              </div>
              <p className="tagline">{project.tagline}</p>
              <p className="description">{project.description}</p>
              <ul className="tags">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
