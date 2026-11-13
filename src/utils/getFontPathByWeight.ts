import type { FontData } from "astro:assets";

function matchesWeight(
  fontWeight: string | undefined,
  weight: number
): boolean {
  if (fontWeight === undefined) return false;

  const [min, max = min] = fontWeight.split(/\s+/).map(Number);

  return Number.isFinite(min) && weight >= min && weight <= max;
}

export function getFontPathByWeight(
  fonts: FontData[],
  weight: number,
  options?: {
    style?: "normal" | "italic";
    format?: string;
  }
): string | undefined {
  const style = options?.style ?? "normal";
  const format = options?.format ?? "truetype";

  for (const font of fonts) {
    if (matchesWeight(font.weight, weight) && font.style === style) {
      const src = font.src.find(file => file.format === format) ?? font.src[0];
      if (src) return src.url;
    }
  }

  return undefined;
}
