import { createRouter, createWebHistory } from 'vue-router'

// Импорт страниц
import HomeView from '@/views/HomeView.vue'
import TasksView from '@/views/TasksView.vue'
import TaskCreateView from '@/views/TaskCreateView.vue'
import TaskEditView from '@/views/TaskEditView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Главная' }
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: TasksView,
    meta: { title: 'Список задач' },
    // Вложенные маршруты можно добавить здесь
    children: []
  },
  {
    path: '/tasks/new',
    name: 'task-create',
    component: TaskCreateView,
    meta: { title: 'Создание задачи' }
  },
  {
    path: '/tasks/:id/edit',
    name: 'task-edit',
    component: TaskEditView,
    meta: { title: 'Редактирование задачи' },
    props: true
  },
  // Страница 404
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: { title: 'Страница не найдена' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Прокрутка страницы наверх при переходе
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

// Навигационный хук для изменения заголовка страницы
router.beforeEach((to, from, next) => {
  document.title = to.meta.title 
    ? `${to.meta.title} | Task Manager` 
    : 'Task Manager'
  next()
})

export default router
