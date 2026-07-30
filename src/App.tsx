import Header from './components/Header.tsx'
import Hero from './components/Hero.tsx'
import Work from './components/Work.tsx'
import About from './components/About.tsx'
import Contact from './components/Contact.tsx'
import { site } from './content.ts'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>

      <footer className="footer">
        <div className="shell footer-inner">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span className="domain">{site.domain}</span>
        </div>
      </footer>
    </>
  )
}
