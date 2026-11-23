import type { LrclibTrack, SongSummary } from '#shared/types'

export default defineCachedEventHandler(async (event): Promise<SongSummary[]> => {
  const { q } = getQuery(event)
  const query = typeof q === 'string' ? q.trim() : ''

  if (query.length < 2 || query.length > 100) {
    throw createError({ statusCode: 400, statusMessage: 'Query must be 2-100 characters' })
  }

  const results = await lrclibFetch<LrclibTrack[]>(event, '/api/search', { q: query })

  const seen = new Set<string>()

  return results
    .filter(r => !r.instrumental && r.plainLyrics)
    .filter((r) => {
      const key = `${r.artistName}|${r.trackName}`.toLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .map(r => ({
      id: r.id,
      track: r.trackName,
      artist: r.artistName,
      album: r.albumName,
      duration: r.duration,
    }))
}, {
  maxAge: 60 * 60, // 1 godzina
  getKey: event => `search:${String(getQuery(event).q ?? '').trim().toLowerCase()}`,
})