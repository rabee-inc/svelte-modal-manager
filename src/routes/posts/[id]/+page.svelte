<script>
  import { page } from '$app/stores';
  $: ({ post } = $page.data);
</script>

<template lang='pug'>
  main.container-640.px16.py32
    h1.mb32 {post.id}. {post.title}
    p.mb32 {post.body}

    a(sveltekit:prefetch, href='/') top

</template>
