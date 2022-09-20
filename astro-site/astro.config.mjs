import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';
import vue from "@astrojs/vue";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({
    config: {
      applyBaseStyles: false
    }
  }), mdx(), react(), vue(), svelte()],
  output: 'server',
  adapter: vercel()
});