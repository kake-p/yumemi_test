// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  srcDir: 'app/',
  modules: ['@nuxt/eslint'],
  runtimeConfig: {
    public: {
      RESAS_API_KEY: process.env.RESAS_API_KEY,
      baseURL: process.env.BASE_URL,
    },
  },
})
