<template>
  <div class="main_page">
    <h1 class="text-center">
      Test your <mark>typing</mark> speed<br>
      with your <mark>favorite songs</mark>
    </h1>
    <div class="main_page__searchbar">
      <SongSearchbar :enable-word-rotation="true" />
    </div>
    <span class="lead">
      or
    </span>
    <SiteButton class="" :variant="'secondary'">
      Try the song of the day
      <Icon name="lucide:audio-waveform" class="song-searchbar__icon" aria-hidden="true" />
    </SiteButton>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="scss">
  .main_page {

    & > * {
      animation: fade-in 0.3s ease-in-out backwards;

      &:nth-child(1) { animation-delay: 0s; }
      &:nth-child(2) { animation-delay: 0.05s; }
      &:nth-child(3) { animation-delay: 0.1s; }
      &:nth-child(4) { animation-delay: 0.15s; }
    }

    h1 {
      margin-bottom: 3rem;
    }

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    height: 100%;

    &__searchbar {
      width: 100%;
      max-width: 40rem;
    }
  }

</style>