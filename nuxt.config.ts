export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/icon',
  ],

  // --- Style ---
  css: ['~/assets/scss/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
        additionalData: `
          @use "~/assets/scss/_animations.scss" as *;
          @use "~/assets/scss/_variables.scss" as *;
          @use "~/assets/scss/_mixins.scss" as *;
          @use "~/assets/scss/_reset.scss" as *;
          @use "~/assets/scss/_typography.scss" as *;
          @use "~/assets/scss/_buttons.scss" as *;
        `,
        },
      },
    },
  },

  // --- Obrazy ---
  image: {
    quality: 80,
    format: ['webp'],
  },

  // --- Fonty ---
  fonts: {
    families: [
      { name: 'Montserrat', provider: 'google', weights: [400, 500, 700] },
    ],
  },

  // --- Ikony ---
  icon: {
    clientBundle: { scan: true },
  },

  // --- Zmienne środowiskowe ---
  runtimeConfig: {
    lrclibAppId: '',
    lrclibApiKey: '',
    public: {
      siteUrl: 'http://localhost:3000',
    },
  },

  // --- Podstawowe meta ---
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Tempo',
      titleTemplate: '%s · Tempo',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Typing speed test using song lyrics.' },
        { name: 'theme-color', content: '#0f0f14' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.ico' },
      ],
    },
  },
})