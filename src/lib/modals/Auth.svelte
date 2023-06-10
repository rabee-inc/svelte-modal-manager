<svelte:options accessors={true}/>

<script>
  import { getModalContext } from '../index.js';

  const { close, awaitClose, result, isClosed, dispatch } = getModalContext();

  export let mode = 'signup';
  export let email = '';
  export let password = '';

  let submit = () => {
    const detail = {
      mode,
      email,
      password,
    };
    result.set(detail);
    dispatch('submit', detail);
  };
</script>

<template lang='pug'>
  form.modal.rounded-8.p16(on:submit|preventDefault='{submit}')
    +if('mode === "signup"')
      div.fs24.text-center.p16.mb16 Sign up

      div.f.mb16
        // svelte-ignore a11y-autofocus
        input.w-full.p8.rounded-8.bg-white(bind:value='{email}', type='email', placeholder='Email', required, autofocus)
      div.f.mb32
        input.w-full.p8.rounded-8.bg-white(bind:value='{password}', type='password', placeholder='Password', required)
      div.f.fh.mb32
        button.p16.w-full.bg-white.rounded-8.cursor-pointer.bold Sign up

      div.f.fh
        button.border-none.cursor-pointer(type='button', on:click!='{ () => mode = "signin" }') Sign in

    +if('mode === "signin"')
      div.fs24.text-center.p16.mb16 Sign in

      div.f.mb16
        // svelte-ignore a11y-autofocus
        input.w-full.p8.rounded-8.bg-white(bind:value='{email}', type='email', placeholder='Email', required, autofocus)
      div.f.mb32
        input.w-full.p8.rounded-8.bg-white(bind:value='{password}', type='password', placeholder='Password', required)
      div.f.fh.mb32
        button.p16.w-full.bg-white.rounded-8.cursor-pointer.bold Sign in
      
      div.f.fh
        button.border-none.cursor-pointer(type='button', on:click!='{ () => mode = "signup" }') Sign up

</template>

<style lang='less'>
  .modal {
    min-width: 300px;
    max-width: 90vw;
    width: 340px;
    background-color: rgba(255, 255, 255, 0.90);
    color: #222222;
  }
  .bg-white {
    background-color: white;
  }
  .bold {
    font-weight: bold;
  }
  .fs24 {
    font-size: 24px;
  }
  .text-center {
    text-align: center;
  }
  .p8 {
    padding: 8px;
  }
  .p16 {
    padding: 16px;
  }
  .mb16 {
    margin-bottom: 16px;
  }
  .mb32 {
    margin-bottom: 32px;
  }
  .rounded-8 {
    border-radius: 8px;
  }
  .f {
    display: flex;
  }
  .fh {
    justify-content: center;
    align-items: center;
  }
  .w-full {
    width: 100%;
  }
  .border-none {
    border: none;
  }
  .cursor-pointer {
    cursor: pointer;
  }
</style>