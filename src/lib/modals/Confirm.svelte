<svelte:options accessors={true}/>

<script>
  import { getModalContext } from "../index.js";
  const { close, awaitClose, result, isClosed, dispatch } = getModalContext();
  
  export let title = '';
  export let message = '';

  let yes = () => {
    $result = true;
    dispatch('submit', {
      value: true,
    });
    close();
  };
  let no = () => {
    $result = false;
    dispatch('submit', {
      result: false,
    });
    close();
  };
</script>

<template lang='pug'>
  div.modal.rounded-8
    div.p16.border-bottom
      div.title.bold.fs16.text-center(class:mb8!='{title && message}') {title}
      +if('message')
        p.text-center.white-space-pre-wrap.word-break-word.m0 {message}
    div.f
      button.bg-transparent.border-none.f.fh.s-full.p16.cursor-pointer(on:click!='{no}') No
      button.bg-transparent.border-none.f.fh.s-full.p16.cursor-pointer.border-left(on:click!='{yes}') YES
</template>

<style lang='less'>
  .modal {
    min-width: 300px;
    max-width: 90vw;
    width: 340px;
    background-color: rgba(255, 255, 255, 0.90);
    color: #222222;
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
  .border-none {
    border: none;
  }
  .border-left {
    border-left: 1px solid rgba(0, 0, 0, 0.1);
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
  .bg-transparent {
    background: transparent;
  }
  .cursor-pointer {
    cursor: pointer;
  }
</style>