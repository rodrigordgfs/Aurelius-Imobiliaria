import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { getProperties } from "@/lib/data";

const STATIC_PATHS = ["/", "/search", "/about", "/contact"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const listingPaths = getProperties().map((p) => `/property/${p.id}`);
        const paths = [...STATIC_PATHS, ...listingPaths];
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...paths.map((p) => `  <url><loc>${p}</loc><changefreq>weekly</changefreq></url>`),
          `</urlset>`,
        ].join("\n");
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
