const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const AutoIncrementFactory = require('mongoose-sequence');

const AutoIncrement = AutoIncrementFactory(mongoose);

const { Schema } = mongoose;

const userSchema = new Schema({
  _id: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
    trim: true,
    match: [/^[a-zA-Z]+$/, 'Only alphabetical characters are allowed'],
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
    trim: true,
    match: [/^[a-zA-Z]+$/, 'Only alphabetical characters are allowed'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    maxLength: 100,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'],
  },
  username: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 30,
    trim: true,
    match: [/^[a-zA-Z_.-]+$/, 'Only alphabetical characters, underscore, hyphen, and dot are allowed'],
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 100,
    trim: true,
    match: [
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
      'Password must contain at least one digit, one lowercase letter, one uppercase letter, and one special character',
    ],
  },
  image: {
    type: String,
    required: true,
  },
  books: [
    {
      bookId: {
        type: Number,
        unique: true,
      },
      book_status: {
        type: String,
        enum: ['read', 'toRead', 'reading'],
        default: 'toRead',
      },
      rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
    },
  ],
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function preSave(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error); // Proper error handling for password hashing
  }
});

userSchema.plugin(AutoIncrement, { inc_field: '_id' });

const User = mongoose.model('User', userSchema);

module.exports = User;
