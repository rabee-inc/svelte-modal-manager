<script context="module">
  // export const prerender = true;
  import api from '$lib/scripts/api.js';

  export async function load({params, fetch}) {
    let promises = [
      api.child('posts').child(params.id).get(),
    ];

    var [post] = await Promise.all(promises);

    return {
      props: {
        post,
      }
    };
  }
</script>

<script>
  import Meta from '$components/utils/Meta.svelte';
  export let post;

</script>

<Meta title='{post.id}. {post.title}' />

<template lang='pug'>
  main.container.px16.py32
    h1.mb32 {post.id}. {post.title}
    p.mb32 {post.body}

    a(sveltekit:prefetch, href='/') back


    +each('[1, 2, 3, 4, 5] as post')
      div
        a.block.p16.border(href='/posts/{post}') {post}

</template>
