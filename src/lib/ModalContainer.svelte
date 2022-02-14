<svelte:options accessors={true}/>

<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  const dispatch = createEventDispatcher();

  export let component;
  export let position = { x: 'center', y: 'middle' };
  export let transition = {
    type: fly,
    props: {
      y:64, duration: 256
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
      //- modal
      div.relative(bind:this='{modalElement}', transition:transition_type='{transition.props}', on:introstart!='{create}', on:outroend!='{destory}')
        svelte:component(bind:this='{modal}', this='{component}', {...props}, close='{close}')
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
    display: flex;
  }
  .fl {
    justify-content: left;
  }
  .fc {
    justify-content: center;
  }
  .fr {
    justify-content: right;
  }
  .ft {
    align-items: top;
  }
  .fm {
    align-items: center;
  }
  .fb {
    align-items: bottom;
  }
</style>