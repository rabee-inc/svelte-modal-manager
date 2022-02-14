<script context="module">
  // export const prerender = true;
  import api from '$lib/scripts/api.js';

  export async function load({params, fetch, session}) {
    let promises = [
      api.child('posts').get(),
    ];

    var [posts] = await Promise.all(promises);

    return {
      props: {
        posts,
      }
    };
  }
</script>
<script>
  import Meta from '$components/utils/Meta.svelte';
  import Post from '$components/items/Post.svelte';
  export let posts = [];
</script>

<Meta />

<template lang='pug'>
  main.container.px16.py32
    div.f.fclm.fm.mb36
      h1.ts-large.mb4 Svelte template for rabee
    +each('posts as post')
      div.mb16
        Post(post='{post}')
</template>
