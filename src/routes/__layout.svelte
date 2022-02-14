<script>
  import '../app.css';
  import '/static/icons/icons.css';

  import {ModalManager} from '$lib/index';

</script>

<template lang="pug">
  div.f.fclm.w-full.min-h-full
    div.s-full
      slot
</template>

<ModalManager />