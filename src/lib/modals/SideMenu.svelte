<svelte:options accessors={true}/>

<script context="module">
  import { fly } from 'svelte/transition';

  export const transition = {
    type: fly,
    props: {
      x: 375,
      duration: 256,
    },
  };
  export const position = {
    x: 'right',
    y: 'middle',
  };
  export const overlay = {
    styles: {
      background: 'rgba(0, 0, 0, 0.5)',
    }
  };
</script>

<script>
  import { createEventDispatcher, onMount } from 'svelte';
  export const dispatch = createEventDispatcher();
  export let close;

  import { goto } from '$app/navigation';

  export let title = 'Side Menu';
  export let items = [];

  // focus要素があればblurする
  document.activeElement.blur();

  let go = async (e) => {
    e.preventDefault();
    await goto(e.currentTarget.href);
    close();
  };
  let openAlert = () => {
    openModal('alert', {
      message: 'こんな感じでモーダル重ねられるよ!',
    });
  };
</script>

<template lang='pug'>
  div.modal
    div.p16.border
      div.bold.fs16.text-center {title}
    div.p8
      +each('items as item,index')
        a.block.p8(href='{item.link}', on:click='{go}') {item.label}
</template>

<style lang='less'>
  .modal {
    height: 100vh;
    width: 300px;
    background-color: white;
  }
  .bold {
    font-weight: bold;
  }
  .fs16 {
    font-size: 16px;
  }
  .block {
    display: block;
  }
  .p8 {
    padding: 8px;
  }
  .p16 {
    padding: 16px;
  }
</style>