const mongoose = require('mongoose');

const objectId = mongoose.Schema.Types.ObjectId;

const bookSchema = new mongoose.Schema({
  img: { type: String, required: true },
  name: { type: String, required: true },
  author_id: { type: Number, ref: 'authors', required: false },
  category_id: { type: Number, ref: 'categories', required: false },
  reviews: [{
    user_id: { type: Number, ref: 'user' },
    rate: { type: Number, default: 0 },
    comment: [],
    state: {
      type: String,
      enum: ['currently Read', 'Want to Read', 'Read'],
    },
  }],
});

const bookModel = mongoose.model('books', bookSchema);
module.exports = bookModel;
