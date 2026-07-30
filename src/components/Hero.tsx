import { hero } from '../content.ts'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="shell">
        <span className="greeting">{hero.greeting}</span>
        <h1>{hero.headline}</h1>
        <p className="subhead">{hero.subhead}</p>

        <div className="hero-actions">
          <a className="btn btn-primary" href={hero.ctaPrimary.href}>
            {hero.ctaPrimary.label}
          </a>
          <a className="btn btn-secondary" href={hero.ctaSecondary.href}>
            {hero.ctaSecondary.label}
          </a>
        </div>
      </div>
    </section>
  )
}
