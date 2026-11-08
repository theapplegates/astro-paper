What was changed
astro.config.ts — registered Wotfard as a local font family and mapped all 14 woff2 files:
Roman → normal style
Italic → italic style
Weights: thin 100, extralight 200, light 300, regular 400, medium 500, semibold 600, bold 700
src/styles/theme.css — changed --font-app to var(--font-wotfard). The font-app class on <body> in Layout.astro uses this, so all normal site text now uses Wotfard.
src/layouts/Layout.astro — updated the <Font> component and preloads only the regular Roman file (400 normal) so the first page paint is fast.
src/pages/og.png.ts and src/pages/posts/[...slug]/index.png.ts — updated the social/OG image generation to use Wotfard as well.
How it works
You do not need the stylesheet.css files Font Squirrel included. Astro reads the woff2 files directly, generates the @font-face CSS, copies the files into /_astro/fonts/, and hashes them for caching. The weight number tells the browser which file to pick when CSS says font-weight: 600, and the style tells it when to use italics.

Verified
All 14 @font-face rules are generated and the regular font is preloaded.
pnpm exec astro check passes with 0 errors.
/og.png and post OG image routes both render correctly with Wotfard.
One unrelated note: pnpm run build currently fails on a missing src/components/Picture.astro import in src/content/posts/the-future-is-now.mdx — that's pre-existing and not caused by the font change. Also, src/pages/search.astro still intentionally uses Georgia for search-result titles; let me know if you'd like that switched to Wotfard too.

Keep the search font as is please. I will hunt down Picture.astro. Thanks for the help.