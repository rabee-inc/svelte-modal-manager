<svelte:options accessors={true}/>

<script>
  import { onDestroy, createEventDispatcher, setContext } from 'svelte';
  import { CONTEXT_KEY } from './index.js';
  import { writable } from 'svelte/store';
  import { fade, fly } from 'svelte/transition';
  export const result = writable();
  export const isClosed = writable(false);
  export const dispatch = createEventDispatcher();

  /**
   * @template T
   * @type {import('./types').ModalContext<T>}
   */
  export const MODAL_CONTEXT = {
    close: () => close(),
    awaitClose: () => awaitClose(),
    isClosed,
    result,
    dispatch,
  };

  setContext(CONTEXT_KEY, MODAL_CONTEXT);

  export let component;
  export let position = { x: 'center', y: 'middle' };
  /** @type {any} */
  export let transition = {
    type: fly,
    props: {
      y: 64, duration: 256
    }
  };
  export let overlay = {
    styles: {
      background: 'rgba(0,0,0,0.75)',
    }
  };
  let transition_type = transition.type;

  /** @type {HTMLDivElement | null} */
  export let modalElement = null;
  export let dismissible = true;

  /** @template T
   * @type {import('./types').ModalComponent<T> | null}
   */
  export let modal = null;
  /** @type {import('./types').ModalConstructorProps<{[K in string]: any}>} */
  export let props;
  export let visible = false; // 初期は非表示
  /** @type {() => void} */
  export let destroy;

  /** @type {HTMLDivElement | null} */
  export let root = null;

  const onOpened = () => {
    dispatch('opened');
  };

  export const close = () => {
    if ($isClosed) return $result;
    isClosed.set(true);

    visible = false;

    dispatch('close', { result: $result });

    _closeResolve($result);
    return $result;
  };

  let _closeResolve;
  let _closePromise = new Promise((resolve) => {
    _closeResolve = resolve;
  });

  export const awaitClose = () => {
    return _closePromise;
  };

  const getPositionClass = () => {
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

<!-- svelte-ignore a11y-click-events-have-key-events -->
<template lang='pug'>
  div.f.s-full.scroll-stopper(bind:this='{root}', class='{getPositionClass()}', on:click!='{dismissible !== false && close}')
    +if('visible')
      //- overlay
      div.absolute.trbl0.overlay(style='background-color: {overlay.styles.background}', transition:fade='{{duration: 128}}')
      //- modal
      div.relative(
        bind:this='{modalElement}',
        tabindex='-1',
        transition:transition_type='{transition.props}',
        on:click|stopPropagation,
        on:introend!='{onOpened}',
        on:outroend!='{destroy}'
      ).
        <!-- memo: pug だと変数展開部分で npm run package した歳にエラーがでる -->
        <svelte:component bind:this='{modal}' this='{component}' {...props} />
</template>

<style lang='less'>
  .scroll-stopper {
    visibility: visible;
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