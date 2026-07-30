import { about } from '../content.ts'

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading">
      <div className="shell">
        <div className="section-head">
          <h2 id="about-heading">{about.heading}</h2>
        </div>

        <div className="about-grid">
          <div className="about-prose">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <dl className="facts">
            {about.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
