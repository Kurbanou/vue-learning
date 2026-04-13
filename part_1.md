[⬅️ На главную](./README.md) | [⚙️ Установка](./install.md) | [📋 План](./plan.md)

# Часть 1. Основы Vue 3

- [x] Шаблоны и интерполяция
- [x] Основные директивы (v-bind, v-if, v-for, v-model)
- [x] Стилизация компонентов (Scoped CSS)
- [x] `script setup`
- [x] Реактивность: `ref`, `reactive`
- [x] Вычисляемые свойства: `computed`
- [x] Наблюдатели: `watch`, `watchEffect`
- [x] Хуки жизненного цикла
- [x] Composables (переиспользуемая логика)

---

## Шаблоны и интерполяция

Vue использует декларативный шаблонный синтаксис.

- Интерполяция текста:  
  `{{ message }}`
- Интерполяция выражений:  
  `{{ count + 1 }}`
- Динамические атрибуты:  
  `:src="imageUrl"`
- Условный рендеринг, списки, события — через директивы.

---

## Основные директивы Vue

### Динамические атрибуты

- `v-bind` или `:`  
  `:href="link"`  
  `:class="{ active: isActive }"`

### События

- `v-on` или `@`  
  `@click="increment"`

### Условный рендеринг

- `v-if`, `v-else-if`, `v-else` — элемент удаляется из DOM
- `v-show` — скрытие через CSS (`display: none`)

### Списки

```html
<li v-for="item in items" :key="item.id">{{ item.title }}</li>
```

### Работа с HTML

- v-text="msg" — аналог {{ msg }}
- v-html="rawHtml" — вставляет HTML (опасно!)

### Модификаторы событий

| Модификатор | Значение                        | Пример?          |
| ----------- | ------------------------------- | ---------------- |
| .prevent    | отменяет действие по умолчанию  | @submit.prevent? |
| .stop       | останавливает всплытие          | @click.stop?     |
| .once       | обработчик сработает один раз   | @click.once?     |
| .self       | только если событие на элементе | @click.self?     |
| .capture    | обработка на фазе погружения    | @click.capture?  |

Клавиатурные
@keyup.enter, @keyup.esc, @keyup.delete, @keyup.up и т.д.
Мышь
@click.left, @click.right.prevent, @click.middle

Редактирование по двойному клику

```js
<script setup>
import { ref, nextTick } from 'vue'

// Пример входящего объекта
const item = ref({
  id: 1,
  title: 'Мой фильм',
  isEditing: false
})

const inputRef = ref(null)

// Включаем режим редактирования
const startEdit = () => {
  item.value.isEditing = true

  // Ждём, пока input появится в DOM, и ставим фокус
  nextTick(() => {
    inputRef.value?.focus()
  })
}

// Завершаем редактирование
const finishEdit = () => {
  item.value.isEditing = false

  // Можно добавить валидацию или автосохранение
  if (!item.value.title.trim()) {
    item.value.title = 'Без названия'
  }
}
</script>
```

```html
<template>
  <div class="todo-item">
    <!-- Режим редактирования -->
    <el-input
      v-if="item.isEditing"
      v-model="item.title"
      @blur="finishEdit"
      @keyup.enter="finishEdit"
      ref="inputRef"
    />

    <!-- Режим просмотра -->
    <span v-else @dblclick.stop="startEdit"> {{ item.title }} </span>
  </div>
</template>
```

### v-model и формы

| Элемент        | Пример               |
| -------------- | -------------------- |
| input text     | v-model.trim="name"  |
| input number   | v-model.number="age" |
| input search   | v-model.lazy="query" |
| checkbox       | v-model="checked"    |
| checkbox group | v-model="selected"   |
| radio          | v-model="gender"     |
| select         | v-model="country"    |

---

## Стилизация компонентов (Scoped CSS)

### Локальные стили

```html
<style scoped>
  .button {
    background: blue;
  }
</style>
```

### Стилизация дочерних компонентов

#### Когда использовать :deep()

- стилизация Element Plus, Vuetify, Naive UI и других UI‑библиотек;
- изменение внутренних элементов компонента (например, .el-input\_\_inner);
- кастомизация сторонних виджетов (Swiper, Chart.js, DatePicker).

```html
<style scoped>
  :deep(.el-button) {
    font-weight: bold;
  }
</style>
```

### Стили для слотов

Слоты — это контент, который передаётся в компонент из родителя.
`:slotted()` — это точечный инструмент, который работает только с контентом, который пришёл в `slot`.

- применяет стиль только к элементам, переданным в слот;
- не затрагивает внутренние элементы компонента;
- не влияет на дочерние компоненты;
- не нарушает scoped‑изоляцию.

```html
<style scoped>
  :slotted(.title) {
    color: red;
  }
</style>
```

Важно понимать

- `:slotted()` работает только с прямыми детьми слота.
- Если внутри слота вложенность, то нужно использовать `:deep()`.

```html
<MyCard>
  <div>
    <h2 class="title">Заголовок</h2>
  </div>
</MyCard>

<style scoped>
  :deep(.title) {
    color: red;
  }
</style>
```

### Глобальные стили внутри scoped

Иногда нужно применить стиль глобально, но писать отдельный `style` без `scoped` не хочется.

#### Когда использовать

- сброс стилей (body, html, \*)
- глобальные классы (например, .container)
- темы (например, .dark-mode)

```html
<style scoped>
  :global(body) {
    margin: 0;
  }
</style>
```

---

## script setup

```js
<script setup>
const count = ref(0)
const increment = () => count.value++
</script>

<template>
  <button @click="increment">Clicked: {{ count }}</button>
</template>
```

---

## Реактивность: ref и reactive

ref — для примитивов

```js
const count = ref(0);
count.value++;
```

reactive — для объектов

```js
const user = reactive({
  name: "Faridun",
  age: 25,
});
user.age++;
```

Почему .value?
ref создаёт объект-обёртку:

```js
{
  value: 0;
}
```

Vue отслеживает изменения .value.

### Когда использовать что?

- Примитивы → ref
- Объекты/массивы → reactive
- Если нужно деструктурировать → лучше ref

## Вычисляемые свойства (computed)

Используются для производных данных.

Пример

```js
const movies = ref([{ title: "A", rating: 8 }]);

const averageRating = computed(() => {
  const sum = movies.value.reduce((a, m) => a + m.rating, 0);
  return (sum / movies.value.length).toFixed(1);
});
```

Отличие от методов

- computed кешируется
- метод — вызывается каждый раз

### Фильтрация с computed пример для сайта фильмов где есть фильтр по поиску и фильтр радио

```js
const filteredMovies = computed(() => {
  // Поиск имеет приоритет
  if (searchQuery.value) {
    return movies.value.filter((m) =>
      m.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
  }

  // Если поиска нет — фильтр по радио
  if (filter.value === "watched") {
    return movies.value.filter((m) => m.watched);
  } else if (filter.value === "unwatched") {
    return movies.value.filter((m) => !m.watched);
  }

  return movies.value;
});

// Cтатистика через computed
// Средний рейтинг
const averageRating = computed(() => {
  if (movies.value.length === 0) return 0;
  const sum = movies.value.reduce((acc, m) => acc + m.rating, 0);
  return (sum / movies.value.length).toFixed(1);
});

// Лучший фильм
const bestMovie = computed(() => {
  return movies.value.reduce((best, current) =>
    current.rating > best.rating ? current : best,
  );
});
```

---

## Наблюдатели (watch, watchEffect)

### watch

```js
watch(searchQuery, (newVal, oldVal) => {
  console.log("Изменилось:", newVal);
});
```

Используется для:

- API-запросов
- автосохранения
- валидации

### watchEffect

- Автоматически отслеживает всё, что используется внутри.

```js
watchEffect(() => {
  localStorage.setItem("movies", JSON.stringify(movies.value));
});
```

### localStorage

```js
localStorage.setItem("key", JSON.stringify(data));
const data = JSON.parse(localStorage.getItem("key"));
localStorage.removeItem("key");
localStorage.clear();
```

---

## Хуки жизненного цикла

| Хук             | Когда              | Для чего          |
| --------------- | ------------------ | ----------------- |
| onMounted       | компонент появился | DOM, API, таймеры |
| onUnmounted     | компонент удалён   | очистка ресурсов  |
| onBeforeMount   | перед рендером     | редко             |
| onBeforeUnmount | перед удалением    | подготовка        |

Пример очистки

```js
let timer;

onMounted(() => {
  timer = setInterval(() => console.log("tick"), 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
```

---

## Composables — переиспользуемая логика

Функции, которые возвращают реактивные данные и методы.

Пример: счётчик
/composables/useCounter.js

```js
export function useCounter() {
  const count = ref(0);
  const inc = () => count.value++;
  return { count, inc };
}
```

Использование:

```js

<script setup>
const { count, inc } = useCounter()
</script>
```

Преимущества

- Чистый код
- Повторное использование
- Автоимпорт в Nuxt (/composables)

---

## ElMessage (уведомления)

```js
import { ElMessage } from "element-plus";

ElMessage.success("Успех!");
ElMessage.warning("Внимание!");
ElMessage.error("Ошибка!");
ElMessage.info("Информация");
```

### Сетка Element Plus (адаптивность)

```html
<!-- Адаптивность -->
<el-col :xs="24" :sm="12" :md="8" :lg="6">
  <!-- xs: мобильные (24 = всю ширину) -->
  <!-- sm: планшеты (12 = половину) -->
  <!-- md: ноутбуки (8 = треть) -->
  <!-- lg: десктоп (6 = четверть) -->
</el-col>
```
