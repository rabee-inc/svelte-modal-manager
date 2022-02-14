// components
export { default as ModalManager, openModal, registerModalComponent } from './ModalManager.svelte';

import { registerModalComponent } from './ModalManager.svelte';
import * as Alert from './modals/Alert.svelte';

registerModalComponent('alert', Alert);
