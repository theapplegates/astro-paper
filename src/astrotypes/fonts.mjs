import { fontProviders } from "astro/config";

export const astrotypeFonts = [
  {
    provider: fontProviders.google(),
    name: "Inter Tight",
    cssVariable: "--font-inter-tight"
  },
  {
    provider: fontProviders.google(),
    name: "Open Sans",
    cssVariable: "--font-open-sans"
  }
];
