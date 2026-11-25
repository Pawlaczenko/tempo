<template>
  <div class="song-page">
    <LoadingSpinner v-if="status === 'pending'" />
    <p v-else-if="error" class="text-md">
      {{ errorMessage }}
    </p>
    <div v-else-if="song" class="song-page__content">
      <p class="song-page__title text-md font-bold">
        {{ song.track }} by {{ song.artist }}
      </p>
      <SongLyrics
        ref="lyricsRef"
        :lines="lines"
        :cursor="cursor"
        :statuses="statuses"
        @key="onKeydown" />
    </div>
    <p v-else class="text-md">Song not found.</p>
  </div>
</template>

<script lang="ts" setup>
    import type { SongLyrics } from '#shared/types'

    const route = useRoute()
    const songId = computed(() => route.params.id as string)

    const { data: song, status, error } = await useAsyncData(
        () => `song:${songId.value}`,
        () => $fetch<SongLyrics>(`/api/songs/${songId.value}`),
        { watch: [songId], default: () => null, lazy: true },
    )

    console.log(song.value)

    const errorMessage = computed(() =>
    error.value?.status === 404
        ? 'Lyrics not found for this song.'
        : 'Could not load this song. Try again.',
    )

    const { lines, cursor, statuses, isFinished, onKeydown, reset } = useTypingGame(() => song.value?.lyrics ?? '')
    const lyricsRef = ref<{ focus: () => void }>();

</script>

<style lang="scss" scoped>
.song-page {
  min-height: 0;
  height: 100%;

  &__content {
    display: flex;
    flex-direction: column;
    min-height: 0;
    height: 100%;
  }

  &__title {
    flex: none;
  }
}
</style>