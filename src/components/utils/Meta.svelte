<script>
  // ref: https://qiita.com/oekazuma/items/f7d0231387de96a5b162

  import config from '$lib/config.js';

  export let title = '';
  export let description = '';
  export let keywords = '';
  export let noindex = false;
  export let nofollow = false;
  export let image = config.head.ogp.image;

  let getTitle = () => {
    return title ? `${title} | ${config.name}` : config.head.title;
  };
  let getDescription = () => {
    return description ? description : config.head.description;
  };
  let getKeywords = () => {
    return keywords ? keywords : config.head.keywords;
  };
</script>

<svelte:head>
  <title>{getTitle()}</title>
  <meta name="description" content="{getDescription()}">

  {#if getKeywords()}
  <meta name=”keywords” content={getKeywords()}>
  {/if}



  {#if noindex}
    <meta name=”robots” content=”noindex”>
  {/if}
  {#if nofollow}
    <meta name=”robots” content=”nofollow”>
  {/if}

  <meta property="og:title" content="{getTitle()}">
  <meta property="og:description" content="{getDescription()}">

  {#if config.head.ogp.site_name}
    <meta property="og:site_name" content="{config.head.ogp.site_name}">
  {/if}
  {#if config.head.ogp.type}
    <meta property="og:type" content="{config.head.ogp.type}">
  {/if}
  {#if image}
    <meta property="og:image" content="{image}">
  {/if}

  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="{config.head.title}">
  {#if config.head.ogp.twitter.card}
  <meta name="twitter:card" content="{config.head.ogp.twitter.card}">
  {/if}
</svelte:head>
