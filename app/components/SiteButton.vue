<template>
	<button :class="['btn', `btn--${props.variant}`]">
		<slot />
	</button>
</template>

<script lang="ts" setup>
type ButtonVariant = 'primary' | 'secondary' | 'transparent'
interface ButtonProps {
	variant?: ButtonVariant
}

const props = withDefaults(defineProps<ButtonProps>(), {
	variant: 'primary'
});
</script>

<style></style>