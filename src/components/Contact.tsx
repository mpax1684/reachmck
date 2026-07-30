import { contact } from '../content.ts'

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading">
      <div className="shell">
        <div className="section-head">
          <h2 id="contact-heading">{contact.heading}</h2>
        </div>

        <div className="contact-grid">
          <p className="contact-blurb">{contact.blurb}</p>

          <div className="contact-links">
            {contact.links.map((link) => {
              const external = link.href.startsWith('http')
              return (
                <a
                  className="contact-link"
                  key={link.label}
                  href={link.href}
                  {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                >
                  <span className="label">{link.label}</span>
                  <span className="value">{link.value}</span>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
