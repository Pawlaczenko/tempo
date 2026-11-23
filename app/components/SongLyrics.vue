<template>
  <div class="song-lyrics">
    <div v-for="(line, li) in lines" :key="li" class="song-lyrics__line">
      <span v-for="(word, wi) in line" :key="wi">
        <span
          v-for="letter in word"
          :key="letter.index"
          class="letter"
          :class="{
            'letter-idle': letter.index >= cursor,
            'letter-active': letter.index === cursor,
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
  const props = defineProps<{ lyrics: string }>();

  interface Letter { char: string; index: number }

  const lines = computed<Letter[][][]>(() => {
    let i = 0
    return props.lyrics.split('\n').map(line => [
      ...line.trim().split(' ').map(word =>
        [...(word + ' ')].map(char => ({ char, index: i++ }))
      ),
      [{ char: '\n', index: i++ }],
    ])
  })

  const cursor = ref(0);

  onMounted(() => {
    console.log(lines);
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

      &-idle {
        color: rgba(0, 0, 0, 0.6);
      }
      &-correct {
        color: var(--color-correct);
      }
      &--wrong {
        color: var(--color-warning);
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