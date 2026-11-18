<template>
    <form class="song-searchbar" @submit.prevent="handleSearch">
        <div class="song-searchbar__input">
            <input v-model="searchQuery" type="text" name="search" placeholder="Search for a song..." >
            <Icon name="lucide:search" class="song-searchbar__icon" aria-hidden="true" />
        </div>
    </form>
</template>

<script lang="ts" setup>
    const searchQuery = ref('');

    const handleSearch = () => {
        console.log('Searching for:', searchQuery.value);
    };
</script>

<style scoped lang="scss">
    .song-searchbar {
        display: flex;
        align-items: center;
        justify-content: center;
    
        &__input {
            width: 100%;
            position: relative;

            .song-searchbar__icon {
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

                &:focus {
                    outline: none;
                    border-color: var(--color-primary);

                    & + .song-searchbar__icon {
                        color: var(--color-primary);
                    }
                }
            }
        }
    }
</style>