<template>
  <footer class="app-footer">
    <div class="footer-container">
      <p class="copyright">
        &copy; {{ currentYear }} Task Manager. Учебный проект Vue 3 + FastAPI
      </p>
      <div class="footer-links">
        <a href="https://vuejs.org" target="_blank" rel="noopener">Vue.js</a>
        <span class="divider">|</span>
        <a href="https://fastapi.tiangolo.com" target="_blank" rel="noopener">FastAPI</a>
        <span class="divider">|</span>
        <a href="https://docker.com" target="_blank" rel="noopener">Docker</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.app-footer {
  background-color: var(--primary-dark);
  color: rgba(255, 255, 255, 0.7);
  padding: 20px;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.copyright {
  font-size: 14px;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-links a {
  color: var(--primary-color);
  font-size: 14px;
}

.footer-links a:hover {
  color: white;
}

.divider {
  color: rgba(255, 255, 255, 0.3);
}

@media (max-width: 600px) {
  .footer-container {
    flex-direction: column;
    text-align: center;
  }
}
</style>
