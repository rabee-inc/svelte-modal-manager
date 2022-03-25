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

export function alert(message, {title}={}) {
  let modal = openModal('alert', {
    title,
    message,
  });

  return modal.awaitClose();
};

export function confirm(message, {title}={}) {
  let modal = openModal('confirm', {
    title,
    message,
  });

  return modal.awaitClose();
};

export function prompt(message, {title, value}={}) {
  let modal = openModal('prompt', {
    title,
    message,
    value,
  });

  return modal.awaitClose();
};
