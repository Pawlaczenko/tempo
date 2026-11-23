<template>
    <form class="song_searchbar" @submit.prevent="handleSearch">
        <div class="song_searchbar__input">
            <input 
                v-model="searchQuery" 
                type="text"
                name="search" 
                :class="{'default-placeholder' : !props.enableWordRotation}"
                placeholder="Search..." >
            <Icon name="lucide:search" class="song_searchbar__icon" aria-hidden="true" />
            <span v-if="props.enableWordRotation" class="song_searchbar__placeholder">
                Search for 
                <span class="word-stack">
                    <Transition name="word">
                        <span :key="currentWord" class="word">{{ currentWord }}</span>
                    </Transition>
                </span>
            </span>
        </div>
    </form>
</template>

<script lang="ts" setup>
    interface Props {
        enableWordRotation?: boolean;
    }

    const props = withDefaults(defineProps<Props>(), {
        enableWordRotation: false
    });

    const { query, search } = useSongSearch()
    
    const searchQuery = ref(query.value || '');

    watch(query, (value) => { searchQuery.value = value })

    const handleSearch = () => search(searchQuery.value)

    // ROTATING WORDS
    const currentWordIndex = ref(0);
    const ROTATION_SPEED = 2500; // 2.5 seconds
        
    const rotatingWords : string[] = ['a song', 'an artist', 'an album'];
    const currentWord = computed(() => rotatingWords[currentWordIndex.value]);

    onMounted(() => {
        if (props.enableWordRotation) {
            setInterval(() => {
                currentWordIndex.value = (currentWordIndex.value + 1) % rotatingWords.length;
            }, ROTATION_SPEED);
        }
    });
</script>

<style scoped lang="scss">
    .song_searchbar {
        display: flex;
        align-items: center;
        justify-content: center;
    
        &__input {
            width: 100%;
            position: relative;

            .song_searchbar__icon {
                position: absolute;
                top: 50%;
                left: 1.4rem;
                z-index: 1;
                width: 2rem;
                height: 2rem;
                transform: translateY(-50%);
                color: var(--color-grey-light);
                pointer-events: none;
            }

            input {
                width: 100%;
                padding: 1.2rem 2.8rem 1.2rem 4.4rem;
                font-size: 1.7rem;
                border: 2px solid var(--color-grey-light);
                border-radius: 2.4rem;
                transition: all 0.3s ease;
                font-weight: 500;

                &:not(.default-placeholder)::placeholder {
                    opacity: 0;
                }

                &:focus {
                    outline: none;
                    border-color: var(--color-primary);

                    & ~ .song_searchbar__icon {
                        color: var(--color-primary);
                    }

                    & ~ .song_searchbar__placeholder {
                        opacity: 0;
                    }
                }
            }

            .song_searchbar__placeholder {
                position: absolute;
                top: 50%;
                left: 4.6rem;
                transform: translateY(-50%);
                font-size: 1.7rem;
                color: var(--color-grey-dark);
                font-weight: 500;
                pointer-events: none;

                .word-stack {
                    display: inline-grid;
                    min-width: 6ch;
                }

                .word-stack > span {
                    grid-area: 1 / 1;
                    white-space: nowrap;
                }
            }
        }
    }

    .word-enter-active,
    .word-leave-active {
    transition: transform 220ms ease, opacity 220ms ease;
    }

    .word-enter-from {
    opacity: 0;
    transform: translateY(-0.45em);
    }

    .word-leave-to {
    opacity: 0;
    transform: translateY(0.45em);
    }
</style>