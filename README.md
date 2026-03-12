# Обучение Vue 3

Добро пожаловать в мой персональный проект для изучения Vue 3. Этот репозиторий создан для практики и закрепления знаний. Здесь я буду последовательно осваивать различные возможности фреймворка, от основ до более продвинутых тем.

## План обучения (Содержание курса)

Этот план будет расширяться по мере прохождения материала. Порядок тем выстроен от простого к сложному.

### 1. Основы (Основы Vue)

- [x] Создание проекта (Vite).
- [x] Шаблоны (Templates) и интерполяция.
- [x] Реактивность: `ref()` и функции.
- [x] Директивы: `v-bind`, `v-if`/`v-else`, `v-on` (базово).
- [ ] Директивы: `v-model`, `v-for`.
- [ ] Вычисляемые свойства (Computed properties) и наблюдатели (Watchers).
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

# Урок: Директивы в Vue (v-bind, v-model, v-if/v-else, v-for, v-on)

## Краткая теория

### Директивы — это специальные атрибуты с префиксом v-, которые добавляют элементам реактивное поведение.

- v-bind : Связывает атрибут с данными :src="imageUrl" или - v-bind:src="imageUrl"
- v-model - Двустороннее связывание для форм v-model="username"
- v-on @ Слушает события DOM @click="handleClick"
- v-if - Условный рендеринг (удаляет элемент) v-if="isVisible"
- v-else - Иначе (должен идти сразу после v-if) v-else
- v-else-if - Дополнительное условие v-else-if="condition"
- v-show - Условный рендеринг (прячет через CSS) v-show="isVisible"
- v-for - Рендеринг списков v-for="item in items" :key="item.id"
- v-html - Вставляет сырой HTML (осторожно, XSS!) v-html="rawHtml"
- v-text - То же что {{ }}, но для целого элемента v-text="message"
- v-pre - Пропускает компиляцию для этого элемента v-pre
- v-cloak - Скрывает нескомпилированный шаблон v-cloak

### Основные методы, которые нужно освоить:

- v-bind — динамические атрибуты (src, href, class, style)
- v-on — обработка событий (click, input, submit, keyup)
- v-model — работа с формами (input, select, textarea, checkbox)
- v-if / v-else / v-show — условный рендеринг
- v-for — отрисовка списков и таблиц
- Модификаторы событий — .prevent, .stop, .once, .enter

# Краткая теория: Модификаторы событий

Модификаторы — это специальные суффиксы, которые добавляются к директиве v-on (или @) через точку. Они меняют поведение обработчика событий.

## Основные модификаторы:

### Модификатор Назначение Пример

- .prevent Вызывает event.preventDefault() — отменяет действие по умолчанию @submit.prevent="onSubmit"
- .stop Вызывает event.stopPropagation() — останавливает всплытие события @click.stop="onClick"
- .once Событие сработает только один раз @click.once="onClick"
- .capture Режим capture (событие ловится на фазе погружения) @click.capture="onClick"
- .self Срабатывает только если событие на самом элементе (не от дочерних) @click.self="onClick"
- .passive Улучшает производительность скролла @scroll.passive="onScroll"

## Модификаторы клавиш:

### Модификатор Назначение Пример

- .enter Срабатывает при нажатии Enter @keyup.enter="submit"
- .tab При нажатии Tab @keyup.tab="nextField"
- .delete Delete или Backspace @keyup.delete="clear"
- .esc Escape @keyup.esc="closeModal"
- .space Пробел @keyup.space="playPause"
- .up/.down/.left/.right Стрелки @keyup.up="moveUp"

## Модификаторы мыши:

### Модификатор Назначение Пример

- .left Левая кнопка мыши @click.left="select"
- .right Правая кнопка мыши (контекстное меню) @click.right="openMenu"
- .middle Средняя кнопка мыши @click.middle="openNewTab"

### Можно комбинировать:

```html
<!-- Enter + Shift -->
@keyup.enter.shift="submit"

<!-- Prevent + Stop вместе -->
@click.stop.prevent="handleClick"
```
