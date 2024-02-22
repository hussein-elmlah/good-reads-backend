const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const AutoIncrementFactory = require('mongoose-sequence');
const CustomError = require('../lib/customError');

const AutoIncrement = AutoIncrementFactory(mongoose);

const { Schema } = mongoose;

const userSchema = new Schema({
  _id: {
    type: Number,
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
    unique: true,
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
}, { timestamps: true, runValidators: true });

userSchema.set('toJSON', {
  transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  },
});

userSchema.pre('save', async function preSave(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.pre('findOneAndUpdate', async function preUpdate(next) {
  try {
    this.options.runValidators = true;
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.post('findOneAndUpdate', async function postUpdate(doc, next) {
  try {
    if (!doc) {
      throw new CustomError('user not found', 404);
    }
    if (this._update.$set.password && typeof this._update.$set.password === 'string') {
      doc.markModified('password');
    }
    await doc.save();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.verifyPassword = function verifyPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.plugin(AutoIncrement, { inc_field: '_id' });

const User = mongoose.model('User', userSchema);

module.exports = User;
