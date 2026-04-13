[⬅️ На главную](./MY_README.md) | [⚙️ Установка](./install.md) | [📋 План](./plan.md)

# Обучение Nuxt 3 + Vue 3

## План обучения (Содержание курса)

Этот план будет расширяться по мере прохождения материала. Порядок тем выстроен от простого к сложному.

### 1. Основы Vue 3 (база)

- [x] Шаблоны и интерполяция
- [x] Основные директивы (v-bind, v-if, v-for, v-model)
- [x] Стилизация компонентов (Scoped CSS)
- [x] 'script setup'
- [x] Реактивность: ref, reactive
- [x] Вычисляемые свойства: computed
- [x] Наблюдатели: watch, watchEffect
- [x] Хуки жизненного цикла
- [x] Composables (переиспользуемая логика)

### 2. Основы Nuxt 3

- [ ] Создание проекта (npx nuxi init)
- [ ] Структура проекта
- - /pages
- - /components
- - /layouts
- - /composables
- - /server
- - /plugins
- [ ] Автоимпорт (компоненты, composables, utils)
- [ ] <NuxtPage> и <NuxtLayout>
- [ ] Навигация: useRouter, useRoute

### 3. Роутинг (File-based routing)

- [ ] Создание страниц через /pages
- [ ] Динамические маршруты ([id].vue)
- [ ] Вложенные маршруты
- [ ] <NuxtLink> и программная навигация
- [ ] Middleware (аналог navigation guards)

### 4. Компоненты и взаимодействие

- [ ] Создание и импорт компонентов
- [ ] Props
- [ ] Emits
- [ ] Слоты
- [ ] Динамические компоненты
- [ ] Provide / Inject
- [ ] Понимание auto-inject в Nuxt

### 5. Управление состоянием (Pinia)

- [ ] Установка Pinia через Nuxt-модуль
- [ ] Создание Store
- [ ] State / Getters / Actions
- [ ] Использование Store в компонентах
- [ ] Persist (localStorage / cookies)

### 6. Работа с сервером (Nuxt Server Engine)

- [ ] useFetch и useAsyncData
- [ ] Разница client/server запросов
- [ ] Создание API-эндпоинтов в /server/api/\*.ts
- [ ] eventHandler и defineEventHandler
- [ ] Обработка ошибок (createError)
- [ ] Серверные middleware
- [ ] Работа с cookies (useCookie)

### 7. UI (Element Plus)

- [ ] Установка Element Plus через Nuxt-плагин
- [ ] Автоимпорт компонентов
- [ ] Базовые компоненты: Button, Input, Container
- [ ] Формы: Form, FormItem, Input, Select
- [ ] Отображение данных: Table, Tag, Badge
- [ ] Диалоги, уведомления
- [ ] Кастомизация темы

### 8. Продвинутые техники Nuxt

- [ ] Runtime Config (useRuntimeConfig)
- [ ] Плагины (/plugins)
- [ ] Модули Nuxt
- [ ] Client-only и server-only код
- [ ] Teleport
- [ ] Пользовательские директивы
- [ ] Оптимизация изображений (@nuxt/image)
- [ ] Ленивая загрузка компонентов и страниц

### 9. Оптимизация и продакшн

- [ ] SSR / SSG / SPA — различия
- [ ] Генерация статического сайта (nuxi generate)
- [ ] Сборка (nuxi build)
- [ ] Деплой (Vercel, Netlify, Render)
- [ ] Анализ бандла
- [ ] Кэширование и оптимизация

### 10. Итоговый проект (Fullstack Nuxt App)

- [ ] Авторизация (JWT или session)
- [ ] Работа с API
- [ ] Pinia
- [ ] UI (Element Plus)
- [ ] Middleware
- [ ] SSR/SSG
- [ ] Деплой
