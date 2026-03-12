<script setup>
import { ref } from 'vue'
const productName = ref('яблоко')
const productPrice = ref(5)
const isAvailable = ref(true)
const productImage = ref(
  'https://png.pngtree.com/png-vector/20250430/ourlarge/pngtree-dewy-red-apple-png-image_16157713.png',
)
const theme = ref('light')
</script>

<template>
  <div :style="{ backgroundColor: theme === 'light' ? '#ffffff' : '#333333' }">
    <button @click="isAvailable = !isAvailable">наличие</button>
    <button @click="theme = theme === 'light' ? 'dark' : 'light'">{{ theme }}</button>
    <button :disabled="!isAvailable">купить</button>

    <div v-if="isAvailable">
      <img :src="productImage" :alt="productName" />
      цена - {{ productPrice }}
    </div>
    <div v-else class="out-of-stock">
      <el-empty :image-size="200" :description="`нет в наличии`" />
    </div>
  </div>
</template>

<style scoped>
.out-of-stock {
  width: 300px;
  height: 300px;
  margin: auto;
}
</style>
