<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import Post from '$components/items/Post.svelte';
  import { modalAlert, modalAuth, modalConfirm, modalIndicator, modalPrompt, modalSideMenu } from '@rabee-org/svelte-modal-manager';

  const indicator = modalIndicator.open;

  /**
   * 
   * @param {string} message 
   * @param {Parameters<typeof modalAlert.openSync>[0]} [props] 
   * @returns 
   */
  function alert(message, props) {
    return modalAlert.openSync({ message, ...props });
  }

  // $: ({ posts } = $page.data);
  let buttons = [
    {
      label: 'Alert',
      action: async () => {
        let modal = modalAlert.open({
          title: 'svelte-modal demo',
          message: 'Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text ',
        });

        modal.$on('close', () => {
          console.log('modal: close');
        });
        modal.$on('submit', () => {
          console.log('modal: submit');
        });

        await modal.awaitClose();
        console.log('closed');
      },
    },
    {
      label: 'Confirm',
      action: () => {
        let modal = modalConfirm.open({
          title: `Do you like programming?`,
          message: 'あなたはプログラミングが好きですか？',
        });

        modal.$on('close', () => {
          console.log('modal: close');
        });
        modal.$on('submit', (e) => {
          console.log('modal: submit');
          
          let {value} = e.detail;
          modalAlert.open({
            title: 'message',
            message: value ? `I'm happy. I love too.` : `It's a little disappointing.`,
          });
        });
      },
    },
    {
      label: 'Prompt',
      action: async () => {
        let modal = modalPrompt.open({
          title: `What's your favorite food?`,
          message: 'あなたの好きな食べ物は何ですか？',
          value: 'banana',
        });

        modal.$on('close', () => {
          console.log('modal: close');
        });
        modal.$on('submit', (e) => {
          console.log('modal: submit');
          
          let {value} = e.detail;
          modalAlert.open({
            title: 'message',
            message: `Oh, I also like "${value}".`,
          });
        });

        let result = await modal.awaitClose();
        if (result) {
          console.log('awaitClose test', result);
        }
      },
    },
    {
      label: 'SideMenu',
      action: () => {
        let modal = modalSideMenu.open({
          title: 'svelte-modal demo',
          items: [
            { label: 'post 1', link: '/posts/1' },
            { label: 'post 2', link: '/posts/2' },
            { label: 'post 3', link: '/posts/3' },
            { label: 'post 4', link: '/posts/4' },
            { label: 'rabee.jp', link: 'https://rabee.jp' },
          ],
        });

        modal.$on('close', () => {
          console.log('modal: close');
        });
        modal.$on('submit', () => {
          console.log('modal: submit');
        });
      },
    },
    {
      label: 'auth(signup)',
      async action() {
        let modal = modalAuth.open({
          email: 'development@rabee.jp',
        });

        modal.$on('submit', ({detail}) => {
          console.log(detail);

          modal.close();
        });
      },
    },
    {
      label: 'auth(signin)',
      async action() {
        let modal = modalAuth.open({
          mode: 'signin',
          email: 'development@rabee.jp',
        });

        modal.$on('submit', ({detail}) => {
          console.log(detail);

          modal.close();
        });
      },
    },
    {
      label: 'indicator',
      async action() {
        let i = indicator({
          fill: 'skyblue',
        });

        setTimeout(() => {
          i.close();
        }, 2000);
      },
    },
    {
      label: 'indicator(timeout)',
      async action() {
        await modalIndicator.openSync({
          fill: 'skyblue',
          timeout: 2000,
        });
      },
    },
    {
      label: 'dismissible',
      async action() {
        let value = await modalPrompt.openSync({
          message: '絶対に答えてね',
          title: 'dismissible',
          dismissible: false,
        });
        console.log(`closed: ${value}`);
      },
    },
    {
      label: 'esc',
      async action() {
        alert('最後は ESC じゃ閉じられないよ', {dismissible:false});
        alert('ESC で閉じてね: 1');
        alert('ESC で閉じてね: 2');
        alert('ESC で閉じてね: 3');
      },
    },
    {
      label: 'timeout',
      async action() {
        let modal = modalAlert.open({
          title: '2秒後に閉じます',
          message: 'Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text ',
          timeout: 2000,
        });
      },
    },
  ];

  onMount(() => {
    // let modal = openModal('auth', {
    //   title: 'svelte modal',
    // });
  });


</script>

<template lang='pug'>
  main.container-640.px16.py32
    div.f.fclm.fm.mb36
      h1.ts-large.mb4 svelte-modal-manager demo
    +each('buttons as button')
      div.mb8
        button(on:click='{button.action}') {button.label}
    //- スクロールさせる用の要素
    div.h100vh
</template>

<style lang="less">
  .mb8 {
    margin-bottom: 8px;
  }
  .h100vh {
    height: 100vh;
  }
</style>