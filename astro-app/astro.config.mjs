// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
import { loadEnv } from "vite";
const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
} = loadEnv(import.meta.env.MODE, process.cwd(), "");
import { defineConfig } from "astro/config";

// Different environments use different variables
const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID || PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_STUDIO_DATASET || PUBLIC_SANITY_DATASET;

import sanity from "@sanity/astro";
import react from "@astrojs/react";

// Change this depending on your hosting provider (Vercel, Netlify etc)
// https://docs.astro.build/en/guides/server-side-rendering/#adding-an-adapter
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  // Hybrid+adapter is required to support embedded Sanity Studio
  output: "hybrid",
  adapter: netlify(),
  image: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
    ],
    // Local images on prerendered pages are optimized at build time (static files).
    // Dev server does on-demand optimization, so image requests are slower in dev.
  },
  integrations: [
    sanity({
      projectId,
      dataset,
      // studioBasePath: "/admin",
      // useCdn: true = requests go via cdn.sanity.io (cached, faster). false = direct API (always fresh, slower).
      useCdn: true,
      apiVersion: "2024-12-08", // Set to date of setup to use the latest API version
    }),
    react(), // Required for Sanity Studio
  ],
});
