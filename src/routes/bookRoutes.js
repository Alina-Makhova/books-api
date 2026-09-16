const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookController');
const { bookValidationRules, idValidationRule, validate } = require('../middleware/validators');

// Важно: /search и /stats — ДО /:id
router.get('/search', controller.searchBooks);
router.get('/stats', controller.getStats);

router.get('/', controller.getAllBooks);
router.get('/:id', idValidationRule(), validate, controller.getBook);
router.post('/', bookValidationRules(), validate, controller.createBook);
router.put('/:id', idValidationRule(), bookValidationRules(), validate, controller.updateBook);
router.delete('/:id', idValidationRule(), validate, controller.deleteBook);

module.exports = router;