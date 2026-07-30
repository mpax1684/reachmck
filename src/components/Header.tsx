import { useEffect, useState } from 'react'
import { nav, site } from '../content.ts'
import ThemeToggle from './ThemeToggle.tsx'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="header" data-scrolled={scrolled}>
      <div className="shell header-inner">
        <a className="wordmark" href="#top">
          <span className="mark" aria-hidden="true">
            {site.initials}
          </span>
          <span className="full-name">{site.name}</span>
        </a>

        <nav className="nav" aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href} data-optional={item.label === 'About'}>
              {item.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
