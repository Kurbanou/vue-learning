<script setup>
import { ref, computed } from "vue";
const task1Number = ref(0);
const kvadrat = computed(() => {
  return task1Number.value ** 2;
});
const filmoteka = ref([
  { id: 1, title: "Matrix", rating: 9 },
  { id: 2, title: "Avatar", rating: 7 },
]);

const remFilm = (id) => {
  filmoteka.value = filmoteka.value.filter((f) => f.id !== id);
};
</script>
<template>
  <div class="task">
    <el-row :gutter="20">
      <el-col>
        <el-button type="primary" size="small" @click="task1Number++"
          >press me to ++ {{ task1Number }}
        </el-button></el-col
      >
      <el-col
        ><el-input v-model="task1Number" style="width: 100px"></el-input
      ></el-col>
      <el-col
        ><el-tag type="info" effect="dark">{{ kvadrat }}</el-tag></el-col
      >
    </el-row>
    <h3 style="margin: 20px auto; text-align: center">Список фильмов</h3>
    <el-row
      v-for="move in filmoteka"
      :key="move.id"
      :gutter="20"
      justify="center"
    >
      <el-col>{{ move.title }}</el-col>
      <el-col><el-rate v-model="move.rating"></el-rate></el-col>
      <el-col
        ><el-button type="danger" size="small" @click="remFilm(move.id)"
          >dell</el-button
        ></el-col
      >
    </el-row>
  </div>
</template>

<style scoped>
.task {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.task .el-row {
  align-items: center;
}
.el-col {
  flex: auto;
}
</style>
