<script setup>
import { ref } from 'vue'
const movies = ref([
  { id: 1, title: 'Начало', rating: 9, watched: true },
  { id: 2, title: 'Матрица', rating: 10, watched: true },
  { id: 3, title: 'Интерстеллар', rating: 8, watched: false },
  { id: 4, title: 'Дюна', rating: 7, watched: false },
])
const newMuvie = ref({
  id: null,
  title: '',
  rating: 0,
})
</script>
<template>
  <div v-if="movies" v-for="m in movies" :key="m.id">
    <span>{{ m.rating }}</span>
    <span>{{ m.title }}</span>
    <span>{{ m.watched === true ? 'смотрел' : 'не смотрел' }}</span>
  </div>
</template>
<style scoped></style>
