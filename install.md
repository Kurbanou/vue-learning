[⬅️ На главную](./README.md) | [⚙️ Установка](./install.md) | [📋 План](./plan.md)

# Установка (Nuxt)

## Создание проекта Nuxt

```bash
npx nuxi init имя проекта     # Создаем проект
cd nuxt-learning
npm install                     # Устанавливаем зависимости
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
import { defineNuxtConfig } from "nuxt/config";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineNuxtConfig({
  vite: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
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
mkdir pages components layouts composables utils
touch pages/index.vue
touch components/MyButton.vue
touch layouts/default.vue
```

```text
my-app/
├── pages/                # Страницы (файловая маршрутизация)
│   ├── index.vue         # Главная страница (localhost:3000/)
│   ├── about.vue         # Страница /about
│   └── posts/
│       └── [id].vue      # Динамический роут /posts/1, /posts/2
├── components/           # Vue-компоненты
│   ├── Header.vue
│   ├── Footer.vue
│   └── Chat/
│       └── Message.vue
├── layouts/              # Макеты страниц
│   ├── default.vue       # Используется по умолчанию
│   └── admin.vue         # Для админки
├── composables/          # Автоматически импортируемые хуки (useState, useFetch и ваши)
│   └── useCounter.ts
├── utils/                # Вспомогательные функции
│   └── formatDate.ts
├── server/               # Серверная часть (API, middleware, routes)
│   └── api/
│       └── hello.get.ts  # API эндпоинт /api/hello
├── public/               # Статика (изображения, robots.txt)
│   └── images/
├── app.vue               # Корневой компонент (оставляем, но обычно пустой)
├── nuxt.config.ts        # Конфиг Nuxt
└── package.json
```
