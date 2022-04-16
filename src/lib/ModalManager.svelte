<svelte:options accessors={true}/>

<script>
  import {onMount, onDestroy} from 'svelte';
  import ModalContainer from "./ModalContainer.svelte";

  let root;
  let _containers = [];

  // svelte-ignore unused-export-let
  export let open = (component, props = {}) => {
    root.classList.remove('hide');

    var container = new ModalContainer({
      target: root,
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
          container.$destroy();
          // リストから削除
          let index = _containers.findIndex(item => item === container);
          _containers.splice(index, 1);

          // すべてのモーダルがなくなったらモーダル自体を非表示に
          if (root.children.length <= 0) {
            root.classList.add('hide');
          }
        },
      }
    });

    // リストに追加
    _containers.push(container);

    // modal を実際に表示
    container.visible = true;

    // modal instance を返す
    return container.modal;
  };

  let onKeydown = (e) => {
    let current_instance = _containers[_containers.length-1];
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
