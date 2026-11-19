import type { LrclibTrack, SongLyrics } from '#shared/types'

export default defineCachedEventHandler(async (event): Promise<SongLyrics> => {
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id) || id <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid song id' })
  }

  const data = await lrclibFetch<LrclibTrack>(event, `/api/get/${id}`)

  if (data.instrumental || !data.plainLyrics) {
    throw createError({ statusCode: 404, statusMessage: 'No lyrics for this track' })
  }

  return {
    id: data.id,
    track: data.trackName,
    artist: data.artistName,
    album: data.albumName,
    duration: data.duration,
    lyrics: normalizeLyrics(data.plainLyrics),
  }
}, {
  maxAge: 60 * 60 * 24 * 7, // tekst się praktycznie nie zmienia, tydzień
  getKey: event => `lyrics:${getRouterParam(event, 'id')}`,
})