<template>
  <div class="task-create-page">
    <div class="page-header">
      <router-link to="/tasks" class="back-link">
        ← Вернуться к списку
      </router-link>
      <h1 class="page-title">➕ Создание задачи</h1>
    </div>
    
    <LayoutCard>
      <template #header>Новая задача</template>
      
      <div v-if="error" class="alert alert-danger mb-3">
        {{ error }}
      </div>
      
      <TaskForm
        :is-submitting="isSubmitting"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
      
      <template #footer>
        Заполните форму и нажмите "Создать задачу"
      </template>
    </LayoutCard>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { tasksApi } from '@/api/tasks'
import TaskForm from '@/components/TaskForm.vue'
import LayoutCard from '@/components/LayoutCard.vue'

const router = useRouter()

// Состояние
const isSubmitting = ref(false)
const error = ref(null)

// Обработка отправки формы
const handleSubmit = async (formData) => {
  isSubmitting.value = true
  error.value = null
  
  try {
    await tasksApi.create(formData)
    // Программная навигация после успешного создания
    router.push({ name: 'tasks' })
  } catch (err) {
    error.value = 'Не удалось создать задачу. Попробуйте ещё раз.'
    console.error('Create task error:', err)
  } finally {
    isSubmitting.value = false
  }
}

// Отмена
const handleCancel = () => {
  router.push({ name: 'tasks' })
}
</script>

<style scoped>
.task-create-page {
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
