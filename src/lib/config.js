
import * as env from '$app/env';
import extendDeep from 'extend-deep';

let config = {
  name: 'SvelteKit Template',
  env: env,
  head: {
    title: 'SvelteKit Template for rabee',
    description: 'rabee 用の SvelteKit テンプレートです!',
    keywords: 'rabee,svelte,sveltekit,template',
    ogp: {
      site_name: 'Light News',
      type: 'website',
      image: 'https://dummyimage.com/1200x630/000/fff&text=OGP',
      twitter: {
        card: 'summary_large_image',
      },
    },
  },
  api: {
    endpoint: 'https://jsonplaceholder.typicode.com',
  },
  google: {
    gtm: {
      id: ''
    },
    ads: {
      id: ''
    }
  },
};

if (process.env.NODE_ENV === 'production') {
  config = extendDeep(config, {
    api: {
      endpoint: 'https://jsonplaceholder.typicode.com',
    },
    google: {
      gtm: {
        id: '',
      },
      ads: {
        id: '',
      }
    },
  });
}

export default config;
