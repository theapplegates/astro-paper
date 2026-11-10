import type { APIRoute } from "astro";

const markdownFiles = import.meta.glob(
  "/src/content/posts/**/*.{md,mdx}",
  {
	eager: true,
	query: "?raw",
	import: "default",
  }
) as Record<string, string>;

export function getStaticPaths() {
  return Object.entries(markdownFiles).map(([filePath, markdown]) => {
	const slug = filePath
	  .replace(/^\/src\/content\/posts\//, "")
	  .replace(/\.mdx?$/, "");

	return {
	  params: { slug },
	  props: { markdown },
	};
  });
}

export const GET: APIRoute = ({ props }) => {
  return new Response(String(props.markdown), {
	headers: {
	  "Content-Type": "text/markdown; charset=utf-8",
	},
  });
}
