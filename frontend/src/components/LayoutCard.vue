<template>
  <div class="layout-card" :class="{ 'highlighted': highlighted }">
    <!-- Именованный слот: header -->
    <div v-if="$slots.header" class="layout-card-header">
      <slot name="header"></slot>
    </div>
    
    <!-- Обычный слот: default (контент) -->
    <div class="layout-card-body">
      <slot></slot>
    </div>
    
    <!-- Слот с ограниченной областью видимости (scoped slot) -->
    <div v-if="$slots.actions" class="layout-card-actions">
      <slot 
        name="actions" 
        :toggle-highlight="toggleHighlight" 
        :is-highlighted="highlighted"
      ></slot>
    </div>
    
    <!-- Именованный слот: footer -->
    <div v-if="$slots.footer" class="layout-card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Props для настройки компонента
defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'warning', 'danger'].includes(value)
  }
})

// Внутреннее состояние для демонстрации scoped slot
const highlighted = ref(false)

// Метод, передаваемый через scoped slot
const toggleHighlight = () => {
  highlighted.value = !highlighted.value
}
</script>

<style scoped>
.layout-card {
  background-color: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: all 0.3s ease;
}

.layout-card.highlighted {
  box-shadow: 0 4px 20px rgba(66, 184, 131, 0.3);
  border: 2px solid var(--primary-color);
}

.layout-card-header {
  padding: 20px 24px;
  background-color: #f8f9fa;
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
}

.layout-card-body {
  padding: 24px;
}

.layout-card-actions {
  padding: 16px 24px;
  background-color: #f8f9fa;
  border-top: 1px solid var(--border-color);
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.layout-card-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
  font-size: 14px;
  color: var(--text-light);
}
</style>
