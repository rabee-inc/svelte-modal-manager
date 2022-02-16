<script context="module">
  export async function load({fetch}) {
    let res = await fetch('https://jsonplaceholder.typicode.com/posts');
    let json = await res.json();

    return {
      props: {
        posts: json,
      }
    };
  }
</script>
<script>
  import { onMount } from 'svelte';
  import { openModal } from '$lib/index';
  import Post from '$components/items/Post.svelte';
  export let posts = [];
  let buttons = [
    {
      label: 'Alert',
      action: () => {
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
      },
    },
    {
      label: 'Prompt',
      action: () => {
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
  ];

  onMount(() => {
    // setTimeout(() => {
    //   openModal('alert');
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
