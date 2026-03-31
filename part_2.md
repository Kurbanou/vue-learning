[⬅️ На главную](./README.md) | [⚙️ Установка](./install.md) | [📋 План](./plan.md)

# Часть 2

- [x] Знакомство с `<script setup>`.
- [x] Реактивность: `ref()` и `reactive()`.
- [x] Вычисляемые свойства: `computed()`.
- [x] Наблюдатели: `watch()` и `watchEffect()`.
- [x] Хуки жизненного цикла (Lifecycle Hooks) в Composition API.
- [ ] Создание переиспользуемой логики (Композаблы - Composables).

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
