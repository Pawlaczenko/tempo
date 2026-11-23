<script lang="ts" setup>
import type { SongSummary } from '#shared/types'

const route = useRoute()
const q = computed(() => (typeof route.query.q === 'string' ? route.query.q.trim() : ''))

const { data: songs, status, error } = await useAsyncData(
  () => `search:${q.value}`,
  () => q.value.length >= 2
    ? $fetch<SongSummary[]>('/api/songs/search', { query: { q: q.value } })
    : Promise.resolve([] as SongSummary[]),
  { watch: [q], default: () => [], lazy: true },
)

const errorMessage = computed(() =>
  error.value?.statusCode === 429
    ? 'Too many searches. Wait a moment and try again.'
    : 'Something went wrong. Try again.',
)


useSeoMeta({ title: () => (q.value ? `Search: ${q.value}` : 'Search') })
</script>

<template>
  <main class="search-page" :class="`search-page--${status}`">

    <p v-if="q.length < 2" class="search-page__message">Type a song title or an artist to start.</p>
    <LoadingSpinner v-else-if="status === 'pending'" />
    <p v-else-if="error" class="search-page__message">{{ errorMessage }}</p>
    <p v-else-if="!songs.length" class="search-page__message">No songs with lyrics found for "{{ q }}".</p>

    <ul v-else class="search-page__results">
      <li v-for="song in songs" :key="song.id">
        <SongCard :song="song" />
      </li>
    </ul>
  </main>
</template>
<style lang="scss" scoped>
.search-page {
  min-width: 0;
  width: 100%;

  &--pending {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__message {
    color: var(--color-text-light);
    text-align: center;
  }

  &__results {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 28rem), 1fr));
    gap: 1.6rem;
    list-style: none;
    padding: 0;
  }

  &__results li {
    min-width: 0;
  }
}
</style>