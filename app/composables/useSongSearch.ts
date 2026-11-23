export function useSongSearch() {
  const route = useRoute()

  const query = computed(() =>
    typeof route.query.q === 'string' ? route.query.q.trim() : '',
  )

  const search = (value: string) => {
    const q = value.trim()
    if (q.length < 2) return
    return navigateTo({ path: '/search', query: { q } })
  }

  return { query, search }
}