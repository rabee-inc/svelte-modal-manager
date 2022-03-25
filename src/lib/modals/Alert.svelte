<svelte:options accessors={true}/>

<script>
  import { createEventDispatcher } from 'svelte';
  export const dispatch = createEventDispatcher();
  export let close;
  // svelte-ignore unused-export-let
  export let awaitClose;

  export let title = '';
  export let message = '';

  let submit = () => {
    dispatch('submit');
    close();
  };
</script>

<template lang='pug'>
  div.modal.rounded-8
    div.p16.border-bottom
      div.title.bold.fs16.text-center.mb8(class:mb8!='{title && message}') {title}
      +if('message')
        p.text-center.white-space-pre-wrap.word-break-word.m0 {message}
    div
      button.bg-transparent.border-none.f.fh.s-full.p16.cursor-pointer(on:click!='{submit}') OK
</template>

<style lang='less'>
  .modal {
    min-width: 300px;
    max-width: 90vw;
    width: 340px;
    background-color: rgba(255, 255, 255, 0.90);
  }
  .bold {
    font-weight: bold;
  }
  .fs16 {
    font-size: 16px;
  }
  .text-center {
    text-align: center;
  }
  .white-space-pre-wrap {
    white-space: pre-wrap;
  }
  .word-break-word {
    word-break: break-all;
  }
  .p16 {
    padding: 16px;
  }
  .m0 {
    margin: 0px;
  }
  .mb8 {
    margin-bottom: 8px;
  }
  .rounded-8 {
    border-radius: 8px;
  }
  .border-bottom {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .f {
    display: flex;
  }
  .fh {
    justify-content: center;
    align-items: center;
  }
  .s-full {
    width: 100%;
    height: 100%;
  }
  .border-none {
    border: none;
  }
  .bg-transparent {
    background: transparent;
  }
  .cursor-pointer {
    cursor: pointer;
  }
</style>