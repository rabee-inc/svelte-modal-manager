<script context="module">
  import api from '$lib/scripts/api.js';

  export async function load({params, fetch, session}) {
    api.setFetch(fetch);
    return {};
  }
</script>

<script>
  import config from '$lib/config.js';

  import dayjs from "dayjs";
  import relativeTime from 'dayjs/plugin/relativeTime.js';
  dayjs.extend(relativeTime);

  import '../app.css';
  import '/static/icons/icons.css';
</script>

<style lang="less">
  :global {
    @import '../lib/styles/global.less';
  }
</style>

<svelte:head>
  <!-- gtm -->
  {#if config.google.gtm.id}
    {@html `
    <script>
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${config.google.gtm.id}');
    </script>
    `}
  {/if}

  <!-- 広告 -->
  {#if config.google.ads.id}
    <script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={config.google.ads.id}' crossorigin="anonymous"></script>
  {/if}
</svelte:head>

<template lang="pug">
  div.f.fclm.w-full.min-h-full
    div.s-full
      slot
</template>
