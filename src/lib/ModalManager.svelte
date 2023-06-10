<svelte:options accessors={true}/>
<script context="module">
  /** @type {ProxyHandler<import('./types').ModalManagementItem<ModalContainer, any>>} */
  const MODAL_PROXY_HANDLER = {
    get: (target, prop) => {
      if (prop === 'isClosed' || prop === 'result') {
        return get(target.context[prop]);
      }
      if (prop === 'close' || prop === 'awaitClose') {
        return target.context[prop];
      }
      if (prop === '$on') {
        // @ts-ignore
        return (...args) => {
          // @ts-ignore
          const off = target.container?.$on(...args);
          return off || (() => {});
        }
      }
      if (!target.container?.modal) return ;
      // @ts-ignore
      return target.container.modal?.[prop];
    },
    set: (target, prop, value) => {
      if (!target.container?.modal) return true;
      // @ts-ignore
      target.container.modal[prop] = value;
      return true;
    },
  };  
</script>

<script>
  import {onMount, onDestroy} from 'svelte';
  import ModalContainer from "./ModalContainer.svelte";
  import { get } from 'svelte/store';

  /** @type {HTMLElement} */
  let root;

  /**
   * @typedef {{ manager: import('./types').ModalManagementItem<ModalContainer, any>, proxy: import('./types').ModalProxy<any, any> }} ProxyMapItem
   */

  /** @type {Map<Element | null | undefined, ProxyMapItem>} */
  let proxyMap = new Map();


  onDestroy(() => {
    closeAll(true);
  });

  /**
   * modal を開く
   * @template {import('./types').CreateModalControllerArgument} T
   * @param {T} module
   * @param {import('./types').ModalOpenProps<InstanceType<T["default"]>>} props
   */
  export const open = (module, props = {}) => {
    
    // /** @type {(keyof import('./types').ModalOpenOptions)[]} ModalOpenOptions のすべてのキーを含む必要があります */
    const ignore_keys = /** @type {const} */ (['transition', 'position', 'focus', 'timeout', 'dismissible', 'overlay']);

    /** @type {import('./types').Equals<ignore_keys[number], keyof import('./types').ModalOpenOptions>} */
    const __check = true;

    /** @type {import('./types').ModalProps<InstanceType<T["default"]>>} */
    const modal_props = {};
    Object.assign(modal_props, props);
    ignore_keys.forEach(key => {
      delete modal_props[key];
    });
    Object.assign(modal_props, props.props || {});

    const container = new ModalContainer({
      target: root,
      props: {
        component: module.default,
        transition: props.transition || module.transition,
        // @ts-ignore
        position: props.position ?? module.position,
        dismissible: props.dismissible ?? module.dismissible,
        overlay: module.overlay,
        props: {
          ...modal_props,
        },
        destroy: () => {
          // リストから削除
          proxyMap.delete(container.root);
          // インタンスを削除
          container.$destroy();
        },
      }
    });

    const manager = {
      container,
      dismissible: props.dismissible ?? module.dismissible,
      context: container.MODAL_CONTEXT,
    };

    const proxy = generateModalProxy(manager);

    proxyMap.set(container.root, { manager, proxy });

    // modal を実際に表示
    container.visible = true;

    const focus = props.focus ?? module.focus;
    // modal 内に focus がない場合は modal の枠にフォーカスする。
    if (focus !== false && !container?.modalElement?.contains(document.activeElement)) {
      container?.modalElement?.focus();
    }

    // modal呼ぶ側でtimeoutに秒数を指定した場合にsetTimeoutを実行する
    if (props.timeout) {
      setTimeout(() => {
        proxy.close();
      }, props.timeout);
    }

    // proxy を返す
    return proxy;
  };

  /**
   * 
   * @param {import('./types').ModalManagementItem<ModalContainer, any>} manager
   * @returns {import('./types').ModalProxy<any, any>}
   */
  const generateModalProxy = (manager) => {
    // @ts-ignore
    return new Proxy(manager, MODAL_PROXY_HANDLER);
  };

  const getCurrentProxy = () => {
    // 最後の要素を返す
    let current;
    for (const value of proxyMap.values()) {
      current = value;
    }
    return current;
  };

  export const getCurrent = () => {
    const proxy = getCurrentProxy();
    return proxy?.proxy;
  };

  export const closeAll = (force = false) => {
    for (const { proxy, manager } of [...proxyMap.values()]) {
      if (force || manager.dismissible !== false) {
        proxy.close();
      }
    }
  };

  const onKeydown = (e) => {
    // esc だったら close する
    if (e.code === 'Escape') {
      let current = getCurrentProxy();
      if (!current) return ;
      current.manager?.dismissible !== false && 
      current.proxy?.close();
    }
  };
</script>

<svelte:window on:keydown='{onKeydown}' />

<template lang='pug'>
  div.modal-manager(bind:this='{root}')
</template>

<style lang='less'>
  .modal-manager {
    transform: translate3d(0, 0, 0);
    visibility: hidden;
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
  }
</style>
