import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

// AI crawlers — explicitly allowed to ensure FGMP appears in answers from
// ChatGPT, Perplexity, Claude, Gemini, You.com, etc. These bots check robots.txt
// before training/citing.
const AI_CRAWLERS = [
  "GPTBot", // OpenAI ChatGPT
  "ChatGPT-User", // OpenAI on-demand fetches
  "OAI-SearchBot", // OpenAI search index
  "anthropic-ai", // Claude training
  "ClaudeBot", // Claude on-demand fetches
  "Claude-Web", // Claude browsing
  "PerplexityBot", // Perplexity
  "Perplexity-User", // Perplexity on-demand
  "Google-Extended", // Gemini training
  "Bytespider", // ByteDance / Doubao
  "CCBot", // Common Crawl (used by many LLMs)
  "Diffbot", // Knowledge graph
  "FacebookBot", // Meta AI
  "Applebot-Extended", // Apple Intelligence
  "Amazonbot", // Alexa / Amazon AI
  "DuckAssistBot", // DuckDuckGo AI
  "YouBot", // You.com
  "cohere-ai", // Cohere
  "Mistral-AI-Bot", // Mistral
  "Timpibot", // Timpi
];

export default function robots(): MetadataRoute.Robots {
  // Each AI crawler gets the same allow rules as Googlebot — full access to
  // public content; private areas (/api/, /account, /login, /admin) blocked.
  const aiRules = AI_CRAWLERS.map((bot) => ({
    userAgent: bot,
    allow: "/",
    disallow: ["/api/", "/account", "/login", "/admin"],
  }));

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/account", "/login", "/admin"] },
      ...aiRules,
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
