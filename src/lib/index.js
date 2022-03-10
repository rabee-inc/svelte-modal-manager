// components
export { default as ModalManager, openModal, registerModalComponent } from './ModalManager.svelte';

import { openModal, registerModalComponent } from './ModalManager.svelte';
import * as Alert from './modals/Alert.svelte';
import * as Confirm from './modals/Confirm.svelte';
import * as Prompt from './modals/Prompt.svelte';
import * as SideMenu from './modals/SideMenu.svelte';

registerModalComponent('alert', Alert);
registerModalComponent('confirm', Confirm);
registerModalComponent('prompt', Prompt);
registerModalComponent('sidemenu', SideMenu);

export function alert(title, {message}={}) {
  let modal = openModal('alert', {
    title,
    message,
  });

  return modal.awaitClose();
};

export function confirm(title, {message}={}) {
  let modal = openModal('confirm', {
    title,
    message,
    value,
  });

  return new Promise(resolve => {
    modal.$on('submit', (e) => {
      resolve(e.detail.value);
    });
    modal.$on('close', (e) => {
      resolve(null);
    });
  });
};

export function prompt(title, {message, value}={}) {
  let modal = openModal('prompt', {
    title,
    message,
    value,
  });

  return new Promise(resolve => {
    modal.$on('submit', (e) => {
      resolve(e.detail.value);
    });
    modal.$on('close', (e) => {
      resolve(null);
    });
  });
};
