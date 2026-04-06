<script setup>
import { computed, ref } from 'vue'
import AppPagination from './AppPagination.vue'

const list = [
  {
    id: 1,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 2,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 3,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 4,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 5,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 6,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 7,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 8,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 9,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 10,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 11,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 12,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 13,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 14,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 15,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 16,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 17,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 18,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
]

const currentPage = ref(1)
const pageSize = 3
const totalItems = list.length
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize

  return list.slice(start, end)
})

const updateCurrentPage = (page) => {
  currentPage.value = page
}
</script>
<template>
  <div style="margin-bottom: 10px" v-for="item in paginatedItems" :key="item.id">
    {{ item.id }} - {{ item.text }}
  </div>
  <app-pagination
    style="margin-top: 30px"
    :total="totalItems"
    :page-size="pageSize"
    :current-page="currentPage"
    @update:current-page="updateCurrentPage"
  />
</template>
<style></style>
