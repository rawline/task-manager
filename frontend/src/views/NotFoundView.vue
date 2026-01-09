<template>
  <div class="not-found-page">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h1 class="error-title">Страница не найдена</h1>
      <p class="error-text">
        К сожалению, запрашиваемая страница не существует или была перемещена.
      </p>
      <div class="error-actions">
        <router-link :to="{ name: 'home' }" class="btn btn-primary btn-lg">
          🏠 На главную
        </router-link>
        <router-link :to="{ name: 'tasks' }" class="btn btn-outline btn-lg">
          📋 К задачам
        </router-link>
      </div>
      <p class="error-path">
        Запрошенный путь: <code>{{ currentPath }}</code>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const currentPath = computed(() => route.fullPath)
</script>

<style scoped>
.not-found-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 40px 20px;
}

.not-found-content {
  max-width: 500px;
}

.error-code {
  font-size: 120px;
  font-weight: 700;
  color: var(--primary-color);
  line-height: 1;
  margin-bottom: 16px;
}

.error-title {
  font-size: 32px;
  color: var(--primary-dark);
  margin-bottom: 16px;
}

.error-text {
  font-size: 18px;
  color: var(--text-light);
  margin-bottom: 32px;
}

.error-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.error-path {
  font-size: 14px;
  color: var(--text-light);
}

.error-path code {
  background-color: #f1f3f4;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: monospace;
}

@media (max-width: 600px) {
  .error-code {
    font-size: 80px;
  }
  
  .error-title {
    font-size: 24px;
  }
}
</style>
