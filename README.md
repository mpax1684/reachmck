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

Target is **Cloudflare Workers with static assets**, built from git — push to
`main` and Cloudflare rebuilds. There's no server-side code; the Worker exists
only to serve `dist/`.

> Originally set up for Cloudflare **Pages**. Cloudflare's dashboard now routes
> new projects through the Workers flow, whose deploy command is
> `npx wrangler deploy` — and that rejects a Pages-style config
> (`pages_build_output_dir`). Hence `[assets]`. `_headers` and `_redirects`
> behave identically under both.

| File               | Does what                                                        |
| ------------------ | ---------------------------------------------------------------- |
| `wrangler.toml`    | Worker name and `./dist` as the static asset directory            |
| `public/_headers`  | Security headers (CSP et al.) and cache policy                    |
| `.nvmrc`           | Pins Node 22 for the build — Vite 7 needs ≥20.19                  |

There is deliberately **no `_redirects` file**. Under Workers static assets
`_redirects` accepts only relative paths — an absolute URL fails the deploy with
`Invalid _redirects configuration … Only relative URLs are allowed [code: 100324]`.
Cloudflare Pages allowed absolute URLs; Workers does not. The `www` → apex
redirect therefore lives in a zone-level Redirect Rule instead (see below).

`public/` is copied verbatim into `dist/`, so `_headers` and `_redirects` land
where Cloudflare expects them.

Validate the config without deploying:

```bash
npm run build && npx wrangler deploy --dry-run
```

### Before you can connect git

This folder is its own git repository, with one commit on `main` and no remote
yet. Note that it's *nested* inside an unrelated repo rooted at
`/Users/mithunchandirasegar` whose `origin` is `github.com/mpax1684/Paxton.git` —
your whole home directory. The two don't interact, but don't push this site
there.

Pushed to `https://github.com/mpax1684/reachmck` (public), branch `main`.

Auth on this machine goes through `gh` as git's HTTPS credential helper. There
are no SSH keys here, so use HTTPS remotes — if pushes start failing with
"could not read Username", check `gh auth status` and that
`gh config get git_protocol` returns `https`.

### Connecting Cloudflare

**Workers & Pages → Create → Connect to Git**, pick the repo, then:

- Project name: `reachmck`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

First deploy lands on `reachmck.<account>.workers.dev`. The custom domain comes
later — see below.

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

**The domain is currently at GoDaddy** (nameservers `ns15`/`ns16.domaincontrol.com`),
and **GoDaddy DNS cannot serve the apex.** It supports neither a `CNAME` at `@` nor
`ALIAS`/`ANAME`, so `reachmck.com` can't be pointed at `reachmck.pages.dev` while
DNS lives there. Two ways out:

*Move nameservers to Cloudflare (recommended).* Add the domain as a site in
Cloudflare, take the two assigned nameservers, and replace GoDaddy's under
**Domain settings → Nameservers → Change**. Apex then works via CNAME flattening,
and Pages writes its own records. Propagation is usually under an hour. Safe here
because the domain is freshly registered — nothing else depends on its DNS.

*Or keep GoDaddy and make `www` canonical.* Add `CNAME www → reachmck.pages.dev`,
then use GoDaddy's domain forwarding to send the apex to `https://www.reachmck.com`.
This works, but the forward is an HTTP redirect rather than real DNS, and you'd
need to flip the canonical host in `index.html`, `public/sitemap.xml`, and
`public/_redirects` to match.

### The www → apex redirect

Because `_redirects` can't do cross-hostname redirects under Workers, set this up
as a **Redirect Rule** on the zone: Cloudflare → `reachmck.com` → **Rules →
Redirect Rules → Create rule**.

- **If**: `Hostname` `equals` `www.reachmck.com`
- **Then**: Dynamic redirect → `concat("https://reachmck.com", http.request.uri.path)`
- **Status**: 301, preserve query string

`www.reachmck.com` still has to be attached to the Worker as a Custom domain (or
at least be a proxied record on the zone) — Cloudflare can't redirect a hostname
it isn't answering for.

Then:

- TLS is automatic once DNS resolves; allow a few minutes.
- `index.html`'s `<link rel="canonical">`, `public/sitemap.xml`, and
  `public/_redirects` all assume the bare apex is canonical. Change all three
  together if you'd rather have `www`.
