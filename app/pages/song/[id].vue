<template>
  <div>
    <LoadingSpinner v-if="status === 'pending'" />
    <p v-else-if="error" class="text-md">
      {{ errorMessage }}
    </p>
    <div v-else-if="song">
      <p class="text-md font-bold">
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

    const errorMessage = computed(() =>
    error.value?.status === 404
        ? 'Lyrics not found for this song.'
        : 'Could not load this song. Try again.',
    )

    const { lines, cursor, statuses, isFinished, onKeydown, reset } = useTypingGame(() => song.value?.lyrics ?? '')
    const lyricsRef = ref<{ focus: () => void }>();

</script>