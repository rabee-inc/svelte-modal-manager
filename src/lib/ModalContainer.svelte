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
  export let visible = false; // 初期は非表示
  export let destory;

  let root;
  let timer;

  onMount(() => {
    // デフォルトで modal の枠に focus しておく (ボタン連打等の対策)
    root.tabIndex = '-1';
    root.focus();

    // modal呼ぶ側でtimeoutに秒数を指定した場合にsetTimuoutを実行する
    if(props.timeout) {
      timer = setTimeout(() => {
        timer = null;
        close();
      }, props.timeout);
    }
  });

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

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    
    if (modal.dispatch) {
      modal.dispatch('close');
    }

    _closeResolve(modal.value);
  };

  let _closeResolve;
  let _closePromise = new Promise((resolve) => {
    _closeResolve = resolve;
  });

  let awaitClose = () => {
    return _closePromise;
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
  div.f.s-full.scroll-stopper(bind:this='{root}', class='{getPostionClass()}', on:click!='{props.dismissible !== false && close}')
    +if('visible')
      //- overlay
      div.absolute.trbl0.overlay(style='background-color: {overlay.styles.background}', transition:fade='{{duration: 128}}')
      //- modal
      div.relative(bind:this='{modalElement}', transition:transition_type='{transition.props}', on:click|stopPropagation, on:introstart!='{create}', on:outroend!='{destory}').
        <!-- memo: pug だと変数展開部分で npm run package した歳にエラーがでる -->
        <svelte:component bind:this='{modal}' this='{component}' close='{close}' awaitClose='{awaitClose}' {...props} />
</template>

<style lang='less'>
  .scroll-stopper {
    overscroll-behavior: contain;
    overflow-y: scroll;
    //- scrollbar を消す
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    .overlay {
      //- scroll を止めるために 1px 大きくする
      height: calc(100vh + 1px);
    }
  }

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
  .ft {
    align-items: flex-start;
  }
  .fm {
    align-items: center;
  }
  .fb {
    align-items: flex-end;
  }
  .fl {
    justify-content: flex-start;
  }
  .fc {
    justify-content: center;
  }
  .fr {
    justify-content: flex-end;
  }
</style>