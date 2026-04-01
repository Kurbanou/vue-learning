<!-- src/components/MovieCard.vue -->
<script setup>
// Props — данные, которые приходят из родителя
const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
})

// Emits — события, которые отправляем родителю
const emit = defineEmits(['update:rating', 'update:watched', 'edit-title', 'delete'])
</script>

<template>
  <el-row :gutter="20" class="list_movies">
    <!-- Рейтинг -->
    <el-col :span="6">
      <el-tag type="primary">rate</el-tag>
      <el-rate
        :model-value="movie.rating"
        :max="10"
        @update:model-value="emit('update:rating', movie.id, $event)"
      />
    </el-col>

    <!-- Название -->
    <el-col :span="6">
      <el-tag type="info" effect="plain">title: {{ movie.title }}</el-tag>
    </el-col>

    <!-- Статус просмотра -->
    <el-col :span="6" @click.stop="emit('update:watched', movie.id)">
      <el-tag :type="movie.watched ? 'success' : 'danger'" effect="plain">
        watched: {{ movie.watched ? 'yes' : 'no' }}
      </el-tag>
    </el-col>

    <!-- Кнопка удаления -->
    <el-col :span="6">
      <el-button @click.stop="emit('delete', movie.id)" type="danger" size="small">
        delete
      </el-button>
    </el-col>
  </el-row>
</template>

<style scoped>
.list_movies {
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: all 0.3s;
}

.list_movies:hover {
  background-color: #f0f0f0;
  transform: translateX(5px);
}

.list_movies .el-col {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
