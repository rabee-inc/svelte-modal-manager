// components
export { default as ModalManager, openModal, registerModalComponent } from './ModalManager.svelte';

import { openModal, registerModalComponent } from './ModalManager.svelte';
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

export function indicator() {
  let modal = openModal('indicator');

  return modal;
};
