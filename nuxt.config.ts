// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@element-plus/nuxt"],

  elementPlus: {
    icon: "ElIcon",
    importStyle: "scss", // Включаем SCSS режим
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Ваш файл с переменными будет добавлен ко всем компонентам Element Plus
          additionalData: `@use "@/assets/scss/element-variables.scss" as *;`,
        },
      },
    },
  },

  css: [
    // Опционально: если нужны глобальные стили
    // '@/assets/scss/global.scss',
  ],
});
