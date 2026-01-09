import axios from 'axios'

// Создаём экземпляр axios с базовыми настройками
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

// API методы для работы с задачами
export const tasksApi = {
  // Получить все задачи с фильтрацией и сортировкой
  getAll(params = {}) {
    return apiClient.get('/tasks', { params })
  },

  // Получить задачу по ID
  getById(id) {
    return apiClient.get(`/tasks/${id}`)
  },

  // Создать новую задачу
  create(taskData) {
    return apiClient.post('/tasks', taskData)
  },

  // Обновить задачу
  update(id, taskData) {
    return apiClient.put(`/tasks/${id}`, taskData)
  },

  // Переключить статус задачи
  toggleStatus(id) {
    return apiClient.patch(`/tasks/${id}/toggle`)
  },

  // Удалить задачу
  delete(id) {
    return apiClient.delete(`/tasks/${id}`)
  },

  // Получить статистику
  getStats() {
    return apiClient.get('/stats')
  }
}

export default apiClient
