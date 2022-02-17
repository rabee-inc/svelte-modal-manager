<script context="module">
  import ModalContainer from "./ModalContainer.svelte"

  let _modal = null;
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
        props,
        destory: () => {
          // インタンスを削除
          instance.$destroy();
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

    // modal を実際に表示
    instance.visible = true;

    // 後ろに影響がでないよう stopPropagation を追加する
    instance.modalElement.addEventListener('click', e => e.stopPropagation());

    // false 以外の場合は背景を close すると閉じる
    if (props.dismissible !== false) {
      $elm.addEventListener('click', instance.close);
    }

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
  import {onMount, onDestroy} from 'svelte';
  let root;

  $: {
    _modal = root;
  }

</script>

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
