# Обучение Vue 3

Добро пожаловать в мой персональный проект для изучения Vue 3. Этот репозиторий создан для практики и закрепления знаний. Здесь я буду последовательно осваивать различные возможности фреймворка, от основ до более продвинутых тем.

## План обучения (Содержание курса)

Этот план будет расширяться по мере прохождения материала. Порядок тем выстроен от простого к сложному.

### 1. Основы (Основы Vue)

- [ ] Создание проекта (Vite).
- [ ] Шаблоны (Templates) и интерполяция.
- [ ] Реактивность: `data()` и `methods`.
- [ ] Директивы: `v-bind`, `v-model`, `v-if`/`v-else`, `v-for`, `v-on`.
- [ ] Вычисляемые свойства (Computed properties) и наблюдатели (Watchers).
- [ ] Стилизация компонентов (Scoped CSS).
- [ ] Стилизация компонентов (Scoped CSS).

### 2. Композиция (Composition API)

- [ ] Знакомство с `<script setup>`.
- [ ] Реактивность: `ref()` и `reactive()`.
- [ ] Вычисляемые свойства: `computed()`.
- [ ] Наблюдатели: `watch()` и `watchEffect()`.
- [ ] Хуки жизненного цикла (Lifecycle Hooks) в Composition API.
- [ ] Создание переиспользуемой логики (Композаблы - Composables).

### 3. Компоненты и взаимодействие

- [ ] Создание и импорт компонентов.
- [ ] Передача данных в компонент (Props).
- [ ] Генерация событий из компонента (Emits).
- [ ] Слоты (Slots) для гибкой компоновки контента.
- [ ] Динамические компоненты (`<component :is="...">`).

### 4. Роутинг (Vue Router)

- [ ] Настройка маршрутов (routes).
- [ ] Навигация между страницами (`<router-link>`, `router.push`).
- [ ] Динамические сегменты маршрутов (параметры).
- [ ] Вложенные маршруты.
- [ ] Программная навигация и защита маршрутов (навигационные guards).

### 5. Управление состоянием (Pinia)

- [ ] Создание Store.
- [ ] State, Getters, Actions.
- [ ] Использование Store в компонентах.
- [ ] Persist state (сохранение состояния, например, в localStorage).

### 6. Работа с сервером (HTTP-запросы)

- [ ] Использование Fetch API.
- [ ] Использование Axios.
- [ ] Отображение загрузки (Loading states) и обработка ошибок.
- [ ] Отправка данных на сервер (POST, PUT, DELETE).

### 7. Продвинутые техники

- [ ] Миксины (Mixin) - для общего понимания, хотя сейчас чаще используют композаблы.
- [ ] Пользовательские директивы (Custom Directives).
- [ ] Provide / Inject (проброс данных через несколько уровней компонентов).
- [ ] Телепорты (Teleport) - для модальных окон и тултипов.

### 8. Оптимизация и продакшн

- [ ] Ленивая загрузка компонентов (Lazy loading) и маршрутов.
- [ ] Сборка проекта (Build) и деплой.
- [ ] Понимание виртуального DOM.

### 9. Итоговый проект

- [ ] Создание полноценного приложения с применением всех изученных технологий. (Здесь будет ссылка на итоговый проект или его краткое описание).

---

### 📦 UI Библиотека (Element Plus)

На протяжении всего курса мы будем использовать Element Plus для создания пользовательского интерфейса. Это позволит нам сосредоточиться на логике Vue, а не на написании CSS.

- [x] Интеграция Element Plus в проект (Vite-плагины, автоматический импорт).
- [x] Установка и подключение библиотеки иконок (`@element-plus/icons-vue`).
- [ ] Использование базовых компонентов: Button, Input, Container для создания лэйаута.
- [ ] Работа с формами: Form, FormItem, Input, Select, Radio, Checkbox.
- [ ] Отображение данных: Table, Tag, Badge.
- [ ] Обратная связь: Dialog, Message, Notification.
- [ ] Настройка темы (кастомизация цветов).

---

## Как я использую этот репозиторий

В каждой папке (или в отдельных коммитах) я буду фиксировать прогресс по пунктам плана. По мере изучения темы я буду отмечать соответствующий пункт как выполненный.

**Начало обучения: Март 2026**

# Создание проекта

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
