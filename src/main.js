// import './assets/main.css'

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
