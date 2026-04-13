[⬅️ На главную](./README.md) | [⚙️ Установка](./install.md) | [📋 План](./plan.md)

# Установка (Nuxt)

## Создание проекта Nuxt

```bash
npx nuxi init имя проекта     # Создаем проект
cd nuxt-learning
npm install                     # Устанавливаем зависимости
npm install element-plus @element-plus/icons-vue
mkdir -p app/components app/pages app/layouts app/plugins app/composables app/utils #Создание папок структуры
npm run dev                     # Запускаем проект

```

## Установка Element Plus

```bash
npm install element-plus
npm install @element-plus/icons-vue

```

### Создание плагина Element Plus

Создай файл:

/plugins/element-plus.client.ts
.client.ts - потому что Element Plus работает только на клиенте и это предотвращает SSR‑ошибки.

```js
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ElementPlus);

  // Регистрируем иконки глобально
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    nuxtApp.vueApp.component(key, component);
  }
});
```

### Автоимпорт Element Plus (опционально)

```bash
npm install -D unplugin-vue-components unplugin-auto-import
```

Добавь в корневой файл nuxt.config.ts

```js
// nuxt.config.ts
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  srcDir: "app/",
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // Другой способ настройки автоимпорта
  modules: ["@nuxt/devtools"],

  css: ["element-plus/dist/index.css"],

  build: {
    transpile: ["element-plus"],
  },
});
```

## Запуск проекта

```bash
npm run dev
```

## Структура проекта

```bash
# В терминале (из корня проекта):
# Перейти в папку проекта
cd app
# Теперь создавать структуру
mkdir pages components layouts composables utils
touch pages/index.vue
touch components/MyButton.vue
touch layouts/default.vue
```

```text
nuxt-learning/
├── .nuxt/
├── app/                 # <-- твоя srcDir папка
│   ├── components/
│   │   └── ElementTest.vue
│   ├── layouts/
│   │   └── default.vue
│   ├── pages/
│   │   └── index.vue
│   ├── plugins/
│   │   └── element-plus.client.ts
│   └── app.vue
├── node_modules/
├── public/
├── nuxt.config.ts
├── package.json
└── tsconfig.json
```

в nuxt.config.ts

```js
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "app/", // <-- ОБЯЗАТЕЛЬНО: это связывает конфиг с вашей папкой
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
});
```
