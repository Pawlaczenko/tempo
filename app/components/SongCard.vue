<script lang="ts" setup>
import type { SongSummary } from '#shared/types'

const props = defineProps<{ song: SongSummary }>()

const duration = computed(() => {
  const m = Math.floor(props.song.duration / 60)
  const s = Math.round(props.song.duration % 60)
  return `${m}:${String(s).padStart(2, '0')}`
})

const coverLetter = computed(() => props.song.track.trim().charAt(0).toUpperCase() || '?')
const coverGradients = [
  'linear-gradient(135deg, #f7a58b, #b44f78)',
  'linear-gradient(135deg, #83c5be, #377f91)',
  'linear-gradient(135deg, #c3a6e8, #7055a1)',
  'linear-gradient(135deg, #f2c879, #db795e)',
  'linear-gradient(135deg, #87a8e8, #514c8f)',
  'linear-gradient(135deg, #a4c985, #4f876d)',
]
const coverStyle = computed(() => ({
  '--cover-gradient': coverGradients[Math.abs(props.song.id) % coverGradients.length],
}))
</script>

<template>
  <NuxtLink :to="`/play/${song.id}`" class="song-card">
    <span class="song-card__cover" :style="coverStyle" aria-hidden="true">
      {{ coverLetter }}
    </span>
    <div class="song-card__info">
      <strong>{{ song.track }}</strong>
      <span>{{ song.artist }} · {{ duration }}</span>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.song-card {
  display: flex;
  align-items: center;
  gap: 1.6rem;
  min-width: 0;
  height: 100%;
  padding: 1.4rem;
  color: inherit;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 1.4rem;
  box-shadow: var(--shadow-light);
  transition: transform 160ms ease, box-shadow 160ms ease, background-color 160ms ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    background: var(--color-white);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.09);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 3px;
  }

  &__cover {
    display: grid;
    place-items: center;
    flex: 0 0 6.4rem;
    width: 6.4rem;
    aspect-ratio: 1;
    overflow: hidden;
    color: rgba(255, 255, 255, 0.95);
    background: var(--cover-gradient);
    border-radius: 0.9rem;
    font-size: 2.8rem;
    font-weight: 700;
    line-height: 1;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.18);
  }

  &__info {
    display: grid;
    gap: 0.2rem;
    min-width: 0;

    // strong,
    span,
    small {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    strong {
      font-size: 1.6rem;
      line-height: 1.3;
    }

    span {
      color: var(--color-text-light);
      font-size: 1.4rem;
    }

    small {
      color: var(--color-text-light);
      font-size: 1.2rem;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .song-card {
    transition: none;
  }
}
</style>