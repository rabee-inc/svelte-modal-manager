// components
export { default as ModalManager } from './ModalManager.svelte';
import ModalManager from './ModalManager.svelte';
import { getContext } from 'svelte';

export const CONTEXT_KEY = Symbol('modal');

/**
 * Modal コンポーネントで使用できるコンテキストを取得
 * @returns {import('./types').ModalContext<any>}
 */
export const getModalContext = () => {
  return getContext(CONTEXT_KEY);
};

/** @type {ModalManager | undefined} */
let _modalManager;

const getModalManager = () => {
  // 初回のみ ModalManager を生成
  if (!_modalManager) {
    _modalManager = new ModalManager({
      target: document.body,
      props: {

      }
    });
  }

  return _modalManager;
};

/**
 * @template {import('./types').CreateModalControllerArgument} T
 * @param {T} module
 * @param {import('./types').ModalOpenProps<InstanceType<T["default"]>>} props
 * @returns {import('./types').ModalProxy<InstanceType<T["default"]>, any>}
 */
export const openModal = (module, props = {}) => {
  return getModalManager().open(module, props);
};

/**
 * dismissible な modal を全て閉じる。
 * @param {boolean} force dismissible が false な modal でも強制的に閉じる
 */
export const closeAll = (force = false) => {
  getModalManager().closeAll(force);
};

/**
 * 開いているポップアップの中で最後のものを返します。
 * @returns {import('./types').ModalProxy<any, any> | undefined}
 */
export const getCurrentModal = () => {
  return getModalManager().getCurrent();
};

/**
 * ModalManager を破棄します。
 */
export const destroyModalManager = () => {
  if (_modalManager) {
    _modalManager.$destroy();
    _modalManager = undefined;
  }
};

/** @type {ProxyHandler<import('./types').ModalController<any, any>>} */
const MODAL_CONTROLLER_PROXY_HANDLER = {
  get(target, prop) {
    if (prop === 'open') {
      return target.open;
    }
    if (prop === 'openSync') {
      return target.openSync;
    }
    if (prop === 'static') {
      return target.static;
    }
    // @ts-ignore
    return target.static[prop];
  },
  set(target, prop, value) {
    // @ts-ignore
    target.static[prop] = value;
    return true;
  }
};

/**
 * module を openModal する関数を取得
 * @template {import('./types').CreateModalControllerArgument} T
 * @param {T} module 
 * @returns {import('./types').ModalControllerProxy<T, any>}
 */
export const createModalController = (module) => {
  /** @type {import('./types').ModalController<T, any>} */
  const controller = {
    static: module,
    // modal を開く
    open: (props = {}) => {
      return openModal(module, props);
    },
    // modal を開き、閉じるまで待つ
    openSync: (props = {}) => {
      return openModal(module, props).awaitClose();
    },
  };

  // @ts-ignore
  return new Proxy(controller, MODAL_CONTROLLER_PROXY_HANDLER);
};

// register
import * as Alert from './modals/Alert.svelte';
import * as Confirm from './modals/Confirm.svelte';
import * as Prompt from './modals/Prompt.svelte';
import * as Indicator from './modals/Indicator.svelte';
import * as SideMenu from './modals/SideMenu.svelte';
import * as Auth from './modals/Auth.svelte';


export const modalAlert = createModalController(Alert);
export const modalConfirm = createModalController(Confirm);
export const modalPrompt = createModalController(Prompt);
export const modalIndicator = createModalController(Indicator);

export const modalSideMenu = createModalController(SideMenu);
export const modalAuth = createModalController(Auth);
