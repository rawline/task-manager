<template>
  <div class="tasks-page">
    <div class="page-header">
      <h1 class="page-title">📋 Список задач</h1>
      <router-link :to="{ name: 'task-create' }" class="btn btn-primary">
        + Новая задача
      </router-link>
    </div>
    
    <!-- Фильтры и сортировка -->
    <div class="filters-bar">
      <div class="filters-group">
        <label class="filter-label">Статус:</label>
        <select v-model="filters.status" class="form-select filter-select">
          <option value="all">Все задачи</option>
          <option value="pending">Невыполненные</option>
          <option value="completed">Выполненные</option>
        </select>
      </div>
      
      <div class="filters-group">
        <label class="filter-label">Сортировка:</label>
        <select v-model="filters.sortBy" class="form-select filter-select">
          <option value="date">По дате</option>
          <option value="title">По алфавиту</option>
          <option value="priority">По приоритету</option>
        </select>
      </div>
      
      <div class="filters-group">
        <label class="filter-label">Порядок:</label>
        <select v-model="filters.sortOrder" class="form-select filter-select">
          <option value="desc">По убыванию</option>
          <option value="asc">По возрастанию</option>
        </select>
      </div>
      
      <button 
        class="btn btn-sm btn-outline" 
        @click="resetFilters"
        title="Сбросить фильтры"
      >
        🔄 Сбросить
      </button>
    </div>
    
    <!-- Состояние загрузки -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
    </div>
    
    <!-- Ошибка -->
    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
      <button class="btn btn-sm btn-outline mt-2" @click="fetchTasks">
        Попробовать снова
      </button>
    </div>
    
    <!-- Список задач -->
    <TaskList
      v-else
      :tasks="filteredTasks"
      :empty-message="emptyMessage"
      @edit="handleEdit"
      @delete="handleDelete"
      @toggle-status="handleToggleStatus"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { tasksApi } from '@/api/tasks'
import TaskList from '@/components/TaskList.vue'

const router = useRouter()

// Состояние
const tasks = ref([])
const loading = ref(true)
const error = ref(null)

// Фильтры
const filters = reactive({
  status: 'all',
  sortBy: 'date',
  sortOrder: 'desc'
})

// Computed: отфильтрованные и отсортированные задачи
const filteredTasks = computed(() => {
  let result = [...tasks.value]
  
  // Фильтрация по статусу
  if (filters.status === 'completed') {
    result = result.filter(t => t.is_completed)
  } else if (filters.status === 'pending') {
    result = result.filter(t => !t.is_completed)
  }
  
  // Сортировка
  result.sort((a, b) => {
    let comparison = 0
    
    if (filters.sortBy === 'title') {
      comparison = a.title.localeCompare(b.title, 'ru')
    } else if (filters.sortBy === 'date') {
      comparison = new Date(a.created_at) - new Date(b.created_at)
    } else if (filters.sortBy === 'priority') {
      const order = { high: 0, medium: 1, low: 2 }
      comparison = order[a.priority] - order[b.priority]
    }
    
    return filters.sortOrder === 'desc' ? -comparison : comparison
  })
  
  return result
})

// Сообщение для пустого списка
const emptyMessage = computed(() => {
  if (filters.status === 'completed') {
    return 'Нет выполненных задач. Пора приступить к работе!'
  }
  if (filters.status === 'pending') {
    return 'Все задачи выполнены! Отличная работа! 🎉'
  }
  return 'Список задач пуст. Создайте первую задачу!'
})

// Загрузка задач
const fetchTasks = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await tasksApi.getAll()
    tasks.value = response.data
  } catch (err) {
    error.value = 'Не удалось загрузить задачи. Проверьте соединение с сервером.'
    console.error('Fetch tasks error:', err)
  } finally {
    loading.value = false
  }
}

// Watcher для фильтров - можно использовать для отправки на сервер
watch(filters, (newFilters) => {
  console.log('Filters changed:', newFilters)
  // Здесь можно отправлять запрос на сервер с параметрами фильтрации
}, { deep: true })

// Редактирование задачи - программная навигация
const handleEdit = (taskId) => {
  router.push({ name: 'task-edit', params: { id: taskId } })
}

// Удаление задачи
const handleDelete = async (taskId) => {
  try {
    await tasksApi.delete(taskId)
    tasks.value = tasks.value.filter(t => t.id !== taskId)
  } catch (err) {
    alert('Ошибка при удалении задачи')
    console.error('Delete error:', err)
  }
}

// Переключение статуса
const handleToggleStatus = async (taskId) => {
  try {
    const response = await tasksApi.toggleStatus(taskId)
    const index = tasks.value.findIndex(t => t.id === taskId)
    if (index !== -1) {
      tasks.value[index] = response.data
    }
  } catch (err) {
    alert('Ошибка при изменении статуса')
    console.error('Toggle status error:', err)
  }
}

// Сброс фильтров
const resetFilters = () => {
  filters.status = 'all'
  filters.sortBy = 'date'
  filters.sortOrder = 'desc'
}

// Загрузка при монтировании
onMounted(() => {
  fetchTasks()
})
</script>

<style scoped>
.tasks-page {
  max-width: 900px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.page-title {
  font-size: 28px;
  color: var(--primary-dark);
  margin: 0;
}

.filters-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-end;
  padding: 20px;
  background-color: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  margin-bottom: 24px;
}

.filters-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-light);
  text-transform: uppercase;
}

.filter-select {
  width: auto;
  min-width: 150px;
  padding: 8px 12px;
}

@media (max-width: 600px) {
  .page-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filters-bar {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-select {
    width: 100%;
  }
}
</style>
