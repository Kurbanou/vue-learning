[⬅️ На главную](./README.md) | [⚙️ Установка](./install.md) | [📋 План](./plan.md)

# Часть -1

## Урок 1: Директивы в Vue (v-bind, v-model, v-if/v-else, v-for, v-on)

### Краткая теория:

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

## Урок 2: Краткая теория: Модификаторы событий

Модификаторы — это специальные суффиксы, которые добавляются к директиве v-on (или @) через точку. Они меняют поведение обработчика событий.

### Основные модификаторы:

### Модификатор Назначение Пример

- .prevent Вызывает event.preventDefault() — отменяет действие по умолчанию @submit.prevent="onSubmit"
- .stop Вызывает event.stopPropagation() — останавливает всплытие события @click.stop="onClick"
- .once Событие сработает только один раз @click.once="onClick"
- .capture Режим capture (событие ловится на фазе погружения) @click.capture="onClick"
- .self Срабатывает только если событие на самом элементе (не от дочерних) @click.self="onClick"
- .passive Улучшает производительность скролла @scroll.passive="onScroll"

### Модификаторы клавиш:

### Модификатор Назначение Пример

- .enter Срабатывает при нажатии Enter @keyup.enter="submit"
- .tab При нажатии Tab @keyup.tab="nextField"
- .delete Delete или Backspace @keyup.delete="clear"
- .esc Escape @keyup.esc="closeModal"
- .space Пробел @keyup.space="playPause"
- .up/.down/.left/.right Стрелки @keyup.up="moveUp"

### Модификаторы мыши:

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

## Урок 3: Продвинутая работа с данными и стилями (Computed, Watch, Scoped CSS)

### 1. Вычисляемые свойства (computed)

- 1.1. Что такое computed и зачем он нужен?
  - Проблема: сложная логика в шаблоне ({{ }}).
  - Решение: выносим логику в вычисляемое свойство.
  - Главное отличие от методов (methods): кеширование результата.

- 1.2. Базовый синтаксис

```js
const completedTodosCount = computed(() => {
  return todos.value.filter((todo) => todo.completed).length
})
```

- 1.3. Примеры проекта фильмов
  - Подсчет общего количества фильмов, просмотренных, среднего рейтинга.
  - Фильтрация списка (например, только просмотренные).
  - Сортировка списка.

- 1.4. computed с геттером и сеттером (для продвинутых)

```js
const fullName = computed({
  get: () => `${firstName.value} ${lastName.value}`,
  set: (newValue) => {
    ;[firstName.value, lastName.value] = newValue.split(' ')
  },
})
```

### 2. Наблюдатели (watch)

- 2.1. Что такое watch и зачем он нужен?
  - Реагирование на изменения данных (сайд-эффекты).
  - Отличие от computed: watch не создает новое значение, а выполняет действие.
- 2.2. Базовый синтаксис

```js
watch(searchQuery, (newQuery, oldQuery) => {
  console.log(`Поисковый запрос изменился с "${oldQuery}" на "${newQuery}"`)
  // Здесь можно делать API-запрос для поиска
})
```

- 2.3. Практические примеры
  - Автосохранение: сохранять список фильмов в localStorage при любом изменении.
  - Валидация: проверять форму при изменении поля.
  - Уведомления: показывать сообщение, когда рейтинг фильма достигает 10.
- 2.4. Полезные опции (deep, immediate)
  - deep: true — следить за изменениями внутри вложенных объектов/массивов.
  - immediate: true — выполнить обработчик сразу при создании.
- 2.5. watchEffect — упрощенный наблюдатель

```js
watchEffect(() => {
  // Автоматически следит за всеми реактивными переменными внутри
  localStorage.setItem('movies', JSON.stringify(movies.value))
})
```

### 3. Стилизация компонентов (Scoped CSS)

- 3.1. Проблема глобальных стилей и решение — scoped

```html
<style scoped>
  /* Эти стили будут применяться ТОЛЬКО к этому компоненту */
  .example-button {
    background-color: blue;
  }
</style>
```

- 3.2. Как это работает под капотом
  Vue добавляет уникальный атрибут к HTML-элементам и соответствующим образом изменяет CSS-селекторы.
- 3.3. Взаимодействие с дочерними компонентами (:deep())

```html
<style scoped>
  :deep(.el-button) {
    /* Этот стиль применится к кнопке Element Plus внутри компонента */
    font-weight: bold;
  }
</style>
```

- 3.4. Стилизация слотов (:slotted()) и глобальные стили (:global())

```html
<style scoped>
  :slotted(.title) {
    color: red;
  } /* Для контента, переданного через слот */
  :global(body) {
    margin: 0;
  } /* Глобальный стиль внутри scoped блока */
</style>
```

## Итоги по 1 часть

## 📚 Vue 3 Шпаргалка (Самое главное)

### 🎯 Модификаторы событий

| Модификатор    | Когда использовать                                                            | Где ошибались           |
| -------------- | ----------------------------------------------------------------------------- | ----------------------- |
| **`.prevent`** | На форме `@submit.prevent` — чтобы страница не перезагружалась                |
| **`.stop`**    | На кнопках внутри кликабельных родительских блоков                            |
| **`.once`**    | Когда действие должно выполниться только 1 раз                                |
| **`.enter`**   | На полях ввода для реакции на Enter                                           | Путали с `@keyup.enter` |
| **`.right`**   | Для правого клика (контекстное меню) `.prevent` чтобы убрать стандартное меню |
| **`.lazy`**    | На полях поиска — обновление при потере фокуса                                |

### stop:

```vue
<!-- ✅ Правильно -->
<div @click="parentClick">
  <button @click.stop="childClick">Кнопка</button> <!-- только child -->
</div>
```

### v-model и формы

Тип поля Модификатор Пример:

- Текст .trim v-model.trim="name"
- Число .number v-model.number="age" Поиск
  .lazy v-model.lazy="search"
- Чекбокс (один) - v-model="newsletter" (boolean)
- Чекбоксы (группа) -
  v-model="interests" (массив)
- Радио - v-model="gender" (строка)
- Селект - v-model="country"

### Редактирование по двойному клику

```html
<!-- Шаблон -->
<el-input
  v-if="item.isEditing"
  v-model="item.title"
  @blur="item.isEditing = false"
  @keyup.enter="item.isEditing = false"
  ref="inputRef"
/>
<span v-else @dblclick.stop="item.isEditing = true"> {{ item.title }} </span>
```

### filter для удаления

```js
// Удалить по id
movies.value = movies.value.filter((m) => m.id !== id)

// Удалить все просмотренные
movies.value = movies.value.filter((m) => !m.watched)

// Удалить с рейтингом меньше 5
movies.value = movies.value.filter((m) => m.rating >= 5)
```

### Копирование объектов (snapshot)

```js
// Создать независимую копию
const copy = JSON.parse(JSON.stringify(original))

// Зачем? Чтобы изменения в original не меняли copy
formDataSnapshot.value = JSON.parse(JSON.stringify(user.value))
```

### ElMessage (уведомления)

- Импортировать import { ElMessage } from 'element-plus'
- Подключить стили в main.js: import 'element-plus/dist/index.css'

```js
import { ElMessage } from 'element-plus'

ElMessage.success('Успех!')
ElMessage.warning('Внимание!')
ElMessage.error('Ошибка!')
ElMessage.info('Информация')
```

### Сетка Element Plus (адаптивность)

```html
<!-- Числа должны быть с ":" -->
<el-col :span="6">
  <!-- ✅ правильно -->
  <el-col span="6">
    <!-- ❌ ошибка! -->

    <!-- Адаптивность -->
    <el-col :xs="24" :sm="12" :md="8" :lg="6">
      <!-- xs: мобильные (24 = всю ширину) -->
      <!-- sm: планшеты (12 = половинy) -->
      <!-- md: ноутбуки (8 = треть) -->
      <!-- lg: десктоп (6 = четверть) -->
    </el-col></el-col
  ></el-col
>
```

## 🧮 Computed (вычисляемые свойства)

- **Цель:** Создание производных данных, которые кешируются.
- **Синтаксис (только чтение):** `const val = computed(() => expression)`
- **Синтаксис (чтение и запись):** `const val = computed({ get: () => ..., set: (newVal) => ... })`

## 👀 Watch (наблюдатели)

- **Цель:** Выполнение сайд-эффектов при изменении данных.
- **Синтаксис:** `watch(source, (newVal, oldVal) => { ... }, { deep, immediate })`
- **watchEffect:** Автоматически следит за используемыми внутри реактивными переменными.

## 🎨 Scoped CSS

- **`<style scoped>`:** Стили только для текущего компонента.
- **`:deep(selector)`:** Позволяет стилизовать дочерние компоненты.
- **`:slotted(selector)`:** Стили для контента в слотах.
- **`:global(selector)`:** Глобальные стили внутри scoped-блока.
