[⬅️ На главную](./README.md) | [⚙️ Установка](./install.md) | [📋 План](./plan.md)

# Часть 1

- [x] Шаблоны и интерполяция
- [x] Основные директивы (v-bind, v-if, v-for, v-model)
- [x] Стилизация компонентов (Scoped CSS)
- [x] 'script setup'
- [x] Реактивность: ref, reactive
- [x] Вычисляемые свойства: computed
- [x] Наблюдатели: watch, watchEffect
- [x] Хуки жизненного цикла
- [ ] Composables (переиспользуемая логика)

## Директивы в Vue (v-bind, v-model, v-if/v-else, v-for, v-on)

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

---

## Краткая теория: Модификаторы событий

Модификаторы — это специальные суффиксы, которые добавляются к директиве v-on (или @) через точку. Они меняют поведение обработчика событий.

### Основные модификаторы:

| Модификатор | Назначение                                                          | Пример                       |
| ----------- | ------------------------------------------------------------------- | ---------------------------- |
| `.prevent`  | Вызывает `event.preventDefault()` — отменяет действие по умолчанию  | `@submit.prevent="onSubmit"` |
| `.stop`     | Вызывает `event.stopPropagation()` — останавливает всплытие события | `@click.stop="onClick"`      |
| `.once`     | Событие сработает только один раз                                   | `@click.once="onClick"`      |
| `.capture`  | Режим capture (событие ловится на фазе погружения)                  | `@click.capture="onClick"`   |
| `.self`     | Срабатывает только если событие на самом элементе (не от дочерних)  | `@click.self="onClick"`      |
| `.passive`  | Улучшает производительность скролла                                 | `@scroll.passive="onScroll"` |

### Модификаторы клавиш:

| Модификатор                    | Назначение                    | Пример                     |
| ------------------------------ | ----------------------------- | -------------------------- |
| `.enter`                       | Срабатывает при нажатии Enter | `@keyup.enter="submit"`    |
| `.tab`                         | При нажатии Tab               | `@keyup.tab="nextField"`   |
| `.delete`                      | Delete или Backspace          | `@keyup.delete="clear"`    |
| `.esc`                         | Escape                        | `@keyup.esc="closeModal"`  |
| `.space`                       | Пробел                        | `@keyup.space="playPause"` |
| `.up`/`.down`/`.left`/`.right` | Стрелки                       | `@keyup.up="moveUp"`       |

### Модификаторы мыши:

| Модификатор | Назначение                            | Пример                       |
| ----------- | ------------------------------------- | ---------------------------- |
| `.left`     | Левая кнопка мыши                     | `@click.left="select"`       |
| `.right`    | Правая кнопка мыши (контекстное меню) | `@click.right="openMenu"`    |
| `.middle`   | Средняя кнопка мыши                   | `@click.middle="openNewTab"` |

### Можно комбинировать:

```html
<!-- Enter + Shift -->
@keyup.enter.shift="submit"

<!-- Prevent + Stop вместе -->
@click.stop.prevent="handleClick"
```

### Модификаторы событий

- .prevent На форме @submit.prevent — чтобы страница не перезагружалась
- .stop На кнопках внутри кликабельных родительских блоков

```js
<!-- ✅ Правильно -->
<div @click="parentClick">
  <button @click.stop="childClick">Кнопка</button> <!-- только child -->
</div>
```

- .once Когда действие должно выполниться только 1 раз
- .enter На полях ввода для реакции на Enter
- .right Для правого клика (контекстное меню) + .prevent чтобы убрать стандартное меню
- .lazy На полях поиска — обновление при потере фокуса

### v-model и формы

| Тип поля          | Модификатор | Пример                         |
| ----------------- | ----------- | ------------------------------ |
| Текст             | .trim       | v-model.trim="name"            |
| Число             | .number     | v-model.number="age"           |
| Поиск             | .lazy       | v-model.lazy="search"          |
| Чекбокс (один)    | -           | v-model="newsletter" (boolean) |
| Чекбоксы (группа) | -           | v-model="interests" (массив)   |
| Радио             | -           | v-model="gender" (строка)      |
| Селект            | -           | v-model="country"              |

### Редактирование по двойному клику

```js
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
      <!-- sm: планшеты (12 = половину) -->
      <!-- md: ноутбуки (8 = треть) -->
      <!-- lg: десктоп (6 = четверть) -->
    </el-col></el-col
  ></el-col
>
```

## Стилизация компонентов (Scoped CSS)

- style scoped : Стили только для текущего компонента.
- :deep(selector): Позволяет стилизовать дочерние компоненты.
- :slotted(selector): Стили для контента в слотах.
- :global(selector): Глобальные стили внутри scoped-блока.

### Проблема глобальных стилей и решение — scoped

```html
<style scoped>
  /* Эти стили будут применяться ТОЛЬКО к этому компоненту */
  .example-button {
    background-color: blue;
  }
</style>
```

Vue добавляет уникальный атрибут к HTML-элементам и соответствующим образом изменяет CSS-селекторы.

### Взаимодействие с дочерними компонентами (:deep())

```html
<style scoped>
  :deep(.el-button) {
    /* Этот стиль применится к кнопке Element Plus внутри компонента */
    font-weight: bold;
  }
</style>
```

### Стилизация слотов (:slotted()) и глобальные стили (:global())

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

## Вычисляемые свойства (computed)

- Цель: Создание производных данных, которые кешируются.
- Синтаксис (только чтение): const val = computed(() => expression)
- Синтаксис (чтение и запись): const val = computed({ get: () => ..., set: (newVal) => ... })

Что такое computed и зачем он нужен?

- Проблема: сложная логика в шаблоне ({{ }}).
- Решение: выносим логику в вычисляемое свойство.
- Главное отличие от методов (methods): кеширование результата.

### Базовый синтаксис

```js
const totalMovies = computed(() => movies.value.length)

const completedTodosCount = computed(() => {
  return todos.value.filter((todo) => todo.completed).length
})
```

Примеры проекта фильмов

- Подсчет общего количества фильмов, просмотренных, среднего рейтинга.
- Фильтрация списка (например, только просмотренные).
- Сортировка списка.

```js
//computed с геттером и сеттером (для продвинутых)
const fullName = computed({
  get: () => `${firstName.value} ${lastName.value}`,
  set: (newValue) => {
    ;[firstName.value, lastName.value] = newValue.split(' ')
  },
})

//Фильтрация с computed
// Пример для сайта фильмов где есть фильтр по поиску и фильтр радио
const filteredMovies = computed(() => {
  // Поиск имеет приоритет
  if (searchQuery.value) {
    return movies.value.filter((m) =>
      m.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  }

  // Если поиска нет — фильтр по радио
  if (filter.value === 'watched') {
    return movies.value.filter((m) => m.watched)
  } else if (filter.value === 'unwatched') {
    return movies.value.filter((m) => !m.watched)
  }

  return movies.value
})

// Cтатистика через computed
// Средний рейтинг
const averageRating = computed(() => {
  if (movies.value.length === 0) return 0
  const sum = movies.value.reduce((acc, m) => acc + m.rating, 0)
  return (sum / movies.value.length).toFixed(1)
})

// Лучший фильм
const bestMovie = computed(() => {
  return movies.value.reduce((best, current) => (current.rating > best.rating ? current : best))
})
```

## 👀 Watch (наблюдатели)

- Цель: Выполнение сайд-эффектов при изменении данных.
- Синтаксис: watch(source, (newVal, oldVal) => { ... }, { deep, immediate })
- watchEffect: Автоматически следит за используемыми внутри реактивными переменными.

### Что такое watch и зачем он нужен?

- Реагирование на изменения данных (сайд-эффекты).
- Отличие от computed: watch не создает новое значение, а выполняет действие.

```js
//Базовый синтаксис
watch(searchQuery, (newQuery, oldQuery) => {
  console.log(`Поисковый запрос изменился с "${oldQuery}" на "${newQuery}"`)
  // Здесь можно делать API-запрос для поиска
})
```

Практические примеры

- Автосохранение: сохранять список фильмов в localStorage при любом изменении.
- Валидация: проверять форму при изменении поля.
- Уведомления: показывать сообщение, когда рейтинг фильма достигает 10.

Полезные опции (deep, immediate)

- deep: true — следить за изменениями внутри вложенных объектов/массивов.
- immediate: true — выполнить обработчик сразу при создании.

### watchEffect — упрощенный наблюдатель

```js
watchEffect(() => {
  // Автоматически следит за всеми реактивными переменными внутри
  localStorage.setItem('movies', JSON.stringify(movies.value))
})
```

```js
//Автосохранение в localStorage
watch(
  movies,
  () => {
    localStorage.setItem('movies', JSON.stringify(movies.value))
  },
  { deep: true },
)
```

```js
//Загрузка из localStorage
onMounted(() => {
  const saved = localStorage.getItem('movies')
  if (saved) {
    movies.value = JSON.parse(saved)
  }
})
```

```js
//Уведомление при событии
watch(
  movies,
  (newMovies) => {
    const lastMovie = newMovies[newMovies.length - 1]
    if (lastMovie?.rating === 10) {
      ElMessage.success('Шедевр! 🏆')
    }
  },
  { deep: true },
)
```

## 💾 localStorage

```js
//Сохранить данные
localStorage.setItem('key', JSON.stringify(data))

//Прочитать данные
const data = JSON.parse(localStorage.getItem('key'))

//Удалить данные
localStorage.removeItem('key')

//Очистить всё
localStorage.clear()
```

## Главные хуки (жизненные функции)

| Хук             | Когда                           | Зачем                                    |
| --------------- | ------------------------------- | ---------------------------------------- |
| onMounted       | Компонент появился на странице  | Загружать данные, работать с DOM         |
| onUnmounted     | Компонент удаляется со страницы | Очищать таймеры, отписываться от событий |
| onBeforeMount   | Перед появлением на странице    | Редко используется                       |
| onBeforeUnmount | Перед удалением                 | Подготовка к очистке                     |

### onMounted

- Работа с DOM — поиск элементов, размеры, фокус, библиотеки, события

```js
// Пример: нужно измерить размеры или позицию элемента
onMounted(() => {
  const card = document.querySelector('.movie-card')
  const width = card.offsetWidth
  const height = card.offsetHeight
  const position = card.getBoundingClientRect()

  console.log(`Ширина карточки: ${width}px`)
})
```

- Асинхронные данные — загрузка с сервера, чтение из localStorage, таймеры

```js
// Пример: нужно запустить стороннюю библиотеку, которая работает с DOM
import Swiper from 'swiper'

onMounted(() => {
  // Инициализация слайдера
  new Swiper('.swiper-container', {
    slidesPerView: 3,
    loop: true
  })

  // Инициализация графика
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {...}
  })
})
```

### onUnmounted — очистка перед уходом

Если ты запустил что-то, что продолжает работать после удаления компонента — это нужно остановить в onUnmounted.

Иначе:

- Таймеры продолжают тикать ❌
- Слушатели продолжают ловить события ❌
- Запросы продолжают висеть ❌
- Память засоряется ❌

```js
// Пример: что будет без onUnmounted — таймер будет работать вечно, даже когда компонент уже не на странице
let timer

onMounted(() => {
  timer = setInterval(() => {
    console.log('Обновление данных...')
  }, 5000)
})

onUnmounted(() => {
  clearInterval(timer) // ❗ Обязательно!
})
```

```js
// Пример: что будет без onUnmounted — слушатель останется в памяти, будет срабатывать, но компонента уже нет → ошибки
const handleResize = () => {
  console.log('Окно изменило размер')
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize) // ❗ Обязательно!
})
```

#### Что нужно чистить в onUnmounted:

| Что запустили             | Как остановить               |
| ------------------------- | ---------------------------- |
| setInterval               | clearInterval                |
| setTimeout                | clearTimeout                 |
| window.addEventListener   | window.removeEventListener   |
| document.addEventListener | document.removeEventListener |
| Запрос fetch              | AbortController.abort()      |
| WebSocket                 | ws.close()                   |
| Подписки на события       | .unsubscribe() / .off()      |

💡 Главное правило: Запустил что-то в onMounted — останови в onUnmounted.
