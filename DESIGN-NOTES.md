# Reference inspection

Reference: https://www.ccc.net/ and https://www.ccc.net/who-we-are/story-legacy/, inspected 19 October 2026 through the live browser and published stylesheets.

Observed tokens:

| Element | Reference value |
| --- | --- |
| Font | Rubik, sans-serif |
| Brand red | #E8202C |
| Heading/nav | #141414 |
| Body copy | #4B4B4B |
| Borders | #E4E4E4 |
| Desktop hero | 80px / 90px, weight 400 |
| Desktop section title | 60px / 70px, weight 400 |
| Mobile hero | 40px / 50px |
| Mobile section title | 30px / 36px |
| Navigation | 16px, rounded 30px items |
| Navigation outer radius | 71px |
| Hover transition | 0.2s linear |
| Menu image transition | 0.1s opacity |
| Content reveal | 1.2s ease-in-out |
| Home banner maximum height | 793px |
| Sustainability desktop banner | 539px |

The current live desktop menu uses a 740px-wide rounded panel. Following the supplied screenshot correction, this build uses a compact 740px rounded panel with left links, right imagery and a 20px gap below the navigation. A transparent pointer bridge and 200ms close delay keep links reachable. Inner pages use the reference's red title/text beside a large image with triangular edge treatment. The home video is replaced by the requested still photograph. The headline remains over the photograph on small screens for readability and consistency with the brief.

Content, responsive breakpoints and logo are adapted to Maverick Ventures; this is a close implementation of the requested design system, not a claim of pixel-identical reproduction at all widths. The original logo is not reused. Red motifs are locally authored SVG. Header/footer HTML is generated from shared functions, so all pages contain full semantic navigation without client-side rendering.

