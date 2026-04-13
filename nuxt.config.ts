export default defineNuxtConfig({
  modules: ['@element-plus/nuxt'],
  elementPlus: {
    importStyle: 'css',
    icon: 'ElIcon'
  },
  // Это заставит Nuxt искать страницы в корневой /pages
  srcDir: './'
})
