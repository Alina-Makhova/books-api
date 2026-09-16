# 📚 Books API

REST API для управления коллекцией книг, созданный на **Node.js + Express + MongoDB**.

## 🚀 Стек технологий

- **Node.js** — среда выполнения
- **Express.js** — веб-фреймворк
- **MongoDB Atlas** — облачная база данных
- **Mongoose** — ODM для работы с MongoDB
- **express-validator** — валидация входных данных
- **dotenv** — переменные окружения
- **cors** — поддержка кросс-доменных запросов
- **nodemon** — авто-перезапуск при разработке

## 📦 Установка и запуск

```bash
# Клонировать репозиторий
git clone https://github.com/ВАШ_ЛОГИН/books-api.git
cd books-api

# Установить зависимости
npm install

# Создать файл .env и указать свои настройки
cp .env.example .env
# PORT=5000
# MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/books_db
# NODE_ENV=development

# Запустить сервер разработки
npm run dev
```

Сервер запустится на `http://localhost:5000`.

## 📋 Эндпоинты API

| Метод | URL | Описание |
|-------|-----|----------|
| `GET` | `/` | Приветствие и список эндпоинтов |
| `GET` | `/api/books` | Получить список всех книг (с фильтрами, сортировкой, пагинацией) |
| `GET` | `/api/books/:id` | Получить одну книгу по ID |
| `GET` | `/api/books/search?q=...` | Поиск по названию или автору |
| `GET` | `/api/books/stats` | Статистика: всего, прочитано, средний рейтинг |
| `POST` | `/api/books` | Добавить новую книгу |
| `PUT` | `/api/books/:id` | Обновить книгу |
| `DELETE` | `/api/books/:id` | Удалить книгу |

## 📥 Примеры запросов

### Создать книгу

```http
POST /api/books
Content-Type: application/json

{
  "title": "Мастер и Маргарита",
  "author": "Михаил Булгаков",
  "genre": "fiction",
  "year": 1967,
  "description": "Роман о добре и зле",
  "rating": 5
}
```

**Ответ (201 Created):**
```json
{
  "_id": "65a1b2c3d4e5f6a7b8c9d0e1",
  "title": "Мастер и Маргарита",
  "author": "Михаил Булгаков",
  "genre": "fiction",
  "year": 1967,
  "rating": 5,
  "isRead": false,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### Получить список с фильтрами

```http
GET /api/books?genre=fiction&sort=-rating&page=1&limit=5
```

Параметры:
- `genre` — фильтр по жанру (`fiction`, `non-fiction`, `fantasy`, `science`, `history`, `biography`, `other`)
- `sort` — сортировка: `-createdAt` (по умолчанию), `year`, `-year`, `-rating`
- `page` — номер страницы (по умолчанию 1)
- `limit` — количество на странице (по умолчанию 10, максимум 50)
- `author` — фильтр по автору (частичное совпадение, без учёта регистра)

### Поиск

```http
GET /api/books/search?q=Оруэлл
```

### Обновить книгу

```http
PUT /api/books/:id
Content-Type: application/json

{
  "rating": 5,
  "isRead": true
}
```

### Удалить книгу

```http
DELETE /api/books/:id
```

### Статистика

```http
GET /api/books/stats
```

**Ответ:**
```json
{
  "total": 4,
  "read": 1,
  "unread": 3,
  "avgRating": 4.83
}
```

## 📁 Структура проекта

```
books-api/
├── src/
│   ├── config/
│   │   └── db.js              # Подключение к MongoDB
│   ├── controllers/
│   │   └── bookController.js  # Логика обработки запросов
│   ├── middleware/
│   │   ├── errorHandler.js    # Глобальный обработчик ошибок
│   │   └── validators.js      # Правила валидации
│   ├── models/
│   │   └── Book.js            # Схема книги
│   ├── routes/
│   │   └── bookRoutes.js      # Маршруты
│   └── app.js                 # Настройка Express
├── .env                       # Переменные окружения (не в Git)
├── .gitignore
├── package.json
├── server.js                  # Точка входа
└── README.md
```

## 🛡️ Валидация

- **title** — обязательное, до 200 символов
- **author** — обязательное, до 100 символов
- **genre** — один из списка: `fiction`, `non-fiction`, `fantasy`, `science`, `history`, `biography`, `other`
- **year** — число от 1000 до текущего года
- **rating** — число от 0 до 5
- **description** — до 1000 символов

## 👩‍💻 Автор

**Alina Makhova**

## 📄 Лицензия

Учебный проект."# books-api" 
