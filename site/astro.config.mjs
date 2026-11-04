// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.saytamm.com',
  // `npm run build:preview-link` builds a separate bundle for the claude.ai preview link
  outDir: process.env.PUBLIC_DEPLOY_TARGET === 'artifact' ? './dist-artifact' : './dist',
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
});
