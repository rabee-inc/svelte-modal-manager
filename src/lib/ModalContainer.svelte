<svelte:options accessors={true}/>

<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  const dispatch = createEventDispatcher();

  export let component;
  export let position = { x: 'center', y: 'middle' };
  export let transition = {
    type: fly,
    props: {
      y:64, duration: 256
    }
  };
  export let overlay = {
    styles: {
      background: 'rgba(0,0,0,0.75)',
    }
  };
  let transition_type = transition.type;

  export let modalElement;
  export let modal;
  export let props;
  export let visible = false;
  export let destory;

  let create = () => {
    // trigger open evnet
    dispatch('open');

    if (modal.dispatch) {
      modal.dispatch('open');
    }
  };

  export let close = () => {
    visible = false;
    // trigger close evnet
    dispatch('close');

    if (modal.dispatch) {
      modal.dispatch('close');
    }
  };

  let getPostionClass = () => {
    let x = {
      'left': 'fl',
      'center': 'fc',
      'right': 'fr',
    }[position.x] || 'fc';

    let y = {
      'top': 'ft',
      'middle': 'fm',
      'bottom': 'fb',
    }[position.y] || 'fm';

    return [x, y].join(' ');
  };
</script>

<template lang='pug'>
  div.f.s-full(class='{getPostionClass()}')
    +if('visible')
      //- overlay
      div.absolute.trbl0(style='background-color: {overlay.styles.background}', transition:fade='{{duration: 128}}')
      //- modal
      div.relative(bind:this='{modalElement}', transition:transition_type='{transition.props}', on:introstart!='{create}', on:outroend!='{destory}').
        <!-- memo: pug だと変数展開部分で npm run package した歳にエラーがでる -->
        <svelte:component bind:this='{modal}' this='{component}' close='{close}' {...props} />
</template>

<style>
  .relative {
    position: relative;
  }
  .absolute {
    position: absolute;
  }
  .trbl0 {
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
  }
  .s-full {
    width: 100%;
    height: 100%;
  }
  .f {
    display: -webkit-flex;
    display: -moz-flex;
    display: flex;
  }
  .fc {
    -webkit-justify-content: center;
    -moz-justify-content: center;
    justify-content: center;
  }
  .fm {
    -webkit-align-items: center;
    -moz-align-items: center;
    align-items: center;
  }
  .ft {
    -webkit-align-items: flex-start;
    -moz-align-items: flex-start;
    align-items: flex-start;
  }
  .fr {
    -webkit-justify-content: flex-end;
    -moz-justify-content: flex-end;
    justify-content: flex-end;
  }
  .fb {
    -webkit-align-items: flex-end;
    -moz-align-items: flex-end;
    align-items: flex-end;
  }
  .fl {
    -webkit-justify-content: flex-start;
    -moz-justify-content: flex-start;
    justify-content: flex-start;
  }
</style>