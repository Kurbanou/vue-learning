[⬅️ На главную](./MY_README.md) | [⚙️ Установка](./install.md) | [📋 План](./plan.md)

# Установка (Nuxt)

## Создание проекта Nuxt

```bash
# Инициализация (используем --force и --shell для чистоты)
npx nuxi@latest init my-nuxt-app --package-manager npm --no-git --no-install

cd my-nuxt-app

# Точка указывает, что нужно развернуть файлы прямо здесь если каталог уже есть
npx nuxi@latest init . --force --package-manager npm --no-git

# Установка Element Plus и иконок
npm install element-plus @element-plus/nuxt @element-plus/icons-vue

# Создаем папки
mkdir -p pages layouts components assets/scss

# Настраиваем чистый nuxt.config.ts
cat <<EOF > nuxt.config.ts
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
EOF

# Создаем базовый app.vue
cat <<EOF > app.vue
<template>
  <div>
    <NuxtPage />
  </div>
</template>
EOF

# Создаем тестовую страницу
cat <<EOF > pages/index.vue
<template>
  <div style="padding: 50px;">
    <el-button type="success" round>
      <el-icon class="el-icon--left"><el-icon-check /></el-icon>
      Проект готов!
    </el-button>
  </div>
</template>
EOF

# Создаем кастомные переменные стилей
cat <<EOF > assets/scss/element-variables.scss
/* sassets/scss/element-variables.scss */
/* ================================
   Modern Clean Theme for Element+
   ================================ */

/* ---------- Цветовая палитра ---------- */
$--color-primary: #4f7cff; // современный синий
$--color-primary-light-3: #7fa1ff;
$--color-primary-light-5: #a8bfff;
$--color-primary-light-7: #d2ddff;
$--color-primary-light-9: #eef3ff;

$--color-success: #4cc38a;
$--color-warning: #f5a623;
$--color-danger: #ff5f5f;
$--color-info: #909399;

/* ---------- Нейтральные оттенки ---------- */
$--color-text-primary: #1f1f1f;
$--color-text-regular: #4a4a4a;
$--color-text-secondary: #7a7a7a;
$--color-text-placeholder: #b5b5b5;

$--border-color: #e5e7eb;
$--border-color-light: #f0f1f3;
$--background-color-base: #fafafa;

/* ---------- Скругления ---------- */
$--border-radius-base: 10px;
$--border-radius-small: 8px;
$--border-radius-round: 20px;

/* ---------- Тени ---------- */
$--box-shadow-light: 0 2px 8px rgba(0, 0, 0, 0.06);
$--box-shadow-dark: 0 4px 16px rgba(0, 0, 0, 0.12);

/* ---------- Типографика ---------- */
$--font-size-base: 15px;
$--font-size-small: 13px;
$--font-size-large: 17px;

$--font-weight-primary: 500;

/* ---------- Анимации ---------- */
$--transition-duration: 0.22s;
$--transition-function: cubic-bezier(0.4, 0, 0.2, 1);

/* ---------- Компоненты ---------- */

/* Кнопки */
$--button-border-radius: 10px;
$--button-padding-vertical: 10px;
$--button-padding-horizontal: 18px;
$--button-font-weight: 500;

/* Инпуты */
$--input-height: 42px;
$--input-border-radius: 10px;
$--input-placeholder-color: #b5b5b5;

/* Карточки */
$--card-border-radius: 14px;
$--card-padding: 20px;

/* Меню */
$--menu-item-height: 46px;
$--menu-item-hover-fill: #f5f7ff;

/* Диалоги */
$--dialog-border-radius: 14px;
$--dialog-padding-primary: 24px;
EOF

rm -rf app
npm install -D sass sass-embedded
npm run dev
```
