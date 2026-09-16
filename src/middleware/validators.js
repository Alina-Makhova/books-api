const { body, param, validationResult } = require('express-validator');

const bookValidationRules = () => [
  body('title').trim().notEmpty().withMessage('Название обязательно')
    .isLength({ max: 200 }).withMessage('Максимум 200 символов'),
  body('author').trim().notEmpty().withMessage('Автор обязателен')
    .isLength({ max: 100 }).withMessage('Максимум 100 символов'),
  body('genre').optional().isIn(['fiction', 'non-fiction', 'fantasy', 'science', 'history', 'biography', 'other'])
    .withMessage('Недопустимый жанр'),
  body('year').optional().isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage('Год должен быть между 1000 и текущим'),
  body('rating').optional().isFloat({ min: 0, max: 5 })
    .withMessage('Рейтинг должен быть от 0 до 5')
];

const idValidationRule = () => [
  param('id').isMongoId().withMessage('Некорректный ID')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  res.status(400).json({ errors: errors.array() });
};

module.exports = { bookValidationRules, idValidationRule, validate };