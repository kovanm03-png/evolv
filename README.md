# Evolve 360 website

English pages are in the main folder, Kurdish pages (right to left) are in `ku/`.
Pages: Home, Services, Work, About, Contact.

## How the site is made

| Where | What |
|---|---|
| `*.html`, `ku/*.html` | the finished pages (made by the generator, do not edit by hand) |
| `preview/build.js` | the generator: all text, the Instagram data and the page layout live here |
| `preview/enhance/` | styles and scripts (`site.css`, `round2.css`, `round3.css`, `site.js`, `hero3d.js`) |
| `assets/img/work`, `assets/img/posts` | pictures from the Evolve 360 Instagram account |
| `scripts/publish.js` | builds the `public/` folder that Cloudflare publishes |
| `wrangler.jsonc` | Cloudflare settings |

To change text: edit `preview/build.js`, run `node preview/build.js` to see a preview in `preview/site/`,
then `node preview/build.js --apply` to put it on the real pages. `node preview/build.js --revert` undoes the last apply.

## Publishing on Cloudflare (from GitHub)

In the Cloudflare dashboard: **Workers & Pages → Create application → Import a repository (GitHub)**, pick this repository, then:

| Setting | Value |
|---|---|
| Project / Worker name | `evolve-360` (it must match `name` in `wrangler.jsonc`) |
| Production branch | `main` |
| Build command | `node scripts/publish.js` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` (leave empty) |

Every push to `main` then builds and publishes the site by itself.
A custom domain is added later in the Worker's **Settings → Domains & Routes**.

Before going live with a domain, add the domain to the `canonical` comment in the page head (`preview/build.js`) and a sitemap.
