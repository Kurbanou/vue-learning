<script setup>
const props = defineProps({
  pageSize: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['update:currentPage'])
const handlePageChange = (page) => {
  emit('update:currentPage', page)
}
</script>
<template>
  <el-pagination
    size="small"
    background
    :page-size="props.pageSize"
    :pager-count="5"
    layout="prev, pager, next"
    :total="props.total"
    @current-change="handlePageChange"
  />
</template>
<style></style>
