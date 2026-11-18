<template>
  <div class="about_page">
    <div class="about_page__content">
      <h1 class="">
        About <mark>Tempo</mark>
      </h1>
      <p class="text-xl decorated">
        Tempo turns the lyrics you love into a typing test. Search by song title, artist, or album, choose a track, and see how quickly—and accurately—you can type it.
      </p>
      <p class="text-xl decorated">
        Type the lyrics as quickly as you can. Five keystrokes count as one word, and every misspelled character counts as one error. Your words-per-minute (WPM) score is calculated using this equation:
      </p>
      <figure class="about_page__equation">
        <img :src="equation" alt="Tempo WPM calculation">
      </figure>
      <p class="text-xl decorated">
        The Song of the Day gives you a fresh challenge every day. Come back to discover and test yourself with a different song.
      </p>
      <p class="text-xl decorated">
        Tempo works best on a desktop or laptop with a physical keyboard. Typing-test accuracy can be difficult to maintain on a mobile device.
      </p>
      <SiteButton class="" :variant="'secondary'">
        Try the Song of the Day
        <Icon name="lucide:audio-waveform" class="song-searchbar__icon" aria-hidden="true" />
      </SiteButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import equation from '~/assets/images/equation.png'
</script>

<style scoped lang="scss">
  .about_page {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;

    h1 {
      margin-bottom: 2.4rem;
    }

    .about_page__content > * {
      animation: fade-in 0.3s ease-in-out backwards;

      &:nth-child(1) { animation-delay: 0s; }
      &:nth-child(2) { animation-delay: 0.05s; }
      &:nth-child(3) { animation-delay: 0.1s; }
      &:nth-child(4) { animation-delay: 0.15s; }
    }

    .about_page__content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 1rem;
      height: 100%;
    }

    .about_page__equation {
      width: 60%;
      display: flex;
      align-items:center;
      justify-content: center;
      margin: 2.4rem auto;

      img {
        width: 100%;
        height: auto;
      }
    }

    button {
      margin-top: 2.4rem;
    }

  }

</style>