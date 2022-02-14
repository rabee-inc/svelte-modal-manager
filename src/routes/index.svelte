<script context="module">
  export async function load({fetch}) {
    let res = await fetch('https://jsonplaceholder.typicode.com/posts');
    let json = await res.json();

    return {
      props: {
        posts: json,
      }
    };
  }
</script>
<script>
  import Post from '$components/items/Post.svelte';
  export let posts = [];
</script>

<template lang='pug'>
  main.container-640.px16.py32
    div.f.fclm.fm.mb36
      h1.ts-large.mb4 svelte-modal-manager demo
    +each('posts as post')
      div.mb16
        Post(post='{post}')
</template>
