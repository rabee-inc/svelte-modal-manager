<svelte:options accessors={true}/>

<script>
  import { getModalContext } from '../index.js';
  
  const { close, awaitClose, result, isClosed, dispatch } = getModalContext();

  export let title = '';
  export let message = '';
  export let value = '';
  result.set('');

  let _value = value;

  let submit = () => {
    result.set(_value);
    dispatch('submit', {
      value: _value,
    });
    close();
  };

</script>

<template lang='pug'>
  form.modal.rounded-8(on:submit|preventDefault='{submit}')
    div.p16.border-bottom
      div.mb8
        div.title.bold.fs16.text-center(class:mb8!='{title && message}') {title}
        +if('message')
          p.text-center.white-space-pre-wrap.word-break-word {message}
      div.f
        // svelte-ignore a11y-autofocus
        input.s-full.p8.rounded-8.bg-white(bind:value='{_value}', type='text', autofocus)
    div.f
      button.bg-transparent.border-none.f.fh.s-full.p16.cursor-pointer(type='button', on:click!='{close}') Cancel
      button.bg-transparent.border-none.f.fh.s-full.p16.cursor-pointer.border-left OK
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
  .p8 {
    padding: 8px;
  }
  .p16 {
    padding: 16px;
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