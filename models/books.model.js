const mongoose = require('mongoose');
const AutoIncrementFactory = require('mongoose-sequence');

const AutoIncrement = AutoIncrementFactory(mongoose);

const bookSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  img: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  author_id: {
    type: Number,
    ref: 'authors',
    required: false,
  },
  author: {
    type: mongoose.Schema.Types.Mixed,
  },
  category_id: {
    type: Number,
    ref: 'categories',
    required: false,
  },
  category: {
    type: mongoose.Schema.Types.Mixed,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  reviews: [{
    user_id: {
      type: Number,
      ref: 'user',
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    comment: {
      type: String,
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

bookSchema.plugin(AutoIncrement, { id: 'book_id_counter', inc_field: '_id' });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
