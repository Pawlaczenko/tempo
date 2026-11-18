<template>
  <div class="page">
    <BackgroundWave />
    <main class="app_container">
      <SiteHeader />
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
  .page {
    max-height: 100dvh;
    height: 100dvh;
    width: 100vw;
  }

  .app_container {
    --page-width: 175rem;
    --page-height: 81.5rem;
    --wrapper-radius: 2rem;

    width: min(91%, var(--page-width));
    height: min(91vh, var(--page-height));

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    overflow: hidden auto;
    background-color: var(--background-color);
    border-radius: var(--wrapper-radius);
    padding: 4rem 5.6rem;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    row-gap: 4.8rem;
  }
</style>