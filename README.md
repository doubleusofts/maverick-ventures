# Maverick Ventures

A responsive, 12-page corporate construction website, closely following the visual language of [CCC](https://www.ccc.net/), inspected on 19 October 2026. Built with semantic HTML, shared CSS and vanilla JavaScript. No runtime dependencies, build service, API keys or external asset requests are needed.

## Open and run

Open `index.html` directly, or install Node.js 18+ and run:

```sh
npm start
```

Open the printed local address, normally `http://127.0.0.1:4173`. Stop with Ctrl+C.

The generated HTML is committed and ready to serve. To update shared markup or page content, edit `scripts/build.mjs`, then run:

```sh
npm run build
npm run check
```

There is nothing to install. Direct HTML edits work, but rebuilding overwrites them. CSS and JavaScript edits are preserved.

## GitHub Pages

Upload the **contents of this folder** to your repository. In GitHub Settings → Pages, select deployment from your branch and the root folder. This is the normal GitHub Pages enablement step; no framework configuration, custom workflow or build command is required. `.nojekyll` is included. All internal navigation and assets use relative paths, including deployment under a repository subpath.

## Structure

```text
index.html                  Home
pages/                      11 dedicated inner pages
assets/css/site.css         Shared styles and responsive rules
assets/js/site.js           Menus, tabs, reveals, dialogs and contact form
assets/images/              Local WebP photography, SVG motif and favicon
assets/fonts/               Self-hosted Rubik and OFL license
scripts/build.mjs           Shared page templates and editable content
scripts/check.mjs           Static integrity checks
scripts/serve.mjs           Dependency-free local preview
ASSET-SOURCES.md             Photography provenance and replacement guidance
DESIGN-NOTES.md              Measured reference styles and intentional adaptations
```

## Pages and behavior

Home; Our Story & Legacy; Vision & Values; Our Services; Certifications & Memberships; Energy & Chemicals; Renewables, Power & Water; Pipelines; Buildings; Transportation; Innovation; Connect with Us.

The only primary navigation entries are Who We Are, Capabilities and Connect with Us. Desktop menus open on hover or click; keyboard users can press Enter or Arrow Down to expand, Tab through links, and Escape to close. Mobile uses a hamburger menu and accordion groups. The six capability panels support click and arrow-key selection, Home and End. Scroll reveals honour reduced-motion settings.

Footer Compliance and Privacy Policy open editable notices, rather than adding pages outside the requested scope. Social icons open transparent placeholders until official company URLs are supplied.

## Replace before launch

- **Brand identity:** Maverick Ventures and the simple triangle monogram are provisional, inferred from the project name. Replace the shared `brand()` template and favicon with approved identity assets.
- **Company claims and copy:** All body copy is illustrative. The requested “70+ Year” heading is retained and visibly flagged; replace it with a verified history. No real certifications, completed projects, clients or statistics are asserted.
- **Photography:** All reference photographs are local design placeholders from CCC, not representations of Maverick Ventures projects. Replace them with your own approved or licensed imagery. See `ASSET-SOURCES.md`. Image filenames can remain unchanged to preserve links.
- **Contact details:** Replace bracketed address, phone, email and office hours in `contact()` inside `scripts/build.mjs`.
- **Map:** Replace the styled map placeholder with your verified office map. For an iframe, provide a descriptive title, lazy loading and an appropriate referrer policy. No third-party map requests are made by default.
- **Social accounts:** Replace the three placeholder buttons in `footer()` with anchors to your official LinkedIn, Facebook and YouTube profiles, retaining accessible labels.
- **Compliance and privacy:** Replace `notices` in `assets/js/site.js` with approved content and your actual reporting channel. The existing text is not a final company policy.
- **SEO:** Titles and descriptions are per-page. Open Graph images use relative paths to maintain portability. Once the public hostname is known, use absolute public image URLs and add per-page canonical and `og:url` values for reliable social previews.

## Contact form integration

Demo mode validates required name, email, subject and message, and displays an honest success message stating nothing was sent or saved. It does not use local storage. Phone and company are optional. The message must contain at least 10 characters after trimming.

To enable a JSON-compatible form service such as Formspree, replace the empty `FORM_ENDPOINT` constant in `assets/js/site.js` with your public form endpoint. The existing handler sends `FormData` via POST, handles non-success responses, prevents duplicate submits, and resets only on successful delivery. Configure the service to accept your production origin. Do not put secret API keys in client code. Add spam controls, server-side validation and your approved privacy language at the service/backend layer. Netlify Forms requires its own build-time form declarations and deployment on Netlify; it is not automatically enabled by this template or GitHub Pages.

## Verification

`npm run check` verifies exactly 12 pages, local links and image/font references, one h1 per page, SEO fields, skip targets and exclusion of unwanted pages. Browser QA is recorded in `QA.md`. Review final content, image permissions and real form delivery after substituting production details.
