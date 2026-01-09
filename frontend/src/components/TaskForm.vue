<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <!-- Заголовок -->
    <div class="form-group">
      <label for="title" class="form-label">
        Заголовок <span class="required">*</span>
      </label>
      <input
        id="title"
        ref="titleInput"
        v-model.trim="form.title"
        type="text"
        class="form-input"
        :class="{ error: errors.title }"
        placeholder="Введите название задачи"
        maxlength="200"
        @blur="validateField('title')"
      />
      <span v-if="errors.title" class="form-error">{{ errors.title }}</span>
      <span class="form-hint">{{ form.title.length }}/200 символов</span>
    </div>
    
    <!-- Описание -->
    <div class="form-group">
      <label for="description" class="form-label">Описание</label>
      <textarea
        id="description"
        v-model.trim="form.description"
        class="form-textarea"
        placeholder="Добавьте описание задачи (необязательно)"
        maxlength="1000"
        rows="4"
      ></textarea>
      <span class="form-hint">{{ (form.description || '').length }}/1000 символов</span>
    </div>
    
    <!-- Приоритет (select) -->
    <div class="form-group">
      <label for="priority" class="form-label">Приоритет</label>
      <select
        id="priority"
        v-model="form.priority"
        class="form-select"
      >
        <option value="low">🟢 Низкий</option>
        <option value="medium">🟡 Средний</option>
        <option value="high">🔴 Высокий</option>
      </select>
    </div>
    
    <!-- Категория (radio) -->
    <div class="form-group">
      <label class="form-label">Категория</label>
      <div class="radio-group">
        <label class="form-check">
          <input
            v-model="form.category"
            type="radio"
            value="work"
            name="category"
          />
          <span class="form-check-label">💼 Работа</span>
        </label>
        <label class="form-check">
          <input
            v-model="form.category"
            type="radio"
            value="personal"
            name="category"
          />
          <span class="form-check-label">🏠 Личное</span>
        </label>
        <label class="form-check">
          <input
            v-model="form.category"
            type="radio"
            value="study"
            name="category"
          />
          <span class="form-check-label">📚 Учёба</span>
        </label>
        <label class="form-check">
          <input
            v-model="form.category"
            type="radio"
            value="other"
            name="category"
          />
          <span class="form-check-label">📌 Другое</span>
        </label>
      </div>
    </div>
    
    <!-- Флажок "Важно" (checkbox) -->
    <div class="form-group">
      <label class="form-check">
        <input
          v-model="form.is_important"
          type="checkbox"
        />
        <span class="form-check-label">⭐ Отметить как важную задачу</span>
      </label>
    </div>
    
    <!-- Статус выполнения (только при редактировании) -->
    <div v-if="isEditMode" class="form-group">
      <label class="form-check">
        <input
          v-model="form.is_completed"
          type="checkbox"
        />
        <span class="form-check-label">✅ Задача выполнена</span>
      </label>
    </div>
    
    <!-- Кнопки -->
    <div class="form-actions">
      <button 
        type="button" 
        class="btn btn-outline"
        @click="handleCancel"
      >
        Отмена
      </button>
      <button 
        type="submit" 
        class="btn btn-primary"
        :disabled="isSubmitting"
      >
        <span v-if="isSubmitting" class="spinner-small"></span>
        {{ isEditMode ? 'Сохранить изменения' : 'Создать задачу' }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  initialData: {
    type: Object,
    default: null
  },
  isSubmitting: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel'])
const router = useRouter()

// Refs
const titleInput = ref(null)

// Режим редактирования
const isEditMode = computed(() => !!props.initialData?.id)

// Форма с начальными значениями
const defaultForm = {
  title: '',
  description: '',
  priority: 'medium',
  category: 'other',
  is_important: false,
  is_completed: false
}

const form = reactive({ ...defaultForm })

// Ошибки валидации
const errors = reactive({
  title: ''
})

// Заполнение формы при редактировании
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      Object.assign(form, {
        title: newData.title || '',
        description: newData.description || '',
        priority: newData.priority || 'medium',
        category: newData.category || 'other',
        is_important: newData.is_important || false,
        is_completed: newData.is_completed || false
      })
    }
  },
  { immediate: true }
)

// Фокус на поле заголовка при монтировании
onMounted(() => {
  titleInput.value?.focus()
})

// Валидация поля
const validateField = (field) => {
  if (field === 'title') {
    if (!form.title) {
      errors.title = 'Заголовок обязателен для заполнения'
      return false
    }
    if (form.title.length < 3) {
      errors.title = 'Заголовок должен содержать минимум 3 символа'
      return false
    }
    errors.title = ''
    return true
  }
  return true
}

// Валидация всей формы
const validateForm = () => {
  return validateField('title')
}

// Отправка формы
const handleSubmit = () => {
  if (!validateForm()) return
  
  emit('submit', { ...form })
}

// Отмена
const handleCancel = () => {
  emit('cancel')
  router.back()
}
</script>

<style scoped>
.task-form {
  max-width: 600px;
}

.required {
  color: var(--danger-color);
}

.form-actions {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
}

.spinner-small {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  display: inline-block;
  margin-right: 8px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
