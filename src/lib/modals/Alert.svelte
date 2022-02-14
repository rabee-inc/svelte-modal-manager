<svelte:options accessors={true}/>

<script>
  import { createEventDispatcher } from 'svelte';
  export const dispatch = createEventDispatcher();
  export let close;

  export let title = 'Alert!';
  export let message = '';

  let submit = () => {
    dispatch('submit');
    close();
  };
</script>

<template lang='pug'>
  div.modal.rounded-8
    div.p16.border
      div.bold.fs16.text-center(class:mb8!='{title && message}') {title}
      p.text-center.white-space-pre-wrap.word-break-word {message}
    div
      button.f.fh.s-full.p16(on:click!='{submit}') OK
</template>

<style lang='less'>
  .modal {
    min-width: 300px;
    max-width: 90vw;
    background-color: rgba(255, 255, 255, 0.90);
  }
</style>