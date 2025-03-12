export const SITE = {
  website: "https://paper.paulapplegate.com/",
  author: "Paul Applegate",
  profile: "https://paulapplegate.com/",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "Living Life",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    url: "https://github.com/theapplegates/astro-paper/edit/main/src/content/blog",
    text: "Suggest Changes",
    appendFilePath: true,
  },
  dynamicOgImage: true,
} as const;
