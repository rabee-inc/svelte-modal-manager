<script>
  export let post;
</script>

<template lang='pug'>
  a.block(sveltekit:prefetch, href='/posts/{post.id}')
    h2 {post.title}
    p.line-clamp-3 {post.body}
</template>
