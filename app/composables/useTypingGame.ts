import type { Letter, Status } from '#shared/types'

export const useTypingGame = function(lyrics: MaybeRefOrGetter<string>) {
  const lines = computed<Letter[][][]>(() => {
    let i = 0
    return toValue(lyrics).split('\n').map(line => [
      ...line.trim().split(' ').map((word, wordIndex, words) => {
        const suffix = wordIndex < words.length - 1 ? ' ' : ''
        return [...(word + suffix)].map(char => ({ char, index: i++ }));
      }
      ),
      [{ char: '\n', index: i++ }],
    ])
  })

  const chars = computed(() => lines.value.flat(2).map(l => l.char))
  const cursor = ref(0);
  const statuses = ref<Status[]>([]);

  const startedAt = ref<number | null>(null)
  const isFinished = computed(() => chars.value.length > 0 && cursor.value >= chars.value.length)

  const norm = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '');

  function onKeydown(e:KeyboardEvent) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    const isTypable = e.key.length === 1 || e.key === 'Enter' || e.key === 'Backspace';
    if (!isTypable) return

    e.preventDefault();
    if (isFinished.value) return;

    //handle backspace
    if (e.key === 'Backspace') {
      if (cursor.value > 0) {
        cursor.value--;
        statuses.value[cursor.value] = 'idle';
      }
      return
    }

    const typed = e.key === 'Enter' ? '\n' : e.key;
    const expected = chars.value[cursor.value]!;
    statuses.value[cursor.value] = norm(typed) === norm(expected) ? 'correct' : 'wrong';
    cursor.value++;
  }

  watch(chars, (c) => {
    statuses.value = Array(c.length).fill('idle');
    cursor.value = 0;
  }, { immediate: true })

  function reset() {
    cursor.value = 0;
    startedAt.value = null;
    statuses.value = Array(chars.value.length).fill('idle');
  }

  return { lines, cursor, statuses, isFinished, onKeydown, reset }
}