/**
 * All site copy lives here. Edit this file to change the site — the components
 * read from it and need no changes.
 *
 * NOTE: the bio, role, and project blurbs below are drafted from what's visible
 * in this workspace (Mosai, Passport Photo, the Figma design-system scripts).
 * Rewrite them in your own words before the site goes live.
 */

export const site = {
  name: 'Mithun Chandirasegar',
  initials: 'MCK',
  role: 'Product Designer',
  location: 'Melbourne, Australia',
  domain: 'reachmck.com',
}

export const hero = {
  greeting: 'Hello — I’m Mithun.',
  headline: 'I design software for people doing serious work.',
  subhead:
    'Design systems, mobile products, and clinical workflows — built end to end, from the token layer up to the shipped screen.',
  ctaPrimary: { label: 'See selected work', href: '#work' },
  ctaSecondary: { label: 'Get in touch', href: '#contact' },
}

export const about = {
  heading: 'About',
  paragraphs: [
    'I’m a product designer focused on complex, high-stakes interfaces — the kind where a misplaced button costs someone an hour, or worse. Most of my work sits at the seam between a design system and the product teams consuming it.',
    'Lately that’s meant building a component library and token pipeline in Figma, prototyping referral workflows for clinicians, and shipping a React Native app end to end. I write enough code to prototype my own ideas and to keep design and engineering speaking the same language.',
  ],
  facts: [
    { label: 'Focus', value: 'Design systems · Mobile · Health tech' },
    { label: 'Tools', value: 'Figma · React · TypeScript · Expo' },
    { label: 'Based in', value: site.location },
  ],
}

export type Project = {
  title: string
  tagline: string
  description: string
  tags: string[]
  year: string
  href?: string
}

export const work: { heading: string; intro: string; projects: Project[] } = {
  heading: 'Selected work',
  intro: 'A few things I’ve designed and built recently.',
  projects: [
    {
      title: 'Mosai Referral Vision',
      tagline: 'Rethinking how clinicians send and track referrals',
      description:
        'An interactive vision prototype for a clinical referral workflow — covering triage, status tracking, and handover. Built as a clickable React prototype so the concept could be tested with real clinicians instead of described in a deck.',
      tags: ['Product design', 'Prototyping', 'Health tech'],
      year: '2026',
    },
    {
      title: 'Mosai Mobile',
      tagline: 'A practice companion app, designed and shipped',
      description:
        'Mobile app design and front-end build in Expo and React Native Paper, sharing a token layer with the wider Mosai design system so brand changes propagate without a redesign.',
      tags: ['Mobile', 'React Native', 'Design systems'],
      year: '2026',
    },
    {
      title: 'Mosai UIKit',
      tagline: 'The component library everything else is built on',
      description:
        'A Figma-based design system with audited colour primitives, foundation-level remediation scripts, and a variable pipeline that keeps design tokens and code in sync.',
      tags: ['Design systems', 'Figma', 'Tokens'],
      year: '2025—2026',
    },
    {
      title: 'Passport Photo',
      tagline: 'Compliant photos without the trip to the post office',
      description:
        'A small utility that crops and validates passport photographs against official dimension specs — a self-contained side project, designed and built solo.',
      tags: ['Side project', 'Utility'],
      year: '2025',
    },
  ],
}

export const contact = {
  heading: 'Get in touch',
  blurb:
    'Open to design work, collaborations, and the occasional interesting problem. The fastest way to reach me is email.',
  links: [
    { label: 'Email', value: 'mchandirasegar@gmail.com', href: 'mailto:mchandirasegar@gmail.com' },
    // TODO: replace the two below with your real profile URLs, or delete them.
    { label: 'LinkedIn', value: '/in/your-handle', href: 'https://www.linkedin.com/in/your-handle' },
    { label: 'GitHub', value: '@your-handle', href: 'https://github.com/your-handle' },
  ],
}

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]
