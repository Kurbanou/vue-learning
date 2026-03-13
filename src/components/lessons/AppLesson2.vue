<script setup>
//Задание 1.2: Форма обратной связи с модификаторами
//Контекст: Создаем форму обратной связи, где нужно применить разные модификаторы событий.
// Что нужно сделать:

// 1. Создайте реактивные переменные:
// - formData — объект с полями: name, email, message
// - submitted — булево, показывать ли сообщение об отправке
// - clickCount — счетчик для демонстрации .once
// - logs — массив для записи событий (чтобы видеть, что происходит)

// 2. Создайте форму с полями:
// - Имя (input)
// - Email (input type="email")
// - Сообщение (textarea)
// - Кнопка "Отправить"

// 3. Примените модификаторы:
// - <form @submit.prevent="handleSubmit"> Чтобы страница не перезагружалась при отправке
// - <textarea @keyup.enter="addNewLine"></textarea> .enter на поле сообщения При нажатии Enter добавлять новую строку (а не отправлять форму)
//  - .once на кнопке Кнопка сработает только один раз (потом станет неактивной)
//  - .stop на внутреннем блоке Чтобы клик на кнопке не вызывал клик на родителе
//  - <div @click.right.prevent="openContextMenu"> .right на контекстное меню Открывать кастомное меню при правом клике (и отключать стандартное)

// 4. Добавьте визуализацию:
// - Показывать логи событий (что и когда произошло)
// - Индикатор отправки формы
// - Счетчик кликов с .once

// Дополнительные материалы для самопроверки:
// После выполнения задания ответьте на вопросы:

// - Что произойдет, если убрать .prevent из формы?
// - Почему на одном элементе можно использовать несколько модификаторов?
// - В каком порядке они применяются?
// - Чем отличается .self от .stop?
import { ref } from 'vue'
const formData = ref({
  name: 'Ваше имя',
  email: 'Ваш e-mail',
  message: 'Ваше сообщение',
}) //— объект с полями: name, email, message
const submitted = ref(false) //— булево, показывать ли сообщение об отправке
const clickCount = ref(0) //— счетчик для демонстрации .once
const logs = ref([]) //— массив для записи событий (чтобы видеть, что происходит)

// Функция для добавления логов
const addLog = (action) => {
  logs.value.push(`${new Date().toLocaleTimeString()}: ${action}`)
}
const handleSubmit = () => {
  clickCount.value++
  addLog('Форма отправлена')
  submitted.value = true
  // Через 3 секунды скрываем индикатор
  setTimeout(() => {
    submitted.value = false
  }, 3000)
}
const openContextMenu = () => {
  addLog('Правый клик (контекстное меню)')
  // Здесь можно открыть кастомное меню
  alert('Кастомное контекстное меню!')
}

const parentClick = () => {
  addLog('Клик на родительском блоке')
}
const incrementClick = () => {
  clickCount.value++ // Увеличится только один раз, даже если нажимать много раз
}

const childClick = () => {
  addLog('Клик на кнопке Reset (с .stop)')
  // Сброс формы
  formData.value = {
    name: '',
    email: '',
    message: '',
  }
}

const addNewLine = () => {
  formData.value.message += '\n'
  addLog('Добавлена новая строка (Enter)')
}
</script>
<template>
  <el-form
    @click.right.prevent="openContextMenu"
    @submit.prevent="handleSubmit"
    :model="formData"
    label-width="auto"
    style="max-width: 300px"
  >
    <el-input v-model="formData.name" style="width: 100%" placeholder="Please input" />
    <el-input v-model="formData.email" style="width: 100%" placeholder="Please input" />
    <el-input
      v-model="formData.message"
      style="width: 100%"
      :rows="5"
      type="textarea"
      @keyup.enter="addNewLine"
    />

    <el-form-item @click="parentClick">
      <el-button type="primary" native-type="submit" @click.stop="() => {}"> Submit </el-button>
      <el-button @click.stop="childClick">Reset</el-button>
      <el-button @click.once.stop="incrementClick">
        🔘 Нажми меня только раз ({{ clickCount }})
      </el-button>
    </el-form-item>
  </el-form>
  <!-- Индикатор отправки -->
  <el-alert
    v-if="submitted"
    type="success"
    title="✅ Форма успешно отправлена!"
    :closable="false"
  />

  <!-- Счетчик .once -->
  <p>Кликов: {{ clickCount }}</p>

  <!-- Логи -->
  <div v-for="log in logs">{{ log }}</div>
</template>
<style scoped></style>
