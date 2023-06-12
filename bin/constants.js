const TEMPLATE_SCRIPT = `<svelte:options accessors={true}/>
<script context="module">
  /** @type {import('@rabee-org/svelte-modal-manager/types').ModalDefaultOptions} */
  export const { dismissible, position, focus, transition, overlay, timeout } = {
    // dismissible: false,
    // position: { x: 'center', y: 'middle' },
    // focus: false,
    // transition: {
    //   type: fly,
    //   props: {
    //     y: 8,
    //     duration: 256,
    //   },
    // },
    // overlay: {
    //   styles: {
    //     background: 'rgba(0, 0, 0, 0.75)',
    //   },
    // },
    // timeout: 2000,
  };
</script>

<script>
  import { getModalContext } from '@rabee-org/svelte-modal-manager';
  
  const { close, awaitClose, result, isClosed, dispatch } = getModalContext();

  
</script>
`;

export const getStyleTemplate = (lang = '') => `<style${(lang === 'css' || !lang) ? '' : ` lang="${lang}"`}>
  .modal {
    min-width: 300px;
    max-width: 90vw;
    width: 340px;
    background-color: rgba(255, 255, 255, 0.90);
    border-radius: 8px;
  }
</style>
`;


const TEMPLATE_MARKUP_PUG = `<template lang="pug">
  div.modal
</template>
`;

const TEMPLATE_MARKUP_HTML = `<div class="modal">
</div>
`;

const TEMPLATE_MARKUP = {
  pug: TEMPLATE_MARKUP_PUG,
  html: TEMPLATE_MARKUP_HTML,
};

export const getTemplate = ({ template = 'html', style = '' } = {}) => {
  return [
    TEMPLATE_SCRIPT,
    TEMPLATE_MARKUP[template],
    getStyleTemplate(style),
  ].join('\n');
};
