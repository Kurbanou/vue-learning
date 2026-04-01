<script setup>
import { computed, ref } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { ElMessage } from 'element-plus'
import MovieCard from '@/components/MovieCard.vue' // 👈 импортируем

const { data: movies } = useLocalStorage('movies', [
  { id: 1, title: 'Начало', rating: 9, watched: true },
  { id: 2, title: 'Матрица', rating: 10, watched: true },
  { id: 3, title: 'Интерстеллар', rating: 8, watched: false },
  { id: 4, title: 'Дюна', rating: 7, watched: false },
])

const newMovie = ref({ title: '' })

// Функции-обработчики событий от MovieCard
const updateRating = (id, newRating) => {
  const movie = movies.value.find((m) => m.id === id)
  if (movie) movie.rating = newRating
}

const updateWatched = (id) => {
  const movie = movies.value.find((m) => m.id === id)
  if (movie) movie.watched = !movie.watched
}

const deleteMovie = (id) => {
  const deletedMovie = movies.value.find((m) => m.id === id)
  movies.value = movies.value.filter((m) => m.id !== id)
  ElMessage.success(`Фильм "${deletedMovie?.title}" удалён`)
}

const addFilm = () => {
  if (!newMovie.value.title.trim()) {
    ElMessage.warning('Введите название фильма')
    return
  }
  movies.value.push({
    id: crypto.randomUUID(),
    title: newMovie.value.title,
    rating: 5,
    watched: false,
  })
  newMovie.value.title = ''
  ElMessage.success('Фильм добавлен')
}

// Статистика
const totalMovies = computed(() => movies.value.length)
const totalWatched = computed(() => movies.value.filter((m) => m.watched).length)
const midleRate = computed(() => {
  if (movies.value.length === 0) return 0
  const sum = movies.value.reduce((acc, m) => acc + m.rating, 0)
  return (sum / movies.value.length).toFixed(1)
})
</script>

<template>
  <div class="container">
    <!-- Форма добавления -->
    <el-row style="margin-bottom: 40px" justify="center">
      <el-col :span="8">
        <el-form @submit.prevent="addFilm">
          <el-input v-model="newMovie.title" placeholder="Название фильма" />
          <el-button @click="addFilm" type="primary">Добавить</el-button>
        </el-form>
      </el-col>
    </el-row>

    <!-- Статистика -->
    <el-row :gutter="20" style="margin-bottom: 30px">
      <el-col :span="8" :xs="24">
        <el-statistic title="Всего фильмов" :value="totalMovies" />
      </el-col>
      <el-col :span="8" :xs="24">
        <el-statistic title="Просмотрено" :value="totalWatched" />
      </el-col>
      <el-col :span="8" :xs="24">
        <el-statistic title="Средний рейтинг" :value="midleRate" :precision="1" />
      </el-col>
    </el-row>

    <!-- Список фильмов -->
    <div v-if="movies.length > 0">
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @update:rating="updateRating"
        @update:watched="updateWatched"
        @delete="deleteMovie"
      />
    </div>
    <div v-else>
      <el-empty description="Фильмов пока нет" />
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 1240px;
  padding: 0 20px;
  margin: 0 auto;
}

.el-form {
  display: flex;
  gap: 20px;
}
</style>
