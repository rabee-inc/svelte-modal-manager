<script>
  import { page } from '$app/stores';
  let status = $page.status;
  let message = $page.error.message;
</script>

<template lang="pug">
  main
    h1 {status}
    p {message}
</template>
