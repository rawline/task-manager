<template>
  <div class="task-item" :class="{ 'completed': task.is_completed, 'important': task.is_important }">
    <div class="task-status">
      <button 
        class="status-btn" 
        :class="{ 'checked': task.is_completed }"
        @click="$emit('toggle-status', task.id)"
        :title="task.is_completed ? 'Отметить как невыполненную' : 'Отметить как выполненную'"
      >
        <span v-if="task.is_completed">✓</span>
      </button>
    </div>
    
    <div class="task-content">
      <div class="task-header">
        <h3 class="task-title">
          {{ task.title }}
          <span v-if="task.is_important" class="important-icon" title="Важная задача">⭐</span>
        </h3>
        <div class="task-badges">
          <span class="badge" :class="priorityClass">{{ priorityText }}</span>
          <span class="badge badge-secondary">{{ categoryText }}</span>
        </div>
      </div>
      
      <p v-if="task.description" class="task-description">{{ task.description }}</p>
      
      <div class="task-meta">
        <span class="meta-item">
          📅 Создано: {{ formatDate(task.created_at) }}
        </span>
        <span v-if="task.updated_at !== task.created_at" class="meta-item">
          🔄 Обновлено: {{ formatDate(task.updated_at) }}
        </span>
      </div>
    </div>
    
    <div class="task-actions">
      <button 
        class="btn btn-sm btn-outline" 
        @click="$emit('edit', task.id)"
        title="Редактировать"
      >
        ✏️ Изменить
      </button>
      <button 
        class="btn btn-sm btn-danger" 
        @click="confirmDelete"
        title="Удалить"
      >
        🗑️ Удалить
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true,
    validator: (task) => {
      return task.id && task.title
    }
  }
})

const emit = defineEmits(['edit', 'delete', 'toggle-status'])

// Computed свойства для отображения приоритета
const priorityClass = computed(() => {
  const classes = {
    high: 'badge-danger',
    medium: 'badge-warning',
    low: 'badge-info'
  }
  return classes[props.task.priority] || 'badge-secondary'
})

const priorityText = computed(() => {
  const texts = {
    high: 'Высокий',
    medium: 'Средний',
    low: 'Низкий'
  }
  return texts[props.task.priority] || props.task.priority
})

// Computed для категории
const categoryText = computed(() => {
  const texts = {
    work: 'Работа',
    personal: 'Личное',
    study: 'Учёба',
    other: 'Другое'
  }
  return texts[props.task.category] || props.task.category
})

// Форматирование даты
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Подтверждение удаления
const confirmDelete = () => {
  if (confirm(`Удалить задачу "${props.task.title}"?`)) {
    emit('delete', props.task.id)
  }
}
</script>

<style scoped>
.task-item {
  display: flex;
  gap: 16px;
  padding: 20px;
  background-color: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  transition: all 0.2s;
  border-left: 4px solid transparent;
}

.task-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.task-item.important {
  border-left-color: var(--warning-color);
  background-color: #fffdf7;
}

.task-item.completed {
  opacity: 0.7;
  background-color: #f8f9fa;
}

.task-item.completed .task-title {
  text-decoration: line-through;
  color: var(--text-light);
}

.task-status {
  flex-shrink: 0;
}

.status-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  background-color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.2s;
}

.status-btn:hover {
  border-color: var(--primary-color);
  background-color: rgba(66, 184, 131, 0.1);
}

.status-btn.checked {
  background-color: var(--success-color);
  border-color: var(--success-color);
  color: white;
}

.task-content {
  flex: 1;
  min-width: 0;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.task-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 8px;
}

.important-icon {
  color: var(--warning-color);
}

.task-badges {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.task-description {
  color: var(--text-light);
  font-size: 14px;
  margin-bottom: 12px;
  line-height: 1.5;
}

.task-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 12px;
  color: var(--text-light);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.task-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .task-item {
    flex-direction: column;
  }
  
  .task-actions {
    flex-direction: row;
    justify-content: flex-end;
  }
  
  .task-header {
    flex-direction: column;
  }
}
</style>
