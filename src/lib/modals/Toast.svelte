<svelte:options accessors={true}/>

<script context="module">
  import { fly } from 'svelte/transition';

  export const transition = {
    type: fly,
    props: {
      y: -100,
    },
  };
  export const position = {
    x: 'right',
    y: 'top',
  };
  export const overlay = {
    styles: {
      background: 'none',
    }
  };
</script>

<script>
  import { onMount, createEventDispatcher } from 'svelte';
  export const dispatch = createEventDispatcher();
  export let close;
  // svelte-ignore unused-export-let
  export let awaitClose;
  
  export let message = '';
  export let timeout;

  onMount(() => {
    setTimeout(() => {
      close();
    }, timeout);
  });

  let submit = () => {
    dispatch('submit');
    close();
  };
</script>

<template lang='pug'>
  div.modal.px20.py12.rounded-6.m16
    div.text-center {message}
</template>

<style lang='less'>
  .modal {
    background-color: rgba(0,0,0,0.65);
    color: #fff;
  }
  .m16 {
    margin: 16px;
  }
  .text-center {
    text-align: center;
  }
  .px20 {
    padding: 20px;
  }
  .py12 {
    padding: 12px;
  }
  .rounded-6 {
    border-radius: 6px;
  }
  .cursor-pointer {
    cursor: pointer;
  }
</style>