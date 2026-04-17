[⬅️ На главную](./MY_README.md) | [⚙️ Установка](./install.md) | [📋 План](./plan.md)

# Блок 1. Основы Vue 3 (база)

## 1.1. Шаблоны и синтаксис

- [x] Интерполяция ({{ }})
- [x] Директивы (v-bind, v-html)
- [x] Атрибуты и классы (:class, :style)

## 1.2. Основные директивы

- [x] v-if / v-else / v-else-if
- [x] v-show
- [x] v-for и :key
- [x] v-model (двустороннее связывание)
- [x] v-on (@click, @input и т.д.)

## 1.3. Стилизация

- [x] Scoped CSS `(<style scoped>)`
- [x] CSS модули
- [] Динамические классы

## 1.4. Composition API

- [x] script setup синтаксис
- [x] Реактивность: ref, reactive
- [ ] toRefs, toRef
- [x ] computed (вычисляемые свойства)
- [ ] watch и watchEffect
- [x] Хуки жизненного цикла (onMounted, onUpdated, onUnmounted)

## 1.5. Композиция логики

- [x] Создание composables (useCounter, useLocalStorage)
- [ ] Правила именования (use\*)
- [ ] Пример: useFetch свой

# Блок 2. TypeScript для Nuxt (критически важно)

## 2.1. Основы TypeScript

- [ ] Типы: string, number, boolean, any, unknown
- [ ] Массивы и туплы (string[], [number, string])
- [ ] Объекты и интерфейсы (interface, type)
- [ ] Union и Intersection типы (|, &)
- [ ] Generics (<T>)

## 2.2. TypeScript во Vue/Nuxt

- [ ] Типизация ref и reactive
- [ ] Типизация computed
- [ ] Типизация props (defineProps<Props>())
- [ ] Типизация emits (defineEmits<Emits>())
- [ ] Типизация useFetch (generics)

## 2.3. Продвинутый TypeScript

- [ ] Utility типы (Partial, Pick, Omit, Record)
- [ ] Type guards
- [ ] Declaration merging

# Блок 3 — Основы Nuxt 3

## 3.1. Создание и настройка

- [ ] Установка: npx nuxi init my-app
- [ ] Структура проекта (папки: pages, components, layouts, composables, server, plugins, public)
- [ ] Файл nuxt.config.ts
- [ ] Переменные окружения (.env)

## 3.2. Автоимпорт (магия Nuxt)

- [ ] Автоимпорт из ~/components/ (включая вложенные)
- [ ] Автоимпорт из ~/composables/
- [ ] Автоимпорт из ~/utils/
- [ ] Отключение автоимпорта (если нужно)
- [ ] Как Nuxt генерирует .nuxt/imports.d.ts
- [ ] Когда автоимпорт не работает (и как чинить)
- [ ] Явный импорт через #imports

## 3.3. Основные команды

- [ ] npm run dev (режим разработки)
- [ ] npm run build (сборка)
- [ ] npm run generate (SSG)
- [ ] npm run preview (просмотр продакшн сборки)

# Блок 4. Роутинг (File-based routing)

## 4.1. Базовая навигация

- [ ] Создание страниц через /pages
- [ ] index.vue как корневая страница
- [ ] about.vue → /about

## 4.2. Динамические маршруты

- [ ] [id].vue → /users/5
- [ ] [...slug].vue (catch-all route)
- [ ] [[optional]].vue (опциональный параметр)

## 4.3. Вложенные маршруты

- [ ] Папки с index.vue
- [ ] users/[id]/profile.vue → /users/5/profile

## 4.4. Навигация

- [ ] <NuxtLink> компонент
- [ ] useRouter() (программная навигация)
- [ ] useRoute() (доступ к параметрам и query)
- [ ] router.push(), router.replace(), router.back()

## 4.5. Middleware (защита маршрутов)

- [ ] Анонимные middleware (внутри страницы)
- [ ] Именованные middleware (/middleware/auth.ts)
- [ ] Глобальные middleware
- [ ] Пример: редирект на логин без токена

# Блок 5. Компоненты и взаимодействие

## 5.1. Работа с компонентами

- [ ] Создание и импорт (автоимпорт)
- [ ] props (передача данных)
- [ ] emits (события)
- [ ] Слоты (<slot>, именованные слоты)
- [ ] Scoped slots

## 5.2. Продвинутые паттерны

- [ ] Динамические компоненты (<component :is="..." />)
- [ ] Provide / Inject (для глубоких вложений)
- [ ] Teleport (порталы)
- [ ] Client-only компоненты (<ClientOnly>)

## 5.3. Оптимизация компонентов

- [ ] Ленивая загрузка (defineAsyncComponent)
- [ ] v-memo для оптимизации

# Блок 6. Управление состоянием (Pinia)

## 6.1. Установка и настройка

- [ ] Установка @pinia/nuxt
- [ ] Настройка в nuxt.config.ts
- [ ] Создание store

## 6.2. Основы Pinia

- [ ] state (реактивные данные)
- [ ] getters (аналог computed)
- [ ] actions (методы для изменения состояния)
- [ ] Использование store в компонентах (storeToRefs)

## 6.3. Продвинутая Pinia

- [ ] Доступ к store из других store (cross-store)
- [ ] Плагины Pinia
- [ ] Persist (сохранение в localStorage / cookies)

## 6.4. Примеры

- [ ] Store для аутентификации (user, token, login, logout)
- [ ] Store для корзины товаров
- [ ] Store для темы (dark/light mode)

# Блок 7. Работа с сервером и REST API (самый важный блок)

## 7.1. Теория REST API

- [ ] Что такое REST и RESTful (ресурсы, stateless)
- [ ] HTTP методы: GET, POST, PUT, PATCH, DELETE
- [ ] Идемпотентность (почему PUT можно повторять, POST — нет)
- [ ] Статус коды:
- - [ ] 200 OK, 201 Created, 204 No Content
- - [ ] 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity
- - [ ] 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable
- [ ] Заголовки: Content-Type, Accept, Authorization, Cache-Control

## 7.2. Клиентские запросы (на фронте)

- [ ] useFetch() — базовое использование
- [ ] useAsyncData() — больше контроля
- [ ] $fetch() — прямой запрос (без кеша)
- [ ] Опции: method, headers, body, query
- [ ] Обработка pending, error, status

## 7.3. Серверные эндпоинты (Nuxt Server Engine)

- [ ] Создание API в /server/api/\*.ts
- [ ] defineEventHandler(event)
- [ ] Парсинг запроса:
- - [ ] getQuery(event) — query параметры (?page=2)
- - [ ] getRouterParams(event) — параметры маршрута (/api/users/5)
- - [ ] readBody(event) — тело POST/PUT запроса
- [ ] Отправка ответа:
- - [ ] Возврат объекта (автоматически JSON)
- - [ ] Установка статуса (setResponseStatus)
- - [ ] Установка заголовков (setHeader, appendHeader)

## 7.4. Обработка ошибок

- [ ] createError() на сервере
- [ ] throw createError({ statusCode: 404, statusMessage: 'Not found' })
- [ ] try/catch на клиенте
- [ ] Глобальный обработчик ошибок (error.vue)

## 7.5. Продвинутые сценарии работы с API

- [ ] Пагинация (query params: page, limit, offset)
- [ ] Фильтрация и сортировка (?sort=name&order=asc)
- [ ] Оптимистичные обновления (лайк сразу → откат при ошибке)
- [ ] Отмена запросов (AbortController)
- [ ] Race conditions (последний запрос должен победить)
- [ ] Debounce и throttle (поисковая строка)
- [ ] Retry-логика (повтор при 500 ошибке)
- [ ] Загрузка файлов (multipart/form-data)

## 7.6. Примеры REST API

- [ ] CRUD операций над пользователями
- [ ] CRUD операций над постами/комментариями
- [ ] Аутентификация (логин → получение токена)
- [ ] Профиль пользователя (GET, PATCH)

# Блок 8. Безопасность и продвинутая работа с API

## 8.1. Аутентификация

- [ ] JWT токены (структура, expiration, refresh)
- [ ] Хранение токенов:
- - [ ] localStorage / sessionStorage (риски XSS)
- - [ ] httpOnly cookie (безопаснее, но требует настройки CORS)
- - [ ] Refresh token механизм (автоматическое обновление)
- [ ] Серверные middleware для проверки токена

## 8.2. Cookies

- [ ] useCookie() (чтение/запись)
- [ ] Опции: maxAge, httpOnly, secure, sameSite

## 8.3. CORS (Cross-Origin Resource Sharing)

- [ ] Что такое CORS и зачем нужен
- [ ] Настройка CORS на сервере Nuxt (Nitro)
- [ ] Решение проблем с CORS в dev-режиме (прокси)

## 8.4. Защита

- [ ] CSRF атаки (и как защититься)
- [ ] XSS защита (automatic escaping в Nuxt)
- [ ] Rate limiting на клиенте (не долбить сервер)
- [ ] Environment variables (секреты на сервере)

# Блок 9. UI (Element Plus)

## 9.1. Установка

- [ ] Установка через Nuxt-модуль (@element-plus/nuxt)
- [ ] Настройка автоимпорта

## 9.2. Базовые компоненты

- [ ] ElButton, ElInput, ElContainer, ElHeader, ElAside, ElMain
- [ ] ElMessage, ElNotification, ElDialog

## 9.3. Формы и валидация

- [ ] ElForm, ElFormItem
- [ ] ElInput, ElSelect, ElDatePicker
- [ ] Валидация (rules, async validation)

## 9.4. Отображение данных

- [ ] ElTable, ElTableColumn
- [ ] ElTag, ElBadge
- [ ] ElPagination (пагинация)

## 9.5. Кастомизация

- [ ] Темизация (переменные CSS)
- [ ] Темная тема

# Блок 10. Продвинутые техники Nuxt

## 10.1. Конфигурация

- [ ] runtimeConfig (публичные и приватные переменные)
- [ ] appConfig

## 10.2. Плагины

- [ ] Создание /plugins/\*.ts
- [ ] Клиентские и серверные плагины
- [ ] Регистрация глобальных компонентов

## 10.3. Модули

- [ ] Список официальных модулей
- [ ] Установка сторонних модулей
- [ ] Создание своего модуля

## 10.4. Рендеринг

- [ ] Client-only vs Server-only (<ClientOnly>, server: true/false)
- [ ] Hydration ошибки (почему возникают и как лечить)
- [ ] useHead() (SEO метатеги)

## 10.5. Оптимизация

- [ ] Ленивая загрузка компонентов
- [ ] Динамические импорты
- [ ] @nuxt/image (оптимизация изображений)

## 10.6. Пользовательские директивы

- [ ] Создание кастомной директивы через плагин
- [ ] Пример: v-focus (автофокус на инпуте)
- [ ] Пример: v-permission (проверка роли пользователя)
- [ ] Пример: v-click-outside (закрытие попапа при клике вне)

# Блок 11. Тестирование (опционально, но желательно)

## 11.1. Unit-тесты

- [ ] Установка Vitest
- [ ] Тестирование composables
- [ ] Тестирование Pinia store
- [ ] Мокирование useFetch

## 11.2. E2E тесты

- [ ] Установка Playwright
- [ ] Написание сценариев (логин, создание поста)

# Блок 12. Оптимизация и продакшн

## 12.1. Режимы рендеринга

- [ ] SSR (Server-Side Rendering)
- [ ] SSG (Static Site Generation) — nuxi generate
- [ ] SPA (Client-side only)
- [ ] Гиbrid режим (routeRules)

## 12.2. Сборка и деплой

- [ ] nuxi build (продакшн сборка)
- [ ] nuxi preview (локальный просмотр)
- [ ] Деплой на Vercel (проще всего)
- [ ] Деплой на Netlify
- [ ] Деплой на Render / Heroku

## 12.3. Производительность

- [ ] Анализ бандла (nuxi analyze)
- [ ] Кеширование (HTTP cache, Nitro cache)
- [ ] Оптимизация изображений
- [ ] Lazy loading модулей

# Блок 13. Итоговый проект (Fullstack Nuxt App)

- [ ] Требования к проекту:
- [ ] Авторизация (JWT, регистрация, логин, logout)
- [ ] Защита маршрутов (middleware)
- [ ] Работа с REST API (CRUD операций)
- [ ] Pinia store (хотя бы для аутентификации)
- [ ] UI на Element Plus (формы, таблицы, модалки)
- [ ] Пагинация (на таблице/списке)
- [ ] Обработка ошибок (404, 401, глобальный error handler)
- [ ] Оптимистичные обновления (например, лайки)
- [ ] Деплой (Vercel / Netlify)
- [ ] Примеры тем для проекта:
- [ ] Доска задач (Trello-клон)
- [ ] Блог с комментариями и лайками
- [ ] Каталог товаров + корзина
- [ ] Чат (с WebSocket, опционально)

# Блок 14. Реальные кейсы и дополнительные темы

## 14.1. Интеграции

- [ ] Firebase (аутентификация, база данных)
- [ ] Supabase (PostgreSQL + auth + storage)
- [ ] GraphQL (Apollo Client)

## 14.2. WebSocket

- [ ] socket.io-client
- [ ] uWebSockets.js на сервере Nitro

## 14.3. Экспорт данных

- [ ] Генерация CSV
- [ ] Генерация Excel (SheetJS)

## 14.4. Платежи

- [ ] Интеграция Stripe / PayPal
