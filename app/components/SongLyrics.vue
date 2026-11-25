<template>
  <div 
    ref="root" 
    class="song-lyrics"
    :class="{'song-lyrics--blurred': !focused}"
    tabindex="0"
    role="textbox"
    aria-label="Type song lyrics here"
    @keydown="emit('key', $event)"
    @focus="focused = true"
    @blur="focused = false"
    >
    <div v-for="(line, li) in props.lines" :key="li" class="song-lyrics__line">
      <span v-for="(word, wi) in line" :key="wi">
        <span
          v-for="letter in word"
          :key="letter.index"
          class="letter"
          :class="{
            'letter-idle': letter.index >= props.cursor,
            'letter-active': letter.index === props.cursor,
            'letter-correct': props.statuses[letter.index] === 'correct',
            'letter-wrong': props.statuses[letter.index] === 'wrong',
          }"
        >
          <Icon
            v-if="letter.char === '\n'"
            name="lucide:corner-down-left"
            class="letter__enter"
            aria-hidden="true"
          />
          <template v-else>{{ letter.char }}</template>
        </span>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { Letter, Status } from '#shared/types'

  interface SongLyricsProps {
    lines: Letter[][][],
    cursor: number,
    statuses: Status[]
  }
  const props = defineProps<SongLyricsProps>();

  const emit = defineEmits<{key: [e: KeyboardEvent]}>();

  const root = ref<HTMLElement>();
  const focused = ref(false);

  defineExpose({focus: () => root.value?.focus({preventScroll: true})});

  onMounted(() => {
    root.value?.focus({preventScroll: true});
  });

  watch(() => props.cursor, async () => {
    await nextTick();
    root.value?.querySelector('.letter-active')?.scrollIntoView({block: 'center', behavior: 'smooth'});
  })

</script>

<style lang="scss" scoped>
  .song-lyrics {
    font-family: var(--font-family-secondary);
    font-size: 2rem;

    background: rgba(255, 255, 255, 0.72);
    padding: 1.4rem;
    border-radius: 1.4rem;
    margin-top: 1.6rem;

    position: relative;
    outline: none;
    &:focus-visible { box-shadow: 0 0 0 3px var(--color-primary, #4c9ffe); }

    &--blurred .song-lyrics__line { filter: blur(2px); }

    .letter {
      position: relative;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        height: 1px;
        width: 100%;
        background-color: black;
        opacity: 0;
      }

      &-correct {
        color: var(--color-correct);
      }
      &-wrong {
        color: var(--color-warning);
      }
      &-idle {
        color: rgba(0, 0, 0, 0.6);
      }
      &-active {
        &::after {
          opacity: 1;
          animation: underline 1s linear infinite;
        }
      }
      &.letter__enter {
        width: 1em;
        height: 1em;
        vertical-align: -0.125em;
      }
    }
    @keyframes underline {
      0% {
        opacity: .1;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: .1;
      }
    }
  }
</style>