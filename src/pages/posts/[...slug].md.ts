import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { readFile } from "node:fs/promises";
import { getPostSlug } from "@/utils/getPostPaths";
import { getSortedPosts } from "@/utils/getSortedPosts";

async function getPostSource(
  post: CollectionEntry<"posts">
): Promise<string> {
  if (post.filePath) {
	// Different content loaders can provide either an absolute path,
	// a project-relative path, or a path relative to the posts folder.
	const possiblePaths = [
	  post.filePath,
	  `src/content/posts/${post.filePath}`,
	];

	for (const path of possiblePaths) {
	  try {
		return await readFile(path, "utf-8");
	  } catch {
		// Try the next possible location.
	  }
	}
  }

  // The rendered route still works if the original file cannot be read.
  // Astro's collection body supplies the Markdown/MDX content as a fallback.
  return post.body ?? "";
}

export async function getStaticPaths() {
  const posts = await getCollection("posts");
  const sortedPosts = getSortedPosts(posts);

  return Promise.all(
	sortedPosts.map(async post => ({
	  // Use exactly the same slug calculation as the normal post page.
	  params: {
		slug: getPostSlug(post.id, post.filePath),
	  },
	  props: {
		markdown: await getPostSource(post),
	  },
	}))
  );
}

export const GET: APIRoute = ({ props }) => {
  return new Response(String(props.markdown), {
	headers: {
	  "Content-Type": "text/markdown; charset=utf-8",
	},
  });
};
