<template>
  <header>
    <nav class="header_nav">
      <div class="header_nav__logo">
        <NuxtLink to="/" aria-label="Tempo home">
          <img :src="logo" alt="Tempo">
        </NuxtLink>
      </div>
      <div class="header_nav__menu">
        <ul>
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about">About</NuxtLink>
          </li>
        </ul>
      </div>
      <SongSearchbar />
    </nav>
  </header>
</template>

<script lang="ts" setup>
import logo from '~/assets/images/logo.png'
</script>

<style scoped lang="scss">
  
  .header_nav {

    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 2.4rem;

    &__logo {
      flex-shrink: 0;
      margin-right: auto;
      img {
        height: 4.4rem;
        width: auto;
      }
    }

    &__menu {
      margin-right: 2.4rem;
      ul {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 2.4rem;

        li {
          list-style: none;
        }

        a {
          text-decoration: none;
          color: black;
          font-size: 2rem;
          position: relative;
          transition: color 0.3s ease;

          &::before {
            content: "";
            display: block;
            position: absolute;
            left: 0;
            bottom: -0.4rem;
            width: 100%;
            height: 2px;
            background-color: var(--color-primary);
            transform: scaleX(0);
            transition: transform 0.3s ease;
          }

          &:hover,
          &.router-link-active {
            color: var(--color-primary);
            &::before {
              transform: scaleX(1);
            }
          }
        }
      }
    }
  }
</style>