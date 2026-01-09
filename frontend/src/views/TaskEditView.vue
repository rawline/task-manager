<template>
  <div class="task-edit-page">
    <div class="page-header">
      <router-link to="/tasks" class="back-link">
        ← Вернуться к списку
      </router-link>
      <h1 class="page-title">✏️ Редактирование задачи</h1>
    </div>
    
    <!-- Загрузка -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
    </div>
    
    <!-- Ошибка загрузки -->
    <div v-else-if="loadError" class="alert alert-danger">
      {{ loadError }}
      <router-link to="/tasks" class="btn btn-outline mt-2">
        Вернуться к списку
      </router-link>
    </div>
    
    <!-- Форма редактирования -->
    <LayoutCard v-else>
      <template #header>
        Редактирование: {{ task?.title }}
      </template>
      
      <div v-if="saveError" class="alert alert-danger mb-3">
        {{ saveError }}
      </div>
      
      <TaskForm
        :initial-data="task"
        :is-submitting="isSubmitting"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
      
      <template #footer>
        ID задачи: {{ id }} | Создана: {{ formatDate(task?.created_at) }}
      </template>
    </LayoutCard>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { tasksApi } from '@/api/tasks'
import TaskForm from '@/components/TaskForm.vue'
import LayoutCard from '@/components/LayoutCard.vue'

const router = useRouter()
const route = useRoute()

// Props из маршрута
const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

// Состояние
const task = ref(null)
const loading = ref(true)
const loadError = ref(null)
const saveError = ref(null)
const isSubmitting = ref(false)

// Форматирование даты
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Загрузка задачи
const fetchTask = async () => {
  loading.value = true
  loadError.value = null
  
  try {
    const response = await tasksApi.getById(props.id)
    task.value = response.data
  } catch (err) {
    if (err.response?.status === 404) {
      loadError.value = `Задача с ID ${props.id} не найдена`
    } else {
      loadError.value = 'Не удалось загрузить задачу. Попробуйте обновить страницу.'
    }
    console.error('Fetch task error:', err)
  } finally {
    loading.value = false
  }
}

// Сохранение изменений
const handleSubmit = async (formData) => {
  isSubmitting.value = true
  saveError.value = null
  
  try {
    await tasksApi.update(props.id, formData)
    // Программная навигация после успешного сохранения
    router.push({ name: 'tasks' })
  } catch (err) {
    saveError.value = 'Не удалось сохранить изменения. Попробуйте ещё раз.'
    console.error('Update task error:', err)
  } finally {
    isSubmitting.value = false
  }
}

// Отмена
const handleCancel = () => {
  router.push({ name: 'tasks' })
}

// Загрузка при монтировании
onMounted(() => {
  fetchTask()
})
</script>

<style scoped>
.task-edit-page {
  max-width: 700px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 24px;
}

.back-link {
  display: inline-block;
  margin-bottom: 12px;
  color: var(--text-light);
  font-size: 14px;
}

.back-link:hover {
  color: var(--primary-color);
}

.page-title {
  font-size: 28px;
  color: var(--primary-dark);
  margin: 0;
}
</style>
