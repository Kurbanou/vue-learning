[⬅️ На главную](./README.md) | [⚙️ Установка](./install.md) | [📋 План](./plan.md)

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
mkdir -p pages layouts components assets/css

# Настраиваем чистый nuxt.config.ts
cat <<EOF > nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@element-plus/nuxt'],
  elementPlus: {
    importStyle: 'css',
    icon: 'ElIcon'
  },
  // Это заставит Nuxt искать страницы в корневой /pages
  srcDir: './'
})
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

rm -rf app
```
