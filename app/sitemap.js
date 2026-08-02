import { TOOLS } from "@/lib/toolsList";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.dailycalcpro.com";

export default function sitemap() {
  const staticPages = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.4 },
  ];

  const toolPages = TOOLS.map((tool) => ({
    url: `${SITE_URL}/calculators/${tool.slug}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticPages, ...toolPages];
}
