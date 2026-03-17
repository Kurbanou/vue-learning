[⬅️ На главную](./README.md) | [⚙️ Установка](./INSTALL.md) | [📋 План](./PLAN.md)

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

# Урок 2: Краткая теория: Модификаторы событий

Модификаторы — это специальные суффиксы, которые добавляются к директиве v-on (или @) через точку. Они меняют поведение обработчика событий.

## Основные модификаторы:

### Модификатор Назначение Пример

- .prevent Вызывает event.preventDefault() — отменяет действие по умолчанию @submit.prevent="onSubmit"
- .stop Вызывает event.stopPropagation() — останавливает всплытие события @click.stop="onClick"
- .once Событие сработает только один раз @click.once="onClick"
- .capture Режим capture (событие ловится на фазе погружения) @click.capture="onClick"
- .self Срабатывает только если событие на самом элементе (не от дочерних) @click.self="onClick"
- .passive Улучшает производительность скролла @scroll.passive="onScroll"

## Модификаторы клавиш:

### Модификатор Назначение Пример

- .enter Срабатывает при нажатии Enter @keyup.enter="submit"
- .tab При нажатии Tab @keyup.tab="nextField"
- .delete Delete или Backspace @keyup.delete="clear"
- .esc Escape @keyup.esc="closeModal"
- .space Пробел @keyup.space="playPause"
- .up/.down/.left/.right Стрелки @keyup.up="moveUp"

## Модификаторы мыши:

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

# Итоги по 1 часть

# 📚 Vue 3 Шпаргалка (Самое главное)

## 🎯 Модификаторы событий

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
