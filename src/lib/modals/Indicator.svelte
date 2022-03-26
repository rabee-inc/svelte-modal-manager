<svelte:options accessors={true}/>

<script context="module">
  import { fly } from 'svelte/transition';

  export const defaultProps = {
    // デフォルトは解放できないようにする
    dismissible: false,
  };
</script>

<script>
  // svelte-ignore unused-export-let
  export let close;
  // svelte-ignore unused-export-let
  export let awaitClose;
</script>

<template lang='pug'>
  div.modal.f.fh
    div.animation-spin.
      <svg class='block' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M15 5.99995C15 4.92135 15.8941 3.94116 17.0889 4.04875C23.2066 4.59963 28 9.73944 28 15.9999C28 22.6274 22.6274 27.9999 16 27.9999C9.73949 27.9999 4.59967 23.2065 4.0488 17.0889C3.94121 15.8941 4.9214 14.9999 5.99999 14.9999C7.12934 14.9999 7.9399 15.9027 8.04871 16.8886C8.49012 20.8882 11.8823 23.9999 16 23.9999C20.4183 23.9999 24 20.4182 24 15.9999C24 11.8823 20.8883 8.49007 16.8887 8.04867C15.9027 7.93985 15 7.12929 15 5.99995ZM17.1005 6.05973C17.103 6.06012 17.1055 6.06045 17.1081 6.06074C22.11 6.61276 26 10.8514 26 15.9999C26 10.8492 22.1051 6.60706 17.1005 6.05973ZM6.05978 17.1005C6.33798 19.6443 7.57079 21.9014 9.3923 23.506C7.57307 21.9031 6.34121 19.649 6.06078 17.108C6.0605 17.1055 6.06017 17.103 6.05978 17.1005Z" fill="#aaaaaa"/>
      </svg>

</template>

<style lang='less'>
  .modal {
    min-width: 300px;
    max-width: 90vw;
    width: 340px;
  }

  .f {
    display: flex;
  }

  .fh {
    justify-content: center;
    align-items: center;
  }

  .block {
    display: block;
  }

  @keyframes modal-indicator-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .animation-spin {
    animation: modal-indicator-spin 1s infinite;
  }
  
</style>