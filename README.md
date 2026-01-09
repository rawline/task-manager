# 📋 Task Manager - Менеджер задач

SPA-приложение для управления задачами на Vue 3 + FastAPI с контейнеризацией в Docker.

Отчёт по работе: см. `REPORT.md`.

## 🎯 Описание проекта

Учебный проект, демонстрирующий основные возможности Vue 3:
- Привязка данных, события, computed, watch
- Формы и модификаторы ввода (v-model)
- Условный рендеринг (v-if, v-else)
- Вывод массивов (v-for), сортировка, фильтрация
- Компоненты, props, события, слоты
- Маршрутизация Vue Router
- Работа с refs и жизненным циклом
- Взаимодействие с REST API

## 📁 Структура проекта

```
task-manager/
├── frontend/                # Vue 3 клиент
│   ├── src/
│   │   ├── api/            # API клиент
│   │   ├── assets/         # Стили
│   │   ├── components/     # Vue компоненты
│   │   │   ├── AppHeader.vue
│   │   │   ├── AppFooter.vue
│   │   │   ├── LayoutCard.vue    # Компонент со слотами
│   │   │   ├── TaskList.vue
│   │   │   ├── TaskItem.vue
│   │   │   └── TaskForm.vue
│   │   ├── router/         # Маршрутизация
│   │   ├── views/          # Страницы
│   │   │   ├── HomeView.vue
│   │   │   ├── TasksView.vue
│   │   │   ├── TaskCreateView.vue
│   │   │   ├── TaskEditView.vue
│   │   │   └── NotFoundView.vue
│   │   ├── App.vue
│   │   └── main.js
│   ├── package.json
│   ├── vite.config.js
│   ├── nginx.conf
│   └── Dockerfile
│
├── backend/                 # FastAPI сервер
│   ├── main.py             # API эндпоинты
│   ├── models.py           # Pydantic модели
│   ├── tasks.json          # Хранилище данных
│   ├── requirements.txt
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

## 🚀 Запуск проекта

### Вариант 1: Docker Compose (рекомендуется)

```bash
# Сборка и запуск всех контейнеров
docker-compose up --build

# Или в фоновом режиме
docker-compose up -d --build
```

После запуска:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API документация: http://localhost:8000/docs

### Вариант 2: Локальный запуск

#### Backend (Python)

```bash
cd backend

# Создание виртуального окружения
python -m venv venv
source venv/bin/activate  # Linux/macOS
# или venv\Scripts\activate  # Windows

# Установка зависимостей
pip install -r requirements.txt

# Запуск сервера
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend (Vue 3)

```bash
cd frontend

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build
```

## 🔧 API Endpoints

| Метод | Путь | Описание |
|-------|------|----------|
| GET | `/api/tasks` | Получить все задачи |
| GET | `/api/tasks/{id}` | Получить задачу по ID |
| POST | `/api/tasks` | Создать задачу |
| PUT | `/api/tasks/{id}` | Обновить задачу |
| PATCH | `/api/tasks/{id}/toggle` | Переключить статус |
| DELETE | `/api/tasks/{id}` | Удалить задачу |
| GET | `/api/stats` | Статистика |

### Параметры фильтрации (GET /api/tasks)

- `status` - all, completed, pending
- `sort_by` - date, title, priority
- `sort_order` - asc, desc

## 📱 Страницы приложения

| Путь | Название | Описание |
|------|----------|----------|
| `/` | Главная | Dashboard со статистикой |
| `/tasks` | Список задач | Все задачи с фильтрацией |
| `/tasks/new` | Создание | Форма создания задачи |
| `/tasks/:id/edit` | Редактирование | Форма редактирования |
| `/*` | 404 | Страница не найдена |

## 🧩 Компоненты Vue

### Слоты

**LayoutCard.vue** демонстрирует все типы слотов:

```vue
<LayoutCard>
  <!-- Обычный слот (default) -->
  <p>Контент карточки</p>
  
  <!-- Именованный слот -->
  <template #header>Заголовок</template>
  <template #footer>Подвал</template>
  
  <!-- Слот с ограниченной областью видимости (scoped slot) -->
  <template #actions="{ toggleHighlight, isHighlighted }">
    <button @click="toggleHighlight">
      {{ isHighlighted ? 'Выделено' : 'Выделить' }}
    </button>
  </template>
</LayoutCard>
```

### Props и Events

**TaskItem.vue**:
- Props: `task` (Object)
- Events: `@edit`, `@delete`, `@toggle-status`

**TaskForm.vue**:
- Props: `initialData`, `isSubmitting`
- Events: `@submit`, `@cancel`

## 📋 Модель задачи

```typescript
interface Task {
  id: number
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high'
  category: 'work' | 'personal' | 'study' | 'other'
  is_important: boolean
  is_completed: boolean
  created_at: string
  updated_at: string
}
```

## 🛠️ Технологии

### Frontend
- Vue 3 (Composition API)
- Vue Router 4
- Vite 5
- Axios

### Backend
- Python 3.11
- FastAPI
- Pydantic
- Uvicorn

### DevOps
- Docker
- Docker Compose
- Nginx

## 📝 Особенности реализации

### Vue 3 Features
- ✅ Composition API (`<script setup>`)
- ✅ Reactive refs и reactive
- ✅ Computed свойства
- ✅ Watch для отслеживания изменений
- ✅ Lifecycle hooks (onMounted)
- ✅ v-model с модификаторами (.trim)
- ✅ Компоненты с props и events
- ✅ Обычные, именованные и scoped слоты
- ✅ Transition и TransitionGroup

### Vue Router
- ✅ Именованные маршруты
- ✅ Параметры маршрута (`:id`)
- ✅ Программная навигация
- ✅ Navigation guards
- ✅ Страница 404

### API
- ✅ CRUD операции
- ✅ Фильтрация и сортировка
- ✅ Валидация данных (Pydantic)
- ✅ CORS настройка
- ✅ JSON хранилище

## 🧪 Проверка работоспособности

1. Откройте http://localhost:3000
2. Проверьте статистику на главной
3. Перейдите в раздел "Задачи"
4. Создайте новую задачу
5. Отредактируйте существующую
6. Отметьте задачу как выполненную
7. Примените фильтры и сортировку
8. Удалите задачу
9. Проверьте страницу 404: http://localhost:3000/nonexistent

## 📄 Лицензия

MIT License - учебный проект
