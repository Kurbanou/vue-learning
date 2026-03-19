<script setup>
import { computed, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const movies = ref([
  { id: 1, title: 'Начало', rating: 9, watched: true },
  { id: 2, title: 'Матрица', rating: 10, watched: true },
  { id: 3, title: 'Интерстеллар', rating: 8, watched: false },
  { id: 4, title: 'Дюна', rating: 7, watched: false },
])
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

const filter = ref('')
const searchQuery = ref('')
const filteredMovie = computed(() => {
  // фильтр по поиску
  if (searchQuery.value.length > 0) {
    let result = movies.value.filter((m) =>
      m.title.toLocaleLowerCase().includes(searchQuery.value.toLocaleLowerCase()),
    )
    return result
  }
  // фильтр по радио

  if (filter.value === 'watched') {
    let result = movies.value.filter((m) => m.watched)
    return result
  } else if (filter.value === 'unwatched') {
    let result = movies.value.filter((m) => !m.watched)
    return result
  }

  return movies.value
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

    <!-- Блок управления отображением поиск и фильтрация -->
    <el-row :gutter="20" style="margin-bottom: 40px">
      <el-col :span="12">
        <el-input
          v-model.lazy="searchQuery"
          placeholder="Please Input"
          :suffix-icon="Search"
        ></el-input>
      </el-col>
      <el-col :span="12">
        <el-radio-group v-model="filter">
          <el-radio value="all">all</el-radio>
          <el-radio value="watched">watched</el-radio>
          <el-radio value="unwatched">unwatched</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>

    <!-- Отображаем фильмы -->

    <div>{{ searchQuery }}</div>
    <div v-if="movies.length > 0">
      <el-row :gutter="20" v-for="m in filteredMovie" :key="m.id" class="list_movies">
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
