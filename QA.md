# Maverick Ventures validation — 2 November 2026

- Build succeeds: 14 static pages, 11 certificate cards.
- Static check passes: 618 local references, one H1 per page, metadata, anchors, CSS assets, no excluded-page links.
- Browser layout sweep: all 14 pages at 320, 390, 768 and 1280 px; no horizontal page overflow and correct headings/titles.
- Fixed long-heading overflow on 320 px phones.
- Loaded images resolve. The empty lightbox image before selection is intentionally source-less, not a failed request.
- Desktop compact menu opens and links navigate; the existing pointer bridge and delayed-close implementation are retained.
- Mobile navigation opens/closes; capabilities accordion exposes all eight services.
- Certificate viewer: fit-to-screen, next button, right-arrow navigation, + zoom, Escape and focus return verified. Fixed an initial landscape-image fit issue on mobile.
- Contact form checked with dummy local data: validates and explicitly reports no delivery while FORM_ENDPOINT is empty. No data was submitted to a remote service.
- No browser console errors observed during the form check. Map iframe loads from the supplied address query; no claim of independently geocoded entrance coordinates.
- Full certificate renders inspected against source page layouts; 220 DPI; 22 image files (11 full + 11 thumbnails), about 3.3 MB total.
- No PDF, excluded portal screenshot, Chamber instructions or blank GOSI page in the deployable site folder.
- Old company copy, invented history and obsolete service pages removed. The sole reference-site name remaining is its required image-provenance URL in CREDITS.md for the expressly retained home background.

These checks cover the local static build. Form delivery remains unconfigured; see README.md. Review flags are in CONTENT-REPORT.md.
