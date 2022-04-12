<script context="module">
  // export async function load({fetch}) {
  //   let res = await fetch('https://jsonplaceholder.typicode.com/posts');
  //   let json = await res.json();

  //   return {
  //     props: {
  //       posts: json,
  //     }
  //   };
  // }
</script>
<script>
  import { onMount } from 'svelte';
  import { openModal, alert, confirm, prompt, indicator, toast } from '$lib/index';
  import Post from '$components/items/Post.svelte';
  // export let posts = [];
  let buttons = [
    {
      label: 'Alert',
      action: async () => {
        let modal = openModal('alert', {
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
        let modal = openModal('confirm', {
          title: `Do you like programming?`,
          message: 'あなたはプログラミングが好きですか？',
        });

        modal.$on('close', () => {
          console.log('modal: close');
        });
        modal.$on('submit', (e) => {
          console.log('modal: submit');
          
          let {value} = e.detail;
          openModal('alert', {
            title: 'message',
            message: value ? `I'm happy. I love too.` : `It's a little disappointing.`,
          });
        });
      },
    },
    {
      label: 'Prompt',
      action: async () => {
        let modal = openModal('prompt', {
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
          openModal('alert', {
            title: 'message',
            message: `Oh, I also like "${value}".`,
          });
        });

        let result = await modal.awaitClose();
        console.log('awaitClose test', result);
      },
    },
    {
      label: 'SideMenu',
      action: () => {
        let modal = openModal('sidemenu', {
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
      label: 'alert',
      async action() {
        await alert('shorthand alert');
        console.log('closed');
      },
    },
    {
      label: 'confirm',
      async action() {
        let value = await confirm('shorthand confirm');
        console.log(`closed: ${value}`);
      },
    },
    {
      label: 'prompt',
      async action() {
        let value = await prompt('shorthand prompt');
        console.log(`closed: ${value}`);
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
      label: 'dismissible',
      async action() {
        let value = await prompt('絶対に答えてね', {
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
      label: 'Toast',
      async action() {
        let modal = openModal('toast', {
          message: 'toast',
          timeout: 2000,
        });
      },
    },
    {
      label: 'toast',
      async action() {
        await toast('shorthand toast', { 
          timeout: 2000,
        });
      },
    },
  ];

  onMount(() => {
    // prompt('あなたはプログラミングが好きですか？', {
    //   title: '質問です',
    // });
  });


</script>

<template lang='pug'>
  main.container-640.px16.py32
    div.f.fclm.fm.mb36
      h1.ts-large.mb4 svelte-modal-manager demo
    +each('buttons as button')
      div.mb16
        button(on:click='{button.action}') {button.label}
</template>
