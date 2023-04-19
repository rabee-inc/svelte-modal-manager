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
      'svelte-modal-manager': path.resolve('./src/lib'),
      $components: path.resolve('./src/components'),
    },
  },
  preprocess,
};

export default config;
