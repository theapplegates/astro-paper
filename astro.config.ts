import {
  defineConfig,
  envField,
  fontProviders,
  svgoOptimizer,
} from "astro/config";
import rehypeRaw from "rehype-raw";
import { rehypeCloudinaryPicture } from "./src/plugins/rehype-cloudinary-picture.mjs";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import rehypeCallouts from "rehype-callouts";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import config from "./astro-paper.config";

export default defineConfig({
  site: config.site.url,
  integrations: [
    mdx(),
    sitemap({
      filter: page =>
        config.features?.showArchives !== false || !page.endsWith("/archives/"),
    }),
  ],
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkToc,
        [remarkCollapse, { test: "Table of contents" }],
      ],
      rehypePlugins: [rehypeRaw, rehypeCloudinaryPicture, rehypeCallouts],
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
    ssr: {
      noExternal: ["astro-cloudinary", "@radix-ui/*"]
    },
    optimizeDeps: {
      exclude: ["astro-cloudinary"]
    },
    build: {
      cssMinify: true,
      minify: "esbuild"
    }
  },
  fonts: [
    {
      name: "Wotfard",
      cssVariable: "--font-wotfard",
      provider: fontProviders.local(),
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          ...[
            [100, "thin"],
            [200, "extralight"],
            [300, "light"],
            [400, "regular"],
            [500, "medium"],
            [600, "semibold"],
            [700, "bold"],
          ].map(([weight, name]) => ({
            weight,
            style: "normal" as const,
            src: [
              `./src/assets/fonts/Wotfard-Roman/woff2/wotfard-${name}-webfont.woff2`,
              `./src/assets/fonts/Wotfard-Roman/ttf/wotfard-${name}-webfont.ttf`,
            ],
          })),
          ...[
            [100, "thinitalic"],
            [200, "extralightitalic"],
            [300, "lightitalic"],
            [400, "regularitalic"],
            [500, "mediumitalic"],
            [600, "semibolditalic"],
            [700, "bolditalic"],
          ].map(([weight, name]) => ({
            weight,
            style: "italic" as const,
            src: [
              `./src/assets/fonts/Wotfard-Italic/woff2/wotfard-${name}-webfont.woff2`,
              `./src/assets/fonts/Wotfard-Italic/ttf/wotfard-${name}-webfont.ttf`,
            ],
          })),
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
