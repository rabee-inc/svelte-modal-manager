# svelte-modal-manager

[![npm version](https://badge.fury.io/js/svelte-modal-manager.svg)](https://badge.fury.io/js/svelte-modal-manager)


svelte-modal-manager is ...

## Demo

- Live Demo: https://svelte-modal-manager.onrender.com
- REPL: https://svelte.dev/repl/65f83041cd2e4a0da0748088788c6674?version=3.47.0
## Install

```bash
npm install @rabee-org/svelte-modal-manager --save
```

## Usage

```html
<script>
  import { onMount } from 'svelte';
  import { modalAlert } from '@rabee-org/svelte-modal-manager';
  import { modalConfirm } from '$modal';

  onMount(async () => {
    let modal = modalAlert.open({
      title: 'Hello, svelte-modal-manager',
    });
    
    await modal.awaitClose();

    const ok = await modalConfirm.openSync('OK?');
  });
</script>
```

## License

MIT
