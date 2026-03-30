<script setup>
import { ElMessage } from 'element-plus'
import { computed, ref, watch } from 'vue'

const savedMovies = JSON.parse(localStorage.getItem('movies')) || [
  { id: 1, title: 'Начало', rating: 9, watched: true },
  { id: 2, title: 'Матрица', rating: 10, watched: true },
  { id: 3, title: 'Интерстеллар', rating: 8, watched: false },
  { id: 4, title: 'Дюна', rating: 7, watched: false },
]

const movies = ref(savedMovies)

const prevMovies = ref(JSON.parse(JSON.stringify(movies.value)))

watch(
  movies,
  (newMovies) => {
    // Сохраняем в localStorage
    localStorage.setItem('movies', JSON.stringify(newMovies))

    // Сравниваем с предыдущей копией
    if (prevMovies.value.length > 0) {
      for (let i = 0; i < newMovies.length; i++) {
        const newMovie = newMovies[i]
        const oldMovie = prevMovies.value.find((m) => m.id === newMovie.id)

        if (oldMovie && oldMovie.rating !== newMovie.rating && newMovie.rating === 10) {
          ElMessage.success(`Шедевр! 🏆 ${newMovie.title} получил 10!`)
        }
      }
    }

    // Обновляем предыдущее состояние
    prevMovies.value = JSON.parse(JSON.stringify(newMovies))
  },
  { deep: true },
)

const newMovie = ref({
  id: null,
  title: '',
  rating: 0,
})
const addFilm = () => {
  if (!newMovie.value.title) return
  movies.value.push({
    id: crypto.randomUUID(),
    title: newMovie.value.title,
    rating: 0,
    watched: false,
  })
  newMovie.value.title = ''
}

const totalMovies = computed(() => movies.value.length)
const totalWatched = computed(() => movies.value.filter((m) => m.watched).length)
const midleRate = computed(() => {
  if (!movies.value && movies.value.length === 0) {
    return 0
  }
  const rate = movies.value.reduce((acc, movie) => {
    return acc + movie.rating || 0
  }, 0)

  return rate / movies.value.length
})
</script>
<template>
  <div class="container">
    <!-- Добавляем новый фильм -->
    <el-row style="margin-bottom: 40px" justify="center">
      <el-col :span="8">
        <el-form @submit.prevent="addFilm">
          <el-input v-model="newMovie.title" placeholder="input movie title"></el-input>
          <el-button @click="addFilm" type="primary">add film</el-button>
        </el-form>
      </el-col>
    </el-row>

    <!-- Статистика -->

    <el-row :gutter="20">
      <el-col :span="8" :xs="24">Все фильмов: {{ totalMovies }}</el-col>
      <el-col :span="8" :xs="24">Просмотренно фильмов: {{ totalWatched }}</el-col>
      <el-col :span="8" :xs="24">Средний рейтинг фильмов: {{ midleRate }}</el-col>
    </el-row>

    <!-- Отображаем фильмы -->

    <div v-if="movies.length > 0">
      <el-row :gutter="20" v-for="m in movies" :key="m.id" class="list_movies">
        <el-col :span="8"
          ><el-tag type="primary">rate</el-tag> <el-rate v-model="m.rating" :max="10"></el-rate
        ></el-col>
        <el-col :span="8"
          ><el-tag type="info" effect="plain">title: {{ m.title }}</el-tag></el-col
        >
        <el-col :span="8" @click.stop="m.watched = !m.watched"
          ><el-tag :type="m.watched ? 'success' : 'danger'" effect="plain"
            >watched: {{ m.watched === true ? 'yes' : 'no' }}</el-tag
          ></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<style scoped>
:global(.container) {
  width: 100%;
  max-width: 1240px;
  padding: 0 20px;
  margin: 0 auto;
}

.el-form {
  display: flex;
  gap: 20px;
}

.list_movies .el-col {
  display: flex;
  align-items: center;
  gap: 8px;
}

:global(.el-input__suffix) {
  cursor: pointer;
}

@media (max-width: 768px) {
  :global(.container) {
    padding: 0 10px;
  }
}
</style>
