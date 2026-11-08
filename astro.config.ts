import {
  defineConfig,
  envField,
  fontProviders,
  svgoOptimizer,
} from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { rehypeHeadingIds, unified } from "@astrojs/markdown-remark";
import rehypeCallouts from "rehype-callouts";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import { rehypeTableWrapper } from "./src/utils/rehypeTableWrapper";
import {
  inlineTocDeprecation,
  rehypeInlineToc,
} from "./src/utils/rehypeInlineToc";
import rehypeCloudinaryPicture from "./src/plugins/rehype-cloudinary-picture.mjs";
import config from "./astro-paper.config";

export default defineConfig({
  site: config.site.url,
  integrations: [
    mdx(),
    sitemap({
      filter: page =>
        config.features?.showArchives !== false || !/\/archives\/?$/.test(page),
    }),
    inlineTocDeprecation(),
  ],
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    // Deprecated: the theme no longer uses remark-toc or remark-collapse. They
    // stay in package.json so a customised config importing them still builds,
    // and are removed in v8.
    processor: unified({
      rehypePlugins: [
        rehypeHeadingIds,
        rehypeInlineToc,
        rehypeCallouts,
        [
          rehypeCloudinaryPicture,
          { cloudName: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME },
        ],
        rehypeTableWrapper,
      ],
    }),
    shikiConfig: {
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      name: "Wotfard",
      cssVariable: "--font-wotfard",
      provider: fontProviders.local(),
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            weight: 100,
            style: "normal",
            src: [
              "./src/assets/fonts/Wotfard-Roman/woff2/wotfard-thin-webfont.woff2",
            ],
          },
          {
            weight: 200,
            style: "normal",
            src: [
              "./src/assets/fonts/Wotfard-Roman/woff2/wotfard-extralight-webfont.woff2",
            ],
          },
          {
            weight: 300,
            style: "normal",
            src: [
              "./src/assets/fonts/Wotfard-Roman/woff2/wotfard-light-webfont.woff2",
            ],
          },
          {
            weight: 400,
            style: "normal",
            src: [
              "./src/assets/fonts/Wotfard-Roman/woff2/wotfard-regular-webfont.woff2",
            ],
          },
          {
            weight: 500,
            style: "normal",
            src: [
              "./src/assets/fonts/Wotfard-Roman/woff2/wotfard-medium-webfont.woff2",
            ],
          },
          {
            weight: 600,
            style: "normal",
            src: [
              "./src/assets/fonts/Wotfard-Roman/woff2/wotfard-semibold-webfont.woff2",
            ],
          },
          {
            weight: 700,
            style: "normal",
            src: [
              "./src/assets/fonts/Wotfard-Roman/woff2/wotfard-bold-webfont.woff2",
            ],
          },
          {
            weight: 100,
            style: "italic",
            src: [
              "./src/assets/fonts/Wotfard-Italic/woff2/wotfard-thinitalic-webfont.woff2",
            ],
          },
          {
            weight: 200,
            style: "italic",
            src: [
              "./src/assets/fonts/Wotfard-Italic/woff2/wotfard-extralightitalic-webfont.woff2",
            ],
          },
          {
            weight: 300,
            style: "italic",
            src: [
              "./src/assets/fonts/Wotfard-Italic/woff2/wotfard-lightitalic-webfont.woff2",
            ],
          },
          {
            weight: 400,
            style: "italic",
            src: [
              "./src/assets/fonts/Wotfard-Italic/woff2/wotfard-regularitalic-webfont.woff2",
            ],
          },
          {
            weight: 500,
            style: "italic",
            src: [
              "./src/assets/fonts/Wotfard-Italic/woff2/wotfard-mediumitalic-webfont.woff2",
            ],
          },
          {
            weight: 600,
            style: "italic",
            src: [
              "./src/assets/fonts/Wotfard-Italic/woff2/wotfard-semibolditalic-webfont.woff2",
            ],
          },
          {
            weight: 700,
            style: "italic",
            src: [
              "./src/assets/fonts/Wotfard-Italic/woff2/wotfard-bolditalic-webfont.woff2",
            ],
          },
        ],
      },
    },
  ],
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  experimental: {
    svgOptimizer: svgoOptimizer(),
  },
});
