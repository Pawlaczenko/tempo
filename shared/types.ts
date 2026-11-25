export interface LrclibTrack {
  id: number
  trackName: string
  artistName: string
  albumName: string
  duration: number
  instrumental: boolean
  plainLyrics: string | null
  syncedLyrics: string | null
}

export interface SongSummary {
  id: number
  track: string
  artist: string
  album: string
  duration: number
}

export interface SongLyrics extends SongSummary {
  lyrics: string
}

// shared/types
export type Status = 'idle' | 'correct' | 'wrong'
export interface Letter { char: string; index: number }