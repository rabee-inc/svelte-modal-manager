// components
export { default as ModalManager, openModal, registerModalComponent } from './ModalManager.svelte';

import { registerModalComponent } from './ModalManager.svelte';
import * as Alert from './modals/Alert.svelte';
import * as SideMenu from './modals/SideMenu.svelte';

registerModalComponent('alert', Alert);
registerModalComponent('sidemenu', SideMenu);
