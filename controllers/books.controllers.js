const Book = require('../models/books.model');
const asyncWrapper = require('../lib/async-wrapper');

exports.createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    next(err);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    next(err);
  }
};

exports.getBooksByStatus = async (req, res, next) => {
  const { status } = req.query;
  const query = status ? { 'reviews.state': { $regex: `.*${status}.*`, $options: 'i' } } : {};

  try {
    const books = await Book.find(query);
    if (books.length === 0) {
      return res.status(404).json({ message: `No books with status '${status}' were found.` });
    }
    res.json(books);
  } catch (err) {
    next(err);
  }
};

exports.SearchBooks = async (req, res, next) => {
  const { query } = req.query;

  try {
    const books = await Book.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
      ],
    });

    res.json(books);
  } catch (error) {
    next(error);
  }
};

exports.getPopularBooks = async (req, res, next) => {
  const [error, books] = await asyncWrapper(Book.find()
    .sort({ rating: -1 })
    .limit(8)
    .select('img name rating author category'));

  if (error) {
    next(error);
  }

  res.json(books);
};
