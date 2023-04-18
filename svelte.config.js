import path from 'path';
import adapterAuto from '@sveltejs/adapter-auto';
import adapterNode from '@sveltejs/adapter-node';
import sveltePreprocess from 'svelte-preprocess';
const preprocess = sveltePreprocess({
  typescript: true,
  // ...
});
let adapter = null;

if (adapterAuto().name !== '@sveltejs/adapter-auto') {
  // vercel/netlify/cloudflare pages
  adapter = adapterAuto();
}
else {
  // auto で hit しなかったら強制的に node にする
  adapter = adapterNode();
}


/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter,

    alias: {
      'svelte-modal-manager': path.resolve('./src/lib'),
      $components: path.resolve('./src/components'),
    },
  },
  preprocess,
};

export default config;
