const User = require('../models/user.model');
const CustomError = require('../lib/customError');
const { generateTokenUser } = require('../utils/jwtUtils');

exports.register = async ({
  firstName, lastName, email, username, password, image,
}) => {
  try {
    const defaultImagePath = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png';
    const imagePath = image ? image.path : defaultImagePath;

    const user = await User.create({
      firstName,
      lastName,
      email,
      username,
      password,
      image: imagePath,
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
    const token = await generateTokenUser(user);
    return token;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(`Failed to login user: ${error.message}`, 500);
  }
};

exports.getUserBooks = async (userId, status, limit = 20, skip = 0) => {
  limit = Number(limit);
  skip = Number(skip);
  if (skip < 0) {
    skip = 0;
  }
  if (limit < 0 || limit > 20) {
    limit = 20;
  }
  try {
    const user = await User.findById(userId).exec();

    if (!user) {
      throw new CustomError('User not found', 404);
    }
    let { books } = user;
    if (status) {
      books = books.filter((book) => book.book_status === status);
    }
    return books.slice(skip, skip + limit);
  } catch (error) {
    throw new CustomError(`Failed to get user's books: ${error.message}`, 500);
  }
};

exports.updateUserBook = async (id, bookId, book_status, rating) => {
  try {
    const user = await User.findById(id).exec();
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    const bookIndex = user.books.findIndex((book) => book._id.toString() === bookId);
    if (bookIndex === -1) {
      throw new CustomError('Book not found for the user', 404);
    }

    if (!rating && !book_status) {
      throw new CustomError('Please provide rating or book status to update', 400);
    }

    const updateFields = {};
    if (rating !== undefined) {
      updateFields[`books.${bookIndex}.rating`] = rating;
    }
    if (book_status !== undefined) {
      updateFields[`books.${bookIndex}.book_status`] = book_status;
    }

    await User.updateOne({ _id: id }, { $set: updateFields });

    return { success: true };
  } catch (error) {
    throw new CustomError(`Failed to update user's book status: ${error.message}`, 500);
  }
};

exports.updateUserBooks = async (id, books) => {
  try {
    const user = await User.findById(id).exec();
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    const existingBooks = user.books || [];
    books.forEach((newBook) => {
      const existingBookIndex = existingBooks.findIndex((book) => book._id === newBook._id);

      if (existingBookIndex !== -1) {
        existingBooks[existingBookIndex] = newBook;
      } else {
        existingBooks.push(newBook);
      }
    });

    await User.updateOne({ _id: id }, { $set: { books: existingBooks } });

    return { success: true };
  } catch (error) {
    throw new CustomError(`Failed to update user's books: ${error.message}`, 500);
  }
};

