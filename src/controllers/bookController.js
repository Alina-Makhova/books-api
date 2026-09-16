const Book = require('../models/Book');

// GET /api/books — список с фильтрами, сортировкой и пагинацией
exports.getAllBooks = async (req, res, next) => {
  try {
    const { genre, year, author, sort, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (genre) filter.genre = genre;
    if (year) filter.year = Number(year);
    if (author) filter.author = { $regex: author, $options: 'i' };

    const sortOptions = {
      '-createdAt': { createdAt: -1 },
      'year': { year: 1 },
      '-year': { year: -1 },
      '-rating': { rating: -1 }
    };
    const sortBy = sortOptions[sort] || sortOptions['-createdAt'];

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [books, total] = await Promise.all([
      Book.find(filter).sort(sortBy).skip(skip).limit(limitNum),
      Book.countDocuments(filter)
    ]);

    res.json({
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      books
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/books/search?q=...
exports.searchBooks = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: 'Укажите поисковый запрос (q)' });

    const books = await Book.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { author: { $regex: q, $options: 'i' } }
      ]
    });

    res.json({ count: books.length, books });
  } catch (error) {
    next(error);
  }
};

// GET /api/books/stats
exports.getStats = async (req, res, next) => {
  try {
    const total = await Book.countDocuments();
    const read = await Book.countDocuments({ isRead: true });
    const avgRating = await Book.aggregate([
      { $group: { _id: null, avg: { $avg: '$rating' } } }
    ]);

    res.json({
      total,
      read,
      unread: total - read,
      avgRating: avgRating[0]?.avg ? Number(avgRating[0].avg.toFixed(2)) : 0
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/books/:id
exports.getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Книга не найдена' });
    res.json(book);
  } catch (error) {
    next(error);
  }
};

// POST /api/books
exports.createBook = async (req, res, next) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

// PUT /api/books/:id
exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!book) return res.status(404).json({ message: 'Книга не найдена' });
    res.json(book);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/books/:id
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Книга не найдена' });
    res.json({ message: 'Книга удалена', book });
  } catch (error) {
    next(error);
  }
};