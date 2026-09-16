const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Название книги обязательно'],
      trim: true,
      maxlength: [200, 'Название не может быть длиннее 200 символов']
    },
    author: {
      type: String,
      required: [true, 'Автор обязателен'],
      trim: true,
      maxlength: [100, 'Имя автора не может быть длиннее 100 символов']
    },
    genre: {
      type: String,
      enum: {
        values: ['fiction', 'non-fiction', 'fantasy', 'science', 'history', 'biography', 'other'],
        message: 'Недопустимый жанр'
      },
      default: 'other'
    },
    year: {
      type: Number,
      min: [1000, 'Год должен быть не меньше 1000'],
      max: [new Date().getFullYear(), 'Год не может быть в будущем']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Описание не может быть длиннее 1000 символов']
    },
    rating: {
      type: Number,
      min: [0, 'Рейтинг не может быть меньше 0'],
      max: [5, 'Рейтинг не может быть больше 5'],
      default: 0
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);