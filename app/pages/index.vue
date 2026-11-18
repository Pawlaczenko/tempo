<template>
  <div class="main_page">
    <h1 class="text-center">
      Test your <mark>typing</mark> speed<br>
      with your <mark>favorite songs</mark>
    </h1>
    <div class="main_page__searchbar">
      <SongSearchbar />
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