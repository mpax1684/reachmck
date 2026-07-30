# reachmck.com

Personal site / portfolio for Mithun Chandirasegar. Vite + React + TypeScript,
static build, no backend.

## Running it

```bash
npm --prefix reachmck run dev
```

Dev server: http://localhost:5175 (also registered in `.claude/launch.json` as
`reachmck`, so `preview_start` picks it up).

| Command           | What it does                            |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Dev server with HMR on port 5175        |
| `npm run build`   | Typecheck + production build to `dist/` |
| `npm run preview` | Serve the built `dist/` locally         |
| `npm run typecheck` | Types only, no build                  |

## Editing the content

**All copy lives in [`src/content.ts`](src/content.ts).** Hero, projects, about,
contact links, nav — change it there and the components follow. You shouldn't
need to touch the components to change what the site says.

Still placeholder, replace before launch:

- `contact.links` — the LinkedIn and GitHub handles are `your-handle` stubs.
- `about.paragraphs` and the project blurbs — drafted from what's in this
  workspace, not from anything you wrote. Rewrite in your own voice.
- `site.location` — assumed Melbourne.

Structural things live elsewhere:

- Page title, meta description, and Open Graph tags: `index.html`
- Colours, type, spacing: the CSS custom properties at the top of `src/styles.css`
- Favicon: `public/favicon.svg`

## Theming

Light and dark, following the OS by default and overridable with the header
toggle (persisted to `localStorage`). An inline script in `index.html` sets
`data-theme` before first paint so there's no flash of the wrong theme.

## Deploying

Target is **Cloudflare Pages**, built from git — push to `main` and Cloudflare
rebuilds. Config in the repo:

| File               | Does what                                                        |
| ------------------ | ---------------------------------------------------------------- |
| `wrangler.toml`    | Project name and `dist` as the build output                       |
| `public/_headers`  | Security headers (CSP et al.) and cache policy                    |
| `public/_redirects`| `www` → apex redirect (inert until the domain exists)             |
| `.nvmrc`           | Pins Node 22 for the build — Vite 7 needs ≥20.19                  |

`public/` is copied verbatim into `dist/`, so `_headers` and `_redirects` land
where Cloudflare expects them.

### Before you can connect git

This folder is its own git repository, with one commit on `main` and no remote
yet. Note that it's *nested* inside an unrelated repo rooted at
`/Users/mithunchandirasegar` whose `origin` is `github.com/mpax1684/Paxton.git` —
your whole home directory. The two don't interact, but don't push this site
there.

Create an empty GitHub repo (no README, no .gitignore — this one already has
both), then:

```bash
cd "/Users/mithunchandirasegar/Documents/Claude Projects/reachmck" && git remote add origin git@github.com:mpax1684/reachmck.git && git push -u origin main
```

### Connecting Cloudflare

In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to
Git**, pick the repo, and confirm the build settings (it should read most of
these from `wrangler.toml`):

- Build command: `npm run build`
- Output directory: `dist`
- Root directory: leave blank if the repo root is this folder

First deploy lands on `reachmck.pages.dev`. The custom domain comes later — see
below.

### The CSP is strict, and that has one consequence

`public/_headers` sets `script-src 'self'` with **no** `'unsafe-inline'`. That's
why the theme bootstrap lives in `public/theme-init.js` instead of an inline
`<script>` in `index.html`. If you inline a script, add a third-party embed
(analytics, fonts, an iframe), or start using inline `style=` attributes, the
browser will silently block it until you widen the matching directive. Check the
console before assuming the code is wrong.

## Pointing the domain at it

**reachmck.com is not registered yet** — that has to happen first, and it needs a
payment method, so it's a manual step. Porkbun and Cloudflare Registrar are the
usual cheap, no-upsell options; Cloudflare sells at cost but requires the domain
to be registrable there.

Once you own it, attaching it to Pages depends on where DNS lives:

**If the domain is on Cloudflare** (bought through Cloudflare Registrar, or
nameservers moved there) — Pages project → **Custom domains** → add
`reachmck.com`, then add `www.reachmck.com` as a second custom domain. Cloudflare
writes the DNS records itself. Nothing to copy by hand.

**If DNS stays at another registrar** — add what the Custom domains screen shows
you, which will look like:

| Type    | Name  | Value                            |
| ------- | ----- | -------------------------------- |
| `CNAME` | `@`   | `reachmck.pages.dev`             |
| `CNAME` | `www` | `reachmck.pages.dev`             |

Use the exact values from the dashboard, not these. A registrar that won't take a
`CNAME` at the apex may offer `ALIAS`/`ANAME` instead; if it offers neither,
moving nameservers to Cloudflare is the easier path.

Both hostnames must be added to the Pages project for the `www` → apex rule in
`public/_redirects` to fire — Cloudflare has to be serving `www` before it can
redirect it.

Then:

- TLS is automatic once DNS resolves; allow a few minutes.
- `index.html`'s `<link rel="canonical">`, `public/sitemap.xml`, and
  `public/_redirects` all assume the bare apex is canonical. Change all three
  together if you'd rather have `www`.
