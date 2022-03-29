<script context="module">
  import ModalContainer from "./ModalContainer.svelte"

  let _modal = null;
  let _instances = [];
  let _components = {};

  export function openModal(component, props = {}) {
    // 文字列だった場合は登録していあるモーダルからコンポーネントを取得
    if (typeof component === 'string') {
      component = _components[component];
    }

    _modal.classList.remove('hide');
    let $elm = document.createElement('div');
    

    var instance = new ModalContainer({
      target: $elm,
      props: {
        component: component.default,
        position: component.position,
        transition: component.transition,
        overlay: component.overlay,
        props: {
          ...component.defaultProps,
          ...props,
        },
        destory: () => {
          // インタンスを削除
          instance.$destroy();
          // リストから削除
          let index = _instances.findIndex(item => item === instance);
          _instances.splice(index, 1);
          // DOM を削除
          $elm.parentNode.removeChild($elm);

          // すべてのモーダルがなくなったらモーダル自体を非表示に
          if (_modal.children.length <= 0) {
            _modal.classList.add('hide');
          }
        },
      }
    });

    _modal.appendChild($elm);
    
    // デフォルトで modal の枠に focus しておく (ボタン連打等の対策)
    $elm.tabIndex = '-1';
    $elm.focus();

    // リストに追加
    _instances.push(instance);

    // modal を実際に表示
    instance.visible = true;

    // modal instance を返す
    return instance.modal;
  };

  // モーダルコンポーネントを登録
  export function registerModalComponent(key, component) {
    _components[key] = component;
  };

  // // debug: 
  // if (globalThis) {
  //   globalThis.openModal = openModal;
  // }

</script>

<script>
  import {onMount, onDestroy, afterUpdate} from 'svelte';
  let root;

  afterUpdate(() => {
    _modal = root;
  });

  let onKeydown = (e) => {
    let current_instance = _instances[_instances.length-1];
    if (!current_instance) return ;

    // esc だったら close する
    if (current_instance.props.dismissible !== false && e.code === 'Escape') {
      current_instance.close();
    }
  };
</script>

<svelte:window on:keydown='{onKeydown}' />

<template lang='pug'>
  div.modal-wrapper.hide(bind:this='{root}')
</template>

<style lang='less'>
  .modal-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;

    :global {
      > * {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }

    &.hide {
      display: none;
    }
  }
</style>
