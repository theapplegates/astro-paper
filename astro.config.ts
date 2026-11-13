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
      name: "Geist Sans",
      cssVariable: "--font-geist-sans",
      provider: fontProviders.local(),
      fallbacks: ["system-ui", "sans-serif"],
      options: {
        variants: [
          {
            weight: "100 900",
            style: "normal",
            src: [
              "./node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
            ],
          },
          {
            weight: "100 900",
            style: "italic",
            src: [
              "./node_modules/geist/dist/fonts/geist-sans/Geist-Italic[wght].woff2",
            ],
          },
        ],
      },
    },
    {
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      provider: fontProviders.local(),
      fallbacks: [
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
      ],
      options: {
        variants: [
          {
            weight: "100 900",
            style: "normal",
            src: [
              "./node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
            ],
          },
          {
            weight: "100 900",
            style: "italic",
            src: [
              "./node_modules/geist/dist/fonts/geist-mono/GeistMono-Italic[wght].woff2",
            ],
          },
        ],
      },
    },
    {
      name: "Geist Serif",
      cssVariable: "--font-geist-serif",
      provider: fontProviders.local(),
      fallbacks: ["Times New Roman", "Times", "serif"],
      options: {
        variants: [
          {
            weight: 400,
            style: "normal",
            src: [
              "./node_modules/geist/dist/fonts/geist-serif/GeistSerifVF.woff2",
            ],
          },
        ],
      },
    },
    {
      name: "Geist Pixel Square",
      cssVariable: "--font-geist-pixel-square",
      provider: fontProviders.local(),
      fallbacks: [
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        "monospace",
      ],
      options: {
        variants: [
          {
            weight: 500,
            style: "normal",
            src: [
              "./node_modules/geist/dist/fonts/geist-pixel/GeistPixel-Square.woff2",
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
