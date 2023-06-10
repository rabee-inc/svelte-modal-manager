import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from "vite";
import { modalManagerPlugin } from './src/lib/vite/index.js';

console.log('-----------------');
console.log('vite.config.js', process.env.NODE_ENV);
console.log('-----------------');

export default defineConfig({
  plugins: [sveltekit(), modalManagerPlugin()],

  define: {
    'process.env': process.env,
  },

  //other configs...
    // for dev
  server: {
    port: 3000,
    fs: {
      strict: false
    }

  },
  // for preview
  preview: {
    port: 3000,
  }
});