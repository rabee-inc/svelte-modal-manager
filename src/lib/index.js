// components
export { default as ModalManager, openModal, registerModalComponent } from './ModalManager.svelte';

import { openModal, registerModalComponent } from './ModalManager.svelte';
import * as Alert from './modals/Alert.svelte';
import * as Confirm from './modals/Confirm.svelte';
import * as Prompt from './modals/Prompt.svelte';
import * as SideMenu from './modals/SideMenu.svelte';
import * as Indicator from './modals/Indicator.svelte';
import * as Toast from './modals/Toast.svelte';

registerModalComponent('alert', Alert);
registerModalComponent('confirm', Confirm);
registerModalComponent('prompt', Prompt);
registerModalComponent('sidemenu', SideMenu);
registerModalComponent('indicator', Indicator);
registerModalComponent('toast', Toast);

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

export function toast(message, props) {
  let modal = openModal('toast', {
    message,
    ...props,
  });

  return modal;
};
