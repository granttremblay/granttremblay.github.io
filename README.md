# granttremblay.com

Personal website of **Dr. Grant Tremblay** — astrophysicist at the Center for
Astrophysics | Harvard & Smithsonian. Built with [Jekyll](https://jekyllrb.com/)
and hosted on GitHub Pages.

A clean, modern recreation of the previous Squarespace site, with the full blog
ported over at the **same URLs** so existing search results keep resolving, a
**biography** page, and a **publications** list that stays current automatically
from NASA SciX / ADS.

---

## What's here

| Page | URL |
|------|-----|
| Home (About, Research, Group, Roles, Press, Books, Outreach, Code, Blog, Contact) | `/` |
| Blog — "Great Observatories" | `/blog/` |
| Blog posts (original slugs preserved) | `/blog/trls/`, `/blog/jwst-thoughts/`, `/blog/astro2020/`, … |
| Publications (auto-updated) | `/publications/` |
| Biography | `/bio/` |
| Banneker & Aztlán 2018 project (archival) | `/banneker/` |
| RSS feed | `/blog/feed.xml` |

### Blog SEO continuity

Every post keeps its original Squarespace slug (`/blog/trls`, `/blog/jwst-thoughts`,
etc.) via Jekyll `permalink: /blog/:title/` in [`_config.yml`](_config.yml), so a
Google result like *"TRL levels with unicorns"* will still land on the ported post
after the domain is cut over. All blog images, bio photos, and the animated MUSE
"movies" (converted from GIF to compact MP4) are stored locally under
[`assets/img/`](assets/img) — nothing hot-links to Squarespace, so nothing breaks
when the old site is retired.

---

## Editing

- **Add a blog post:** create `_posts/YYYY-MM-DD-slug.md` with front matter
  (`title`, `subtitle`, `image`, optional `categories: [Science]`). Write in Markdown.
  Put images in `assets/img/<slug>/`.
- **Home page content:** [`index.html`](index.html).
- **Biography:** [`bio.md`](bio.md) · **Styles:** [`assets/css/style.css`](assets/css/style.css).

## Publications — automatic updates

The list on `/publications/` is generated from [`_data/publications.json`](_data/publications.json)
by [`scripts/fetch_publications.py`](scripts/fetch_publications.py), which queries
NASA SciX / ADS by ORCID (`0000-0002-5445-5401`). A scheduled GitHub Action keeps
it current.

**One-time setup to enable ADS (recommended — richer data + citation counts):**

1. Get a free API token at <https://ui.adsabs.harvard.edu/user/settings/token>
   (NASA SciX uses the same token).
2. In this repo: **Settings → Secrets and variables → Actions → New repository
   secret**, name it **`ADS_TOKEN`**.
3. **Settings → Actions → General → Workflow permissions → Read and write permissions.**

The workflow ([`.github/workflows/update-publications.yml`](.github/workflows/update-publications.yml))
then runs weekly (and on demand from the Actions tab). Until the token is added,
the list is seeded from Crossref (good coverage of recent papers, no token needed).

Refresh locally:

```bash
ADS_TOKEN=xxxxx python3 scripts/fetch_publications.py   # or without the token to use Crossref
```

## Local preview

Requires Ruby 3+ and Bundler.

```bash
bundle install
bundle exec jekyll serve
# open http://127.0.0.1:4000
```

---

## Cutting over granttremblay.com → GitHub Pages

When you're ready to retire Squarespace and point the domain here:

1. In [`_config.yml`](_config.yml), change `url` to `https://www.granttremblay.com`.
2. Create a file named `CNAME` at the repo root containing one line:
   ```
   www.granttremblay.com
   ```
3. At your DNS provider, point the domain at GitHub Pages
   (see <https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site>):
   - `www` → `CNAME` to `granttremblay.github.io`
   - apex `granttremblay.com` → GitHub Pages A/AAAA records (or an ALIAS/ANAME to `granttremblay.github.io`)
4. In **Settings → Pages**, set the custom domain and enable **Enforce HTTPS**.

Because the blog slugs match the old site, existing inbound links and search
results continue to resolve. Keep the old Squarespace site up until DNS has fully
propagated.
