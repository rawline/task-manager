<template>
  <div class="home-page">
    <!-- Hero секция -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">📋 Task Manager</h1>
        <p class="hero-subtitle">
          Простой и удобный менеджер задач на Vue 3 + FastAPI
        </p>
        <div class="hero-actions">
          <router-link :to="{ name: 'tasks' }" class="btn btn-primary btn-lg">
            Перейти к задачам
          </router-link>
          <router-link :to="{ name: 'task-create' }" class="btn btn-outline btn-lg">
            + Создать задачу
          </router-link>
        </div>
      </div>
    </section>
    
    <!-- Статистика -->
    <section class="stats-section">
      <h2 class="section-title">📊 Статистика</h2>
      
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
      </div>
      
      <div v-else-if="error" class="alert alert-danger">
        {{ error }}
      </div>
      
      <div v-else class="stats-grid">
        <LayoutCard>
          <template #header>Всего задач</template>
          <div class="stat-value">{{ stats.total }}</div>
        </LayoutCard>
        
        <LayoutCard>
          <template #header>Выполнено</template>
          <div class="stat-value success">{{ stats.completed }}</div>
        </LayoutCard>
        
        <LayoutCard>
          <template #header>В работе</template>
          <div class="stat-value warning">{{ stats.pending }}</div>
        </LayoutCard>
        
        <LayoutCard>
          <template #header>Важных</template>
          <div class="stat-value danger">{{ stats.important }}</div>
        </LayoutCard>
      </div>
    </section>
    
    <!-- Возможности -->
    <section class="features-section">
      <h2 class="section-title">✨ Возможности приложения</h2>
      
      <div class="features-grid">
        <!-- Демонстрация слотов -->
        <LayoutCard>
          <template #header>🎯 Управление задачами</template>
          <p>Создавайте, редактируйте и удаляйте задачи. Отмечайте выполненные.</p>
          <template #footer>CRUD операции</template>
        </LayoutCard>
        
        <LayoutCard>
          <template #header>🔍 Фильтрация и сортировка</template>
          <p>Фильтруйте задачи по статусу и сортируйте по дате или алфавиту.</p>
          <template #footer>computed свойства</template>
        </LayoutCard>
        
        <LayoutCard>
          <template #header>🧩 Компонентная архитектура</template>
          <p>Приложение построено на переиспользуемых компонентах Vue 3.</p>
          <template #footer>props, events, slots</template>
        </LayoutCard>
        
        <!-- Демонстрация scoped slot -->
        <LayoutCard>
          <template #header>🎨 Слоты с областью видимости</template>
          <p>Интерактивные компоненты с передачей данных через scoped slots.</p>
          <template #actions="{ toggleHighlight, isHighlighted }">
            <button 
              class="btn btn-sm"
              :class="isHighlighted ? 'btn-primary' : 'btn-outline'"
              @click="toggleHighlight"
            >
              {{ isHighlighted ? '⭐ Выделено!' : 'Выделить карточку' }}
            </button>
          </template>
        </LayoutCard>
      </div>
    </section>
    
    <!-- Технологии -->
    <section class="tech-section">
      <h2 class="section-title">🛠️ Технологии</h2>
      <div class="tech-grid">
        <div class="tech-item">
          <span class="tech-icon">💚</span>
          <span class="tech-name">Vue 3</span>
        </div>
        <div class="tech-item">
          <span class="tech-icon">⚡</span>
          <span class="tech-name">Vite</span>
        </div>
        <div class="tech-item">
          <span class="tech-icon">🐍</span>
          <span class="tech-name">FastAPI</span>
        </div>
        <div class="tech-item">
          <span class="tech-icon">🐳</span>
          <span class="tech-name">Docker</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { tasksApi } from '@/api/tasks'
import LayoutCard from '@/components/LayoutCard.vue'

// Состояние
const stats = ref({
  total: 0,
  completed: 0,
  pending: 0,
  important: 0
})
const loading = ref(true)
const error = ref(null)

// Загрузка статистики при монтировании компонента
onMounted(async () => {
  try {
    const response = await tasksApi.getStats()
    stats.value = response.data
  } catch (err) {
    error.value = 'Не удалось загрузить статистику. Проверьте соединение с сервером.'
    console.error('Stats error:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.home-page {
  padding-bottom: 40px;
}

/* Hero */
.hero {
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, var(--primary-dark) 0%, #4a6fa5 100%);
  border-radius: var(--radius);
  color: white;
  margin-bottom: 40px;
}

.hero-title {
  font-size: 48px;
  margin-bottom: 16px;
}

.hero-subtitle {
  font-size: 20px;
  opacity: 0.9;
  margin-bottom: 32px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-actions .btn-outline {
  border-color: white;
  color: white;
}

.hero-actions .btn-outline:hover {
  background-color: white;
  color: var(--primary-dark);
}

/* Sections */
.section-title {
  font-size: 28px;
  margin-bottom: 24px;
  color: var(--primary-dark);
}

/* Stats */
.stats-section {
  margin-bottom: 40px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-value {
  font-size: 48px;
  font-weight: 700;
  color: var(--primary-dark);
  text-align: center;
}

.stat-value.success {
  color: var(--success-color);
}

.stat-value.warning {
  color: var(--warning-color);
}

.stat-value.danger {
  color: var(--danger-color);
}

/* Features */
.features-section {
  margin-bottom: 40px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

/* Tech */
.tech-section {
  text-align: center;
}

.tech-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 32px;
}

.tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.tech-icon {
  font-size: 48px;
}

.tech-name {
  font-weight: 600;
  color: var(--text-color);
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 32px;
  }
  
  .hero-subtitle {
    font-size: 16px;
  }
  
  .stat-value {
    font-size: 36px;
  }
}
</style>
