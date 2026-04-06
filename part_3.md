[⬅️ На главную](./README.md) | [⚙️ Установка](./install.md) | [📋 План](./plan.md)

# Часть 3

- [ ] Создание и импорт компонентов.
- [ ] Передача данных в компонент (Props).
- [ ] Генерация событий из компонента (Emits).
- [ ] Слоты (Slots) для гибкой компоновки контента.
- [ ] Динамические компоненты (`<component :is="...">`).

## Props — передача данных в компонент

### 🎯 1. Простой пропс (строка, число)

```html
//Ребёнок (Child.vue):

<script setup>
  const props = defineProps(['title', 'count'])
</script>

<template>
  <h3>{{ title }}</h3>
  <p>{{ count }}</p>
</template>
```

```html
//Родитель <Child title="Заголовок" :count="42" />
```

### 🎯 2. Пропс с типом и обязательностью

```html
//ребенок
<script setup>
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      default: 18,
    },
  })
</script>
```

### 🎯 3. Пропс-объект

```html
//Ребенок
<script setup>
  const props = defineProps({
    user: {
      type: Object,
      required: true,
    },
  })
</script>

<template>
  <p>{{ user.name }} — {{ user.age }} лет</p>
</template>
```

```html
//Родитель: <UserCard :user="{ name: 'Иван', age: 25 }" />
```

### 🎯 4. Значения по умолчанию для объектов и массивов

```js
// ❌ Неправильно (будет один объект на все компоненты)
const props = defineProps({
  user: {
    type: Object,
    default: { name: 'Аноним' }, // опасно!
  },
})

// ✅ Правильно (фабричная функция)
const props = defineProps({
  user: {
    type: Object,
    default: () => ({ name: 'Аноним' }),
  },
  items: {
    type: Array,
    default: () => [],
  },
})
```

### 🎯 5. Валидация пропсов (кастомная проверка)

```js
const props = defineProps({
  age: {
    type: Number,
    validator: (value) => value >= 0 && value <= 120,
  },
  status: {
    validator: (value) => ['active', 'inactive', 'pending'].includes(value),
  },
})
```

### 🎯 6. Несколько типов для одного пропса

```js
const props = defineProps({
  value: {
    type: [String, Number], // может быть строкой или числом
    default: '',
  },
})
```

### 🎯 7. Чекбокс через пропс (важно!)

Пропсы нельзя менять напрямую! Через v-model нельзя.

```html
<!-- Нативный чекбокс -->
<input type="checkbox" :checked="todo.completed" @change="emit('toggle', todo.id)" />

<!-- Element Plus чекбокс -->
<el-checkbox :model-value="todo.completed" @update:model-value="emit('toggle', todo.id)" />
```

```html
<!-- Ребёнок полностью -->
<script setup>
  const props = defineProps({
    todo: {
      type: Object,
      required: true,
    },
  })

  const emit = defineEmits(['toggle'])
</script>

<template>
  <el-checkbox :model-value="todo.completed" @update:model-value="emit('toggle', todo.id)" />
  <span>{{ todo.text }}</span>
</template>

<!-- Родитель -->
<script setup>
  const todos = ref([{ id: 1, text: 'Купить хлеб', completed: false }])

  const handleToggle = (id) => {
    const todo = todos.value.find((t) => t.id === id)
    todo.completed = !todo.completed
  }
</script>

<template>
  <TodoItem v-for="item in todos" :key="item.id" :todo="item" @toggle="handleToggle" />
</template>
```

### 🎯 8. Передача всех пропсов разом (v-bind без аргумента)

```html
<!-- Вместо -->
<UserCard :name="user.name" :age="user.age" :city="user.city" />

<!-- Можно так -->
<UserCard v-bind="user" />
```

### 🎯 9. defineProps возвращает объект пропсов (для доступа в JS)

```js
const props = defineProps(['title', 'count'])

// Можно обращаться через props.title
console.log(props.title)
```

### 🎯 10. v-model — синтаксический сахар

```html
<!-- Короткая запись -->
<CustomInput v-model="text" />

<!-- Полная запись (то же самое) -->
<CustomInput :model-value="text" @update:model-value="text = $event" />
```

```js
// В компоненте:
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
```

С аргументом (v-model:имя):

```html
<!-- Короткая запись -->
<CustomInput v-model:current-page="page" />

<!-- Полная запись (то же самое) -->
<CustomInput :current-page="page" @update:current-page="page = $event" />
```

```js
// В компоненте:
defineProps(['currentPage'])
defineEmits(['update:currentPage'])
```

### 🎯 11. Что нужно в компоненте для v-model

```js
// 1. Пропс для получения значения
const props = defineProps({
  currentPage: Number,
})

// 2. Событие для отправки нового значения
const emit = defineEmits(['update:currentPage'])

// 3. При изменении вызываем emit
const handleChange = (newValue) => {
  emit('update:currentPage', newValue)
}
```

### 🎯 12. Именование

| В шаблоне (kebab-case) | В JS (camelCase) |
| ---------------------- | ---------------- |
| v-model:current-page   | currentPage      |
| v-model:search-text    | searchText       |
| v-model:user-id        | userId           |

### 🧠 Золотые правила

| Правило                       | Пояснение                                   |
| ----------------------------- | ------------------------------------------- |
| Пропсы нельзя менять напрямую | Если нужно изменить — отправляй emit        |
| : — данные вниз               | Родитель → Ребёнок                          |
| @ — события вверх             | ебёнок → Родитель                           |
| v-model = : + @               | Синтаксический сахар для двусторонней связи |

### 📊 Синтаксис направления данных

| Синтаксис        | Направление           | Что делает           |
| ---------------- | --------------------- | -------------------- |
| :prop="value"    | ⬇️ Родитель → Ребёнок | Передаёт данные      |
| @event="handler" | ⬆️ Ребёнок → Родитель | Получает уведомление |

```html
<!-- Передаём начальное значение в ребёнка (пропс) -->
<ButtonPanel :initial-value="10" />

<!-- Слушаем событие от ребёнка (когда нажата кнопка) -->
<ButtonPanel @btn="handleClick" />
```
