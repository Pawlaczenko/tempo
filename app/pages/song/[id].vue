<template>
  <div>
    <LoadingSpinner v-if="status === 'pending'" />
    <div v-else>
        <p class="text-md font-bold">
            {{ song?.track }} by {{ song?.artist }}
        </p>
        <SongLyrics v-if="song" :lyrics="song.lyrics" />
    </div>
  </div>
</template>

<script lang="ts" setup>
    import type { SongLyrics } from '#shared/types'
    const route = useRoute();

    const songId = computed(() => route.params.id as string);
    const { data: song, status, error } = await useAsyncData(
        () => `song:${songId.value}`,
        () => $fetch<SongLyrics>(`/api/songs/${songId.value}`),
        { watch: [songId], default: () => null, lazy: true },
    );

    console.log('song', song);
    
</script>

<style>

</style>