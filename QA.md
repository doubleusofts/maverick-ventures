# Verification — 19 October 2026

Passed:

- Generated 12 standalone HTML pages from shared templates.
- Static verification of 300 relative links/asset references, page metadata, h1 headings, skip-link targets and font references.
- JavaScript syntax check.
- Desktop browser inspection at a 1280px viewport: home hero, compact dropdown with image, and a representative inner-page banner. No horizontal overflow or broken loaded images on the home page.
- Desktop menu click and Escape behavior. Fixed the initial hover/click conflict found during QA.
- Capability panel selection by click, plus keyboard Home returning to the first panel.
- Mobile visual inspection in a 390px embedded viewport: header, hero and menu; hamburger opening/closing; capability accordion with all six destinations; switching to Who We Are closes the other group.
- Required contact fields prevent empty submission. A valid local test displays explicit demo success without transmitting or storing data.
- Privacy dialog opens, closes and returns focus to its trigger.

Limits:

- Browser checks used the available Chromium-based in-app browser and an embedded narrow viewport, not physical iOS/Android devices or a comprehensive browser matrix.
- Form-service delivery, real map integration and social account destinations await company configuration.
- No claim of pixel-perfect equivalence to CCC across every viewport. Measured tokens and adaptations are documented in DESIGN-NOTES.md.
- Publication to GitHub was not requested as an action and no repository was supplied. The source archive is ready to upload; enable GitHub Pages in the repository settings.

