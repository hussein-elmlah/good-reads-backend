const User = require('../models/user.model');
const CustomError = require('../lib/customError');
const generateToken = require('../utils/jwtUtils');

exports.register = async ({
  firstName, lastName, email, username, password, image,
}) => {
  try {
    const user = await User.create({
      firstName, lastName, email, username, password, image,
    });
    return user;
  } catch (error) {
    throw new CustomError(`Failed to create user: ${error.message}`, 500);
  }
};

exports.login = async ({ username, password }) => {
  try {
    const user = await User.findOne({ username }).exec();
    if (!user) {
      throw new CustomError('UN_Authenticated', 401);
    }
    const valid = user.verifyPassword(password);
    if (!valid) {
      throw new CustomError('UN_Authenticated', 401);
    }
    const token = await generateToken(user);
    return token;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(`Failed to login user: ${error.message}`, 500);
  }
};

exports.getUserBooks = async (userId, status, limit = 20, skip = 0) => {
  if (skip < 0) {
    skip = 0;
  }
  if (limit < 0 || limit > 10) {
    limit = 10;
  }
  try {
    const user = await User.findById(userId).exec();

    if (!user) {
      throw new CustomError('User not found', 404);
    }

    const books = user.books.filter((book) => book.book_status === status);
    return books.slice(skip, skip + limit);
  } catch (error) {
    throw new CustomError(`Failed to get user's books: ${error.message}`, 500);
  }
};
