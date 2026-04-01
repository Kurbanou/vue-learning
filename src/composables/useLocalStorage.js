import { ref, watch } from 'vue'
export function useLocalStorage(key, defaultValue) {
  // Загружаем данные из localStorage или берём значение по умолчанию
  const data = ref(JSON.parse(localStorage.getItem(key) || defaultValue))
  // Следим за изменениями и сохраняем
  watch(
    data,
    () => {
      localStorage.setItem(key, JSON.stringify(data.value))
    },
    { deep: true },
  )
  // Возвращаем то, что нужно компоненту
  return { data }
}
