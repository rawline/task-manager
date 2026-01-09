<template>
  <header class="app-header">
    <div class="header-container">
      <router-link to="/" class="logo">
        <span class="logo-icon">📋</span>
        <span class="logo-text">Task Manager</span>
      </router-link>
      
      <nav class="nav-menu">
        <router-link 
          to="/" 
          class="nav-link"
          :class="{ active: $route.name === 'home' }"
        >
          Главная
        </router-link>
        <router-link 
          to="/tasks" 
          class="nav-link"
          :class="{ active: $route.name === 'tasks' }"
        >
          Задачи
        </router-link>
        <router-link 
          :to="{ name: 'task-create' }" 
          class="nav-link btn-add"
        >
          + Новая задача
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
// Компонент не требует дополнительной логики
// Использует встроенную навигацию Vue Router
</script>

<style scoped>
.app-header {
  background-color: var(--primary-dark);
  color: white;
  padding: 0 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-weight: 600;
  font-size: 20px;
}

.logo:hover {
  color: var(--primary-color);
}

.logo-icon {
  font-size: 28px;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-link {
  color: rgba(255, 255, 255, 0.8);
  padding: 8px 16px;
  border-radius: var(--radius);
  transition: all 0.2s;
  font-weight: 500;
}

.nav-link:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.active {
  color: white;
  background-color: rgba(66, 184, 131, 0.3);
}

.btn-add {
  background-color: var(--primary-color);
  color: white !important;
}

.btn-add:hover {
  background-color: #369970;
}

@media (max-width: 600px) {
  .header-container {
    flex-direction: column;
    height: auto;
    padding: 16px 0;
    gap: 16px;
  }
  
  .logo-text {
    display: none;
  }
  
  .nav-menu {
    width: 100%;
    justify-content: center;
  }
  
  .nav-link {
    padding: 8px 12px;
    font-size: 14px;
  }
}
</style>
