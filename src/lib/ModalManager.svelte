<svelte:options accessors={true}/>

<script>
  import {onMount, onDestroy} from 'svelte';
  import ModalContainer from "./ModalContainer.svelte";

  let root;
  let _instances = [];

  // svelte-ignore unused-export-let
  export let open = (component, props = {}) => {
    root.classList.remove('hide');
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
          if (root.children.length <= 0) {
            root.classList.add('hide');
          }
        },
      }
    });

    root.appendChild($elm);

    // リストに追加
    _instances.push(instance);

    // modal を実際に表示
    instance.visible = true;

    // modal instance を返す
    return instance.modal;
  };

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
