[⬅️ На главную](./README.md) | [⚙️ Установка](./install.md) | [📋 План](./plan.md)

# Часть 3

- [ ] Создание и импорт компонентов.
- [ ] Передача данных в компонент (Props).
- [ ] Генерация событий из компонента (Emits).
- [ ] Слоты (Slots) для гибкой компоновки контента.
- [ ] Динамические компоненты (`<component :is="...">`).

## Props — передача данных в компонент

### 🎯 1. Простой пропс (строка, число)

```js
//Ребёнок (Child.vue):

<script setup>
const props = defineProps(['title', 'count'])
</script>

<template>
  <h3>{{ title }}</h3>
  <p>{{ count }}</p>
</template>
```

```js
//Родитель
<Child title="Заголовок" :count="42" />
```

### 🎯 2. Пропс с типом и обязательностью

```js
//ребенок
<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    default: 18
  }
})
</script>
```

### 🎯 3. Пропс-объект

```js
//Ребенок
<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <p>{{ user.name }} — {{ user.age }} лет</p>
</template>
```

```js
//Родитель:
<UserCard :user="{ name: 'Иван', age: 25 }" />

```

### 🎯 4. Чекбокс через пропс (важно!)

Пропсы нельзя менять напрямую! Через v-model нельзя.

```js
//Нативный чекбокс:
<input
  type="checkbox"
  :checked="todo.completed"
  @change="emit('toggle', todo.id)"
/>

//Element Plus чекбокс:
<el-checkbox
  :model-value="todo.completed"
  @update:model-value="emit('toggle', todo.id)"
/>
```

```js

//Ребёнок полностью:
<script setup>
const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle'])
</script>

<template>
  <el-checkbox
    :model-value="todo.completed"
    @update:model-value="emit('toggle', todo.id)"
  />
  <span>{{ todo.text }}</span>
</template>

//Родитель
<script setup>
const todos = ref([{ id: 1, text: 'Купить хлеб', completed: false }])

const handleToggle = (id) => {
  const todo = todos.value.find(t => t.id === id)
  todo.completed = !todo.completed
}
</script>

<template>
  <TodoItem
    v-for="item in todos"
    :key="item.id"
    :todo="item"
    @toggle="handleToggle"
  />
</template>
```

🧠 Золотое правило

- Пропсы нельзя менять напрямую.
- Если нужно изменить — отправляй emit.
