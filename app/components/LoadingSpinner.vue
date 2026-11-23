<template>
  <div class="loading-spinner">
    <Icon name="lucide:music" aria-hidden="true" />
    <Icon name="lucide:music" aria-hidden="true" />
    <Icon name="lucide:music" aria-hidden="true" />
  </div>
</template>

<script lang="ts" setup>

</script>

<style>
  .loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    font-size: 2rem;
    color: var(--color-primary);

    & > * {
      animation: bounce 1.4s infinite ease-in-out both;

      &:nth-child(2) { animation-delay: 0.2s; }
      &:nth-child(3) { animation-delay: 0.4s; }
    }
  }

  @keyframes bounce {
    0%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-0.5rem);
    }
  }
</style>