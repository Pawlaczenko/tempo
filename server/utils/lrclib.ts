import type { H3Event } from 'h3'
import { $fetch as fetch } from 'ofetch'
import type { FetchError } from 'ofetch'

const BASE_URL = 'https://lrclib.net'

export async function lrclibFetch<T>(
  event: H3Event,
  path: string,
  query?: Record<string, string | number>,
): Promise<T> {
  const { lrclibAppId, lrclibApiKey } = useRuntimeConfig(event)

  const headers: Record<string, string> = {
    'User-Agent': 'Tempo/0.1 (https://github.com/Pawlaczenko/tempo)',
  }
  if (lrclibAppId && lrclibApiKey) {
    headers['Lrclib-App-Id'] = lrclibAppId
    headers['Lrclib-Api-Key'] = lrclibApiKey
  }

  try {
    return await fetch<T>(`${BASE_URL}${path}`, { query, headers, retry: 0 })
  } catch (err) {
    const e = err as FetchError
    const status = e.response?.status ?? 502

    // przy limicie przekaż dalej Retry-After
    const retryAfter = e.response?.headers.get('retry-after')
    if (retryAfter) setResponseHeader(event, 'Retry-After', Number(retryAfter))

    throw createError({
      statusCode: status,
      statusMessage: status === 404 ? 'Song not found' : 'Lyrics service error',
    })
  }
}