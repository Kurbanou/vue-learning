[⬅️ На главную](./README.md) | [⚙️ Установка](./INSTALL.md) | [📋 План](./PLAN.md)

# Создание проекта.

```bash
npm create vue@latest # Создаем проект
cd vue-learning
npm install element-plus --save #Устанавливаем Element Plus
npm install -D unplugin-vue-components unplugin-auto-import #Настраиваем автоматический импорт (рекомендуемый способ)
npm install @element-plus/icons-vue #Добавляем иконки
npm install
npm run dev
```

## Настроить плагины в конфигурационном файле Vitevite.config.js

```js
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// 👇 1. Импортируем плагины
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // 👇 2. Добавляем плагины с резолвером для Element Plus
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```

## Откройте файл src/main.js и обновите его:

```js
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 👇 1. Импортируем все иконки
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

// 👇 2. Регистрируем все иконки глобально
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)

app.mount('#app')
```
