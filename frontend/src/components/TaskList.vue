<template>
  <div class="task-list">
    <!-- Условный рендеринг пустого списка -->
    <div v-if="tasks.length === 0" class="empty-state">
      <div class="empty-state-icon">📝</div>
      <h3 class="empty-state-title">Задачи не найдены</h3>
      <p class="empty-state-text">
        {{ emptyMessage }}
      </p>
      <router-link :to="{ name: 'task-create' }" class="btn btn-primary">
        + Создать задачу
      </router-link>
    </div>
    
    <!-- Список задач с v-for -->
    <TransitionGroup v-else name="list" tag="div" class="tasks-container">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
        @toggle-status="$emit('toggle-status', $event)"
      />
    </TransitionGroup>
    
    <!-- Счётчик задач -->
    <div v-if="tasks.length > 0" class="tasks-count">
      Показано задач: {{ tasks.length }}
    </div>
  </div>
</template>

<script setup>
import TaskItem from './TaskItem.vue'

defineProps({
  tasks: {
    type: Array,
    required: true,
    default: () => []
  },
  emptyMessage: {
    type: String,
    default: 'Создайте свою первую задачу, чтобы начать организовывать дела.'
  }
})

defineEmits(['edit', 'delete', 'toggle-status'])
</script>

<style scoped>
.task-list {
  width: 100%;
}

.tasks-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tasks-count {
  margin-top: 20px;
  text-align: center;
  color: var(--text-light);
  font-size: 14px;
}

/* Анимации списка */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.3s ease;
}
</style>
