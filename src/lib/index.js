// components
export { default as ModalManager } from './ModalManager.svelte';
import ModalManager from './ModalManager.svelte';
import ModalContainer from './ModalContainer.svelte';


// 
let _modalManager = null;
let _components = {};

// モーダルコンポーネントを登録
export function registerModalComponent(key, component) {
  _components[key] = component;
};

// モーダルを開く
export function openModal(component, props = {}) {
  // 初回のみ ModalManager を生成
  if (!_modalManager) {
    _modalManager = new ModalManager({
      target: document.body,
      props: {

      }
    });
  }

  // 文字列だった場合は登録していあるモーダルからコンポーネントを取得
  if (typeof component === 'string') {
    component = _components[component];
  }

  let modal = _modalManager.open(component, props);
  return modal;
};


// register
import * as Alert from './modals/Alert.svelte';
import * as Confirm from './modals/Confirm.svelte';
import * as Prompt from './modals/Prompt.svelte';
import * as Indicator from './modals/Indicator.svelte';
import * as SideMenu from './modals/SideMenu.svelte';
import * as Auth from './modals/Auth.svelte';

registerModalComponent('alert', Alert);
registerModalComponent('confirm', Confirm);
registerModalComponent('prompt', Prompt);
registerModalComponent('indicator', Indicator);
registerModalComponent('sidemenu', SideMenu);
registerModalComponent('auth', Auth);


// shorthand
export function alert(message, props) {
  let modal = openModal('alert', {
    message,
    ...props,
  });

  return modal.awaitClose();
};

export function confirm(message, props) {
  let modal = openModal('confirm', {
    message,
    ...props,
  });

  return modal.awaitClose();
};

export function prompt(message, props) {
  let modal = openModal('prompt', {
    message,
    ...props,
  });

  return modal.awaitClose();
};

export function indicator(props) {
  let modal = openModal('indicator', props);

  return modal;
};
