const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Приветственный маршрут
app.get('/', (req, res) => {
  res.json({
    message: '📚 Books API работает!',
    endpoints: {
      allBooks: 'GET /api/books',
      oneBook: 'GET /api/books/:id',
      create: 'POST /api/books',
      update: 'PUT /api/books/:id',
      delete: 'DELETE /api/books/:id',
      search: 'GET /api/books/search?q=...',
      stats: 'GET /api/books/stats'
    }
  });
});

// Маршруты
app.use('/api/books', bookRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Маршрут не найден' });
});

// Обработчик ошибок
app.use(errorHandler);

module.exports = app;