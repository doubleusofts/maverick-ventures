# Maverick Ventures

Static corporate website for Maverick Ventures Company (شركة مافريك فينتشرز). Approved layout, Rubik typography, triangles, transitions, compact dropdowns and mobile navigation are preserved with company content and branding.

## Local use

Node.js required. No dependencies to install.

```sh
npm run build
npm run check
npm start
```

Open http://127.0.0.1:4173/. Generated HTML is committed for GitHub Pages, main branch / root, with .nojekyll. Host: https://doubleusofts.github.io/maverick-ventures/.

## Editing

- scripts/content.mjs: company text, services and photos.
- scripts/build.mjs: shared templates, navigation, footer and SEO. Rebuild after changes.
- assets/data/certificates.json: single source for certificate titles, issuers, validity labels, source pages and image paths. Update expiry labels here, then rebuild.
- assets/css/site.css: shared brand colors and approved layout.
- assets/js/site.js: menus, tabs, form and certificate viewer.
- CREDITS.md and CONTENT-REPORT.md: provenance, page list and review flags.

The certificate viewer provides next/previous, arrow keys, zoom (+/−), Escape, focus containment and restoration. Full certificate images are rendered at 220 DPI, with separate WebP thumbnails.

## Form integration

FORM_ENDPOINT in assets/js/site.js is intentionally empty. The form validates locally and clearly reports that nothing was sent. Set it to a public form-service URL accepting form-data POST and returning a successful HTTP response. Keep secret keys server-side. Configure service-side spam protection and an appropriate privacy notice before collecting submissions. Email and phone links work independently.

## Branding and SEO

Original embedded logo extracted from PDF pages 1/14; transparent PNG/WebP, square favicon and 1200×630 share image included. CSS variables: PDF gold #D8AD50, logo navy sample #0C1D2F, PDF grey #AFAFAF. Logo gold sample #CAA45B remains in original artwork.

Each page has a title, description, canonical, Open Graph and Organization data. When changing hosting to the supplied company domain, update canonical/OG URLs in scripts/build.mjs and rebuild. No DNS or custom-domain change is included.

## Exclusions

Source PDF and extraction files stay outside the site. .gitignore excludes PDFs, portal screenshots, Chamber instructions and the blank GOSI second page. Only approved certificate images/thumbnails are deployable. Never upload working extraction folders.

© 2026 Maverick Ventures. All rights reserved.
