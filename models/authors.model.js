// authors.model.js

const mongoose = require('mongoose');
const AutoIncrementFactory = require('mongoose-sequence');

const { Schema } = mongoose;

const AutoIncrement = AutoIncrementFactory(mongoose);

const authorSchema = new Schema({
  _id: {
    type: Number,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  books: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

authorSchema.plugin(AutoIncrement, { id: 'author_id_counter', inc_field: '_id' });

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
