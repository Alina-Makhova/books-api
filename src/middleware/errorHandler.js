const errorHandler = (err, req, res, next) => {
  console.error('❌ Ошибка:', err.message);

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ message: 'Ошибка валидации', errors: messages });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Некорректный ID' });
  }

  if (err.code === 11000) {
    return res.status(400).json({ message: 'Дубликат: такое значение уже существует' });
  }

  res.status(err.status || 500).json({
    message: err.message || 'Ошибка сервера'
  });
};

module.exports = errorHandler;