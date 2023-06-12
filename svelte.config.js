import path from 'path';
import adapter from '@sveltejs/adapter-auto';
import sveltePreprocess from 'svelte-preprocess';
const preprocess = sveltePreprocess({
  typescript: true,
  // ...
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    
    alias: {
      '@rabee-org/svelte-modal-manager': path.resolve('./src/lib'),
      '$modals': path.resolve('./src/components/modals'),
      $components: path.resolve('./src/components'),
    },
  },
  preprocess,
};

export default config;
