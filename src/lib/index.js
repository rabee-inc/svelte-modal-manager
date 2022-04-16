// components
export { default as ModalManager } from './ModalManager.svelte';
import ModalManager from './ModalManager.svelte';
import ModalContainer from './ModalContainer.svelte';


// 
let _modalManager = null;
let _instances = [];
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

  _modalManager.root.classList.remove('hide');
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
        if (_modalManager.root.children.length <= 0) {
          _modalManager.root.classList.add('hide');
        }
      },
    }
  });

  _modalManager.root.appendChild($elm);
  
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

// register
import * as Alert from './modals/Alert.svelte';
import * as Confirm from './modals/Confirm.svelte';
import * as Prompt from './modals/Prompt.svelte';
import * as SideMenu from './modals/SideMenu.svelte';
import * as Indicator from './modals/Indicator.svelte';

registerModalComponent('alert', Alert);
registerModalComponent('confirm', Confirm);
registerModalComponent('prompt', Prompt);
registerModalComponent('sidemenu', SideMenu);
registerModalComponent('indicator', Indicator);


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

  // return modal.awaitClose();
};

export function indicator(props) {
  let modal = openModal('indicator', props);

  return modal;
};
